'use strict';

/**
 * wishlist service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::webbycommerce.wishlist', ({ strapi }) => ({
  async findUserWishlist(userId) {
    try {
      const wishlist = await strapi.entityService.findMany('plugin::webbycommerce.wishlist', {
        filters: {
          // userId is stored as a string in this content-type; normalize to string for reliable matching
          userId: String(userId),
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
        },
        sort: { createdAt: 'desc' },
      });

      return wishlist.length > 0 ? wishlist[0] : null;
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

      const wishlist = await strapi.entityService.create('plugin::webbycommerce.wishlist', {
        data: wishlistData,
      });

      return wishlist;
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
      const productExists = wishlist.products.some(product => product.id === parseInt(productId));

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

      // Add product to wishlist
      const updatedWishlist = await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: [...wishlist.products.map(p => p.id), productId],
        },
      });

      return updatedWishlist;
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
      const updatedProducts = wishlist.products
        .filter(product => product.id !== parseInt(productId))
        .map(product => product.id);

      const updatedWishlist = await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: updatedProducts,
        },
      });

      return updatedWishlist;
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

      const updatedWishlist = await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          products: [],
        },
      });

      return updatedWishlist;
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

      const updatedWishlist = await strapi.entityService.update('plugin::webbycommerce.wishlist', wishlist.id, {
        data: {
          name: data.name !== undefined ? data.name : wishlist.name,
          description: data.description !== undefined ? data.description : wishlist.description,
          isPublic: data.isPublic !== undefined ? data.isPublic : wishlist.isPublic,
        },
      });

      return updatedWishlist;
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