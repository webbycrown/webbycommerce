'use strict';

/**
 * compare controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::webbycommerce.compare', ({ strapi }) => ({
  async getCompare(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .findUserCompare(user.id);

      if (!compare) {
        // Return empty compare structure
        return ctx.send({
          data: {
            id: null,
            userId: user.id,
            userEmail: user.email,
            products: [],
            category: null,
            isPublic: false,
            name: null,
            notes: null,
          },
          meta: {
            totalProducts: 0,
            comparisonData: {},
          },
        });
      }

      const compareData = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .getCompareData(user.id);

      ctx.send({
        data: compare,
        meta: {
          totalProducts: compare.products.length,
          comparisonData: compareData.comparisonData,
        },
      });
    } catch (error) {
      strapi.log.error('Error fetching compare:', error);
      ctx.badRequest('Failed to fetch compare list', { error: error.message });
    }
  },

  async addToCompare(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productId } = ctx.request.body;
      if (!productId) {
        return ctx.badRequest('Product ID is required');
      }

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .addProductToCompare(user.id, user.email, productId);

      const compareData = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .getCompareData(user.id);

      ctx.send({
        data: compare,
        meta: {
          totalProducts: compare.products.length,
          comparisonData: compareData.comparisonData,
        },
        message: 'Product added to compare list successfully',
      });
    } catch (error) {
      strapi.log.error('Error adding to compare:', error);
      ctx.badRequest('Failed to add product to compare list', { error: error.message });
    }
  },

  async removeFromCompare(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productId } = ctx.params;
      if (!productId) {
        return ctx.badRequest('Product ID is required');
      }

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .removeProductFromCompare(user.id, productId);

      const compareData = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .getCompareData(user.id);

      ctx.send({
        data: compare,
        meta: {
          totalProducts: compare.products.length,
          comparisonData: compareData.comparisonData,
        },
        message: 'Product removed from compare list successfully',
      });
    } catch (error) {
      strapi.log.error('Error removing from compare:', error);
      ctx.badRequest('Failed to remove product from compare list', { error: error.message });
    }
  },

  async clearCompare(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .clearCompare(user.id);

      ctx.send({
        data: compare,
        meta: {
          totalProducts: 0,
          comparisonData: {},
        },
        message: 'Compare list cleared successfully',
      });
    } catch (error) {
      strapi.log.error('Error clearing compare:', error);
      ctx.badRequest('Failed to clear compare list', { error: error.message });
    }
  },

  async updateCompare(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { name, notes, isPublic } = ctx.request.body;

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .updateCompare(user.id, { name, notes, isPublic });

      ctx.send({
        data: compare,
        message: 'Compare list updated successfully',
      });
    } catch (error) {
      strapi.log.error('Error updating compare:', error);
      ctx.badRequest('Failed to update compare list', { error: error.message });
    }
  },

  async getComparisonData(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const compareData = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .getCompareData(user.id);

      ctx.send({
        data: compareData,
      });
    } catch (error) {
      strapi.log.error('Error getting comparison data:', error);
      ctx.badRequest('Failed to get comparison data', { error: error.message });
    }
  },

  async checkCompareStatus(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productIds } = ctx.query;
      if (!productIds) {
        return ctx.badRequest('Product IDs are required');
      }

      const compare = await strapi
        .plugin('webbycommerce')
        .service('compare')
        .findUserCompare(user.id);

      const productIdArray = Array.isArray(productIds)
        ? productIds.map(id => parseInt(id))
        : [parseInt(productIds)];

      const inCompare = {};
      if (compare) {
        productIdArray.forEach(productId => {
          inCompare[productId] = compare.products.some(product => product.id === productId);
        });
      } else {
        productIdArray.forEach(productId => {
          inCompare[productId] = false;
        });
      }

      ctx.send({
        data: inCompare,
      });
    } catch (error) {
      strapi.log.error('Error checking compare status:', error);
      ctx.badRequest('Failed to check compare status', { error: error.message });
    }
  },
}));