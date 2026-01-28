'use strict';

/**
 * shipping service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::webbycommerce.shipping', ({ strapi }) => ({
  /**
   * Parse comma/newline separated text into array tokens.
   * Also supports legacy arrays (backwards compatible).
   */
  parseTextList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
    if (typeof value !== 'string') return [];
    return value
      .split(/[\n,;]+/g)
      .map((t) => t.trim())
      .filter(Boolean);
  },

  /**
   * Parse postal codes text into patterns/ranges.
   * Accepts:
   * - string: lines/tokens like "123*" or "1000-2000"
   * - legacy array: ["123*", {min:1000,max:2000}]
   */
  parsePostalCodes(value) {
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
  },

  /**
   * Calculate shipping costs for cart items and address
   */
  async calculateShipping(cartItems, shippingAddress) {
    try {
      // Get all active shipping zones
      const zones = await strapi.db.query('plugin::webbycommerce.shipping-zone').findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
        populate: ['shippingMethods', 'location'],
      });

      // Find matching zones for the shipping address
      const matchingZones = zones.filter(zone => this.addressMatchesZone(shippingAddress, zone));

      if (matchingZones.length === 0) {
        return { methods: [], message: 'No shipping methods available for this address.' };
      }

      // Get all shipping methods from matching zones
      let availableMethods = [];
      for (const zone of matchingZones) {
        const methods = await strapi.db.query('plugin::webbycommerce.shipping-method').findMany({
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
          const cost = await this.calculateShippingCost(cartItems, shippingAddress, method);

          // Check free shipping
          let finalCost = cost;
          if (method.is_free_shipping && method.free_shipping_threshold) {
            const cartTotal = cartItems.reduce((total, item) =>
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
      const finalMethods = await this.applyShippingRules(methodsWithCosts, cartItems, shippingAddress);
      const uniqueFinalMethods = finalMethods.filter((method, index, self) =>
        index === self.findIndex(m => String(m.id) === String(method.id))
      );

      return {
        methods: uniqueFinalMethods,
        address: shippingAddress,
      };
    } catch (error) {
      throw new Error(`Failed to calculate shipping: ${error.message}`);
    }
  },

  /**
   * Check if an address matches a shipping zone
   */
  addressMatchesZone(address, zone) {
    const location = zone.location || {};
    const zoneCountries = this.parseTextList(location.countries);
    const zoneStates = this.parseTextList(location.states);
    const zonePostalCodes = this.parsePostalCodes(location.postal_codes);

    // Check country match
    if (zoneCountries.length > 0) {
      if (!zoneCountries.includes(address.country)) {
        return false;
      }
    }

    // Check state match
    if (zoneStates.length > 0) {
      if (!zoneStates.includes(address.region)) {
        return false;
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
        return false;
      }
    }

    return true;
  },

  /**
   * Calculate shipping cost based on cart items and method
   */
  async calculateShippingCost(cartItems, shippingAddress, method) {
    let totalCost = parseFloat(method.handling_fee || 0);

    // Get active rates for this method
    const rates = await strapi.db.query('plugin::webbycommerce.shipping-rate').findMany({
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
  },

  /**
   * Normalize `applies_to_methods` which can be:
   * - null/undefined (meaning: all methods)
   * - legacy JSON array of IDs
   * - populated relation array of entities ({ id, ... })
   */
  getAppliesToMethodIds(appliesToMethods) {
    if (!Array.isArray(appliesToMethods)) return [];
    return appliesToMethods
      .map((m) => (m && typeof m === 'object' ? m.id : m))
      .filter((id) => id !== null && id !== undefined)
      .map((id) => String(id));
  },

  /**
   * Apply shipping rules to available methods
   */
  async applyShippingRules(methods, cartItems, shippingAddress) {
    const rules = await strapi.db.query('plugin::webbycommerce.shipping-rule').findMany({
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
        const ids = this.getAppliesToMethodIds(rule.applies_to_methods);
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
              conditionMet = this.evaluateCondition(categoryIds, rule.condition_operator, rule.condition_value);
              if (conditionMet) break;
            }
            break;

          case 'product_tag':
            for (const item of cartItems) {
              const tags = item.product?.tags || [];
              const tagIds = tags.map(tag => tag.id);
              conditionMet = this.evaluateCondition(tagIds, rule.condition_operator, rule.condition_value);
              if (conditionMet) break;
            }
            break;

          case 'order_total':
            conditionValue = cartItems.reduce((total, item) =>
              total + (parseFloat(item.price) * item.quantity), 0
            );
            conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
            break;

          case 'cart_quantity':
            conditionValue = cartItems.reduce((total, item) => total + item.quantity, 0);
            conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
            break;

          case 'shipping_address':
            conditionValue = shippingAddress[rule.condition_value];
            conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
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
  },

  /**
   * Evaluate condition based on operator
   */
  evaluateCondition(value, operator, conditionValue) {
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
  },

  /**
   * Validate shipping zone data
   */
  validateShippingZone(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Zone name is required.');
    }

    // Now stored under `location` component as text; accept legacy array inputs too.
    if (data.location && typeof data.location !== 'object') {
      errors.push('Location must be an object.');
    }

    return errors;
  },

  /**
   * Validate shipping method data
   */
  validateShippingMethod(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Method name is required.');
    }

    if (!data.carrier || typeof data.carrier !== 'string' || data.carrier.trim().length === 0) {
      errors.push('Carrier is required.');
    }

    if (!data.service_type || typeof data.service_type !== 'string' || data.service_type.trim().length === 0) {
      errors.push('Service type is required.');
    }

    if (!data.shippingZone) {
      errors.push('Shipping zone is required.');
    }

    if (data.handling_fee !== undefined && (isNaN(parseFloat(data.handling_fee)) || parseFloat(data.handling_fee) < 0)) {
      errors.push('Handling fee must be a valid positive number.');
    }

    return errors;
  },

  /**
   * Validate shipping rate data
   */
  validateShippingRate(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Rate name is required.');
    }

    const validConditionTypes = ['weight', 'price', 'quantity', 'volume', 'dimension'];
    if (!data.condition_type || !validConditionTypes.includes(data.condition_type)) {
      errors.push('Valid condition type is required.');
    }

    if (data.min_value === undefined || data.min_value === null) {
      errors.push('Minimum value is required.');
    }

    if (data.rate === undefined || data.rate === null) {
      errors.push('Rate is required.');
    }

    if (!data.shippingMethod) {
      errors.push('Shipping method is required.');
    }

    return errors;
  },

  /**
   * Validate shipping rule data
   */
  validateShippingRule(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Rule name is required.');
    }

    const validRuleTypes = ['restriction', 'surcharge', 'discount', 'requirement'];
    if (!data.rule_type || !validRuleTypes.includes(data.rule_type)) {
      errors.push('Valid rule type is required.');
    }

    const validConditionTypes = ['product_category', 'product_tag', 'product_weight', 'order_total', 'customer_group', 'shipping_address', 'cart_quantity'];
    if (!data.condition_type || !validConditionTypes.includes(data.condition_type)) {
      errors.push('Valid condition type is required.');
    }

    const validOperators = ['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'not_contains', 'in', 'not_in'];
    if (!data.condition_operator || !validOperators.includes(data.condition_operator)) {
      errors.push('Valid condition operator is required.');
    }

    const validActionTypes = ['hide_method', 'add_fee', 'subtract_fee', 'set_rate', 'multiply_rate'];
    if (!data.action_type || !validActionTypes.includes(data.action_type)) {
      errors.push('Valid action type is required.');
    }

    return errors;
  },
}));