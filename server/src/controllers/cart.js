'use strict';

const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');
const { randomUUID } = require('crypto');

const getGuestIdFromRequest = (ctx) => {
  const header = ctx?.request?.header || {};
  const fromHeader = header['x-guest-id'] || header['x-guestid'] || header['guest-id'];
  const fromQuery = ctx?.query?.guest_id || ctx?.query?.guestId;
  const fromBody = ctx?.request?.body?.guest_id || ctx?.request?.body?.guestId;
  const value = fromHeader || fromQuery || fromBody;
  return value ? String(value) : null;
};

module.exports = {
  async getCart(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx) || randomUUID();
      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      const items = await cartService.getCartItems({ cartId: cart.id });
      const totals = await cartService.getTotalsFromItems(items);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          items,
          totals,
        },
      });
    } catch (error) {
      strapi.log.error('Error fetching cart:', error);
      ctx.badRequest('Failed to fetch cart', { error: error.message });
    }
  },

  // Optional alias used by bootstrap middleware (getCart is preferred)
  async getItems(ctx) {
    return await this.getCart(ctx);
  },

  async createCart(ctx) {
    // Ensure a cart exists and return its id (for guests we auto-generate guest_id)
    return await this.getCart(ctx);
  },

  async addItem(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const { productId, quantity } = ctx.request.body || {};

      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx) || randomUUID();
      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      await cartService.addOrUpdateItem({ cartId: cart.id, userId: user?.id, productId, quantity });

      const items = await cartService.getCartItems({ cartId: cart.id });
      const totals = await cartService.getTotalsFromItems(items);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          items,
          totals,
        },
        message: 'Item added to cart',
      });
    } catch (error) {
      strapi.log.error('Error adding item to cart:', error);
      const status = error?.status || 400;
      if (status === 404) return ctx.notFound(error.message);
      return ctx.badRequest(error.message);
    }
  },

  async updateItem(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const { id } = ctx.params || {};
      const { quantity } = ctx.request.body || {};

      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx);
      if (!user && !guestId) return ctx.badRequest('guest_id is required for guest cart');

      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      await cartService.updateItemQuantity({ cartId: cart.id, userId: user?.id, cartItemId: id, quantity });

      const items = await cartService.getCartItems({ cartId: cart.id });
      const totals = await cartService.getTotalsFromItems(items);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          items,
          totals,
        },
        message: 'Cart item updated',
      });
    } catch (error) {
      strapi.log.error('Error updating cart item:', error);
      const status = error?.status || 400;
      if (status === 404) return ctx.notFound(error.message);
      return ctx.badRequest(error.message);
    }
  },

  async removeItem(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const { id } = ctx.params || {};
      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx);
      if (!user && !guestId) return ctx.badRequest('guest_id is required for guest cart');

      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      await cartService.removeItem({ cartId: cart.id, cartItemId: id });

      const items = await cartService.getCartItems({ cartId: cart.id });
      const totals = await cartService.getTotalsFromItems(items);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          items,
          totals,
        },
        message: 'Cart item removed',
      });
    } catch (error) {
      strapi.log.error('Error removing cart item:', error);
      const status = error?.status || 400;
      if (status === 404) return ctx.notFound(error.message);
      return ctx.badRequest(error.message);
    }
  },

  async clearCart(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx);
      if (!user && !guestId) return ctx.badRequest('guest_id is required for guest cart');

      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      await cartService.clearCart(cart.id);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          items: [],
          totals: await cartService.getTotalsFromItems([]),
        },
        message: 'Cart cleared',
      });
    } catch (error) {
      strapi.log.error('Error clearing cart:', error);
      ctx.badRequest('Failed to clear cart', { error: error.message });
    }
  },

  async getTotals(ctx) {
    try {
      const user = ctx.state.user;
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) return;

      const cartService = strapi.plugin('webbycommerce').service('cart');
      const guestId = user ? null : getGuestIdFromRequest(ctx);
      if (!user && !guestId) return ctx.badRequest('guest_id is required for guest cart');

      const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
      const items = await cartService.getCartItems({ cartId: cart.id });
      const totals = await cartService.getTotalsFromItems(items);

      ctx.send({
        data: {
          cart: {
            id: cart.id,
            guest_id: cart.guest_id || guestId || null,
            currency: cart.currency || 'USD',
          },
          totals,
        },
      });
    } catch (error) {
      strapi.log.error('Error calculating cart totals:', error);
      ctx.badRequest('Failed to calculate totals', { error: error.message });
    }
  },

  async applyCoupon(ctx) {
    // Placeholder for future coupon support (route exists for legacy compatibility)
    ctx.badRequest('Coupon support is not implemented yet');
  },

  async removeCoupon(ctx) {
    // Placeholder for future coupon support (route exists for legacy compatibility)
    ctx.badRequest('Coupon support is not implemented yet');
  },

  async checkout(ctx) {
    // Delegate to existing order checkout implementation
    const orderController = strapi.plugin('webbycommerce').controller('order');
    if (orderController && typeof orderController.checkout === 'function') {
      return await orderController.checkout(ctx);
    }
    return ctx.badRequest('Checkout is not available');
  },
};

