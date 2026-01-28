'use strict';

/**
 * compare.js
 *
 * Compare content type lifecycle
 */

const schema = {
  kind: 'collectionType',
  collectionName: 'compares',
  info: {
    singularName: 'compare',
    pluralName: 'compares',
    displayName: 'Compare',
    description: 'User compare list for comparing products',
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
      mappedBy: 'compares',
      max: 4, // Limit to 4 products for comparison
    },
    category: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::webbycommerce.product-category',
      inversedBy: 'compares',
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
    notes: {
      type: 'text',
      required: false,
    },
  },
};

module.exports = {
  schema,
};