'use strict';

/**
 * wishlist service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::webbycommerce.wishlist', ({ strapi }) => ({
  async findUserWishlist(userId) {
    try {
      const wishlists = await strapi.db.query('plugin::webbycommerce.wishlist').findMany({
        where: {
          userId: String(userId),
        },
        orderBy: { createdAt: 'desc' },
        populate: {
          products: {
            populate: {
              images: true,
              product_categories: true,
              tags: true,
              variations: {
                populate: {
                  attributes: true,
                  attributeValues: true,
                },
              },
            },
          },
        },
      });

      return wishlists.length > 0 ? wishlists[0] : null;
    } catch (error) {
      throw new Error(`Failed to find user wishlist: ${error.message}`);
    }
  },

  async createUserWishlist(userId, userEmail, data = {}) {
    try {
      const wishlistData = {
        userId: String(userId),
        userEmail,
        products: [],
        isPublic: data.isPublic || false,
        name: data.name || null,
        description: data.description || null,
      };

      await strapi.entityService.create('plugin::webbycommerce.wishlist', {
        data: wishlistData,
      });

      // Refetch wishlist with populated products
      return await this.findUserWishlist(userId);
    } catch (error) {
      throw new Error(`Failed to create user wishlist: ${error.message}`);
    }
  },

  async addProductToWishlist(userId, userEmail, productId) {
    try {
      // Find existing wishlist or create new one
      let wishlist = await this.findUserWishlist(userId);

      if (!wishlist) {
        wishlist = await this.createUserWishlist(userId, userEmail);
      }

      // Ensure products array exists (for newly created wishlists)
      if (!wishlist.products) {
        wishlist.products = [];
      }

      // Check if product already exists in wishlist
      // Handle both populated (object with id) and unpopulated (just id) cases
      const productExists = wishlist.products.some(product => {
        const productIdValue = typeof product === 'object' && product !== null ? product.id : product;
        return productIdValue === parseInt(productId);
      });

      if (productExists) {
        throw new Error('Product already exists in wishlist');
      }

      // Verify product exists (check both published and draft products)
      const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id: productId },
        populate: ['product_categories', 'tags', 'images', 'variations'],
      });
      if (!product) {
        throw new Error('Product not found');
      }

      // Get existing product IDs (handle both populated and unpopulated cases)
      const existingProductIds = wishlist.products.map(p => {
        return typeof p === 'object' && p !== null ? p.id : p;
      }).filter(id => id != null);

      // Add product to wishlist
      await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: { set: [...existingProductIds, parseInt(productId, 10)].map((id) => ({ id })) },
        },
      });

      // Refetch wishlist with populated products
      return await this.findUserWishlist(userId);
    } catch (error) {
      throw new Error(`Failed to add product to wishlist: ${error.message}`);
    }
  },

  async removeProductFromWishlist(userId, productId) {
    try {
      const wishlist = await this.findUserWishlist(userId);

      if (!wishlist) {
        throw new Error('Wishlist not found');
      }

      // Ensure products array exists
      if (!wishlist.products) {
        wishlist.products = [];
      }

      // Remove product from wishlist
      // Handle both populated (object with id) and unpopulated (just id) cases
      const updatedProducts = wishlist.products
        .filter(product => {
          const productIdValue = typeof product === 'object' && product !== null ? product.id : product;
          return productIdValue !== parseInt(productId);
        })
        .map(product => {
          return typeof product === 'object' && product !== null ? product.id : product;
        });

      await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: { set: updatedProducts.map((id) => ({ id })) },
        },
      });

      // Refetch wishlist with populated products
      return await this.findUserWishlist(userId);
    } catch (error) {
      throw new Error(`Failed to remove product from wishlist: ${error.message}`);
    }
  },

  async clearWishlist(userId) {
    try {
      const wishlist = await this.findUserWishlist(userId);

      if (!wishlist) {
        throw new Error('Wishlist not found');
      }

      await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: { set: [] },
        },
      });

      // Refetch wishlist with populated products
      return await this.findUserWishlist(userId);
    } catch (error) {
      throw new Error(`Failed to clear wishlist: ${error.message}`);
    }
  },

  async updateWishlist(userId, data) {
    try {
      const wishlist = await this.findUserWishlist(userId);

      if (!wishlist) {
        throw new Error('Wishlist not found');
      }

      await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          name: data.name !== undefined ? data.name : wishlist.name,
          description: data.description !== undefined ? data.description : wishlist.description,
          isPublic: data.isPublic !== undefined ? data.isPublic : wishlist.isPublic,
        },
      });

      // Refetch wishlist with populated products
      return await this.findUserWishlist(userId);
    } catch (error) {
      throw new Error(`Failed to update wishlist: ${error.message}`);
    }
  },

  async getWishlistStats(userId) {
    try {
      const wishlist = await this.findUserWishlist(userId);

      if (!wishlist) {
        return {
          totalProducts: 0,
          totalValue: 0,
          categories: [],
        };
      }

      // Ensure products array exists
      if (!wishlist.products) {
        wishlist.products = [];
      }

      const totalProducts = wishlist.products.length;
      const totalValue = wishlist.products.reduce((sum, product) => {
        return sum + (product.price || 0);
      }, 0);

      const categoryCounts = {};
      wishlist.products.forEach(product => {
        const categoryName = product.product_categories?.[0]?.name || 'Uncategorized';
        categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
      });

      const categories = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
      }));

      return {
        totalProducts,
        totalValue,
        categories,
      };
    } catch (error) {
      throw new Error(`Failed to get wishlist stats: ${error.message}`);
    }
  },
}));