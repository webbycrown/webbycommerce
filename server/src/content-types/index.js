'use strict';

const address = require('./address');

const cart = require('./cart');
const cartItem = require('./cart-item');
const compare = require('./compare');
const coupon = require('./coupon');
const order = require('./order');
const paymentTransaction = require('./payment-transaction');
const product = require('./product');
const productAttribute = require('./product-attribute');
const productAttributeValue = require('./product-attribute-value');
const productCategory = require('./product-category');
const productTag = require('./product-tag');
const productVariation = require('./product-variation');
const wishlist = require('./wishlist');
const shippingZone = require('./shipping-zone');
const shippingMethod = require('./shipping-method');
const shippingRate = require('./shipping-rate');
const shippingRule = require('./shipping-rule');

module.exports = {
  address,
  cart,
  'cart-item': cartItem,
  compare,
  coupon,
  order,
  'payment-transaction': paymentTransaction,
  product,
  'product-attribute': productAttribute,
  'product-attribute-value': productAttributeValue,
  'product-category': productCategory,
  'product-tag': productTag,
  'product-variation': productVariation,
  wishlist,
  'shipping-zone': shippingZone,
  'shipping-method': shippingMethod,
  'shipping-rate': shippingRate,
  'shipping-rule': shippingRule,
};