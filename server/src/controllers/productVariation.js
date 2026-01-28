'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

module.exports = {
  // Standard Strapi controller methods for content manager
  async find(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { limit = 25, start = 0, sort = 'createdAt:desc' } = ctx.query;

      const variations = await strapi.db.query('plugin::webbycommerce.product-variation').findMany({
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: sort.split(':').reduce((acc, val, i) => {
          if (i === 0) acc[val] = 'asc';
          else acc[val] = 'desc';
          return acc;
        }, {}),
        populate: ['product', 'attributes', 'attributeValues'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-variation').count();

      ctx.send({
        data: variations,
        meta: {
          pagination: {
            page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
            pageSize: parseInt(limit, 10),
            pageCount: Math.ceil(total / parseInt(limit, 10)),
            total,
          },
        },
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in find:`, error);
      ctx.internalServerError('Failed to fetch product variations.');
    }
  },

  async findOne(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const variation = await strapi.db.query('plugin::webbycommerce.product-variation').findOne({
        where: { id },
        populate: ['product', 'attributes', 'attributeValues'],
      });

      if (!variation) {
        return ctx.notFound('Product variation not found.');
      }

      ctx.send({ data: variation });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
      ctx.internalServerError('Failed to fetch product variation.');
    }
  },

  async create(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const data = ctx.request.body.data || ctx.request.body;

      // Ensure slug is handled properly - if not provided, Strapi will auto-generate from name
      if (data.slug === '') {
        data.slug = undefined;
      }

      const variation = await strapi.db.query('plugin::webbycommerce.product-variation').create({ data });

      const populated = await strapi.db.query('plugin::webbycommerce.product-variation').findOne({
        where: { id: variation.id },
        populate: ['product', 'attributes', 'attributeValues'],
      });

      ctx.send({ data: populated || variation });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
      ctx.internalServerError('Failed to create product variation.');
    }
  },

  async update(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;
      const data = ctx.request.body.data || ctx.request.body;

      // Ensure slug is handled properly - if empty string, set to undefined to allow auto-generation
      if (data.slug === '') {
        data.slug = undefined;
      }

      const variation = await strapi.db.query('plugin::webbycommerce.product-variation').update({
        where: { id },
        data,
      });

      if (!variation) {
        return ctx.notFound('Product variation not found.');
      }

      const populated = await strapi.db.query('plugin::webbycommerce.product-variation').findOne({
        where: { id: variation.id },
        populate: ['product', 'attributes', 'attributeValues'],
      });

      ctx.send({ data: populated || variation });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
      ctx.internalServerError('Failed to update product variation.');
    }
  },

  async delete(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const variation = await strapi.db.query('plugin::webbycommerce.product-variation').delete({
        where: { id },
      });

      if (!variation) {
        return ctx.notFound('Product variation not found.');
      }

      ctx.send({ data: variation });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
      ctx.internalServerError('Failed to delete product variation.');
    }
  },
};