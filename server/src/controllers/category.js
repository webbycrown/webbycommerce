'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

const uniqBy = (items, keyFn) => {
  const seen = new Set();
  return (Array.isArray(items) ? items : []).filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

module.exports = {
  async getProductCategories(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { search, limit = 50, start = 0, publicationState, status, preview } = ctx.query;

      // Strapi v5 stores drafts + published versions as separate rows (document model).
      // For storefront/public APIs we should default to published records to avoid duplicates.
      const includeDrafts =
        preview === 'true' || publicationState === 'preview' || status === 'preview' || status === 'draft';

      const where = {};
      if (search) {
        where.name = { $containsi: search };
      }

      if (!includeDrafts) {
        where.publishedAt = { $notNull: true };
      }

      const productCategories = await strapi.db.query('plugin::webbycommerce.product-category').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: { createdAt: 'desc' },
        populate: includeDrafts
          ? ['products', 'image']
          : {
              products: {
                where: { publishedAt: { $notNull: true } },
              },
              image: true,
            },
      });

      if (!includeDrafts && Array.isArray(productCategories)) {
        for (const category of productCategories) {
          if (Array.isArray(category?.products)) {
            // Safety net in case relation-level filtering is not applied by the ORM in some scenarios.
            const publishedOnly = category.products.filter((p) => p && p.publishedAt);
            category.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
          }
        }
      }

      const total = await strapi.db.query('plugin::webbycommerce.product-category').count({ where });

      ctx.send({ data: productCategories, meta: { total, limit: parseInt(limit, 10), start: parseInt(start, 10) } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProductCategories:`, error);
      ctx.internalServerError('Failed to fetch product categories. Please try again.');
    }
  },

  async getProductCategory(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;
      const { publicationState, status, preview } = ctx.query;
      const includeDrafts =
        preview === 'true' || publicationState === 'preview' || status === 'preview' || status === 'draft';

      const productCategory = await strapi.db.query('plugin::webbycommerce.product-category').findOne({
        where: includeDrafts ? { id } : { id, publishedAt: { $notNull: true } },
        populate: includeDrafts
          ? ['products', 'image']
          : {
              products: {
                where: { publishedAt: { $notNull: true } },
              },
              image: true,
            },
      });

      if (!productCategory) {
        return ctx.notFound('Product category not found.');
      }

      if (!includeDrafts && Array.isArray(productCategory?.products)) {
        const publishedOnly = productCategory.products.filter((p) => p && p.publishedAt);
        productCategory.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
      }

      ctx.send({ data: productCategory });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProductCategory:`, error);
      ctx.internalServerError('Failed to fetch product category. Please try again.');
    }
  },

  async createProductCategory(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { name, slug, description, image, parent } = ctx.request.body || {};

      if (!name) {
        return ctx.badRequest('Name is required.');
      }

      const productCategory = await strapi.db.query('plugin::webbycommerce.product-category').create({
        data: {
          name,
          slug: slug || undefined,
          description: description || undefined,
          image: image || undefined,
        },
      });

      ctx.send({ data: productCategory });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createProductCategory:`, error);
      ctx.internalServerError('Failed to create product category. Please try again.');
    }
  },

  async updateProductCategory(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;
      const updateData = ctx.request.body || {};

      const updated = await strapi.db.query('plugin::webbycommerce.product-category').update({
        where: { id },
        data: updateData,
      });

      if (!updated) {
        return ctx.notFound('Product category not found.');
      }

      ctx.send({ data: updated });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateProductCategory:`, error);
      ctx.internalServerError('Failed to update product category. Please try again.');
    }
  },

  async deleteProductCategory(ctx) {
    try {
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const existing = await strapi.db.query('plugin::webbycommerce.product-category').findOne({ where: { id } });
      if (!existing) {
        return ctx.notFound('Product category not found.');
      }

      await strapi.db.query('plugin::webbycommerce.product-category').delete({ where: { id } });

      ctx.send({ data: { id } });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteProductCategory:`, error);
      ctx.internalServerError('Failed to delete product category. Please try again.');
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

      const categories = await strapi.db.query('plugin::webbycommerce.product-category').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: sort.split(':').reduce((acc, val, i) => {
          if (i === 0) acc[val] = 'asc';
          else acc[val] = 'desc';
          return acc;
        }, {}),
        populate: ['products', 'image'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-category').count({ where });

      ctx.send({
        data: categories,
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
      ctx.internalServerError('Failed to fetch product categories.');
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const category = await strapi.db.query('plugin::webbycommerce.product-category').findOne({
        where: { id, publishedAt: { $notNull: true } },
        populate: ['products', 'image'],
      });

      if (!category) {
        return ctx.notFound('Product category not found.');
      }

      ctx.send({ data: category });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
      ctx.internalServerError('Failed to fetch product category.');
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body.data || ctx.request.body;

      if (!data.publishedAt) {
        data.publishedAt = new Date();
      }

      const category = await strapi.db.query('plugin::webbycommerce.product-category').create({ data });

      const populated = await strapi.db.query('plugin::webbycommerce.product-category').findOne({
        where: { id: category.id },
        populate: ['products', 'image'],
      });

      ctx.send({ data: populated || category });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
      ctx.internalServerError('Failed to create product category.');
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body.data || ctx.request.body;

      const category = await strapi.db.query('plugin::webbycommerce.product-category').update({
        where: { id },
        data,
      });

      if (!category) {
        return ctx.notFound('Product category not found.');
      }

      const populated = await strapi.db.query('plugin::webbycommerce.product-category').findOne({
        where: { id: category.id },
        populate: ['products', 'image'],
      });

      ctx.send({ data: populated || category });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
      ctx.internalServerError('Failed to update product category.');
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const category = await strapi.db.query('plugin::webbycommerce.product-category').delete({
        where: { id },
      });

      if (!category) {
        return ctx.notFound('Product category not found.');
      }

      ctx.send({ data: category });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
      ctx.internalServerError('Failed to delete product category.');
    }
  },
};
