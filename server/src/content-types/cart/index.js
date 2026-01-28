'use strict';

const schema = {
  kind: 'collectionType',
  collectionName: 'carts',
  info: {
    singularName: 'cart',
    pluralName: 'carts',
    displayName: 'Cart',
    description: 'Shopping cart (optional wrapper around cart items).',
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
    guest_id: {
      type: 'string',
      required: false,
      unique: true,
    },
    currency: {
      type: 'string',
      required: true,
      default: 'USD',
    },
    coupon: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::webbycommerce.coupon',
      required: false,
    },
    expires_at: {
      type: 'datetime',
      required: false,
    },
    items: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'plugin::webbycommerce.cart-item',
      mappedBy: 'cart',
    },
  },
};

module.exports = {
  schema,
};

