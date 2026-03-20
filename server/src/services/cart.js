'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

const CART_UID = 'plugin::webbycommerce.cart';
const CART_ITEM_UID = 'plugin::webbycommerce.cart-item';
const PRODUCT_UID = 'plugin::webbycommerce.product';
const COUPON_UID = 'plugin::webbycommerce.coupon';

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
    let cart;
    if (userId) {
      cart = await strapi.db.query(CART_UID).findOne({
        where: { user: userId },
        select: ['id', 'guest_id', 'currency'],
      });
      if (cart?.id) {
        // Populate coupon separately
        const cartWithCoupon = await strapi.db.query(CART_UID).findOne({
          where: { id: cart.id },
          populate: { coupon: true },
        });
        return cartWithCoupon || cart;
      }

      cart = await strapi.db.query(CART_UID).create({
        data: {
          user: userId,
          currency: 'USD',
        },
        select: ['id', 'guest_id', 'currency'],
      });
      // Populate coupon for new cart
      return await strapi.db.query(CART_UID).findOne({
        where: { id: cart.id },
        populate: { coupon: true },
      });
    }

    // Guest cart flow
    if (guestId) {
      cart = await strapi.db.query(CART_UID).findOne({
        where: { guest_id: String(guestId) },
        select: ['id', 'guest_id', 'currency'],
      });
      if (cart?.id) {
        // Populate coupon separately
        const cartWithCoupon = await strapi.db.query(CART_UID).findOne({
          where: { id: cart.id },
          populate: { coupon: true },
        });
        return cartWithCoupon || cart;
      }

      cart = await strapi.db.query(CART_UID).create({
        data: {
          guest_id: String(guestId),
          currency: 'USD',
        },
        select: ['id', 'guest_id', 'currency'],
      });
      // Populate coupon for new cart
      return await strapi.db.query(CART_UID).findOne({
        where: { id: cart.id },
        populate: { coupon: true },
      });
    }

    // Caller should pass guestId if they want determinism
    cart = await strapi.db.query(CART_UID).create({
      data: {
        currency: 'USD',
      },
      select: ['id', 'guest_id', 'currency'],
    });
    // Populate coupon for new cart
    return await strapi.db.query(CART_UID).findOne({
      where: { id: cart.id },
      populate: { coupon: true },
    });
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

  async getTotalsFromItems(items, coupon = null) {
    const safe = Array.isArray(items) ? items : [];
    const totalItems = safe.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
    const subtotal = safe.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);

    // Calculate discount from coupon
    let discount = 0;
    if (coupon) {
      if (coupon.type === 'percentage') {
        discount = (subtotal * Number(coupon.value || 0)) / 100;
      } else if (coupon.type === 'fixed') {
        discount = Number(coupon.value || 0);
        // Don't allow discount to exceed subtotal
        if (discount > subtotal) {
          discount = subtotal;
        }
      }
    }

    const tax = 0;
    const shipping = 0;
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

  async validateAndApplyCoupon({ cartId, couponCode }) {
    if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
      const err = new Error('Coupon code is required');
      err.status = 400;
      throw err;    
    }

    // Find coupon by code (case-insensitive search)
    const normalizedCode = couponCode.trim();
    strapi.log.info(`[webbycommerce] Looking for coupon code: "${normalizedCode}"`);
    
    let coupon = null;
    
    // Try multiple approaches to find the coupon
    try {
      // Approach 1: Use entityService with simple filter
      const coupons = await strapi.entityService.findMany(COUPON_UID, {
        filters: {
          code: normalizedCode,
        },
      });
      
      strapi.log.debug(`[webbycommerce] entityService found ${coupons?.length || 0} coupons with exact match`);
      if (coupons && Array.isArray(coupons) && coupons.length > 0) {
        coupon = coupons[0];
        strapi.log.debug(`[webbycommerce] Found via entityService: "${coupon.code}"`);
      }
    } catch (entityServiceError) {
      strapi.log.warn(`[webbycommerce] entityService query failed:`, entityServiceError.message);
    }

    // Approach 2: If not found, try db.query with exact match
    if (!coupon) {
      try {
        coupon = await strapi.db.query(COUPON_UID).findOne({
          where: { code: normalizedCode },
        });
        if (coupon) {
          strapi.log.debug(`[webbycommerce] Found via db.query: "${coupon.code}"`);
        } else {
          strapi.log.debug(`[webbycommerce] db.query exact match returned null`);
        }
      } catch (dbError) {
        strapi.log.warn(`[webbycommerce] db.query exact match failed:`, dbError.message);
      }
    }

    // Approach 2b: Try db.query with case variations
    if (!coupon) {
      try {
        coupon = await strapi.db.query(COUPON_UID).findOne({
          where: { code: normalizedCode.toUpperCase() },
        });
        if (coupon) {
          strapi.log.debug(`[webbycommerce] Found via db.query (uppercase): "${coupon.code}"`);
        }
      } catch (dbError) {
        // Ignore
      }
    }

    if (!coupon) {
      try {
        coupon = await strapi.db.query(COUPON_UID).findOne({
          where: { code: normalizedCode.toLowerCase() },
        });
        if (coupon) {
          strapi.log.debug(`[webbycommerce] Found via db.query (lowercase): "${coupon.code}"`);
        }
      } catch (dbError) {
        // Ignore
      }
    }

    // Approach 3: If still not found, get all coupons and do case-insensitive match
    if (!coupon) {
      try {
        strapi.log.debug(`[webbycommerce] Trying fallback: fetching all coupons for case-insensitive match`);
        const allCoupons = await strapi.entityService.findMany(COUPON_UID, {
          filters: {},
        });
        
        strapi.log.debug(`[webbycommerce] Fetched ${allCoupons?.length || 0} total coupons`);
        
        if (allCoupons && Array.isArray(allCoupons)) {
          // Log all coupon codes for debugging
          const allCodes = allCoupons.map(c => `"${c.code || 'N/A'}"`).join(', ');
          strapi.log.debug(`[webbycommerce] All coupon codes: ${allCodes}`);
          
          // Case-insensitive match
          coupon = allCoupons.find(
            (c) => {
              const couponCode = c.code ? String(c.code).trim() : '';
              const searchCode = normalizedCode.toLowerCase();
              const match = couponCode.toLowerCase() === searchCode;
              if (match) {
                strapi.log.debug(`[webbycommerce] Case-insensitive match found: "${couponCode}" === "${normalizedCode}"`);
              }
              return match;
            }
          );
        }
      } catch (fallbackError) {
        strapi.log.error(`[webbycommerce] Fallback query failed:`, fallbackError.message, fallbackError.stack);
      }
    }

    // If still not found, log for debugging
    if (!coupon) {
      strapi.log.error(`[webbycommerce] Coupon not found: "${normalizedCode}"`);
      // List available coupons for debugging
      try {
        const availableCoupons = await strapi.entityService.findMany(COUPON_UID, {
          filters: {},
        });
        if (availableCoupons && Array.isArray(availableCoupons)) {
          const codes = availableCoupons.slice(0, 20).map(c => `"${c.code || 'N/A'}"`).join(', ');
          strapi.log.error(`[webbycommerce] Available coupons (${availableCoupons.length}): ${codes}`);
        } else {
          strapi.log.error(`[webbycommerce] No coupons found in database or query returned invalid format`);
        }
      } catch (debugError) {
        strapi.log.error(`[webbycommerce] Error fetching coupons for debug:`, debugError.message, debugError.stack);
      }
      const err = new Error('Invalid coupon code');
      err.status = 400;
      throw err;
    }

    strapi.log.info(`[webbycommerce] Found coupon: "${coupon.code}" (ID: ${coupon.id}, Active: ${coupon.is_active})`);

    // Check if coupon is active
    if (coupon.is_active === false) {
      const err = new Error('This coupon is not active');
      err.status = 400;
      throw err;
    }

    // Check if coupon has expired
    if (coupon.expires_at) {
      const now = new Date();
      const expiresAt = new Date(coupon.expires_at);
      if (expiresAt < now) {
        const err = new Error('This coupon has expired');
        err.status = 400;
        throw err;
      }
    }

    // Check usage limit
    if (coupon.usage_limit !== null && coupon.usage_limit !== undefined) {
      const usedCount = coupon.used_count || 0;
      if (usedCount >= coupon.usage_limit) {
        const err = new Error('This coupon has reached its usage limit');
        err.status = 400;
        throw err;
      }
    }

    // Get cart items to calculate subtotal
    const items = await this.getCartItems({ cartId });
    const subtotal = items.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);

    // Check minimum order amount
    if (coupon.minimum_order_amount !== null && coupon.minimum_order_amount !== undefined) {
      if (subtotal < Number(coupon.minimum_order_amount)) {
        const err = new Error(
          `Minimum order amount of ${coupon.minimum_order_amount} required for this coupon`
        );
        err.status = 400;
        throw err;
      }
    }

    // Apply coupon to cart
    await strapi.db.query(CART_UID).update({
      where: { id: cartId },
      data: { coupon: coupon.id },
    });

    return coupon;
  },

  async removeCoupon({ cartId }) {
    await strapi.db.query(CART_UID).update({
      where: { id: cartId },
      data: { coupon: null },
    });
    return true;
  },
}));

