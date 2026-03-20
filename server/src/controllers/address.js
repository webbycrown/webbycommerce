'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

const getStore = () => {
  return strapi.store({ type: 'plugin', name: PLUGIN_ID });
};

const getShippingType = async () => {
  const store = getStore();
  const value = (await store.get({ key: 'settings' })) || {};
  return value.shippingType || 'single'; // 'single' or 'multiple'
};

module.exports = {
  /**
   * Get all addresses for authenticated user
   */
  async getAddresses(ctx) {
    try {
      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const { type } = ctx.query; // Optional filter: type=0 (billing) or type=1 (shipping)

      const where = { user: user.id };
      if (type !== undefined) {
        where.type = parseInt(type, 10);
      }

      const addresses = await strapi.db.query('plugin::webbycommerce.address').findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      ctx.send({ data: addresses });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getAddresses:`, error);
      ctx.internalServerError('Failed to fetch addresses. Please try again.');
    }
  },

  /**
   * Get single address by ID
   */
  async getAddress(ctx) {
    try {
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const { id } = ctx.params;

      const address = await strapi.db.query('plugin::webbycommerce.address').findOne({
        where: { id, user: user.id },
      });

      if (!address) {
        return ctx.notFound('Address not found.');
      }

      ctx.send({ data: address });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getAddress:`, error);
      ctx.internalServerError('Failed to fetch address. Please try again.');
    }
  },

  /**
   * Create new address
   */
  async createAddress(ctx) {
    try {
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const shippingType = await getShippingType();
      const {
        type,
        first_name,
        last_name,
        company_name,
        country,
        region,
        city,
        street_address,
        postcode,
        phone,
        email_address,
      } = ctx.request.body || {};

      // Validate required fields - convert type to integer for validation
      // Check if type exists in request body
      if (type === undefined || type === null) {
        return ctx.badRequest('Type is required and must be 0 (billing) or 1 (shipping).');
      }
      
      // Convert to number - handle both string and number inputs
      // Accept: 0, 1, "0", "1", 0.0, 1.0
      let typeInt;
      if (type === 0 || type === '0' || type === 0.0) {
        typeInt = 0;
      } else if (type === 1 || type === '1' || type === 1.0) {
        typeInt = 1;
      } else {
        // Try parsing as number
        typeInt = Number(type);
        if (isNaN(typeInt) || (typeInt !== 0 && typeInt !== 1)) {
          return ctx.badRequest('Type is required and must be 0 (billing) or 1 (shipping).');
        }
      }

      if (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0) {
        return ctx.badRequest('First name is required.');
      }

      if (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0) {
        return ctx.badRequest('Last name is required.');
      }

      if (!country || typeof country !== 'string' || country.trim().length === 0) {
        return ctx.badRequest('Country is required.');
      }

      if (!city || typeof city !== 'string' || city.trim().length === 0) {
        return ctx.badRequest('City is required.');
      }

      if (!street_address || typeof street_address !== 'string' || street_address.trim().length === 0) {
        return ctx.badRequest('Street address is required.');
      }

      if (!postcode || typeof postcode !== 'string' || postcode.trim().length === 0) {
        return ctx.badRequest('Postcode is required.');
      }

      if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
        return ctx.badRequest('Phone is required.');
      }

      // Email is required for billing addresses
      if (typeInt === 0 && (!email_address || typeof email_address !== 'string' || email_address.trim().length === 0)) {
        return ctx.badRequest('Email address is required for billing addresses.');
      }

      // Validate email format if provided
      if (email_address) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_address.trim())) {
          return ctx.badRequest('Invalid email format.');
        }
      }

      // Check if single mode and address already exists
      if (shippingType === 'single') {
        const existingAddress = await strapi.db.query('plugin::webbycommerce.address').findOne({
          where: { user: user.id, type: typeInt },
        });

        if (existingAddress) {
          return ctx.forbidden(
            `A ${typeInt === 0 ? 'billing' : 'shipping'} address already exists. Please update the existing address or enable multiple address mode in settings.`
          );
        }
      }

      // Create address
      const address = await strapi.db.query('plugin::webbycommerce.address').create({
        data: {
          type: typeInt,
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          company_name: company_name ? company_name.trim() : null,
          country: country.trim(),
          region: region ? region.trim() : null,
          city: city.trim(),
          street_address: street_address.trim(),
          postcode: postcode.trim(),
          phone: phone.trim(),
          email_address: email_address ? email_address.trim().toLowerCase() : null,
          user: user.id,
        },
      });

      ctx.send({ data: address });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createAddress:`, error);
      ctx.internalServerError('Failed to create address. Please try again.');
    }
  },

  /**
   * Update address
   */
  async updateAddress(ctx) {
    try {
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const { id } = ctx.params;
      const {
        type,
        first_name,
        last_name,
        company_name,
        country,
        region,
        city,
        street_address,
        postcode,
        phone,
        email_address,
      } = ctx.request.body;

      // Verify address belongs to user
      const existingAddress = await strapi.db.query('plugin::webbycommerce.address').findOne({
        where: { id, user: user.id },
      });

      if (!existingAddress) {
        return ctx.notFound('Address not found.');
      }

      // Validate type if provided
      if (type !== undefined) {
        const typeInt = parseInt(type, 10);
        if (isNaN(typeInt) || (typeInt !== 0 && typeInt !== 1)) {
          return ctx.badRequest('Type must be 0 (billing) or 1 (shipping).');
        }
      }

      // Validate required fields if provided
      if (first_name !== undefined && (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0)) {
        return ctx.badRequest('First name is required.');
      }

      if (last_name !== undefined && (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0)) {
        return ctx.badRequest('Last name is required.');
      }

      if (country !== undefined && (!country || typeof country !== 'string' || country.trim().length === 0)) {
        return ctx.badRequest('Country is required.');
      }

      if (city !== undefined && (!city || typeof city !== 'string' || city.trim().length === 0)) {
        return ctx.badRequest('City is required.');
      }

      if (street_address !== undefined && (!street_address || typeof street_address !== 'string' || street_address.trim().length === 0)) {
        return ctx.badRequest('Street address is required.');
      }

      if (postcode !== undefined && (!postcode || typeof postcode !== 'string' || postcode.trim().length === 0)) {
        return ctx.badRequest('Postcode is required.');
      }

      if (phone !== undefined && (!phone || typeof phone !== 'string' || phone.trim().length === 0)) {
        return ctx.badRequest('Phone is required.');
      }

      // Validate email if provided
      if (email_address !== undefined) {
        const addressType = type !== undefined ? parseInt(type, 10) : existingAddress.type;
        if (addressType === 0 && (!email_address || typeof email_address !== 'string' || email_address.trim().length === 0)) {
          return ctx.badRequest('Email address is required for billing addresses.');
        }

        if (email_address) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email_address.trim())) {
            return ctx.badRequest('Invalid email format.');
          }
        }
      }

      // Prepare update data
      const updateData = {};
      if (type !== undefined) {
        const typeInt = parseInt(type, 10);
        if (!isNaN(typeInt) && (typeInt === 0 || typeInt === 1)) {
          updateData.type = typeInt;
        }
      }
      if (first_name !== undefined) updateData.first_name = first_name.trim();
      if (last_name !== undefined) updateData.last_name = last_name.trim();
      if (company_name !== undefined) updateData.company_name = company_name ? company_name.trim() : null;
      if (country !== undefined) updateData.country = country.trim();
      if (region !== undefined) updateData.region = region ? region.trim() : null;
      if (city !== undefined) updateData.city = city.trim();
      if (street_address !== undefined) updateData.street_address = street_address.trim();
      if (postcode !== undefined) updateData.postcode = postcode.trim();
      if (phone !== undefined) updateData.phone = phone.trim();
      if (email_address !== undefined) updateData.email_address = email_address ? email_address.trim().toLowerCase() : null;

      // Update address
      const updatedAddress = await strapi.db.query('plugin::webbycommerce.address').update({
        where: { id },
        data: updateData,
      });

      ctx.send({ data: updatedAddress });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateAddress:`, error);
      ctx.internalServerError('Failed to update address. Please try again.');
    }
  },

  /**
   * Delete address
   */
  async deleteAddress(ctx) {
    try {
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const { id } = ctx.params;

      // Verify address belongs to user
      const address = await strapi.db.query('plugin::webbycommerce.address').findOne({
        where: { id, user: user.id },
      });

      if (!address) {
        return ctx.notFound('Address not found.');
      }

      await strapi.db.query('plugin::webbycommerce.address').delete({
        where: { id },
      });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteAddress:`, error);
      ctx.internalServerError('Failed to delete address. Please try again.');
    }
  },
};

