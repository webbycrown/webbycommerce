'use strict';

/**
 * compare service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::webbycommerce.compare', ({ strapi }) => ({
  async findUserCompare(userId) {
    try {
      const compare = await strapi.entityService.findMany('plugin::webbycommerce.compare', {
        filters: {
          userId: userId,
        },
        populate: {
          products: {
            populate: {
              images: true,
              product_categories: true,
              tags: true,
              variations: true,
            },
          },
          category: true,
        },
        sort: { createdAt: 'desc' },
      });

      return compare.length > 0 ? compare[0] : null;
    } catch (error) {
      throw new Error(`Failed to find user compare: ${error.message}`);
    }
  },

  async createUserCompare(userId, userEmail, data = {}) {
    try {
      const compareData = {
        userId: String(userId),
        userEmail,
        products: [],
        isPublic: data.isPublic || false,
        name: data.name || null,
        notes: data.notes || null,
        category: data.categoryId || null,
      };

      const compare = await strapi.entityService.create('plugin::webbycommerce.compare', {
        data: compareData,
      });

      return compare;
    } catch (error) {
      throw new Error(`Failed to create user compare: ${error.message}`);
    }
  },

  async addProductToCompare(userId, userEmail, productId) {
    try {
      // Find existing compare or create new one
      let compare = await this.findUserCompare(userId);

      if (!compare) {
        compare = await this.createUserCompare(userId, userEmail);
      }

      // Ensure products array exists
      if (!compare.products) {
        compare.products = [];
      }

      // Check if compare list is already full (max 4 products)
      if (compare.products.length >= 4) {
        throw new Error('Compare list is full. Maximum 4 products allowed.');
      }

      // Check if product already exists in compare
      const productExists = compare.products.some(product => product.id === parseInt(productId));

      if (productExists) {
        throw new Error('Product already exists in compare list');
      }

      // Verify product exists
      const product = await strapi.entityService.findOne('plugin::webbycommerce.product', productId, {
        populate: ['product_categories'],
      });

      if (!product) {
        throw new Error('Product not found');
      }

      // Check if product belongs to same category (optional but recommended)
      if (compare.category && product.product_categories && product.product_categories.length > 0 && compare.category.id !== product.product_categories[0].id) {
        // Allow but log warning - user can compare different categories if they want
        strapi.log.warn(`Adding product from different category to compare list. Compare category: ${compare.category.name}, Product category: ${product.product_categories[0].name}`);
      }

      // Add product to compare
      const updatedCompare = await strapi.entityService.update('plugin::webbycommerce.compare', compare.id, {
        data: {
          products: { set: [...compare.products.map(p => p.id), parseInt(productId, 10)].map((id) => ({ id })) },
          category: compare.category || product.product_categories?.[0]?.id || null,
        },
      });

      return updatedCompare;
    } catch (error) {
      throw new Error(`Failed to add product to compare: ${error.message}`);
    }
  },

  async removeProductFromCompare(userId, productId) {
    try {
      const compare = await this.findUserCompare(userId);

      if (!compare) {
        throw new Error('Compare list not found');
      }

      // Ensure products array exists
      if (!compare.products) {
        compare.products = [];
      }

      // Remove product from compare
      const updatedProducts = compare.products
        .filter(product => product.id !== parseInt(productId))
        .map(product => product.id);

      const updatedCompare = await strapi.entityService.update('plugin::webbycommerce.compare', compare.id, {
        data: {
          products: { set: updatedProducts.map((id) => ({ id })) },
          // Reset category if no products left
          category: updatedProducts.length === 0 ? null : compare.category,
        },
      });

      return updatedCompare;
    } catch (error) {
      throw new Error(`Failed to remove product from compare: ${error.message}`);
    }
  },

  async clearCompare(userId) {
    try {
      const compare = await this.findUserCompare(userId);

      if (!compare) {
        throw new Error('Compare list not found');
      }

      const updatedCompare = await strapi.entityService.update('plugin::webbycommerce.compare', compare.id, {
        data: {
          products: { set: [] },
          category: null,
        },
      });

      return updatedCompare;
    } catch (error) {
      throw new Error(`Failed to clear compare list: ${error.message}`);
    }
  },

  async updateCompare(userId, data) {
    try {
      const compare = await this.findUserCompare(userId);

      if (!compare) {
        throw new Error('Compare list not found');
      }

      const updatedCompare = await strapi.entityService.update('plugin::webbycommerce.compare', compare.id, {
        data: {
          name: data.name !== undefined ? data.name : compare.name,
          notes: data.notes !== undefined ? data.notes : compare.notes,
          isPublic: data.isPublic !== undefined ? data.isPublic : compare.isPublic,
        },
      });

      return updatedCompare;
    } catch (error) {
      throw new Error(`Failed to update compare list: ${error.message}`);
    }
  },

  async getCompareData(userId) {
    try {
      const compare = await this.findUserCompare(userId);

      if (!compare) {
        return {
          products: [],
          category: null,
          comparisonData: {},
        };
      }

      // Ensure products array exists
      if (!compare.products) {
        compare.products = [];
      }

      // Generate comparison data
      const comparisonData = this.generateComparisonData(compare.products);

      return {
        products: compare.products,
        category: compare.category,
        comparisonData,
      };
    } catch (error) {
      throw new Error(`Failed to get compare data: ${error.message}`);
    }
  },

  generateComparisonData(products) {
    if (!products || products.length === 0) {
      return {};
    }

    const comparisonData = {
      specifications: {},
      pricing: {},
      availability: {},
      ratings: {},
    };

    // Extract common specifications
    const specKeys = new Set();
    products.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => specKeys.add(key));
      }
    });

    // Build comparison matrix
    specKeys.forEach(specKey => {
      comparisonData.specifications[specKey] = {};
      products.forEach(product => {
        comparisonData.specifications[specKey][product.id] =
          product.specifications?.[specKey] || 'N/A';
      });
    });

    // Pricing comparison
    products.forEach(product => {
      comparisonData.pricing[product.id] = {
        regularPrice: product.regularPrice || 0,
        salePrice: product.salePrice || null,
        discount: product.discount || 0,
      };
    });

    // Availability comparison
    products.forEach(product => {
      comparisonData.availability[product.id] = {
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity || 0,
        status: product.status || 'active',
      };
    });

    // Ratings comparison
    products.forEach(product => {
      comparisonData.ratings[product.id] = {
        averageRating: product.averageRating || 0,
        totalReviews: product.totalReviews || 0,
      };
    });

    return comparisonData;
  },
}));