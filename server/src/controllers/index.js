'use strict';

const controller = require('./controller');
const auth = require('./auth');
const address = require('./address');
const compare = require('./compare');
const order = require('./order');
const payment = require('./payment');
const product = require('./product');
const productTag = require('./productTag');
const productCategory = require('./category');
const productVariation = require('./productVariation');
const cart = require('./cart');
const wishlist = require('./wishlist');
const ecommerce = require('./ecommerce');
const shipping = require('./shipping');

module.exports = {
  controller,
  auth,
  address,
  compare,
  order,
  payment,
  product,
  productTag,
  productCategory,
  productVariation,
  cart,
  wishlist,
  ecommerce,
  shipping,
};

