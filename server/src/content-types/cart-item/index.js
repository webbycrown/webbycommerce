'use strict';

const schema = {
  kind: 'collectionType',
  collectionName: 'cart_items',
  info: {
    singularName: 'cart-item',
    pluralName: 'cart-items',
    displayName: 'Cart Item',
    description: "Line items in a user's shopping cart",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-api': {
      visible: true,
    },
  },
  attributes: {
    user: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::users-permissions.user',
    },
    cart: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::webbycommerce.cart',
      inversedBy: 'items',
    },
    product: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::webbycommerce.product',
    },
    variation: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::webbycommerce.product-variation',
    },
    quantity: {
      type: 'integer',
      required: true,
      min: 1,
      default: 1,
    },
    unit_price: {
      type: 'decimal',
      required: true,
      min: 0,
    },
    total_price: {
      type: 'decimal',
      required: true,
      min: 0,
    },
    attributes: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'plugin::webbycommerce.product-attribute',
      required: false,
    },
    attributeValues: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'plugin::webbycommerce.product-attribute-value',
      required: false,
    },
  },
};

module.exports = {
  schema,
};

