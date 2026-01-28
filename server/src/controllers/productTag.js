'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

module.exports = {
  /**
   * List tags
   */
  async getTags(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { search, limit = 50, start = 0 } = ctx.query;

      // Strapi v5 stores drafts + published versions as separate rows (document model).
      // For storefront APIs we only want published records, otherwise you can see duplicates.
      const where = { publishedAt: { $notNull: true } };
      if (search) {
        where.name = { $containsi: search };
      }

      const tags = await strapi.db.query('plugin::webbycommerce.product-tag').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: { createdAt: 'desc' },
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-tag').count({ where });

      ctx.send({ data: tags, meta: { total, limit: parseInt(limit, 10), start: parseInt(start, 10) } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getTags:`, error);
      ctx.internalServerError('Failed to fetch tags. Please try again.');
    }
  },

  /**
   * Get single tag
   */
  async getTag(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').findOne({
        where: { id },
        populate: ['products'],
      });

      if (!tag) {
        return ctx.notFound('Tag not found.');
      }

      ctx.send({ data: tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getTag:`, error);
      ctx.internalServerError('Failed to fetch tag. Please try again.');
    }
  },

  /**
   * Create tag
   */
  async createTag(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { name, slug } = ctx.request.body || {};

      if (!name) {
        return ctx.badRequest('Name is required.');
      }

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').create({
        data: {
          name,
          slug: slug || undefined,
        },
      });

      ctx.send({ data: tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createTag:`, error);
      ctx.internalServerError('Failed to create tag. Please try again.');
    }
  },

  /**
   * Update tag
   */
  async updateTag(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;
      const updateData = ctx.request.body || {};

      const updated = await strapi.db.query('plugin::webbycommerce.product-tag').update({
        where: { id },
        data: updateData,
      });

      if (!updated) {
        return ctx.notFound('Tag not found.');
      }

      ctx.send({ data: updated });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateTag:`, error);
      ctx.internalServerError('Failed to update tag. Please try again.');
    }
  },

  /**
   * Delete tag
   */
  async deleteTag(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const existing = await strapi.db.query('plugin::webbycommerce.product-tag').findOne({ where: { id } });
      if (!existing) {
        return ctx.notFound('Tag not found.');
      }

      await strapi.db.query('plugin::webbycommerce.product-tag').delete({ where: { id } });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteTag:`, error);
      ctx.internalServerError('Failed to delete tag. Please try again.');
    }
  },

  // Standard Strapi controller methods for content manager
  async find(ctx) {
    try {
      const { search, limit = 25, start = 0, sort = 'createdAt:desc' } = ctx.query;

      const where = { publishedAt: { $notNull: true } };

      if (search) {
        where.name = { $containsi: search };
      }

      const tags = await strapi.db.query('plugin::webbycommerce.product-tag').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: sort.split(':').reduce((acc, val, i) => {
          if (i === 0) acc[val] = 'asc';
          else acc[val] = 'desc';
          return acc;
        }, {}),
        populate: ['products'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-tag').count({ where });

      ctx.send({
        data: tags,
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
      ctx.internalServerError('Failed to fetch tags.');
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').findOne({
        where: { id, publishedAt: { $notNull: true } },
        populate: ['products'],
      });

      if (!tag) {
        return ctx.notFound('Tag not found.');
      }

      ctx.send({ data: tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
      ctx.internalServerError('Failed to fetch tag.');
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body.data || ctx.request.body;

      if (!data.publishedAt) {
        data.publishedAt = new Date();
      }

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').create({ data });

      const populated = await strapi.db.query('plugin::webbycommerce.product-tag').findOne({
        where: { id: tag.id },
        populate: ['products'],
      });

      ctx.send({ data: populated || tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
      ctx.internalServerError('Failed to create tag.');
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body.data || ctx.request.body;

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').update({
        where: { id },
        data,
      });

      if (!tag) {
        return ctx.notFound('Tag not found.');
      }

      const populated = await strapi.db.query('plugin::webbycommerce.product-tag').findOne({
        where: { id: tag.id },
        populate: ['products'],
      });

      ctx.send({ data: populated || tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
      ctx.internalServerError('Failed to update tag.');
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const tag = await strapi.db.query('plugin::webbycommerce.product-tag').delete({
        where: { id },
      });

      if (!tag) {
        return ctx.notFound('Tag not found.');
      }

      ctx.send({ data: tag });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
      ctx.internalServerError('Failed to delete tag.');
    }
  },
};
