'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

const CART_UID = 'plugin::webbycommerce.cart';
const CART_ITEM_UID = 'plugin::webbycommerce.cart-item';
const PRODUCT_UID = 'plugin::webbycommerce.product';

const asInt = (value) => {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : null;
};

const asQty = (value) => {
  const n = asInt(value);
  if (!n || n < 1) return null;
  return n;
};

module.exports = createCoreService(CART_ITEM_UID, ({ strapi }) => ({
  async getOrCreateCart({ userId, guestId }) {
    if (userId) {
      const existing = await strapi.db.query(CART_UID).findOne({
        where: { user: userId },
        select: ['id', 'guest_id', 'currency'],
      });
      if (existing?.id) return existing;

      return await strapi.db.query(CART_UID).create({
        data: {
          user: userId,
          currency: 'USD',
        },
        select: ['id', 'guest_id', 'currency'],
      });
    }

    // Guest cart flow
    if (guestId) {
      const existing = await strapi.db.query(CART_UID).findOne({
        where: { guest_id: String(guestId) },
        select: ['id', 'guest_id', 'currency'],
      });
      if (existing?.id) return existing;

      return await strapi.db.query(CART_UID).create({
        data: {
          guest_id: String(guestId),
          currency: 'USD',
        },
        select: ['id', 'guest_id', 'currency'],
      });
    }

    // Caller should pass guestId if they want determinism
    const created = await strapi.db.query(CART_UID).create({
      data: {
        currency: 'USD',
      },
      select: ['id', 'guest_id', 'currency'],
    });
    return created;
  },

  async getCartItems({ cartId }) {
    return await strapi.db.query(CART_ITEM_UID).findMany({
      where: { cart: cartId },
      orderBy: { createdAt: 'desc' },
      populate: {
        product: { populate: ['images'] },
        variation: true,
        attributes: true,
        attributeValues: true,
      },
    });
  },

  async getTotalsFromItems(items) {
    const safe = Array.isArray(items) ? items : [];
    const totalItems = safe.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
    const subtotal = safe.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);

    // You can extend these later with tax/shipping/discount/coupon logic.
    const tax = 0;
    const shipping = 0;
    const discount = 0;
    const total = subtotal + tax + shipping - discount;

    return {
      totalItems,
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2)),
      currency: 'USD',
    };
  },

  async addOrUpdateItem({ cartId, userId, productId, quantity }) {
    const qty = asQty(quantity);
    const pid = asInt(productId);
    if (!pid) {
      const err = new Error('Product ID is required');
      // @ts-ignore
      err.status = 400;
      throw err;
    }
    if (!qty) {
      const err = new Error('Quantity must be an integer >= 1');
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    const product = await strapi.db.query(PRODUCT_UID).findOne({
      where: { id: pid },
      select: ['id', 'name', 'price', 'sku', 'stock_status', 'stock_quantity'],
    });
    if (!product) {
      const err = new Error('Product not found');
      // @ts-ignore
      err.status = 404;
      throw err;
    }

    // Stock validation:
    // - If stock_quantity is null/undefined => treat as unlimited (common for digital products)
    // - Else enforce quantity <= stock_quantity when not on backorder
    if (
      product.stock_status === 'out_of_stock' ||
      (product.stock_quantity !== null &&
        product.stock_quantity !== undefined &&
        product.stock_status !== 'on_backorder' &&
        product.stock_quantity < qty)
    ) {
      const available =
        product.stock_quantity === null || product.stock_quantity === undefined
          ? null
          : product.stock_quantity;
      const err = new Error(
        available === null
          ? 'Product is out of stock'
          : `Insufficient stock. Available: ${available}, Requested: ${qty}`
      );
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    const unitPrice = Number(product.price || 0);

    const existing = await strapi.db.query(CART_ITEM_UID).findOne({
      where: { cart: cartId, product: product.id },
      select: ['id', 'quantity'],
    });

    if (existing?.id) {
      const newQty = (Number(existing.quantity) || 0) + qty;
      if (
        product.stock_quantity !== null &&
        product.stock_quantity !== undefined &&
        product.stock_status !== 'on_backorder' &&
        product.stock_quantity < newQty
      ) {
        const err = new Error(
          `Insufficient stock for updated quantity. Available: ${product.stock_quantity}, Total requested: ${newQty}`
        );
        // @ts-ignore
        err.status = 400;
        throw err;
      }

      return await strapi.db.query(CART_ITEM_UID).update({
        where: { id: existing.id },
        data: {
          user: userId || null,
          cart: cartId,
          quantity: newQty,
          unit_price: unitPrice,
          total_price: unitPrice * newQty,
        },
      });
    }

    return await strapi.db.query(CART_ITEM_UID).create({
      data: {
        user: userId || null,
        cart: cartId,
        product: product.id,
        quantity: qty,
        unit_price: unitPrice,
        total_price: unitPrice * qty,
      },
    });
  },

  async updateItemQuantity({ cartId, userId, cartItemId, quantity }) {
    const qty = asQty(quantity);
    const id = asInt(cartItemId);
    if (!id) {
      const err = new Error('Cart item ID is required');
      // @ts-ignore
      err.status = 400;
      throw err;
    }
    if (!qty) {
      const err = new Error('Quantity must be an integer >= 1');
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    const existing = await strapi.db.query(CART_ITEM_UID).findOne({
      where: { id, cart: cartId },
      populate: { product: { select: ['id', 'price', 'stock_status', 'stock_quantity', 'name'] } },
    });
    if (!existing) {
      const err = new Error('Cart item not found');
      // @ts-ignore
      err.status = 404;
      throw err;
    }

    const product = existing.product;
    if (!product) {
      const err = new Error('Product not found for this cart item');
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    if (
      product.stock_status === 'out_of_stock' ||
      (product.stock_quantity !== null &&
        product.stock_quantity !== undefined &&
        product.stock_status !== 'on_backorder' &&
        product.stock_quantity < qty)
    ) {
      const available =
        product.stock_quantity === null || product.stock_quantity === undefined
          ? null
          : product.stock_quantity;
      const err = new Error(
        available === null
          ? `Product is out of stock: ${product.name}`
          : `Insufficient stock. Available: ${available}, Requested: ${qty}`
      );
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    const unitPrice = Number(product.price || existing.unit_price || 0);
    return await strapi.db.query(CART_ITEM_UID).update({
      where: { id: existing.id },
      data: {
        user: userId || null,
        cart: cartId,
        quantity: qty,
        unit_price: unitPrice,
        total_price: unitPrice * qty,
      },
    });
  },

  async removeItem({ cartId, cartItemId }) {
    const id = asInt(cartItemId);
    if (!id) {
      const err = new Error('Cart item ID is required');
      // @ts-ignore
      err.status = 400;
      throw err;
    }

    const existing = await strapi.db.query(CART_ITEM_UID).findOne({
      where: { id, cart: cartId },
      select: ['id'],
    });
    if (!existing) {
      const err = new Error('Cart item not found');
      // @ts-ignore
      err.status = 404;
      throw err;
    }

    await strapi.db.query(CART_ITEM_UID).delete({ where: { id: existing.id } });
    return true;
  },

  async clearCart(cartId) {
    await strapi.db.query(CART_ITEM_UID).deleteMany({
      where: { cart: cartId },
    });
    return true;
  },
}));

