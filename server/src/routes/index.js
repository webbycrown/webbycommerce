'use strict';

const PLUGIN_ID = 'webbycommerce';

module.exports = {
  admin: {
    routes: [
      {
        method: 'GET',
        path: '/settings',
        handler: 'controller.getSettings',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
      {
        method: 'PUT',
        path: '/settings',
        handler: 'controller.updateSettings',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
      {
        method: 'POST',
        path: '/generate-demo',
        handler: 'controller.generateDemo',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
      {
        method: 'POST',
        path: '/seed-demo',
        handler: 'controller.seedDemo',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
    ],
  },
  'content-api': {
    routes: [
      {
        method: 'GET',
        // Public health-check endpoint
        // Final URL: http://localhost:1337/api/webbycommerce/health
        // Custom prefix support handled in bootstrap.js middleware
        path: '/health',
        handler: 'controller.health',
        config: {
          auth: false,
          policies: [],
        },
        info: {
          type: 'content-api',
          pluginName: PLUGIN_ID,
          description: 'Health check for Strapi Advanced Ecommerce plugin',
          summary: 'Ecommerce health',
          tags: ['Strapi Advanced Ecommerce'],
        },
      },
      {
        method: 'POST',
        path: '/auth/login-register',
        handler: 'auth.loginOrRegister',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/auth/verify-otp',
        handler: 'auth.verifyOtp',
        config: {
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/auth/profile',
        handler: 'auth.getProfile',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/auth/profile',
        handler: 'auth.updateProfile',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/addresses',
        handler: 'address.getAddresses',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/addresses/:id',
        handler: 'address.getAddress',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/addresses',
        handler: 'address.createAddress',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/addresses/:id',
        handler: 'address.updateAddress',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/addresses/:id',
        handler: 'address.deleteAddress',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products',
        handler: 'product.getProducts',
        config: {
          auth: false, // Public for now
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/tags',
        handler: 'productTag.getTags',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/tags/:id',
        handler: 'productTag.getTag',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/tags',
        handler: 'productTag.createTag',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/tags/:id',
        handler: 'productTag.updateTag',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/tags/:id',
        handler: 'productTag.deleteTag',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/product-categories',
        handler: 'productCategory.getProductCategories',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/product-categories/:id',
        handler: 'productCategory.getProductCategory',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/product-categories',
        handler: 'productCategory.createProductCategory',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/product-categories/:id',
        handler: 'productCategory.updateProductCategory',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/product-categories/:id',
        handler: 'productCategory.deleteProductCategory',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products/:slug',
        handler: 'product.getProductBySlug',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/products',
        handler: 'product.createProduct',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/products/:id',
        handler: 'product.updateProduct',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/products/:id',
        handler: 'product.deleteProduct',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products/:id/related',
        handler: 'product.getRelatedProducts',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products/categories',
        handler: 'product.getCategories',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products/tags',
        handler: 'product.getTags',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/products/attributes',
        handler: 'product.getAttributes',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/cart',
        handler: 'cart.getCart',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/cart/create',
        handler: 'cart.createCart',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/cart',
        handler: 'cart.addItem',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/cart/:id',
        handler: 'cart.updateItem',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/cart/:id',
        handler: 'cart.removeItem',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/cart',
        handler: 'cart.clearCart',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/cart/apply-coupon',
        handler: 'cart.applyCoupon',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/cart/coupon',
        handler: 'cart.removeCoupon',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/cart/totals',
        handler: 'cart.getTotals',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/cart/checkout',
        handler: 'cart.checkout',
        config: {
          auth: false, // Authentication handled in middleware
          policies: [],
        },
      },

      // Order/Checkout routes
      {
        method: 'POST',
        path: '/checkout',
        handler: 'order.checkout',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/orders',
        handler: 'order.getOrders',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/orders/:id',
        handler: 'order.getOrder',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/orders/:id/cancel',
        handler: 'order.cancelOrder',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/orders/:id/status',
        handler: 'order.updateOrderStatus',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/orders/:id/tracking',
        handler: 'order.getOrderTracking',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },

      // Wishlist routes
      {
        method: 'GET',
        path: '/wishlist',
        handler: 'wishlist.getWishlist',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/wishlist',
        handler: 'wishlist.addToWishlist',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/wishlist/:productId',
        handler: 'wishlist.removeFromWishlist',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/wishlist',
        handler: 'wishlist.clearWishlist',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/wishlist',
        handler: 'wishlist.updateWishlist',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/wishlist/status',
        handler: 'wishlist.checkWishlistStatus',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/wishlist/items/:id/move-to-cart',
        handler: 'wishlist.moveToCart',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },

      // Compare routes
      {
        method: 'GET',
        path: '/compare',
        handler: 'compare.getCompare',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/compare',
        handler: 'compare.addToCompare',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/compare/:productId',
        handler: 'compare.removeFromCompare',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/compare',
        handler: 'compare.clearCompare',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/compare',
        handler: 'compare.updateCompare',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/compare/data',
        handler: 'compare.getComparisonData',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/compare/status',
        handler: 'compare.checkCompareStatus',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },

      // Payment routes
      {
        method: 'POST',
        path: '/payments/create-intent',
        handler: 'payment.createIntent',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/payments/confirm',
        handler: 'payment.confirmPayment',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/payments/webhook',
        handler: 'payment.handleWebhook',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/payments/:id/refund',
        handler: 'payment.processRefund',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/payments/transactions',
        handler: 'payment.getTransactions',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },

      // Shipping routes
      {
        method: 'POST',
        path: '/shipping/calculate',
        handler: 'shipping.getShippingMethods',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/shipping/zones',
        handler: 'shipping.getShippingZones',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/shipping/zones',
        handler: 'shipping.createShippingZone',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/shipping/zones/:id',
        handler: 'shipping.updateShippingZone',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/shipping/zones/:id',
        handler: 'shipping.deleteShippingZone',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/shipping/methods',
        handler: 'shipping.getShippingMethodsAdmin',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/shipping/methods',
        handler: 'shipping.createShippingMethod',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/shipping/methods/:id',
        handler: 'shipping.updateShippingMethod',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/shipping/methods/:id',
        handler: 'shipping.deleteShippingMethod',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/shipping/methods/:methodId/rates',
        handler: 'shipping.getShippingRates',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/shipping/rates',
        handler: 'shipping.createShippingRate',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/shipping/rates/:id',
        handler: 'shipping.updateShippingRate',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },
      {
        method: 'DELETE',
        path: '/shipping/rates/:id',
        handler: 'shipping.deleteShippingRate',
        config: {
          auth: false, // Authentication handled in controller
          policies: [],
        },
      },

      // Standard content API routes for content manager visibility
      // Products
      {
        method: 'GET',
        path: '/products',
        handler: 'product.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/products/:id',
        handler: 'product.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/products',
        handler: 'product.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/products/:id',
        handler: 'product.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/products/:id',
        handler: 'product.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Product Categories
      {
        method: 'GET',
        path: '/product-categories',
        handler: 'productCategory.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/product-categories/:id',
        handler: 'productCategory.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/product-categories',
        handler: 'productCategory.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/product-categories/:id',
        handler: 'productCategory.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/product-categories/:id',
        handler: 'productCategory.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Product Tags
      {
        method: 'GET',
        path: '/product-tags',
        handler: 'productTag.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/product-tags/:id',
        handler: 'productTag.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/product-tags',
        handler: 'productTag.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/product-tags/:id',
        handler: 'productTag.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/product-tags/:id',
        handler: 'productTag.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Product Variations
      {
        method: 'GET',
        path: '/product-variations',
        handler: 'productVariation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/product-variations/:id',
        handler: 'productVariation.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/product-variations',
        handler: 'productVariation.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/product-variations/:id',
        handler: 'productVariation.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/product-variations/:id',
        handler: 'productVariation.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Alias: "product-variants" (some clients use this naming)
      {
        method: 'GET',
        path: '/product-variants',
        handler: 'productVariation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/product-variants/:id',
        handler: 'productVariation.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/product-variants',
        handler: 'productVariation.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/product-variants/:id',
        handler: 'productVariation.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/product-variants/:id',
        handler: 'productVariation.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Wishlists
      {
        method: 'GET',
        path: '/wishlists',
        handler: 'wishlist.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/wishlists/:id',
        handler: 'wishlist.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/wishlists',
        handler: 'wishlist.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/wishlists/:id',
        handler: 'wishlist.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/wishlists/:id',
        handler: 'wishlist.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

      // Compares
      {
        method: 'GET',
        path: '/compares',
        handler: 'compare.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/compares/:id',
        handler: 'compare.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/compares',
        handler: 'compare.create',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/compares/:id',
        handler: 'compare.update',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/compares/:id',
        handler: 'compare.delete',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
          middlewares: [],
        },
      },

    ],
  },
};

