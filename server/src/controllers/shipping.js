'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

/**
 * Helper function to check if an address matches a shipping zone
 */
const parseTextList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof value !== 'string') return [];
  return value
    .split(/[\n,;]+/g)
    .map((t) => t.trim())
    .filter(Boolean);
};

const parsePostalCodes = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value
    .split(/[\n,;]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((token) => {
      const m = token.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
      if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
      return token;
    });
};

const addressMatchesZone = (address, zone) => {
  // Location is repeatable, so it's an array of location objects
  const locations = Array.isArray(zone.location) ? zone.location : [zone.location].filter(Boolean);

  // Zone matches if ANY location rule matches the address
  for (const location of locations) {
    const zoneCountries = parseTextList(location.countries);
    const zoneStates = parseTextList(location.states);
    const zonePostalCodes = parsePostalCodes(location.postal_codes);

    // Check country match
    if (zoneCountries.length > 0) {
      if (!zoneCountries.includes(address.country)) {
        continue; // Try next location rule
      }
    }

    // Check state match
    if (zoneStates.length > 0) {
      if (!zoneStates.includes(address.region)) {
        continue; // Try next location rule
      }
    }

    // Check postal code match
    if (zonePostalCodes.length > 0) {
      const postcode = address.postcode;
      let matches = false;

      for (const pattern of zonePostalCodes) {
        if (typeof pattern === 'string') {
          // Check if postcode matches pattern (supports wildcards like "123*")
          const regex = new RegExp(pattern.replace(/\*/g, '.*'));
          if (regex.test(postcode)) {
            matches = true;
            break;
          }
        } else if (typeof pattern === 'object' && pattern.min && pattern.max) {
          // Check if postcode is within range
          const numPostcode = parseInt(postcode, 10);
          if (!isNaN(numPostcode) && numPostcode >= pattern.min && numPostcode <= pattern.max) {
            matches = true;
            break;
          }
        }
      }

      if (!matches) {
        continue; // Try next location rule
      }
    }

    // If we reach here, this location rule matches
    return true;
  }

  // No location rule matched
  return false;
};

/**
 * Calculate shipping cost based on cart items and shipping address
 */
const calculateShippingCost = async (cartItems, shippingAddress, method) => {
  let totalCost = parseFloat(method.handling_fee || 0);

  // Get active rates for this method
  const rates = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').findMany({
    where: {
      shippingMethod: method.id,
      is_active: true,
    },
    orderBy: { sort_order: 'asc', min_value: 'asc' },
  });

  // Calculate based on condition type
  for (const rate of rates) {
    let conditionValue = 0;

    switch (rate.condition_type) {
      case 'weight':
        // Calculate total weight
        for (const item of cartItems) {
          const weight = parseFloat(item.product?.weight || 0);
          conditionValue += weight * item.quantity;
        }
        break;

      case 'price':
        // Calculate subtotal
        for (const item of cartItems) {
          conditionValue += parseFloat(item.price) * item.quantity;
        }
        break;

      case 'quantity':
        // Calculate total quantity
        for (const item of cartItems) {
          conditionValue += item.quantity;
        }
        break;

      default:
        continue;
    }

    // Check if condition value falls within rate range
    const minValue = parseFloat(rate.min_value);
    const maxValue = rate.max_value ? parseFloat(rate.max_value) : null;

    if (conditionValue >= minValue && (maxValue === null || conditionValue <= maxValue)) {
      totalCost += parseFloat(rate.rate);
      break; // Use first matching rate
    }
  }

  return totalCost;
};

/**
 * Normalize `applies_to_methods` which can be:
 * - null/undefined (meaning: all methods)
 * - legacy JSON array of IDs
 * - populated relation array of entities ({ id, ... })
 */
const getAppliesToMethodIds = (appliesToMethods) => {
  if (!Array.isArray(appliesToMethods)) return [];
  return appliesToMethods
    .map((m) => (m && typeof m === 'object' ? m.id : m))
    .filter((id) => id !== null && id !== undefined)
    .map((id) => String(id));
};

/**
 * Apply shipping rules to available methods
 */
const applyShippingRules = async (methods, cartItems, shippingAddress) => {
  const rules = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rule').findMany({
    where: { is_active: true },
    orderBy: { priority: 'desc' }, // Higher priority first
    populate: { applies_to_methods: true },
  });

  const filteredMethods = [];

  for (const method of methods) {
    let isEligible = true;
    let modifiedCost = method.calculated_cost || 0;
    let messages = [];

    // Check if rule applies to this method
    const methodId = String(method.id);
    const applicableRules = rules.filter((rule) => {
      const ids = getAppliesToMethodIds(rule.applies_to_methods);
      return ids.length === 0 || ids.includes(methodId);
    });

    for (const rule of applicableRules) {
      let conditionMet = false;
      let conditionValue = null;

      // Evaluate condition
      switch (rule.condition_type) {
        case 'product_category':
          for (const item of cartItems) {
            const categories = item.product?.categories || [];
            const categoryIds = categories.map(cat => cat.id);
            conditionMet = evaluateCondition(categoryIds, rule.condition_operator, rule.condition_value);
            if (conditionMet) break;
          }
          break;

        case 'product_tag':
          for (const item of cartItems) {
            const tags = item.product?.tags || [];
            const tagIds = tags.map(tag => tag.id);
            conditionMet = evaluateCondition(tagIds, rule.condition_operator, rule.condition_value);
            if (conditionMet) break;
          }
          break;

        case 'order_total':
          conditionValue = cartItems.reduce((total, item) =>
            total + (parseFloat(item.price) * item.quantity), 0
          );
          conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
          break;

        case 'cart_quantity':
          conditionValue = cartItems.reduce((total, item) => total + item.quantity, 0);
          conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
          break;

        case 'shipping_address':
          conditionValue = shippingAddress[rule.condition_value];
          conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
          break;
      }

      if (conditionMet) {
        // Apply rule action
        switch (rule.action_type) {
          case 'hide_method':
            isEligible = false;
            break;

          case 'add_fee':
            modifiedCost += parseFloat(rule.action_value || 0);
            if (rule.action_message) messages.push(rule.action_message);
            break;

          case 'subtract_fee':
            modifiedCost -= parseFloat(rule.action_value || 0);
            if (rule.action_message) messages.push(rule.action_message);
            break;

          case 'set_rate':
            modifiedCost = parseFloat(rule.action_value || 0);
            if (rule.action_message) messages.push(rule.action_message);
            break;

          case 'multiply_rate':
            modifiedCost *= parseFloat(rule.action_value || 1);
            if (rule.action_message) messages.push(rule.action_message);
            break;
        }
      }
    }

    if (isEligible) {
      filteredMethods.push({
        ...method,
        calculated_cost: Math.max(0, modifiedCost), // Ensure cost is not negative
        rule_messages: messages,
      });
    }
  }

  return filteredMethods;
};

/**
 * Evaluate condition based on operator
 */
const evaluateCondition = (value, operator, conditionValue) => {
  switch (operator) {
    case 'equals':
      return value === conditionValue;
    case 'not_equals':
      return value !== conditionValue;
    case 'greater_than':
      return parseFloat(value) > parseFloat(conditionValue);
    case 'less_than':
      return parseFloat(value) < parseFloat(conditionValue);
    case 'contains':
      if (Array.isArray(value)) {
        return value.includes(conditionValue);
      }
      return String(value).includes(String(conditionValue));
    case 'not_contains':
      if (Array.isArray(value)) {
        return !value.includes(conditionValue);
      }
      return !String(value).includes(String(conditionValue));
    case 'in':
      return Array.isArray(conditionValue) && conditionValue.includes(value);
    case 'not_in':
      return !Array.isArray(conditionValue) || !conditionValue.includes(value);
    default:
      return false;
  }
};

module.exports = {
  /**
   * Get available shipping methods for cart and address
   */
  async getShippingMethods(ctx) {
    try {
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const { cart_items, shipping_address } = ctx.request.body;

      if (!cart_items || !Array.isArray(cart_items) || cart_items.length === 0) {
        return ctx.badRequest('Cart items are required.');
      }

      if (!shipping_address || typeof shipping_address !== 'object') {
        return ctx.badRequest('Shipping address is required.');
      }

      // Validate shipping address has required fields
      const requiredFields = ['country', 'city', 'street_address', 'postcode'];
      for (const field of requiredFields) {
        if (!shipping_address[field]) {
          return ctx.badRequest(`Shipping address ${field} is required.`);
        }
      }

      // Get all active shipping zones
      const zones = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
        populate: ['shippingMethods'],
      });

      // Find matching zones for the shipping address
      const matchingZones = zones.filter(zone => addressMatchesZone(shipping_address, zone));

      if (matchingZones.length === 0) {
        return ctx.send({ data: [], message: 'No shipping methods available for this address.' });
      }

      // Get all shipping methods from matching zones
      let availableMethods = [];
      for (const zone of matchingZones) {
        const methods = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findMany({
          where: {
            shippingZone: zone.id,
            is_active: true,
          },
          orderBy: { sort_order: 'asc' },
          populate: ['shippingRates', 'shippingZone'],
        });

        availableMethods = availableMethods.concat(methods);
      }

      // Remove duplicates (method might be in multiple zones)
      const uniqueMethods = availableMethods.filter((method, index, self) =>
        index === self.findIndex(m => String(m.id) === String(method.id))
      );

      // Calculate costs for each method
      const methodsWithCosts = [];
      for (const method of uniqueMethods) {
        try {
          const cost = await calculateShippingCost(cart_items, shipping_address, method);

          // Check free shipping
          let finalCost = cost;
          if (method.is_free_shipping && method.free_shipping_threshold) {
            const cartTotal = cart_items.reduce((total, item) =>
              total + (parseFloat(item.price) * item.quantity), 0
            );
            if (cartTotal >= parseFloat(method.free_shipping_threshold)) {
              finalCost = 0;
            }
          }

          methodsWithCosts.push({
            id: method.id,
            name: method.name,
            description: method.description,
            carrier: method.carrier,
            service_type: method.service_type,
            transit_time: method.transit_time,
            cost: finalCost,
            calculated_cost: finalCost,
            currency: method.shippingRates?.[0]?.currency || 'USD',
            zone: {
              id: method.shippingZone.id,
              name: method.shippingZone.name,
            },
          });
        } catch (error) {
          strapi.log.error(`Error calculating cost for method ${method.id}:`, error);
          // Skip this method if calculation fails
        }
      }

      // Apply shipping rules
      const finalMethods = await applyShippingRules(methodsWithCosts, cart_items, shipping_address);
      const uniqueFinalMethods = finalMethods.filter((method, index, self) =>
        index === self.findIndex(m => String(m.id) === String(method.id))
      );

      ctx.send({
        data: uniqueFinalMethods,
        meta: {
          total: uniqueFinalMethods.length,
          address: shipping_address,
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getShippingMethods:`, error);
      ctx.internalServerError('Failed to calculate shipping methods. Please try again.');
    }
  },

  /**
   * Get all shipping zones (admin only)
   */
  async getShippingZones(ctx) {
    try {
      // This endpoint requires admin permissions
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const zones = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findMany({
        orderBy: { sort_order: 'asc' },
        populate: ['shippingMethods', 'location'],
      });

      ctx.send({ data: zones });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getShippingZones:`, error);
      ctx.internalServerError('Failed to fetch shipping zones. Please try again.');
    }
  },

  /**
   * Create shipping zone (admin only)
   */
  async createShippingZone(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const {
        name,
        description,
        // New shape (preferred):
        location,
        // Legacy shape (backwards compatible):
        countries,
        states,
        postal_codes,
        is_active,
        sort_order,
      } = ctx.request.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return ctx.badRequest('Zone name is required.');
      }

      let finalLocation;
      if (Array.isArray(location) && location.length > 0) {
        // Location is already an array of objects
        finalLocation = location;
      } else if (location && typeof location === 'object') {
        // Single location object - wrap in array since field is repeatable
        finalLocation = [location];
      } else {
        // Fallback to legacy fields
        finalLocation = [{
          countries: Array.isArray(countries) ? countries.join(',') : countries,
          states: Array.isArray(states) ? states.join(',') : states,
          postal_codes: Array.isArray(postal_codes) ? postal_codes.map((p) => (typeof p === 'string' ? p : JSON.stringify(p))).join('\n') : postal_codes,
        }];
      }

      const zone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').create({
        data: {
          name: name.trim(),
          description: description ? description.trim() : null,
          location: finalLocation,
          is_active: is_active !== undefined ? Boolean(is_active) : true,
          sort_order: sort_order !== undefined ? parseInt(sort_order, 10) : 0,
        },
      });

      ctx.send({ data: zone });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createShippingZone:`, error);
      ctx.internalServerError('Failed to create shipping zone. Please try again.');
    }
  },

  /**
   * Update shipping zone (admin only)
   */
  async updateShippingZone(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;
      const {
        name,
        description,
        // New shape (preferred):
        location,
        // Legacy shape (backwards compatible):
        countries,
        states,
        postal_codes,
        is_active,
        sort_order,
      } = ctx.request.body;

      const existingZone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findOne({
        where: { id },
      });

      if (!existingZone) {
        return ctx.notFound('Shipping zone not found.');
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (description !== undefined) updateData.description = description ? description.trim() : null;
      if (location !== undefined) {
        // Location field is repeatable, ensure it's an array
        if (Array.isArray(location)) {
          updateData.location = location;
        } else if (typeof location === 'object') {
          updateData.location = [location];
        }
      }
      // allow legacy updates
      if (location === undefined && (countries !== undefined || states !== undefined || postal_codes !== undefined)) {
        const existingLocations = Array.isArray(existingZone.location) ? existingZone.location : [existingZone.location].filter(Boolean);
        const existingLocation = existingLocations.length > 0 ? existingLocations[0] : {};
        updateData.location = [{
          ...existingLocation,
          ...(countries !== undefined ? { countries: Array.isArray(countries) ? countries.join(',') : countries } : {}),
          ...(states !== undefined ? { states: Array.isArray(states) ? states.join(',') : states } : {}),
          ...(postal_codes !== undefined ? { postal_codes: Array.isArray(postal_codes) ? postal_codes.map((p) => (typeof p === 'string' ? p : JSON.stringify(p))).join('\n') : postal_codes } : {}),
        }];
      }
      if (is_active !== undefined) updateData.is_active = Boolean(is_active);
      if (sort_order !== undefined) updateData.sort_order = parseInt(sort_order, 10);

      const updatedZone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').update({
        where: { id },
        data: updateData,
      });

      ctx.send({ data: updatedZone });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingZone:`, error);
      ctx.internalServerError('Failed to update shipping zone. Please try again.');
    }
  },

  /**
   * Delete shipping zone (admin only)
   */
  async deleteShippingZone(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;

      const zone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findOne({
        where: { id },
        populate: ['shippingMethods'],
      });

      if (!zone) {
        return ctx.notFound('Shipping zone not found.');
      }

      if (zone.shippingMethods && zone.shippingMethods.length > 0) {
        return ctx.badRequest('Cannot delete zone with associated shipping methods. Please remove methods first.');
      }

      await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').delete({
        where: { id },
      });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingZone:`, error);
      ctx.internalServerError('Failed to delete shipping zone. Please try again.');
    }
  },

  /**
   * Get all shipping methods (admin only)
   */
  async getShippingMethodsAdmin(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const methods = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findMany({
        orderBy: { sort_order: 'asc' },
        populate: ['shippingZone', 'shippingRates'],
      });

      ctx.send({ data: methods });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getShippingMethodsAdmin:`, error);
      ctx.internalServerError('Failed to fetch shipping methods. Please try again.');
    }
  },

  /**
   * Create shipping method (admin only)
   */
  async createShippingMethod(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const {
        name,
        description,
        carrier,
        service_type,
        carrier_service_code,
        transit_time,
        is_active,
        is_free_shipping,
        free_shipping_threshold,
        handling_fee,
        zone,
        sort_order,
      } = ctx.request.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return ctx.badRequest('Method name is required.');
      }

      if (!carrier || typeof carrier !== 'string' || carrier.trim().length === 0) {
        return ctx.badRequest('Carrier is required.');
      }

      if (!service_type || typeof service_type !== 'string' || service_type.trim().length === 0) {
        return ctx.badRequest('Service type is required.');
      }

      if (!zone || !zone.id) {
        return ctx.badRequest('Shipping zone is required.');
      }

      // Verify zone exists
      const existingZone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findOne({
        where: { id: zone.id },
      });

      if (!existingZone) {
        return ctx.notFound('Shipping zone not found.');
      }

      const method = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').create({
        data: {
          name: name.trim(),
          description: description ? description.trim() : null,
          carrier: carrier.trim(),
          service_type: service_type.trim(),
          carrier_service_code: carrier_service_code ? carrier_service_code.trim() : null,
          transit_time: transit_time ? transit_time.trim() : null,
          is_active: is_active !== undefined ? Boolean(is_active) : true,
          is_free_shipping: Boolean(is_free_shipping),
          free_shipping_threshold: free_shipping_threshold ? parseFloat(free_shipping_threshold) : null,
          handling_fee: handling_fee !== undefined ? parseFloat(handling_fee) : 0,
          shippingZone: zone.id,
          sort_order: sort_order !== undefined ? parseInt(sort_order, 10) : 0,
        },
      });

      ctx.send({ data: method });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createShippingMethod:`, error);
      ctx.internalServerError('Failed to create shipping method. Please try again.');
    }
  },

  /**
   * Update shipping method (admin only)
   */
  async updateShippingMethod(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;
      const {
        name,
        description,
        carrier,
        service_type,
        carrier_service_code,
        transit_time,
        is_active,
        is_free_shipping,
        free_shipping_threshold,
        handling_fee,
        zone,
        sort_order,
      } = ctx.request.body;

      const existingMethod = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findOne({
        where: { id },
      });

      if (!existingMethod) {
        return ctx.notFound('Shipping method not found.');
      }

      // Verify zone exists if provided
      if (zone && zone.id) {
        const existingZone = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-zone').findOne({
          where: { id: zone.id },
        });

        if (!existingZone) {
          return ctx.notFound('Shipping zone not found.');
        }
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (description !== undefined) updateData.description = description ? description.trim() : null;
      if (carrier !== undefined) updateData.carrier = carrier.trim();
      if (service_type !== undefined) updateData.service_type = service_type.trim();
      if (carrier_service_code !== undefined) updateData.carrier_service_code = carrier_service_code ? carrier_service_code.trim() : null;
      if (transit_time !== undefined) updateData.transit_time = transit_time ? transit_time.trim() : null;
      if (is_active !== undefined) updateData.is_active = Boolean(is_active);
      if (is_free_shipping !== undefined) updateData.is_free_shipping = Boolean(is_free_shipping);
      if (free_shipping_threshold !== undefined) updateData.free_shipping_threshold = free_shipping_threshold ? parseFloat(free_shipping_threshold) : null;
      if (handling_fee !== undefined) updateData.handling_fee = parseFloat(handling_fee);
      if (zone !== undefined && zone.id) updateData.shippingZone = zone.id;
      if (sort_order !== undefined) updateData.sort_order = parseInt(sort_order, 10);

      const updatedMethod = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').update({
        where: { id },
        data: updateData,
      });

      ctx.send({ data: updatedMethod });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingMethod:`, error);
      ctx.internalServerError('Failed to update shipping method. Please try again.');
    }
  },

  /**
   * Delete shipping method (admin only)
   */
  async deleteShippingMethod(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;

      const method = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findOne({
        where: { id },
        populate: ['shippingRates'],
      });

      if (!method) {
        return ctx.notFound('Shipping method not found.');
      }

      if (method.shippingRates && method.shippingRates.length > 0) {
        return ctx.badRequest('Cannot delete method with associated rates. Please remove rates first.');
      }

      await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').delete({
        where: { id },
      });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingMethod:`, error);
      ctx.internalServerError('Failed to delete shipping method. Please try again.');
    }
  },

  /**
   * Get shipping rates for a method (admin only)
   */
  async getShippingRates(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { methodId } = ctx.params;

      const rates = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').findMany({
        where: { shippingMethod: methodId },
        orderBy: { sort_order: 'asc', min_value: 'asc' },
        populate: ['shippingMethod'],
      });

      ctx.send({ data: rates });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getShippingRates:`, error);
      ctx.internalServerError('Failed to fetch shipping rates. Please try again.');
    }
  },

  /**
   * Create shipping rate (admin only)
   */
  async createShippingRate(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const {
        name,
        condition_type,
        min_value,
        max_value,
        rate,
        currency,
        method,
        is_active,
        sort_order,
      } = ctx.request.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return ctx.badRequest('Rate name is required.');
      }

      const validConditionTypes = ['weight', 'price', 'quantity', 'volume', 'dimension'];
      if (!condition_type || !validConditionTypes.includes(condition_type)) {
        return ctx.badRequest('Valid condition type is required.');
      }

      if (min_value === undefined || min_value === null) {
        return ctx.badRequest('Minimum value is required.');
      }

      if (rate === undefined || rate === null) {
        return ctx.badRequest('Rate is required.');
      }

      if (!method || !method.id) {
        return ctx.badRequest('Shipping method is required.');
      }

      // Verify method exists
      const existingMethod = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findOne({
        where: { id: method.id },
      });

      if (!existingMethod) {
        return ctx.notFound('Shipping method not found.');
      }

      const shippingRate = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').create({
        data: {
          name: name.trim(),
          condition_type,
          min_value: parseFloat(min_value),
          max_value: max_value !== undefined ? parseFloat(max_value) : null,
          rate: parseFloat(rate),
          currency: currency || 'USD',
          shippingMethod: method.id,
          is_active: is_active !== undefined ? Boolean(is_active) : true,
          sort_order: sort_order !== undefined ? parseInt(sort_order, 10) : 0,
        },
      });

      ctx.send({ data: shippingRate });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createShippingRate:`, error);
      ctx.internalServerError('Failed to create shipping rate. Please try again.');
    }
  },

  /**
   * Update shipping rate (admin only)
   */
  async updateShippingRate(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;
      const {
        name,
        condition_type,
        min_value,
        max_value,
        rate,
        currency,
        method,
        is_active,
        sort_order,
      } = ctx.request.body;

      const existingRate = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').findOne({
        where: { id },
      });

      if (!existingRate) {
        return ctx.notFound('Shipping rate not found.');
      }

      // Verify method exists if provided
      if (method && method.id) {
        const existingMethod = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-method').findOne({
          where: { id: method.id },
        });

        if (!existingMethod) {
          return ctx.notFound('Shipping method not found.');
        }
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (condition_type !== undefined) {
        const validConditionTypes = ['weight', 'price', 'quantity', 'volume', 'dimension'];
        if (!validConditionTypes.includes(condition_type)) {
          return ctx.badRequest('Invalid condition type.');
        }
        updateData.condition_type = condition_type;
      }
      if (min_value !== undefined) updateData.min_value = parseFloat(min_value);
      if (max_value !== undefined) updateData.max_value = max_value ? parseFloat(max_value) : null;
      if (rate !== undefined) updateData.rate = parseFloat(rate);
      if (currency !== undefined) updateData.currency = currency;
      if (method !== undefined && method.id) updateData.shippingMethod = method.id;
      if (is_active !== undefined) updateData.is_active = Boolean(is_active);
      if (sort_order !== undefined) updateData.sort_order = parseInt(sort_order, 10);

      const updatedRate = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').update({
        where: { id },
        data: updateData,
      });

      ctx.send({ data: updatedRate });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingRate:`, error);
      ctx.internalServerError('Failed to update shipping rate. Please try again.');
    }
  },

  /**
   * Delete shipping rate (admin only)
   */
  async deleteShippingRate(ctx) {
    try {
      const user = ctx.state.user;
      const userRole = user?.role?.type;

      if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
        return ctx.forbidden('Admin access required.');
      }

      const { id } = ctx.params;

      const rate = await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').findOne({
        where: { id },
      });

      if (!rate) {
        return ctx.notFound('Shipping rate not found.');
      }

      await strapi.db.query('plugin::strapi-advanced-ecommerce.shipping-rate').delete({
        where: { id },
      });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingRate:`, error);
      ctx.internalServerError('Failed to delete shipping rate. Please try again.');
    }
  },
};