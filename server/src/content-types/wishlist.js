'use strict';

/**
 * wishlist.js
 *
 * Wishlist content type lifecycle
 */

const schema = {
  kind: 'collectionType',
  collectionName: 'wishlists',
  info: {
    singularName: 'wishlist',
    pluralName: 'wishlists',
    displayName: 'Wishlist',
    description: 'User wishlist for storing favorite products',
  },
  options: {
    draftAndPublish: false,
    timestamps: true,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    userId: {
      type: 'string',
      required: true,
      configurable: false,
    },
    userEmail: {
      type: 'email',
      required: true,
      configurable: false,
    },
    products: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'plugin::webbycommerce.product',
      mappedBy: 'wishlists',
    },
    isPublic: {
      type: 'boolean',
      default: false,
      required: false,
    },
    name: {
      type: 'string',
      maxLength: 100,
      required: false,
    },
    description: {
      type: 'text',
      required: false,
    },
  },
};

module.exports = {
  schema,
};