'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

module.exports = {
  /**
   * Get all products
   */
  async getProducts(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { product_category, tag, search, limit, start = 0, getAll } = ctx.query;

      // Strapi v5 stores drafts + published versions as separate rows (document model).
      // For storefront APIs we only want published records, otherwise you can see duplicates.
      const where = { publishedAt: { $notNull: true } };

      if (product_category) {
        where.product_categories = { id: product_category };
      }

      if (tag) {
        where.tags = { id: tag };
      }

      if (search) {
        where.name = { $containsi: search };
      }

      const total = await strapi.db.query('plugin::webbycommerce.product').count({ where });

      // If getAll=true or limit is not provided, return all products without pagination
      const shouldGetAll = getAll === 'true' || getAll === true || limit === undefined || limit === null;

      const queryOptions = {
        where,
        orderBy: { createdAt: 'desc' },
        populate: {
          product_categories: true,
          tags: true,
          images: true,
          variations: {
            populate: ['attributes', 'attributeValues'],
          },
        },
      };

      // Only add pagination if getAll is false and limit is provided
      if (!shouldGetAll && limit) {
        queryOptions.limit = parseInt(limit, 10);
        queryOptions.start = parseInt(start, 10);
      }

      const products = await strapi.db.query('plugin::webbycommerce.product').findMany(queryOptions);

      const responseMeta = shouldGetAll 
        ? { total, returned: products.length, pagination: false }
        : { 
            total, 
            limit: parseInt(limit, 10), 
            start: parseInt(start, 10),
            pagination: true,
            page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
            pageCount: Math.ceil(total / parseInt(limit, 10))
          };

      ctx.send({ data: products, meta: responseMeta });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProducts:`, error);
      ctx.internalServerError('Failed to fetch products. Please try again.');
    }
  },

  /**
   * Get single product
   */
  async getProduct(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id, publishedAt: { $notNull: true } },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      ctx.send({ data: product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProduct:`, error);
      ctx.internalServerError('Failed to fetch product. Please try again.');
    }
  },

  /**
   * Get single product by slug
   */
  async getProductBySlug(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const rawSlug = ctx.params?.slug;
      const slug = typeof rawSlug === 'string' ? decodeURIComponent(rawSlug).trim() : '';

      if (!slug) {
        return ctx.badRequest('Slug is required.');
      }

      // Allow numeric slugs to still work like "get by id"
      if (/^[0-9]+$/.test(slug)) {
        const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
          where: { id: slug, publishedAt: { $notNull: true } },
          populate: ['product_categories', 'tags', 'images', 'variations'],
        });

        if (!product) {
          return ctx.notFound('Product not found.');
        }

        ctx.send({ data: product });
        return;
      }

      // Strapi v5 can store draft + published versions as separate rows (document model).
      // For storefront APIs we only want published records.
      const results = await strapi.db.query('plugin::webbycommerce.product').findMany({
        where: { slug, publishedAt: { $notNull: true } },
        limit: 1,
        orderBy: { publishedAt: 'desc', id: 'desc' },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      const product = results?.[0];

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      ctx.send({ data: product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProductBySlug:`, error);
      ctx.internalServerError('Failed to fetch product. Please try again.');
    }
  },

  /**
   * Create product
   */
  async createProduct(ctx) {
    try {
      const { name, description, price, sale_price, sku, slug, stock_quantity, stock_status, weight, dimensions, product_categories, tags, images } = ctx.request.body || {};

      if (!name || price === undefined || price === null) {
        return ctx.badRequest('Name and price are required.');
      }

      // Validate and parse numeric fields
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return ctx.badRequest('Price must be a valid positive number.');
      }

      let parsedSalePrice = null;
      if (sale_price !== undefined && sale_price !== null) {
        parsedSalePrice = parseFloat(sale_price);
        if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
          return ctx.badRequest('Sale price must be a valid positive number.');
        }
      }

      let parsedStockQuantity = 0;
      if (stock_quantity !== undefined && stock_quantity !== null) {
        parsedStockQuantity = parseInt(stock_quantity, 10);
        if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
          return ctx.badRequest('Stock quantity must be a valid non-negative integer.');
        }
      }

      let parsedWeight = null;
      if (weight !== undefined && weight !== null) {
        parsedWeight = parseFloat(weight);
        if (isNaN(parsedWeight) || parsedWeight < 0) {
          return ctx.badRequest('Weight must be a valid positive number.');
        }
      }

      const data = {
        name,
        description,
        price: parsedPrice,
        sale_price: parsedSalePrice,
        sku,
        slug,
        stock_quantity: parsedStockQuantity,
        stock_status: stock_status || 'in_stock',
        weight: parsedWeight,
        dimensions,
        publishedAt: new Date(),
      };

      // Prepare relation IDs
      let categoryIds = [];
      if (product_categories && Array.isArray(product_categories) && product_categories.length > 0) {
        categoryIds = product_categories.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }

      let tagIds = [];
      if (tags && Array.isArray(tags) && tags.length > 0) {
        tagIds = tags.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }

      let imageIds = [];
      if (images && Array.isArray(images) && images.length > 0) {
        imageIds = images.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }

      // Use entityService for Strapi v5 document model compatibility
      // This ensures products appear in the content manager
      const product = await strapi.entityService.create('plugin::webbycommerce.product', {
        data,
      });

      // Update product with relations to ensure they're properly linked in document model
      const updateData = {};
      if (categoryIds.length > 0) {
        updateData.product_categories = categoryIds;
      }
      if (tagIds.length > 0) {
        updateData.tags = tagIds;
      }
      if (imageIds.length > 0) {
        updateData.images = imageIds;
      }

      let updatedProduct = product;
      if (Object.keys(updateData).length > 0) {
        updatedProduct = await strapi.entityService.update('plugin::webbycommerce.product', product.id, {
          data: updateData,
        });
      }

      // Re-fetch the product with relations populated using entityService
      const populated = await strapi.entityService.findOne('plugin::webbycommerce.product', updatedProduct.id, {
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      ctx.send({ data: populated || updatedProduct });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createProduct:`, error);
      ctx.internalServerError('Failed to create product. Please try again.');
    }
  },

  /**
   * Create products in bulk
   */
  async createBulkProducts(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { products } = ctx.request.body || {};

      if (!Array.isArray(products)) {
        return ctx.badRequest('Products must be an array.');
      }

      if (products.length === 0) {
        return ctx.badRequest('Products array cannot be empty.');
      }

      // Limit bulk operations to prevent performance issues
      const MAX_BULK_SIZE = 100;
      if (products.length > MAX_BULK_SIZE) {
        return ctx.badRequest(`Cannot create more than ${MAX_BULK_SIZE} products at once.`);
      }

      // Helper function to build connect payloads
      const buildConnect = (arr) => {
        if (!arr) return undefined;
        if (Array.isArray(arr) && arr.length > 0) {
          if (typeof arr[0] === 'object') return arr;
          return arr.map((id) => ({ id }));
        }
        return undefined;
      };

      // Helper function to validate and prepare a single product
      const validateAndPrepareProduct = (productData, index) => {
        const errors = [];

        if (!productData.name || productData.price === undefined || productData.price === null) {
          errors.push('Name and price are required.');
        }

        const parsedPrice = parseFloat(productData.price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
          errors.push('Price must be a valid positive number.');
        }

        let parsedSalePrice = null;
        if (productData.sale_price !== undefined && productData.sale_price !== null) {
          parsedSalePrice = parseFloat(productData.sale_price);
          if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
            errors.push('Sale price must be a valid positive number.');
          }
        }

        let parsedStockQuantity = 0;
        if (productData.stock_quantity !== undefined && productData.stock_quantity !== null) {
          parsedStockQuantity = parseInt(productData.stock_quantity, 10);
          if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
            errors.push('Stock quantity must be a valid non-negative integer.');
          }
        }

        let parsedWeight = null;
        if (productData.weight !== undefined && productData.weight !== null) {
          parsedWeight = parseFloat(productData.weight);
          if (isNaN(parsedWeight) || parsedWeight < 0) {
            errors.push('Weight must be a valid positive number.');
          }
        }

        if (errors.length > 0) {
          return { valid: false, errors, index };
        }

        const data = {
          name: productData.name,
          description: productData.description,
          price: parsedPrice,
          sale_price: parsedSalePrice,
          sku: productData.sku,
          slug: productData.slug,
          stock_quantity: parsedStockQuantity,
          stock_status: productData.stock_status || 'in_stock',
          weight: parsedWeight,
          dimensions: productData.dimensions,
          publishedAt: new Date(),
        };

        // Prepare relation IDs separately
        const relations = {
          product_categories: [],
          tags: [],
          images: [],
        };

        if (productData.product_categories && Array.isArray(productData.product_categories) && productData.product_categories.length > 0) {
          relations.product_categories = productData.product_categories.map(id => 
            typeof id === 'object' && id.id ? id.id : id
          );
        }

        if (productData.tags && Array.isArray(productData.tags) && productData.tags.length > 0) {
          relations.tags = productData.tags.map(id => 
            typeof id === 'object' && id.id ? id.id : id
          );
        }

        if (productData.images && Array.isArray(productData.images) && productData.images.length > 0) {
          relations.images = productData.images.map(id => 
            typeof id === 'object' && id.id ? id.id : id
          );
        }

        return { valid: true, data, relations, index };
      };

      const results = {
        success: [],
        failed: [],
        summary: {
          total: products.length,
          successful: 0,
          failed: 0,
        },
      };

      // Process each product
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        const validation = validateAndPrepareProduct(productData, i);

        if (!validation.valid) {
          results.failed.push({
            index: i,
            product: productData,
            errors: validation.errors,
          });
          results.summary.failed++;
          continue;
        }

        try {
          // Use entityService for Strapi v5 document model compatibility
          // This ensures products appear in the content manager
          const product = await strapi.entityService.create('plugin::webbycommerce.product', {
            data: validation.data,
          });

          // Update product with relations to ensure they're properly linked in document model
          const updateData = {};
          if (validation.relations.product_categories.length > 0) {
            updateData.product_categories = validation.relations.product_categories;
          }
          if (validation.relations.tags.length > 0) {
            updateData.tags = validation.relations.tags;
          }
          if (validation.relations.images.length > 0) {
            updateData.images = validation.relations.images;
          }

          let updatedProduct = product;
          if (Object.keys(updateData).length > 0) {
            updatedProduct = await strapi.entityService.update('plugin::webbycommerce.product', product.id, {
              data: updateData,
            });
          }

          // Re-fetch with populated relations using entityService
          const populated = await strapi.entityService.findOne('plugin::webbycommerce.product', updatedProduct.id, {
            populate: ['product_categories', 'tags', 'images', 'variations'],
          });

          results.success.push({
            index: i,
            product: populated || updatedProduct,
          });
          results.summary.successful++;
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error creating product at index ${i}:`, error);
          results.failed.push({
            index: i,
            product: productData,
            errors: [error.message || 'Failed to create product.'],
          });
          results.summary.failed++;
        }
      }

      // Return 207 Multi-Status if there are mixed results, 200 if all succeeded, 400 if all failed
      const statusCode = results.summary.failed === 0 ? 200 : results.summary.successful === 0 ? 400 : 207;
      ctx.status = statusCode;
      ctx.send({ data: results });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createBulkProducts:`, error);
      ctx.internalServerError('Failed to create products in bulk. Please try again.');
    }
  },

  /**
   * Update product
   */
  async updateProduct(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const body = ctx.request.body || {};

      const updateData = { ...body };

      // Convert relation id arrays to connect format for update
      const buildConnectForUpdate = (key, target) => {
        const val = body[key];
        if (val === undefined) return;
        if (Array.isArray(val) && val.length > 0) {
          if (typeof val[0] === 'object') {
            updateData[key] = { connect: val };
          } else {
            updateData[key] = { connect: val.map((id) => ({ id })) };
          }
        } else if (Array.isArray(val) && val.length === 0) {
          // empty array -> disconnect all
          updateData[key] = { disconnect: [] };
        }
      };

      buildConnectForUpdate('product_categories');
      buildConnectForUpdate('tags');
      buildConnectForUpdate('images');

      const product = await strapi.db.query('plugin::webbycommerce.product').update({
        where: { id },
        data: updateData,
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      // Re-fetch with populated relations
      const populatedUpdated = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id: product.id },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      ctx.send({ data: populatedUpdated || product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateProduct:`, error);
      ctx.internalServerError('Failed to update product. Please try again.');
    }
  },

  /**
   * Delete product
   */
  async deleteProduct(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;

      const product = await strapi.db.query('plugin::webbycommerce.product').delete({
        where: { id },
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      ctx.send({ data: product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in deleteProduct:`, error);
      ctx.internalServerError('Failed to delete product. Please try again.');
    }
  },

  /**
   * Get related products
   */
  async getRelatedProducts(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { id } = ctx.params;
      const { limit = 4 } = ctx.query;

      // Get the current product to find related products
      const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id },
        populate: ['product_categories', 'tags'],
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      const where = {
        id: { $ne: id }, // Exclude current product
        publishedAt: { $notNull: true } // Only published products
      };

      // Find products in same categories or with same tags
      const categoryIds = product.product_categories?.map(cat => cat.id) || [];
      const tagIds = product.tags?.map(tag => tag.id) || [];

      if (categoryIds.length > 0 || tagIds.length > 0) {
        where.$or = [];
        if (categoryIds.length > 0) {
          where.$or.push({ product_categories: { id: { $in: categoryIds } } });
        }
        if (tagIds.length > 0) {
          where.$or.push({ tags: { id: { $in: tagIds } } });
        }
      }

      const relatedProducts = await strapi.db.query('plugin::webbycommerce.product').findMany({
        where,
        limit: parseInt(limit, 10),
        orderBy: { createdAt: 'desc' },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      ctx.send({ data: relatedProducts });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getRelatedProducts:`, error);
      ctx.internalServerError('Failed to fetch related products. Please try again.');
    }
  },

  /**
   * Get product categories
   */
  async getCategories(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { limit = 20, start = 0, parent } = ctx.query;

      const where = { is_active: true };

      if (parent !== undefined) {
        if (parent === 'null' || parent === '') {
          where.parent = null; // Root categories
        } else {
          where.parent = { id: parent };
        }
      }

      const categories = await strapi.db.query('plugin::webbycommerce.product-category').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: { sort_order: 'asc' },
        populate: ['parent', 'children'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-category').count({ where });

      ctx.send({
        data: categories,
        meta: {
          total,
          limit: parseInt(limit, 10),
          start: parseInt(start, 10)
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getCategories:`, error);
      ctx.internalServerError('Failed to fetch categories. Please try again.');
    }
  },

  /**
   * Get product tags
   */
  async getTags(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { limit = 20, start = 0, search } = ctx.query;

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
        orderBy: { name: 'asc' },
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-tag').count({ where });

      ctx.send({
        data: tags,
        meta: {
          total,
          limit: parseInt(limit, 10),
          start: parseInt(start, 10)
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getTags:`, error);
      ctx.internalServerError('Failed to fetch tags. Please try again.');
    }
  },

  /**
   * Get product attributes
   */
  async getAttributes(ctx) {
    try {
      // Check ecommerce permission
      if (!(await ensureEcommercePermission(ctx))) {
        return;
      }

      const { limit = 20, start = 0, is_variation } = ctx.query;

      const where = {};

      if (is_variation !== undefined) {
        where.is_variation = is_variation === 'true';
      }

      const attributes = await strapi.db.query('plugin::webbycommerce.product-attribute').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: { sort_order: 'asc' },
        populate: ['product_attribute_values'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product-attribute').count({ where });

      ctx.send({
        data: attributes,
        meta: {
          total,
          limit: parseInt(limit, 10),
          start: parseInt(start, 10)
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getAttributes:`, error);
      ctx.internalServerError('Failed to fetch attributes. Please try again.');
    }
  },

  // Standard Strapi controller methods for content manager
  async find(ctx) {
    try {
      const { product_category, tag, search, limit = 25, start = 0, sort = 'createdAt:desc' } = ctx.query;

      const where = { publishedAt: { $notNull: true } }; // Only published products

      if (product_category) {
        where.product_categories = { id: product_category };
      }

      if (tag) {
        where.tags = { id: tag };
      }

      if (search) {
        where.name = { $containsi: search };
      }

      const products = await strapi.db.query('plugin::webbycommerce.product').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: sort.split(':').reduce((acc, val, i) => {
          if (i === 0) acc[val] = 'asc';
          else acc[val] = 'desc';
          return acc;
        }, {}),
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      const total = await strapi.db.query('plugin::webbycommerce.product').count({ where });

      ctx.send({
        data: products,
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
      ctx.internalServerError('Failed to fetch products.');
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id, publishedAt: { $notNull: true } },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      ctx.send({ data: product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
      ctx.internalServerError('Failed to fetch product.');
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body.data || ctx.request.body;

      // Validate required fields
      if (!data.name || data.price === undefined || data.price === null) {
        return ctx.badRequest('Name and price are required.');
      }

      // Validate and parse numeric fields
      const parsedPrice = parseFloat(data.price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return ctx.badRequest('Price must be a valid positive number.');
      }
      data.price = parsedPrice;

      if (data.sale_price !== undefined && data.sale_price !== null) {
        const parsedSalePrice = parseFloat(data.sale_price);
        if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
          return ctx.badRequest('Sale price must be a valid positive number.');
        }
        data.sale_price = parsedSalePrice;
      }

      if (data.stock_quantity !== undefined && data.stock_quantity !== null) {
        const parsedStockQuantity = parseInt(data.stock_quantity, 10);
        if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
          return ctx.badRequest('Stock quantity must be a valid non-negative integer.');
        }
        data.stock_quantity = parsedStockQuantity;
      }

      if (data.weight !== undefined && data.weight !== null) {
        const parsedWeight = parseFloat(data.weight);
        if (isNaN(parsedWeight) || parsedWeight < 0) {
          return ctx.badRequest('Weight must be a valid positive number.');
        }
        data.weight = parsedWeight;
      }

      // Set publishedAt if not provided
      if (!data.publishedAt) {
        data.publishedAt = new Date();
      }

      // Extract relations before creating
      const relations = {
        product_categories: data.product_categories || [],
        tags: data.tags || [],
        images: data.images || [],
      };

      // Remove relations from data object for initial creation
      delete data.product_categories;
      delete data.tags;
      delete data.images;

      // Normalize relation IDs
      if (Array.isArray(relations.product_categories) && relations.product_categories.length > 0) {
        relations.product_categories = relations.product_categories.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }
      if (Array.isArray(relations.tags) && relations.tags.length > 0) {
        relations.tags = relations.tags.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }
      if (Array.isArray(relations.images) && relations.images.length > 0) {
        relations.images = relations.images.map(id => 
          typeof id === 'object' && id.id ? id.id : id
        );
      }

      // Use entityService for Strapi v5 document model compatibility
      const product = await strapi.entityService.create('plugin::webbycommerce.product', {
        data,
      });

      // Update product with relations to ensure they're properly linked in document model
      const updateData = {};
      if (relations.product_categories.length > 0) {
        updateData.product_categories = relations.product_categories;
      }
      if (relations.tags.length > 0) {
        updateData.tags = relations.tags;
      }
      if (relations.images.length > 0) {
        updateData.images = relations.images;
      }

      let updatedProduct = product;
      if (Object.keys(updateData).length > 0) {
        updatedProduct = await strapi.entityService.update('plugin::webbycommerce.product', product.id, {
          data: updateData,
        });
      }

      // Populate relations for response
      const populated = await strapi.entityService.findOne('plugin::webbycommerce.product', updatedProduct.id, {
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      ctx.send({ data: populated || updatedProduct });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
      ctx.internalServerError('Failed to create product.');
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body.data || ctx.request.body;

      // Validate numeric fields if they are being updated
      if (data.price !== undefined && data.price !== null) {
        const parsedPrice = parseFloat(data.price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
          return ctx.badRequest('Price must be a valid positive number.');
        }
        data.price = parsedPrice;
      }

      if (data.sale_price !== undefined && data.sale_price !== null) {
        const parsedSalePrice = parseFloat(data.sale_price);
        if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
          return ctx.badRequest('Sale price must be a valid positive number.');
        }
        data.sale_price = parsedSalePrice;
      }

      if (data.stock_quantity !== undefined && data.stock_quantity !== null) {
        const parsedStockQuantity = parseInt(data.stock_quantity, 10);
        if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
          return ctx.badRequest('Stock quantity must be a valid non-negative integer.');
        }
        data.stock_quantity = parsedStockQuantity;
      }

      if (data.weight !== undefined && data.weight !== null) {
        const parsedWeight = parseFloat(data.weight);
        if (isNaN(parsedWeight) || parsedWeight < 0) {
          return ctx.badRequest('Weight must be a valid positive number.');
        }
        data.weight = parsedWeight;
      }

      const product = await strapi.db.query('plugin::webbycommerce.product').update({
        where: { id },
        data,
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      // Populate relations for response
      const populated = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id: product.id },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });

      ctx.send({ data: populated || product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
      ctx.internalServerError('Failed to update product.');
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const product = await strapi.db.query('plugin::webbycommerce.product').delete({
        where: { id },
      });

      if (!product) {
        return ctx.notFound('Product not found.');
      }

      ctx.send({ data: product });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
      ctx.internalServerError('Failed to delete product.');
    }
  },
};