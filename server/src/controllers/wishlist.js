'use strict';

/**
 * wishlist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::webbycommerce.wishlist', ({ strapi }) => ({
  async getWishlist(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .findUserWishlist(user.id);

      if (!wishlist) {
        // Return empty wishlist structure
        return ctx.send({
          data: {
            id: null,
            userId: user.id,
            userEmail: user.email,
            products: [],
            isPublic: false,
            name: null,
            description: null,
          },
          meta: {
            totalProducts: 0,
            totalValue: 0,
            categories: [],
          },
        });
      }

      const stats = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .getWishlistStats(user.id);

      ctx.send({
        data: wishlist,
        meta: stats,
      });
    } catch (error) {
      strapi.log.error('Error fetching wishlist:', error);
      ctx.badRequest('Failed to fetch wishlist', { error: error.message });
    }
  },

  async addToWishlist(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productId } = ctx.request.body;
      if (!productId) {
        return ctx.badRequest('Product ID is required');
      }

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .addProductToWishlist(user.id, user.email, productId);

      const stats = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .getWishlistStats(user.id);

      ctx.send({
        data: wishlist,
        meta: stats,
        message: 'Product added to wishlist successfully',
      });
    } catch (error) {
      strapi.log.error('Error adding to wishlist:', error);
      ctx.badRequest('Failed to add product to wishlist', { error: error.message });
    }
  },

  async removeFromWishlist(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productId } = ctx.params;
      if (!productId) {
        return ctx.badRequest('Product ID is required');
      }

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .removeProductFromWishlist(user.id, productId);

      const stats = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .getWishlistStats(user.id);

      ctx.send({
        data: wishlist,
        meta: stats,
        message: 'Product removed from wishlist successfully',
      });
    } catch (error) {
      strapi.log.error('Error removing from wishlist:', error);
      ctx.badRequest('Failed to remove product from wishlist', { error: error.message });
    }
  },

  async clearWishlist(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .clearWishlist(user.id);

      ctx.send({
        data: wishlist,
        meta: {
          totalProducts: 0,
          totalValue: 0,
          categories: [],
        },
        message: 'Wishlist cleared successfully',
      });
    } catch (error) {
      strapi.log.error('Error clearing wishlist:', error);
      ctx.badRequest('Failed to clear wishlist', { error: error.message });
    }
  },

  async updateWishlist(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { name, description, isPublic } = ctx.request.body;

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .updateWishlist(user.id, { name, description, isPublic });

      ctx.send({
        data: wishlist,
        message: 'Wishlist updated successfully',
      });
    } catch (error) {
      strapi.log.error('Error updating wishlist:', error);
      ctx.badRequest('Failed to update wishlist', { error: error.message });
    }
  },

  async checkWishlistStatus(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { productIds } = ctx.query;
      if (!productIds) {
        return ctx.badRequest('Product IDs are required');
      }

      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .findUserWishlist(user.id);

      const productIdArray = Array.isArray(productIds)
        ? productIds.map(id => parseInt(id))
        : [parseInt(productIds)];

      const inWishlist = {};
      if (wishlist) {
        productIdArray.forEach(productId => {
          inWishlist[productId] = wishlist.products.some(product => product.id === productId);
        });
      } else {
        productIdArray.forEach(productId => {
          inWishlist[productId] = false;
        });
      }

      ctx.send({
        data: inWishlist,
      });
    } catch (error) {
      strapi.log.error('Error checking wishlist status:', error);
      ctx.badRequest('Failed to check wishlist status', { error: error.message });
    }
  },

  async moveToCart(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      const { id } = ctx.params;
      const { quantity = 1 } = ctx.request.body;

      if (!id) {
        return ctx.badRequest('Wishlist item ID is required');
      }

      // Get wishlist service to find the product in wishlist
      const wishlist = await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .findUserWishlist(user.id);

      if (!wishlist) {
        return ctx.notFound('Wishlist not found');
      }

      // Find the product in wishlist
      const wishlistItem = wishlist.products.find(product => product.id === parseInt(id));
      if (!wishlistItem) {
        return ctx.notFound('Product not found in wishlist');
      }

      // Check if product exists and is available
      const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
        where: { id: wishlistItem.id },
      });

      if (!product) {
        return ctx.notFound('Product not found');
      }

      // Log stock information for debugging
      strapi.log.debug(`Product ${product.id} stock status: ${product.stock_status}, quantity: ${product.stock_quantity}, requested quantity: ${quantity}`);

      // Check stock status and quantity
      if (product.stock_status === 'out_of_stock') {
        return ctx.badRequest('Product is currently out of stock');
      }

      if (product.stock_status === 'on_backorder') {
        // Allow backordered items but warn about delay
        strapi.log.warn(`Moving backordered product ${product.id} (${product.name}) to cart for user ${user.id} - item is on backorder`);
      }

      // Check quantity only if stock_quantity is defined and we're not allowing unlimited stock
      // If stock_quantity is null/undefined, assume unlimited stock (common for digital products)
      if (product.stock_quantity !== null && product.stock_quantity !== undefined && product.stock_quantity < quantity) {
        return ctx.badRequest(`Insufficient stock. Available: ${product.stock_quantity}, Requested: ${quantity}`);
      }

      // Check if item already exists in cart
      const existingCartItem = await strapi.db.query('plugin::webbycommerce.cart-item').findOne({
        where: {
          user: user.id,
          product: product.id,
        },
      });

      let cartItem;
      if (existingCartItem) {
        // Update existing cart item
        const newQuantity = existingCartItem.quantity + quantity;

        // Check stock again for updated quantity (only if stock_quantity is defined)
        if (product.stock_quantity !== null && product.stock_quantity !== undefined && product.stock_quantity < newQuantity) {
          return ctx.badRequest(`Insufficient stock for updated quantity. Available: ${product.stock_quantity}, Total requested: ${newQuantity}`);
        }

        cartItem = await strapi.db.query('plugin::webbycommerce.cart-item').update({
          where: { id: existingCartItem.id },
          data: { quantity: newQuantity },
        });
      } else {
        // Create new cart item
        cartItem = await strapi.db.query('plugin::webbycommerce.cart-item').create({
          data: {
            user: user.id,
            product: product.id,
            quantity: quantity,
            unit_price: product.price,
            total_price: product.price * quantity,
          },
        });
      }

      // Remove from wishlist
      await strapi
        .plugin('webbycommerce')
        .service('wishlist')
        .removeProductFromWishlist(user.id, product.id);

      ctx.send({
        data: {
          cart_item: {
            id: cartItem.id,
            product_id: product.id,
            product_name: product.name,
            quantity: cartItem.quantity,
            unit_price: parseFloat(product.price),
            total_price: parseFloat(product.price) * cartItem.quantity,
          },
        },
        message: 'Product moved to cart successfully',
      });
    } catch (error) {
      strapi.log.error('Error moving item to cart:', error);
      ctx.badRequest('Failed to move item to cart', { error: error.message });
    }
  },
}));