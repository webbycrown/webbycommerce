"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// server/src/components/shipping-zone-location.json
var require_shipping_zone_location = __commonJS({
  "server/src/components/shipping-zone-location.json"(exports2, module2) {
    module2.exports = {
      collectionName: "components_shared_shipping_zone_locations",
      info: {
        displayName: "Shipping Zone Location",
        description: "Reusable location rules for shipping zones (stored as text, parsed by backend)."
      },
      options: {},
      attributes: {
        countries: {
          type: "text",
          required: false,
          description: "Country codes. Use comma or new lines (e.g. US,CA,IN)."
        },
        states: {
          type: "text",
          required: false,
          description: "State/province codes or names. Use comma or new lines."
        },
        postal_codes: {
          type: "text",
          required: false,
          description: "Postal code patterns/ranges. One per line. Supports wildcards (123*) and ranges (1000-2000)."
        }
      }
    };
  }
});

// server/src/components/content-block.json
var require_content_block = __commonJS({
  "server/src/components/content-block.json"(exports2, module2) {
    module2.exports = {
      collectionName: "components_shared_content_blocks",
      info: {
        displayName: "Content Block",
        description: "A reusable component for managing title, description, button, and images."
      },
      options: {},
      attributes: {
        title: {
          type: "string",
          required: false,
          description: "The main title or heading"
        },
        description: {
          type: "string",
          required: false,
          description: "The description or body text content"
        },
        button_text: {
          type: "string",
          required: false,
          description: "The text displayed on the button"
        },
        button_link: {
          type: "string",
          required: false,
          description: "The URL or link for the button"
        },
        images: {
          type: "media",
          multiple: true,
          required: false,
          allowedTypes: ["images"],
          description: "Images associated with this content block"
        }
      }
    };
  }
});

// server/src/routes/index.js
var require_routes = __commonJS({
  "server/src/routes/index.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    module2.exports = {
      admin: {
        routes: [
          {
            method: "GET",
            path: "/settings",
            handler: "controller.getSettings",
            config: {
              policies: ["admin::isAuthenticatedAdmin"]
            }
          },
          {
            method: "PUT",
            path: "/settings",
            handler: "controller.updateSettings",
            config: {
              policies: ["admin::isAuthenticatedAdmin"]
            }
          },
          {
            method: "POST",
            path: "/generate-demo",
            handler: "controller.generateDemo",
            config: {
              policies: ["admin::isAuthenticatedAdmin"]
            }
          },
          {
            method: "POST",
            path: "/seed-demo",
            handler: "controller.seedDemo",
            config: {
              policies: ["admin::isAuthenticatedAdmin"]
            }
          }
        ]
      },
      "content-api": {
        routes: [
          {
            method: "GET",
            // Public health-check endpoint
            // Final URL: http://localhost:1337/api/webbycommerce/health
            // Custom prefix support handled in bootstrap.js middleware
            path: "/health",
            handler: "controller.health",
            config: {
              auth: false,
              policies: []
            },
            info: {
              type: "content-api",
              pluginName: PLUGIN_ID,
              description: "Health check for Strapi Advanced Ecommerce plugin",
              summary: "Ecommerce health",
              tags: ["Strapi Advanced Ecommerce"]
            }
          },
          {
            method: "POST",
            path: "/auth/login-register",
            handler: "auth.loginOrRegister",
            config: {
              auth: false
            }
          },
          {
            method: "POST",
            path: "/auth/verify-otp",
            handler: "auth.verifyOtp",
            config: {
              auth: false
            }
          },
          {
            method: "GET",
            path: "/auth/profile",
            handler: "auth.getProfile",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/auth/profile",
            handler: "auth.updateProfile",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/addresses",
            handler: "address.getAddresses",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "GET",
            path: "/addresses/:id",
            handler: "address.getAddress",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "POST",
            path: "/addresses",
            handler: "address.createAddress",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/addresses/:id",
            handler: "address.updateAddress",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/addresses/:id",
            handler: "address.deleteAddress",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products",
            handler: "product.getProducts",
            config: {
              auth: false,
              // Public for now
              policies: []
            }
          },
          {
            method: "GET",
            path: "/tags",
            handler: "productTag.getTags",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/tags/:id",
            handler: "productTag.getTag",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "POST",
            path: "/tags",
            handler: "productTag.createTag",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/tags/:id",
            handler: "productTag.updateTag",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/tags/:id",
            handler: "productTag.deleteTag",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/product-categories",
            handler: "productCategory.getProductCategories",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/product-categories/:id",
            handler: "productCategory.getProductCategory",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "POST",
            path: "/product-categories",
            handler: "productCategory.createProductCategory",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/product-categories/:id",
            handler: "productCategory.updateProductCategory",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/product-categories/:id",
            handler: "productCategory.deleteProductCategory",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products/:slug",
            handler: "product.getProductBySlug",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "POST",
            path: "/products",
            handler: "product.createProduct",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/products/bulk",
            handler: "product.createBulkProducts",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/products/:id",
            handler: "product.updateProduct",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/products/:id",
            handler: "product.deleteProduct",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products/:id/related",
            handler: "product.getRelatedProducts",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products/categories",
            handler: "product.getCategories",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products/tags",
            handler: "product.getTags",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/products/attributes",
            handler: "product.getAttributes",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "GET",
            path: "/cart",
            handler: "cart.getCart",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "POST",
            path: "/cart/create",
            handler: "cart.createCart",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "POST",
            path: "/cart",
            handler: "cart.addItem",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/cart/:id",
            handler: "cart.updateItem",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/cart/:id",
            handler: "cart.removeItem",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/cart",
            handler: "cart.clearCart",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "POST",
            path: "/cart/apply-coupon",
            handler: "cart.applyCoupon",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/cart/coupon",
            handler: "cart.removeCoupon",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "GET",
            path: "/cart/totals",
            handler: "cart.getTotals",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          {
            method: "POST",
            path: "/cart/checkout",
            handler: "cart.checkout",
            config: {
              auth: false,
              // Authentication handled in middleware
              policies: []
            }
          },
          // Order/Checkout routes
          {
            method: "POST",
            path: "/checkout",
            handler: "order.checkout",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/orders",
            handler: "order.getOrders",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/orders/:id",
            handler: "order.getOrder",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/orders/:id/cancel",
            handler: "order.cancelOrder",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/orders/:id/status",
            handler: "order.updateOrderStatus",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/orders/:id/tracking",
            handler: "order.getOrderTracking",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          // Wishlist routes
          {
            method: "GET",
            path: "/wishlist",
            handler: "wishlist.getWishlist",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/wishlist",
            handler: "wishlist.addToWishlist",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/wishlist/:productId",
            handler: "wishlist.removeFromWishlist",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/wishlist",
            handler: "wishlist.clearWishlist",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/wishlist",
            handler: "wishlist.updateWishlist",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/wishlist/status",
            handler: "wishlist.checkWishlistStatus",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/wishlist/items/:id/move-to-cart",
            handler: "wishlist.moveToCart",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          // Compare routes
          {
            method: "GET",
            path: "/compare",
            handler: "compare.getCompare",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/compare",
            handler: "compare.addToCompare",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/compare/:productId",
            handler: "compare.removeFromCompare",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/compare",
            handler: "compare.clearCompare",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/compare",
            handler: "compare.updateCompare",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/compare/data",
            handler: "compare.getComparisonData",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/compare/status",
            handler: "compare.checkCompareStatus",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          // Payment routes
          {
            method: "POST",
            path: "/payments/create-intent",
            handler: "payment.createIntent",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/payments/confirm",
            handler: "payment.confirmPayment",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/payments/webhook",
            handler: "payment.handleWebhook",
            config: {
              auth: false,
              policies: []
            }
          },
          {
            method: "POST",
            path: "/payments/:id/refund",
            handler: "payment.processRefund",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/payments/transactions",
            handler: "payment.getTransactions",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          // Shipping routes
          {
            method: "POST",
            path: "/shipping/calculate",
            handler: "shipping.getShippingMethods",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/shipping/zones",
            handler: "shipping.getShippingZones",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/shipping/zones",
            handler: "shipping.createShippingZone",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/shipping/zones/:id",
            handler: "shipping.updateShippingZone",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/shipping/zones/:id",
            handler: "shipping.deleteShippingZone",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/shipping/methods",
            handler: "shipping.getShippingMethodsAdmin",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/shipping/methods",
            handler: "shipping.createShippingMethod",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/shipping/methods/:id",
            handler: "shipping.updateShippingMethod",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/shipping/methods/:id",
            handler: "shipping.deleteShippingMethod",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "GET",
            path: "/shipping/methods/:methodId/rates",
            handler: "shipping.getShippingRates",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "POST",
            path: "/shipping/rates",
            handler: "shipping.createShippingRate",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "PUT",
            path: "/shipping/rates/:id",
            handler: "shipping.updateShippingRate",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          {
            method: "DELETE",
            path: "/shipping/rates/:id",
            handler: "shipping.deleteShippingRate",
            config: {
              auth: false,
              // Authentication handled in controller
              policies: []
            }
          },
          // Standard content API routes for content manager visibility
          // Products
          {
            method: "GET",
            path: "/products",
            handler: "product.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/products/:id",
            handler: "product.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/products",
            handler: "product.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/products/:id",
            handler: "product.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/products/:id",
            handler: "product.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Product Categories
          {
            method: "GET",
            path: "/product-categories",
            handler: "productCategory.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/product-categories/:id",
            handler: "productCategory.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/product-categories",
            handler: "productCategory.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/product-categories/:id",
            handler: "productCategory.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/product-categories/:id",
            handler: "productCategory.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Product Tags
          {
            method: "GET",
            path: "/product-tags",
            handler: "productTag.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/product-tags/:id",
            handler: "productTag.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/product-tags",
            handler: "productTag.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/product-tags/:id",
            handler: "productTag.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/product-tags/:id",
            handler: "productTag.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Product Variations
          {
            method: "GET",
            path: "/product-variations",
            handler: "productVariation.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/product-variations/:id",
            handler: "productVariation.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/product-variations",
            handler: "productVariation.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/product-variations/:id",
            handler: "productVariation.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/product-variations/:id",
            handler: "productVariation.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Alias: "product-variants" (some clients use this naming)
          {
            method: "GET",
            path: "/product-variants",
            handler: "productVariation.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/product-variants/:id",
            handler: "productVariation.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/product-variants",
            handler: "productVariation.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/product-variants/:id",
            handler: "productVariation.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/product-variants/:id",
            handler: "productVariation.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Wishlists
          {
            method: "GET",
            path: "/wishlists",
            handler: "wishlist.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/wishlists/:id",
            handler: "wishlist.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/wishlists",
            handler: "wishlist.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/wishlists/:id",
            handler: "wishlist.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/wishlists/:id",
            handler: "wishlist.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          // Compares
          {
            method: "GET",
            path: "/compares",
            handler: "compare.find",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "GET",
            path: "/compares/:id",
            handler: "compare.findOne",
            config: {
              policies: [],
              middlewares: []
            }
          },
          {
            method: "POST",
            path: "/compares",
            handler: "compare.create",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "PUT",
            path: "/compares/:id",
            handler: "compare.update",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          },
          {
            method: "DELETE",
            path: "/compares/:id",
            handler: "compare.delete",
            config: {
              policies: ["admin::isAuthenticatedAdmin"],
              middlewares: []
            }
          }
        ]
      }
    };
  }
});

// server/src/register.js
var require_register = __commonJS({
  "server/src/register.js"(exports2, module2) {
    "use strict";
    module2.exports = async ({ strapi: strapi2 }) => {
      strapi2.log.info("[webbycommerce] ========================================");
      strapi2.log.info("[webbycommerce] Registering plugin...");
      try {
        const shippingZoneSchema = require_shipping_zone_location();
        const shippingZoneUid = "plugin::webbycommerce.shipping-zone-location";
        const existingShippingZone = strapi2.get("components").get(shippingZoneUid);
        if (!existingShippingZone) {
          strapi2.get("components").set(shippingZoneUid, {
            ...shippingZoneSchema,
            uid: shippingZoneUid,
            modelType: "component",
            modelName: "shipping-zone-location",
            globalId: "ComponentPluginWebbycommerceShippingZoneLocation"
          });
          strapi2.log.info(`[webbycommerce] Component registered: ${shippingZoneUid}`);
        } else {
          strapi2.log.info(`[webbycommerce] Component already exists: ${shippingZoneUid}`);
        }
        const contentBlockSchema = require_content_block();
        const contentBlockUid = "plugin::webbycommerce.content-block";
        const existingContentBlock = strapi2.get("components").get(contentBlockUid);
        if (!existingContentBlock) {
          strapi2.get("components").set(contentBlockUid, {
            ...contentBlockSchema,
            uid: contentBlockUid,
            modelType: "component",
            modelName: "content-block",
            globalId: "ComponentPluginWebbycommerceContentBlock"
          });
          strapi2.log.info(`[webbycommerce] Component registered: ${contentBlockUid}`);
        } else {
          strapi2.log.info(`[webbycommerce] Component already exists: ${contentBlockUid}`);
        }
      } catch (error) {
        strapi2.log.error("[webbycommerce] Failed to register component:", error.message);
      }
      try {
        const routes2 = require_routes();
        strapi2.log.info("[webbycommerce] Routes structure:", JSON.stringify({
          hasAdmin: !!routes2.admin,
          hasContentApi: !!routes2["content-api"],
          adminRoutes: routes2.admin?.routes?.length || 0,
          contentApiRoutes: routes2["content-api"]?.routes?.length || 0
        }, null, 2));
      } catch (error) {
        strapi2.log.error("[webbycommerce] Error loading routes:", error.message);
        strapi2.log.error("[webbycommerce] Error stack:", error.stack);
      }
      strapi2.log.info("[webbycommerce] Plugin registered successfully");
      strapi2.log.info("[webbycommerce] ========================================");
    };
  }
});

// server/src/utils/check-ecommerce-permission.js
var require_check_ecommerce_permission = __commonJS({
  "server/src/utils/check-ecommerce-permission.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var ECOMMERCE_ACTION = "plugin::webbycommerce.ecommerce.enable";
    var PATCHED_FLAG = /* @__PURE__ */ Symbol("webbycommerce-permissions-patched");
    var SETTINGS_KEY = "settings";
    var getStore = () => {
      return strapi.store({ type: "plugin", name: PLUGIN_ID });
    };
    var loadAllowedOrigins = async () => {
      const store = getStore();
      const value = await store.get({ key: SETTINGS_KEY }) || {};
      const input = Array.isArray(value.allowedOrigins) ? value.allowedOrigins : [];
      return input.map((value2) => typeof value2 === "string" ? value2.trim() : "").filter((value2) => value2.length > 0).map((value2) => value2.toLowerCase().replace(/\/+$/, ""));
    };
    var isOriginAllowed = async (ctx) => {
      const allowedOrigins = await loadAllowedOrigins();
      if (!allowedOrigins.length) {
        return true;
      }
      const originHeader = ctx.request.header?.origin || "";
      const hostHeader = ctx.request.header?.host || "";
      let hostname = "";
      if (originHeader) {
        try {
          const parsed = new URL(originHeader);
          hostname = parsed.hostname.toLowerCase();
        } catch {
        }
      }
      if (!hostname && hostHeader) {
        hostname = hostHeader.split(":")[0].toLowerCase();
      }
      if (!hostname) {
        return false;
      }
      const normalized = (value) => value.toLowerCase().replace(/^https?:\/\//, "").split("/")[0].split(":")[0];
      const requestHost = hostname.split(":")[0];
      return allowedOrigins.some((origin) => normalized(origin) === requestHost);
    };
    var patchUsersPermissionsGetActions = (usersPermissionsService) => {
      if (!usersPermissionsService || usersPermissionsService[PATCHED_FLAG]) {
        return;
      }
      const originalGetActions = usersPermissionsService.getActions.bind(usersPermissionsService);
      usersPermissionsService.getActions = (options = {}) => {
        const result = originalGetActions(options) || {};
        const defaultEnable = options?.defaultEnable ?? false;
        const namespace = `plugin::${PLUGIN_ID}`;
        const currentControllers = result[namespace]?.controllers || {};
        const patchedControllers = { ...currentControllers };
        const controllerActions = patchedControllers.ecommerce ? { ...patchedControllers.ecommerce } : {};
        if (!controllerActions.enable) {
          controllerActions.enable = { enabled: defaultEnable, policy: "" };
        }
        patchedControllers.ecommerce = controllerActions;
        result[namespace] = {
          controllers: patchedControllers
        };
        return result;
      };
      usersPermissionsService[PATCHED_FLAG] = true;
    };
    var registerEcommerceActions = async () => {
      const permissionsService = strapi.plugin("users-permissions")?.service("users-permissions");
      if (!permissionsService || typeof permissionsService.syncPermissions !== "function") {
        return;
      }
      patchUsersPermissionsGetActions(permissionsService);
      await permissionsService.syncPermissions();
    };
    var getRoleIdFromCtx = async (ctx) => {
      if (ctx.state?.user?.role?.id) {
        return ctx.state.user.role.id;
      }
      if (ctx.state?.auth?.credentials?.role?.id) {
        return ctx.state.auth.credentials.role.id;
      }
      if (ctx.state?.auth?.strategy?.name === "api-token") {
        return null;
      }
      const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
        where: { type: "public" },
        select: ["id"]
      });
      return publicRole?.id || null;
    };
    var hasApiTokenPermission = (ctx, action) => {
      if (ctx.state?.auth?.strategy?.name !== "api-token") {
        return false;
      }
      const permissions = ctx.state?.auth?.credentials?.permissions;
      if (!Array.isArray(permissions)) {
        return false;
      }
      return permissions.includes(action);
    };
    var ensureEcommercePermission = async (ctx) => {
      const action = ECOMMERCE_ACTION;
      const originOk = await isOriginAllowed(ctx);
      if (!originOk) {
        ctx.unauthorized("Ecommerce facility is not enabled for this origin");
        return false;
      }
      if (hasApiTokenPermission(ctx, action)) {
        return true;
      }
      const roleId = await getRoleIdFromCtx(ctx);
      if (!roleId) {
        ctx.unauthorized("Ecommerce facility is not enabled for this role");
        return false;
      }
      const permissions = await strapi.db.query("plugin::users-permissions.permission").findMany({
        where: {
          action,
          role: roleId
        }
      });
      if (Array.isArray(permissions) && permissions.length > 0) {
        return true;
      }
      ctx.unauthorized("Ecommerce facility is not enabled for this role");
      return false;
    };
    module2.exports = {
      ECOMMERCE_ACTION,
      registerEcommerceActions,
      ensureEcommercePermission
    };
  }
});

// server/src/utils/extend-user-schema.js
var require_extend_user_schema = __commonJS({
  "server/src/utils/extend-user-schema.js"(exports2, module2) {
    "use strict";
    async function extendUserSchemaWithOtpFields(strapi2) {
      try {
        const db = strapi2.db;
        const client = db.config.connection.client;
        const tableName = "up_users";
        let fieldsExist = false;
        try {
          const connection2 = db.connection;
          const knex2 = connection2;
          if (client === "postgres") {
            const result = await knex2.raw(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name='${tableName}' 
          AND (column_name='otp' OR column_name='is_otp_verified')
        `);
            fieldsExist = result.rows.length >= 2;
          } else if (client === "mysql" || client === "mysql2") {
            const result = await knex2.raw(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_SCHEMA = DATABASE() 
          AND TABLE_NAME = '${tableName}' 
          AND (COLUMN_NAME = 'otp' OR COLUMN_NAME = 'is_otp_verified')
        `);
            fieldsExist = result[0].length >= 2;
          } else {
            const tableInfo = await knex2.raw(`PRAGMA table_info(${tableName})`);
            const columns = tableInfo.map((col) => col.name);
            fieldsExist = columns.includes("otp") && columns.includes("is_otp_verified");
          }
        } catch (err) {
          fieldsExist = false;
        }
        if (fieldsExist) {
          strapi2.log.info("[webbycommerce] OTP fields already exist in database");
          return true;
        }
        strapi2.log.info("[webbycommerce] OTP fields not found, adding them to user schema...");
        const connection = db.connection;
        const knex = connection;
        let otpAdded = false;
        let isOtpVerifiedAdded = false;
        if (client === "sqlite" || client === "sqlite3") {
          const tableInfo = await knex.raw(`PRAGMA table_info(${tableName})`);
          const columns = tableInfo.map((col) => col.name);
          if (!columns.includes("otp")) {
            await knex.schema.alterTable(tableName, (table) => {
              table.integer("otp").nullable();
            });
            otpAdded = true;
            strapi2.log.info('[webbycommerce] Added "otp" column to user table');
          }
          if (!columns.includes("is_otp_verified")) {
            await knex.schema.alterTable(tableName, (table) => {
              table.boolean("is_otp_verified").defaultTo(false);
            });
            isOtpVerifiedAdded = true;
            strapi2.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
          }
        } else if (client === "postgres") {
          const otpExists = await knex.raw(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='${tableName}' AND column_name='otp'
      `);
          if (otpExists.rows.length === 0) {
            await knex.raw(`ALTER TABLE ${tableName} ADD COLUMN otp INTEGER`);
            otpAdded = true;
            strapi2.log.info('[webbycommerce] Added "otp" column to user table');
          }
          const isOtpVerifiedExists = await knex.raw(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='${tableName}' AND column_name='is_otp_verified'
      `);
          if (isOtpVerifiedExists.rows.length === 0) {
            await knex.raw(`ALTER TABLE ${tableName} ADD COLUMN is_otp_verified BOOLEAN DEFAULT false`);
            isOtpVerifiedAdded = true;
            strapi2.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
          }
        } else if (client === "mysql" || client === "mysql2") {
          const otpExists = await knex.raw(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = '${tableName}' 
        AND COLUMN_NAME = 'otp'
      `);
          if (otpExists[0].length === 0) {
            await knex.raw(`ALTER TABLE \`${tableName}\` ADD COLUMN \`otp\` INT NULL`);
            otpAdded = true;
            strapi2.log.info('[webbycommerce] Added "otp" column to user table');
          }
          const isOtpVerifiedExists = await knex.raw(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = '${tableName}' 
        AND COLUMN_NAME = 'is_otp_verified'
      `);
          if (isOtpVerifiedExists[0].length === 0) {
            await knex.raw(`ALTER TABLE \`${tableName}\` ADD COLUMN \`is_otp_verified\` BOOLEAN DEFAULT false`);
            isOtpVerifiedAdded = true;
            strapi2.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
          }
        } else {
          strapi2.log.warn(
            `[webbycommerce] Database client "${client}" not supported for automatic schema extension. Please manually add OTP fields to user schema.`
          );
          return false;
        }
        strapi2.log.info("[webbycommerce] User schema extension completed successfully");
        return true;
      } catch (error) {
        strapi2.log.error("[webbycommerce] Failed to extend user schema with OTP fields:", error);
        strapi2.log.error("[webbycommerce] Error details:", error.message);
        strapi2.log.error(
          "[webbycommerce] Please manually extend the user schema by creating a schema extension file in your Strapi project."
        );
        return false;
      }
    }
    module2.exports = { extendUserSchemaWithOtpFields };
  }
});

// server/src/content-types/address/schema.json
var require_schema = __commonJS({
  "server/src/content-types/address/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "addresses",
      info: {
        singularName: "address",
        pluralName: "addresses",
        displayName: "Address",
        description: "User addresses for billing and shipping"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: false
        }
      },
      attributes: {
        type: {
          type: "integer",
          required: true,
          min: 0,
          max: 1
        },
        first_name: {
          type: "string",
          required: true
        },
        last_name: {
          type: "string",
          required: true
        },
        company_name: {
          type: "string",
          required: false
        },
        country: {
          type: "string",
          required: true
        },
        region: {
          type: "string",
          required: false
        },
        city: {
          type: "string",
          required: true
        },
        street_address: {
          type: "string",
          required: true
        },
        postcode: {
          type: "string",
          required: true
        },
        phone: {
          type: "string",
          required: true
        },
        email_address: {
          type: "string",
          required: false
        },
        user: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::users-permissions.user"
        }
      }
    };
  }
});

// server/src/content-types/address/index.js
var require_address = __commonJS({
  "server/src/content-types/address/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/cart/index.js
var require_cart = __commonJS({
  "server/src/content-types/cart/index.js"(exports2, module2) {
    "use strict";
    var schema = {
      kind: "collectionType",
      collectionName: "carts",
      info: {
        singularName: "cart",
        pluralName: "carts",
        displayName: "Cart",
        description: "Shopping cart (optional wrapper around cart items)."
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        user: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::users-permissions.user"
        },
        guest_id: {
          type: "string",
          required: false,
          unique: true
        },
        currency: {
          type: "string",
          required: true,
          default: "USD"
        },
        coupon: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.coupon",
          required: false
        },
        expires_at: {
          type: "datetime",
          required: false
        },
        items: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.cart-item",
          mappedBy: "cart"
        }
      }
    };
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/cart-item/index.js
var require_cart_item = __commonJS({
  "server/src/content-types/cart-item/index.js"(exports2, module2) {
    "use strict";
    var schema = {
      kind: "collectionType",
      collectionName: "cart_items",
      info: {
        singularName: "cart-item",
        pluralName: "cart-items",
        displayName: "Cart Item",
        description: "Line items in a user's shopping cart"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        user: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::users-permissions.user"
        },
        cart: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.cart",
          inversedBy: "items"
        },
        product: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.product"
        },
        variation: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.product-variation"
        },
        quantity: {
          type: "integer",
          required: true,
          min: 1,
          default: 1
        },
        unit_price: {
          type: "decimal",
          required: true,
          min: 0
        },
        total_price: {
          type: "decimal",
          required: true,
          min: 0
        },
        attributes: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-attribute",
          required: false
        },
        attributeValues: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-attribute-value",
          required: false
        }
      }
    };
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/compare.js
var require_compare = __commonJS({
  "server/src/content-types/compare.js"(exports2, module2) {
    "use strict";
    var schema = {
      kind: "collectionType",
      collectionName: "compares",
      info: {
        singularName: "compare",
        pluralName: "compares",
        displayName: "Compare",
        description: "User compare list for comparing products"
      },
      options: {
        draftAndPublish: false,
        timestamps: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-type-builder": {
          visible: true
        }
      },
      attributes: {
        userId: {
          type: "string",
          required: true,
          configurable: false
        },
        userEmail: {
          type: "email",
          required: true,
          configurable: false
        },
        products: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product",
          mappedBy: "compares",
          max: 4
          // Limit to 4 products for comparison
        },
        category: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.product-category",
          inversedBy: "compares"
        },
        isPublic: {
          type: "boolean",
          default: false,
          required: false
        },
        name: {
          type: "string",
          maxLength: 100,
          required: false
        },
        notes: {
          type: "text",
          required: false
        }
      }
    };
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/coupon/schema.json
var require_schema2 = __commonJS({
  "server/src/content-types/coupon/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "coupons",
      info: {
        singularName: "coupon",
        pluralName: "coupons",
        displayName: "Coupon",
        description: "Discount coupons for orders"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        code: {
          type: "string",
          required: true,
          unique: true
        },
        type: {
          type: "enumeration",
          enum: ["percentage", "fixed"],
          required: true
        },
        value: {
          type: "decimal",
          required: true,
          min: 0
        },
        description: {
          type: "text",
          required: false
        },
        usage_limit: {
          type: "integer",
          required: false,
          min: 0
        },
        used_count: {
          type: "integer",
          required: false,
          min: 0,
          default: 0
        },
        minimum_order_amount: {
          type: "decimal",
          required: false,
          min: 0
        },
        expires_at: {
          type: "datetime",
          required: false
        },
        is_active: {
          type: "boolean",
          required: false,
          default: true
        }
      }
    };
  }
});

// server/src/content-types/coupon/index.js
var require_coupon = __commonJS({
  "server/src/content-types/coupon/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema2();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/order/schema.json
var require_schema3 = __commonJS({
  "server/src/content-types/order/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "orders",
      info: {
        singularName: "order",
        pluralName: "orders",
        displayName: "Order",
        description: "Ecommerce orders"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        order_number: {
          type: "string",
          required: true,
          unique: true
        },
        status: {
          type: "enumeration",
          enum: ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"],
          default: "pending",
          required: true
        },
        user: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::users-permissions.user"
        },
        items: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product"
        },
        subtotal: {
          type: "decimal",
          required: true,
          min: 0
        },
        tax_amount: {
          type: "decimal",
          required: false,
          min: 0,
          default: 0
        },
        shipping_amount: {
          type: "decimal",
          required: false,
          min: 0,
          default: 0
        },
        discount_amount: {
          type: "decimal",
          required: false,
          min: 0,
          default: 0
        },
        total: {
          type: "decimal",
          required: true,
          min: 0
        },
        currency: {
          type: "string",
          required: true,
          default: "USD"
        },
        billing_address: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.address"
        },
        shipping_address: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.address"
        },
        payment_method: {
          type: "enumeration",
          enum: ["Stripe", "PayPal", "Razorpay", "COD"],
          default: "Stripe",
          required: true
        },
        payment_status: {
          type: "enumeration",
          enum: ["pending", "paid", "failed", "refunded"],
          default: "pending",
          required: true
        },
        shipping_method: {
          type: "string",
          required: false
        },
        notes: {
          type: "text",
          required: false
        },
        tracking_number: {
          type: "string",
          required: false
        },
        estimated_delivery: {
          type: "datetime",
          required: false
        },
        payment_transactions: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.payment-transaction",
          mappedBy: "order"
        }
      }
    };
  }
});

// server/src/content-types/order/index.js
var require_order = __commonJS({
  "server/src/content-types/order/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema3();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/payment-transaction/schema.json
var require_schema4 = __commonJS({
  "server/src/content-types/payment-transaction/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "payment_transactions",
      info: {
        singularName: "payment-transaction",
        pluralName: "payment-transactions",
        displayName: "Payment Transaction",
        description: "Payment transactions for orders"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        order: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.order",
          inversedBy: "payment_transactions"
        },
        transaction_id: {
          type: "string",
          required: true,
          unique: true
        },
        payment_method: {
          type: "enumeration",
          enum: ["Stripe", "PayPal", "Razorpay", "COD"],
          default: "Stripe",
          required: true
        },
        amount: {
          type: "decimal",
          required: true,
          min: 0
        },
        currency: {
          type: "string",
          required: true,
          default: "USD"
        },
        status: {
          type: "enumeration",
          enum: ["pending", "processing", "completed", "failed", "refunded"],
          default: "pending",
          required: true
        },
        failure_reason: {
          type: "text",
          required: false
        },
        processed_at: {
          type: "datetime",
          required: false
        },
        refunded_at: {
          type: "datetime",
          required: false
        },
        refund_amount: {
          type: "decimal",
          required: false,
          min: 0
        }
      }
    };
  }
});

// server/src/content-types/payment-transaction/index.js
var require_payment_transaction = __commonJS({
  "server/src/content-types/payment-transaction/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema4();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product/schema.json
var require_schema5 = __commonJS({
  "server/src/content-types/product/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "products",
      info: {
        singularName: "product",
        pluralName: "products",
        displayName: "Product",
        description: "Ecommerce products"
      },
      options: {
        draftAndPublish: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        slug: {
          type: "uid",
          targetField: "name",
          required: false
        },
        description: {
          type: "richtext",
          required: false
        },
        price: {
          type: "decimal",
          required: true,
          min: 0
        },
        sale_price: {
          type: "decimal",
          required: false,
          min: 0
        },
        sku: {
          type: "string",
          required: false,
          unique: true
        },
        stock_quantity: {
          type: "integer",
          required: false,
          min: 0,
          default: 0
        },
        stock_status: {
          type: "enumeration",
          enum: ["in_stock", "out_of_stock", "on_backorder"],
          default: "in_stock",
          required: false
        },
        weight: {
          type: "decimal",
          required: false,
          min: 0
        },
        images: {
          type: "media",
          multiple: true,
          required: false,
          allowedTypes: ["images"]
        },
        product_categories: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-category",
          inversedBy: "products"
        },
        tags: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-tag",
          inversedBy: "products"
        },
        variations: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.product-variation",
          mappedBy: "product"
        },
        wishlists: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.wishlist",
          inversedBy: "products"
        },
        compares: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.compare",
          inversedBy: "products"
        }
      }
    };
  }
});

// server/src/content-types/product/index.js
var require_product = __commonJS({
  "server/src/content-types/product/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema5();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product-attribute/schema.json
var require_schema6 = __commonJS({
  "server/src/content-types/product-attribute/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "product_attributes",
      info: {
        singularName: "product-attribute",
        pluralName: "product-attributes",
        displayName: "Product Attribute",
        description: "Product attributes for variations"
      },
      options: {
        draftAndPublish: false,
        timestamps: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true,
          unique: true
        },
        slug: {
          type: "uid",
          targetField: "name",
          required: true
        },
        type: {
          type: "enumeration",
          enum: [
            "text",
            "select",
            "multiselect",
            "color",
            "size",
            "number"
          ],
          default: "text",
          required: true
        },
        is_variation: {
          type: "boolean",
          default: false,
          required: true
        },
        is_visible: {
          type: "boolean",
          default: true,
          required: true
        },
        is_filterable: {
          type: "boolean",
          default: false,
          required: true
        },
        sort_order: {
          type: "integer",
          default: 0,
          required: true
        },
        display_name: {
          type: "string",
          required: true
        },
        description: {
          type: "text"
        },
        product_attribute_values: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.product-attribute-value",
          mappedBy: "product_attribute"
        }
      }
    };
  }
});

// server/src/content-types/product-attribute/index.js
var require_product_attribute = __commonJS({
  "server/src/content-types/product-attribute/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema6();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product-attribute-value/schema.json
var require_schema7 = __commonJS({
  "server/src/content-types/product-attribute-value/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "product_attribute_values",
      info: {
        singularName: "product-attribute-value",
        pluralName: "product-attribute-values",
        displayName: "Product Attribute Value",
        description: "Values for product attributes"
      },
      options: {
        draftAndPublish: false,
        timestamps: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        value: {
          type: "string",
          required: true
        },
        slug: {
          type: "uid",
          targetField: "value",
          required: true
        },
        color_hex: {
          type: "string"
        },
        sort_order: {
          type: "integer",
          default: 0,
          required: true
        },
        is_default: {
          type: "boolean",
          default: false,
          required: true
        },
        product_attribute: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.product-attribute",
          inversedBy: "product_attribute_values"
        }
      }
    };
  }
});

// server/src/content-types/product-attribute-value/index.js
var require_product_attribute_value = __commonJS({
  "server/src/content-types/product-attribute-value/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema7();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product-category/schema.json
var require_schema8 = __commonJS({
  "server/src/content-types/product-category/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "product_categories",
      info: {
        singularName: "product-category",
        pluralName: "product-categories",
        displayName: "Product Category",
        description: "Product categories for organization"
      },
      options: {
        draftAndPublish: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        slug: {
          type: "uid",
          targetField: "name",
          required: false
        },
        description: {
          type: "text",
          required: false
        },
        image: {
          type: "media",
          multiple: false,
          required: false,
          allowedTypes: ["images"]
        },
        products: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product",
          mappedBy: "product_categories"
        },
        compares: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.compare",
          mappedBy: "category"
        }
      }
    };
  }
});

// server/src/content-types/product-category/index.js
var require_product_category = __commonJS({
  "server/src/content-types/product-category/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema8();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product-tag/schema.json
var require_schema9 = __commonJS({
  "server/src/content-types/product-tag/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "product_tags",
      info: {
        singularName: "product-tag",
        pluralName: "product-tags",
        displayName: "Product Tag",
        description: "Product tags for filtering and organization"
      },
      options: {
        draftAndPublish: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        slug: {
          type: "uid",
          targetField: "name",
          required: false
        },
        products: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product",
          mappedBy: "tags"
        }
      }
    };
  }
});

// server/src/content-types/product-tag/index.js
var require_product_tag = __commonJS({
  "server/src/content-types/product-tag/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema9();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/product-variation/schema.json
var require_schema10 = __commonJS({
  "server/src/content-types/product-variation/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "product_variations",
      info: {
        singularName: "product-variation",
        pluralName: "product-variations",
        displayName: "Product Variation",
        description: "Product variations like size, color"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        slug: {
          type: "uid",
          targetField: "name",
          required: false
        },
        sku: {
          type: "string",
          required: false
        },
        price: {
          type: "decimal",
          required: false,
          min: 0
        },
        sale_price: {
          type: "decimal",
          required: false,
          min: 0
        },
        stock_quantity: {
          type: "integer",
          required: false,
          min: 0,
          default: 0
        },
        stock_status: {
          type: "enumeration",
          enum: ["in_stock", "out_of_stock", "on_backorder"],
          default: "in_stock",
          required: false
        },
        attributes: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-attribute"
        },
        attributeValues: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product-attribute-value"
        },
        product: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.product",
          inversedBy: "variations"
        }
      }
    };
  }
});

// server/src/content-types/product-variation/index.js
var require_product_variation = __commonJS({
  "server/src/content-types/product-variation/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema10();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/wishlist.js
var require_wishlist = __commonJS({
  "server/src/content-types/wishlist.js"(exports2, module2) {
    "use strict";
    var schema = {
      kind: "collectionType",
      collectionName: "wishlists",
      info: {
        singularName: "wishlist",
        pluralName: "wishlists",
        displayName: "Wishlist",
        description: "User wishlist for storing favorite products"
      },
      options: {
        draftAndPublish: false,
        timestamps: true
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-type-builder": {
          visible: true
        }
      },
      attributes: {
        userId: {
          type: "string",
          required: true,
          configurable: false
        },
        userEmail: {
          type: "email",
          required: true,
          configurable: false
        },
        products: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.product",
          mappedBy: "wishlists"
        },
        isPublic: {
          type: "boolean",
          default: false,
          required: false
        },
        name: {
          type: "string",
          maxLength: 100,
          required: false
        },
        description: {
          type: "text",
          required: false
        }
      }
    };
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/shipping-zone/schema.json
var require_schema11 = __commonJS({
  "server/src/content-types/shipping-zone/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "shipping_zones",
      info: {
        singularName: "shipping-zone",
        pluralName: "shipping-zones",
        displayName: "Shipping Zone",
        description: "Geographical shipping zones for rate calculation"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true,
          unique: true
        },
        description: {
          type: "text",
          required: false
        },
        location: {
          type: "component",
          repeatable: true,
          component: "plugin::webbycommerce.shipping-zone-location",
          required: false,
          description: "Location rules for matching shipping addresses"
        },
        is_active: {
          type: "boolean",
          default: true,
          required: true
        },
        sort_order: {
          type: "integer",
          default: 0,
          required: false
        },
        shippingMethods: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.shipping-method",
          required: false
        }
      }
    };
  }
});

// server/src/content-types/shipping-zone/index.js
var require_shipping_zone = __commonJS({
  "server/src/content-types/shipping-zone/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema11();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/shipping-method/schema.json
var require_schema12 = __commonJS({
  "server/src/content-types/shipping-method/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "shipping_methods",
      info: {
        singularName: "shipping-method",
        pluralName: "shipping-methods",
        displayName: "Shipping Method",
        description: "Shipping methods with carriers and services"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        description: {
          type: "text",
          required: false
        },
        carrier: {
          type: "string",
          required: true,
          description: "Shipping carrier (e.g., UPS, FedEx, USPS, DHL)"
        },
        service_type: {
          type: "string",
          required: true,
          description: "Service type (e.g., Ground, Express, Overnight)"
        },
        carrier_service_code: {
          type: "string",
          required: false,
          description: "Carrier's service code for API integration"
        },
        transit_time: {
          type: "string",
          required: false,
          description: "Estimated delivery time (e.g., 2-3 business days)"
        },
        is_active: {
          type: "boolean",
          default: true,
          required: true
        },
        is_free_shipping: {
          type: "boolean",
          default: false,
          required: true
        },
        free_shipping_threshold: {
          type: "decimal",
          required: false,
          min: 0,
          description: "Minimum order amount for free shipping"
        },
        handling_fee: {
          type: "decimal",
          default: 0,
          required: true,
          min: 0
        },
        shippingZone: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.shipping-zone",
          required: false
        },
        shippingRates: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::webbycommerce.shipping-rate",
          required: false
        },
        sort_order: {
          type: "integer",
          default: 0,
          required: false
        }
      }
    };
  }
});

// server/src/content-types/shipping-method/index.js
var require_shipping_method = __commonJS({
  "server/src/content-types/shipping-method/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema12();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/shipping-rate/schema.json
var require_schema13 = __commonJS({
  "server/src/content-types/shipping-rate/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "shipping_rates",
      info: {
        singularName: "shipping-rate",
        pluralName: "shipping-rates",
        displayName: "Shipping Rate",
        description: "Shipping rates based on weight, price, or quantity"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true,
          description: "Rate name for admin reference"
        },
        condition_type: {
          type: "enumeration",
          enum: ["weight", "price", "quantity", "volume", "dimension"],
          required: true,
          description: "What the rate is based on"
        },
        min_value: {
          type: "decimal",
          required: true,
          min: 0,
          description: "Minimum value for this rate tier"
        },
        max_value: {
          type: "decimal",
          required: false,
          min: 0,
          description: "Maximum value for this rate tier (null for unlimited)"
        },
        rate: {
          type: "decimal",
          required: true,
          min: 0,
          description: "Shipping cost for this tier"
        },
        currency: {
          type: "string",
          required: true,
          default: "USD"
        },
        shippingMethod: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::webbycommerce.shipping-method",
          required: false
        },
        is_active: {
          type: "boolean",
          default: true,
          required: true
        },
        sort_order: {
          type: "integer",
          default: 0,
          required: false
        }
      }
    };
  }
});

// server/src/content-types/shipping-rate/index.js
var require_shipping_rate = __commonJS({
  "server/src/content-types/shipping-rate/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema13();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/shipping-rule/schema.json
var require_schema14 = __commonJS({
  "server/src/content-types/shipping-rule/schema.json"(exports2, module2) {
    module2.exports = {
      kind: "collectionType",
      collectionName: "shipping_rules",
      info: {
        singularName: "shipping-rule",
        pluralName: "shipping-rules",
        displayName: "Shipping Rule",
        description: "Rules and conditions for shipping eligibility"
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {
        "content-manager": {
          visible: true
        },
        "content-api": {
          visible: true
        }
      },
      attributes: {
        name: {
          type: "string",
          required: true
        },
        description: {
          type: "text",
          required: false
        },
        rule_type: {
          type: "enumeration",
          enum: ["restriction", "surcharge", "discount", "requirement"],
          required: true
        },
        condition_type: {
          type: "enumeration",
          enum: ["product_category", "product_tag", "product_weight", "order_total", "customer_group", "shipping_address", "cart_quantity"],
          required: true
        },
        condition_operator: {
          type: "enumeration",
          enum: ["equals", "not_equals", "greater_than", "less_than", "contains", "not_contains", "in", "not_in"],
          required: true
        },
        condition_value: {
          type: "json",
          required: true,
          description: "Value(s) to compare against (string, number, or array)"
        },
        action_type: {
          type: "enumeration",
          enum: ["hide_method", "add_fee", "subtract_fee", "set_rate", "multiply_rate"],
          required: true
        },
        action_value: {
          type: "decimal",
          required: false,
          description: "Value for the action (fee amount, multiplier, etc.)"
        },
        action_message: {
          type: "string",
          required: false,
          description: "Message to display when rule applies"
        },
        is_active: {
          type: "boolean",
          default: true,
          required: true
        },
        priority: {
          type: "integer",
          default: 0,
          required: false,
          description: "Higher priority rules are evaluated first"
        },
        applies_to_methods: {
          type: "relation",
          relation: "manyToMany",
          target: "plugin::webbycommerce.shipping-method",
          required: false,
          description: "Shipping methods this rule applies to (empty/null for all)"
        }
      }
    };
  }
});

// server/src/content-types/shipping-rule/index.js
var require_shipping_rule = __commonJS({
  "server/src/content-types/shipping-rule/index.js"(exports2, module2) {
    "use strict";
    var schema = require_schema14();
    module2.exports = {
      schema
    };
  }
});

// server/src/content-types/index.js
var require_content_types = __commonJS({
  "server/src/content-types/index.js"(exports2, module2) {
    "use strict";
    var address = require_address();
    var cart = require_cart();
    var cartItem = require_cart_item();
    var compare = require_compare();
    var coupon = require_coupon();
    var order = require_order();
    var paymentTransaction = require_payment_transaction();
    var product = require_product();
    var productAttribute = require_product_attribute();
    var productAttributeValue = require_product_attribute_value();
    var productCategory = require_product_category();
    var productTag = require_product_tag();
    var productVariation = require_product_variation();
    var wishlist = require_wishlist();
    var shippingZone = require_shipping_zone();
    var shippingMethod = require_shipping_method();
    var shippingRate = require_shipping_rate();
    var shippingRule = require_shipping_rule();
    module2.exports = {
      address,
      cart,
      "cart-item": cartItem,
      compare,
      coupon,
      order,
      "payment-transaction": paymentTransaction,
      product,
      "product-attribute": productAttribute,
      "product-attribute-value": productAttributeValue,
      "product-category": productCategory,
      "product-tag": productTag,
      "product-variation": productVariation,
      wishlist,
      "shipping-zone": shippingZone,
      "shipping-method": shippingMethod,
      "shipping-rate": shippingRate,
      "shipping-rule": shippingRule
    };
  }
});

// server/src/bootstrap.js
var require_bootstrap = __commonJS({
  "server/src/bootstrap.js"(exports2, module2) {
    "use strict";
    var { registerEcommerceActions, ensureEcommercePermission } = require_check_ecommerce_permission();
    var { extendUserSchemaWithOtpFields } = require_extend_user_schema();
    module2.exports = async ({ strapi: strapi2 }) => {
      try {
        strapi2.log.info("[webbycommerce] ========================================");
        strapi2.log.info("[webbycommerce] Bootstrapping plugin...");
        try {
          await extendUserSchemaWithOtpFields(strapi2);
        } catch (schemaError) {
          strapi2.log.warn("[webbycommerce] Could not automatically extend user schema:", schemaError.message);
          strapi2.log.warn(
            "[webbycommerce] Please manually extend the user schema. See README for instructions."
          );
        }
        const disableSeeding = process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === "true" || process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === "1" || process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === "yes";
        if (!disableSeeding && process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === "true") {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            strapi2.log.info("[webbycommerce] Auto-seeding demo data as requested by environment variable...");
            const pluginService = strapi2.plugin("webbycommerce")?.service("service");
            if (pluginService && typeof pluginService.seedDemoData === "function") {
              await pluginService.seedDemoData();
            } else {
              strapi2.log.warn("[webbycommerce] Plugin service not available for seeding");
            }
          } catch (seedError) {
            strapi2.log.error("[webbycommerce] Auto-seeding failed:", seedError.message);
            strapi2.log.error("[webbycommerce] Stack:", seedError.stack);
          }
        } else if (disableSeeding && process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === "true") {
          strapi2.log.info(
            "[webbycommerce] Demo seeding is disabled by STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO; skipping auto-seed."
          );
        }
        const contentTypes2 = require_content_types();
        strapi2.log.info("[webbycommerce] Content types loaded:", Object.keys(contentTypes2));
        if (contentTypes2.components) {
          strapi2.log.info("[webbycommerce] Components loaded:", Object.keys(contentTypes2.components));
        }
        const routes2 = require_routes();
        strapi2.log.info("[webbycommerce] Routes structure verified");
        strapi2.log.info("[webbycommerce] Full routes object:", JSON.stringify(routes2, null, 2));
        strapi2.log.info("[webbycommerce] Content-API routes count: " + (routes2["content-api"]?.routes?.length || 0));
        strapi2.log.info("[webbycommerce] Admin routes count: " + (routes2.admin?.routes?.length || 0));
        strapi2.log.info("[webbycommerce] Has content-api: " + !!routes2["content-api"]);
        strapi2.log.info("[webbycommerce] Has admin: " + !!routes2.admin);
        const getRoutePrefix = async () => {
          try {
            const store = strapi2.store({ type: "plugin", name: "webbycommerce" });
            const value = await store.get({ key: "settings" }) || {};
            return value.routePrefix || "webbycommerce";
          } catch (error) {
            return "webbycommerce";
          }
        };
        const isAdminRoute = (path) => {
          if (!path) return false;
          const adminRoutePatterns = [
            "/admin/",
            "/content-type-builder/",
            "/upload/",
            "/users-permissions/",
            "/i18n/",
            "/email/",
            "/documentation/",
            "/graphql"
          ];
          return adminRoutePatterns.some((pattern) => path.startsWith(pattern));
        };
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const defaultBasePath = `/api/webbycommerce`;
          if (ctx.path.startsWith("/api/auth/local") || ctx.path.startsWith("/api/auth/")) {
            return next();
          }
          const pluginRoutes = /* @__PURE__ */ new Set([
            "products",
            "product-variants",
            "product-attributes",
            "product-attribute-values",
            "product-categories",
            "tags",
            "cart",
            "addresses",
            "wishlist",
            "compare",
            "orders",
            "checkout",
            "payments",
            "shipping",
            "auth",
            "health"
          ]);
          if (ctx.path.startsWith("/api/") && !ctx.path.startsWith(defaultBasePath + "/") && !ctx.path.startsWith("/api/webbycommerce/")) {
            const pathAfterApi = ctx.path.substring(5);
            const firstSegment = pathAfterApi.split("/")[0];
            if (pluginRoutes.has(firstSegment)) {
              ctx.state.originalPath = ctx.path;
              ctx.path = `${defaultBasePath}/${pathAfterApi}`;
              return next();
            }
          }
          if (routePrefix !== "webbycommerce") {
            const customBasePath = `/api/${routePrefix}`;
            if (ctx.path.startsWith(customBasePath)) {
              ctx.state.originalPath = ctx.path;
              const remainingPath = ctx.path.replace(customBasePath, "");
              ctx.path = `${defaultBasePath}${remainingPath}`;
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const defaultPath = `/api/webbycommerce/health`;
          const customPath = `/api/${routePrefix}/health`;
          const legacyPath = `/${routePrefix}/health`;
          if (ctx.method === "GET" && (ctx.path === defaultPath || ctx.path === customPath || ctx.path === legacyPath || ctx.path === "/webbycommerce/health" || ctx.path === "/api/webbycommerce/health")) {
            ctx.set("Content-Type", "application/json; charset=utf-8");
            ctx.body = {
              status: "ok",
              plugin: "webbycommerce",
              message: "Ecommerce plugin is running"
            };
            return;
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          if (ctx.method === "POST" && (ctx.path === "/api/auth/local" || ctx.path === "/api/auth/local/register")) {
            try {
              const store = strapi2.store({ type: "plugin", name: "webbycommerce" });
              const value = await store.get({ key: "settings" }) || {};
              const method = value.loginRegisterMethod || "default";
              if (method === "otp") {
                ctx.badRequest(
                  "Authentication method is set to OTP. Please use the OTP login/register endpoints."
                );
                return;
              }
              if (ctx.path === "/api/auth/local/register") {
                return next();
              }
              if (ctx.path === "/api/auth/local") {
                const hasPermission = await ensureEcommercePermission(ctx);
                if (!hasPermission) {
                  return;
                }
              }
            } catch (error) {
              strapi2.log.error(
                "[webbycommerce] Failed to read loginRegisterMethod for auth guard:",
                error
              );
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const originalPath = ctx.state.originalPath || ctx.path;
          const loginPaths = /* @__PURE__ */ new Set([
            "/api/webbycommerce/auth/login-register",
            `/api/${routePrefix}/auth/login-register`,
            "/webbycommerce/auth/login-register",
            `/${routePrefix}/auth/login-register`
          ]);
          const verifyPaths = /* @__PURE__ */ new Set([
            "/api/webbycommerce/auth/verify-otp",
            `/api/${routePrefix}/auth/verify-otp`,
            "/webbycommerce/auth/verify-otp",
            `/${routePrefix}/auth/verify-otp`
          ]);
          const profilePaths = /* @__PURE__ */ new Set([
            "/api/webbycommerce/auth/profile",
            `/api/${routePrefix}/auth/profile`,
            "/webbycommerce/auth/profile",
            `/${routePrefix}/auth/profile`
          ]);
          if (ctx.method === "POST" && loginPaths.has(ctx.path)) {
            ctx.state.route = {
              info: {
                type: "content-api",
                pluginName: "webbycommerce"
              }
            };
            const authController = strapi2.plugin("webbycommerce").controller("auth");
            if (authController && typeof authController.loginOrRegister === "function") {
              await authController.loginOrRegister(ctx);
              return;
            }
          }
          if (ctx.method === "POST" && verifyPaths.has(ctx.path)) {
            ctx.state.route = {
              info: {
                type: "content-api",
                pluginName: "webbycommerce"
              }
            };
            const authController = strapi2.plugin("webbycommerce").controller("auth");
            if (authController && typeof authController.verifyOtp === "function") {
              await authController.verifyOtp(ctx);
              return;
            }
          }
          if ((ctx.method === "GET" || ctx.method === "PUT") && profilePaths.has(ctx.path)) {
            ctx.state.route = {
              info: {
                type: "content-api",
                pluginName: "webbycommerce"
              }
            };
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                        strapi2.log.debug(`[webbycommerce] User authenticated: ${user.id}`);
                      } else {
                        strapi2.log.warn(`[webbycommerce] User not found for ID: ${decoded.id}`);
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed:`, error.message);
                }
              }
            }
            const authController = strapi2.plugin("webbycommerce").controller("auth");
            if (ctx.method === "GET" && authController && typeof authController.getProfile === "function") {
              await authController.getProfile(ctx);
              return;
            }
            if (ctx.method === "PUT" && authController && typeof authController.updateProfile === "function") {
              await authController.updateProfile(ctx);
              return;
            }
          }
          const customAddressPath = `/api/${routePrefix}/addresses`;
          const defaultAddressPath = `/api/webbycommerce/addresses`;
          const isAddressRoute = ctx.path === customAddressPath || ctx.path.startsWith(`${customAddressPath}/`) || ctx.path === defaultAddressPath || ctx.path.startsWith(`${defaultAddressPath}/`) || originalPath === customAddressPath || originalPath.startsWith(`${customAddressPath}/`);
          if (isAddressRoute) {
            let addressId = null;
            const pathMatch = ctx.path.match(/\/addresses\/([^\/]+)/);
            if (pathMatch) {
              addressId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = addressId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for address route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body:`, error.message);
              }
            }
            const addressController = strapi2.plugin("webbycommerce").controller("address");
            if (addressController) {
              if (method === "get" && !addressId && typeof addressController.getAddresses === "function") {
                await addressController.getAddresses(ctx);
                return;
              }
              if (method === "get" && addressId && typeof addressController.getAddress === "function") {
                await addressController.getAddress(ctx);
                return;
              }
              if (method === "post" && typeof addressController.createAddress === "function") {
                await addressController.createAddress(ctx);
                return;
              }
              if (method === "put" && addressId && typeof addressController.updateAddress === "function") {
                await addressController.updateAddress(ctx);
                return;
              }
              if (method === "delete" && addressId && typeof addressController.deleteAddress === "function") {
                await addressController.deleteAddress(ctx);
                return;
              }
            }
          }
          const customProductPath = `/api/${routePrefix}/products`;
          const defaultProductPath = `/api/webbycommerce/products`;
          const isProductRoute = ctx.path === customProductPath || ctx.path.startsWith(`${customProductPath}/`) || ctx.path === defaultProductPath || ctx.path.startsWith(`${defaultProductPath}/`) || originalPath === customProductPath || originalPath.startsWith(`${customProductPath}/`);
          if (isProductRoute) {
            const pathParts = (ctx.path || "").split("/").filter(Boolean);
            const productsIndex = pathParts.lastIndexOf("products");
            const next1 = productsIndex >= 0 ? pathParts[productsIndex + 1] : null;
            const next2 = productsIndex >= 0 ? pathParts[productsIndex + 2] : null;
            const reserved = /* @__PURE__ */ new Set(["attributes", "categories", "tags", "slug", "bulk"]);
            const productAction = next1 && reserved.has(next1) ? next1 : null;
            const productId = next1 && !productAction ? next1 : null;
            const isRelated = Boolean(productId && next2 === "related");
            const slugValue = productAction === "slug" ? next2 : null;
            const isNumericId = (value) => typeof value === "string" && /^[0-9]+$/.test(value);
            if (!ctx.params) {
              ctx.params = {};
            }
            if (productId) {
              ctx.params.id = productId;
            }
            if (slugValue) {
              ctx.params.slug = slugValue;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for product route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body:`, error.message);
              }
            }
            const productController = strapi2.plugin("webbycommerce").controller("product");
            if (productController) {
              if (method === "get" && productAction === "attributes" && typeof productController.getAttributes === "function") {
                await productController.getAttributes(ctx);
                return;
              }
              if (method === "get" && productAction === "categories" && typeof productController.getCategories === "function") {
                await productController.getCategories(ctx);
                return;
              }
              if (method === "get" && productAction === "tags" && typeof productController.getTags === "function") {
                await productController.getTags(ctx);
                return;
              }
              if (method === "get" && productAction === "slug" && slugValue && typeof productController.getProductBySlug === "function") {
                await productController.getProductBySlug(ctx);
                return;
              }
              if (method === "get" && isRelated && typeof productController.getRelatedProducts === "function") {
                await productController.getRelatedProducts(ctx);
                return;
              }
              if (method === "get" && !productId && !productAction && typeof productController.getProducts === "function") {
                await productController.getProducts(ctx);
                return;
              }
              if (method === "get" && productId && !isRelated) {
                if (isNumericId(productId) && typeof productController.getProduct === "function") {
                  await productController.getProduct(ctx);
                  return;
                }
                if (typeof productId === "string" && productId && typeof productController.getProductBySlug === "function") {
                  ctx.params.slug = productId;
                  await productController.getProductBySlug(ctx);
                  return;
                }
              }
              if (method === "post" && productAction === "bulk" && typeof productController.createBulkProducts === "function") {
                await productController.createBulkProducts(ctx);
                return;
              }
              if (method === "post" && !productId && !productAction && typeof productController.createProduct === "function") {
                await productController.createProduct(ctx);
                return;
              }
              if (method === "put" && productId && typeof productController.updateProduct === "function") {
                await productController.updateProduct(ctx);
                return;
              }
              if (method === "delete" && productId && typeof productController.deleteProduct === "function") {
                await productController.deleteProduct(ctx);
                return;
              }
            }
          }
          const customCartPath = `/api/${routePrefix}/cart`;
          const defaultCartPath = `/api/webbycommerce/cart`;
          const isCartRoute = ctx.path === customCartPath || ctx.path.startsWith(`${customCartPath}/`) || ctx.path === defaultCartPath || ctx.path.startsWith(`${defaultCartPath}/`) || originalPath === customCartPath || originalPath.startsWith(`${customCartPath}/`);
          if (ctx.path.includes("/cart/")) {
            strapi2.log.debug(`[webbycommerce] Cart route detected:`, {
              path: ctx.path,
              originalPath,
              method: ctx.method,
              routePrefix
            });
          }
          const isSpecialCartRoute = false;
          if (ctx.path.includes("/cart/")) {
            strapi2.log.debug(`[webbycommerce] Cart route analysis:`, {
              isCartRoute,
              isSpecialCartRoute,
              willIntercept: isCartRoute && !isSpecialCartRoute
            });
          }
          if (isCartRoute && !isSpecialCartRoute) {
            const pathParts = (ctx.path || "").split("/").filter(Boolean);
            const cartIndex = pathParts.lastIndexOf("cart");
            const cartNext = cartIndex >= 0 ? pathParts[cartIndex + 1] : null;
            const reserved = /* @__PURE__ */ new Set(["apply-coupon", "coupon", "totals", "create", "checkout"]);
            const isNumericId = (value) => typeof value === "string" && /^[0-9]+$/.test(value);
            const cartAction = cartNext && reserved.has(cartNext) ? cartNext : null;
            const cartItemId = cartNext && !cartAction && isNumericId(cartNext) ? cartNext : null;
            if (cartItemId) {
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = cartItemId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for cart route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for cart:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for cart:`, error.message);
              }
            }
            const cartController = strapi2.plugin("webbycommerce").controller("cart");
            if (cartController) {
              if (method === "get" && cartAction === "totals" && typeof cartController.getTotals === "function") {
                await cartController.getTotals(ctx);
                return;
              }
              if (method === "post" && cartAction === "create" && typeof cartController.createCart === "function") {
                await cartController.createCart(ctx);
                return;
              }
              if (method === "post" && cartAction === "checkout" && typeof cartController.checkout === "function") {
                await cartController.checkout(ctx);
                return;
              }
              if (method === "post" && cartAction === "apply-coupon" && typeof cartController.applyCoupon === "function") {
                await cartController.applyCoupon(ctx);
                return;
              }
              if (method === "delete" && cartAction === "coupon" && typeof cartController.removeCoupon === "function") {
                await cartController.removeCoupon(ctx);
                return;
              }
              if (method === "get" && !cartAction && !cartItemId && typeof cartController.getCart === "function") {
                await cartController.getCart(ctx);
                return;
              }
              if (method === "get" && !cartAction && !cartItemId && typeof cartController.getItems === "function") {
                await cartController.getItems(ctx);
                return;
              }
              if (method === "post" && !cartAction && !cartItemId && typeof cartController.addItem === "function") {
                await cartController.addItem(ctx);
                return;
              }
              if (method === "put" && cartItemId && typeof cartController.updateItem === "function") {
                await cartController.updateItem(ctx);
                return;
              }
              if (method === "delete" && cartItemId && typeof cartController.removeItem === "function") {
                await cartController.removeItem(ctx);
                return;
              }
              if (method === "delete" && !cartAction && !cartItemId && typeof cartController.clearCart === "function") {
                await cartController.clearCart(ctx);
                return;
              }
            }
          }
          const customProductVariantPath = `/api/${routePrefix}/product-variants`;
          const defaultProductVariantPath = `/api/webbycommerce/product-variants`;
          const isProductVariantRoute = ctx.path === customProductVariantPath || ctx.path.startsWith(`${customProductVariantPath}/`) || ctx.path === defaultProductVariantPath || ctx.path.startsWith(`${defaultProductVariantPath}/`) || originalPath === customProductVariantPath || originalPath.startsWith(`${customProductVariantPath}/`);
          if (isProductVariantRoute) {
            let productVariantId = null;
            const pathMatch = ctx.path.match(/\/product-variants\/([^\/]+)/);
            if (pathMatch) {
              productVariantId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = productVariantId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for product-variant route:`, error.message);
                }
              }
            }
            const hasPermissionForProductVariants = await ensureEcommercePermission(ctx);
            if (!hasPermissionForProductVariants) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for product-variants:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for product-variant route:`, error.message);
              }
            }
            const productVariantController = strapi2.plugin("webbycommerce").controller("productVariant");
            if (productVariantController) {
              if (method === "get" && !productVariantId && typeof productVariantController.getProductVariants === "function") {
                await productVariantController.getProductVariants(ctx);
                return;
              }
              if (method === "get" && productVariantId && typeof productVariantController.getProductVariant === "function") {
                await productVariantController.getProductVariant(ctx);
                return;
              }
              if (method === "post" && typeof productVariantController.createProductVariant === "function") {
                await productVariantController.createProductVariant(ctx);
                return;
              }
              if (method === "put" && productVariantId && typeof productVariantController.updateProductVariant === "function") {
                await productVariantController.updateProductVariant(ctx);
                return;
              }
              if (method === "delete" && productVariantId && typeof productVariantController.deleteProductVariant === "function") {
                await productVariantController.deleteProductVariant(ctx);
                return;
              }
            }
          }
          const customProductAttributePath = `/api/${routePrefix}/product-attributes`;
          const defaultProductAttributePath = `/api/webbycommerce/product-attributes`;
          const isProductAttributeRoute = ctx.path === customProductAttributePath || ctx.path.startsWith(`${customProductAttributePath}/`) || ctx.path === defaultProductAttributePath || ctx.path.startsWith(`${defaultProductAttributePath}/`) || originalPath === customProductAttributePath || originalPath.startsWith(`${customProductAttributePath}/`);
          if (isProductAttributeRoute) {
            let productAttributeId = null;
            const pathMatch = ctx.path.match(/\/product-attributes\/([^\/]+)/);
            if (pathMatch) {
              productAttributeId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = productAttributeId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for product-attribute route:`, error.message);
                }
              }
            }
            const hasPermissionForProductAttributes = await ensureEcommercePermission(ctx);
            if (!hasPermissionForProductAttributes) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for product-attributes:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for product-attribute route:`, error.message);
              }
            }
            if (method === "get" && !productAttributeId) {
              const entities = await strapi2.entityService.findMany("plugin::webbycommerce.product-attribute", {
                sort: { sort_order: "asc" },
                populate: ["product_attribute_values"]
              });
              ctx.send({ data: entities });
              return;
            }
            if (method === "get" && productAttributeId) {
              const isNumericId = /^[0-9]+$/.test(productAttributeId);
              let entity;
              if (isNumericId) {
                entity = await strapi2.entityService.findOne("plugin::webbycommerce.product-attribute", productAttributeId, {
                  populate: ["product_attribute_values"]
                });
              } else {
                const decodedSlug = decodeURIComponent(productAttributeId).trim();
                const results = await strapi2.db.query("plugin::webbycommerce.product-attribute").findMany({
                  where: { slug: decodedSlug },
                  limit: 1,
                  orderBy: { id: "desc" },
                  populate: ["product_attribute_values"]
                });
                entity = results?.[0];
              }
              if (!entity) {
                return ctx.notFound("Product attribute not found");
              }
              ctx.send({ data: entity });
              return;
            }
            if (method === "post") {
              const entity = await strapi2.entityService.create("plugin::webbycommerce.product-attribute", {
                data: ctx.request.body
              });
              ctx.send({ data: entity });
              return;
            }
            if (method === "put" && productAttributeId) {
              const entity = await strapi2.entityService.update("plugin::webbycommerce.product-attribute", productAttributeId, {
                data: ctx.request.body
              });
              if (!entity) {
                return ctx.notFound("Product attribute not found");
              }
              ctx.send({ data: entity });
              return;
            }
            if (method === "delete" && productAttributeId) {
              const entity = await strapi2.entityService.delete("plugin::webbycommerce.product-attribute", productAttributeId);
              if (!entity) {
                return ctx.notFound("Product attribute not found");
              }
              ctx.send({ data: entity });
              return;
            }
          }
          const customProductAttributeValuePath = `/api/${routePrefix}/product-attribute-values`;
          const defaultProductAttributeValuePath = `/api/webbycommerce/product-attribute-values`;
          const isProductAttributeValueRoute = ctx.path === customProductAttributeValuePath || ctx.path.startsWith(`${customProductAttributeValuePath}/`) || ctx.path === defaultProductAttributeValuePath || ctx.path.startsWith(`${defaultProductAttributeValuePath}/`) || originalPath === customProductAttributeValuePath || originalPath.startsWith(`${customProductAttributeValuePath}/`);
          if (isProductAttributeValueRoute) {
            let productAttributeValueId = null;
            const pathMatch = ctx.path.match(/\/product-attribute-values\/([^\/]+)/);
            if (pathMatch) {
              productAttributeValueId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = productAttributeValueId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for product-attribute-value route:`, error.message);
                }
              }
            }
            const hasPermissionForProductAttributeValues = await ensureEcommercePermission(ctx);
            if (!hasPermissionForProductAttributeValues) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for product-attribute-values:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for product-attribute-value route:`, error.message);
              }
            }
            if (method === "get" && !productAttributeValueId) {
              const entities = await strapi2.entityService.findMany("plugin::webbycommerce.product-attribute-value", {
                sort: { sort_order: "asc" },
                populate: ["product_attribute"]
              });
              ctx.send({ data: entities });
              return;
            }
            if (method === "get" && productAttributeValueId) {
              const isNumericId = /^[0-9]+$/.test(productAttributeValueId);
              let entity;
              if (isNumericId) {
                entity = await strapi2.entityService.findOne("plugin::webbycommerce.product-attribute-value", productAttributeValueId, {
                  populate: ["product_attribute"]
                });
              } else {
                const decodedSlug = decodeURIComponent(productAttributeValueId).trim();
                const results = await strapi2.db.query("plugin::webbycommerce.product-attribute-value").findMany({
                  where: { slug: decodedSlug },
                  limit: 1,
                  orderBy: { id: "desc" },
                  populate: ["product_attribute"]
                });
                entity = results?.[0];
              }
              if (!entity) {
                return ctx.notFound("Product attribute value not found");
              }
              ctx.send({ data: entity });
              return;
            }
            if (method === "post") {
              const entity = await strapi2.entityService.create("plugin::webbycommerce.product-attribute-value", {
                data: ctx.request.body
              });
              ctx.send({ data: entity });
              return;
            }
            if (method === "put" && productAttributeValueId) {
              const entity = await strapi2.entityService.update("plugin::webbycommerce.product-attribute-value", productAttributeValueId, {
                data: ctx.request.body
              });
              if (!entity) {
                return ctx.notFound("Product attribute value not found");
              }
              ctx.send({ data: entity });
              return;
            }
            if (method === "delete" && productAttributeValueId) {
              const entity = await strapi2.entityService.delete("plugin::webbycommerce.product-attribute-value", productAttributeValueId);
              if (!entity) {
                return ctx.notFound("Product attribute value not found");
              }
              ctx.send({ data: entity });
              return;
            }
          }
          const customWishlistPath = `/api/${routePrefix}/wishlist`;
          const defaultWishlistPath = `/api/webbycommerce/wishlist`;
          const isWishlistRoute = ctx.path === customWishlistPath || ctx.path.startsWith(`${customWishlistPath}/`) || ctx.path === defaultWishlistPath || ctx.path.startsWith(`${defaultWishlistPath}/`) || originalPath === customWishlistPath || originalPath.startsWith(`${customWishlistPath}/`);
          const isMoveToCartRoute = ctx.path.includes("/move-to-cart") || originalPath.includes("/move-to-cart");
          const isSpecialWishlistRoute = (ctx.path.includes("/wishlist/items/") || originalPath.includes("/wishlist/items/")) && !isMoveToCartRoute;
          if (isWishlistRoute && !isSpecialWishlistRoute) {
            let productId = null;
            const pathMatch = ctx.path.match(/\/wishlist\/([^\/]+)/);
            if (pathMatch) {
              productId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.productId = productId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for wishlist route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for wishlist:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for wishlist:`, error.message);
              }
            }
            const wishlistController = strapi2.plugin("webbycommerce").controller("wishlist");
            if (wishlistController) {
              if (method === "get" && !productId && typeof wishlistController.getWishlist === "function") {
                await wishlistController.getWishlist(ctx);
                return;
              }
              if (method === "post" && !productId && typeof wishlistController.addToWishlist === "function") {
                await wishlistController.addToWishlist(ctx);
                return;
              }
              if (method === "delete" && productId && typeof wishlistController.removeFromWishlist === "function") {
                await wishlistController.removeFromWishlist(ctx);
                return;
              }
              if (method === "delete" && !productId && typeof wishlistController.clearWishlist === "function") {
                await wishlistController.clearWishlist(ctx);
                return;
              }
              if (method === "put" && !productId && typeof wishlistController.updateWishlist === "function") {
                await wishlistController.updateWishlist(ctx);
                return;
              }
              if (method === "get" && ctx.path.includes("/status") && typeof wishlistController.checkWishlistStatus === "function") {
                await wishlistController.checkWishlistStatus(ctx);
                return;
              }
            }
          }
          if (isWishlistRoute && isMoveToCartRoute) {
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for move-to-cart route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if (method === "post" && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for move-to-cart:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for move-to-cart:`, error.message);
              }
            }
            const wishlistController = strapi2.plugin("webbycommerce").controller("wishlist");
            if (wishlistController && method === "post" && typeof wishlistController.moveToCart === "function") {
              const moveToCartMatch = ctx.path.match(/\/wishlist\/items\/([^\/]+)\/move-to-cart/);
              if (moveToCartMatch) {
                if (!ctx.params) {
                  ctx.params = {};
                }
                ctx.params.id = moveToCartMatch[1];
              }
              await wishlistController.moveToCart(ctx);
              return;
            }
          }
          const customComparePath = `/api/${routePrefix}/compare`;
          const defaultComparePath = `/api/webbycommerce/compare`;
          const isCompareRoute = ctx.path === customComparePath || ctx.path.startsWith(`${customComparePath}/`) || ctx.path === defaultComparePath || ctx.path.startsWith(`${defaultComparePath}/`) || originalPath === customComparePath || originalPath.startsWith(`${customComparePath}/`);
          if (isCompareRoute) {
            let productId = null;
            const pathMatch = ctx.path.match(/\/compare\/([^\/]+)/);
            if (pathMatch) {
              productId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.productId = productId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for compare route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for compare:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for compare:`, error.message);
              }
            }
            const compareController = strapi2.plugin("webbycommerce").controller("compare");
            if (compareController) {
              if (method === "get" && !productId && !ctx.path.includes("/data") && !ctx.path.includes("/status") && typeof compareController.getCompare === "function") {
                await compareController.getCompare(ctx);
                return;
              }
              if (method === "post" && !productId && typeof compareController.addToCompare === "function") {
                await compareController.addToCompare(ctx);
                return;
              }
              if (method === "delete" && productId && typeof compareController.removeFromCompare === "function") {
                await compareController.removeFromCompare(ctx);
                return;
              }
              if (method === "delete" && !productId && typeof compareController.clearCompare === "function") {
                await compareController.clearCompare(ctx);
                return;
              }
              if (method === "put" && !productId && typeof compareController.updateCompare === "function") {
                await compareController.updateCompare(ctx);
                return;
              }
              if (method === "get" && ctx.path.includes("/data") && typeof compareController.getComparisonData === "function") {
                await compareController.getComparisonData(ctx);
                return;
              }
              if (method === "get" && ctx.path.includes("/status") && typeof compareController.checkCompareStatus === "function") {
                await compareController.checkCompareStatus(ctx);
                return;
              }
            }
          }
          const customProductCategoryPath = `/api/${routePrefix}/product-categories`;
          const defaultProductCategoryPath = `/api/webbycommerce/product-categories`;
          const isProductCategoryRoute = ctx.path === customProductCategoryPath || ctx.path.startsWith(`${customProductCategoryPath}/`) || ctx.path === defaultProductCategoryPath || ctx.path.startsWith(`${defaultProductCategoryPath}/`) || originalPath === customProductCategoryPath || originalPath.startsWith(`${customProductCategoryPath}/`);
          if (isProductCategoryRoute) {
            let productCategoryId = null;
            const pathMatchCat = ctx.path.match(/\/product-categories\/([^\/]+)/);
            if (pathMatchCat) {
              productCategoryId = pathMatchCat[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = productCategoryId;
            }
            const authHeaderCat = ctx.request.header.authorization;
            if (authHeaderCat && authHeaderCat.startsWith("Bearer ")) {
              const token = authHeaderCat.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for product-category route:`, error.message);
                }
              }
            }
            const hasPermissionForProductCategories = await ensureEcommercePermission(ctx);
            if (!hasPermissionForProductCategories) {
              return;
            }
            const methodCat = ctx.method.toLowerCase();
            if ((methodCat === "post" || methodCat === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for product-categories:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for product-category route:`, error.message);
              }
            }
            const productCategoryController = strapi2.plugin("webbycommerce").controller("productCategory");
            if (productCategoryController) {
              if (methodCat === "get" && !productCategoryId && typeof productCategoryController.getProductCategories === "function") {
                await productCategoryController.getProductCategories(ctx);
                return;
              }
              if (methodCat === "get" && productCategoryId && typeof productCategoryController.getProductCategory === "function") {
                await productCategoryController.getProductCategory(ctx);
                return;
              }
              if (methodCat === "post" && typeof productCategoryController.createProductCategory === "function") {
                await productCategoryController.createProductCategory(ctx);
                return;
              }
              if (methodCat === "put" && productCategoryId && typeof productCategoryController.updateProductCategory === "function") {
                await productCategoryController.updateProductCategory(ctx);
                return;
              }
              if (methodCat === "delete" && productCategoryId && typeof productCategoryController.deleteProductCategory === "function") {
                await productCategoryController.deleteProductCategory(ctx);
                return;
              }
            }
          }
          const customTagPath = `/api/${routePrefix}/tags`;
          const defaultTagPath = `/api/webbycommerce/tags`;
          const isTagRoute = ctx.path === customTagPath || ctx.path.startsWith(`${customTagPath}/`) || ctx.path === defaultTagPath || ctx.path.startsWith(`${defaultTagPath}/`) || originalPath === customTagPath || originalPath.startsWith(`${customTagPath}/`);
          if (isTagRoute) {
            let tagId = null;
            const pathMatch = ctx.path.match(/\/tags\/([^\/]+)/);
            if (pathMatch) {
              tagId = pathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = tagId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for tag route:`, error.message);
                }
              }
            }
            const hasPermissionForTags = await ensureEcommercePermission(ctx);
            if (!hasPermissionForTags) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for tags:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for tag route:`, error.message);
              }
            }
            const tagController = strapi2.plugin("webbycommerce").controller("productTag");
            if (tagController) {
              if (method === "get" && !tagId && typeof tagController.getTags === "function") {
                await tagController.getTags(ctx);
                return;
              }
              if (method === "get" && tagId && typeof tagController.getTag === "function") {
                await tagController.getTag(ctx);
                return;
              }
              if (method === "post" && typeof tagController.createTag === "function") {
                await tagController.createTag(ctx);
                return;
              }
              if (method === "put" && tagId && typeof tagController.updateTag === "function") {
                await tagController.updateTag(ctx);
                return;
              }
              if (method === "delete" && tagId && typeof tagController.deleteTag === "function") {
                await tagController.deleteTag(ctx);
                return;
              }
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const originalPath = ctx.state.originalPath || ctx.path;
          const customPaymentsPath = `/api/${routePrefix}/payments`;
          const defaultPaymentsPath = `/api/webbycommerce/payments`;
          const isPaymentRoute = ctx.path === customPaymentsPath || ctx.path.startsWith(`${customPaymentsPath}/`) || ctx.path === defaultPaymentsPath || ctx.path.startsWith(`${defaultPaymentsPath}/`) || originalPath === customPaymentsPath || originalPath.startsWith(`${customPaymentsPath}/`);
          if (isPaymentRoute) {
            let action = null;
            let paymentId = null;
            const pathMatch = ctx.path.match(/\/payments\/([^\/]+)(?:\/([^\/]+))?/);
            if (pathMatch) {
              const firstSegment = pathMatch[1];
              const secondSegment = pathMatch[2];
              const knownActions = ["create-intent", "confirm", "webhook", "transactions"];
              if (knownActions.includes(firstSegment)) {
                action = firstSegment;
              } else if (secondSegment === "refund") {
                paymentId = firstSegment;
                action = secondSegment;
              } else {
                paymentId = firstSegment;
              }
              if (!ctx.params) {
                ctx.params = {};
              }
              if (action) {
                ctx.params.action = action;
              }
              if (paymentId) {
                ctx.params.id = paymentId;
              }
            }
            if (action !== "webhook") {
              const authHeader = ctx.request.header.authorization;
              if (authHeader && authHeader.startsWith("Bearer ")) {
                const token = authHeader.replace("Bearer ", "").trim();
                if (token) {
                  try {
                    const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                    if (jwtService && typeof jwtService.verify === "function") {
                      const decoded = await jwtService.verify(token);
                      if (decoded && decoded.id) {
                        const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                          where: { id: decoded.id },
                          populate: ["role"]
                        });
                        if (user) {
                          ctx.state.user = user;
                        }
                      }
                    }
                  } catch (error) {
                    strapi2.log.debug(`[webbycommerce] JWT verification failed for payment route:`, error.message);
                  }
                }
              }
            }
            if (action !== "webhook") {
              const hasPermission = await ensureEcommercePermission(ctx);
              if (!hasPermission) {
                return;
              }
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for payment:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for payment route:`, error.message);
              }
            }
            const paymentController = strapi2.plugin("webbycommerce").controller("payment");
            if (paymentController) {
              if (method === "post" && action === "create-intent" && typeof paymentController.createIntent === "function") {
                await paymentController.createIntent(ctx);
                return;
              }
              if (method === "post" && action === "confirm" && typeof paymentController.confirmPayment === "function") {
                await paymentController.confirmPayment(ctx);
                return;
              }
              if (method === "post" && action === "webhook" && typeof paymentController.handleWebhook === "function") {
                await paymentController.handleWebhook(ctx);
                return;
              }
              if (method === "post" && action === "refund" && typeof paymentController.processRefund === "function") {
                await paymentController.processRefund(ctx);
                return;
              }
              if (method === "get" && action === "transactions" && typeof paymentController.getTransactions === "function") {
                await paymentController.getTransactions(ctx);
                return;
              }
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const originalPath = ctx.state.originalPath || ctx.path;
          const customOrderPath = `/api/${routePrefix}/orders`;
          const defaultOrderPath = `/api/webbycommerce/orders`;
          const customCheckoutPath = `/api/${routePrefix}/checkout`;
          const defaultCheckoutPath = `/api/webbycommerce/checkout`;
          const isOrderRoute = ctx.path === customOrderPath || ctx.path.startsWith(`${customOrderPath}/`) || ctx.path === defaultOrderPath || ctx.path.startsWith(`${defaultOrderPath}/`) || ctx.path === customCheckoutPath || ctx.path === defaultCheckoutPath || originalPath === customOrderPath || originalPath.startsWith(`${customOrderPath}/`) || originalPath === customCheckoutPath;
          if (isOrderRoute) {
            let orderId = null;
            const orderPathMatch = ctx.path.match(/\/orders\/([^\/]+)/);
            if (orderPathMatch) {
              orderId = orderPathMatch[1];
              if (!ctx.params) {
                ctx.params = {};
              }
              ctx.params.id = orderId;
            }
            const authHeader = ctx.request.header.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
              const token = authHeader.replace("Bearer ", "").trim();
              if (token) {
                try {
                  const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                  if (jwtService && typeof jwtService.verify === "function") {
                    const decoded = await jwtService.verify(token);
                    if (decoded && decoded.id) {
                      const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                        where: { id: decoded.id },
                        populate: ["role"]
                      });
                      if (user) {
                        ctx.state.user = user;
                      }
                    }
                  }
                } catch (error) {
                  strapi2.log.debug(`[webbycommerce] JWT verification failed for order route:`, error.message);
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for order:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for order route:`, error.message);
              }
            }
            const orderController = strapi2.plugin("webbycommerce").controller("order");
            if (orderController) {
              if (ctx.path.includes("/checkout") && method === "post" && typeof orderController.checkout === "function") {
                await orderController.checkout(ctx);
                return;
              }
              if (method === "get" && !orderId && typeof orderController.getOrders === "function") {
                await orderController.getOrders(ctx);
                return;
              }
              if (method === "get" && orderId && typeof orderController.getOrder === "function") {
                await orderController.getOrder(ctx);
                return;
              }
              if (method === "put" && orderId && ctx.path.includes("/cancel") && typeof orderController.cancelOrder === "function") {
                await orderController.cancelOrder(ctx);
                return;
              }
              if (method === "put" && orderId && ctx.path.includes("/status") && typeof orderController.updateOrderStatus === "function") {
                await orderController.updateOrderStatus(ctx);
                return;
              }
              if (method === "get" && orderId && ctx.path.includes("/tracking") && typeof orderController.getOrderTracking === "function") {
                await orderController.getOrderTracking(ctx);
                return;
              }
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
          if (isAdminRoute(ctx.path)) {
            return next();
          }
          const routePrefix = await getRoutePrefix();
          const originalPath = ctx.state.originalPath || ctx.path;
          const customShippingPath = `/api/${routePrefix}/shipping`;
          const defaultShippingPath = `/api/webbycommerce/shipping`;
          const isShippingRoute = ctx.path === customShippingPath || ctx.path.startsWith(`${customShippingPath}/`) || ctx.path === defaultShippingPath || ctx.path.startsWith(`${defaultShippingPath}/`) || originalPath === customShippingPath || originalPath.startsWith(`${customShippingPath}/`);
          if (isShippingRoute) {
            let shippingZoneId = null;
            let shippingMethodId = null;
            let shippingRateId = null;
            let action = null;
            const calculateMatch = ctx.path.match(/\/shipping\/calculate$/);
            const zonesListMatch = ctx.path.match(/\/shipping\/zones$/);
            const zonesSingleMatch = ctx.path.match(/\/shipping\/zones\/([^\/]+)$/);
            const methodsListMatch = ctx.path.match(/\/shipping\/methods$/);
            const methodsSingleMatch = ctx.path.match(/\/shipping\/methods\/([^\/]+)$/);
            const ratesListMatch = ctx.path.match(/\/shipping\/methods\/([^\/]+)\/rates$/);
            const ratesSingleMatch = ctx.path.match(/\/shipping\/rates\/([^\/]+)$/);
            const ratesCreateMatch = ctx.path.match(/\/shipping\/rates$/);
            if (calculateMatch) {
              action = "calculate";
            } else if (zonesListMatch) {
              action = ctx.method.toLowerCase() === "get" ? "get-zones" : "create-zone";
            } else if (zonesSingleMatch) {
              shippingZoneId = zonesSingleMatch[1];
              action = ctx.method.toLowerCase() === "put" ? "update-zone" : "delete-zone";
            } else if (methodsListMatch) {
              action = ctx.method.toLowerCase() === "get" ? "get-methods" : "create-method";
            } else if (methodsSingleMatch) {
              shippingMethodId = methodsSingleMatch[1];
              action = ctx.method.toLowerCase() === "put" ? "update-method" : "delete-method";
            } else if (ratesListMatch) {
              shippingMethodId = ratesListMatch[1];
              action = "get-rates";
            } else if (ratesCreateMatch && ctx.method.toLowerCase() === "post") {
              action = "create-rate";
            } else if (ratesSingleMatch) {
              shippingRateId = ratesSingleMatch[1];
              action = ctx.method.toLowerCase() === "put" ? "update-rate" : "delete-rate";
            }
            if (!ctx.params) {
              ctx.params = {};
            }
            if (shippingZoneId) {
              ctx.params.id = shippingZoneId;
            }
            if (shippingMethodId && action !== "get-rates") {
              ctx.params.id = shippingMethodId;
            }
            if (shippingRateId) {
              ctx.params.id = shippingRateId;
            }
            if (shippingMethodId && action === "get-rates") {
              ctx.params.methodId = shippingMethodId;
            }
            const isAdminRoute2 = action && [
              "get-zones",
              "create-zone",
              "update-zone",
              "delete-zone",
              "get-methods",
              "create-method",
              "update-method",
              "delete-method",
              "get-rates",
              "create-rate",
              "update-rate",
              "delete-rate"
            ].includes(action);
            if (isAdminRoute2) {
              const authHeader = ctx.request.header.authorization;
              if (authHeader && authHeader.startsWith("Bearer ")) {
                const token = authHeader.replace("Bearer ", "").trim();
                if (token) {
                  try {
                    const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                    if (jwtService && typeof jwtService.verify === "function") {
                      const decoded = await jwtService.verify(token);
                      if (decoded && decoded.id) {
                        const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                          where: { id: decoded.id },
                          populate: ["role"]
                        });
                        if (user) {
                          ctx.state.user = user;
                          const userRole = user.role?.type;
                          if (userRole !== "admin" && userRole !== "super_admin") {
                            ctx.forbidden("Admin access required for this operation.");
                            return;
                          }
                        }
                      }
                    }
                  } catch (error) {
                    strapi2.log.debug(`[webbycommerce] JWT verification failed for shipping admin route:`, error.message);
                    ctx.forbidden("Authentication failed.");
                    return;
                  }
                }
              } else {
                ctx.forbidden("Authentication required for admin operations.");
                return;
              }
            } else {
              const authHeader = ctx.request.header.authorization;
              if (authHeader && authHeader.startsWith("Bearer ")) {
                const token = authHeader.replace("Bearer ", "").trim();
                if (token) {
                  try {
                    const jwtService = strapi2.plugins["users-permissions"].services.jwt;
                    if (jwtService && typeof jwtService.verify === "function") {
                      const decoded = await jwtService.verify(token);
                      if (decoded && decoded.id) {
                        const user = await strapi2.db.query("plugin::users-permissions.user").findOne({
                          where: { id: decoded.id },
                          populate: ["role"]
                        });
                        if (user) {
                          ctx.state.user = user;
                        }
                      }
                    }
                  } catch (error) {
                    strapi2.log.debug(`[webbycommerce] JWT verification failed for shipping route:`, error.message);
                  }
                }
              }
            }
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
            const method = ctx.method.toLowerCase();
            if ((method === "post" || method === "put") && (!ctx.request.body || typeof ctx.request.body === "object" && Object.keys(ctx.request.body || {}).length === 0)) {
              try {
                const contentType = ctx.request.header["content-type"] || "";
                if (contentType.includes("application/json")) {
                  const chunks = [];
                  for await (const chunk of ctx.req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString("utf8");
                  if (rawBody && rawBody.trim()) {
                    ctx.request.body = JSON.parse(rawBody);
                    strapi2.log.debug(`[webbycommerce] Parsed request body for shipping:`, ctx.request.body);
                  }
                }
              } catch (error) {
                strapi2.log.error(`[webbycommerce] Failed to parse request body for shipping route:`, error.message);
              }
            }
            const shippingController = strapi2.plugin("webbycommerce").controller("shipping");
            if (shippingController) {
              if (action === "calculate" && method === "post" && typeof shippingController.getShippingMethods === "function") {
                await shippingController.getShippingMethods(ctx);
                return;
              }
              if (action === "get-zones" && method === "get" && typeof shippingController.getShippingZones === "function") {
                await shippingController.getShippingZones(ctx);
                return;
              }
              if (action === "create-zone" && method === "post" && typeof shippingController.createShippingZone === "function") {
                await shippingController.createShippingZone(ctx);
                return;
              }
              if (action === "update-zone" && method === "put" && typeof shippingController.updateShippingZone === "function") {
                await shippingController.updateShippingZone(ctx);
                return;
              }
              if (action === "delete-zone" && method === "delete" && typeof shippingController.deleteShippingZone === "function") {
                await shippingController.deleteShippingZone(ctx);
                return;
              }
              if (action === "get-methods" && method === "get" && typeof shippingController.getShippingMethodsAdmin === "function") {
                await shippingController.getShippingMethodsAdmin(ctx);
                return;
              }
              if (action === "create-method" && method === "post" && typeof shippingController.createShippingMethod === "function") {
                await shippingController.createShippingMethod(ctx);
                return;
              }
              if (action === "update-method" && method === "put" && typeof shippingController.updateShippingMethod === "function") {
                await shippingController.updateShippingMethod(ctx);
                return;
              }
              if (action === "delete-method" && method === "delete" && typeof shippingController.deleteShippingMethod === "function") {
                await shippingController.deleteShippingMethod(ctx);
                return;
              }
              if (action === "get-rates" && method === "get" && typeof shippingController.getShippingRates === "function") {
                await shippingController.getShippingRates(ctx);
                return;
              }
              if (action === "create-rate" && method === "post" && typeof shippingController.createShippingRate === "function") {
                await shippingController.createShippingRate(ctx);
                return;
              }
              if (action === "update-rate" && method === "put" && typeof shippingController.updateShippingRate === "function") {
                await shippingController.updateShippingRate(ctx);
                return;
              }
              if (action === "delete-rate" && method === "delete" && typeof shippingController.deleteShippingRate === "function") {
                await shippingController.deleteShippingRate(ctx);
                return;
              }
            }
          }
          return next();
        });
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 1e3;
        const registerWithRetry = async () => {
          try {
            await registerEcommerceActions();
            strapi2.log.info("[webbycommerce] Ecommerce actions registered successfully");
            return true;
          } catch (error) {
            strapi2.log.warn(`[webbycommerce] Failed to register ecommerce actions (attempt ${retryCount + 1}/${maxRetries}):`, error.message);
            if (retryCount < maxRetries - 1) {
              retryCount++;
              strapi2.log.info(`[webbycommerce] Retrying in ${retryDelay}ms...`);
              await new Promise((resolve) => setTimeout(resolve, retryDelay));
              return registerWithRetry();
            } else {
              strapi2.log.error("[webbycommerce] Failed to register ecommerce actions after all retries");
              throw error;
            }
          }
        };
        await registerWithRetry();
        strapi2.log.info("[webbycommerce] Plugin bootstrapped successfully");
        strapi2.log.info(
          "[webbycommerce] Health endpoint is available at: /webbycommerce/health and /api/webbycommerce/health"
        );
        strapi2.log.info("[webbycommerce] ========================================");
      } catch (error) {
        strapi2.log.error("[webbycommerce] Bootstrap error:", error);
        throw error;
      }
    };
  }
});

// server/src/destroy.js
var require_destroy = __commonJS({
  "server/src/destroy.js"(exports2, module2) {
    "use strict";
    module2.exports = async ({ strapi: strapi2 }) => {
      strapi2.log.info("Destroying webbycommerce plugin...");
    };
  }
});

// server/src/config/index.js
var require_config = __commonJS({
  "server/src/config/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      default: {},
      validator: () => {
      }
    };
  }
});

// server/src/controllers/controller.js
var require_controller = __commonJS({
  "server/src/controllers/controller.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var SETTINGS_KEY = "settings";
    var getStore = () => {
      return strapi.store({ type: "plugin", name: PLUGIN_ID });
    };
    var sanitizeOrigins = (input) => {
      if (!Array.isArray(input)) {
        return [];
      }
      return input.map((value) => typeof value === "string" ? value.trim() : "").filter((value) => value.length > 0);
    };
    module2.exports = {
      async health(ctx) {
        strapi.log.info(`[${PLUGIN_ID}] Health endpoint called`);
        ctx.body = {
          status: "ok",
          plugin: PLUGIN_ID,
          message: "Ecommerce plugin is running",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
      },
      async getSettings(ctx) {
        const store = getStore();
        const value = await store.get({ key: SETTINGS_KEY }) || {};
        const allowedOrigins = sanitizeOrigins(value.allowedOrigins);
        const loginRegisterMethod = value.loginRegisterMethod || "default";
        const routePrefix = value.routePrefix || "webbycommerce";
        const smtp = value.smtp || null;
        const shippingType = value.shippingType || "single";
        ctx.body = {
          allowedOrigins,
          loginRegisterMethod,
          routePrefix,
          smtp,
          shippingType
        };
      },
      async updateSettings(ctx) {
        const store = getStore();
        const body = ctx.request.body || {};
        const currentValue = await store.get({ key: SETTINGS_KEY }) || {};
        const allowedOrigins = body.allowedOrigins !== void 0 ? sanitizeOrigins(body.allowedOrigins) : sanitizeOrigins(currentValue.allowedOrigins);
        let loginRegisterMethod = body.loginRegisterMethod !== void 0 ? body.loginRegisterMethod : currentValue.loginRegisterMethod || "default";
        if (loginRegisterMethod !== "default" && loginRegisterMethod !== "otp") {
          return ctx.badRequest('Invalid loginRegisterMethod. Must be "default" or "otp".');
        }
        let routePrefix = body.routePrefix !== void 0 ? body.routePrefix : currentValue.routePrefix || "webbycommerce";
        routePrefix = routePrefix.trim().replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/").replace(/[^a-zA-Z0-9\/_-]/g, "") || "webbycommerce";
        const smtp = body.smtp !== void 0 ? body.smtp : currentValue.smtp;
        let shippingType = body.shippingType !== void 0 ? body.shippingType : currentValue.shippingType || "single";
        if (shippingType !== "single" && shippingType !== "multiple") {
          return ctx.badRequest('Invalid shippingType. Must be "single" or "multiple".');
        }
        const newValue = {
          ...currentValue,
          allowedOrigins,
          loginRegisterMethod,
          routePrefix,
          smtp,
          shippingType
        };
        await store.set({
          key: SETTINGS_KEY,
          value: newValue
        });
        ctx.body = {
          allowedOrigins,
          loginRegisterMethod,
          routePrefix,
          smtp,
          shippingType
        };
      },
      async seedDemo(ctx) {
        strapi.log.info(`[${PLUGIN_ID}] Seed demo data requested`);
        try {
          const result = await strapi.plugin(PLUGIN_ID).service("service").seedDemoData();
          ctx.body = result;
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Seed demo failed:`, error);
          ctx.badRequest("Failed to seed demo data", { error: error.message });
        }
      },
      async generateDemo(ctx) {
        strapi.log.info(`[${PLUGIN_ID}] Demo data generation requested`);
        try {
          const path = require("path");
          const demoScriptPath = path.join(strapi.dirs.app.root, "scripts", "demo-ecommerce-visual.js");
          strapi.log.info(`[${PLUGIN_ID}] Loading demo script from: ${demoScriptPath}`);
          const { createVisualDemo } = require(demoScriptPath);
          if (typeof createVisualDemo !== "function") {
            throw new Error("createVisualDemo is not a function in the demo script");
          }
          const result = await createVisualDemo();
          ctx.body = {
            success: true,
            message: "Demo data generated successfully",
            data: result
          };
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Demo generation failed:`, error);
          ctx.badRequest("Failed to generate demo data", {
            error: error.message,
            details: error.stack
          });
        }
      }
    };
  }
});

// node_modules/nodemailer/lib/fetch/cookies.js
var require_cookies = __commonJS({
  "node_modules/nodemailer/lib/fetch/cookies.js"(exports2, module2) {
    "use strict";
    var urllib = require("url");
    var SESSION_TIMEOUT = 1800;
    var Cookies = class {
      constructor(options) {
        this.options = options || {};
        this.cookies = [];
      }
      /**
       * Stores a cookie string to the cookie storage
       *
       * @param {String} cookieStr Value from the 'Set-Cookie:' header
       * @param {String} url Current URL
       */
      set(cookieStr, url) {
        let urlparts = urllib.parse(url || "");
        let cookie = this.parse(cookieStr);
        let domain;
        if (cookie.domain) {
          domain = cookie.domain.replace(/^\./, "");
          if (
            // can't be valid if the requested domain is shorter than current hostname
            urlparts.hostname.length < domain.length || // prefix domains with dot to be sure that partial matches are not used
            ("." + urlparts.hostname).substr(-domain.length + 1) !== "." + domain
          ) {
            cookie.domain = urlparts.hostname;
          }
        } else {
          cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
          cookie.path = this.getPath(urlparts.pathname);
        }
        if (!cookie.expires) {
          cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1e3);
        }
        return this.add(cookie);
      }
      /**
       * Returns cookie string for the 'Cookie:' header.
       *
       * @param {String} url URL to check for
       * @returns {String} Cookie header or empty string if no matches were found
       */
      get(url) {
        return this.list(url).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
      }
      /**
       * Lists all valied cookie objects for the specified URL
       *
       * @param {String} url URL to check for
       * @returns {Array} An array of cookie objects
       */
      list(url) {
        let result = [];
        let i;
        let cookie;
        for (i = this.cookies.length - 1; i >= 0; i--) {
          cookie = this.cookies[i];
          if (this.isExpired(cookie)) {
            this.cookies.splice(i, i);
            continue;
          }
          if (this.match(cookie, url)) {
            result.unshift(cookie);
          }
        }
        return result;
      }
      /**
       * Parses cookie string from the 'Set-Cookie:' header
       *
       * @param {String} cookieStr String from the 'Set-Cookie:' header
       * @returns {Object} Cookie object
       */
      parse(cookieStr) {
        let cookie = {};
        (cookieStr || "").toString().split(";").forEach((cookiePart) => {
          let valueParts = cookiePart.split("=");
          let key = valueParts.shift().trim().toLowerCase();
          let value = valueParts.join("=").trim();
          let domain;
          if (!key) {
            return;
          }
          switch (key) {
            case "expires":
              value = new Date(value);
              if (value.toString() !== "Invalid Date") {
                cookie.expires = value;
              }
              break;
            case "path":
              cookie.path = value;
              break;
            case "domain":
              domain = value.toLowerCase();
              if (domain.length && domain.charAt(0) !== ".") {
                domain = "." + domain;
              }
              cookie.domain = domain;
              break;
            case "max-age":
              cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1e3);
              break;
            case "secure":
              cookie.secure = true;
              break;
            case "httponly":
              cookie.httponly = true;
              break;
            default:
              if (!cookie.name) {
                cookie.name = key;
                cookie.value = value;
              }
          }
        });
        return cookie;
      }
      /**
       * Checks if a cookie object is valid for a specified URL
       *
       * @param {Object} cookie Cookie object
       * @param {String} url URL to check for
       * @returns {Boolean} true if cookie is valid for specifiec URL
       */
      match(cookie, url) {
        let urlparts = urllib.parse(url || "");
        if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
          return false;
        }
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
          return false;
        }
        if (cookie.secure && urlparts.protocol !== "https:") {
          return false;
        }
        return true;
      }
      /**
       * Adds (or updates/removes if needed) a cookie object to the cookie storage
       *
       * @param {Object} cookie Cookie value to be stored
       */
      add(cookie) {
        let i;
        let len;
        if (!cookie || !cookie.name) {
          return false;
        }
        for (i = 0, len = this.cookies.length; i < len; i++) {
          if (this.compare(this.cookies[i], cookie)) {
            if (this.isExpired(cookie)) {
              this.cookies.splice(i, 1);
              return false;
            }
            this.cookies[i] = cookie;
            return true;
          }
        }
        if (!this.isExpired(cookie)) {
          this.cookies.push(cookie);
        }
        return true;
      }
      /**
       * Checks if two cookie objects are the same
       *
       * @param {Object} a Cookie to check against
       * @param {Object} b Cookie to check against
       * @returns {Boolean} True, if the cookies are the same
       */
      compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
      }
      /**
       * Checks if a cookie is expired
       *
       * @param {Object} cookie Cookie object to check against
       * @returns {Boolean} True, if the cookie is expired
       */
      isExpired(cookie) {
        return cookie.expires && cookie.expires < /* @__PURE__ */ new Date() || !cookie.value;
      }
      /**
       * Returns normalized cookie path for an URL path argument
       *
       * @param {String} pathname
       * @returns {String} Normalized path
       */
      getPath(pathname) {
        let path = (pathname || "/").split("/");
        path.pop();
        path = path.join("/").trim();
        if (path.charAt(0) !== "/") {
          path = "/" + path;
        }
        if (path.substr(-1) !== "/") {
          path += "/";
        }
        return path;
      }
    };
    module2.exports = Cookies;
  }
});

// node_modules/nodemailer/package.json
var require_package = __commonJS({
  "node_modules/nodemailer/package.json"(exports2, module2) {
    module2.exports = {
      name: "nodemailer",
      version: "8.0.1",
      description: "Easy as cake e-mail sending from your Node.js applications",
      main: "lib/nodemailer.js",
      scripts: {
        test: "node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js",
        "test:coverage": "c8 node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js",
        format: 'prettier --write "**/*.{js,json,md}"',
        "format:check": 'prettier --check "**/*.{js,json,md}"',
        lint: "eslint .",
        "lint:fix": "eslint . --fix",
        update: "rm -rf node_modules/ package-lock.json && ncu -u && npm install"
      },
      repository: {
        type: "git",
        url: "https://github.com/nodemailer/nodemailer.git"
      },
      keywords: [
        "Nodemailer"
      ],
      author: "Andris Reinman",
      license: "MIT-0",
      bugs: {
        url: "https://github.com/nodemailer/nodemailer/issues"
      },
      homepage: "https://nodemailer.com/",
      devDependencies: {
        "@aws-sdk/client-sesv2": "3.985.0",
        bunyan: "1.8.15",
        c8: "10.1.3",
        eslint: "10.0.0",
        "eslint-config-prettier": "10.1.8",
        globals: "17.3.0",
        libbase64: "1.3.0",
        libmime: "5.3.7",
        libqp: "2.1.1",
        "nodemailer-ntlm-auth": "1.0.4",
        prettier: "3.8.1",
        proxy: "1.0.2",
        "proxy-test-server": "1.0.0",
        "smtp-server": "3.18.1"
      },
      engines: {
        node: ">=6.0.0"
      }
    };
  }
});

// node_modules/nodemailer/lib/errors.js
var require_errors = __commonJS({
  "node_modules/nodemailer/lib/errors.js"(exports2, module2) {
    "use strict";
    var ERROR_CODES = {
      // Connection errors
      ECONNECTION: "Connection closed unexpectedly",
      ETIMEDOUT: "Connection or operation timed out",
      ESOCKET: "Socket-level error",
      EDNS: "DNS resolution failed",
      // TLS/Security errors
      ETLS: "TLS handshake or STARTTLS failed",
      EREQUIRETLS: "REQUIRETLS not supported by server (RFC 8689)",
      // Protocol errors
      EPROTOCOL: "Invalid SMTP server response",
      EENVELOPE: "Invalid mail envelope (sender or recipients)",
      EMESSAGE: "Message delivery error",
      ESTREAM: "Stream processing error",
      // Authentication errors
      EAUTH: "Authentication failed",
      ENOAUTH: "Authentication credentials not provided",
      EOAUTH2: "OAuth2 token generation or refresh error",
      // Resource errors
      EMAXLIMIT: "Pool resource limit reached (max messages per connection)",
      // Transport-specific errors
      ESENDMAIL: "Sendmail command error",
      ESES: "AWS SES transport error",
      // Configuration and access errors
      ECONFIG: "Invalid configuration",
      EPROXY: "Proxy connection error",
      EFILEACCESS: "File access rejected (disableFileAccess is set)",
      EURLACCESS: "URL access rejected (disableUrlAccess is set)",
      EFETCH: "HTTP fetch error"
    };
    module2.exports = Object.keys(ERROR_CODES).reduce(
      (exports3, code) => {
        exports3[code] = code;
        return exports3;
      },
      { ERROR_CODES }
    );
  }
});

// node_modules/nodemailer/lib/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/nodemailer/lib/fetch/index.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    var https = require("https");
    var urllib = require("url");
    var zlib = require("zlib");
    var PassThrough = require("stream").PassThrough;
    var Cookies = require_cookies();
    var packageData = require_package();
    var net = require("net");
    var errors = require_errors();
    var MAX_REDIRECTS = 5;
    module2.exports = function(url, options) {
      return nmfetch(url, options);
    };
    module2.exports.Cookies = Cookies;
    function nmfetch(url, options) {
      options = options || {};
      options.fetchRes = options.fetchRes || new PassThrough();
      options.cookies = options.cookies || new Cookies();
      options.redirects = options.redirects || 0;
      options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
      if (options.cookie) {
        [].concat(options.cookie || []).forEach((cookie) => {
          options.cookies.set(cookie, url);
        });
        options.cookie = false;
      }
      let fetchRes = options.fetchRes;
      let parsed = urllib.parse(url);
      let method = (options.method || "").toString().trim().toUpperCase() || "GET";
      let finished = false;
      let cookies;
      let body;
      let handler = parsed.protocol === "https:" ? https : http;
      let headers = {
        "accept-encoding": "gzip,deflate",
        "user-agent": "nodemailer/" + packageData.version
      };
      Object.keys(options.headers || {}).forEach((key) => {
        headers[key.toLowerCase().trim()] = options.headers[key];
      });
      if (options.userAgent) {
        headers["user-agent"] = options.userAgent;
      }
      if (parsed.auth) {
        headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
      }
      if (cookies = options.cookies.get(url)) {
        headers.cookie = cookies;
      }
      if (options.body) {
        if (options.contentType !== false) {
          headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
        }
        if (typeof options.body.pipe === "function") {
          headers["Transfer-Encoding"] = "chunked";
          body = options.body;
          body.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.code = errors.EFETCH;
            err.sourceUrl = url;
            fetchRes.emit("error", err);
          });
        } else {
          if (options.body instanceof Buffer) {
            body = options.body;
          } else if (typeof options.body === "object") {
            try {
              body = Buffer.from(
                Object.keys(options.body).map((key) => {
                  let value = options.body[key].toString().trim();
                  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
                }).join("&")
              );
            } catch (E) {
              if (finished) {
                return;
              }
              finished = true;
              E.code = errors.EFETCH;
              E.sourceUrl = url;
              fetchRes.emit("error", E);
              return;
            }
          } else {
            body = Buffer.from(options.body.toString().trim());
          }
          headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
          headers["Content-Length"] = body.length;
        }
        method = (options.method || "").toString().trim().toUpperCase() || "POST";
      }
      let req;
      let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === "https:" ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
      };
      if (options.tls) {
        Object.keys(options.tls).forEach((key) => {
          reqOptions[key] = options.tls[key];
        });
      }
      if (parsed.protocol === "https:" && parsed.hostname && parsed.hostname !== reqOptions.host && !net.isIP(parsed.hostname) && !reqOptions.servername) {
        reqOptions.servername = parsed.hostname;
      }
      try {
        req = handler.request(reqOptions);
      } catch (E) {
        finished = true;
        setImmediate(() => {
          E.code = errors.EFETCH;
          E.sourceUrl = url;
          fetchRes.emit("error", E);
        });
        return fetchRes;
      }
      if (options.timeout) {
        req.setTimeout(options.timeout, () => {
          if (finished) {
            return;
          }
          finished = true;
          req.abort();
          let err = new Error("Request Timeout");
          err.code = errors.EFETCH;
          err.sourceUrl = url;
          fetchRes.emit("error", err);
        });
      }
      req.on("error", (err) => {
        if (finished) {
          return;
        }
        finished = true;
        err.code = errors.EFETCH;
        err.sourceUrl = url;
        fetchRes.emit("error", err);
      });
      req.on("response", (res) => {
        let inflate;
        if (finished) {
          return;
        }
        switch (res.headers["content-encoding"]) {
          case "gzip":
          case "deflate":
            inflate = zlib.createUnzip();
            break;
        }
        if (res.headers["set-cookie"]) {
          [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
            options.cookies.set(cookie, url);
          });
        }
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          options.redirects++;
          if (options.redirects > options.maxRedirects) {
            finished = true;
            let err = new Error("Maximum redirect count exceeded");
            err.code = errors.EFETCH;
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            req.abort();
            return;
          }
          options.method = "GET";
          options.body = false;
          return nmfetch(urllib.resolve(url, res.headers.location), options);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options.allowErrorResponse) {
          finished = true;
          let err = new Error("Invalid status code " + res.statusCode);
          err.code = errors.EFETCH;
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
          return;
        }
        res.on("error", (err) => {
          if (finished) {
            return;
          }
          finished = true;
          err.code = errors.EFETCH;
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
        });
        if (inflate) {
          res.pipe(inflate).pipe(fetchRes);
          inflate.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.code = errors.EFETCH;
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            req.abort();
          });
        } else {
          res.pipe(fetchRes);
        }
      });
      setImmediate(() => {
        if (body) {
          try {
            if (typeof body.pipe === "function") {
              return body.pipe(req);
            } else {
              req.write(body);
            }
          } catch (err) {
            finished = true;
            err.code = errors.EFETCH;
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            return;
          }
        }
        req.end();
      });
      return fetchRes;
    }
  }
});

// node_modules/nodemailer/lib/shared/index.js
var require_shared = __commonJS({
  "node_modules/nodemailer/lib/shared/index.js"(exports2, module2) {
    "use strict";
    var urllib = require("url");
    var util = require("util");
    var fs = require("fs");
    var nmfetch = require_fetch();
    var dns = require("dns");
    var net = require("net");
    var os = require("os");
    var DNS_TTL = 5 * 60 * 1e3;
    var CACHE_CLEANUP_INTERVAL = 30 * 1e3;
    var MAX_CACHE_SIZE = 1e3;
    var lastCacheCleanup = 0;
    module2.exports._lastCacheCleanup = () => lastCacheCleanup;
    module2.exports._resetCacheCleanup = () => {
      lastCacheCleanup = 0;
    };
    var networkInterfaces;
    try {
      networkInterfaces = os.networkInterfaces();
    } catch (_err) {
    }
    module2.exports.networkInterfaces = networkInterfaces;
    var isFamilySupported = (family, allowInternal) => {
      let networkInterfaces2 = module2.exports.networkInterfaces;
      if (!networkInterfaces2) {
        return true;
      }
      const familySupported = (
        // crux that replaces Object.values(networkInterfaces) as Object.values is not supported in nodejs v6
        Object.keys(networkInterfaces2).map((key) => networkInterfaces2[key]).reduce((acc, val) => acc.concat(val), []).filter((i) => !i.internal || allowInternal).filter((i) => i.family === "IPv" + family || i.family === family).length > 0
      );
      return familySupported;
    };
    var resolver = (family, hostname, options, callback) => {
      options = options || {};
      const familySupported = isFamilySupported(family, options.allowInternalNetworkInterfaces);
      if (!familySupported) {
        return callback(null, []);
      }
      const resolver2 = dns.Resolver ? new dns.Resolver(options) : dns;
      resolver2["resolve" + family](hostname, (err, addresses) => {
        if (err) {
          switch (err.code) {
            case dns.NODATA:
            case dns.NOTFOUND:
            case dns.NOTIMP:
            case dns.SERVFAIL:
            case dns.CONNREFUSED:
            case dns.REFUSED:
            case "EAI_AGAIN":
              return callback(null, []);
          }
          return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
      });
    };
    var dnsCache = module2.exports.dnsCache = /* @__PURE__ */ new Map();
    var formatDNSValue = (value, extra) => {
      if (!value) {
        return Object.assign({}, extra || {});
      }
      let addresses = value.addresses || [];
      let host = null;
      if (addresses.length === 1) {
        host = addresses[0];
      } else if (addresses.length > 1) {
        host = addresses[Math.floor(Math.random() * addresses.length)];
      }
      return Object.assign(
        {
          servername: value.servername,
          host,
          // Include all addresses for connection fallback support
          _addresses: addresses
        },
        extra || {}
      );
    };
    module2.exports.resolveHostname = (options, callback) => {
      options = options || {};
      if (!options.host && options.servername) {
        options.host = options.servername;
      }
      if (!options.host || net.isIP(options.host)) {
        let value = {
          addresses: [options.host],
          servername: options.servername || false
        };
        return callback(
          null,
          formatDNSValue(value, {
            cached: false
          })
        );
      }
      let cached;
      if (dnsCache.has(options.host)) {
        cached = dnsCache.get(options.host);
        const now = Date.now();
        if (now - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
          lastCacheCleanup = now;
          for (const [host, entry] of dnsCache.entries()) {
            if (entry.expires && entry.expires < now) {
              dnsCache.delete(host);
            }
          }
          if (dnsCache.size > MAX_CACHE_SIZE) {
            const toDelete = Math.floor(MAX_CACHE_SIZE * 0.1);
            const keys = Array.from(dnsCache.keys()).slice(0, toDelete);
            keys.forEach((key) => dnsCache.delete(key));
          }
        }
        if (!cached.expires || cached.expires >= now) {
          return callback(
            null,
            formatDNSValue(cached.value, {
              cached: true
            })
          );
        }
      }
      let ipv4Addresses = [];
      let ipv6Addresses = [];
      let ipv4Error = null;
      let ipv6Error = null;
      resolver(4, options.host, options, (err, addresses) => {
        if (err) {
          ipv4Error = err;
        } else {
          ipv4Addresses = addresses || [];
        }
        resolver(6, options.host, options, (err2, addresses2) => {
          if (err2) {
            ipv6Error = err2;
          } else {
            ipv6Addresses = addresses2 || [];
          }
          let allAddresses = ipv4Addresses.concat(ipv6Addresses);
          if (allAddresses.length) {
            let value = {
              addresses: allAddresses,
              servername: options.servername || options.host
            };
            dnsCache.set(options.host, {
              value,
              expires: Date.now() + (options.dnsTtl || DNS_TTL)
            });
            return callback(
              null,
              formatDNSValue(value, {
                cached: false
              })
            );
          }
          if (ipv4Error && ipv6Error) {
            if (cached) {
              dnsCache.set(options.host, {
                value: cached.value,
                expires: Date.now() + (options.dnsTtl || DNS_TTL)
              });
              return callback(
                null,
                formatDNSValue(cached.value, {
                  cached: true,
                  error: ipv4Error
                })
              );
            }
          }
          try {
            dns.lookup(options.host, { all: true }, (err3, addresses3) => {
              if (err3) {
                if (cached) {
                  dnsCache.set(options.host, {
                    value: cached.value,
                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
                  });
                  return callback(
                    null,
                    formatDNSValue(cached.value, {
                      cached: true,
                      error: err3
                    })
                  );
                }
                return callback(err3);
              }
              let supportedAddresses = addresses3 ? addresses3.filter((addr) => isFamilySupported(addr.family)).map((addr) => addr.address) : [];
              if (addresses3 && addresses3.length && !supportedAddresses.length) {
                console.warn(`Failed to resolve IPv${addresses3[0].family} addresses with current network`);
              }
              if (!supportedAddresses.length && cached) {
                return callback(
                  null,
                  formatDNSValue(cached.value, {
                    cached: true
                  })
                );
              }
              let value = {
                addresses: supportedAddresses.length ? supportedAddresses : [options.host],
                servername: options.servername || options.host
              };
              dnsCache.set(options.host, {
                value,
                expires: Date.now() + (options.dnsTtl || DNS_TTL)
              });
              return callback(
                null,
                formatDNSValue(value, {
                  cached: false
                })
              );
            });
          } catch (lookupErr) {
            if (cached) {
              dnsCache.set(options.host, {
                value: cached.value,
                expires: Date.now() + (options.dnsTtl || DNS_TTL)
              });
              return callback(
                null,
                formatDNSValue(cached.value, {
                  cached: true,
                  error: lookupErr
                })
              );
            }
            return callback(ipv4Error || ipv6Error || lookupErr);
          }
        });
      });
    };
    module2.exports.parseConnectionUrl = (str) => {
      str = str || "";
      let options = {};
      [urllib.parse(str, true)].forEach((url) => {
        let auth;
        switch (url.protocol) {
          case "smtp:":
            options.secure = false;
            break;
          case "smtps:":
            options.secure = true;
            break;
          case "direct:":
            options.direct = true;
            break;
        }
        if (!isNaN(url.port) && Number(url.port)) {
          options.port = Number(url.port);
        }
        if (url.hostname) {
          options.host = url.hostname;
        }
        if (url.auth) {
          auth = url.auth.split(":");
          if (!options.auth) {
            options.auth = {};
          }
          options.auth.user = auth.shift();
          options.auth.pass = auth.join(":");
        }
        Object.keys(url.query || {}).forEach((key) => {
          let obj = options;
          let lKey = key;
          let value = url.query[key];
          if (!isNaN(value)) {
            value = Number(value);
          }
          switch (value) {
            case "true":
              value = true;
              break;
            case "false":
              value = false;
              break;
          }
          if (key.indexOf("tls.") === 0) {
            lKey = key.substr(4);
            if (!options.tls) {
              options.tls = {};
            }
            obj = options.tls;
          } else if (key.indexOf(".") >= 0) {
            return;
          }
          if (!(lKey in obj)) {
            obj[lKey] = value;
          }
        });
      });
      return options;
    };
    module2.exports._logFunc = (logger, level, defaults, data, message, ...args) => {
      let entry = {};
      Object.keys(defaults || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = defaults[key];
        }
      });
      Object.keys(data || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = data[key];
        }
      });
      logger[level](entry, message, ...args);
    };
    module2.exports.getLogger = (options, defaults) => {
      options = options || {};
      let response = {};
      let levels = ["trace", "debug", "info", "warn", "error", "fatal"];
      if (!options.logger) {
        levels.forEach((level) => {
          response[level] = () => false;
        });
        return response;
      }
      let logger = options.logger;
      if (options.logger === true) {
        logger = createDefaultLogger(levels);
      }
      levels.forEach((level) => {
        response[level] = (data, message, ...args) => {
          module2.exports._logFunc(logger, level, defaults, data, message, ...args);
        };
      });
      return response;
    };
    module2.exports.callbackPromise = (resolve, reject) => function() {
      let args = Array.from(arguments);
      let err = args.shift();
      if (err) {
        reject(err);
      } else {
        resolve(...args);
      }
    };
    module2.exports.parseDataURI = (uri) => {
      if (typeof uri !== "string") {
        return null;
      }
      if (!uri.startsWith("data:")) {
        return null;
      }
      const commaPos = uri.indexOf(",");
      if (commaPos === -1) {
        return null;
      }
      const data = uri.substring(commaPos + 1);
      const metaStr = uri.substring("data:".length, commaPos);
      let encoding;
      const metaEntries = metaStr.split(";");
      if (metaEntries.length > 0) {
        const lastEntry = metaEntries[metaEntries.length - 1].toLowerCase().trim();
        if (["base64", "utf8", "utf-8"].includes(lastEntry) && lastEntry.indexOf("=") === -1) {
          encoding = lastEntry;
          metaEntries.pop();
        }
      }
      const contentType = metaEntries.length > 0 ? metaEntries.shift() : "application/octet-stream";
      const params = {};
      for (let i = 0; i < metaEntries.length; i++) {
        const entry = metaEntries[i];
        const sepPos = entry.indexOf("=");
        if (sepPos > 0) {
          const key = entry.substring(0, sepPos).trim();
          const value = entry.substring(sepPos + 1).trim();
          if (key) {
            params[key] = value;
          }
        }
      }
      let bufferData;
      try {
        if (encoding === "base64") {
          bufferData = Buffer.from(data, "base64");
        } else {
          try {
            bufferData = Buffer.from(decodeURIComponent(data));
          } catch (_decodeError) {
            bufferData = Buffer.from(data);
          }
        }
      } catch (_bufferError) {
        bufferData = Buffer.alloc(0);
      }
      return {
        data: bufferData,
        encoding: encoding || null,
        contentType: contentType || "application/octet-stream",
        params
      };
    };
    module2.exports.resolveContent = (data, key, callback) => {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = module2.exports.callbackPromise(resolve, reject);
        });
      }
      let content = data && data[key] && data[key].content || data[key];
      let contentStream;
      let encoding = (typeof data[key] === "object" && data[key].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
      if (!content) {
        return callback(null, content);
      }
      if (typeof content === "object") {
        if (typeof content.pipe === "function") {
          return resolveStream(content, (err, value) => {
            if (err) {
              return callback(err);
            }
            if (data[key].content) {
              data[key].content = value;
            } else {
              data[key] = value;
            }
            callback(null, value);
          });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
          contentStream = nmfetch(content.path || content.href);
          return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
          let parsedDataUri = module2.exports.parseDataURI(content.path || content.href);
          if (!parsedDataUri || !parsedDataUri.data) {
            return callback(null, Buffer.from(0));
          }
          return callback(null, parsedDataUri.data);
        } else if (content.path) {
          return resolveStream(fs.createReadStream(content.path), callback);
        }
      }
      if (typeof data[key].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
      }
      setImmediate(() => callback(null, content));
      return promise;
    };
    module2.exports.assign = function() {
      let args = Array.from(arguments);
      let target = args.shift() || {};
      args.forEach((source) => {
        Object.keys(source || {}).forEach((key) => {
          if (["tls", "auth"].includes(key) && source[key] && typeof source[key] === "object") {
            if (!target[key]) {
              target[key] = {};
            }
            Object.keys(source[key]).forEach((subKey) => {
              target[key][subKey] = source[key][subKey];
            });
          } else {
            target[key] = source[key];
          }
        });
      });
      return target;
    };
    module2.exports.encodeXText = (str) => {
      if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
      }
      let buf = Buffer.from(str);
      let result = "";
      for (let i = 0, len = buf.length; i < len; i++) {
        let c = buf[i];
        if (c < 33 || c > 126 || c === 43 || c === 61) {
          result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
        } else {
          result += String.fromCharCode(c);
        }
      }
      return result;
    };
    function resolveStream(stream, callback) {
      let responded = false;
      let chunks = [];
      let chunklen = 0;
      stream.on("error", (err) => {
        if (responded) {
          return;
        }
        responded = true;
        callback(err);
      });
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      stream.on("end", () => {
        if (responded) {
          return;
        }
        responded = true;
        let value;
        try {
          value = Buffer.concat(chunks, chunklen);
        } catch (E) {
          return callback(E);
        }
        callback(null, value);
      });
    }
    function createDefaultLogger(levels) {
      let levelMaxLen = 0;
      let levelNames = /* @__PURE__ */ new Map();
      levels.forEach((level) => {
        if (level.length > levelMaxLen) {
          levelMaxLen = level.length;
        }
      });
      levels.forEach((level) => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
          levelName += " ".repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
      });
      let print = (level, entry, message, ...args) => {
        let prefix = "";
        if (entry) {
          if (entry.tnx === "server") {
            prefix = "S: ";
          } else if (entry.tnx === "client") {
            prefix = "C: ";
          }
          if (entry.sid) {
            prefix = "[" + entry.sid + "] " + prefix;
          }
          if (entry.cid) {
            prefix = "[#" + entry.cid + "] " + prefix;
          }
        }
        message = util.format(message, ...args);
        message.split(/\r?\n/).forEach((line) => {
          console.log("[%s] %s %s", (/* @__PURE__ */ new Date()).toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
        });
      };
      let logger = {};
      levels.forEach((level) => {
        logger[level] = print.bind(null, level);
      });
      return logger;
    }
  }
});

// node_modules/nodemailer/lib/mime-funcs/mime-types.js
var require_mime_types = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/mime-types.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var defaultMimeType = "application/octet-stream";
    var defaultExtension = "bin";
    var mimeTypes = /* @__PURE__ */ new Map([
      ["application/acad", "dwg"],
      ["application/applixware", "aw"],
      ["application/arj", "arj"],
      ["application/atom+xml", "xml"],
      ["application/atomcat+xml", "atomcat"],
      ["application/atomsvc+xml", "atomsvc"],
      ["application/base64", ["mm", "mme"]],
      ["application/binhex", "hqx"],
      ["application/binhex4", "hqx"],
      ["application/book", ["book", "boo"]],
      ["application/ccxml+xml,", "ccxml"],
      ["application/cdf", "cdf"],
      ["application/cdmi-capability", "cdmia"],
      ["application/cdmi-container", "cdmic"],
      ["application/cdmi-domain", "cdmid"],
      ["application/cdmi-object", "cdmio"],
      ["application/cdmi-queue", "cdmiq"],
      ["application/clariscad", "ccad"],
      ["application/commonground", "dp"],
      ["application/cu-seeme", "cu"],
      ["application/davmount+xml", "davmount"],
      ["application/drafting", "drw"],
      ["application/dsptype", "tsp"],
      ["application/dssc+der", "dssc"],
      ["application/dssc+xml", "xdssc"],
      ["application/dxf", "dxf"],
      ["application/ecmascript", ["js", "es"]],
      ["application/emma+xml", "emma"],
      ["application/envoy", "evy"],
      ["application/epub+zip", "epub"],
      ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/exi", "exi"],
      ["application/font-tdpfr", "pfr"],
      ["application/fractals", "fif"],
      ["application/freeloader", "frl"],
      ["application/futuresplash", "spl"],
      ["application/geo+json", "geojson"],
      ["application/gnutar", "tgz"],
      ["application/groupwise", "vew"],
      ["application/hlp", "hlp"],
      ["application/hta", "hta"],
      ["application/hyperstudio", "stk"],
      ["application/i-deas", "unv"],
      ["application/iges", ["iges", "igs"]],
      ["application/inf", "inf"],
      ["application/internet-property-stream", "acx"],
      ["application/ipfix", "ipfix"],
      ["application/java", "class"],
      ["application/java-archive", "jar"],
      ["application/java-byte-code", "class"],
      ["application/java-serialized-object", "ser"],
      ["application/java-vm", "class"],
      ["application/javascript", "js"],
      ["application/json", "json"],
      ["application/lha", "lha"],
      ["application/lzx", "lzx"],
      ["application/mac-binary", "bin"],
      ["application/mac-binhex", "hqx"],
      ["application/mac-binhex40", "hqx"],
      ["application/mac-compactpro", "cpt"],
      ["application/macbinary", "bin"],
      ["application/mads+xml", "mads"],
      ["application/marc", "mrc"],
      ["application/marcxml+xml", "mrcx"],
      ["application/mathematica", "ma"],
      ["application/mathml+xml", "mathml"],
      ["application/mbedlet", "mbd"],
      ["application/mbox", "mbox"],
      ["application/mcad", "mcd"],
      ["application/mediaservercontrol+xml", "mscml"],
      ["application/metalink4+xml", "meta4"],
      ["application/mets+xml", "mets"],
      ["application/mime", "aps"],
      ["application/mods+xml", "mods"],
      ["application/mp21", "m21"],
      ["application/mp4", "mp4"],
      ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
      ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
      ["application/mswrite", "wri"],
      ["application/mxf", "mxf"],
      ["application/netmc", "mcp"],
      ["application/octet-stream", ["*"]],
      ["application/oda", "oda"],
      ["application/oebps-package+xml", "opf"],
      ["application/ogg", "ogx"],
      ["application/olescript", "axs"],
      ["application/onenote", "onetoc"],
      ["application/patch-ops-error+xml", "xer"],
      ["application/pdf", "pdf"],
      ["application/pgp-encrypted", "asc"],
      ["application/pgp-signature", "pgp"],
      ["application/pics-rules", "prf"],
      ["application/pkcs-12", "p12"],
      ["application/pkcs-crl", "crl"],
      ["application/pkcs10", "p10"],
      ["application/pkcs7-mime", ["p7c", "p7m"]],
      ["application/pkcs7-signature", "p7s"],
      ["application/pkcs8", "p8"],
      ["application/pkix-attr-cert", "ac"],
      ["application/pkix-cert", ["cer", "crt"]],
      ["application/pkix-crl", "crl"],
      ["application/pkix-pkipath", "pkipath"],
      ["application/pkixcmp", "pki"],
      ["application/plain", "text"],
      ["application/pls+xml", "pls"],
      ["application/postscript", ["ps", "ai", "eps"]],
      ["application/powerpoint", "ppt"],
      ["application/pro_eng", ["part", "prt"]],
      ["application/prs.cww", "cww"],
      ["application/pskc+xml", "pskcxml"],
      ["application/rdf+xml", "rdf"],
      ["application/reginfo+xml", "rif"],
      ["application/relax-ng-compact-syntax", "rnc"],
      ["application/resource-lists+xml", "rl"],
      ["application/resource-lists-diff+xml", "rld"],
      ["application/ringing-tones", "rng"],
      ["application/rls-services+xml", "rs"],
      ["application/rsd+xml", "rsd"],
      ["application/rss+xml", "xml"],
      ["application/rtf", ["rtf", "rtx"]],
      ["application/sbml+xml", "sbml"],
      ["application/scvp-cv-request", "scq"],
      ["application/scvp-cv-response", "scs"],
      ["application/scvp-vp-request", "spq"],
      ["application/scvp-vp-response", "spp"],
      ["application/sdp", "sdp"],
      ["application/sea", "sea"],
      ["application/set", "set"],
      ["application/set-payment-initiation", "setpay"],
      ["application/set-registration-initiation", "setreg"],
      ["application/shf+xml", "shf"],
      ["application/sla", "stl"],
      ["application/smil", ["smi", "smil"]],
      ["application/smil+xml", "smi"],
      ["application/solids", "sol"],
      ["application/sounder", "sdr"],
      ["application/sparql-query", "rq"],
      ["application/sparql-results+xml", "srx"],
      ["application/srgs", "gram"],
      ["application/srgs+xml", "grxml"],
      ["application/sru+xml", "sru"],
      ["application/ssml+xml", "ssml"],
      ["application/step", ["step", "stp"]],
      ["application/streamingmedia", "ssm"],
      ["application/tei+xml", "tei"],
      ["application/thraud+xml", "tfi"],
      ["application/timestamped-data", "tsd"],
      ["application/toolbook", "tbk"],
      ["application/vda", "vda"],
      ["application/vnd.3gpp.pic-bw-large", "plb"],
      ["application/vnd.3gpp.pic-bw-small", "psb"],
      ["application/vnd.3gpp.pic-bw-var", "pvb"],
      ["application/vnd.3gpp2.tcap", "tcap"],
      ["application/vnd.3m.post-it-notes", "pwn"],
      ["application/vnd.accpac.simply.aso", "aso"],
      ["application/vnd.accpac.simply.imp", "imp"],
      ["application/vnd.acucobol", "acu"],
      ["application/vnd.acucorp", "atc"],
      ["application/vnd.adobe.air-application-installer-package+zip", "air"],
      ["application/vnd.adobe.fxp", "fxp"],
      ["application/vnd.adobe.xdp+xml", "xdp"],
      ["application/vnd.adobe.xfdf", "xfdf"],
      ["application/vnd.ahead.space", "ahead"],
      ["application/vnd.airzip.filesecure.azf", "azf"],
      ["application/vnd.airzip.filesecure.azs", "azs"],
      ["application/vnd.amazon.ebook", "azw"],
      ["application/vnd.americandynamics.acc", "acc"],
      ["application/vnd.amiga.ami", "ami"],
      ["application/vnd.android.package-archive", "apk"],
      ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
      ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
      ["application/vnd.antix.game-component", "atx"],
      ["application/vnd.apple.installer+xml", "mpkg"],
      ["application/vnd.apple.mpegurl", "m3u8"],
      ["application/vnd.aristanetworks.swi", "swi"],
      ["application/vnd.audiograph", "aep"],
      ["application/vnd.blueice.multipass", "mpm"],
      ["application/vnd.bmi", "bmi"],
      ["application/vnd.businessobjects", "rep"],
      ["application/vnd.chemdraw+xml", "cdxml"],
      ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
      ["application/vnd.cinderella", "cdy"],
      ["application/vnd.claymore", "cla"],
      ["application/vnd.cloanto.rp9", "rp9"],
      ["application/vnd.clonk.c4group", "c4g"],
      ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
      ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
      ["application/vnd.commonspace", "csp"],
      ["application/vnd.contact.cmsg", "cdbcmsg"],
      ["application/vnd.cosmocaller", "cmc"],
      ["application/vnd.crick.clicker", "clkx"],
      ["application/vnd.crick.clicker.keyboard", "clkk"],
      ["application/vnd.crick.clicker.palette", "clkp"],
      ["application/vnd.crick.clicker.template", "clkt"],
      ["application/vnd.crick.clicker.wordbank", "clkw"],
      ["application/vnd.criticaltools.wbs+xml", "wbs"],
      ["application/vnd.ctc-posml", "pml"],
      ["application/vnd.cups-ppd", "ppd"],
      ["application/vnd.curl.car", "car"],
      ["application/vnd.curl.pcurl", "pcurl"],
      ["application/vnd.data-vision.rdz", "rdz"],
      ["application/vnd.denovo.fcselayout-link", "fe_launch"],
      ["application/vnd.dna", "dna"],
      ["application/vnd.dolby.mlp", "mlp"],
      ["application/vnd.dpgraph", "dpg"],
      ["application/vnd.dreamfactory", "dfac"],
      ["application/vnd.dvb.ait", "ait"],
      ["application/vnd.dvb.service", "svc"],
      ["application/vnd.dynageo", "geo"],
      ["application/vnd.ecowin.chart", "mag"],
      ["application/vnd.enliven", "nml"],
      ["application/vnd.epson.esf", "esf"],
      ["application/vnd.epson.msf", "msf"],
      ["application/vnd.epson.quickanime", "qam"],
      ["application/vnd.epson.salt", "slt"],
      ["application/vnd.epson.ssf", "ssf"],
      ["application/vnd.eszigno3+xml", "es3"],
      ["application/vnd.ezpix-album", "ez2"],
      ["application/vnd.ezpix-package", "ez3"],
      ["application/vnd.fdf", "fdf"],
      ["application/vnd.fdsn.seed", "seed"],
      ["application/vnd.flographit", "gph"],
      ["application/vnd.fluxtime.clip", "ftc"],
      ["application/vnd.framemaker", "fm"],
      ["application/vnd.frogans.fnc", "fnc"],
      ["application/vnd.frogans.ltf", "ltf"],
      ["application/vnd.fsc.weblaunch", "fsc"],
      ["application/vnd.fujitsu.oasys", "oas"],
      ["application/vnd.fujitsu.oasys2", "oa2"],
      ["application/vnd.fujitsu.oasys3", "oa3"],
      ["application/vnd.fujitsu.oasysgp", "fg5"],
      ["application/vnd.fujitsu.oasysprs", "bh2"],
      ["application/vnd.fujixerox.ddd", "ddd"],
      ["application/vnd.fujixerox.docuworks", "xdw"],
      ["application/vnd.fujixerox.docuworks.binder", "xbd"],
      ["application/vnd.fuzzysheet", "fzs"],
      ["application/vnd.genomatix.tuxedo", "txd"],
      ["application/vnd.geogebra.file", "ggb"],
      ["application/vnd.geogebra.tool", "ggt"],
      ["application/vnd.geometry-explorer", "gex"],
      ["application/vnd.geonext", "gxt"],
      ["application/vnd.geoplan", "g2w"],
      ["application/vnd.geospace", "g3w"],
      ["application/vnd.gmx", "gmx"],
      ["application/vnd.google-earth.kml+xml", "kml"],
      ["application/vnd.google-earth.kmz", "kmz"],
      ["application/vnd.grafeq", "gqf"],
      ["application/vnd.groove-account", "gac"],
      ["application/vnd.groove-help", "ghf"],
      ["application/vnd.groove-identity-message", "gim"],
      ["application/vnd.groove-injector", "grv"],
      ["application/vnd.groove-tool-message", "gtm"],
      ["application/vnd.groove-tool-template", "tpl"],
      ["application/vnd.groove-vcard", "vcg"],
      ["application/vnd.hal+xml", "hal"],
      ["application/vnd.handheld-entertainment+xml", "zmm"],
      ["application/vnd.hbci", "hbci"],
      ["application/vnd.hhe.lesson-player", "les"],
      ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
      ["application/vnd.hp-hpid", "hpid"],
      ["application/vnd.hp-hps", "hps"],
      ["application/vnd.hp-jlyt", "jlt"],
      ["application/vnd.hp-pcl", "pcl"],
      ["application/vnd.hp-pclxl", "pclxl"],
      ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
      ["application/vnd.hzn-3d-crossword", "x3d"],
      ["application/vnd.ibm.minipay", "mpy"],
      ["application/vnd.ibm.modcap", "afp"],
      ["application/vnd.ibm.rights-management", "irm"],
      ["application/vnd.ibm.secure-container", "sc"],
      ["application/vnd.iccprofile", "icc"],
      ["application/vnd.igloader", "igl"],
      ["application/vnd.immervision-ivp", "ivp"],
      ["application/vnd.immervision-ivu", "ivu"],
      ["application/vnd.insors.igm", "igm"],
      ["application/vnd.intercon.formnet", "xpw"],
      ["application/vnd.intergeo", "i2g"],
      ["application/vnd.intu.qbo", "qbo"],
      ["application/vnd.intu.qfx", "qfx"],
      ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
      ["application/vnd.irepository.package+xml", "irp"],
      ["application/vnd.is-xpr", "xpr"],
      ["application/vnd.isac.fcs", "fcs"],
      ["application/vnd.jam", "jam"],
      ["application/vnd.jcp.javame.midlet-rms", "rms"],
      ["application/vnd.jisp", "jisp"],
      ["application/vnd.joost.joda-archive", "joda"],
      ["application/vnd.kahootz", "ktz"],
      ["application/vnd.kde.karbon", "karbon"],
      ["application/vnd.kde.kchart", "chrt"],
      ["application/vnd.kde.kformula", "kfo"],
      ["application/vnd.kde.kivio", "flw"],
      ["application/vnd.kde.kontour", "kon"],
      ["application/vnd.kde.kpresenter", "kpr"],
      ["application/vnd.kde.kspread", "ksp"],
      ["application/vnd.kde.kword", "kwd"],
      ["application/vnd.kenameaapp", "htke"],
      ["application/vnd.kidspiration", "kia"],
      ["application/vnd.kinar", "kne"],
      ["application/vnd.koan", "skp"],
      ["application/vnd.kodak-descriptor", "sse"],
      ["application/vnd.las.las+xml", "lasxml"],
      ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
      ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
      ["application/vnd.lotus-1-2-3", "123"],
      ["application/vnd.lotus-approach", "apr"],
      ["application/vnd.lotus-freelance", "pre"],
      ["application/vnd.lotus-notes", "nsf"],
      ["application/vnd.lotus-organizer", "org"],
      ["application/vnd.lotus-screencam", "scm"],
      ["application/vnd.lotus-wordpro", "lwp"],
      ["application/vnd.macports.portpkg", "portpkg"],
      ["application/vnd.mcd", "mcd"],
      ["application/vnd.medcalcdata", "mc1"],
      ["application/vnd.mediastation.cdkey", "cdkey"],
      ["application/vnd.mfer", "mwf"],
      ["application/vnd.mfmp", "mfm"],
      ["application/vnd.micrografx.flo", "flo"],
      ["application/vnd.micrografx.igx", "igx"],
      ["application/vnd.mif", "mif"],
      ["application/vnd.mobius.daf", "daf"],
      ["application/vnd.mobius.dis", "dis"],
      ["application/vnd.mobius.mbk", "mbk"],
      ["application/vnd.mobius.mqy", "mqy"],
      ["application/vnd.mobius.msl", "msl"],
      ["application/vnd.mobius.plc", "plc"],
      ["application/vnd.mobius.txf", "txf"],
      ["application/vnd.mophun.application", "mpn"],
      ["application/vnd.mophun.certificate", "mpc"],
      ["application/vnd.mozilla.xul+xml", "xul"],
      ["application/vnd.ms-artgalry", "cil"],
      ["application/vnd.ms-cab-compressed", "cab"],
      ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
      ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
      ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
      ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
      ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
      ["application/vnd.ms-fontobject", "eot"],
      ["application/vnd.ms-htmlhelp", "chm"],
      ["application/vnd.ms-ims", "ims"],
      ["application/vnd.ms-lrm", "lrm"],
      ["application/vnd.ms-officetheme", "thmx"],
      ["application/vnd.ms-outlook", "msg"],
      ["application/vnd.ms-pki.certstore", "sst"],
      ["application/vnd.ms-pki.pko", "pko"],
      ["application/vnd.ms-pki.seccat", "cat"],
      ["application/vnd.ms-pki.stl", "stl"],
      ["application/vnd.ms-pkicertstore", "sst"],
      ["application/vnd.ms-pkiseccat", "cat"],
      ["application/vnd.ms-pkistl", "stl"],
      ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
      ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
      ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
      ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
      ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
      ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
      ["application/vnd.ms-project", "mpp"],
      ["application/vnd.ms-word.document.macroenabled.12", "docm"],
      ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
      ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
      ["application/vnd.ms-wpl", "wpl"],
      ["application/vnd.ms-xpsdocument", "xps"],
      ["application/vnd.mseq", "mseq"],
      ["application/vnd.musician", "mus"],
      ["application/vnd.muvee.style", "msty"],
      ["application/vnd.neurolanguage.nlu", "nlu"],
      ["application/vnd.noblenet-directory", "nnd"],
      ["application/vnd.noblenet-sealer", "nns"],
      ["application/vnd.noblenet-web", "nnw"],
      ["application/vnd.nokia.configuration-message", "ncm"],
      ["application/vnd.nokia.n-gage.data", "ngdat"],
      ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
      ["application/vnd.nokia.radio-preset", "rpst"],
      ["application/vnd.nokia.radio-presets", "rpss"],
      ["application/vnd.nokia.ringing-tone", "rng"],
      ["application/vnd.novadigm.edm", "edm"],
      ["application/vnd.novadigm.edx", "edx"],
      ["application/vnd.novadigm.ext", "ext"],
      ["application/vnd.oasis.opendocument.chart", "odc"],
      ["application/vnd.oasis.opendocument.chart-template", "otc"],
      ["application/vnd.oasis.opendocument.database", "odb"],
      ["application/vnd.oasis.opendocument.formula", "odf"],
      ["application/vnd.oasis.opendocument.formula-template", "odft"],
      ["application/vnd.oasis.opendocument.graphics", "odg"],
      ["application/vnd.oasis.opendocument.graphics-template", "otg"],
      ["application/vnd.oasis.opendocument.image", "odi"],
      ["application/vnd.oasis.opendocument.image-template", "oti"],
      ["application/vnd.oasis.opendocument.presentation", "odp"],
      ["application/vnd.oasis.opendocument.presentation-template", "otp"],
      ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
      ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
      ["application/vnd.oasis.opendocument.text", "odt"],
      ["application/vnd.oasis.opendocument.text-master", "odm"],
      ["application/vnd.oasis.opendocument.text-template", "ott"],
      ["application/vnd.oasis.opendocument.text-web", "oth"],
      ["application/vnd.olpc-sugar", "xo"],
      ["application/vnd.oma.dd2+xml", "dd2"],
      ["application/vnd.openofficeorg.extension", "oxt"],
      ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
      ["application/vnd.osgeo.mapguide.package", "mgp"],
      ["application/vnd.osgi.dp", "dp"],
      ["application/vnd.palm", "pdb"],
      ["application/vnd.pawaafile", "paw"],
      ["application/vnd.pg.format", "str"],
      ["application/vnd.pg.osasli", "ei6"],
      ["application/vnd.picsel", "efif"],
      ["application/vnd.pmi.widget", "wg"],
      ["application/vnd.pocketlearn", "plf"],
      ["application/vnd.powerbuilder6", "pbd"],
      ["application/vnd.previewsystems.box", "box"],
      ["application/vnd.proteus.magazine", "mgz"],
      ["application/vnd.publishare-delta-tree", "qps"],
      ["application/vnd.pvi.ptid1", "ptid"],
      ["application/vnd.quark.quarkxpress", "qxd"],
      ["application/vnd.realvnc.bed", "bed"],
      ["application/vnd.recordare.musicxml", "mxl"],
      ["application/vnd.recordare.musicxml+xml", "musicxml"],
      ["application/vnd.rig.cryptonote", "cryptonote"],
      ["application/vnd.rim.cod", "cod"],
      ["application/vnd.rn-realmedia", "rm"],
      ["application/vnd.rn-realplayer", "rnx"],
      ["application/vnd.route66.link66+xml", "link66"],
      ["application/vnd.sailingtracker.track", "st"],
      ["application/vnd.seemail", "see"],
      ["application/vnd.sema", "sema"],
      ["application/vnd.semd", "semd"],
      ["application/vnd.semf", "semf"],
      ["application/vnd.shana.informed.formdata", "ifm"],
      ["application/vnd.shana.informed.formtemplate", "itp"],
      ["application/vnd.shana.informed.interchange", "iif"],
      ["application/vnd.shana.informed.package", "ipk"],
      ["application/vnd.simtech-mindmapper", "twd"],
      ["application/vnd.smaf", "mmf"],
      ["application/vnd.smart.teacher", "teacher"],
      ["application/vnd.solent.sdkm+xml", "sdkm"],
      ["application/vnd.spotfire.dxp", "dxp"],
      ["application/vnd.spotfire.sfs", "sfs"],
      ["application/vnd.stardivision.calc", "sdc"],
      ["application/vnd.stardivision.draw", "sda"],
      ["application/vnd.stardivision.impress", "sdd"],
      ["application/vnd.stardivision.math", "smf"],
      ["application/vnd.stardivision.writer", "sdw"],
      ["application/vnd.stardivision.writer-global", "sgl"],
      ["application/vnd.stepmania.stepchart", "sm"],
      ["application/vnd.sun.xml.calc", "sxc"],
      ["application/vnd.sun.xml.calc.template", "stc"],
      ["application/vnd.sun.xml.draw", "sxd"],
      ["application/vnd.sun.xml.draw.template", "std"],
      ["application/vnd.sun.xml.impress", "sxi"],
      ["application/vnd.sun.xml.impress.template", "sti"],
      ["application/vnd.sun.xml.math", "sxm"],
      ["application/vnd.sun.xml.writer", "sxw"],
      ["application/vnd.sun.xml.writer.global", "sxg"],
      ["application/vnd.sun.xml.writer.template", "stw"],
      ["application/vnd.sus-calendar", "sus"],
      ["application/vnd.svd", "svd"],
      ["application/vnd.symbian.install", "sis"],
      ["application/vnd.syncml+xml", "xsm"],
      ["application/vnd.syncml.dm+wbxml", "bdm"],
      ["application/vnd.syncml.dm+xml", "xdm"],
      ["application/vnd.tao.intent-module-archive", "tao"],
      ["application/vnd.tmobile-livetv", "tmo"],
      ["application/vnd.trid.tpt", "tpt"],
      ["application/vnd.triscape.mxs", "mxs"],
      ["application/vnd.trueapp", "tra"],
      ["application/vnd.ufdl", "ufd"],
      ["application/vnd.uiq.theme", "utz"],
      ["application/vnd.umajin", "umj"],
      ["application/vnd.unity", "unityweb"],
      ["application/vnd.uoml+xml", "uoml"],
      ["application/vnd.vcx", "vcx"],
      ["application/vnd.visio", "vsd"],
      ["application/vnd.visionary", "vis"],
      ["application/vnd.vsf", "vsf"],
      ["application/vnd.wap.wbxml", "wbxml"],
      ["application/vnd.wap.wmlc", "wmlc"],
      ["application/vnd.wap.wmlscriptc", "wmlsc"],
      ["application/vnd.webturbo", "wtb"],
      ["application/vnd.wolfram.player", "nbp"],
      ["application/vnd.wordperfect", "wpd"],
      ["application/vnd.wqd", "wqd"],
      ["application/vnd.wt.stf", "stf"],
      ["application/vnd.xara", ["web", "xar"]],
      ["application/vnd.xfdl", "xfdl"],
      ["application/vnd.yamaha.hv-dic", "hvd"],
      ["application/vnd.yamaha.hv-script", "hvs"],
      ["application/vnd.yamaha.hv-voice", "hvp"],
      ["application/vnd.yamaha.openscoreformat", "osf"],
      ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
      ["application/vnd.yamaha.smaf-audio", "saf"],
      ["application/vnd.yamaha.smaf-phrase", "spf"],
      ["application/vnd.yellowriver-custom-menu", "cmp"],
      ["application/vnd.zul", "zir"],
      ["application/vnd.zzazz.deck+xml", "zaz"],
      ["application/vocaltec-media-desc", "vmd"],
      ["application/vocaltec-media-file", "vmf"],
      ["application/voicexml+xml", "vxml"],
      ["application/widget", "wgt"],
      ["application/winhlp", "hlp"],
      ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
      ["application/wordperfect6.0", ["w60", "wp5"]],
      ["application/wordperfect6.1", "w61"],
      ["application/wsdl+xml", "wsdl"],
      ["application/wspolicy+xml", "wspolicy"],
      ["application/x-123", "wk1"],
      ["application/x-7z-compressed", "7z"],
      ["application/x-abiword", "abw"],
      ["application/x-ace-compressed", "ace"],
      ["application/x-aim", "aim"],
      ["application/x-authorware-bin", "aab"],
      ["application/x-authorware-map", "aam"],
      ["application/x-authorware-seg", "aas"],
      ["application/x-bcpio", "bcpio"],
      ["application/x-binary", "bin"],
      ["application/x-binhex40", "hqx"],
      ["application/x-bittorrent", "torrent"],
      ["application/x-bsh", ["bsh", "sh", "shar"]],
      ["application/x-bytecode.elisp", "elc"],
      ["application/x-bytecode.python", "pyc"],
      ["application/x-bzip", "bz"],
      ["application/x-bzip2", ["boz", "bz2"]],
      ["application/x-cdf", "cdf"],
      ["application/x-cdlink", "vcd"],
      ["application/x-chat", ["cha", "chat"]],
      ["application/x-chess-pgn", "pgn"],
      ["application/x-cmu-raster", "ras"],
      ["application/x-cocoa", "cco"],
      ["application/x-compactpro", "cpt"],
      ["application/x-compress", "z"],
      ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
      ["application/x-conference", "nsc"],
      ["application/x-cpio", "cpio"],
      ["application/x-cpt", "cpt"],
      ["application/x-csh", "csh"],
      ["application/x-debian-package", "deb"],
      ["application/x-deepv", "deepv"],
      ["application/x-director", ["dir", "dcr", "dxr"]],
      ["application/x-doom", "wad"],
      ["application/x-dtbncx+xml", "ncx"],
      ["application/x-dtbook+xml", "dtb"],
      ["application/x-dtbresource+xml", "res"],
      ["application/x-dvi", "dvi"],
      ["application/x-elc", "elc"],
      ["application/x-envoy", ["env", "evy"]],
      ["application/x-esrehber", "es"],
      ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/x-font-bdf", "bdf"],
      ["application/x-font-ghostscript", "gsf"],
      ["application/x-font-linux-psf", "psf"],
      ["application/x-font-otf", "otf"],
      ["application/x-font-pcf", "pcf"],
      ["application/x-font-snf", "snf"],
      ["application/x-font-ttf", "ttf"],
      ["application/x-font-type1", "pfa"],
      ["application/x-font-woff", "woff"],
      ["application/x-frame", "mif"],
      ["application/x-freelance", "pre"],
      ["application/x-futuresplash", "spl"],
      ["application/x-gnumeric", "gnumeric"],
      ["application/x-gsp", "gsp"],
      ["application/x-gss", "gss"],
      ["application/x-gtar", "gtar"],
      ["application/x-gzip", ["gz", "gzip"]],
      ["application/x-hdf", "hdf"],
      ["application/x-helpfile", ["help", "hlp"]],
      ["application/x-httpd-imap", "imap"],
      ["application/x-ima", "ima"],
      ["application/x-internet-signup", ["ins", "isp"]],
      ["application/x-internett-signup", "ins"],
      ["application/x-inventor", "iv"],
      ["application/x-ip2", "ip"],
      ["application/x-iphone", "iii"],
      ["application/x-java-class", "class"],
      ["application/x-java-commerce", "jcm"],
      ["application/x-java-jnlp-file", "jnlp"],
      ["application/x-javascript", "js"],
      ["application/x-koan", ["skd", "skm", "skp", "skt"]],
      ["application/x-ksh", "ksh"],
      ["application/x-latex", ["latex", "ltx"]],
      ["application/x-lha", "lha"],
      ["application/x-lisp", "lsp"],
      ["application/x-livescreen", "ivy"],
      ["application/x-lotus", "wq1"],
      ["application/x-lotusscreencam", "scm"],
      ["application/x-lzh", "lzh"],
      ["application/x-lzx", "lzx"],
      ["application/x-mac-binhex40", "hqx"],
      ["application/x-macbinary", "bin"],
      ["application/x-magic-cap-package-1.0", "mc$"],
      ["application/x-mathcad", "mcd"],
      ["application/x-meme", "mm"],
      ["application/x-midi", ["mid", "midi"]],
      ["application/x-mif", "mif"],
      ["application/x-mix-transfer", "nix"],
      ["application/x-mobipocket-ebook", "prc"],
      ["application/x-mplayer2", "asx"],
      ["application/x-ms-application", "application"],
      ["application/x-ms-wmd", "wmd"],
      ["application/x-ms-wmz", "wmz"],
      ["application/x-ms-xbap", "xbap"],
      ["application/x-msaccess", "mdb"],
      ["application/x-msbinder", "obd"],
      ["application/x-mscardfile", "crd"],
      ["application/x-msclip", "clp"],
      ["application/x-msdownload", ["exe", "dll"]],
      ["application/x-msexcel", ["xls", "xla", "xlw"]],
      ["application/x-msmediaview", ["mvb", "m13", "m14"]],
      ["application/x-msmetafile", "wmf"],
      ["application/x-msmoney", "mny"],
      ["application/x-mspowerpoint", "ppt"],
      ["application/x-mspublisher", "pub"],
      ["application/x-msschedule", "scd"],
      ["application/x-msterminal", "trm"],
      ["application/x-mswrite", "wri"],
      ["application/x-navi-animation", "ani"],
      ["application/x-navidoc", "nvd"],
      ["application/x-navimap", "map"],
      ["application/x-navistyle", "stl"],
      ["application/x-netcdf", ["cdf", "nc"]],
      ["application/x-newton-compatible-pkg", "pkg"],
      ["application/x-nokia-9000-communicator-add-on-software", "aos"],
      ["application/x-omc", "omc"],
      ["application/x-omcdatamaker", "omcd"],
      ["application/x-omcregerator", "omcr"],
      ["application/x-pagemaker", ["pm4", "pm5"]],
      ["application/x-pcl", "pcl"],
      ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
      ["application/x-pixclscript", "plx"],
      ["application/x-pkcs10", "p10"],
      ["application/x-pkcs12", ["p12", "pfx"]],
      ["application/x-pkcs7-certificates", ["p7b", "spc"]],
      ["application/x-pkcs7-certreqresp", "p7r"],
      ["application/x-pkcs7-mime", ["p7m", "p7c"]],
      ["application/x-pkcs7-signature", ["p7s", "p7a"]],
      ["application/x-pointplus", "css"],
      ["application/x-portable-anymap", "pnm"],
      ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
      ["application/x-qpro", "wb1"],
      ["application/x-rar-compressed", "rar"],
      ["application/x-rtf", "rtf"],
      ["application/x-sdp", "sdp"],
      ["application/x-sea", "sea"],
      ["application/x-seelogo", "sl"],
      ["application/x-sh", "sh"],
      ["application/x-shar", ["shar", "sh"]],
      ["application/x-shockwave-flash", "swf"],
      ["application/x-silverlight-app", "xap"],
      ["application/x-sit", "sit"],
      ["application/x-sprite", ["spr", "sprite"]],
      ["application/x-stuffit", "sit"],
      ["application/x-stuffitx", "sitx"],
      ["application/x-sv4cpio", "sv4cpio"],
      ["application/x-sv4crc", "sv4crc"],
      ["application/x-tar", "tar"],
      ["application/x-tbook", ["sbk", "tbk"]],
      ["application/x-tcl", "tcl"],
      ["application/x-tex", "tex"],
      ["application/x-tex-tfm", "tfm"],
      ["application/x-texinfo", ["texi", "texinfo"]],
      ["application/x-troff", ["roff", "t", "tr"]],
      ["application/x-troff-man", "man"],
      ["application/x-troff-me", "me"],
      ["application/x-troff-ms", "ms"],
      ["application/x-troff-msvideo", "avi"],
      ["application/x-ustar", "ustar"],
      ["application/x-visio", ["vsd", "vst", "vsw"]],
      ["application/x-vnd.audioexplosion.mzz", "mzz"],
      ["application/x-vnd.ls-xpix", "xpix"],
      ["application/x-vrml", "vrml"],
      ["application/x-wais-source", ["src", "wsrc"]],
      ["application/x-winhelp", "hlp"],
      ["application/x-wintalk", "wtk"],
      ["application/x-world", ["wrl", "svr"]],
      ["application/x-wpwin", "wpd"],
      ["application/x-wri", "wri"],
      ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
      ["application/x-x509-user-cert", "crt"],
      ["application/x-xfig", "fig"],
      ["application/x-xpinstall", "xpi"],
      ["application/x-zip-compressed", "zip"],
      ["application/xcap-diff+xml", "xdf"],
      ["application/xenc+xml", "xenc"],
      ["application/xhtml+xml", "xhtml"],
      ["application/xml", "xml"],
      ["application/xml-dtd", "dtd"],
      ["application/xop+xml", "xop"],
      ["application/xslt+xml", "xslt"],
      ["application/xspf+xml", "xspf"],
      ["application/xv+xml", "mxml"],
      ["application/yang", "yang"],
      ["application/yin+xml", "yin"],
      ["application/ynd.ms-pkipko", "pko"],
      ["application/zip", "zip"],
      ["audio/adpcm", "adp"],
      ["audio/aiff", ["aiff", "aif", "aifc"]],
      ["audio/basic", ["snd", "au"]],
      ["audio/it", "it"],
      ["audio/make", ["funk", "my", "pfunk"]],
      ["audio/make.my.funk", "pfunk"],
      ["audio/mid", ["mid", "rmi"]],
      ["audio/midi", ["midi", "kar", "mid"]],
      ["audio/mod", "mod"],
      ["audio/mp4", "mp4a"],
      ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
      ["audio/mpeg3", "mp3"],
      ["audio/nspaudio", ["la", "lma"]],
      ["audio/ogg", "oga"],
      ["audio/s3m", "s3m"],
      ["audio/tsp-audio", "tsi"],
      ["audio/tsplayer", "tsp"],
      ["audio/vnd.dece.audio", "uva"],
      ["audio/vnd.digital-winds", "eol"],
      ["audio/vnd.dra", "dra"],
      ["audio/vnd.dts", "dts"],
      ["audio/vnd.dts.hd", "dtshd"],
      ["audio/vnd.lucent.voice", "lvp"],
      ["audio/vnd.ms-playready.media.pya", "pya"],
      ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
      ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
      ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
      ["audio/vnd.qcelp", "qcp"],
      ["audio/vnd.rip", "rip"],
      ["audio/voc", "voc"],
      ["audio/voxware", "vox"],
      ["audio/wav", "wav"],
      ["audio/webm", "weba"],
      ["audio/x-aac", "aac"],
      ["audio/x-adpcm", "snd"],
      ["audio/x-aiff", ["aiff", "aif", "aifc"]],
      ["audio/x-au", "au"],
      ["audio/x-gsm", ["gsd", "gsm"]],
      ["audio/x-jam", "jam"],
      ["audio/x-liveaudio", "lam"],
      ["audio/x-mid", ["mid", "midi"]],
      ["audio/x-midi", ["midi", "mid"]],
      ["audio/x-mod", "mod"],
      ["audio/x-mpeg", "mp2"],
      ["audio/x-mpeg-3", "mp3"],
      ["audio/x-mpegurl", "m3u"],
      ["audio/x-mpequrl", "m3u"],
      ["audio/x-ms-wax", "wax"],
      ["audio/x-ms-wma", "wma"],
      ["audio/x-nspaudio", ["la", "lma"]],
      ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
      ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
      ["audio/x-psid", "sid"],
      ["audio/x-realaudio", "ra"],
      ["audio/x-twinvq", "vqf"],
      ["audio/x-twinvq-plugin", ["vqe", "vql"]],
      ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
      ["audio/x-voc", "voc"],
      ["audio/x-wav", "wav"],
      ["audio/xm", "xm"],
      ["chemical/x-cdx", "cdx"],
      ["chemical/x-cif", "cif"],
      ["chemical/x-cmdf", "cmdf"],
      ["chemical/x-cml", "cml"],
      ["chemical/x-csml", "csml"],
      ["chemical/x-pdb", ["pdb", "xyz"]],
      ["chemical/x-xyz", "xyz"],
      ["drawing/x-dwf", "dwf"],
      ["i-world/i-vrml", "ivr"],
      ["image/bmp", ["bmp", "bm"]],
      ["image/cgm", "cgm"],
      ["image/cis-cod", "cod"],
      ["image/cmu-raster", ["ras", "rast"]],
      ["image/fif", "fif"],
      ["image/florian", ["flo", "turbot"]],
      ["image/g3fax", "g3"],
      ["image/gif", "gif"],
      ["image/ief", ["ief", "iefs"]],
      ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
      ["image/jutvision", "jut"],
      ["image/ktx", "ktx"],
      ["image/naplps", ["nap", "naplps"]],
      ["image/pict", ["pic", "pict"]],
      ["image/pipeg", "jfif"],
      ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
      ["image/png", ["png", "x-png"]],
      ["image/prs.btif", "btif"],
      ["image/svg+xml", "svg"],
      ["image/tiff", ["tif", "tiff"]],
      ["image/vasa", "mcf"],
      ["image/vnd.adobe.photoshop", "psd"],
      ["image/vnd.dece.graphic", "uvi"],
      ["image/vnd.djvu", "djvu"],
      ["image/vnd.dvb.subtitle", "sub"],
      ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
      ["image/vnd.dxf", "dxf"],
      ["image/vnd.fastbidsheet", "fbs"],
      ["image/vnd.fpx", "fpx"],
      ["image/vnd.fst", "fst"],
      ["image/vnd.fujixerox.edmics-mmr", "mmr"],
      ["image/vnd.fujixerox.edmics-rlc", "rlc"],
      ["image/vnd.ms-modi", "mdi"],
      ["image/vnd.net-fpx", ["fpx", "npx"]],
      ["image/vnd.rn-realflash", "rf"],
      ["image/vnd.rn-realpix", "rp"],
      ["image/vnd.wap.wbmp", "wbmp"],
      ["image/vnd.xiff", "xif"],
      ["image/webp", "webp"],
      ["image/x-cmu-raster", "ras"],
      ["image/x-cmx", "cmx"],
      ["image/x-dwg", ["dwg", "dxf", "svf"]],
      ["image/x-freehand", "fh"],
      ["image/x-icon", "ico"],
      ["image/x-jg", "art"],
      ["image/x-jps", "jps"],
      ["image/x-niff", ["niff", "nif"]],
      ["image/x-pcx", "pcx"],
      ["image/x-pict", ["pct", "pic"]],
      ["image/x-portable-anymap", "pnm"],
      ["image/x-portable-bitmap", "pbm"],
      ["image/x-portable-graymap", "pgm"],
      ["image/x-portable-greymap", "pgm"],
      ["image/x-portable-pixmap", "ppm"],
      ["image/x-quicktime", ["qif", "qti", "qtif"]],
      ["image/x-rgb", "rgb"],
      ["image/x-tiff", ["tif", "tiff"]],
      ["image/x-windows-bmp", "bmp"],
      ["image/x-xbitmap", "xbm"],
      ["image/x-xbm", "xbm"],
      ["image/x-xpixmap", ["xpm", "pm"]],
      ["image/x-xwd", "xwd"],
      ["image/x-xwindowdump", "xwd"],
      ["image/xbm", "xbm"],
      ["image/xpm", "xpm"],
      ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
      ["model/iges", ["iges", "igs"]],
      ["model/mesh", "msh"],
      ["model/vnd.collada+xml", "dae"],
      ["model/vnd.dwf", "dwf"],
      ["model/vnd.gdl", "gdl"],
      ["model/vnd.gtw", "gtw"],
      ["model/vnd.mts", "mts"],
      ["model/vnd.vtu", "vtu"],
      ["model/vrml", ["vrml", "wrl", "wrz"]],
      ["model/x-pov", "pov"],
      ["multipart/x-gzip", "gzip"],
      ["multipart/x-ustar", "ustar"],
      ["multipart/x-zip", "zip"],
      ["music/crescendo", ["mid", "midi"]],
      ["music/x-karaoke", "kar"],
      ["paleovu/x-pv", "pvu"],
      ["text/asp", "asp"],
      ["text/calendar", "ics"],
      ["text/css", "css"],
      ["text/csv", "csv"],
      ["text/ecmascript", "js"],
      ["text/h323", "323"],
      ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
      ["text/iuls", "uls"],
      ["text/javascript", "js"],
      ["text/mcf", "mcf"],
      ["text/n3", "n3"],
      ["text/pascal", "pas"],
      [
        "text/plain",
        [
          "txt",
          "bas",
          "c",
          "h",
          "c++",
          "cc",
          "com",
          "conf",
          "cxx",
          "def",
          "f",
          "f90",
          "for",
          "g",
          "hh",
          "idc",
          "jav",
          "java",
          "list",
          "log",
          "lst",
          "m",
          "mar",
          "pl",
          "sdml",
          "text"
        ]
      ],
      ["text/plain-bas", "par"],
      ["text/prs.lines.tag", "dsc"],
      ["text/richtext", ["rtx", "rt", "rtf"]],
      ["text/scriplet", "wsc"],
      ["text/scriptlet", "sct"],
      ["text/sgml", ["sgm", "sgml"]],
      ["text/tab-separated-values", "tsv"],
      ["text/troff", "t"],
      ["text/turtle", "ttl"],
      ["text/uri-list", ["uni", "unis", "uri", "uris"]],
      ["text/vnd.abc", "abc"],
      ["text/vnd.curl", "curl"],
      ["text/vnd.curl.dcurl", "dcurl"],
      ["text/vnd.curl.mcurl", "mcurl"],
      ["text/vnd.curl.scurl", "scurl"],
      ["text/vnd.fly", "fly"],
      ["text/vnd.fmi.flexstor", "flx"],
      ["text/vnd.graphviz", "gv"],
      ["text/vnd.in3d.3dml", "3dml"],
      ["text/vnd.in3d.spot", "spot"],
      ["text/vnd.rn-realtext", "rt"],
      ["text/vnd.sun.j2me.app-descriptor", "jad"],
      ["text/vnd.wap.wml", "wml"],
      ["text/vnd.wap.wmlscript", "wmls"],
      ["text/webviewhtml", "htt"],
      ["text/x-asm", ["asm", "s"]],
      ["text/x-audiosoft-intra", "aip"],
      ["text/x-c", ["c", "cc", "cpp"]],
      ["text/x-component", "htc"],
      ["text/x-fortran", ["for", "f", "f77", "f90"]],
      ["text/x-h", ["h", "hh"]],
      ["text/x-java-source", ["java", "jav"]],
      ["text/x-java-source,java", "java"],
      ["text/x-la-asf", "lsx"],
      ["text/x-m", "m"],
      ["text/x-pascal", "p"],
      ["text/x-script", "hlb"],
      ["text/x-script.csh", "csh"],
      ["text/x-script.elisp", "el"],
      ["text/x-script.guile", "scm"],
      ["text/x-script.ksh", "ksh"],
      ["text/x-script.lisp", "lsp"],
      ["text/x-script.perl", "pl"],
      ["text/x-script.perl-module", "pm"],
      ["text/x-script.phyton", "py"],
      ["text/x-script.rexx", "rexx"],
      ["text/x-script.scheme", "scm"],
      ["text/x-script.sh", "sh"],
      ["text/x-script.tcl", "tcl"],
      ["text/x-script.tcsh", "tcsh"],
      ["text/x-script.zsh", "zsh"],
      ["text/x-server-parsed-html", ["shtml", "ssi"]],
      ["text/x-setext", "etx"],
      ["text/x-sgml", ["sgm", "sgml"]],
      ["text/x-speech", ["spc", "talk"]],
      ["text/x-uil", "uil"],
      ["text/x-uuencode", ["uu", "uue"]],
      ["text/x-vcalendar", "vcs"],
      ["text/x-vcard", "vcf"],
      ["text/xml", "xml"],
      ["video/3gpp", "3gp"],
      ["video/3gpp2", "3g2"],
      ["video/animaflex", "afl"],
      ["video/avi", "avi"],
      ["video/avs-video", "avs"],
      ["video/dl", "dl"],
      ["video/fli", "fli"],
      ["video/gl", "gl"],
      ["video/h261", "h261"],
      ["video/h263", "h263"],
      ["video/h264", "h264"],
      ["video/jpeg", "jpgv"],
      ["video/jpm", "jpm"],
      ["video/mj2", "mj2"],
      ["video/mp4", "mp4"],
      ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
      ["video/msvideo", "avi"],
      ["video/ogg", "ogv"],
      ["video/quicktime", ["mov", "qt", "moov"]],
      ["video/vdo", "vdo"],
      ["video/vivo", ["viv", "vivo"]],
      ["video/vnd.dece.hd", "uvh"],
      ["video/vnd.dece.mobile", "uvm"],
      ["video/vnd.dece.pd", "uvp"],
      ["video/vnd.dece.sd", "uvs"],
      ["video/vnd.dece.video", "uvv"],
      ["video/vnd.fvt", "fvt"],
      ["video/vnd.mpegurl", "mxu"],
      ["video/vnd.ms-playready.media.pyv", "pyv"],
      ["video/vnd.rn-realvideo", "rv"],
      ["video/vnd.uvvu.mp4", "uvu"],
      ["video/vnd.vivo", ["viv", "vivo"]],
      ["video/vosaic", "vos"],
      ["video/webm", "webm"],
      ["video/x-amt-demorun", "xdr"],
      ["video/x-amt-showrun", "xsr"],
      ["video/x-atomic3d-feature", "fmf"],
      ["video/x-dl", "dl"],
      ["video/x-dv", ["dif", "dv"]],
      ["video/x-f4v", "f4v"],
      ["video/x-fli", "fli"],
      ["video/x-flv", "flv"],
      ["video/x-gl", "gl"],
      ["video/x-isvideo", "isu"],
      ["video/x-la-asf", ["lsf", "lsx"]],
      ["video/x-m4v", "m4v"],
      ["video/x-motion-jpeg", "mjpg"],
      ["video/x-mpeg", ["mp3", "mp2"]],
      ["video/x-mpeq2a", "mp2"],
      ["video/x-ms-asf", ["asf", "asr", "asx"]],
      ["video/x-ms-asf-plugin", "asx"],
      ["video/x-ms-wm", "wm"],
      ["video/x-ms-wmv", "wmv"],
      ["video/x-ms-wmx", "wmx"],
      ["video/x-ms-wvx", "wvx"],
      ["video/x-msvideo", "avi"],
      ["video/x-qtc", "qtc"],
      ["video/x-scm", "scm"],
      ["video/x-sgi-movie", ["movie", "mv"]],
      ["windows/metafile", "wmf"],
      ["www/mime", "mime"],
      ["x-conference/x-cooltalk", "ice"],
      ["x-music/x-midi", ["mid", "midi"]],
      ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
      ["x-world/x-svr", "svr"],
      ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
      ["x-world/x-vrt", "vrt"],
      ["xgl/drawing", "xgz"],
      ["xgl/movie", "xmz"]
    ]);
    var extensions = /* @__PURE__ */ new Map([
      ["123", "application/vnd.lotus-1-2-3"],
      ["323", "text/h323"],
      ["*", "application/octet-stream"],
      ["3dm", "x-world/x-3dmf"],
      ["3dmf", "x-world/x-3dmf"],
      ["3dml", "text/vnd.in3d.3dml"],
      ["3g2", "video/3gpp2"],
      ["3gp", "video/3gpp"],
      ["7z", "application/x-7z-compressed"],
      ["a", "application/octet-stream"],
      ["aab", "application/x-authorware-bin"],
      ["aac", "audio/x-aac"],
      ["aam", "application/x-authorware-map"],
      ["aas", "application/x-authorware-seg"],
      ["abc", "text/vnd.abc"],
      ["abw", "application/x-abiword"],
      ["ac", "application/pkix-attr-cert"],
      ["acc", "application/vnd.americandynamics.acc"],
      ["ace", "application/x-ace-compressed"],
      ["acgi", "text/html"],
      ["acu", "application/vnd.acucobol"],
      ["acx", "application/internet-property-stream"],
      ["adp", "audio/adpcm"],
      ["aep", "application/vnd.audiograph"],
      ["afl", "video/animaflex"],
      ["afp", "application/vnd.ibm.modcap"],
      ["ahead", "application/vnd.ahead.space"],
      ["ai", "application/postscript"],
      ["aif", ["audio/aiff", "audio/x-aiff"]],
      ["aifc", ["audio/aiff", "audio/x-aiff"]],
      ["aiff", ["audio/aiff", "audio/x-aiff"]],
      ["aim", "application/x-aim"],
      ["aip", "text/x-audiosoft-intra"],
      ["air", "application/vnd.adobe.air-application-installer-package+zip"],
      ["ait", "application/vnd.dvb.ait"],
      ["ami", "application/vnd.amiga.ami"],
      ["ani", "application/x-navi-animation"],
      ["aos", "application/x-nokia-9000-communicator-add-on-software"],
      ["apk", "application/vnd.android.package-archive"],
      ["application", "application/x-ms-application"],
      ["apr", "application/vnd.lotus-approach"],
      ["aps", "application/mime"],
      ["arc", "application/octet-stream"],
      ["arj", ["application/arj", "application/octet-stream"]],
      ["art", "image/x-jg"],
      ["asf", "video/x-ms-asf"],
      ["asm", "text/x-asm"],
      ["aso", "application/vnd.accpac.simply.aso"],
      ["asp", "text/asp"],
      ["asr", "video/x-ms-asf"],
      ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
      ["atc", "application/vnd.acucorp"],
      ["atomcat", "application/atomcat+xml"],
      ["atomsvc", "application/atomsvc+xml"],
      ["atx", "application/vnd.antix.game-component"],
      ["au", ["audio/basic", "audio/x-au"]],
      ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
      ["avs", "video/avs-video"],
      ["aw", "application/applixware"],
      ["axs", "application/olescript"],
      ["azf", "application/vnd.airzip.filesecure.azf"],
      ["azs", "application/vnd.airzip.filesecure.azs"],
      ["azw", "application/vnd.amazon.ebook"],
      ["bas", "text/plain"],
      ["bcpio", "application/x-bcpio"],
      ["bdf", "application/x-font-bdf"],
      ["bdm", "application/vnd.syncml.dm+wbxml"],
      ["bed", "application/vnd.realvnc.bed"],
      ["bh2", "application/vnd.fujitsu.oasysprs"],
      [
        "bin",
        ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]
      ],
      ["bm", "image/bmp"],
      ["bmi", "application/vnd.bmi"],
      ["bmp", ["image/bmp", "image/x-windows-bmp"]],
      ["boo", "application/book"],
      ["book", "application/book"],
      ["box", "application/vnd.previewsystems.box"],
      ["boz", "application/x-bzip2"],
      ["bsh", "application/x-bsh"],
      ["btif", "image/prs.btif"],
      ["bz", "application/x-bzip"],
      ["bz2", "application/x-bzip2"],
      ["c", ["text/plain", "text/x-c"]],
      ["c++", "text/plain"],
      ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
      ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
      ["c4g", "application/vnd.clonk.c4group"],
      ["cab", "application/vnd.ms-cab-compressed"],
      ["car", "application/vnd.curl.car"],
      ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
      ["cc", ["text/plain", "text/x-c"]],
      ["ccad", "application/clariscad"],
      ["cco", "application/x-cocoa"],
      ["ccxml", "application/ccxml+xml,"],
      ["cdbcmsg", "application/vnd.contact.cmsg"],
      ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
      ["cdkey", "application/vnd.mediastation.cdkey"],
      ["cdmia", "application/cdmi-capability"],
      ["cdmic", "application/cdmi-container"],
      ["cdmid", "application/cdmi-domain"],
      ["cdmio", "application/cdmi-object"],
      ["cdmiq", "application/cdmi-queue"],
      ["cdx", "chemical/x-cdx"],
      ["cdxml", "application/vnd.chemdraw+xml"],
      ["cdy", "application/vnd.cinderella"],
      ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
      ["cgm", "image/cgm"],
      ["cha", "application/x-chat"],
      ["chat", "application/x-chat"],
      ["chm", "application/vnd.ms-htmlhelp"],
      ["chrt", "application/vnd.kde.kchart"],
      ["cif", "chemical/x-cif"],
      ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
      ["cil", "application/vnd.ms-artgalry"],
      ["cla", "application/vnd.claymore"],
      [
        "class",
        ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]
      ],
      ["clkk", "application/vnd.crick.clicker.keyboard"],
      ["clkp", "application/vnd.crick.clicker.palette"],
      ["clkt", "application/vnd.crick.clicker.template"],
      ["clkw", "application/vnd.crick.clicker.wordbank"],
      ["clkx", "application/vnd.crick.clicker"],
      ["clp", "application/x-msclip"],
      ["cmc", "application/vnd.cosmocaller"],
      ["cmdf", "chemical/x-cmdf"],
      ["cml", "chemical/x-cml"],
      ["cmp", "application/vnd.yellowriver-custom-menu"],
      ["cmx", "image/x-cmx"],
      ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
      ["com", ["application/octet-stream", "text/plain"]],
      ["conf", "text/plain"],
      ["cpio", "application/x-cpio"],
      ["cpp", "text/x-c"],
      ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
      ["crd", "application/x-mscardfile"],
      ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
      ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
      ["cryptonote", "application/vnd.rig.cryptonote"],
      ["csh", ["text/x-script.csh", "application/x-csh"]],
      ["csml", "chemical/x-csml"],
      ["csp", "application/vnd.commonspace"],
      ["css", ["text/css", "application/x-pointplus"]],
      ["csv", "text/csv"],
      ["cu", "application/cu-seeme"],
      ["curl", "text/vnd.curl"],
      ["cww", "application/prs.cww"],
      ["cxx", "text/plain"],
      ["dae", "model/vnd.collada+xml"],
      ["daf", "application/vnd.mobius.daf"],
      ["davmount", "application/davmount+xml"],
      ["dcr", "application/x-director"],
      ["dcurl", "text/vnd.curl.dcurl"],
      ["dd2", "application/vnd.oma.dd2+xml"],
      ["ddd", "application/vnd.fujixerox.ddd"],
      ["deb", "application/x-debian-package"],
      ["deepv", "application/x-deepv"],
      ["def", "text/plain"],
      ["der", "application/x-x509-ca-cert"],
      ["dfac", "application/vnd.dreamfactory"],
      ["dif", "video/x-dv"],
      ["dir", "application/x-director"],
      ["dis", "application/vnd.mobius.dis"],
      ["djvu", "image/vnd.djvu"],
      ["dl", ["video/dl", "video/x-dl"]],
      ["dll", "application/x-msdownload"],
      ["dms", "application/octet-stream"],
      ["dna", "application/vnd.dna"],
      ["doc", "application/msword"],
      ["docm", "application/vnd.ms-word.document.macroenabled.12"],
      ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      ["dot", "application/msword"],
      ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
      ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
      ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
      ["dpg", "application/vnd.dpgraph"],
      ["dra", "audio/vnd.dra"],
      ["drw", "application/drafting"],
      ["dsc", "text/prs.lines.tag"],
      ["dssc", "application/dssc+der"],
      ["dtb", "application/x-dtbook+xml"],
      ["dtd", "application/xml-dtd"],
      ["dts", "audio/vnd.dts"],
      ["dtshd", "audio/vnd.dts.hd"],
      ["dump", "application/octet-stream"],
      ["dv", "video/x-dv"],
      ["dvi", "application/x-dvi"],
      ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
      ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
      ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
      ["dxp", "application/vnd.spotfire.dxp"],
      ["dxr", "application/x-director"],
      ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
      ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
      ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
      ["edm", "application/vnd.novadigm.edm"],
      ["edx", "application/vnd.novadigm.edx"],
      ["efif", "application/vnd.picsel"],
      ["ei6", "application/vnd.pg.osasli"],
      ["el", "text/x-script.elisp"],
      ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
      ["eml", "message/rfc822"],
      ["emma", "application/emma+xml"],
      ["env", "application/x-envoy"],
      ["eol", "audio/vnd.digital-winds"],
      ["eot", "application/vnd.ms-fontobject"],
      ["eps", "application/postscript"],
      ["epub", "application/epub+zip"],
      ["es", ["application/ecmascript", "application/x-esrehber"]],
      ["es3", "application/vnd.eszigno3+xml"],
      ["esf", "application/vnd.epson.esf"],
      ["etx", "text/x-setext"],
      ["evy", ["application/envoy", "application/x-envoy"]],
      ["exe", ["application/octet-stream", "application/x-msdownload"]],
      ["exi", "application/exi"],
      ["ext", "application/vnd.novadigm.ext"],
      ["ez2", "application/vnd.ezpix-album"],
      ["ez3", "application/vnd.ezpix-package"],
      ["f", ["text/plain", "text/x-fortran"]],
      ["f4v", "video/x-f4v"],
      ["f77", "text/x-fortran"],
      ["f90", ["text/plain", "text/x-fortran"]],
      ["fbs", "image/vnd.fastbidsheet"],
      ["fcs", "application/vnd.isac.fcs"],
      ["fdf", "application/vnd.fdf"],
      ["fe_launch", "application/vnd.denovo.fcselayout-link"],
      ["fg5", "application/vnd.fujitsu.oasysgp"],
      ["fh", "image/x-freehand"],
      ["fif", ["application/fractals", "image/fif"]],
      ["fig", "application/x-xfig"],
      ["fli", ["video/fli", "video/x-fli"]],
      ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
      ["flr", "x-world/x-vrml"],
      ["flv", "video/x-flv"],
      ["flw", "application/vnd.kde.kivio"],
      ["flx", "text/vnd.fmi.flexstor"],
      ["fly", "text/vnd.fly"],
      ["fm", "application/vnd.framemaker"],
      ["fmf", "video/x-atomic3d-feature"],
      ["fnc", "application/vnd.frogans.fnc"],
      ["for", ["text/plain", "text/x-fortran"]],
      ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
      ["frl", "application/freeloader"],
      ["fsc", "application/vnd.fsc.weblaunch"],
      ["fst", "image/vnd.fst"],
      ["ftc", "application/vnd.fluxtime.clip"],
      ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
      ["funk", "audio/make"],
      ["fvt", "video/vnd.fvt"],
      ["fxp", "application/vnd.adobe.fxp"],
      ["fzs", "application/vnd.fuzzysheet"],
      ["g", "text/plain"],
      ["g2w", "application/vnd.geoplan"],
      ["g3", "image/g3fax"],
      ["g3w", "application/vnd.geospace"],
      ["gac", "application/vnd.groove-account"],
      ["gdl", "model/vnd.gdl"],
      ["geo", "application/vnd.dynageo"],
      ["geojson", "application/geo+json"],
      ["gex", "application/vnd.geometry-explorer"],
      ["ggb", "application/vnd.geogebra.file"],
      ["ggt", "application/vnd.geogebra.tool"],
      ["ghf", "application/vnd.groove-help"],
      ["gif", "image/gif"],
      ["gim", "application/vnd.groove-identity-message"],
      ["gl", ["video/gl", "video/x-gl"]],
      ["gmx", "application/vnd.gmx"],
      ["gnumeric", "application/x-gnumeric"],
      ["gph", "application/vnd.flographit"],
      ["gqf", "application/vnd.grafeq"],
      ["gram", "application/srgs"],
      ["grv", "application/vnd.groove-injector"],
      ["grxml", "application/srgs+xml"],
      ["gsd", "audio/x-gsm"],
      ["gsf", "application/x-font-ghostscript"],
      ["gsm", "audio/x-gsm"],
      ["gsp", "application/x-gsp"],
      ["gss", "application/x-gss"],
      ["gtar", "application/x-gtar"],
      ["gtm", "application/vnd.groove-tool-message"],
      ["gtw", "model/vnd.gtw"],
      ["gv", "text/vnd.graphviz"],
      ["gxt", "application/vnd.geonext"],
      ["gz", ["application/x-gzip", "application/x-compressed"]],
      ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
      ["h", ["text/plain", "text/x-h"]],
      ["h261", "video/h261"],
      ["h263", "video/h263"],
      ["h264", "video/h264"],
      ["hal", "application/vnd.hal+xml"],
      ["hbci", "application/vnd.hbci"],
      ["hdf", "application/x-hdf"],
      ["help", "application/x-helpfile"],
      ["hgl", "application/vnd.hp-hpgl"],
      ["hh", ["text/plain", "text/x-h"]],
      ["hlb", "text/x-script"],
      ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
      ["hpg", "application/vnd.hp-hpgl"],
      ["hpgl", "application/vnd.hp-hpgl"],
      ["hpid", "application/vnd.hp-hpid"],
      ["hps", "application/vnd.hp-hps"],
      [
        "hqx",
        [
          "application/mac-binhex40",
          "application/binhex",
          "application/binhex4",
          "application/mac-binhex",
          "application/x-binhex40",
          "application/x-mac-binhex40"
        ]
      ],
      ["hta", "application/hta"],
      ["htc", "text/x-component"],
      ["htke", "application/vnd.kenameaapp"],
      ["htm", "text/html"],
      ["html", "text/html"],
      ["htmls", "text/html"],
      ["htt", "text/webviewhtml"],
      ["htx", "text/html"],
      ["hvd", "application/vnd.yamaha.hv-dic"],
      ["hvp", "application/vnd.yamaha.hv-voice"],
      ["hvs", "application/vnd.yamaha.hv-script"],
      ["i2g", "application/vnd.intergeo"],
      ["icc", "application/vnd.iccprofile"],
      ["ice", "x-conference/x-cooltalk"],
      ["ico", "image/x-icon"],
      ["ics", "text/calendar"],
      ["idc", "text/plain"],
      ["ief", "image/ief"],
      ["iefs", "image/ief"],
      ["ifm", "application/vnd.shana.informed.formdata"],
      ["iges", ["application/iges", "model/iges"]],
      ["igl", "application/vnd.igloader"],
      ["igm", "application/vnd.insors.igm"],
      ["igs", ["application/iges", "model/iges"]],
      ["igx", "application/vnd.micrografx.igx"],
      ["iif", "application/vnd.shana.informed.interchange"],
      ["iii", "application/x-iphone"],
      ["ima", "application/x-ima"],
      ["imap", "application/x-httpd-imap"],
      ["imp", "application/vnd.accpac.simply.imp"],
      ["ims", "application/vnd.ms-ims"],
      ["inf", "application/inf"],
      ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
      ["ip", "application/x-ip2"],
      ["ipfix", "application/ipfix"],
      ["ipk", "application/vnd.shana.informed.package"],
      ["irm", "application/vnd.ibm.rights-management"],
      ["irp", "application/vnd.irepository.package+xml"],
      ["isp", "application/x-internet-signup"],
      ["isu", "video/x-isvideo"],
      ["it", "audio/it"],
      ["itp", "application/vnd.shana.informed.formtemplate"],
      ["iv", "application/x-inventor"],
      ["ivp", "application/vnd.immervision-ivp"],
      ["ivr", "i-world/i-vrml"],
      ["ivu", "application/vnd.immervision-ivu"],
      ["ivy", "application/x-livescreen"],
      ["jad", "text/vnd.sun.j2me.app-descriptor"],
      ["jam", ["application/vnd.jam", "audio/x-jam"]],
      ["jar", "application/java-archive"],
      ["jav", ["text/plain", "text/x-java-source"]],
      ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
      ["jcm", "application/x-java-commerce"],
      ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
      ["jfif-tbnl", "image/jpeg"],
      ["jisp", "application/vnd.jisp"],
      ["jlt", "application/vnd.hp-jlyt"],
      ["jnlp", "application/x-java-jnlp-file"],
      ["joda", "application/vnd.joost.joda-archive"],
      ["jpe", ["image/jpeg", "image/pjpeg"]],
      ["jpeg", ["image/jpeg", "image/pjpeg"]],
      ["jpg", ["image/jpeg", "image/pjpeg"]],
      ["jpgv", "video/jpeg"],
      ["jpm", "video/jpm"],
      ["jps", "image/x-jps"],
      ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
      ["json", "application/json"],
      ["jut", "image/jutvision"],
      ["kar", ["audio/midi", "music/x-karaoke"]],
      ["karbon", "application/vnd.kde.karbon"],
      ["kfo", "application/vnd.kde.kformula"],
      ["kia", "application/vnd.kidspiration"],
      ["kml", "application/vnd.google-earth.kml+xml"],
      ["kmz", "application/vnd.google-earth.kmz"],
      ["kne", "application/vnd.kinar"],
      ["kon", "application/vnd.kde.kontour"],
      ["kpr", "application/vnd.kde.kpresenter"],
      ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
      ["ksp", "application/vnd.kde.kspread"],
      ["ktx", "image/ktx"],
      ["ktz", "application/vnd.kahootz"],
      ["kwd", "application/vnd.kde.kword"],
      ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["lam", "audio/x-liveaudio"],
      ["lasxml", "application/vnd.las.las+xml"],
      ["latex", "application/x-latex"],
      ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
      ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
      ["les", "application/vnd.hhe.lesson-player"],
      ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
      ["lhx", "application/octet-stream"],
      ["link66", "application/vnd.route66.link66+xml"],
      ["list", "text/plain"],
      ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["log", "text/plain"],
      ["lrm", "application/vnd.ms-lrm"],
      ["lsf", "video/x-la-asf"],
      ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
      ["lst", "text/plain"],
      ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
      ["ltf", "application/vnd.frogans.ltf"],
      ["ltx", "application/x-latex"],
      ["lvp", "audio/vnd.lucent.voice"],
      ["lwp", "application/vnd.lotus-wordpro"],
      ["lzh", ["application/octet-stream", "application/x-lzh"]],
      ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
      ["m", ["text/plain", "text/x-m"]],
      ["m13", "application/x-msmediaview"],
      ["m14", "application/x-msmediaview"],
      ["m1v", "video/mpeg"],
      ["m21", "application/mp21"],
      ["m2a", "audio/mpeg"],
      ["m2v", "video/mpeg"],
      ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
      ["m3u8", "application/vnd.apple.mpegurl"],
      ["m4v", "video/x-m4v"],
      ["ma", "application/mathematica"],
      ["mads", "application/mads+xml"],
      ["mag", "application/vnd.ecowin.chart"],
      ["man", "application/x-troff-man"],
      ["map", "application/x-navimap"],
      ["mar", "text/plain"],
      ["mathml", "application/mathml+xml"],
      ["mbd", "application/mbedlet"],
      ["mbk", "application/vnd.mobius.mbk"],
      ["mbox", "application/mbox"],
      ["mc$", "application/x-magic-cap-package-1.0"],
      ["mc1", "application/vnd.medcalcdata"],
      ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
      ["mcf", ["image/vasa", "text/mcf"]],
      ["mcp", "application/netmc"],
      ["mcurl", "text/vnd.curl.mcurl"],
      ["mdb", "application/x-msaccess"],
      ["mdi", "image/vnd.ms-modi"],
      ["me", "application/x-troff-me"],
      ["meta4", "application/metalink4+xml"],
      ["mets", "application/mets+xml"],
      ["mfm", "application/vnd.mfmp"],
      ["mgp", "application/vnd.osgeo.mapguide.package"],
      ["mgz", "application/vnd.proteus.magazine"],
      ["mht", "message/rfc822"],
      ["mhtml", "message/rfc822"],
      ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
      ["mime", ["message/rfc822", "www/mime"]],
      ["mj2", "video/mj2"],
      ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
      ["mjpg", "video/x-motion-jpeg"],
      ["mlp", "application/vnd.dolby.mlp"],
      ["mm", ["application/base64", "application/x-meme"]],
      ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
      ["mme", "application/base64"],
      ["mmf", "application/vnd.smaf"],
      ["mmr", "image/vnd.fujixerox.edmics-mmr"],
      ["mny", "application/x-msmoney"],
      ["mod", ["audio/mod", "audio/x-mod"]],
      ["mods", "application/mods+xml"],
      ["moov", "video/quicktime"],
      ["mov", "video/quicktime"],
      ["movie", "video/x-sgi-movie"],
      ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
      ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
      ["mp4", ["video/mp4", "application/mp4"]],
      ["mp4a", "audio/mp4"],
      ["mpa", ["video/mpeg", "audio/mpeg"]],
      ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
      ["mpe", "video/mpeg"],
      ["mpeg", "video/mpeg"],
      ["mpg", ["video/mpeg", "audio/mpeg"]],
      ["mpga", "audio/mpeg"],
      ["mpkg", "application/vnd.apple.installer+xml"],
      ["mpm", "application/vnd.blueice.multipass"],
      ["mpn", "application/vnd.mophun.application"],
      ["mpp", "application/vnd.ms-project"],
      ["mpt", "application/x-project"],
      ["mpv", "application/x-project"],
      ["mpv2", "video/mpeg"],
      ["mpx", "application/x-project"],
      ["mpy", "application/vnd.ibm.minipay"],
      ["mqy", "application/vnd.mobius.mqy"],
      ["mrc", "application/marc"],
      ["mrcx", "application/marcxml+xml"],
      ["ms", "application/x-troff-ms"],
      ["mscml", "application/mediaservercontrol+xml"],
      ["mseq", "application/vnd.mseq"],
      ["msf", "application/vnd.epson.msf"],
      ["msg", "application/vnd.ms-outlook"],
      ["msh", "model/mesh"],
      ["msl", "application/vnd.mobius.msl"],
      ["msty", "application/vnd.muvee.style"],
      ["mts", "model/vnd.mts"],
      ["mus", "application/vnd.musician"],
      ["musicxml", "application/vnd.recordare.musicxml+xml"],
      ["mv", "video/x-sgi-movie"],
      ["mvb", "application/x-msmediaview"],
      ["mwf", "application/vnd.mfer"],
      ["mxf", "application/mxf"],
      ["mxl", "application/vnd.recordare.musicxml"],
      ["mxml", "application/xv+xml"],
      ["mxs", "application/vnd.triscape.mxs"],
      ["mxu", "video/vnd.mpegurl"],
      ["my", "audio/make"],
      ["mzz", "application/x-vnd.audioexplosion.mzz"],
      ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
      ["n3", "text/n3"],
      ["nap", "image/naplps"],
      ["naplps", "image/naplps"],
      ["nbp", "application/vnd.wolfram.player"],
      ["nc", "application/x-netcdf"],
      ["ncm", "application/vnd.nokia.configuration-message"],
      ["ncx", "application/x-dtbncx+xml"],
      ["ngdat", "application/vnd.nokia.n-gage.data"],
      ["nif", "image/x-niff"],
      ["niff", "image/x-niff"],
      ["nix", "application/x-mix-transfer"],
      ["nlu", "application/vnd.neurolanguage.nlu"],
      ["nml", "application/vnd.enliven"],
      ["nnd", "application/vnd.noblenet-directory"],
      ["nns", "application/vnd.noblenet-sealer"],
      ["nnw", "application/vnd.noblenet-web"],
      ["npx", "image/vnd.net-fpx"],
      ["nsc", "application/x-conference"],
      ["nsf", "application/vnd.lotus-notes"],
      ["nvd", "application/x-navidoc"],
      ["nws", "message/rfc822"],
      ["o", "application/octet-stream"],
      ["oa2", "application/vnd.fujitsu.oasys2"],
      ["oa3", "application/vnd.fujitsu.oasys3"],
      ["oas", "application/vnd.fujitsu.oasys"],
      ["obd", "application/x-msbinder"],
      ["oda", "application/oda"],
      ["odb", "application/vnd.oasis.opendocument.database"],
      ["odc", "application/vnd.oasis.opendocument.chart"],
      ["odf", "application/vnd.oasis.opendocument.formula"],
      ["odft", "application/vnd.oasis.opendocument.formula-template"],
      ["odg", "application/vnd.oasis.opendocument.graphics"],
      ["odi", "application/vnd.oasis.opendocument.image"],
      ["odm", "application/vnd.oasis.opendocument.text-master"],
      ["odp", "application/vnd.oasis.opendocument.presentation"],
      ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
      ["odt", "application/vnd.oasis.opendocument.text"],
      ["oga", "audio/ogg"],
      ["ogv", "video/ogg"],
      ["ogx", "application/ogg"],
      ["omc", "application/x-omc"],
      ["omcd", "application/x-omcdatamaker"],
      ["omcr", "application/x-omcregerator"],
      ["onetoc", "application/onenote"],
      ["opf", "application/oebps-package+xml"],
      ["org", "application/vnd.lotus-organizer"],
      ["osf", "application/vnd.yamaha.openscoreformat"],
      ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
      ["otc", "application/vnd.oasis.opendocument.chart-template"],
      ["otf", "application/x-font-otf"],
      ["otg", "application/vnd.oasis.opendocument.graphics-template"],
      ["oth", "application/vnd.oasis.opendocument.text-web"],
      ["oti", "application/vnd.oasis.opendocument.image-template"],
      ["otp", "application/vnd.oasis.opendocument.presentation-template"],
      ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
      ["ott", "application/vnd.oasis.opendocument.text-template"],
      ["oxt", "application/vnd.openofficeorg.extension"],
      ["p", "text/x-pascal"],
      ["p10", ["application/pkcs10", "application/x-pkcs10"]],
      ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
      ["p7a", "application/x-pkcs7-signature"],
      ["p7b", "application/x-pkcs7-certificates"],
      ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7r", "application/x-pkcs7-certreqresp"],
      ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
      ["p8", "application/pkcs8"],
      ["par", "text/plain-bas"],
      ["part", "application/pro_eng"],
      ["pas", "text/pascal"],
      ["paw", "application/vnd.pawaafile"],
      ["pbd", "application/vnd.powerbuilder6"],
      ["pbm", "image/x-portable-bitmap"],
      ["pcf", "application/x-font-pcf"],
      ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
      ["pclxl", "application/vnd.hp-pclxl"],
      ["pct", "image/x-pict"],
      ["pcurl", "application/vnd.curl.pcurl"],
      ["pcx", "image/x-pcx"],
      ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
      ["pdf", "application/pdf"],
      ["pfa", "application/x-font-type1"],
      ["pfr", "application/font-tdpfr"],
      ["pfunk", ["audio/make", "audio/make.my.funk"]],
      ["pfx", "application/x-pkcs12"],
      ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
      ["pgn", "application/x-chess-pgn"],
      ["pgp", "application/pgp-signature"],
      ["pic", ["image/pict", "image/x-pict"]],
      ["pict", "image/pict"],
      ["pkg", "application/x-newton-compatible-pkg"],
      ["pki", "application/pkixcmp"],
      ["pkipath", "application/pkix-pkipath"],
      ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
      ["pl", ["text/plain", "text/x-script.perl"]],
      ["plb", "application/vnd.3gpp.pic-bw-large"],
      ["plc", "application/vnd.mobius.plc"],
      ["plf", "application/vnd.pocketlearn"],
      ["pls", "application/pls+xml"],
      ["plx", "application/x-pixclscript"],
      ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
      ["pm4", "application/x-pagemaker"],
      ["pm5", "application/x-pagemaker"],
      ["pma", "application/x-perfmon"],
      ["pmc", "application/x-perfmon"],
      ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
      ["pmr", "application/x-perfmon"],
      ["pmw", "application/x-perfmon"],
      ["png", "image/png"],
      ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
      ["portpkg", "application/vnd.macports.portpkg"],
      ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
      ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
      ["pov", "model/x-pov"],
      ["ppa", "application/vnd.ms-powerpoint"],
      ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
      ["ppd", "application/vnd.cups-ppd"],
      ["ppm", "image/x-portable-pixmap"],
      ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
      ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
      ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
      ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
      ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
      ["ppz", "application/mspowerpoint"],
      ["prc", "application/x-mobipocket-ebook"],
      ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
      ["prf", "application/pics-rules"],
      ["prt", "application/pro_eng"],
      ["ps", "application/postscript"],
      ["psb", "application/vnd.3gpp.pic-bw-small"],
      ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
      ["psf", "application/x-font-linux-psf"],
      ["pskcxml", "application/pskc+xml"],
      ["ptid", "application/vnd.pvi.ptid1"],
      ["pub", "application/x-mspublisher"],
      ["pvb", "application/vnd.3gpp.pic-bw-var"],
      ["pvu", "paleovu/x-pv"],
      ["pwn", "application/vnd.3m.post-it-notes"],
      ["pwz", "application/vnd.ms-powerpoint"],
      ["py", "text/x-script.phyton"],
      ["pya", "audio/vnd.ms-playready.media.pya"],
      ["pyc", "application/x-bytecode.python"],
      ["pyv", "video/vnd.ms-playready.media.pyv"],
      ["qam", "application/vnd.epson.quickanime"],
      ["qbo", "application/vnd.intu.qbo"],
      ["qcp", "audio/vnd.qcelp"],
      ["qd3", "x-world/x-3dmf"],
      ["qd3d", "x-world/x-3dmf"],
      ["qfx", "application/vnd.intu.qfx"],
      ["qif", "image/x-quicktime"],
      ["qps", "application/vnd.publishare-delta-tree"],
      ["qt", "video/quicktime"],
      ["qtc", "video/x-qtc"],
      ["qti", "image/x-quicktime"],
      ["qtif", "image/x-quicktime"],
      ["qxd", "application/vnd.quark.quarkxpress"],
      ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
      ["ram", "audio/x-pn-realaudio"],
      ["rar", "application/x-rar-compressed"],
      ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
      ["rast", "image/cmu-raster"],
      ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
      ["rdf", "application/rdf+xml"],
      ["rdz", "application/vnd.data-vision.rdz"],
      ["rep", "application/vnd.businessobjects"],
      ["res", "application/x-dtbresource+xml"],
      ["rexx", "text/x-script.rexx"],
      ["rf", "image/vnd.rn-realflash"],
      ["rgb", "image/x-rgb"],
      ["rif", "application/reginfo+xml"],
      ["rip", "audio/vnd.rip"],
      ["rl", "application/resource-lists+xml"],
      ["rlc", "image/vnd.fujixerox.edmics-rlc"],
      ["rld", "application/resource-lists-diff+xml"],
      ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
      ["rmi", "audio/mid"],
      ["rmm", "audio/x-pn-realaudio"],
      ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
      ["rms", "application/vnd.jcp.javame.midlet-rms"],
      ["rnc", "application/relax-ng-compact-syntax"],
      ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
      ["rnx", "application/vnd.rn-realplayer"],
      ["roff", "application/x-troff"],
      ["rp", "image/vnd.rn-realpix"],
      ["rp9", "application/vnd.cloanto.rp9"],
      ["rpm", "audio/x-pn-realaudio-plugin"],
      ["rpss", "application/vnd.nokia.radio-presets"],
      ["rpst", "application/vnd.nokia.radio-preset"],
      ["rq", "application/sparql-query"],
      ["rs", "application/rls-services+xml"],
      ["rsd", "application/rsd+xml"],
      ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
      ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
      ["rtx", ["text/richtext", "application/rtf"]],
      ["rv", "video/vnd.rn-realvideo"],
      ["s", "text/x-asm"],
      ["s3m", "audio/s3m"],
      ["saf", "application/vnd.yamaha.smaf-audio"],
      ["saveme", "application/octet-stream"],
      ["sbk", "application/x-tbook"],
      ["sbml", "application/sbml+xml"],
      ["sc", "application/vnd.ibm.secure-container"],
      ["scd", "application/x-msschedule"],
      [
        "scm",
        ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]
      ],
      ["scq", "application/scvp-cv-request"],
      ["scs", "application/scvp-cv-response"],
      ["sct", "text/scriptlet"],
      ["scurl", "text/vnd.curl.scurl"],
      ["sda", "application/vnd.stardivision.draw"],
      ["sdc", "application/vnd.stardivision.calc"],
      ["sdd", "application/vnd.stardivision.impress"],
      ["sdkm", "application/vnd.solent.sdkm+xml"],
      ["sdml", "text/plain"],
      ["sdp", ["application/sdp", "application/x-sdp"]],
      ["sdr", "application/sounder"],
      ["sdw", "application/vnd.stardivision.writer"],
      ["sea", ["application/sea", "application/x-sea"]],
      ["see", "application/vnd.seemail"],
      ["seed", "application/vnd.fdsn.seed"],
      ["sema", "application/vnd.sema"],
      ["semd", "application/vnd.semd"],
      ["semf", "application/vnd.semf"],
      ["ser", "application/java-serialized-object"],
      ["set", "application/set"],
      ["setpay", "application/set-payment-initiation"],
      ["setreg", "application/set-registration-initiation"],
      ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
      ["sfs", "application/vnd.spotfire.sfs"],
      ["sgl", "application/vnd.stardivision.writer-global"],
      ["sgm", ["text/sgml", "text/x-sgml"]],
      ["sgml", ["text/sgml", "text/x-sgml"]],
      ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
      ["shar", ["application/x-bsh", "application/x-shar"]],
      ["shf", "application/shf+xml"],
      ["shtml", ["text/html", "text/x-server-parsed-html"]],
      ["sid", "audio/x-psid"],
      ["sis", "application/vnd.symbian.install"],
      ["sit", ["application/x-stuffit", "application/x-sit"]],
      ["sitx", "application/x-stuffitx"],
      ["skd", "application/x-koan"],
      ["skm", "application/x-koan"],
      ["skp", ["application/vnd.koan", "application/x-koan"]],
      ["skt", "application/x-koan"],
      ["sl", "application/x-seelogo"],
      ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
      ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
      ["slt", "application/vnd.epson.salt"],
      ["sm", "application/vnd.stepmania.stepchart"],
      ["smf", "application/vnd.stardivision.math"],
      ["smi", ["application/smil", "application/smil+xml"]],
      ["smil", "application/smil"],
      ["snd", ["audio/basic", "audio/x-adpcm"]],
      ["snf", "application/x-font-snf"],
      ["sol", "application/solids"],
      ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
      ["spf", "application/vnd.yamaha.smaf-phrase"],
      ["spl", ["application/futuresplash", "application/x-futuresplash"]],
      ["spot", "text/vnd.in3d.spot"],
      ["spp", "application/scvp-vp-response"],
      ["spq", "application/scvp-vp-request"],
      ["spr", "application/x-sprite"],
      ["sprite", "application/x-sprite"],
      ["src", "application/x-wais-source"],
      ["sru", "application/sru+xml"],
      ["srx", "application/sparql-results+xml"],
      ["sse", "application/vnd.kodak-descriptor"],
      ["ssf", "application/vnd.epson.ssf"],
      ["ssi", "text/x-server-parsed-html"],
      ["ssm", "application/streamingmedia"],
      ["ssml", "application/ssml+xml"],
      ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
      ["st", "application/vnd.sailingtracker.track"],
      ["stc", "application/vnd.sun.xml.calc.template"],
      ["std", "application/vnd.sun.xml.draw.template"],
      ["step", "application/step"],
      ["stf", "application/vnd.wt.stf"],
      ["sti", "application/vnd.sun.xml.impress.template"],
      ["stk", "application/hyperstudio"],
      ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
      ["stm", "text/html"],
      ["stp", "application/step"],
      ["str", "application/vnd.pg.format"],
      ["stw", "application/vnd.sun.xml.writer.template"],
      ["sub", "image/vnd.dvb.subtitle"],
      ["sus", "application/vnd.sus-calendar"],
      ["sv4cpio", "application/x-sv4cpio"],
      ["sv4crc", "application/x-sv4crc"],
      ["svc", "application/vnd.dvb.service"],
      ["svd", "application/vnd.svd"],
      ["svf", ["image/vnd.dwg", "image/x-dwg"]],
      ["svg", "image/svg+xml"],
      ["svr", ["x-world/x-svr", "application/x-world"]],
      ["swf", "application/x-shockwave-flash"],
      ["swi", "application/vnd.aristanetworks.swi"],
      ["sxc", "application/vnd.sun.xml.calc"],
      ["sxd", "application/vnd.sun.xml.draw"],
      ["sxg", "application/vnd.sun.xml.writer.global"],
      ["sxi", "application/vnd.sun.xml.impress"],
      ["sxm", "application/vnd.sun.xml.math"],
      ["sxw", "application/vnd.sun.xml.writer"],
      ["t", ["text/troff", "application/x-troff"]],
      ["talk", "text/x-speech"],
      ["tao", "application/vnd.tao.intent-module-archive"],
      ["tar", "application/x-tar"],
      ["tbk", ["application/toolbook", "application/x-tbook"]],
      ["tcap", "application/vnd.3gpp2.tcap"],
      ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
      ["tcsh", "text/x-script.tcsh"],
      ["teacher", "application/vnd.smart.teacher"],
      ["tei", "application/tei+xml"],
      ["tex", "application/x-tex"],
      ["texi", "application/x-texinfo"],
      ["texinfo", "application/x-texinfo"],
      ["text", ["application/plain", "text/plain"]],
      ["tfi", "application/thraud+xml"],
      ["tfm", "application/x-tex-tfm"],
      ["tgz", ["application/gnutar", "application/x-compressed"]],
      ["thmx", "application/vnd.ms-officetheme"],
      ["tif", ["image/tiff", "image/x-tiff"]],
      ["tiff", ["image/tiff", "image/x-tiff"]],
      ["tmo", "application/vnd.tmobile-livetv"],
      ["torrent", "application/x-bittorrent"],
      ["tpl", "application/vnd.groove-tool-template"],
      ["tpt", "application/vnd.trid.tpt"],
      ["tr", "application/x-troff"],
      ["tra", "application/vnd.trueapp"],
      ["trm", "application/x-msterminal"],
      ["tsd", "application/timestamped-data"],
      ["tsi", "audio/tsp-audio"],
      ["tsp", ["application/dsptype", "audio/tsplayer"]],
      ["tsv", "text/tab-separated-values"],
      ["ttf", "application/x-font-ttf"],
      ["ttl", "text/turtle"],
      ["turbot", "image/florian"],
      ["twd", "application/vnd.simtech-mindmapper"],
      ["txd", "application/vnd.genomatix.tuxedo"],
      ["txf", "application/vnd.mobius.txf"],
      ["txt", "text/plain"],
      ["ufd", "application/vnd.ufdl"],
      ["uil", "text/x-uil"],
      ["uls", "text/iuls"],
      ["umj", "application/vnd.umajin"],
      ["uni", "text/uri-list"],
      ["unis", "text/uri-list"],
      ["unityweb", "application/vnd.unity"],
      ["unv", "application/i-deas"],
      ["uoml", "application/vnd.uoml+xml"],
      ["uri", "text/uri-list"],
      ["uris", "text/uri-list"],
      ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
      ["utz", "application/vnd.uiq.theme"],
      ["uu", ["application/octet-stream", "text/x-uuencode"]],
      ["uue", "text/x-uuencode"],
      ["uva", "audio/vnd.dece.audio"],
      ["uvh", "video/vnd.dece.hd"],
      ["uvi", "image/vnd.dece.graphic"],
      ["uvm", "video/vnd.dece.mobile"],
      ["uvp", "video/vnd.dece.pd"],
      ["uvs", "video/vnd.dece.sd"],
      ["uvu", "video/vnd.uvvu.mp4"],
      ["uvv", "video/vnd.dece.video"],
      ["vcd", "application/x-cdlink"],
      ["vcf", "text/x-vcard"],
      ["vcg", "application/vnd.groove-vcard"],
      ["vcs", "text/x-vcalendar"],
      ["vcx", "application/vnd.vcx"],
      ["vda", "application/vda"],
      ["vdo", "video/vdo"],
      ["vew", "application/groupwise"],
      ["vis", "application/vnd.visionary"],
      ["viv", ["video/vivo", "video/vnd.vivo"]],
      ["vivo", ["video/vivo", "video/vnd.vivo"]],
      ["vmd", "application/vocaltec-media-desc"],
      ["vmf", "application/vocaltec-media-file"],
      ["voc", ["audio/voc", "audio/x-voc"]],
      ["vos", "video/vosaic"],
      ["vox", "audio/voxware"],
      ["vqe", "audio/x-twinvq-plugin"],
      ["vqf", "audio/x-twinvq"],
      ["vql", "audio/x-twinvq-plugin"],
      ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
      ["vrt", "x-world/x-vrt"],
      ["vsd", ["application/vnd.visio", "application/x-visio"]],
      ["vsf", "application/vnd.vsf"],
      ["vst", "application/x-visio"],
      ["vsw", "application/x-visio"],
      ["vtu", "model/vnd.vtu"],
      ["vxml", "application/voicexml+xml"],
      ["w60", "application/wordperfect6.0"],
      ["w61", "application/wordperfect6.1"],
      ["w6w", "application/msword"],
      ["wad", "application/x-doom"],
      ["wav", ["audio/wav", "audio/x-wav"]],
      ["wax", "audio/x-ms-wax"],
      ["wb1", "application/x-qpro"],
      ["wbmp", "image/vnd.wap.wbmp"],
      ["wbs", "application/vnd.criticaltools.wbs+xml"],
      ["wbxml", "application/vnd.wap.wbxml"],
      ["wcm", "application/vnd.ms-works"],
      ["wdb", "application/vnd.ms-works"],
      ["web", "application/vnd.xara"],
      ["weba", "audio/webm"],
      ["webm", "video/webm"],
      ["webp", "image/webp"],
      ["wg", "application/vnd.pmi.widget"],
      ["wgt", "application/widget"],
      ["wiz", "application/msword"],
      ["wk1", "application/x-123"],
      ["wks", "application/vnd.ms-works"],
      ["wm", "video/x-ms-wm"],
      ["wma", "audio/x-ms-wma"],
      ["wmd", "application/x-ms-wmd"],
      ["wmf", ["windows/metafile", "application/x-msmetafile"]],
      ["wml", "text/vnd.wap.wml"],
      ["wmlc", "application/vnd.wap.wmlc"],
      ["wmls", "text/vnd.wap.wmlscript"],
      ["wmlsc", "application/vnd.wap.wmlscriptc"],
      ["wmv", "video/x-ms-wmv"],
      ["wmx", "video/x-ms-wmx"],
      ["wmz", "application/x-ms-wmz"],
      ["woff", "application/x-font-woff"],
      ["word", "application/msword"],
      ["wp", "application/wordperfect"],
      ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
      ["wp6", "application/wordperfect"],
      ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
      ["wpl", "application/vnd.ms-wpl"],
      ["wps", "application/vnd.ms-works"],
      ["wq1", "application/x-lotus"],
      ["wqd", "application/vnd.wqd"],
      ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
      ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
      ["wrz", ["model/vrml", "x-world/x-vrml"]],
      ["wsc", "text/scriplet"],
      ["wsdl", "application/wsdl+xml"],
      ["wspolicy", "application/wspolicy+xml"],
      ["wsrc", "application/x-wais-source"],
      ["wtb", "application/vnd.webturbo"],
      ["wtk", "application/x-wintalk"],
      ["wvx", "video/x-ms-wvx"],
      ["x-png", "image/png"],
      ["x3d", "application/vnd.hzn-3d-crossword"],
      ["xaf", "x-world/x-vrml"],
      ["xap", "application/x-silverlight-app"],
      ["xar", "application/vnd.xara"],
      ["xbap", "application/x-ms-xbap"],
      ["xbd", "application/vnd.fujixerox.docuworks.binder"],
      ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
      ["xdf", "application/xcap-diff+xml"],
      ["xdm", "application/vnd.syncml.dm+xml"],
      ["xdp", "application/vnd.adobe.xdp+xml"],
      ["xdr", "video/x-amt-demorun"],
      ["xdssc", "application/dssc+xml"],
      ["xdw", "application/vnd.fujixerox.docuworks"],
      ["xenc", "application/xenc+xml"],
      ["xer", "application/patch-ops-error+xml"],
      ["xfdf", "application/vnd.adobe.xfdf"],
      ["xfdl", "application/vnd.xfdl"],
      ["xgz", "xgl/drawing"],
      ["xhtml", "application/xhtml+xml"],
      ["xif", "image/vnd.xiff"],
      ["xl", "application/excel"],
      ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
      ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xld", ["application/excel", "application/x-excel"]],
      ["xlk", ["application/excel", "application/x-excel"]],
      ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
      ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
      ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
      ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
      ["xlv", ["application/excel", "application/x-excel"]],
      ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xm", "audio/xm"],
      ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
      ["xmz", "xgl/movie"],
      ["xo", "application/vnd.olpc-sugar"],
      ["xof", "x-world/x-vrml"],
      ["xop", "application/xop+xml"],
      ["xpi", "application/x-xpinstall"],
      ["xpix", "application/x-vnd.ls-xpix"],
      ["xpm", ["image/xpm", "image/x-xpixmap"]],
      ["xpr", "application/vnd.is-xpr"],
      ["xps", "application/vnd.ms-xpsdocument"],
      ["xpw", "application/vnd.intercon.formnet"],
      ["xslt", "application/xslt+xml"],
      ["xsm", "application/vnd.syncml+xml"],
      ["xspf", "application/xspf+xml"],
      ["xsr", "video/x-amt-showrun"],
      ["xul", "application/vnd.mozilla.xul+xml"],
      ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
      ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
      ["yang", "application/yang"],
      ["yin", "application/yin+xml"],
      ["z", ["application/x-compressed", "application/x-compress"]],
      ["zaz", "application/vnd.zzazz.deck+xml"],
      ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
      ["zir", "application/vnd.zul"],
      ["zmm", "application/vnd.handheld-entertainment+xml"],
      ["zoo", "application/octet-stream"],
      ["zsh", "text/x-script.zsh"]
    ]);
    module2.exports = {
      detectMimeType(filename) {
        if (!filename) {
          return defaultMimeType;
        }
        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
        let value = defaultMimeType;
        if (extensions.has(extension)) {
          value = extensions.get(extension);
        }
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      },
      detectExtension(mimeType) {
        if (!mimeType) {
          return defaultExtension;
        }
        let parts = (mimeType || "").toLowerCase().trim().split("/");
        let rootType = parts.shift().trim();
        let subType = parts.join("/").trim();
        if (mimeTypes.has(rootType + "/" + subType)) {
          let value = mimeTypes.get(rootType + "/" + subType);
          if (Array.isArray(value)) {
            return value[0];
          }
          return value;
        }
        switch (rootType) {
          case "text":
            return "txt";
          default:
            return "bin";
        }
      }
    };
  }
});

// node_modules/nodemailer/lib/punycode/index.js
var require_punycode = __commonJS({
  "node_modules/nodemailer/lib/punycode/index.js"(exports2, module2) {
    "use strict";
    var maxInt = 2147483647;
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128;
    var delimiter = "-";
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7F]/;
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    var errors = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;
    function error(type) {
      throw new RangeError(errors[type]);
    }
    function map(array, callback) {
      const result = [];
      let length = array.length;
      while (length--) {
        result[length] = callback(array[length]);
      }
      return result;
    }
    function mapDomain(domain, callback) {
      const parts = domain.split("@");
      let result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        domain = parts[1];
      }
      domain = domain.replace(regexSeparators, ".");
      const labels = domain.split(".");
      const encoded = map(labels, callback).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      const output = [];
      let counter = 0;
      const length = string.length;
      while (counter < length) {
        const value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          const extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    var ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
    var basicToDigit = function(codePoint) {
      if (codePoint >= 48 && codePoint < 58) {
        return 26 + (codePoint - 48);
      }
      if (codePoint >= 65 && codePoint < 91) {
        return codePoint - 65;
      }
      if (codePoint >= 97 && codePoint < 123) {
        return codePoint - 97;
      }
      return base;
    };
    var digitToBasic = function(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    var adapt = function(delta, numPoints, firstTime) {
      let k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (
        ;
        /* no initialization */
        delta > baseMinusTMin * tMax >> 1;
        k += base
      ) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    var decode = function(input) {
      const output = [];
      const inputLength = input.length;
      let i = 0;
      let n = initialN;
      let bias = initialBias;
      let basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (let j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        const oldi = i;
        for (let w = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          const digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base) {
            error("invalid-input");
          }
          if (digit > floor((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          const baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return String.fromCodePoint(...output);
    };
    var encode = function(input) {
      const output = [];
      input = ucs2decode(input);
      const inputLength = input.length;
      let n = initialN;
      let delta = 0;
      let bias = initialBias;
      for (const currentValue of input) {
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      const basicLength = output.length;
      let handledCPCount = basicLength;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        let m = maxInt;
        for (const currentValue of input) {
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue of input) {
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue === n) {
            let q = delta;
            for (let k = base; ; k += base) {
              const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              const qMinusT = q - t;
              const baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    };
    var toUnicode = function(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    };
    var toASCII = function(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    };
    var punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "2.3.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: ucs2decode,
        encode: ucs2encode
      },
      decode,
      encode,
      toASCII,
      toUnicode
    };
    module2.exports = punycode;
  }
});

// node_modules/nodemailer/lib/base64/index.js
var require_base64 = __commonJS({
  "node_modules/nodemailer/lib/base64/index.js"(exports2, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      return buffer.toString("base64");
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let result = [];
      let pos = 0;
      let chunkLength = lineLength * 1024;
      while (pos < str.length) {
        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp(".{" + lineLength + "}", "g"), "$&\r\n");
        result.push(wrappedLines);
        pos += chunkLength;
      }
      return result.join("");
    }
    var Encoder = class extends Transform {
      constructor(options) {
        super();
        this.options = options || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this._remainingBytes = false;
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return setImmediate(done);
        }
        this.inputBytes += chunk.length;
        if (this._remainingBytes && this._remainingBytes.length) {
          chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
          this._remainingBytes = false;
        }
        if (chunk.length % 3) {
          this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
          chunk = chunk.slice(0, chunk.length - chunk.length % 3);
        } else {
          this._remainingBytes = false;
        }
        let b64 = this._curLine + encode(chunk);
        if (this.options.lineLength) {
          b64 = wrap(b64, this.options.lineLength);
          let lastLF = b64.lastIndexOf("\n");
          if (lastLF < 0) {
            this._curLine = b64;
            b64 = "";
          } else {
            this._curLine = b64.substring(lastLF + 1);
            b64 = b64.substring(0, lastLF + 1);
            if (b64 && !b64.endsWith("\r\n")) {
              b64 += "\r\n";
            }
          }
        } else {
          this._curLine = "";
        }
        if (b64) {
          this.outputBytes += b64.length;
          this.push(Buffer.from(b64, "ascii"));
        }
        setImmediate(done);
      }
      _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
          this._curLine += encode(this._remainingBytes);
        }
        if (this._curLine) {
          this.outputBytes += this._curLine.length;
          this.push(Buffer.from(this._curLine, "ascii"));
          this._curLine = "";
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/qp/index.js
var require_qp = __commonJS({
  "node_modules/nodemailer/lib/qp/index.js"(exports2, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      let ranges = [
        // https://tools.ietf.org/html/rfc2045#section-6.7
        [9],
        // <TAB>
        [10],
        // <LF>
        [13],
        // <CR>
        [32, 60],
        // <SP>!"#$%&'()*+,-./0123456789:;
        [62, 126]
        // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
      ];
      let result = "";
      let ord;
      for (let i = 0, len = buffer.length; i < len; i++) {
        ord = buffer[i];
        if (checkRanges(ord, ranges) && !((ord === 32 || ord === 9) && (i === len - 1 || buffer[i + 1] === 10 || buffer[i + 1] === 13))) {
          result += String.fromCharCode(ord);
          continue;
        }
        result += "=" + (ord < 16 ? "0" : "") + ord.toString(16).toUpperCase();
      }
      return result;
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let pos = 0;
      let len = str.length;
      let match, code, line;
      let lineMargin = Math.floor(lineLength / 3);
      let result = "";
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (match = line.match(/\r\n/)) {
          line = line.substr(0, match.index + match[0].length);
          result += line;
          pos += line.length;
          continue;
        }
        if (line.substr(-1) === "\n") {
          result += line;
          pos += line.length;
          continue;
        } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
          line = line.substr(0, line.length - (match[0].length - 1));
          result += line;
          pos += line.length;
          continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
          line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
          if (match = line.match(/[=][\da-f]{0,1}$/i)) {
            line = line.substr(0, line.length - match[0].length);
          }
          while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
            code = parseInt(match[0].substr(1, 2), 16);
            if (code < 128) {
              break;
            }
            line = line.substr(0, line.length - 3);
            if (code >= 192) {
              break;
            }
          }
        }
        if (pos + line.length < len && line.substr(-1) !== "\n") {
          if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
            line = line.substr(0, line.length - 3);
          } else if (line.length === lineLength) {
            line = line.substr(0, line.length - 1);
          }
          pos += line.length;
          line += "=\r\n";
        } else {
          pos += line.length;
        }
        result += line;
      }
      return result;
    }
    function checkRanges(nr, ranges) {
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (!ranges[i].length) {
          continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
          return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
          return true;
        }
      }
      return false;
    }
    var Encoder = class extends Transform {
      constructor(options) {
        super();
        this.options = options || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        let qp;
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return done();
        }
        this.inputBytes += chunk.length;
        if (this.options.lineLength) {
          qp = this._curLine + encode(chunk);
          qp = wrap(qp, this.options.lineLength);
          qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
            this._curLine = lastLine;
            return lineBreak;
          });
          if (qp) {
            this.outputBytes += qp.length;
            this.push(qp);
          }
        } else {
          qp = encode(chunk);
          this.outputBytes += qp.length;
          this.push(qp, "ascii");
        }
        done();
      }
      _flush(done) {
        if (this._curLine) {
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/mime-funcs/index.js
var require_mime_funcs = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/index.js"(exports2, module2) {
    "use strict";
    var base64 = require_base64();
    var qp = require_qp();
    var mimeTypes = require_mime_types();
    module2.exports = {
      /**
       * Checks if a value is plaintext string (uses only printable 7bit chars)
       *
       * @param {String} value String to be tested
       * @returns {Boolean} true if it is a plaintext string
       */
      isPlainText(value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== "string" || re.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      /**
       * Checks if a multi line string containes lines longer than the selected value.
       *
       * Useful when detecting if a mail message needs any processing at all –
       * if only plaintext characters are used and lines are short, then there is
       * no need to encode the values in any way. If the value is plaintext but has
       * longer lines then allowed, then use format=flowed
       *
       * @param {Number} lineLength Max line length to check for
       * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
       */
      hasLongerLines(str, lineLength) {
        if (str.length > 128 * 1024) {
          return true;
        }
        return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
      },
      /**
       * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
       *
       * @param {String|Buffer} data String to be encoded
       * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
       * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
       * @return {String} Single or several mime words joined together
       */
      encodeWord(data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;
        let encodedStr;
        let toCharset = "UTF-8";
        if (maxLength && maxLength > 7 + toCharset.length) {
          maxLength -= 7 + toCharset.length;
        }
        if (mimeWordEncoding === "Q") {
          encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
            let ord = chr.charCodeAt(0).toString(16).toUpperCase();
            if (chr === " ") {
              return "_";
            } else {
              return "=" + (ord.length === 1 ? "0" + ord : ord);
            }
          });
        } else if (mimeWordEncoding === "B") {
          encodedStr = typeof data === "string" ? data : base64.encode(data);
          maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
        }
        if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : base64.encode(data)).length > maxLength) {
          if (mimeWordEncoding === "Q") {
            encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
          } else {
            let parts = [];
            let lpart = "";
            for (let i = 0, len = encodedStr.length; i < len; i++) {
              let chr = encodedStr.charAt(i);
              if (/[\ud83c\ud83d\ud83e]/.test(chr) && i < len - 1) {
                chr += encodedStr.charAt(++i);
              }
              if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                lpart += chr;
              } else {
                parts.push(base64.encode(lpart));
                lpart = chr;
              }
            }
            if (lpart) {
              parts.push(base64.encode(lpart));
            }
            if (parts.length > 1) {
              encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
            } else {
              encodedStr = parts.join("");
            }
          }
        } else if (mimeWordEncoding === "B") {
          encodedStr = base64.encode(data);
        }
        return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
      },
      /**
       * Finds word sequences with non ascii text and converts these to mime words
       *
       * @param {String} value String to be encoded
       * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
       * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
       * @param {Boolean} [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
       * @return {String} String with possible mime words
       */
      encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;
        let encodedValue;
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
          return value;
        }
        if (encodeAll) {
          return this.encodeWord(value, mimeWordEncoding, maxLength);
        }
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
          return value;
        }
        let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
          index: 0
        }).index;
        let endIndex = lastMatch.index + (lastMatch[1] || "").length;
        encodedValue = (startIndex ? value.substr(0, startIndex) : "") + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
        return encodedValue;
      },
      /**
       * Joins parsed header value together as 'value; param1=value1; param2=value2'
       * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
       *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
       * @param {Object} structured Parsed header value
       * @return {String} joined header value
       */
      buildHeaderValue(structured) {
        let paramsArray = [];
        Object.keys(structured.params || {}).forEach((param) => {
          let value = structured.params[param];
          if (!this.isPlainText(value, true) || value.length >= 75) {
            this.buildHeaderParam(param, value, 50).forEach((encodedParam) => {
              if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
                paramsArray.push(encodedParam.key + "=" + encodedParam.value);
              } else {
                paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
              }
            });
          } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
            paramsArray.push(param + "=" + JSON.stringify(value));
          } else {
            paramsArray.push(param + "=" + value);
          }
        });
        return structured.value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
      },
      /**
       * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
       * Useful for splitting long parameter values.
       *
       * For example
       *      title="unicode string"
       * becomes
       *     title*0*=utf-8''unicode
       *     title*1*=%20string
       *
       * @param {String|Buffer} data String to be encoded
       * @param {Number} [maxLength=50] Max length for generated chunks
       * @param {String} [fromCharset='UTF-8'] Source sharacter set
       * @return {Array} A list of encoded keys and headers
       */
      buildHeaderParam(key, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === "string" ? data : (data || "").toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;
        maxLength = maxLength || 50;
        if (this.isPlainText(data, true)) {
          if (encodedStr.length <= maxLength) {
            return [
              {
                key,
                value: encodedStr
              }
            ];
          }
          encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
            list.push({
              line: str
            });
            return "";
          });
          if (encodedStr) {
            list.push({
              line: encodedStr
            });
          }
        } else {
          if (/[\uD800-\uDBFF]/.test(encodedStr)) {
            encodedStrArr = [];
            for (i = 0, len = encodedStr.length; i < len; i++) {
              chr = encodedStr.charAt(i);
              ord = chr.charCodeAt(0);
              if (ord >= 55296 && ord <= 56319 && i < len - 1) {
                chr += encodedStr.charAt(i + 1);
                encodedStrArr.push(chr);
                i++;
              } else {
                encodedStrArr.push(chr);
              }
            }
            encodedStr = encodedStrArr;
          }
          line = "utf-8''";
          let encoded = true;
          startPos = 0;
          for (i = 0, len = encodedStr.length; i < len; i++) {
            chr = encodedStr[i];
            if (encoded) {
              chr = this.safeEncodeURIComponent(chr);
            } else {
              chr = chr === " " ? chr : this.safeEncodeURIComponent(chr);
              if (chr !== encodedStr[i]) {
                if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                  list.push({
                    line,
                    encoded
                  });
                  line = "";
                  startPos = i - 1;
                } else {
                  encoded = true;
                  i = startPos;
                  line = "";
                  continue;
                }
              }
            }
            if ((line + chr).length >= maxLength) {
              list.push({
                line,
                encoded
              });
              line = chr = encodedStr[i] === " " ? " " : this.safeEncodeURIComponent(encodedStr[i]);
              if (chr === encodedStr[i]) {
                encoded = false;
                startPos = i - 1;
              } else {
                encoded = true;
              }
            } else {
              line += chr;
            }
          }
          if (line) {
            list.push({
              line,
              encoded
            });
          }
        }
        return list.map((item, i2) => ({
          // encoded lines: {name}*{part}*
          // unencoded lines: {name}*{part}
          // if any line needs to be encoded then the first line (part==0) is always encoded
          key: key + "*" + i2 + (item.encoded ? "*" : ""),
          value: item.line
        }));
      },
      /**
       * Parses a header value with key=value arguments into a structured
       * object.
       *
       *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
       *   {
       *     'value': 'text/plain',
       *     'params': {
       *       'charset': 'UTF-8'
       *     }
       *   }
       *
       * @param {String} str Header value
       * @return {Object} Header value as a parsed structure
       */
      parseHeaderValue(str) {
        let response = {
          value: false,
          params: {}
        };
        let key = false;
        let value = "";
        let type = "value";
        let quote = false;
        let escaped = false;
        let chr;
        for (let i = 0, len = str.length; i < len; i++) {
          chr = str.charAt(i);
          if (type === "key") {
            if (chr === "=") {
              key = value.trim().toLowerCase();
              type = "value";
              value = "";
              continue;
            }
            value += chr;
          } else {
            if (escaped) {
              value += chr;
            } else if (chr === "\\") {
              escaped = true;
              continue;
            } else if (quote && chr === quote) {
              quote = false;
            } else if (!quote && chr === '"') {
              quote = chr;
            } else if (!quote && chr === ";") {
              if (key === false) {
                response.value = value.trim();
              } else {
                response.params[key] = value.trim();
              }
              type = "key";
              value = "";
            } else {
              value += chr;
            }
            escaped = false;
          }
        }
        if (type === "value") {
          if (key === false) {
            response.value = value.trim();
          } else {
            response.params[key] = value.trim();
          }
        } else if (value.trim()) {
          response.params[value.trim().toLowerCase()] = "";
        }
        Object.keys(response.params).forEach((key2) => {
          let actualKey, nr, match, value2;
          if (match = key2.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
            actualKey = key2.substr(0, match.index);
            nr = Number(match[2] || match[3]) || 0;
            if (!response.params[actualKey] || typeof response.params[actualKey] !== "object") {
              response.params[actualKey] = {
                charset: false,
                values: []
              };
            }
            value2 = response.params[key2];
            if (nr === 0 && match[0].substr(-1) === "*" && (match = value2.match(/^([^']*)'[^']*'(.*)$/))) {
              response.params[actualKey].charset = match[1] || "iso-8859-1";
              value2 = match[2];
            }
            response.params[actualKey].values[nr] = value2;
            delete response.params[key2];
          }
        });
        Object.keys(response.params).forEach((key2) => {
          let value2;
          if (response.params[key2] && Array.isArray(response.params[key2].values)) {
            value2 = response.params[key2].values.map((val) => val || "").join("");
            if (response.params[key2].charset) {
              response.params[key2] = "=?" + response.params[key2].charset + "?Q?" + value2.replace(/[=?_\s]/g, (s) => {
                let c = s.charCodeAt(0).toString(16);
                if (s === " ") {
                  return "_";
                } else {
                  return "%" + (c.length < 2 ? "0" : "") + c;
                }
              }).replace(/%/g, "=") + "?=";
            } else {
              response.params[key2] = value2;
            }
          }
        });
        return response;
      },
      /**
       * Returns file extension for a content type string. If no suitable extensions
       * are found, 'bin' is used as the default extension
       *
       * @param {String} mimeType Content type to be checked for
       * @return {String} File extension
       */
      detectExtension: (mimeType) => mimeTypes.detectExtension(mimeType),
      /**
       * Returns content type for a file extension. If no suitable content types
       * are found, 'application/octet-stream' is used as the default content type
       *
       * @param {String} extension Extension to be checked for
       * @return {String} File extension
       */
      detectMimeType: (extension) => mimeTypes.detectMimeType(extension),
      /**
       * Folds long lines, useful for folding header lines (afterSpace=false) and
       * flowed text (afterSpace=true)
       *
       * @param {String} str String to be folded
       * @param {Number} [lineLength=76] Maximum length of a line
       * @param {Boolean} afterSpace If true, leave a space in th end of a line
       * @return {String} String with folded lines
       */
      foldLines(str, lineLength, afterSpace) {
        str = (str || "").toString();
        lineLength = lineLength || 76;
        let pos = 0, len = str.length, result = "", line, match;
        while (pos < len) {
          line = str.substr(pos, lineLength);
          if (line.length < lineLength) {
            result += line;
            break;
          }
          if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
            line = match[0];
            result += line;
            pos += line.length;
            continue;
          } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
            line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
          } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
            line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
          }
          result += line;
          pos += line.length;
          if (pos < len) {
            result += "\r\n";
          }
        }
        return result;
      },
      /**
       * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
       *
       * @param {String} str Mime encoded string to be split up
       * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
       * @return {Array} Split string
       */
      splitMimeEncodedString: (str, maxlen) => {
        let curLine, match, chr, done, lines = [];
        maxlen = Math.max(maxlen || 0, 12);
        while (str.length) {
          curLine = str.substr(0, maxlen);
          if (match = curLine.match(/[=][0-9A-F]?$/i)) {
            curLine = curLine.substr(0, match.index);
          }
          done = false;
          while (!done) {
            done = true;
            if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
              chr = parseInt(match[1], 16);
              if (chr < 194 && chr > 127) {
                curLine = curLine.substr(0, curLine.length - 3);
                done = false;
              }
            }
          }
          if (curLine.length) {
            lines.push(curLine);
          }
          str = str.substr(curLine.length);
        }
        return lines;
      },
      encodeURICharComponent: (chr) => {
        let res = "";
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();
        if (ord.length % 2) {
          ord = "0" + ord;
        }
        if (ord.length > 2) {
          for (let i = 0, len = ord.length / 2; i < len; i++) {
            res += "%" + ord.substr(i, 2);
          }
        } else {
          res += "%" + ord;
        }
        return res;
      },
      safeEncodeURIComponent(str) {
        str = (str || "").toString();
        try {
          str = encodeURIComponent(str);
        } catch (_E) {
          return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, "");
        }
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => this.encodeURICharComponent(chr));
      }
    };
  }
});

// node_modules/nodemailer/lib/addressparser/index.js
var require_addressparser = __commonJS({
  "node_modules/nodemailer/lib/addressparser/index.js"(exports2, module2) {
    "use strict";
    function _handleAddress(tokens, depth) {
      let isGroup = false;
      let state = "text";
      let address;
      let addresses = [];
      let data = {
        address: [],
        comment: [],
        group: [],
        text: [],
        textWasQuoted: []
        // Track which text tokens came from inside quotes
      };
      let i;
      let len;
      let insideQuotes = false;
      for (i = 0, len = tokens.length; i < len; i++) {
        let token = tokens[i];
        let prevToken = i ? tokens[i - 1] : null;
        if (token.type === "operator") {
          switch (token.value) {
            case "<":
              state = "address";
              insideQuotes = false;
              break;
            case "(":
              state = "comment";
              insideQuotes = false;
              break;
            case ":":
              state = "group";
              isGroup = true;
              insideQuotes = false;
              break;
            case '"':
              insideQuotes = !insideQuotes;
              state = "text";
              break;
            default:
              state = "text";
              insideQuotes = false;
              break;
          }
        } else if (token.value) {
          if (state === "address") {
            token.value = token.value.replace(/^[^<]*<\s*/, "");
          }
          if (prevToken && prevToken.noBreak && data[state].length) {
            data[state][data[state].length - 1] += token.value;
            if (state === "text" && insideQuotes) {
              data.textWasQuoted[data.textWasQuoted.length - 1] = true;
            }
          } else {
            data[state].push(token.value);
            if (state === "text") {
              data.textWasQuoted.push(insideQuotes);
            }
          }
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (isGroup) {
        data.text = data.text.join(" ");
        let groupMembers = [];
        if (data.group.length) {
          let parsedGroup = addressparser(data.group.join(","), { _depth: depth + 1 });
          parsedGroup.forEach((member) => {
            if (member.group) {
              groupMembers = groupMembers.concat(member.group);
            } else {
              groupMembers.push(member);
            }
          });
        }
        addresses.push({
          name: data.text || address && address.name,
          group: groupMembers
        });
      } else {
        if (!data.address.length && data.text.length) {
          for (i = data.text.length - 1; i >= 0; i--) {
            if (!data.textWasQuoted[i] && data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
              data.address = data.text.splice(i, 1);
              data.textWasQuoted.splice(i, 1);
              break;
            }
          }
          let _regexHandler = function(address2) {
            if (!data.address.length) {
              data.address = [address2.trim()];
              return " ";
            } else {
              return address2;
            }
          };
          if (!data.address.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
              if (!data.textWasQuoted[i]) {
                data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
                if (data.address.length) {
                  break;
                }
              }
            }
          }
        }
        if (!data.text.length && data.comment.length) {
          data.text = data.comment;
          data.comment = [];
        }
        if (data.address.length > 1) {
          data.text = data.text.concat(data.address.splice(1));
        }
        data.text = data.text.join(" ");
        data.address = data.address.join(" ");
        if (!data.address && isGroup) {
          return [];
        } else {
          address = {
            address: data.address || data.text || "",
            name: data.text || data.address || ""
          };
          if (address.address === address.name) {
            if ((address.address || "").match(/@/)) {
              address.name = "";
            } else {
              address.address = "";
            }
          }
          addresses.push(address);
        }
      }
      return addresses;
    }
    var Tokenizer = class {
      constructor(str) {
        this.str = (str || "").toString();
        this.operatorCurrent = "";
        this.operatorExpecting = "";
        this.node = null;
        this.escaped = false;
        this.list = [];
        this.operators = {
          '"': '"',
          "(": ")",
          "<": ">",
          ",": "",
          ":": ";",
          // Semicolons are not a legal delimiter per the RFC2822 grammar other
          // than for terminating a group, but they are also not valid for any
          // other use in this context.  Given that some mail clients have
          // historically allowed the semicolon as a delimiter equivalent to the
          // comma in their UI, it makes sense to treat them the same as a comma
          // when used outside of a group.
          ";": ""
        };
      }
      /**
       * Tokenizes the original input string
       *
       * @return {Array} An array of operator|text tokens
       */
      tokenize() {
        let list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
          let chr = this.str.charAt(i);
          let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
          this.checkChar(chr, nextChr);
        }
        this.list.forEach((node) => {
          node.value = (node.value || "").toString().trim();
          if (node.value) {
            list.push(node);
          }
        });
        return list;
      }
      /**
       * Checks if a character is an operator or text and acts accordingly
       *
       * @param {String} chr Character from the address field
       */
      checkChar(chr, nextChr) {
        if (this.escaped) {
        } else if (chr === this.operatorExpecting) {
          this.node = {
            type: "operator",
            value: chr
          };
          if (nextChr && ![" ", "	", "\r", "\n", ",", ";"].includes(nextChr)) {
            this.node.noBreak = true;
          }
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = "";
          this.escaped = false;
          return;
        } else if (!this.operatorExpecting && chr in this.operators) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = this.operators[chr];
          this.escaped = false;
          return;
        } else if (['"', "'"].includes(this.operatorExpecting) && chr === "\\") {
          this.escaped = true;
          return;
        }
        if (!this.node) {
          this.node = {
            type: "text",
            value: ""
          };
          this.list.push(this.node);
        }
        if (chr === "\n") {
          chr = " ";
        }
        if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
          this.node.value += chr;
        }
        this.escaped = false;
      }
    };
    var MAX_NESTED_GROUP_DEPTH = 50;
    function addressparser(str, options) {
      options = options || {};
      let depth = options._depth || 0;
      if (depth > MAX_NESTED_GROUP_DEPTH) {
        return [];
      }
      let tokenizer = new Tokenizer(str);
      let tokens = tokenizer.tokenize();
      let addresses = [];
      let address = [];
      let parsedAddresses = [];
      tokens.forEach((token) => {
        if (token.type === "operator" && (token.value === "," || token.value === ";")) {
          if (address.length) {
            addresses.push(address);
          }
          address = [];
        } else {
          address.push(token);
        }
      });
      if (address.length) {
        addresses.push(address);
      }
      addresses.forEach((address2) => {
        address2 = _handleAddress(address2, depth);
        if (address2.length) {
          parsedAddresses = parsedAddresses.concat(address2);
        }
      });
      if (options.flatten) {
        let addresses2 = [];
        let walkAddressList = (list) => {
          list.forEach((address2) => {
            if (address2.group) {
              return walkAddressList(address2.group);
            } else {
              addresses2.push(address2);
            }
          });
        };
        walkAddressList(parsedAddresses);
        return addresses2;
      }
      return parsedAddresses;
    }
    module2.exports = addressparser;
  }
});

// node_modules/nodemailer/lib/mime-node/last-newline.js
var require_last_newline = __commonJS({
  "node_modules/nodemailer/lib/mime-node/last-newline.js"(exports2, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var LastNewline = class extends Transform {
      constructor() {
        super();
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        if (chunk.length) {
          this.lastByte = chunk[chunk.length - 1];
        }
        this.push(chunk);
        done();
      }
      _flush(done) {
        if (this.lastByte === 10) {
          return done();
        }
        if (this.lastByte === 13) {
          this.push(Buffer.from("\n"));
          return done();
        }
        this.push(Buffer.from("\r\n"));
        return done();
      }
    };
    module2.exports = LastNewline;
  }
});

// node_modules/nodemailer/lib/mime-node/le-windows.js
var require_le_windows = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-windows.js"(exports2, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
        this.lastByte = false;
      }
      /**
       * Escapes dots
       */
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                this.push(buf);
              }
              this.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/le-unix.js
var require_le_unix = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-unix.js"(exports2, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
      }
      /**
       * Escapes dots
       */
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 13) {
            buf = chunk.slice(lastPos, i);
            lastPos = i + 1;
            this.push(buf);
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/index.js
var require_mime_node = __commonJS({
  "node_modules/nodemailer/lib/mime-node/index.js"(exports2, module2) {
    "use strict";
    var crypto = require("crypto");
    var fs = require("fs");
    var punycode = require_punycode();
    var PassThrough = require("stream").PassThrough;
    var shared = require_shared();
    var mimeFuncs = require_mime_funcs();
    var qp = require_qp();
    var base64 = require_base64();
    var addressparser = require_addressparser();
    var nmfetch = require_fetch();
    var errors = require_errors();
    var LastNewline = require_last_newline();
    var LeWindows = require_le_windows();
    var LeUnix = require_le_unix();
    var MimeNode = class _MimeNode {
      constructor(contentType, options) {
        this.nodeCounter = 0;
        options = options || {};
        this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString("hex");
        this.boundaryPrefix = options.boundaryPrefix || "--_NmP";
        this.disableFileAccess = !!options.disableFileAccess;
        this.disableUrlAccess = !!options.disableUrlAccess;
        this.normalizeHeaderKey = options.normalizeHeaderKey;
        this.date = /* @__PURE__ */ new Date();
        this.rootNode = options.rootNode || this;
        this.keepBcc = !!options.keepBcc;
        if (options.filename) {
          this.filename = options.filename;
          if (!contentType) {
            contentType = mimeFuncs.detectMimeType(this.filename.split(".").pop());
          }
        }
        this.textEncoding = (options.textEncoding || "").toString().trim().charAt(0).toUpperCase();
        this.parentNode = options.parentNode;
        this.hostname = options.hostname;
        this.newline = options.newline;
        this.childNodes = [];
        this._nodeId = ++this.rootNode.nodeCounter;
        this._headers = [];
        this._isPlainText = false;
        this._hasLongLines = false;
        this._envelope = false;
        this._raw = false;
        this._transforms = [];
        this._processFuncs = [];
        if (contentType) {
          this.setHeader("Content-Type", contentType);
        }
      }
      /////// PUBLIC METHODS
      /**
       * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
       *
       * @param {String} [contentType] Optional content type
       * @param {Object} [options] Optional options object
       * @return {Object} Created node object
       */
      createChild(contentType, options) {
        if (!options && typeof contentType === "object") {
          options = contentType;
          contentType = void 0;
        }
        let node = new _MimeNode(contentType, options);
        this.appendChild(node);
        return node;
      }
      /**
       * Appends an existing node to the mime tree. Removes the node from an existing
       * tree if needed
       *
       * @param {Object} childNode node to be appended
       * @return {Object} Appended node object
       */
      appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
          childNode.rootNode = this.rootNode;
          childNode._nodeId = ++this.rootNode.nodeCounter;
        }
        childNode.parentNode = this;
        this.childNodes.push(childNode);
        return childNode;
      }
      /**
       * Replaces current node with another node
       *
       * @param {Object} node Replacement node
       * @return {Object} Replacement node
       */
      replace(node) {
        if (node === this) {
          return this;
        }
        this.parentNode.childNodes.forEach((childNode, i) => {
          if (childNode === this) {
            node.rootNode = this.rootNode;
            node.parentNode = this.parentNode;
            node._nodeId = this._nodeId;
            this.rootNode = this;
            this.parentNode = void 0;
            node.parentNode.childNodes[i] = node;
          }
        });
        return node;
      }
      /**
       * Removes current node from the mime tree
       *
       * @return {Object} removed node
       */
      remove() {
        if (!this.parentNode) {
          return this;
        }
        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
          if (this.parentNode.childNodes[i] === this) {
            this.parentNode.childNodes.splice(i, 1);
            this.parentNode = void 0;
            this.rootNode = this;
            return this;
          }
        }
      }
      /**
       * Sets a header value. If the value for selected key exists, it is overwritten.
       * You can set multiple values as well by using [{key:'', value:''}] or
       * {key: 'value'} as the first argument.
       *
       * @param {String|Array|Object} key Header key or a list of key value pairs
       * @param {String} value Header value
       * @return {Object} current node
       */
      setHeader(key, value) {
        let added = false, headerValue;
        if (!value && key && typeof key === "object") {
          if (key.key && "value" in key) {
            this.setHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.setHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.setHeader(i, key[i]);
            });
          }
          return this;
        }
        key = this._normalizeHeaderKey(key);
        headerValue = {
          key,
          value
        };
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            if (!added) {
              this._headers[i] = headerValue;
              added = true;
            } else {
              this._headers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
        if (!added) {
          this._headers.push(headerValue);
        }
        return this;
      }
      /**
       * Adds a header value. If the value for selected key exists, the value is appended
       * as a new field and old one is not touched.
       * You can set multiple values as well by using [{key:'', value:''}] or
       * {key: 'value'} as the first argument.
       *
       * @param {String|Array|Object} key Header key or a list of key value pairs
       * @param {String} value Header value
       * @return {Object} current node
       */
      addHeader(key, value) {
        if (!value && key && typeof key === "object") {
          if (key.key && key.value) {
            this.addHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.addHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.addHeader(i, key[i]);
            });
          }
          return this;
        } else if (Array.isArray(value)) {
          value.forEach((val) => {
            this.addHeader(key, val);
          });
          return this;
        }
        this._headers.push({
          key: this._normalizeHeaderKey(key),
          value
        });
        return this;
      }
      /**
       * Retrieves the first mathcing value of a selected key
       *
       * @param {String} key Key to search for
       * @retun {String} Value for the key
       */
      getHeader(key) {
        key = this._normalizeHeaderKey(key);
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            return this._headers[i].value;
          }
        }
      }
      /**
       * Sets body content for current node. If the value is a string, charset is added automatically
       * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
       * the charset yourself
       *
       * @param (String|Buffer) content Body content
       * @return {Object} current node
       */
      setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this.content.removeListener("error", this._contentErrorHandler);
            this.content = err;
          };
          this.content.once("error", this._contentErrorHandler);
        } else if (typeof this.content === "string") {
          this._isPlainText = mimeFuncs.isPlainText(this.content);
          if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
            this._hasLongLines = true;
          }
        }
        return this;
      }
      build(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            buf.push(chunk);
            buflen += chunk.length;
          }
        });
        stream.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        stream.once("end", (chunk) => {
          if (returned) {
            return;
          }
          returned = true;
          if (chunk && chunk.length) {
            buf.push(chunk);
            buflen += chunk.length;
          }
          return callback(null, Buffer.concat(buf, buflen));
        });
        return promise;
      }
      getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
        if (this.content) {
          transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
          if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
            if (/^text\//i.test(contentType)) {
              if (this._isPlainText && !this._hasLongLines) {
                transferEncoding = "7bit";
              } else if (typeof this.content === "string" || this.content instanceof Buffer) {
                transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
              } else {
                transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
              }
            } else if (!/^(multipart|message)\//i.test(contentType)) {
              transferEncoding = transferEncoding || "base64";
            }
          }
        }
        return transferEncoding;
      }
      /**
       * Builds the header block for the mime node. Append \r\n\r\n before writing the content
       *
       * @returns {String} Headers
       */
      buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];
        if (transferEncoding) {
          this.setHeader("Content-Transfer-Encoding", transferEncoding);
        }
        if (this.filename && !this.getHeader("Content-Disposition")) {
          this.setHeader("Content-Disposition", "attachment");
        }
        if (this.rootNode === this) {
          if (!this.getHeader("Date")) {
            this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
          }
          this.messageId();
          if (!this.getHeader("MIME-Version")) {
            this.setHeader("MIME-Version", "1.0");
          }
          for (let i = this._headers.length - 2; i >= 0; i--) {
            let header = this._headers[i];
            if (header.key === "Content-Type") {
              this._headers.splice(i, 1);
              this._headers.push(header);
            }
          }
        }
        this._headers.forEach((header) => {
          let key = header.key;
          let value = header.value;
          let structured;
          let param;
          let options = {};
          let formattedHeaders = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
          if (value && typeof value === "object" && !formattedHeaders.includes(key)) {
            Object.keys(value).forEach((key2) => {
              if (key2 !== "value") {
                options[key2] = value[key2];
              }
            });
            value = (value.value || "").toString();
            if (!value.trim()) {
              return;
            }
          }
          if (options.prepared) {
            if (options.foldLines) {
              headers.push(mimeFuncs.foldLines(key + ": " + value));
            } else {
              headers.push(key + ": " + value);
            }
            return;
          }
          switch (header.key) {
            case "Content-Disposition":
              structured = mimeFuncs.parseHeaderValue(value);
              if (this.filename) {
                structured.params.filename = this.filename;
              }
              value = mimeFuncs.buildHeaderValue(structured);
              break;
            case "Content-Type":
              structured = mimeFuncs.parseHeaderValue(value);
              this._handleContentType(structured);
              if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
                structured.params.charset = "utf-8";
              }
              value = mimeFuncs.buildHeaderValue(structured);
              if (this.filename) {
                param = this._encodeWords(this.filename);
                if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                  param = '"' + param + '"';
                }
                value += "; name=" + param;
              }
              break;
            case "Bcc":
              if (!this.keepBcc) {
                return;
              }
              break;
          }
          value = this._encodeHeaderValue(key, value);
          if (!(value || "").toString().trim()) {
            return;
          }
          if (typeof this.normalizeHeaderKey === "function") {
            let normalized = this.normalizeHeaderKey(key, value);
            if (normalized && typeof normalized === "string" && normalized.length) {
              key = normalized;
            }
          }
          headers.push(mimeFuncs.foldLines(key + ": " + value, 76));
        });
        return headers.join("\r\n");
      }
      /**
       * Streams the rfc2822 message from the current node. If this is a root node,
       * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
       *
       * @return {String} Compiled message
       */
      createReadStream(options) {
        options = options || {};
        let stream = new PassThrough(options);
        let outputStream = stream;
        let transform;
        this.stream(stream, options, (err) => {
          if (err) {
            outputStream.emit("error", err);
            return;
          }
          stream.end();
        });
        for (let i = 0, len = this._transforms.length; i < len; i++) {
          transform = typeof this._transforms[i] === "function" ? this._transforms[i]() : this._transforms[i];
          outputStream.once("error", (err) => {
            transform.emit("error", err);
          });
          outputStream = outputStream.pipe(transform);
        }
        transform = new LastNewline();
        outputStream.once("error", (err) => {
          transform.emit("error", err);
        });
        outputStream = outputStream.pipe(transform);
        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
          transform = this._processFuncs[i];
          outputStream = transform(outputStream);
        }
        if (this.newline) {
          const winbreak = ["win", "windows", "dos", "\r\n"].includes(this.newline.toString().toLowerCase());
          const newlineTransform = winbreak ? new LeWindows() : new LeUnix();
          const stream2 = outputStream.pipe(newlineTransform);
          outputStream.on("error", (err) => stream2.emit("error", err));
          return stream2;
        }
        return outputStream;
      }
      /**
       * Appends a transform stream object to the transforms list. Final output
       * is passed through this stream before exposing
       *
       * @param {Object} transform Read-Write stream
       */
      transform(transform) {
        this._transforms.push(transform);
      }
      /**
       * Appends a post process function. The functon is run after transforms and
       * uses the following syntax
       *
       *   processFunc(input) -> outputStream
       *
       * @param {Object} processFunc Read-Write stream
       */
      processFunc(processFunc) {
        this._processFuncs.push(processFunc);
      }
      stream(outputStream, options, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;
        let returned = false;
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          done(err);
        };
        let finalize = () => {
          let childId = 0;
          let processChildNode = () => {
            if (childId >= this.childNodes.length) {
              outputStream.write("\r\n--" + this.boundary + "--\r\n");
              return callback();
            }
            let child = this.childNodes[childId++];
            outputStream.write((childId > 1 ? "\r\n" : "") + "--" + this.boundary + "\r\n");
            child.stream(outputStream, options, (err) => {
              if (err) {
                return callback(err);
              }
              setImmediate(processChildNode);
            });
          };
          if (this.multipart) {
            setImmediate(processChildNode);
          } else {
            return callback();
          }
        };
        let sendContent = () => {
          if (this.content) {
            if (Object.prototype.toString.call(this.content) === "[object Error]") {
              return callback(this.content);
            }
            if (typeof this.content.pipe === "function") {
              this.content.removeListener("error", this._contentErrorHandler);
              this._contentErrorHandler = (err) => callback(err);
              this.content.once("error", this._contentErrorHandler);
            }
            let createStream = () => {
              if (["quoted-printable", "base64"].includes(transferEncoding)) {
                contentStream = new (transferEncoding === "base64" ? base64 : qp).Encoder(options);
                contentStream.pipe(outputStream, {
                  end: false
                });
                contentStream.once("end", finalize);
                contentStream.once("error", (err) => callback(err));
                localStream = this._getStream(this.content);
                localStream.pipe(contentStream);
              } else {
                localStream = this._getStream(this.content);
                localStream.pipe(outputStream, {
                  end: false
                });
                localStream.once("end", finalize);
              }
              localStream.once("error", (err) => callback(err));
            };
            if (this.content._resolve) {
              let chunks = [];
              let chunklen = 0;
              let returned2 = false;
              let sourceStream = this._getStream(this.content);
              sourceStream.on("error", (err) => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                callback(err);
              });
              sourceStream.on("readable", () => {
                let chunk;
                while ((chunk = sourceStream.read()) !== null) {
                  chunks.push(chunk);
                  chunklen += chunk.length;
                }
              });
              sourceStream.on("end", () => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                this.content._resolve = false;
                this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                setImmediate(createStream);
              });
            } else {
              setImmediate(createStream);
            }
            return;
          } else {
            return setImmediate(finalize);
          }
        };
        if (this._raw) {
          setImmediate(() => {
            if (Object.prototype.toString.call(this._raw) === "[object Error]") {
              return callback(this._raw);
            }
            if (typeof this._raw.pipe === "function") {
              this._raw.removeListener("error", this._contentErrorHandler);
            }
            let raw = this._getStream(this._raw);
            raw.pipe(outputStream, {
              end: false
            });
            raw.on("error", (err) => outputStream.emit("error", err));
            raw.on("end", finalize);
          });
        } else {
          outputStream.write(this.buildHeaders() + "\r\n\r\n");
          setImmediate(sendContent);
        }
      }
      /**
       * Sets envelope to be used instead of the generated one
       *
       * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
       */
      setEnvelope(envelope) {
        let list;
        this._envelope = {
          from: false,
          to: []
        };
        if (envelope.from) {
          list = [];
          this._convertAddresses(this._parseAddresses(envelope.from), list);
          list = list.filter((address) => address && address.address);
          if (list.length && list[0]) {
            this._envelope.from = list[0].address;
          }
        }
        ["to", "cc", "bcc"].forEach((key) => {
          if (envelope[key]) {
            this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
          }
        });
        this._envelope.to = this._envelope.to.map((to) => to.address).filter((address) => address);
        let standardFields = ["to", "cc", "bcc", "from"];
        Object.keys(envelope).forEach((key) => {
          if (!standardFields.includes(key)) {
            this._envelope[key] = envelope[key];
          }
        });
        return this;
      }
      /**
       * Generates and returns an object with parsed address fields
       *
       * @return {Object} Address object
       */
      getAddresses() {
        let addresses = {};
        this._headers.forEach((header) => {
          let key = header.key.toLowerCase();
          if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key)) {
            if (!Array.isArray(addresses[key])) {
              addresses[key] = [];
            }
            this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
          }
        });
        return addresses;
      }
      /**
       * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
       *
       * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
       */
      getEnvelope() {
        if (this._envelope) {
          return this._envelope;
        }
        let envelope = {
          from: false,
          to: []
        };
        this._headers.forEach((header) => {
          let list = [];
          if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), list);
            if (list.length && list[0]) {
              envelope.from = list[0].address;
            }
          } else if (["To", "Cc", "Bcc"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), envelope.to);
          }
        });
        envelope.to = envelope.to.map((to) => to.address);
        return envelope;
      }
      /**
       * Returns Message-Id value. If it does not exist, then creates one
       *
       * @return {String} Message-Id value
       */
      messageId() {
        let messageId = this.getHeader("Message-ID");
        if (!messageId) {
          messageId = this._generateMessageId();
          this.setHeader("Message-ID", messageId);
        }
        return messageId;
      }
      /**
       * Sets pregenerated content that will be used as the output of this node
       *
       * @param {String|Buffer|Stream} Raw MIME contents
       */
      setRaw(raw) {
        this._raw = raw;
        if (this._raw && typeof this._raw.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this._raw.removeListener("error", this._contentErrorHandler);
            this._raw = err;
          };
          this._raw.once("error", this._contentErrorHandler);
        }
        return this;
      }
      /////// PRIVATE METHODS
      /**
       * Detects and returns handle to a stream related with the content.
       *
       * @param {Mixed} content Node content
       * @returns {Object} Stream object
       */
      _getStream(content) {
        let contentStream;
        if (content._resolvedValue) {
          contentStream = new PassThrough();
          setImmediate(() => {
            try {
              contentStream.end(content._resolvedValue);
            } catch (_err) {
              contentStream.emit("error", _err);
            }
          });
          return contentStream;
        } else if (typeof content.pipe === "function") {
          return content;
        } else if (content && typeof content.path === "string" && !content.href) {
          if (this.disableFileAccess) {
            contentStream = new PassThrough();
            setImmediate(() => {
              let err = new Error("File access rejected for " + content.path);
              err.code = errors.EFILEACCESS;
              contentStream.emit("error", err);
            });
            return contentStream;
          }
          return fs.createReadStream(content.path);
        } else if (content && typeof content.href === "string") {
          if (this.disableUrlAccess) {
            contentStream = new PassThrough();
            setImmediate(() => {
              let err = new Error("Url access rejected for " + content.href);
              err.code = errors.EURLACCESS;
              contentStream.emit("error", err);
            });
            return contentStream;
          }
          return nmfetch(content.href, { headers: content.httpHeaders });
        } else {
          contentStream = new PassThrough();
          setImmediate(() => {
            try {
              contentStream.end(content || "");
            } catch (_err) {
              contentStream.emit("error", _err);
            }
          });
          return contentStream;
        }
      }
      /**
       * Parses addresses. Takes in a single address or an array or an
       * array of address arrays (eg. To: [[first group], [second group],...])
       *
       * @param {Mixed} addresses Addresses to be parsed
       * @return {Array} An array of address objects
       */
      _parseAddresses(addresses) {
        return [].concat.apply(
          [],
          [].concat(addresses).map((address) => {
            if (address && address.address) {
              address.address = this._normalizeAddress(address.address);
              address.name = address.name || "";
              return [address];
            }
            return addressparser(address);
          })
        );
      }
      /**
       * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
       *
       * @param {String} key Key to be normalized
       * @return {String} key in Camel-Case form
       */
      _normalizeHeaderKey(key) {
        key = (key || "").toString().replace(/\r?\n|\r/g, " ").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
        return key;
      }
      /**
       * Checks if the content type is multipart and defines boundary if needed.
       * Doesn't return anything, modifies object argument instead.
       *
       * @param {Object} structured Parsed header value for 'Content-Type' key
       */
      _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();
        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
        if (this.multipart) {
          this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
          this.boundary = false;
        }
      }
      /**
       * Generates a multipart boundary value
       *
       * @return {String} boundary value
       */
      _generateBoundary() {
        return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
      }
      /**
       * Encodes a header value for use in the generated rfc2822 email.
       *
       * @param {String} key Header key
       * @param {String} value Header value
       */
      _encodeHeaderValue(key, value) {
        key = this._normalizeHeaderKey(key);
        switch (key) {
          // Structured headers
          case "From":
          case "Sender":
          case "To":
          case "Cc":
          case "Bcc":
          case "Reply-To":
            return this._convertAddresses(this._parseAddresses(value));
          // values enclosed in <>
          case "Message-ID":
          case "In-Reply-To":
          case "Content-Id":
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            if (value.charAt(0) !== "<") {
              value = "<" + value;
            }
            if (value.charAt(value.length - 1) !== ">") {
              value = value + ">";
            }
            return value;
          // space separated list of values enclosed in <>
          case "References":
            value = [].concat.apply(
              [],
              [].concat(value || "").map((elm) => {
                elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").trim();
                return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
              })
            ).map((elm) => {
              if (elm.charAt(0) !== "<") {
                elm = "<" + elm;
              }
              if (elm.charAt(elm.length - 1) !== ">") {
                elm = elm + ">";
              }
              return elm;
            });
            return value.join(" ").trim();
          case "Date":
            if (Object.prototype.toString.call(value) === "[object Date]") {
              return value.toUTCString().replace(/GMT/, "+0000");
            }
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
          case "Content-Type":
          case "Content-Disposition":
            return (value || "").toString().replace(/\r?\n|\r/g, " ");
          default:
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
        }
      }
      /**
       * Rebuilds address object using punycode and other adjustments
       *
       * @param {Array} addresses An array of address objects
       * @param {Array} [uniqueList] An array to be populated with addresses
       * @return {String} address string
       */
      _convertAddresses(addresses, uniqueList) {
        let values = [];
        uniqueList = uniqueList || [];
        [].concat(addresses || []).forEach((address) => {
          if (address.address) {
            address.address = this._normalizeAddress(address.address);
            if (!address.name) {
              values.push(address.address.indexOf(" ") >= 0 ? `<${address.address}>` : `${address.address}`);
            } else if (address.name) {
              values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
            }
            if (address.address) {
              if (!uniqueList.filter((a) => a.address === address.address).length) {
                uniqueList.push(address);
              }
            }
          } else if (address.group) {
            let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : "").trim();
            values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
          }
        });
        return values.join(", ");
      }
      /**
       * Normalizes an email address
       *
       * @param {Array} address An array of address objects
       * @return {String} address string
       */
      _normalizeAddress(address) {
        address = (address || "").toString().replace(/[\x00-\x1F<>]+/g, " ").trim();
        let lastAt = address.lastIndexOf("@");
        if (lastAt < 0) {
          return address;
        }
        let user = address.substr(0, lastAt);
        let domain = address.substr(lastAt + 1);
        let encodedDomain;
        try {
          encodedDomain = punycode.toASCII(domain.toLowerCase());
        } catch (_err) {
        }
        if (user.indexOf(" ") >= 0) {
          if (user.charAt(0) !== '"') {
            user = '"' + user;
          }
          if (user.substr(-1) !== '"') {
            user = user + '"';
          }
        }
        return `${user}@${encodedDomain}`;
      }
      /**
       * If needed, mime encodes the name part
       *
       * @param {String} name Name part of an address
       * @returns {String} Mime word encoded string if needed
       */
      _encodeAddressName(name) {
        if (!/^[\w ]*$/.test(name)) {
          if (/^[\x20-\x7e]*$/.test(name)) {
            return '"' + name.replace(/([\\"])/g, "\\$1") + '"';
          } else {
            return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
          }
        }
        return name;
      }
      /**
       * If needed, mime encodes the name part
       *
       * @param {String} name Name part of an address
       * @returns {String} Mime word encoded string if needed
       */
      _encodeWords(value) {
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
      }
      /**
       * Detects best mime encoding for a text value
       *
       * @param {String} value Value to check for
       * @return {String} either 'Q' or 'B'
       */
      _getTextEncoding(value) {
        value = (value || "").toString();
        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;
        if (!encoding) {
          nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
          latinLen = (value.match(/[a-z]/gi) || []).length;
          encoding = nonLatinLen < latinLen ? "Q" : "B";
        }
        return encoding;
      }
      /**
       * Generates a message id
       *
       * @return {String} Random Message-ID value
       */
      _generateMessageId() {
        return "<" + [2, 2, 2, 6].reduce(
          // crux to generate UUID-like random strings
          (prev, len) => prev + "-" + crypto.randomBytes(len).toString("hex"),
          crypto.randomBytes(4).toString("hex")
        ) + "@" + // try to use the domain of the FROM address or fallback to server hostname
        (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
      }
    };
    module2.exports = MimeNode;
  }
});

// node_modules/nodemailer/lib/mail-composer/index.js
var require_mail_composer = __commonJS({
  "node_modules/nodemailer/lib/mail-composer/index.js"(exports2, module2) {
    "use strict";
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var parseDataURI = require_shared().parseDataURI;
    var MailComposer = class {
      constructor(mail) {
        this.mail = mail || {};
        this.message = false;
      }
      /**
       * Builds MimeNode instance
       */
      compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
        if (this.mail.raw) {
          this.message = new MimeNode("message/rfc822", { newline: this.mail.newline }).setRaw(this.mail.raw);
        } else if (this._useMixed) {
          this.message = this._createMixed();
        } else if (this._useAlternative) {
          this.message = this._createAlternative();
        } else if (this._useRelated) {
          this.message = this._createRelated();
        } else {
          this.message = this._createContentNode(
            false,
            [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
              contentType: "text/plain",
              content: ""
            }
          );
        }
        if (this.mail.headers) {
          this.message.addHeader(this.mail.headers);
        }
        ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
          let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
          if (this.mail[key]) {
            this.message.setHeader(header, this.mail[key]);
          }
        });
        if (this.mail.envelope) {
          this.message.setEnvelope(this.mail.envelope);
        }
        this.message.messageId();
        return this.message;
      }
      /**
       * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
       *
       * @param {Boolean} findRelated If true separate related attachments from attached ones
       * @returns {Object} An object of arrays (`related` and `attached`)
       */
      getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
          let data;
          if (/^data:/i.test(attachment.path || attachment.href)) {
            attachment = this._processDataUrl(attachment);
          }
          let contentType = attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
          let isImage = /^image\//i.test(contentType);
          let isMessageNode = /^message\//i.test(contentType);
          let contentDisposition = attachment.contentDisposition || (isMessageNode || isImage && attachment.cid ? "inline" : "attachment");
          let contentTransferEncoding;
          if ("contentTransferEncoding" in attachment) {
            contentTransferEncoding = attachment.contentTransferEncoding;
          } else if (isMessageNode) {
            contentTransferEncoding = "8bit";
          } else {
            contentTransferEncoding = "base64";
          }
          data = {
            contentType,
            contentDisposition,
            contentTransferEncoding
          };
          if (attachment.filename) {
            data.filename = attachment.filename;
          } else if (!isMessageNode && attachment.filename !== false) {
            data.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
            if (data.filename.indexOf(".") < 0) {
              data.filename += "." + mimeFuncs.detectExtension(data.contentType);
            }
          }
          if (/^https?:\/\//i.test(attachment.path)) {
            attachment.href = attachment.path;
            attachment.path = void 0;
          }
          if (attachment.cid) {
            data.cid = attachment.cid;
          }
          if (attachment.raw) {
            data.raw = attachment.raw;
          } else if (attachment.path) {
            data.content = {
              path: attachment.path
            };
          } else if (attachment.href) {
            data.content = {
              href: attachment.href,
              httpHeaders: attachment.httpHeaders
            };
          } else {
            data.content = attachment.content || "";
          }
          if (attachment.encoding) {
            data.encoding = attachment.encoding;
          }
          if (attachment.headers) {
            data.headers = attachment.headers;
          }
          return data;
        });
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          eventObject.contentType = "application/ics";
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
          eventObject.filename = eventObject.filename || "invite.ics";
          eventObject.headers["Content-Disposition"] = "attachment";
          eventObject.headers["Content-Transfer-Encoding"] = "base64";
        }
        if (!findRelated) {
          return {
            attached: attachments.concat(eventObject || []),
            related: []
          };
        } else {
          return {
            attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
            related: attachments.filter((attachment) => !!attachment.cid)
          };
        }
      }
      /**
       * List alternatives. Resulting objects can be used as input for MimeNode nodes
       *
       * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
       */
      getAlternatives() {
        let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
        if (this.mail.text) {
          if (typeof this.mail.text === "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
            text = this.mail.text;
          } else {
            text = {
              content: this.mail.text
            };
          }
          text.contentType = "text/plain; charset=utf-8";
        }
        if (this.mail.watchHtml) {
          if (typeof this.mail.watchHtml === "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
            watchHtml = this.mail.watchHtml;
          } else {
            watchHtml = {
              content: this.mail.watchHtml
            };
          }
          watchHtml.contentType = "text/watch-html; charset=utf-8";
        }
        if (this.mail.amp) {
          if (typeof this.mail.amp === "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
            amp = this.mail.amp;
          } else {
            amp = {
              content: this.mail.amp
            };
          }
          amp.contentType = "text/x-amp-html; charset=utf-8";
        }
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          if (eventObject.content && typeof eventObject.content === "object") {
            eventObject.content._resolve = true;
          }
          eventObject.filename = false;
          eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
        }
        if (this.mail.html) {
          if (typeof this.mail.html === "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
            html = this.mail.html;
          } else {
            html = {
              content: this.mail.html
            };
          }
          html.contentType = "text/html; charset=utf-8";
        }
        [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
          let data;
          if (/^data:/i.test(alternative.path || alternative.href)) {
            alternative = this._processDataUrl(alternative);
          }
          data = {
            contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || "txt"),
            contentTransferEncoding: alternative.contentTransferEncoding
          };
          if (alternative.filename) {
            data.filename = alternative.filename;
          }
          if (/^https?:\/\//i.test(alternative.path)) {
            alternative.href = alternative.path;
            alternative.path = void 0;
          }
          if (alternative.raw) {
            data.raw = alternative.raw;
          } else if (alternative.path) {
            data.content = {
              path: alternative.path
            };
          } else if (alternative.href) {
            data.content = {
              href: alternative.href
            };
          } else {
            data.content = alternative.content || "";
          }
          if (alternative.encoding) {
            data.encoding = alternative.encoding;
          }
          if (alternative.headers) {
            data.headers = alternative.headers;
          }
          alternatives.push(data);
        });
        return alternatives;
      }
      /**
       * Builds multipart/mixed node. It should always contain different type of elements on the same level
       * eg. text + attachments
       *
       * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
       * @returns {Object} MimeNode node element
       */
      _createMixed(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/mixed", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/mixed", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (this._useAlternative) {
          this._createAlternative(node);
        } else if (this._useRelated) {
          this._createRelated(node);
        }
        [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
          if (!this._useRelated || element !== this._htmlNode) {
            this._createContentNode(node, element);
          }
        });
        return node;
      }
      /**
       * Builds multipart/alternative node. It should always contain same type of elements on the same level
       * eg. text + html view of the same data
       *
       * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
       * @returns {Object} MimeNode node element
       */
      _createAlternative(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/alternative", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/alternative", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._alternatives.forEach((alternative) => {
          if (this._useRelated && this._htmlNode === alternative) {
            this._createRelated(node);
          } else {
            this._createContentNode(node, alternative);
          }
        });
        return node;
      }
      /**
       * Builds multipart/related node. It should always contain html node with related attachments
       *
       * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
       * @returns {Object} MimeNode node element
       */
      _createRelated(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode('multipart/related; type="text/html"', {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild('multipart/related; type="text/html"', {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
        return node;
      }
      /**
       * Creates a regular node with contents
       *
       * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
       * @param {Object} element Node data
       * @returns {Object} MimeNode node element
       */
      _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || "";
        let node;
        let encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
        if (!parentNode) {
          node = new MimeNode(element.contentType, {
            filename: element.filename,
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild(element.contentType, {
            filename: element.filename,
            textEncoding: this.mail.textEncoding,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (element.headers) {
          node.addHeader(element.headers);
        }
        if (element.cid) {
          node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
        }
        if (element.contentTransferEncoding) {
          node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
          node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
          node.setHeader(
            "Content-Disposition",
            element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? "inline" : "attachment")
          );
        }
        if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
          element.content = Buffer.from(element.content, encoding);
        }
        if (element.raw) {
          node.setRaw(element.raw);
        } else {
          node.setContent(element.content);
        }
        return node;
      }
      /**
       * Parses data uri and converts it to a Buffer
       *
       * @param {Object} element Content element
       * @return {Object} Parsed element
       */
      _processDataUrl(element) {
        const dataUrl = element.path || element.href;
        if (!dataUrl || typeof dataUrl !== "string") {
          return element;
        }
        if (!dataUrl.startsWith("data:")) {
          return element;
        }
        if (dataUrl.length > 52428800) {
          let detectedType = "application/octet-stream";
          const commaPos = dataUrl.indexOf(",");
          if (commaPos > 0 && commaPos < 200) {
            const header = dataUrl.substring(5, commaPos);
            const parts = header.split(";");
            if (parts[0] && parts[0].includes("/")) {
              detectedType = parts[0].trim();
            }
          }
          return Object.assign({}, element, {
            path: false,
            href: false,
            content: Buffer.alloc(0),
            contentType: element.contentType || detectedType
          });
        }
        let parsedDataUri;
        try {
          parsedDataUri = parseDataURI(dataUrl);
        } catch (_err) {
          return element;
        }
        if (!parsedDataUri) {
          return element;
        }
        element.content = parsedDataUri.data;
        element.contentType = element.contentType || parsedDataUri.contentType;
        if ("path" in element) {
          element.path = false;
        }
        if ("href" in element) {
          element.href = false;
        }
        return element;
      }
    };
    module2.exports = MailComposer;
  }
});

// node_modules/nodemailer/lib/dkim/message-parser.js
var require_message_parser = __commonJS({
  "node_modules/nodemailer/lib/dkim/message-parser.js"(exports2, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var MessageParser = class extends Transform {
      constructor(options) {
        super(options);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
      }
      /**
       * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
       *
       * @param {Buffer} data Next data chunk from the stream
       */
      updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);
        for (let i = 0, len = lblen - nblen; i < len; i++) {
          this.lastBytes[i] = this.lastBytes[i + nblen];
        }
        for (let i = 1; i <= nblen; i++) {
          this.lastBytes[lblen - i] = data[data.length - i];
        }
      }
      /**
       * Finds and removes message headers from the remaining body. We want to keep
       * headers separated until final delivery to be able to modify these
       *
       * @param {Buffer} data Next chunk of data
       * @return {Boolean} Returns true if headers are already found or false otherwise
       */
      checkHeaders(data) {
        if (this.headersParsed) {
          return true;
        }
        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
          let chr;
          if (i < lblen) {
            chr = this.lastBytes[i];
          } else {
            chr = data[i - lblen];
          }
          if (chr === 10 && i) {
            let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
            let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
            if (pr1 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            } else if (pr1 === 13 && pr2 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            }
          }
        }
        if (this.headersParsed) {
          this.headerChunks.push(data.slice(0, headerPos));
          this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
          this.headerChunks = null;
          this.emit("headers", this.parseHeaders());
          if (data.length - 1 > headerPos) {
            let chunk = data.slice(headerPos);
            this.bodySize += chunk.length;
            setImmediate(() => this.push(chunk));
          }
          return false;
        } else {
          this.headerBytes += data.length;
          this.headerChunks.push(data);
        }
        this.updateLastBytes(data);
        return false;
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        let headersFound;
        try {
          headersFound = this.checkHeaders(chunk);
        } catch (E) {
          return callback(E);
        }
        if (headersFound) {
          this.bodySize += chunk.length;
          this.push(chunk);
        }
        setImmediate(callback);
      }
      _flush(callback) {
        if (this.headerChunks) {
          let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
          this.bodySize += chunk.length;
          this.push(chunk);
          this.headerChunks = null;
        }
        callback();
      }
      parseHeaders() {
        let lines = (this.rawHeaders || "").toString().split(/\r?\n/);
        for (let i = lines.length - 1; i > 0; i--) {
          if (/^\s/.test(lines[i])) {
            lines[i - 1] += "\n" + lines[i];
            lines.splice(i, 1);
          }
        }
        return lines.filter((line) => line.trim()).map((line) => ({
          key: line.substr(0, line.indexOf(":")).trim().toLowerCase(),
          line
        }));
      }
    };
    module2.exports = MessageParser;
  }
});

// node_modules/nodemailer/lib/dkim/relaxed-body.js
var require_relaxed_body = __commonJS({
  "node_modules/nodemailer/lib/dkim/relaxed-body.js"(exports2, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var crypto = require("crypto");
    var RelaxedBody = class extends Transform {
      constructor(options) {
        super();
        options = options || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto.createHash(options.hashAlgo || "sha1");
        this.remainder = "";
        this.byteLength = 0;
        this.debug = options.debug;
        this._debugBody = options.debug ? [] : false;
      }
      updateHash(chunk) {
        let bodyStr;
        let nextRemainder = "";
        let state = "file";
        for (let i = chunk.length - 1; i >= 0; i--) {
          let c = chunk[i];
          if (state === "file" && (c === 10 || c === 13)) {
          } else if (state === "file" && (c === 9 || c === 32)) {
            state = "line";
          } else if (state === "line" && (c === 9 || c === 32)) {
          } else if (state === "file" || state === "line") {
            state = "body";
            if (i === chunk.length - 1) {
              break;
            }
          }
          if (i === 0) {
            if (state === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
              this.remainder += chunk.toString("binary");
              return;
            } else if (state === "line" || state === "file") {
              nextRemainder = chunk.toString("binary");
              chunk = false;
              break;
            }
          }
          if (state !== "body") {
            continue;
          }
          nextRemainder = chunk.slice(i + 1).toString("binary");
          chunk = chunk.slice(0, i + 1);
          break;
        }
        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
          for (let i = 0, len = chunk.length; i < len; i++) {
            if (i && chunk[i] === 10 && chunk[i - 1] !== 13) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 13 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 32 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (chunk[i] === 9) {
              needsFixing = true;
              break;
            }
          }
        }
        if (needsFixing) {
          bodyStr = this.remainder + (chunk ? chunk.toString("binary") : "");
          this.remainder = nextRemainder;
          bodyStr = bodyStr.replace(/\r?\n/g, "\n").replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, "\r\n");
          chunk = Buffer.from(bodyStr, "binary");
        } else if (nextRemainder) {
          this.remainder = nextRemainder;
        }
        if (this.debug) {
          this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        this.updateHash(chunk);
        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
      }
      _flush(callback) {
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
          this.bodyHash.update(Buffer.from("\r\n"));
        }
        if (!this.byteLength) {
          this.push(Buffer.from("\r\n"));
        }
        this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
      }
    };
    module2.exports = RelaxedBody;
  }
});

// node_modules/nodemailer/lib/dkim/sign.js
var require_sign = __commonJS({
  "node_modules/nodemailer/lib/dkim/sign.js"(exports2, module2) {
    "use strict";
    var punycode = require_punycode();
    var mimeFuncs = require_mime_funcs();
    var crypto = require("crypto");
    module2.exports = (headers, hashAlgo, bodyHash, options) => {
      options = options || {};
      let defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive";
      let fieldNames = options.headerFieldNames || defaultFieldNames;
      let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
      let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
      let signer, signature;
      canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
      signer = crypto.createSign(("rsa-" + hashAlgo).toUpperCase());
      signer.update(canonicalizedHeaderData.headers);
      try {
        signature = signer.sign(options.privateKey, "base64");
      } catch (_E) {
        return false;
      }
      return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, "$&\r\n ").trim();
    };
    module2.exports.relaxedHeaders = relaxedHeaders;
    function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
      let dkim = [
        "v=1",
        "a=rsa-" + hashAlgo,
        "c=relaxed/relaxed",
        "d=" + punycode.toASCII(domainName),
        "q=dns/txt",
        "s=" + keySelector,
        "bh=" + bodyHash,
        "h=" + fieldNames
      ].join("; ");
      return mimeFuncs.foldLines("DKIM-Signature: " + dkim, 76) + ";\r\n b=";
    }
    function relaxedHeaders(headers, fieldNames, skipFields) {
      let includedFields = /* @__PURE__ */ new Set();
      let skip = /* @__PURE__ */ new Set();
      let headerFields = /* @__PURE__ */ new Map();
      (skipFields || "").toLowerCase().split(":").forEach((field) => {
        skip.add(field.trim());
      });
      (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
        includedFields.add(field.trim());
      });
      for (let i = headers.length - 1; i >= 0; i--) {
        let line = headers[i];
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
          headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
      }
      let headersList = [];
      let fields = [];
      includedFields.forEach((field) => {
        if (headerFields.has(field)) {
          fields.push(field);
          headersList.push(field + ":" + headerFields.get(field));
        }
      });
      return {
        headers: headersList.join("\r\n") + "\r\n",
        fieldNames: fields.join(":")
      };
    }
    function relaxedHeaderLine(line) {
      return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
    }
  }
});

// node_modules/nodemailer/lib/dkim/index.js
var require_dkim = __commonJS({
  "node_modules/nodemailer/lib/dkim/index.js"(exports2, module2) {
    "use strict";
    var MessageParser = require_message_parser();
    var RelaxedBody = require_relaxed_body();
    var sign = require_sign();
    var PassThrough = require("stream").PassThrough;
    var fs = require("fs");
    var path = require("path");
    var crypto = require("crypto");
    var DKIM_ALGO = "sha256";
    var MAX_MESSAGE_SIZE = 2 * 1024 * 1024;
    var DKIMSigner = class {
      constructor(options, keys, input, output) {
        this.options = options || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, "message." + Date.now() + "-" + crypto.randomBytes(14).toString("hex")) : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.hasErrored = false;
        this.input.on("error", (err) => {
          this.hasErrored = true;
          this.cleanup();
          output.emit("error", err);
        });
      }
      cleanup() {
        if (!this.cache || !this.cachePath) {
          return;
        }
        fs.unlink(this.cachePath, () => false);
      }
      createReadCache() {
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.cleanup();
        });
        this.cache.pipe(this.output);
      }
      sendNextChunk() {
        if (this.hasErrored) {
          return;
        }
        if (this.readPos >= this.chunks.length) {
          if (!this.cache) {
            return this.output.end();
          }
          return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
          return this.output.once("drain", () => {
            this.sendNextChunk();
          });
        }
        setImmediate(() => this.sendNextChunk());
      }
      sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = () => {
          if (keyPos >= this.keys.length) {
            this.output.write(this.parser.rawHeaders);
            return setImmediate(() => this.sendNextChunk());
          }
          let key = this.keys[keyPos++];
          let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
            domainName: key.domainName,
            keySelector: key.keySelector,
            privateKey: key.privateKey,
            headerFieldNames: this.options.headerFieldNames,
            skipFields: this.options.skipFields
          });
          if (dkimField) {
            this.output.write(Buffer.from(dkimField + "\r\n"));
          }
          return setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
          return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
      }
      createWriteCache() {
        this.output.usingCache = true;
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.relaxedBody.unpipe(this.cache);
          this.relaxedBody.on("readable", () => {
            while (this.relaxedBody.read() !== null) {
            }
          });
          this.hasErrored = true;
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners("readable");
        this.relaxedBody.pipe(this.cache);
      }
      signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
          hashAlgo: this.hashAlgo
        });
        this.parser.on("headers", (value) => {
          this.headers = value;
        });
        this.relaxedBody.on("hash", (value) => {
          this.bodyHash = value;
        });
        this.relaxedBody.on("readable", () => {
          let chunk;
          if (this.cache) {
            return;
          }
          while ((chunk = this.relaxedBody.read()) !== null) {
            this.chunks.push(chunk);
            this.chunklen += chunk.length;
            if (this.chunklen >= this.cacheTreshold && this.cachePath) {
              return this.createWriteCache();
            }
          }
        });
        this.relaxedBody.on("end", () => {
          if (this.cache) {
            return;
          }
          this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
      }
    };
    var DKIM = class {
      constructor(options) {
        this.options = options || {};
        this.keys = [].concat(
          this.options.keys || {
            domainName: options.domainName,
            keySelector: options.keySelector,
            privateKey: options.privateKey
          }
        );
      }
      sign(input, extraOptions) {
        let output = new PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
          writeValue = input;
          inputStream = new PassThrough();
        } else if (typeof input === "string") {
          writeValue = Buffer.from(input);
          inputStream = new PassThrough();
        }
        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
          options = {};
          Object.keys(this.options || {}).forEach((key) => {
            options[key] = this.options[key];
          });
          Object.keys(extraOptions || {}).forEach((key) => {
            if (!(key in options)) {
              options[key] = extraOptions[key];
            }
          });
        }
        let signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(() => {
          signer.signStream();
          if (writeValue) {
            setImmediate(() => {
              inputStream.end(writeValue);
            });
          }
        });
        return output;
      }
    };
    module2.exports = DKIM;
  }
});

// node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js
var require_http_proxy_client = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js"(exports2, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var urllib = require("url");
    var errors = require_errors();
    function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
      let proxy = urllib.parse(proxyUrl);
      let options;
      let connect;
      let socket;
      options = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
      };
      if (proxy.protocol === "https:") {
        options.rejectUnauthorized = false;
        connect = tls.connect.bind(tls);
      } else {
        connect = net.connect.bind(net);
      }
      let finished = false;
      let tempSocketErr = (err) => {
        if (finished) {
          return;
        }
        finished = true;
        try {
          socket.destroy();
        } catch (_E) {
        }
        callback(err);
      };
      let timeoutErr = () => {
        let err = new Error("Proxy socket timed out");
        err.code = "ETIMEDOUT";
        tempSocketErr(err);
      };
      socket = connect(options, () => {
        if (finished) {
          return;
        }
        let reqHeaders = {
          Host: destinationHost + ":" + destinationPort,
          Connection: "close"
        };
        if (proxy.auth) {
          reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
        }
        socket.write(
          // HTTP method
          "CONNECT " + destinationHost + ":" + destinationPort + " HTTP/1.1\r\n" + // HTTP request headers
          Object.keys(reqHeaders).map((key) => key + ": " + reqHeaders[key]).join("\r\n") + // End request
          "\r\n\r\n"
        );
        let headers = "";
        let onSocketData = (chunk) => {
          let match;
          let remainder;
          if (finished) {
            return;
          }
          headers += chunk.toString("binary");
          if (match = headers.match(/\r\n\r\n/)) {
            socket.removeListener("data", onSocketData);
            remainder = headers.substr(match.index + match[0].length);
            headers = headers.substr(0, match.index);
            if (remainder) {
              socket.unshift(Buffer.from(remainder, "binary"));
            }
            finished = true;
            match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
            if (!match || (match[1] || "").charAt(0) !== "2") {
              try {
                socket.destroy();
              } catch (_E) {
              }
              let err = new Error("Invalid response from proxy" + (match && ": " + match[1] || ""));
              err.code = errors.EPROXY;
              return callback(err);
            }
            socket.removeListener("error", tempSocketErr);
            socket.removeListener("timeout", timeoutErr);
            socket.setTimeout(0);
            return callback(null, socket);
          }
        };
        socket.on("data", onSocketData);
      });
      socket.setTimeout(httpProxyClient.timeout || 30 * 1e3);
      socket.on("timeout", timeoutErr);
      socket.once("error", tempSocketErr);
    }
    module2.exports = httpProxyClient;
  }
});

// node_modules/nodemailer/lib/mailer/mail-message.js
var require_mail_message = __commonJS({
  "node_modules/nodemailer/lib/mailer/mail-message.js"(exports2, module2) {
    "use strict";
    var shared = require_shared();
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailMessage = class {
      constructor(mailer, data) {
        this.mailer = mailer;
        this.data = {};
        this.message = null;
        data = data || {};
        let options = mailer.options || {};
        let defaults = mailer._defaults || {};
        Object.keys(data).forEach((key) => {
          this.data[key] = data[key];
        });
        this.data.headers = this.data.headers || {};
        Object.keys(defaults).forEach((key) => {
          if (!(key in this.data)) {
            this.data[key] = defaults[key];
          } else if (key === "headers") {
            Object.keys(defaults.headers).forEach((key2) => {
              if (!(key2 in this.data.headers)) {
                this.data.headers[key2] = defaults.headers[key2];
              }
            });
          }
        });
        ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey"].forEach((key) => {
          if (key in options) {
            this.data[key] = options[key];
          }
        });
      }
      resolveContent(...args) {
        return shared.resolveContent(...args);
      }
      resolveAll(callback) {
        let keys = [
          [this.data, "html"],
          [this.data, "text"],
          [this.data, "watchHtml"],
          [this.data, "amp"],
          [this.data, "icalEvent"]
        ];
        if (this.data.alternatives && this.data.alternatives.length) {
          this.data.alternatives.forEach((alternative, i) => {
            keys.push([this.data.alternatives, i]);
          });
        }
        if (this.data.attachments && this.data.attachments.length) {
          this.data.attachments.forEach((attachment, i) => {
            if (!attachment.filename) {
              attachment.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
              if (attachment.filename.indexOf(".") < 0) {
                attachment.filename += "." + mimeFuncs.detectExtension(attachment.contentType);
              }
            }
            if (!attachment.contentType) {
              attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
            }
            keys.push([this.data.attachments, i]);
          });
        }
        let mimeNode = new MimeNode();
        let addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
        addressKeys.forEach((address) => {
          let value;
          if (this.message) {
            value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
          } else if (this.data[address]) {
            value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
          }
          if (value && value.length) {
            this.data[address] = value;
          } else if (address in this.data) {
            this.data[address] = null;
          }
        });
        let singleKeys = ["from", "sender"];
        singleKeys.forEach((address) => {
          if (this.data[address]) {
            this.data[address] = this.data[address].shift();
          }
        });
        let pos = 0;
        let resolveNext = () => {
          if (pos >= keys.length) {
            return callback(null, this.data);
          }
          let args = keys[pos++];
          if (!args[0] || !args[0][args[1]]) {
            return resolveNext();
          }
          shared.resolveContent(...args, (err, value) => {
            if (err) {
              return callback(err);
            }
            let node = {
              content: value
            };
            if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
              Object.keys(args[0][args[1]]).forEach((key) => {
                if (!(key in node) && !["content", "path", "href", "raw"].includes(key)) {
                  node[key] = args[0][args[1]][key];
                }
              });
            }
            args[0][args[1]] = node;
            resolveNext();
          });
        };
        setImmediate(() => resolveNext());
      }
      normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();
        this.resolveAll((err, data) => {
          if (err) {
            return callback(err);
          }
          data.envelope = envelope;
          data.messageId = messageId;
          ["html", "text", "watchHtml", "amp"].forEach((key) => {
            if (data[key] && data[key].content) {
              if (typeof data[key].content === "string") {
                data[key] = data[key].content;
              } else if (Buffer.isBuffer(data[key].content)) {
                data[key] = data[key].content.toString();
              }
            }
          });
          if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
            data.icalEvent.content = data.icalEvent.content.toString("base64");
            data.icalEvent.encoding = "base64";
          }
          if (data.alternatives && data.alternatives.length) {
            data.alternatives.forEach((alternative) => {
              if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                alternative.content = alternative.content.toString("base64");
                alternative.encoding = "base64";
              }
            });
          }
          if (data.attachments && data.attachments.length) {
            data.attachments.forEach((attachment) => {
              if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                attachment.content = attachment.content.toString("base64");
                attachment.encoding = "base64";
              }
            });
          }
          data.normalizedHeaders = {};
          Object.keys(data.headers || {}).forEach((key) => {
            let value = [].concat(data.headers[key] || []).shift();
            value = value && value.value || value;
            if (value) {
              if (["references", "in-reply-to", "message-id", "content-id"].includes(key)) {
                value = this.message._encodeHeaderValue(key, value);
              }
              data.normalizedHeaders[key] = value;
            }
          });
          if (data.list && typeof data.list === "object") {
            let listHeaders = this._getListHeaders(data.list);
            listHeaders.forEach((entry) => {
              data.normalizedHeaders[entry.key] = entry.value.map((val) => val && val.value || val).join(", ");
            });
          }
          if (data.references) {
            data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
          }
          if (data.inReplyTo) {
            data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
          }
          return callback(null, data);
        });
      }
      setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
          return;
        }
        this.message.setHeader("X-Mailer", this.data.xMailer);
      }
      setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
          return;
        }
        switch ((this.data.priority || "").toString().toLowerCase()) {
          case "high":
            this.message.setHeader("X-Priority", "1 (Highest)");
            this.message.setHeader("X-MSMail-Priority", "High");
            this.message.setHeader("Importance", "High");
            break;
          case "low":
            this.message.setHeader("X-Priority", "5 (Lowest)");
            this.message.setHeader("X-MSMail-Priority", "Low");
            this.message.setHeader("Importance", "Low");
            break;
          default:
        }
      }
      setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== "object") {
          return;
        }
        if (this.data.list && typeof this.data.list === "object") {
          this._getListHeaders(this.data.list).forEach((listHeader) => {
            listHeader.value.forEach((value) => {
              this.message.addHeader(listHeader.key, value);
            });
          });
        }
      }
      _getListHeaders(listData) {
        return Object.keys(listData).map((key) => ({
          key: "list-" + key.toLowerCase().trim(),
          value: [].concat(listData[key] || []).map((value) => ({
            prepared: true,
            foldLines: true,
            value: [].concat(value || []).map((value2) => {
              if (typeof value2 === "string") {
                value2 = {
                  url: value2
                };
              }
              if (value2 && value2.url) {
                if (key.toLowerCase().trim() === "id") {
                  let comment2 = value2.comment || "";
                  if (mimeFuncs.isPlainText(comment2)) {
                    comment2 = '"' + comment2 + '"';
                  } else {
                    comment2 = mimeFuncs.encodeWord(comment2);
                  }
                  return (value2.comment ? comment2 + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+\/{,2}/, "");
                }
                let comment = value2.comment || "";
                if (!mimeFuncs.isPlainText(comment)) {
                  comment = mimeFuncs.encodeWord(comment);
                }
                return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
              }
              return "";
            }).filter((value2) => value2).join(", ")
          }))
        }));
      }
      _formatListUrl(url) {
        url = url.replace(/[\s<]+|[\s>]+/g, "");
        if (/^(https?|mailto|ftp):/.test(url)) {
          return "<" + url + ">";
        }
        if (/^[^@]+@[^@]+$/.test(url)) {
          return "<mailto:" + url + ">";
        }
        return "<http://" + url + ">";
      }
    };
    module2.exports = MailMessage;
  }
});

// node_modules/nodemailer/lib/mailer/index.js
var require_mailer = __commonJS({
  "node_modules/nodemailer/lib/mailer/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var shared = require_shared();
    var mimeTypes = require_mime_types();
    var MailComposer = require_mail_composer();
    var DKIM = require_dkim();
    var httpProxyClient = require_http_proxy_client();
    var errors = require_errors();
    var util = require("util");
    var urllib = require("url");
    var packageData = require_package();
    var MailMessage = require_mail_message();
    var net = require("net");
    var dns = require("dns");
    var crypto = require("crypto");
    var Mail = class extends EventEmitter {
      constructor(transporter, options, defaults) {
        super();
        this.options = options || {};
        this._defaults = defaults || {};
        this._defaultPlugins = {
          compile: [(...args) => this._convertDataImages(...args)],
          stream: []
        };
        this._userPlugins = {
          compile: [],
          stream: []
        };
        this.meta = /* @__PURE__ */ new Map();
        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "mail"
        });
        this.logger.debug(
          {
            tnx: "create"
          },
          "Creating transport: %s",
          this.getVersionString()
        );
        if (typeof this.transporter.on === "function") {
          this.transporter.on("log", (log) => {
            this.logger.debug(
              {
                tnx: "transport"
              },
              "%s: %s",
              log.type,
              log.message
            );
          });
          this.transporter.on("error", (err) => {
            this.logger.error(
              {
                err,
                tnx: "transport"
              },
              "Transport Error: %s",
              err.message
            );
            this.emit("error", err);
          });
          this.transporter.on("idle", (...args) => {
            this.emit("idle", ...args);
          });
          this.transporter.on("clear", (...args) => {
            this.emit("clear", ...args);
          });
        }
        ["close", "isIdle", "verify"].forEach((method) => {
          this[method] = (...args) => {
            if (typeof this.transporter[method] === "function") {
              if (method === "verify" && typeof this.getSocket === "function") {
                this.transporter.getSocket = this.getSocket;
                this.getSocket = false;
              }
              return this.transporter[method](...args);
            } else {
              this.logger.warn(
                {
                  tnx: "transport",
                  methodName: method
                },
                "Non existing method %s called for transport",
                method
              );
              return false;
            }
          };
        });
        if (this.options.proxy && typeof this.options.proxy === "string") {
          this.setupProxy(this.options.proxy);
        }
      }
      use(step, plugin) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          this._userPlugins[step] = [plugin];
        } else {
          this._userPlugins[step].push(plugin);
        }
        return this;
      }
      /**
       * Sends an email using the preselected transport object
       *
       * @param {Object} data E-data description
       * @param {Function?} callback Callback to run once the sending succeeded or failed
       */
      sendMail(data, callback = null) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        if (typeof this.getSocket === "function") {
          this.transporter.getSocket = this.getSocket;
          this.getSocket = false;
        }
        let mail = new MailMessage(this, data);
        this.logger.debug(
          {
            tnx: "transport",
            name: this.transporter.name,
            version: this.transporter.version,
            action: "send"
          },
          "Sending mail using %s/%s",
          this.transporter.name,
          this.transporter.version
        );
        this._processPlugins("compile", mail, (err) => {
          if (err) {
            this.logger.error(
              {
                err,
                tnx: "plugin",
                action: "compile"
              },
              "PluginCompile Error: %s",
              err.message
            );
            return callback(err);
          }
          mail.message = new MailComposer(mail.data).compile();
          mail.setMailerHeader();
          mail.setPriorityHeaders();
          mail.setListHeaders();
          this._processPlugins("stream", mail, (err2) => {
            if (err2) {
              this.logger.error(
                {
                  err: err2,
                  tnx: "plugin",
                  action: "stream"
                },
                "PluginStream Error: %s",
                err2.message
              );
              return callback(err2);
            }
            if (mail.data.dkim || this.dkim) {
              mail.message.processFunc((input) => {
                let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
                this.logger.debug(
                  {
                    tnx: "DKIM",
                    messageId: mail.message.messageId(),
                    dkimDomains: dkim.keys.map((key) => key.keySelector + "." + key.domainName).join(", ")
                  },
                  "Signing outgoing message with %s keys",
                  dkim.keys.length
                );
                return dkim.sign(input, mail.data._dkim);
              });
            }
            this.transporter.send(mail, (...args) => {
              if (args[0]) {
                this.logger.error(
                  {
                    err: args[0],
                    tnx: "transport",
                    action: "send"
                  },
                  "Send Error: %s",
                  args[0].message
                );
              }
              callback(...args);
            });
          });
        });
        return promise;
      }
      getVersionString() {
        return util.format(
          "%s (%s; +%s; %s/%s)",
          packageData.name,
          packageData.version,
          packageData.homepage,
          this.transporter.name,
          this.transporter.version
        );
      }
      _processPlugins(step, mail, callback) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          return callback();
        }
        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
          this.logger.debug(
            {
              tnx: "transaction",
              pluginCount: userPlugins.length,
              step
            },
            "Using %s plugins for %s",
            userPlugins.length,
            step
          );
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
          return callback();
        }
        let pos = 0;
        let block = "default";
        let processPlugins = () => {
          let curplugins = block === "default" ? defaultPlugins : userPlugins;
          if (pos >= curplugins.length) {
            if (block === "default" && userPlugins.length) {
              block = "user";
              pos = 0;
              curplugins = userPlugins;
            } else {
              return callback();
            }
          }
          let plugin = curplugins[pos++];
          plugin(mail, (err) => {
            if (err) {
              return callback(err);
            }
            processPlugins();
          });
        };
        processPlugins();
      }
      /**
       * Sets up proxy handler for a Nodemailer object
       *
       * @param {String} proxyUrl Proxy configuration url
       */
      setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);
        this.getSocket = (options, callback) => {
          let protocol = proxy.protocol.replace(/:$/, "").toLowerCase();
          if (this.meta.has("proxy_handler_" + protocol)) {
            return this.meta.get("proxy_handler_" + protocol)(proxy, options, callback);
          }
          switch (protocol) {
            // Connect using a HTTP CONNECT method
            case "http":
            case "https":
              httpProxyClient(proxy.href, options.port, options.host, (err2, socket) => {
                if (err2) {
                  return callback(err2);
                }
                return callback(null, {
                  connection: socket
                });
              });
              return;
            case "socks":
            case "socks5":
            case "socks4":
            case "socks4a": {
              if (!this.meta.has("proxy_socks_module")) {
                let err2 = new Error("Socks module not loaded");
                err2.code = errors.EPROXY;
                return callback(err2);
              }
              let connect = (ipaddress) => {
                let proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
                let socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
                let proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
                let connectionOpts = {
                  proxy: {
                    ipaddress,
                    port: Number(proxy.port),
                    type: proxyType
                  },
                  [proxyV2 ? "destination" : "target"]: {
                    host: options.host,
                    port: options.port
                  },
                  command: "connect"
                };
                if (proxy.auth) {
                  let username = decodeURIComponent(proxy.auth.split(":").shift());
                  let password = decodeURIComponent(proxy.auth.split(":").pop());
                  if (proxyV2) {
                    connectionOpts.proxy.userId = username;
                    connectionOpts.proxy.password = password;
                  } else if (proxyType === 4) {
                    connectionOpts.userid = username;
                  } else {
                    connectionOpts.authentication = {
                      username,
                      password
                    };
                  }
                }
                socksClient.createConnection(connectionOpts, (err2, info) => {
                  if (err2) {
                    return callback(err2);
                  }
                  return callback(null, {
                    connection: info.socket || info
                  });
                });
              };
              if (net.isIP(proxy.hostname)) {
                return connect(proxy.hostname);
              }
              return dns.resolve(proxy.hostname, (err2, address) => {
                if (err2) {
                  return callback(err2);
                }
                connect(Array.isArray(address) ? address[0] : address);
              });
            }
          }
          let err = new Error("Unknown proxy configuration");
          err.code = errors.EPROXY;
          callback(err);
        };
      }
      _convertDataImages(mail, callback) {
        if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
          return callback();
        }
        mail.resolveContent(mail.data, "html", (err, html) => {
          if (err) {
            return callback(err);
          }
          let cidCounter = 0;
          html = (html || "").toString().replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
            let cid = crypto.randomBytes(10).toString("hex") + "@localhost";
            if (!mail.data.attachments) {
              mail.data.attachments = [];
            }
            if (!Array.isArray(mail.data.attachments)) {
              mail.data.attachments = [].concat(mail.data.attachments || []);
            }
            mail.data.attachments.push({
              path: dataUri,
              cid,
              filename: "image-" + ++cidCounter + "." + mimeTypes.detectExtension(mimeType)
            });
            return prefix + "cid:" + cid;
          });
          mail.data.html = html;
          callback();
        });
      }
      set(key, value) {
        return this.meta.set(key, value);
      }
      get(key) {
        return this.meta.get(key);
      }
    };
    module2.exports = Mail;
  }
});

// node_modules/nodemailer/lib/smtp-connection/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/data-stream.js"(exports2, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var DataStream = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
        this._curLine = "";
        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
      }
      /**
       * Escapes dots
       */
      _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i, len, lastPos = 0;
        let buf;
        if (!chunk || !chunk.length) {
          return done();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk);
        }
        this.inByteCount += chunk.length;
        for (i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 46) {
            if (i && chunk[i - 1] === 10 || !i && (!this.lastByte || this.lastByte === 10)) {
              buf = chunk.slice(lastPos, i + 1);
              chunks.push(buf);
              chunks.push(Buffer.from("."));
              chunklen += buf.length + 1;
              lastPos = i + 1;
            }
          } else if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                chunks.push(buf);
                chunklen += buf.length + 2;
              } else {
                chunklen += 2;
              }
              chunks.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (chunklen) {
          if (lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            chunks.push(buf);
            chunklen += buf.length;
          }
          this.outByteCount += chunklen;
          this.push(Buffer.concat(chunks, chunklen));
        } else {
          this.outByteCount += chunk.length;
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
      /**
       * Finalizes the stream with a dot on a single line
       */
      _flush(done) {
        let buf;
        if (this.lastByte === 10) {
          buf = Buffer.from(".\r\n");
        } else if (this.lastByte === 13) {
          buf = Buffer.from("\n.\r\n");
        } else {
          buf = Buffer.from("\r\n.\r\n");
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
      }
    };
    module2.exports = DataStream;
  }
});

// node_modules/nodemailer/lib/smtp-connection/index.js
var require_smtp_connection = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/index.js"(exports2, module2) {
    "use strict";
    var packageInfo = require_package();
    var EventEmitter = require("events").EventEmitter;
    var net = require("net");
    var tls = require("tls");
    var os = require("os");
    var crypto = require("crypto");
    var DataStream = require_data_stream();
    var PassThrough = require("stream").PassThrough;
    var shared = require_shared();
    var CONNECTION_TIMEOUT = 2 * 60 * 1e3;
    var SOCKET_TIMEOUT = 10 * 60 * 1e3;
    var GREETING_TIMEOUT = 30 * 1e3;
    var DNS_TIMEOUT = 30 * 1e3;
    var TEARDOWN_NOOP = () => {
    };
    var SMTPConnection = class extends EventEmitter {
      constructor(options) {
        super(options);
        this.id = crypto.randomBytes(8).toString("base64").replace(/\W/g, "");
        this.stage = "init";
        this.options = options || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || "localhost";
        this.servername = this.options.servername ? this.options.servername : !net.isIP(this.host) ? this.host : false;
        this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
        if (typeof this.options.secure === "undefined" && this.port === 465) {
          this.secureConnection = true;
        }
        this.name = this.options.name || this._getHostname();
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-connection",
          sid: this.id
        });
        this.customAuth = /* @__PURE__ */ new Map();
        Object.keys(this.options.customAuth || {}).forEach((key) => {
          let mapKey = (key || "").toString().trim().toUpperCase();
          if (!mapKey) {
            return;
          }
          this.customAuth.set(mapKey, this.options.customAuth[key]);
        });
        this.version = packageInfo.version;
        this.authenticated = false;
        this.destroyed = false;
        this.secure = !!this.secureConnection;
        this._remainder = "";
        this._responseQueue = [];
        this.lastServerResponse = false;
        this._socket = false;
        this._supportedAuth = [];
        this.allowsAuth = false;
        this._envelope = false;
        this._supportedExtensions = [];
        this._maxAllowedSize = 0;
        this._responseActions = [];
        this._recipientQueue = [];
        this._greetingTimeout = false;
        this._connectionTimeout = false;
        this._destroyed = false;
        this._closing = false;
        this._onSocketData = (chunk) => this._onData(chunk);
        this._onSocketError = (error) => this._onError(error, "ESOCKET", false, "CONN");
        this._onSocketClose = () => this._onClose();
        this._onSocketEnd = () => this._onEnd();
        this._onSocketTimeout = () => this._onTimeout();
        this._onConnectionSocketError = (err) => this._onConnectionError(err, "ESOCKET");
        this._connectionAttemptId = 0;
      }
      /**
       * Creates a connection to a SMTP server and sets up connection
       * listener
       */
      connect(connectCallback) {
        if (typeof connectCallback === "function") {
          this.once("connect", () => {
            this.logger.debug(
              {
                tnx: "smtp"
              },
              "SMTP handshake finished"
            );
            connectCallback();
          });
          const isDestroyedMessage = this._isDestroyedMessage("connect");
          if (isDestroyedMessage) {
            return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
          }
        }
        let opts = {
          port: this.port,
          host: this.host,
          allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
          timeout: this.options.dnsTimeout || DNS_TIMEOUT
        };
        if (this.options.localAddress) {
          opts.localAddress = this.options.localAddress;
        }
        if (this.options.connection) {
          this._socket = this.options.connection;
          this._setupConnectionHandlers();
          if (this.secureConnection && !this.alreadySecured) {
            setImmediate(
              () => this._upgradeConnection((err) => {
                if (err) {
                  this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
                  return;
                }
                this._onConnect();
              })
            );
          } else {
            setImmediate(() => this._onConnect());
          }
          return;
        } else if (this.options.socket) {
          this._socket = this.options.socket;
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket.connect(this.port, this.host, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              this._setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else if (this.secureConnection) {
          if (this.options.tls) {
            Object.keys(this.options.tls).forEach((key) => {
              opts[key] = this.options.tls[key];
            });
          }
          if (this.servername && !opts.servername) {
            opts.servername = this.servername;
          }
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            this._fallbackAddresses = (resolved._addresses || []).filter((addr) => addr !== opts.host);
            this._connectOpts = Object.assign({}, opts);
            this._connectToHost(opts, true);
          });
        } else {
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            this._fallbackAddresses = (resolved._addresses || []).filter((addr) => addr !== opts.host);
            this._connectOpts = Object.assign({}, opts);
            this._connectToHost(opts, false);
          });
        }
      }
      /**
       * Attempts to connect to the specified host address
       *
       * @param {Object} opts Connection options
       * @param {Boolean} secure Whether to use TLS
       */
      _connectToHost(opts, secure) {
        this._connectionAttemptId++;
        const currentAttemptId = this._connectionAttemptId;
        let connectFn = secure ? tls.connect : net.connect;
        try {
          this._socket = connectFn(opts, () => {
            if (this._connectionAttemptId !== currentAttemptId) {
              return;
            }
            this._socket.setKeepAlive(true);
            this._onConnect();
          });
          this._setupConnectionHandlers();
        } catch (E) {
          return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
        }
      }
      /**
       * Sets up connection timeout and error handlers
       */
      _setupConnectionHandlers() {
        this._connectionTimeout = setTimeout(() => {
          this._onConnectionError("Connection timeout", "ETIMEDOUT");
        }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
        this._socket.on("error", this._onConnectionSocketError);
      }
      /**
       * Handles connection errors with fallback to alternative addresses
       *
       * @param {Error|String} err Error object or message
       * @param {String} code Error code
       */
      _onConnectionError(err, code) {
        clearTimeout(this._connectionTimeout);
        let canFallback = this._fallbackAddresses && this._fallbackAddresses.length && this.stage === "init" && !this._destroyed;
        if (!canFallback) {
          this._onError(err, code, false, "CONN");
          return;
        }
        let nextHost = this._fallbackAddresses.shift();
        this.logger.info(
          {
            tnx: "network",
            failedHost: this._connectOpts.host,
            nextHost,
            error: err.message || err
          },
          "Connection to %s failed, trying %s",
          this._connectOpts.host,
          nextHost
        );
        if (this._socket) {
          try {
            this._socket.removeListener("error", this._onConnectionSocketError);
            this._socket.destroy();
          } catch (_E) {
          }
          this._socket = null;
        }
        this._connectOpts.host = nextHost;
        this._connectToHost(this._connectOpts, this.secureConnection);
      }
      /**
       * Sends QUIT
       */
      quit() {
        this._sendCommand("QUIT");
        this._responseActions.push(this.close);
      }
      /**
       * Closes the connection to the server
       */
      close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];
        if (this._closing) {
          return;
        }
        this._closing = true;
        let closeMethod = "end";
        if (this.stage === "init") {
          closeMethod = "destroy";
        }
        this.logger.debug(
          {
            tnx: "smtp"
          },
          'Closing connection to the server using "%s"',
          closeMethod
        );
        let socket = this._socket && this._socket.socket || this._socket;
        if (socket && !socket.destroyed) {
          try {
            socket.setTimeout(0);
            socket.removeListener("data", this._onSocketData);
            socket.removeListener("timeout", this._onSocketTimeout);
            socket.removeListener("close", this._onSocketClose);
            socket.removeListener("end", this._onSocketEnd);
            socket.removeListener("error", this._onSocketError);
            socket.removeListener("error", this._onConnectionSocketError);
            socket.on("error", TEARDOWN_NOOP);
            socket[closeMethod]();
          } catch (_E) {
          }
        }
        this._destroy();
      }
      /**
       * Authenticate user
       */
      login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage("login");
        if (isDestroyedMessage) {
          return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        this._auth = authData || {};
        this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
          this._authMethod = "XOAUTH2";
        } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
          this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim();
        }
        if (this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
          if (this._auth.user && this._auth.pass || this.customAuth.has(this._authMethod)) {
            this._auth.credentials = {
              user: this._auth.user,
              pass: this._auth.pass,
              options: this._auth.options
            };
          } else {
            return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
          }
        }
        if (this.customAuth.has(this._authMethod)) {
          let handler = this.customAuth.get(this._authMethod);
          let lastResponse;
          let returned = false;
          let resolve = () => {
            if (returned) {
              return;
            }
            returned = true;
            this.logger.info(
              {
                tnx: "smtp",
                username: this._auth.user,
                action: "authenticated",
                method: this._authMethod
              },
              "User %s authenticated",
              JSON.stringify(this._auth.user)
            );
            this.authenticated = true;
            callback(null, true);
          };
          let reject = (err) => {
            if (returned) {
              return;
            }
            returned = true;
            callback(this._formatError(err, "EAUTH", lastResponse, "AUTH " + this._authMethod));
          };
          let handlerResponse = handler({
            auth: this._auth,
            method: this._authMethod,
            extensions: [].concat(this._supportedExtensions),
            authMethods: [].concat(this._supportedAuth),
            maxAllowedSize: this._maxAllowedSize || false,
            sendCommand: (cmd, done) => {
              let promise;
              if (!done) {
                promise = new Promise((resolve2, reject2) => {
                  done = shared.callbackPromise(resolve2, reject2);
                });
              }
              this._responseActions.push((str) => {
                lastResponse = str;
                let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                let data = {
                  command: cmd,
                  response: str
                };
                if (codes) {
                  data.status = Number(codes[1]) || 0;
                  if (codes[2]) {
                    data.code = codes[2];
                  }
                  data.text = str.substr(codes[0].length);
                } else {
                  data.text = str;
                  data.status = 0;
                }
                done(null, data);
              });
              setImmediate(() => this._sendCommand(cmd));
              return promise;
            },
            resolve,
            reject
          });
          if (handlerResponse && typeof handlerResponse.catch === "function") {
            handlerResponse.then(resolve).catch(reject);
          }
          return;
        }
        switch (this._authMethod) {
          case "XOAUTH2":
            this._handleXOauth2Token(false, callback);
            return;
          case "LOGIN":
            this._responseActions.push((str) => {
              this._actionAUTH_LOGIN_USER(str, callback);
            });
            this._sendCommand("AUTH LOGIN");
            return;
          case "PLAIN":
            this._responseActions.push((str) => {
              this._actionAUTHComplete(str, callback);
            });
            this._sendCommand(
              "AUTH PLAIN " + Buffer.from(
                //this._auth.user+'\u0000'+
                "\0" + // skip authorization identity as it causes problems with some servers
                this._auth.credentials.user + "\0" + this._auth.credentials.pass,
                "utf-8"
              ).toString("base64"),
              // log entry without passwords
              "AUTH PLAIN " + Buffer.from(
                //this._auth.user+'\u0000'+
                "\0" + // skip authorization identity as it causes problems with some servers
                this._auth.credentials.user + "\0/* secret */",
                "utf-8"
              ).toString("base64")
            );
            return;
          case "CRAM-MD5":
            this._responseActions.push((str) => {
              this._actionAUTH_CRAM_MD5(str, callback);
            });
            this._sendCommand("AUTH CRAM-MD5");
            return;
        }
        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
      }
      /**
       * Sends a message
       *
       * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
       * @param {Object} message String, Buffer or a Stream
       * @param {Function} callback Callback to return once sending is completed
       */
      send(envelope, message, done) {
        if (!message) {
          return done(this._formatError("Empty message", "EMESSAGE", false, "API"));
        }
        const isDestroyedMessage = this._isDestroyedMessage("send message");
        if (isDestroyedMessage) {
          return done(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
          return setImmediate(() => {
            done(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
          });
        }
        let returned = false;
        let callback = function() {
          if (returned) {
            return;
          }
          returned = true;
          done(...arguments);
        };
        if (typeof message.on === "function") {
          message.on("error", (err) => callback(this._formatError(err, "ESTREAM", false, "API")));
        }
        let startTime = Date.now();
        this._setEnvelope(envelope, (err, info) => {
          if (err) {
            let stream2 = new PassThrough();
            if (typeof message.pipe === "function") {
              message.pipe(stream2);
            } else {
              stream2.write(message);
              stream2.end();
            }
            return callback(err);
          }
          let envelopeTime = Date.now();
          let stream = this._createSendStream((err2, str) => {
            if (err2) {
              return callback(err2);
            }
            info.envelopeTime = envelopeTime - startTime;
            info.messageTime = Date.now() - envelopeTime;
            info.messageSize = stream.outByteCount;
            info.response = str;
            return callback(null, info);
          });
          if (typeof message.pipe === "function") {
            message.pipe(stream);
          } else {
            stream.write(message);
            stream.end();
          }
        });
      }
      /**
       * Resets connection state
       *
       * @param {Function} callback Callback to return once connection is reset
       */
      reset(callback) {
        this._sendCommand("RSET");
        this._responseActions.push((str) => {
          if (str.charAt(0) !== "2") {
            return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
          }
          this._envelope = false;
          return callback(null, true);
        });
      }
      /**
       * Connection listener that is run when the connection to
       * the server is opened
       *
       * @event
       */
      _onConnect() {
        clearTimeout(this._connectionTimeout);
        this.logger.info(
          {
            tnx: "network",
            localAddress: this._socket.localAddress,
            localPort: this._socket.localPort,
            remoteAddress: this._socket.remoteAddress,
            remotePort: this._socket.remotePort
          },
          "%s established to %s:%s",
          this.secure ? "Secure connection" : "Connection",
          this._socket.remoteAddress,
          this._socket.remotePort
        );
        if (this._destroyed) {
          this.close();
          return;
        }
        this.stage = "connected";
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        this._socket.removeListener("close", this._onSocketClose);
        this._socket.removeListener("end", this._onSocketEnd);
        this._socket.removeListener("error", this._onConnectionSocketError);
        this._socket.on("error", this._onSocketError);
        this._socket.on("data", this._onSocketData);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        this._greetingTimeout = setTimeout(() => {
          if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
            this._onError("Greeting never received", "ETIMEDOUT", false, "CONN");
          }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);
        this._responseActions.push(this._actionGreeting);
        this._socket.resume();
      }
      /**
       * 'data' listener for data coming from the server
       *
       * @event
       * @param {Buffer} chunk Data chunk coming from the server
       */
      _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
          return;
        }
        let data = (chunk || "").toString("binary");
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;
        this._remainder = lines.pop();
        for (let i = 0, len = lines.length; i < len; i++) {
          if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split("\n").pop())) {
              this._responseQueue[this._responseQueue.length - 1] += "\n" + lines[i];
              continue;
            }
          }
          this._responseQueue.push(lines[i]);
        }
        if (this._responseQueue.length) {
          lastline = this._responseQueue[this._responseQueue.length - 1];
          if (/^\d+-/.test(lastline.split("\n").pop())) {
            return;
          }
        }
        this._processResponse();
      }
      /**
       * 'error' listener for the socket
       *
       * @event
       * @param {Error} err Error object
       * @param {String} type Error name
       */
      _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        if (this._destroyed) {
          return;
        }
        err = this._formatError(err, type, data, command);
        const transientCodes = ["ETIMEDOUT", "ESOCKET", "ECONNECTION"];
        if (transientCodes.includes(err.code)) {
          this.logger.warn(data, err.message);
        } else {
          this.logger.error(data, err.message);
        }
        this.emit("error", err);
        this.close();
      }
      _formatError(message, type, response, command) {
        let err;
        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
          err = message;
        } else {
          err = new Error(message);
        }
        if (type && type !== "Error") {
          err.code = type;
        }
        if (response) {
          err.response = response;
          err.message += ": " + response;
        }
        let responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
        if (responseCode) {
          err.responseCode = responseCode;
        }
        if (command) {
          err.command = command;
        }
        return err;
      }
      /**
       * 'close' listener for the socket
       *
       * @event
       */
      _onClose() {
        let serverResponse = false;
        if (this._remainder && this._remainder.trim()) {
          if (this.options.debug || this.options.transactionLog) {
            this.logger.debug(
              {
                tnx: "server"
              },
              this._remainder.replace(/\r?\n$/, "")
            );
          }
          this.lastServerResponse = serverResponse = this._remainder.trim();
        }
        this.logger.info(
          {
            tnx: "network"
          },
          "Connection closed"
        );
        if (this.upgrading && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ETLS", serverResponse, "CONN");
        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", serverResponse, "CONN");
        } else if (/^[45]\d{2}\b/.test(serverResponse)) {
          return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", serverResponse, "CONN");
        }
        this._destroy();
      }
      /**
       * 'end' listener for the socket
       *
       * @event
       */
      _onEnd() {
        if (this._socket && !this._socket.destroyed) {
          this._socket.destroy();
        }
      }
      /**
       * 'timeout' listener for the socket
       *
       * @event
       */
      _onTimeout() {
        return this._onError(new Error("Timeout"), "ETIMEDOUT", false, "CONN");
      }
      /**
       * Destroys the client, emits 'end'
       */
      _destroy() {
        if (this._destroyed) {
          return;
        }
        this._destroyed = true;
        this.emit("end");
      }
      /**
       * Upgrades the connection to TLS
       *
       * @param {Function} callback Callback function to run when the connection
       *        has been secured
       */
      _upgradeConnection(callback) {
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        let socketPlain = this._socket;
        let opts = {
          socket: this._socket,
          host: this.host
        };
        Object.keys(this.options.tls || {}).forEach((key) => {
          opts[key] = this.options.tls[key];
        });
        if (this.servername && !opts.servername) {
          opts.servername = this.servername;
        }
        this.upgrading = true;
        try {
          this._socket = tls.connect(opts, () => {
            this.secure = true;
            this.upgrading = false;
            this._socket.on("data", this._onSocketData);
            socketPlain.removeListener("close", this._onSocketClose);
            socketPlain.removeListener("end", this._onSocketEnd);
            socketPlain.removeListener("error", this._onSocketError);
            return callback(null, true);
          });
        } catch (err) {
          return callback(err);
        }
        this._socket.on("error", this._onSocketError);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        socketPlain.resume();
      }
      /**
       * Processes queued responses from the server
       *
       * @param {Boolean} force If true, ignores _processing flag
       */
      _processResponse() {
        if (!this._responseQueue.length) {
          return false;
        }
        let str = this.lastServerResponse = (this._responseQueue.shift() || "").toString();
        if (/^\d+-/.test(str.split("\n").pop())) {
          return;
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug(
            {
              tnx: "server"
            },
            str.replace(/\r?\n$/, "")
          );
        }
        if (!str.trim()) {
          setImmediate(() => this._processResponse());
        }
        let action = this._responseActions.shift();
        if (typeof action === "function") {
          action.call(this, str);
          setImmediate(() => this._processResponse());
        } else {
          return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
        }
      }
      /**
       * Send a command to the server, append \r\n
       *
       * @param {String} str String to be sent to the server
       * @param {String} logStr Optional string to be used for logging instead of the actual string
       */
      _sendCommand(str, logStr) {
        if (this._destroyed) {
          return;
        }
        if (this._socket.destroyed) {
          return this.close();
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug(
            {
              tnx: "client"
            },
            (logStr || str || "").toString().replace(/\r?\n$/, "")
          );
        }
        this._socket.write(Buffer.from(str + "\r\n", "utf-8"));
      }
      /**
       * Initiates a new message by submitting envelope data, starting with
       * MAIL FROM: command
       *
       * @param {Object} envelope Envelope object in the form of
       *        {from:'...', to:['...']}
       *        or
       *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
       */
      _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map((to) => (to && to.address || to || "").toString().trim());
        if (!this._envelope.to.length) {
          return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
        }
        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
          return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
        }
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
          useSmtpUtf8 = true;
        }
        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
          if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
            return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
          }
          if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
            useSmtpUtf8 = true;
          }
        }
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
          try {
            this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
          } catch (err) {
            return callback(this._formatError("Invalid DSN " + err.message, "EENVELOPE", false, "API"));
          }
        }
        this._responseActions.push((str) => {
          this._actionMAIL(str, callback);
        });
        if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
          args.push("SMTPUTF8");
          this._usingSmtpUtf8 = true;
        }
        if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
          args.push("BODY=8BITMIME");
          this._using8BitMime = true;
        }
        if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
          args.push("SIZE=" + this._envelope.size);
        }
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.ret) {
            args.push("RET=" + shared.encodeXText(this._envelope.dsn.ret));
          }
          if (this._envelope.dsn.envid) {
            args.push("ENVID=" + shared.encodeXText(this._envelope.dsn.envid));
          }
        }
        if (this._envelope.requireTLSExtensionEnabled) {
          if (!this.secure) {
            return callback(
              this._formatError("REQUIRETLS can only be used over TLS connections (RFC 8689)", "EREQUIRETLS", false, "MAIL FROM")
            );
          }
          if (!this._supportedExtensions.includes("REQUIRETLS")) {
            return callback(
              this._formatError("Server does not support REQUIRETLS extension (RFC 8689)", "EREQUIRETLS", false, "MAIL FROM")
            );
          }
          args.push("REQUIRETLS");
        }
        this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : ""));
      }
      _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
        if (ret) {
          switch (ret) {
            case "HDRS":
            case "HEADERS":
              ret = "HDRS";
              break;
            case "FULL":
            case "BODY":
              ret = "FULL";
              break;
          }
        }
        if (ret && !["FULL", "HDRS"].includes(ret)) {
          throw new Error("ret: " + JSON.stringify(ret));
        }
        let envid = (params.envid || params.id || "").toString() || null;
        let notify = params.notify || null;
        if (notify) {
          if (typeof notify === "string") {
            notify = notify.split(",");
          }
          notify = notify.map((n) => n.trim().toUpperCase());
          let validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
          let invalidNotify = notify.filter((n) => !validNotify.includes(n));
          if (invalidNotify.length || notify.length > 1 && notify.includes("NEVER")) {
            throw new Error("notify: " + JSON.stringify(notify.join(",")));
          }
          notify = notify.join(",");
        }
        let orcpt = (params.recipient || params.orcpt || "").toString() || null;
        if (orcpt && orcpt.indexOf(";") < 0) {
          orcpt = "rfc822;" + orcpt;
        }
        return {
          ret,
          envid,
          notify,
          orcpt
        };
      }
      _getDsnRcptToArgs() {
        let args = [];
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.notify) {
            args.push("NOTIFY=" + shared.encodeXText(this._envelope.dsn.notify));
          }
          if (this._envelope.dsn.orcpt) {
            args.push("ORCPT=" + shared.encodeXText(this._envelope.dsn.orcpt));
          }
        }
        return args.length ? " " + args.join(" ") : "";
      }
      _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;
        if (this.options.lmtp) {
          this._envelope.accepted.forEach((recipient, i) => {
            let final = i === this._envelope.accepted.length - 1;
            this._responseActions.push((str) => {
              this._actionLMTPStream(recipient, final, str, callback);
            });
          });
        } else {
          this._responseActions.push((str) => {
            this._actionSMTPStream(str, callback);
          });
        }
        dataStream.pipe(this._socket, {
          end: false
        });
        if (this.options.debug) {
          logStream = new PassThrough();
          logStream.on("readable", () => {
            let chunk;
            while (chunk = logStream.read()) {
              this.logger.debug(
                {
                  tnx: "message"
                },
                chunk.toString("binary").replace(/\r?\n$/, "")
              );
            }
          });
          dataStream.pipe(logStream);
        }
        dataStream.once("end", () => {
          this.logger.info(
            {
              tnx: "message",
              inByteCount: dataStream.inByteCount,
              outByteCount: dataStream.outByteCount
            },
            "<%s bytes encoded mime message (source size %s bytes)>",
            dataStream.outByteCount,
            dataStream.inByteCount
          );
        });
        return dataStream;
      }
      /** ACTIONS **/
      /**
       * Will be run after the connection is created and the server sends
       * a greeting. If the incoming message starts with 220 initiate
       * SMTP session by sending EHLO command
       *
       * @param {String} str Message from the server
       */
      _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);
        if (str.substr(0, 3) !== "220") {
          this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
          return;
        }
        if (this.options.lmtp) {
          this._responseActions.push(this._actionLHLO);
          this._sendCommand("LHLO " + this.name);
        } else {
          this._responseActions.push(this._actionEHLO);
          this._sendCommand("EHLO " + this.name);
        }
      }
      /**
       * Handles server response for LHLO command. If it yielded in
       * error, emit 'error', otherwise treat this as an EHLO response
       *
       * @param {String} str Message from the server
       */
      _actionLHLO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
          return;
        }
        this._actionEHLO(str);
      }
      /**
       * Handles server response for EHLO command. If it yielded in
       * error, try HELO instead, otherwise initiate TLS negotiation
       * if STARTTLS is supported by the server or move into the
       * authentication phase.
       *
       * @param {String} str Message from the server
       */
      _actionEHLO(str) {
        let match;
        if (str.substr(0, 3) === "421") {
          this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
          return;
        }
        if (str.charAt(0) !== "2") {
          if (this.options.requireTLS) {
            this._onError(
              new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str),
              "ECONNECTION",
              str,
              "EHLO"
            );
            return;
          }
          this._responseActions.push(this._actionHELO);
          this._sendCommand("HELO " + this.name);
          return;
        }
        this._ehloLines = str.split(/\r?\n/).map((line) => line.replace(/^\d+[ -]/, "").trim()).filter((line) => line).slice(1);
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
          this._sendCommand("STARTTLS");
          this._responseActions.push(this._actionSTARTTLS);
          return;
        }
        if (/[ -]SMTPUTF8\b/im.test(str)) {
          this._supportedExtensions.push("SMTPUTF8");
        }
        if (/[ -]DSN\b/im.test(str)) {
          this._supportedExtensions.push("DSN");
        }
        if (/[ -]8BITMIME\b/im.test(str)) {
          this._supportedExtensions.push("8BITMIME");
        }
        if (/[ -]REQUIRETLS\b/im.test(str)) {
          this._supportedExtensions.push("REQUIRETLS");
        }
        if (/[ -]PIPELINING\b/im.test(str)) {
          this._supportedExtensions.push("PIPELINING");
        }
        if (/[ -]AUTH\b/i.test(str)) {
          this.allowsAuth = true;
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
          this._supportedAuth.push("PLAIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
          this._supportedAuth.push("LOGIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
          this._supportedAuth.push("CRAM-MD5");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
          this._supportedAuth.push("XOAUTH2");
        }
        if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
          this._supportedExtensions.push("SIZE");
          this._maxAllowedSize = Number(match[1]) || 0;
        }
        this.emit("connect");
      }
      /**
       * Handles server response for HELO command. If it yielded in
       * error, emit 'error', otherwise move into the authentication phase.
       *
       * @param {String} str Message from the server
       */
      _actionHELO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
          return;
        }
        this.allowsAuth = true;
        this.emit("connect");
      }
      /**
       * Handles server response for STARTTLS command. If there's an error
       * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
       * succeedes restart the EHLO
       *
       * @param {String} str Message from the server
       */
      _actionSTARTTLS(str) {
        if (str.charAt(0) !== "2") {
          if (this.options.opportunisticTLS) {
            this.logger.info(
              {
                tnx: "smtp"
              },
              "Failed STARTTLS upgrade, continuing unencrypted"
            );
            return this.emit("connect");
          }
          this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
          return;
        }
        this._upgradeConnection((err, secured) => {
          if (err) {
            this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "STARTTLS");
            return;
          }
          this.logger.info(
            {
              tnx: "smtp"
            },
            "Connection upgraded with STARTTLS"
          );
          if (secured) {
            if (this.options.lmtp) {
              this._responseActions.push(this._actionLHLO);
              this._sendCommand("LHLO " + this.name);
            } else {
              this._responseActions.push(this._actionEHLO);
              this._sendCommand("EHLO " + this.name);
            }
          } else {
            this.emit("connect");
          }
        });
      }
      /**
       * Handle the response for AUTH LOGIN command. We are expecting
       * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
       * response needs to be base64 encoded username. We do not need
       * exact match but settle with 334 response in general as some
       * hosts invalidly use a longer message than VXNlcm5hbWU6
       *
       * @param {String} str Message from the server
       */
      _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
          callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
          return;
        }
        this._responseActions.push((str2) => {
          this._actionAUTH_LOGIN_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
      }
      /**
       * Handle the response for AUTH CRAM-MD5 command. We are expecting
       * '334 <challenge string>'. Data to be sent as response needs to be
       * base64 decoded challenge string, MD5 hashed using the password as
       * a HMAC key, prefixed by the username and a space, and finally all
       * base64 encoded again.
       *
       * @param {String} str Message from the server
       */
      _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = "";
        if (!challengeMatch) {
          return callback(
            this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5")
          );
        } else {
          challengeString = challengeMatch[1];
        }
        let base64decoded = Buffer.from(challengeString, "base64").toString("ascii"), hmacMD5 = crypto.createHmac("md5", this._auth.credentials.pass);
        hmacMD5.update(base64decoded);
        let prepended = this._auth.credentials.user + " " + hmacMD5.digest("hex");
        this._responseActions.push((str2) => {
          this._actionAUTH_CRAM_MD5_PASS(str2, callback);
        });
        this._sendCommand(
          Buffer.from(prepended).toString("base64"),
          // hidden hash for logs
          Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64")
        );
      }
      /**
       * Handles the response to CRAM-MD5 authentication, if there's no error,
       * the user can be considered logged in. Start waiting for a message to send
       *
       * @param {String} str Message from the server
       */
      _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
          return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
        }
        this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          },
          "User %s authenticated",
          JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
      }
      /**
       * Handle the response for AUTH LOGIN command. We are expecting
       * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
       * response needs to be base64 encoded password.
       *
       * @param {String} str Message from the server
       */
      _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
          return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
        }
        this._responseActions.push((str2) => {
          this._actionAUTHComplete(str2, callback);
        });
        this._sendCommand(
          Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"),
          // Hidden pass for logs
          Buffer.from("/* secret */", "utf-8").toString("base64")
        );
      }
      /**
       * Handles the response for authentication, if there's no error,
       * the user can be considered logged in. Start waiting for a message to send
       *
       * @param {String} str Message from the server
       */
      _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === "function") {
          callback = isRetry;
          isRetry = false;
        }
        if (str.substr(0, 3) === "334") {
          this._responseActions.push((str2) => {
            if (isRetry || this._authMethod !== "XOAUTH2") {
              this._actionAUTHComplete(str2, true, callback);
            } else {
              setImmediate(() => this._handleXOauth2Token(true, callback));
            }
          });
          this._sendCommand("");
          return;
        }
        if (str.charAt(0) !== "2") {
          this.logger.info(
            {
              tnx: "smtp",
              username: this._auth.user,
              action: "authfail",
              method: this._authMethod
            },
            "User %s failed to authenticate",
            JSON.stringify(this._auth.user)
          );
          return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
        }
        this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          },
          "User %s authenticated",
          JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
      }
      /**
       * Handle response for a MAIL FROM: command
       *
       * @param {String} str Message from the server
       */
      _actionMAIL(str, callback) {
        let message, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Mail command failed";
          }
          return callback(this._formatError(message, "EENVELOPE", str, "MAIL FROM"));
        }
        if (!this._envelope.rcptQueue.length) {
          return callback(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", false, "API"));
        } else {
          this._recipientQueue = [];
          if (this._supportedExtensions.includes("PIPELINING")) {
            while (this._envelope.rcptQueue.length) {
              curRecipient = this._envelope.rcptQueue.shift();
              this._recipientQueue.push(curRecipient);
              this._responseActions.push((str2) => {
                this._actionRCPT(str2, callback);
              });
              this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
            }
          } else {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str2) => {
              this._actionRCPT(str2, callback);
            });
            this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
          }
        }
      }
      /**
       * Handle response for a RCPT TO: command
       *
       * @param {String} str Message from the server
       */
      _actionRCPT(str, callback) {
        let message, err, curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Recipient command failed";
          }
          this._envelope.rejected.push(curRecipient);
          err = this._formatError(message, "EENVELOPE", str, "RCPT TO");
          err.recipient = curRecipient;
          this._envelope.rejectedErrors.push(err);
        } else {
          this._envelope.accepted.push(curRecipient);
        }
        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
          if (this._envelope.rejected.length < this._envelope.to.length) {
            this._responseActions.push((str2) => {
              this._actionDATA(str2, callback);
            });
            this._sendCommand("DATA");
          } else {
            err = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", str, "RCPT TO");
            err.rejected = this._envelope.rejected;
            err.rejectedErrors = this._envelope.rejectedErrors;
            return callback(err);
          }
        } else if (this._envelope.rcptQueue.length) {
          curRecipient = this._envelope.rcptQueue.shift();
          this._recipientQueue.push(curRecipient);
          this._responseActions.push((str2) => {
            this._actionRCPT(str2, callback);
          });
          this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
        }
      }
      /**
       * Handle response for a DATA command
       *
       * @param {String} str Message from the server
       */
      _actionDATA(str, callback) {
        if (!/^[23]/.test(str)) {
          return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
        }
        let response = {
          accepted: this._envelope.accepted,
          rejected: this._envelope.rejected
        };
        if (this._ehloLines && this._ehloLines.length) {
          response.ehlo = this._ehloLines;
        }
        if (this._envelope.rejectedErrors.length) {
          response.rejectedErrors = this._envelope.rejectedErrors;
        }
        callback(null, response);
      }
      /**
       * Handle response for a DATA stream when using SMTP
       * We expect a single response that defines if the sending succeeded or failed
       *
       * @param {String} str Message from the server
       */
      _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
          return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
        } else {
          return callback(null, str);
        }
      }
      /**
       * Handle response for a DATA stream
       * We expect a separate response for every recipient. All recipients can either
       * succeed or fail separately
       *
       * @param {String} recipient The recipient this response applies to
       * @param {Boolean} final Is this the final recipient?
       * @param {String} str Message from the server
       */
      _actionLMTPStream(recipient, final, str, callback) {
        let err;
        if (Number(str.charAt(0)) !== 2) {
          err = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
          err.recipient = recipient;
          this._envelope.rejected.push(recipient);
          this._envelope.rejectedErrors.push(err);
          for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
            if (this._envelope.accepted[i] === recipient) {
              this._envelope.accepted.splice(i, 1);
            }
          }
        }
        if (final) {
          return callback(null, str);
        }
      }
      _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
          if (err) {
            this.logger.info(
              {
                tnx: "smtp",
                username: this._auth.user,
                action: "authfail",
                method: this._authMethod
              },
              "User %s failed to authenticate",
              JSON.stringify(this._auth.user)
            );
            return callback(this._formatError(err, "EAUTH", false, "AUTH XOAUTH2"));
          }
          this._responseActions.push((str) => {
            this._actionAUTHComplete(str, isRetry, callback);
          });
          this._sendCommand(
            "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken),
            //  Hidden for logs
            "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */")
          );
        });
      }
      /**
       *
       * @param {string} command
       * @private
       */
      _isDestroyedMessage(command) {
        if (this._destroyed) {
          return "Cannot " + command + " - smtp connection is already destroyed.";
        }
        if (this._socket) {
          if (this._socket.destroyed) {
            return "Cannot " + command + " - smtp connection socket is already destroyed.";
          }
          if (!this._socket.writable) {
            return "Cannot " + command + " - smtp connection socket is already half-closed.";
          }
        }
      }
      _getHostname() {
        let defaultHostname;
        try {
          defaultHostname = os.hostname() || "";
        } catch (_err) {
          defaultHostname = "localhost";
        }
        if (!defaultHostname || defaultHostname.indexOf(".") < 0) {
          defaultHostname = "[127.0.0.1]";
        }
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
          defaultHostname = "[" + defaultHostname + "]";
        }
        return defaultHostname;
      }
    };
    module2.exports = SMTPConnection;
  }
});

// node_modules/nodemailer/lib/xoauth2/index.js
var require_xoauth2 = __commonJS({
  "node_modules/nodemailer/lib/xoauth2/index.js"(exports2, module2) {
    "use strict";
    var Stream = require("stream").Stream;
    var nmfetch = require_fetch();
    var crypto = require("crypto");
    var shared = require_shared();
    var errors = require_errors();
    var XOAuth2 = class extends Stream {
      constructor(options, logger) {
        super();
        this.options = options || {};
        if (options && options.serviceClient) {
          if (!options.privateKey || !options.user) {
            let err = new Error('Options "privateKey" and "user" are required for service account!');
            err.code = errors.EOAUTH2;
            setImmediate(() => this.emit("error", err));
            return;
          }
          let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
          this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger(
          {
            logger
          },
          {
            component: this.options.component || "OAuth2"
          }
        );
        this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
          this.expires = this.options.expires;
        } else {
          let timeout = Math.max(Number(this.options.timeout) || 0, 0);
          this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        }
        this.renewing = false;
        this.renewalQueue = [];
      }
      /**
       * Returns or generates (if previous has expired) a XOAuth2 token
       *
       * @param {Boolean} renew If false then use cached access token (if available)
       * @param {Function} callback Callback function with error object and token string
       */
      getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
          this.logger.debug(
            {
              tnx: "OAUTH2",
              user: this.options.user,
              action: "reuse"
            },
            "Reusing existing access token for %s",
            this.options.user
          );
          return callback(null, this.accessToken);
        }
        if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
          if (this.accessToken) {
            this.logger.debug(
              {
                tnx: "OAUTH2",
                user: this.options.user,
                action: "reuse"
              },
              "Reusing existing access token (no refresh capability) for %s",
              this.options.user
            );
            return callback(null, this.accessToken);
          }
          this.logger.error(
            {
              tnx: "OAUTH2",
              user: this.options.user,
              action: "renew"
            },
            "Cannot renew access token for %s: No refresh mechanism available",
            this.options.user
          );
          let err = new Error("Can't create new access token for user");
          err.code = errors.EOAUTH2;
          return callback(err);
        }
        if (this.renewing) {
          return this.renewalQueue.push({ renew, callback });
        }
        this.renewing = true;
        const generateCallback = (err, accessToken) => {
          this.renewalQueue.forEach((item) => item.callback(err, accessToken));
          this.renewalQueue = [];
          this.renewing = false;
          if (err) {
            this.logger.error(
              {
                err,
                tnx: "OAUTH2",
                user: this.options.user,
                action: "renew"
              },
              "Failed generating new Access Token for %s",
              this.options.user
            );
          } else {
            this.logger.info(
              {
                tnx: "OAUTH2",
                user: this.options.user,
                action: "renew"
              },
              "Generated new Access Token for %s",
              this.options.user
            );
          }
          callback(err, accessToken);
        };
        if (this.provisionCallback) {
          this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
            if (!err && accessToken) {
              this.accessToken = accessToken;
              this.expires = expires || 0;
            }
            generateCallback(err, accessToken);
          });
        } else {
          this.generateToken(generateCallback);
        }
      }
      /**
       * Updates token values
       *
       * @param {String} accessToken New access token
       * @param {Number} timeout Access token lifetime in seconds
       *
       * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
       */
      updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        this.emit("token", {
          user: this.options.user,
          accessToken: accessToken || "",
          expires: this.expires
        });
      }
      /**
       * Generates a new XOAuth2 token with the credentials provided at initialization
       *
       * @param {Function} callback Callback function with error object and token string
       */
      generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
          let iat = Math.floor(Date.now() / 1e3);
          let tokenData = {
            iss: this.options.serviceClient,
            scope: this.options.scope || "https://mail.google.com/",
            sub: this.options.user,
            aud: this.options.accessUrl,
            iat,
            exp: iat + this.options.serviceRequestTimeout
          };
          let token;
          try {
            token = this.jwtSignRS256(tokenData);
          } catch (_err) {
            let err = new Error("Can't generate token. Check your auth options");
            err.code = errors.EOAUTH2;
            return callback(err);
          }
          urlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: token
          };
          loggedUrlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: tokenData
          };
        } else {
          if (!this.options.refreshToken) {
            let err = new Error("Can't create new access token for user");
            err.code = errors.EOAUTH2;
            return callback(err);
          }
          urlOptions = {
            client_id: this.options.clientId || "",
            client_secret: this.options.clientSecret || "",
            refresh_token: this.options.refreshToken,
            grant_type: "refresh_token"
          };
          loggedUrlOptions = {
            client_id: this.options.clientId || "",
            client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
            refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
            grant_type: "refresh_token"
          };
        }
        Object.keys(this.options.customParams).forEach((key) => {
          urlOptions[key] = this.options.customParams[key];
          loggedUrlOptions[key] = this.options.customParams[key];
        });
        this.logger.debug(
          {
            tnx: "OAUTH2",
            user: this.options.user,
            action: "generate"
          },
          "Requesting token using: %s",
          JSON.stringify(loggedUrlOptions)
        );
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
          let data;
          if (error) {
            return callback(error);
          }
          try {
            data = JSON.parse(body.toString());
          } catch (E) {
            return callback(E);
          }
          if (!data || typeof data !== "object") {
            this.logger.debug(
              {
                tnx: "OAUTH2",
                user: this.options.user,
                action: "post"
              },
              "Response: %s",
              (body || "").toString()
            );
            let err2 = new Error("Invalid authentication response");
            err2.code = errors.EOAUTH2;
            return callback(err2);
          }
          let logData = {};
          Object.keys(data).forEach((key) => {
            if (key !== "access_token") {
              logData[key] = data[key];
            } else {
              logData[key] = (data[key] || "").toString().substr(0, 6) + "...";
            }
          });
          this.logger.debug(
            {
              tnx: "OAUTH2",
              user: this.options.user,
              action: "post"
            },
            "Response: %s",
            JSON.stringify(logData)
          );
          if (data.error) {
            let errorMessage = data.error;
            if (data.error_description) {
              errorMessage += ": " + data.error_description;
            }
            if (data.error_uri) {
              errorMessage += " (" + data.error_uri + ")";
            }
            let err2 = new Error(errorMessage);
            err2.code = errors.EOAUTH2;
            return callback(err2);
          }
          if (data.access_token) {
            this.updateToken(data.access_token, data.expires_in);
            return callback(null, this.accessToken);
          }
          let err = new Error("No access token");
          err.code = errors.EOAUTH2;
          return callback(err);
        });
      }
      /**
       * Converts an access_token and user id into a base64 encoded XOAuth2 token
       *
       * @param {String} [accessToken] Access token string
       * @return {String} Base64 encoded token for IMAP or SMTP login
       */
      buildXOAuth2Token(accessToken) {
        let authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
        return Buffer.from(authData.join(""), "utf-8").toString("base64");
      }
      /**
       * Custom POST request handler.
       * This is only needed to keep paths short in Windows – usually this module
       * is a dependency of a dependency and if it tries to require something
       * like the request module the paths get way too long to handle for Windows.
       * As we do only a simple POST request we do not actually require complicated
       * logic support (no redirects, no nothing) anyway.
       *
       * @param {String} url Url to POST to
       * @param {String|Buffer} payload Payload to POST
       * @param {Function} callback Callback function with (err, buff)
       */
      postRequest(url, payload, params, callback) {
        let returned = false;
        let chunks = [];
        let chunklen = 0;
        let req = nmfetch(url, {
          method: "post",
          headers: params.customHeaders,
          body: payload,
          allowErrorResponse: true
        });
        req.on("readable", () => {
          let chunk;
          while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        req.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        req.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(null, Buffer.concat(chunks, chunklen));
        });
      }
      /**
       * Encodes a buffer or a string into Base64url format
       *
       * @param {Buffer|String} data The data to convert
       * @return {String} The encoded string
       */
      toBase64URL(data) {
        if (typeof data === "string") {
          data = Buffer.from(data);
        }
        return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      /**
       * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
       *
       * @param {Object} payload The payload to include in the generated token
       * @return {String} The generated and signed token
       */
      jwtSignRS256(payload) {
        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val) => this.toBase64URL(val)).join(".");
        let signature = crypto.createSign("RSA-SHA256").update(payload).sign(this.options.privateKey);
        return payload + "." + this.toBase64URL(signature);
      }
    };
    module2.exports = XOAuth2;
  }
});

// node_modules/nodemailer/lib/smtp-pool/pool-resource.js
var require_pool_resource = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/pool-resource.js"(exports2, module2) {
    "use strict";
    var SMTPConnection = require_smtp_connection();
    var assign = require_shared().assign;
    var XOAuth2 = require_xoauth2();
    var errors = require_errors();
    var EventEmitter = require("events");
    var PoolResource = class extends EventEmitter {
      constructor(pool) {
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
          switch ((this.options.auth.type || "").toString().toUpperCase()) {
            case "OAUTH2": {
              let oauth2 = new XOAuth2(this.options.auth, this.logger);
              oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
              this.auth = {
                type: "OAUTH2",
                user: this.options.auth.user,
                oauth2,
                method: "XOAUTH2"
              };
              oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
              oauth2.on("error", (err) => this.emit("error", err));
              break;
            }
            default:
              if (!this.options.auth.user && !this.options.auth.pass) {
                break;
              }
              this.auth = {
                type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
                user: this.options.auth.user,
                credentials: {
                  user: this.options.auth.user || "",
                  pass: this.options.auth.pass,
                  options: this.options.auth.options
                },
                method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
              };
          }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
      }
      /**
       * Initiates a connection to the SMTP server
       *
       * @param {Function} callback Callback function to run once the connection is established or failed
       */
      connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options.host || "",
                destPort: options.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options.host || "",
              options.port || ""
            );
            options = assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          this.connection = new SMTPConnection(options);
          this.connection.once("error", (err2) => {
            this.emit("error", err2);
            if (returned) {
              return;
            }
            returned = true;
            return callback(err2);
          });
          this.connection.once("end", () => {
            this.close();
            if (returned) {
              return;
            }
            returned = true;
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              let err2 = new Error("Unexpected socket close");
              if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                err2.code = errors.ETLS;
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (_E) {
            }
          });
          this.connection.connect(() => {
            if (returned) {
              return;
            }
            if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
              this.connection.login(this.auth, (err2) => {
                if (returned) {
                  return;
                }
                returned = true;
                if (err2) {
                  this.connection.close();
                  this.emit("error", err2);
                  return callback(err2);
                }
                this._connected = true;
                callback(null, true);
              });
            } else {
              returned = true;
              this._connected = true;
              return callback(null, true);
            }
          });
        });
      }
      /**
       * Sends an e-mail to be sent using the selected settings
       *
       * @param {Object} mail Mail object
       * @param {Function} callback Callback function
       */
      send(mail, callback) {
        if (!this._connected) {
          return this.connect((err) => {
            if (err) {
              return callback(err);
            }
            return this.send(mail, callback);
          });
        }
        let envelope = mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId,
            cid: this.id
          },
          "Sending message %s using #%s to <%s>",
          messageId,
          this.id,
          recipients.join(", ")
        );
        if (mail.data.dsn) {
          envelope.dsn = mail.data.dsn;
        }
        if (mail.data.requireTLSExtensionEnabled) {
          envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
        }
        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
          this.messages++;
          if (err) {
            this.connection.close();
            this.emit("error", err);
            return callback(err);
          }
          info.envelope = {
            from: envelope.from,
            to: envelope.to
          };
          info.messageId = messageId;
          setImmediate(() => {
            let err2;
            if (this.messages >= this.options.maxMessages) {
              err2 = new Error("Resource exhausted");
              err2.code = errors.EMAXLIMIT;
              this.connection.close();
              this.emit("error", err2);
            } else {
              this.pool._checkRateLimit(() => {
                this.available = true;
                this.emit("available");
              });
            }
          });
          callback(null, info);
        });
      }
      /**
       * Closes the connection
       */
      close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
          this.connection.close();
        }
        this.emit("close");
      }
    };
    module2.exports = PoolResource;
  }
});

// node_modules/nodemailer/lib/well-known/services.json
var require_services = __commonJS({
  "node_modules/nodemailer/lib/well-known/services.json"(exports2, module2) {
    module2.exports = {
      "1und1": {
        description: "1&1 Mail (German hosting provider)",
        host: "smtp.1und1.de",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      "126": {
        description: "126 Mail (NetEase)",
        host: "smtp.126.com",
        port: 465,
        secure: true
      },
      "163": {
        description: "163 Mail (NetEase)",
        host: "smtp.163.com",
        port: 465,
        secure: true
      },
      Aliyun: {
        description: "Alibaba Cloud Mail",
        domains: ["aliyun.com"],
        host: "smtp.aliyun.com",
        port: 465,
        secure: true
      },
      AliyunQiye: {
        description: "Alibaba Cloud Enterprise Mail",
        host: "smtp.qiye.aliyun.com",
        port: 465,
        secure: true
      },
      AOL: {
        description: "AOL Mail",
        domains: ["aol.com"],
        host: "smtp.aol.com",
        port: 587
      },
      Aruba: {
        description: "Aruba PEC (Italian email provider)",
        domains: ["aruba.it", "pec.aruba.it"],
        aliases: ["Aruba PEC"],
        host: "smtps.aruba.it",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      Bluewin: {
        description: "Bluewin (Swiss email provider)",
        host: "smtpauths.bluewin.ch",
        domains: ["bluewin.ch"],
        port: 465
      },
      BOL: {
        description: "BOL Mail (Brazilian provider)",
        domains: ["bol.com.br"],
        host: "smtp.bol.com.br",
        port: 587,
        requireTLS: true
      },
      DebugMail: {
        description: "DebugMail (email testing service)",
        host: "debugmail.io",
        port: 25
      },
      Disroot: {
        description: "Disroot (privacy-focused provider)",
        domains: ["disroot.org"],
        host: "disroot.org",
        port: 587,
        secure: false,
        authMethod: "LOGIN"
      },
      DynectEmail: {
        description: "Dyn Email Delivery",
        aliases: ["Dynect"],
        host: "smtp.dynect.net",
        port: 25
      },
      ElasticEmail: {
        description: "Elastic Email",
        aliases: ["Elastic Email"],
        host: "smtp.elasticemail.com",
        port: 465,
        secure: true
      },
      Ethereal: {
        description: "Ethereal Email (email testing service)",
        aliases: ["ethereal.email"],
        host: "smtp.ethereal.email",
        port: 587
      },
      FastMail: {
        description: "FastMail",
        domains: ["fastmail.fm"],
        host: "smtp.fastmail.com",
        port: 465,
        secure: true
      },
      "Feishu Mail": {
        description: "Feishu Mail (Lark)",
        aliases: ["Feishu", "FeishuMail"],
        domains: ["www.feishu.cn"],
        host: "smtp.feishu.cn",
        port: 465,
        secure: true
      },
      "Forward Email": {
        description: "Forward Email (email forwarding service)",
        aliases: ["FE", "ForwardEmail"],
        domains: ["forwardemail.net"],
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true
      },
      GandiMail: {
        description: "Gandi Mail",
        aliases: ["Gandi", "Gandi Mail"],
        host: "mail.gandi.net",
        port: 587
      },
      Gmail: {
        description: "Gmail",
        aliases: ["Google Mail"],
        domains: ["gmail.com", "googlemail.com"],
        host: "smtp.gmail.com",
        port: 465,
        secure: true
      },
      GmailWorkspace: {
        description: "Gmail Workspace",
        aliases: ["Google Workspace Mail"],
        host: "smtp-relay.gmail.com",
        port: 465,
        secure: true
      },
      GMX: {
        description: "GMX Mail",
        domains: ["gmx.com", "gmx.net", "gmx.de"],
        host: "mail.gmx.com",
        port: 587
      },
      Godaddy: {
        description: "GoDaddy Email (US)",
        host: "smtpout.secureserver.net",
        port: 25
      },
      GodaddyAsia: {
        description: "GoDaddy Email (Asia)",
        host: "smtp.asia.secureserver.net",
        port: 25
      },
      GodaddyEurope: {
        description: "GoDaddy Email (Europe)",
        host: "smtp.europe.secureserver.net",
        port: 25
      },
      "hot.ee": {
        description: "Hot.ee (Estonian email provider)",
        host: "mail.hot.ee"
      },
      Hotmail: {
        description: "Outlook.com / Hotmail",
        aliases: ["Outlook", "Outlook.com", "Hotmail.com"],
        domains: ["hotmail.com", "outlook.com"],
        host: "smtp-mail.outlook.com",
        port: 587
      },
      iCloud: {
        description: "iCloud Mail",
        aliases: ["Me", "Mac"],
        domains: ["me.com", "mac.com"],
        host: "smtp.mail.me.com",
        port: 587
      },
      Infomaniak: {
        description: "Infomaniak Mail (Swiss hosting provider)",
        host: "mail.infomaniak.com",
        domains: ["ik.me", "ikmail.com", "etik.com"],
        port: 587
      },
      KolabNow: {
        description: "KolabNow (secure email service)",
        domains: ["kolabnow.com"],
        aliases: ["Kolab"],
        host: "smtp.kolabnow.com",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      Loopia: {
        description: "Loopia (Swedish hosting provider)",
        host: "mailcluster.loopia.se",
        port: 465
      },
      Loops: {
        description: "Loops",
        host: "smtp.loops.so",
        port: 587
      },
      "mail.ee": {
        description: "Mail.ee (Estonian email provider)",
        host: "smtp.mail.ee"
      },
      "Mail.ru": {
        description: "Mail.ru",
        host: "smtp.mail.ru",
        port: 465,
        secure: true
      },
      "Mailcatch.app": {
        description: "Mailcatch (email testing service)",
        host: "sandbox-smtp.mailcatch.app",
        port: 2525
      },
      Maildev: {
        description: "MailDev (local email testing)",
        port: 1025,
        ignoreTLS: true
      },
      MailerSend: {
        description: "MailerSend",
        host: "smtp.mailersend.net",
        port: 587
      },
      Mailgun: {
        description: "Mailgun",
        host: "smtp.mailgun.org",
        port: 465,
        secure: true
      },
      Mailjet: {
        description: "Mailjet",
        host: "in.mailjet.com",
        port: 587
      },
      Mailosaur: {
        description: "Mailosaur (email testing service)",
        host: "mailosaur.io",
        port: 25
      },
      Mailtrap: {
        description: "Mailtrap",
        host: "live.smtp.mailtrap.io",
        port: 587
      },
      Mandrill: {
        description: "Mandrill (by Mailchimp)",
        host: "smtp.mandrillapp.com",
        port: 587
      },
      Naver: {
        description: "Naver Mail (Korean email provider)",
        host: "smtp.naver.com",
        port: 587
      },
      OhMySMTP: {
        description: "OhMySMTP (email delivery service)",
        host: "smtp.ohmysmtp.com",
        port: 587,
        secure: false
      },
      One: {
        description: "One.com Email",
        host: "send.one.com",
        port: 465,
        secure: true
      },
      OpenMailBox: {
        description: "OpenMailBox",
        aliases: ["OMB", "openmailbox.org"],
        host: "smtp.openmailbox.org",
        port: 465,
        secure: true
      },
      Outlook365: {
        description: "Microsoft 365 / Office 365",
        host: "smtp.office365.com",
        port: 587,
        secure: false
      },
      Postmark: {
        description: "Postmark",
        aliases: ["PostmarkApp"],
        host: "smtp.postmarkapp.com",
        port: 2525
      },
      Proton: {
        description: "Proton Mail",
        aliases: ["ProtonMail", "Proton.me", "Protonmail.com", "Protonmail.ch"],
        domains: ["proton.me", "protonmail.com", "pm.me", "protonmail.ch"],
        host: "smtp.protonmail.ch",
        port: 587,
        requireTLS: true
      },
      "qiye.aliyun": {
        description: "Alibaba Mail Enterprise Edition",
        host: "smtp.mxhichina.com",
        port: "465",
        secure: true
      },
      QQ: {
        description: "QQ Mail",
        domains: ["qq.com"],
        host: "smtp.qq.com",
        port: 465,
        secure: true
      },
      QQex: {
        description: "QQ Enterprise Mail",
        aliases: ["QQ Enterprise"],
        domains: ["exmail.qq.com"],
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true
      },
      Resend: {
        description: "Resend",
        host: "smtp.resend.com",
        port: 465,
        secure: true
      },
      Runbox: {
        description: "Runbox (Norwegian email provider)",
        domains: ["runbox.com"],
        host: "smtp.runbox.com",
        port: 465,
        secure: true
      },
      SendCloud: {
        description: "SendCloud (Chinese email delivery)",
        host: "smtp.sendcloud.net",
        port: 2525
      },
      SendGrid: {
        description: "SendGrid",
        host: "smtp.sendgrid.net",
        port: 587
      },
      SendinBlue: {
        description: "Brevo (formerly Sendinblue)",
        aliases: ["Brevo"],
        host: "smtp-relay.brevo.com",
        port: 587
      },
      SendPulse: {
        description: "SendPulse",
        host: "smtp-pulse.com",
        port: 465,
        secure: true
      },
      SES: {
        description: "AWS SES US East (N. Virginia)",
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-NORTHEAST-1": {
        description: "AWS SES Asia Pacific (Tokyo)",
        host: "email-smtp.ap-northeast-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-NORTHEAST-2": {
        description: "AWS SES Asia Pacific (Seoul)",
        host: "email-smtp.ap-northeast-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-NORTHEAST-3": {
        description: "AWS SES Asia Pacific (Osaka)",
        host: "email-smtp.ap-northeast-3.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-SOUTH-1": {
        description: "AWS SES Asia Pacific (Mumbai)",
        host: "email-smtp.ap-south-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-SOUTHEAST-1": {
        description: "AWS SES Asia Pacific (Singapore)",
        host: "email-smtp.ap-southeast-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-AP-SOUTHEAST-2": {
        description: "AWS SES Asia Pacific (Sydney)",
        host: "email-smtp.ap-southeast-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-CA-CENTRAL-1": {
        description: "AWS SES Canada (Central)",
        host: "email-smtp.ca-central-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-CENTRAL-1": {
        description: "AWS SES Europe (Frankfurt)",
        host: "email-smtp.eu-central-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-NORTH-1": {
        description: "AWS SES Europe (Stockholm)",
        host: "email-smtp.eu-north-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-1": {
        description: "AWS SES Europe (Ireland)",
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-2": {
        description: "AWS SES Europe (London)",
        host: "email-smtp.eu-west-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-3": {
        description: "AWS SES Europe (Paris)",
        host: "email-smtp.eu-west-3.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-SA-EAST-1": {
        description: "AWS SES South America (S\xE3o Paulo)",
        host: "email-smtp.sa-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-EAST-1": {
        description: "AWS SES US East (N. Virginia)",
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-EAST-2": {
        description: "AWS SES US East (Ohio)",
        host: "email-smtp.us-east-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-GOV-EAST-1": {
        description: "AWS SES GovCloud (US-East)",
        host: "email-smtp.us-gov-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-GOV-WEST-1": {
        description: "AWS SES GovCloud (US-West)",
        host: "email-smtp.us-gov-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-WEST-1": {
        description: "AWS SES US West (N. California)",
        host: "email-smtp.us-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-WEST-2": {
        description: "AWS SES US West (Oregon)",
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 465,
        secure: true
      },
      Seznam: {
        description: "Seznam Email (Czech email provider)",
        aliases: ["Seznam Email"],
        domains: ["seznam.cz", "email.cz", "post.cz", "spoluzaci.cz"],
        host: "smtp.seznam.cz",
        port: 465,
        secure: true
      },
      SMTP2GO: {
        description: "SMTP2GO",
        host: "mail.smtp2go.com",
        port: 2525
      },
      Sparkpost: {
        description: "SparkPost",
        aliases: ["SparkPost", "SparkPost Mail"],
        domains: ["sparkpost.com"],
        host: "smtp.sparkpostmail.com",
        port: 587,
        secure: false
      },
      Tipimail: {
        description: "Tipimail (email delivery service)",
        host: "smtp.tipimail.com",
        port: 587
      },
      Tutanota: {
        description: "Tutanota (Tuta Mail)",
        domains: ["tutanota.com", "tuta.com", "tutanota.de", "tuta.io"],
        host: "smtp.tutanota.com",
        port: 465,
        secure: true
      },
      Yahoo: {
        description: "Yahoo Mail",
        domains: ["yahoo.com"],
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true
      },
      Yandex: {
        description: "Yandex Mail",
        domains: ["yandex.ru"],
        host: "smtp.yandex.ru",
        port: 465,
        secure: true
      },
      Zimbra: {
        description: "Zimbra Mail Server",
        aliases: ["Zimbra Collaboration"],
        host: "smtp.zimbra.com",
        port: 587,
        requireTLS: true
      },
      Zoho: {
        description: "Zoho Mail",
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      }
    };
  }
});

// node_modules/nodemailer/lib/well-known/index.js
var require_well_known = __commonJS({
  "node_modules/nodemailer/lib/well-known/index.js"(exports2, module2) {
    "use strict";
    var services2 = require_services();
    var normalized = {};
    Object.keys(services2).forEach((key) => {
      let service = services2[key];
      normalized[normalizeKey(key)] = normalizeService(service);
      [].concat(service.aliases || []).forEach((alias) => {
        normalized[normalizeKey(alias)] = normalizeService(service);
      });
      [].concat(service.domains || []).forEach((domain) => {
        normalized[normalizeKey(domain)] = normalizeService(service);
      });
    });
    function normalizeKey(key) {
      return key.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
    }
    function normalizeService(service) {
      let filter = ["domains", "aliases"];
      let response = {};
      Object.keys(service).forEach((key) => {
        if (filter.indexOf(key) < 0) {
          response[key] = service[key];
        }
      });
      return response;
    }
    module2.exports = function(key) {
      key = normalizeKey(key.split("@").pop());
      return normalized[key] || false;
    };
  }
});

// node_modules/nodemailer/lib/smtp-pool/index.js
var require_smtp_pool = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var PoolResource = require_pool_resource();
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var errors = require_errors();
    var packageData = require_package();
    var SMTPPool = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        if (typeof options === "string") {
          options = {
            url: options
          };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === "function") {
          this.getSocket = options.getSocket;
        }
        if (options.url) {
          urlData = shared.parseConnectionUrl(options.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(
          false,
          // create new object
          options,
          // regular options
          urlData,
          // url options
          service && wellKnown(service)
          // wellknown options
        );
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-pool"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP (pool)";
        this.version = packageData.version + "[client:" + connection.version + "]";
        this._rateLimit = {
          counter: 0,
          timeout: null,
          waiting: [],
          checkpoint: false,
          delta: Number(this.options.rateDelta) || 1e3,
          limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      /**
       * Placeholder function for creating proxy sockets. This method immediatelly returns
       * without a socket
       *
       * @param {Object} options Connection options
       * @param {Function} callback Callback function to run with the socket keys
       */
      getSocket(options, callback) {
        return setImmediate(() => callback(null, false));
      }
      /**
       * Queues an e-mail to be sent using the selected settings
       *
       * @param {Object} mail Mail object
       * @param {Function} callback Callback function
       */
      send(mail, callback) {
        if (this._closed) {
          return false;
        }
        this._queue.push({
          mail,
          requeueAttempts: 0,
          callback
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
          this.idling = false;
        }
        setImmediate(() => this._processMessages());
        return true;
      }
      /**
       * Closes all connections in the pool. If there is a message being sent, the connection
       * is closed later
       */
      close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;
        clearTimeout(this._rateLimit.timeout);
        if (!len && !this._queue.length) {
          return;
        }
        for (let i = len - 1; i >= 0; i--) {
          if (this._connections[i] && this._connections[i].available) {
            connection = this._connections[i];
            connection.close();
            this.logger.info(
              {
                tnx: "connection",
                cid: connection.id,
                action: "removed"
              },
              "Connection #%s removed",
              connection.id
            );
          }
        }
        if (len && !this._connections.length) {
          this.logger.debug(
            {
              tnx: "connection"
            },
            "All connections removed"
          );
        }
        if (!this._queue.length) {
          return;
        }
        let invokeCallbacks = () => {
          if (!this._queue.length) {
            this.logger.debug(
              {
                tnx: "connection"
              },
              "Pending queue entries cleared"
            );
            return;
          }
          let entry = this._queue.shift();
          if (entry && typeof entry.callback === "function") {
            try {
              entry.callback(new Error("Connection pool was closed"));
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection.id
                },
                "Callback error for #%s: %s",
                connection.id,
                E.message
              );
            }
          }
          setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
      }
      /**
       * Check the queue and available connections. If there is a message to be sent and there is
       * an available connection, then use this connection to send the mail
       */
      _processMessages() {
        let connection;
        let i, len;
        if (this._closed) {
          return;
        }
        if (!this._queue.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        for (i = 0, len = this._connections.length; i < len; i++) {
          if (this._connections[i].available) {
            connection = this._connections[i];
            break;
          }
        }
        if (!connection && this._connections.length < this.options.maxConnections) {
          connection = this._createConnection();
        }
        if (!connection) {
          this.idling = false;
          return;
        }
        if (!this.idling && this._queue.length < this.options.maxConnections) {
          this.idling = true;
          this.emit("idle");
        }
        let entry = connection.queueEntry = this._queue.shift();
        entry.messageId = (connection.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
        connection.available = false;
        this.logger.debug(
          {
            tnx: "pool",
            cid: connection.id,
            messageId: entry.messageId,
            action: "assign"
          },
          "Assigned message <%s> to #%s (%s)",
          entry.messageId,
          connection.id,
          connection.messages + 1
        );
        if (this._rateLimit.limit) {
          this._rateLimit.counter++;
          if (!this._rateLimit.checkpoint) {
            this._rateLimit.checkpoint = Date.now();
          }
        }
        connection.send(entry.mail, (err, info) => {
          if (entry === connection.queueEntry) {
            try {
              entry.callback(err, info);
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection.id
                },
                "Callback error for #%s: %s",
                connection.id,
                E.message
              );
            }
            connection.queueEntry = false;
          }
        });
      }
      /**
       * Creates a new pool resource
       */
      _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        this.logger.info(
          {
            tnx: "pool",
            cid: connection.id,
            action: "conection"
          },
          "Created new pool resource #%s",
          connection.id
        );
        connection.on("available", () => {
          this.logger.debug(
            {
              tnx: "connection",
              cid: connection.id,
              action: "available"
            },
            "Connection #%s became available",
            connection.id
          );
          if (this._closed) {
            this.close();
          } else {
            this._processMessages();
          }
        });
        connection.once("error", (err) => {
          if (err.code !== "EMAXLIMIT") {
            this.logger.warn(
              {
                err,
                tnx: "pool",
                cid: connection.id
              },
              "Pool Error for #%s: %s",
              connection.id,
              err.message
            );
          } else {
            this.logger.debug(
              {
                tnx: "pool",
                cid: connection.id,
                action: "maxlimit"
              },
              "Max messages limit exchausted for #%s",
              connection.id
            );
          }
          if (connection.queueEntry) {
            try {
              connection.queueEntry.callback(err);
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection.id
                },
                "Callback error for #%s: %s",
                connection.id,
                E.message
              );
            }
            connection.queueEntry = false;
          }
          this._removeConnection(connection);
          this._continueProcessing();
        });
        connection.once("close", () => {
          this.logger.info(
            {
              tnx: "connection",
              cid: connection.id,
              action: "closed"
            },
            "Connection #%s was closed",
            connection.id
          );
          this._removeConnection(connection);
          if (connection.queueEntry) {
            setTimeout(() => {
              if (connection.queueEntry) {
                if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                  this._requeueEntryOnConnectionClose(connection);
                } else {
                  this._failDeliveryOnConnectionClose(connection);
                }
              }
              this._continueProcessing();
            }, 50);
          } else {
            if (!this._closed && this.idling && !this._connections.length) {
              this.emit("clear");
            }
            this._continueProcessing();
          }
        });
        this._connections.push(connection);
        return connection;
      }
      _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === void 0 || this.options.maxRequeues < 0) {
          return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
      }
      _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
          try {
            connection.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
          } catch (E) {
            this.logger.error(
              {
                err: E,
                tnx: "callback",
                messageId: connection.queueEntry.messageId,
                cid: connection.id
              },
              "Callback error for #%s: %s",
              connection.id,
              E.message
            );
          }
          connection.queueEntry = false;
        }
      }
      _requeueEntryOnConnectionClose(connection) {
        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
        this.logger.debug(
          {
            tnx: "pool",
            cid: connection.id,
            messageId: connection.queueEntry.messageId,
            action: "requeue"
          },
          "Re-queued message <%s> for #%s. Attempt: #%s",
          connection.queueEntry.messageId,
          connection.id,
          connection.queueEntry.requeueAttempts
        );
        this._queue.unshift(connection.queueEntry);
        connection.queueEntry = false;
      }
      /**
       * Continue to process message if the pool hasn't closed
       */
      _continueProcessing() {
        if (this._closed) {
          this.close();
        } else {
          setTimeout(() => this._processMessages(), 100);
        }
      }
      /**
       * Remove resource from pool
       *
       * @param {Object} connection The PoolResource to remove
       */
      _removeConnection(connection) {
        let index = this._connections.indexOf(connection);
        if (index !== -1) {
          this._connections.splice(index, 1);
        }
      }
      /**
       * Checks if connections have hit current rate limit and if so, queues the availability callback
       *
       * @param {Function} callback Callback function to run once rate limiter has been cleared
       */
      _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
          return callback();
        }
        let now = Date.now();
        if (this._rateLimit.counter < this._rateLimit.limit) {
          return callback();
        }
        this._rateLimit.waiting.push(callback);
        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
          return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
          this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
          this._rateLimit.checkpoint = now;
        }
      }
      /**
       * Clears current rate limit limitation and runs paused callback
       */
      _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
        while (this._rateLimit.waiting.length) {
          let cb = this._rateLimit.waiting.shift();
          setImmediate(cb);
        }
      }
      /**
       * Returns true if there are free slots in the queue
       */
      isIdle() {
        return this.idling;
      }
      /**
       * Verifies SMTP configuration
       *
       * @param {Function} callback Callback function
       */
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options.host || "",
                destPort: options.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options.host || "",
              options.port || ""
            );
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            if (auth && (connection.allowsAuth || options.forceAuth)) {
              connection.login(auth, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else if (!auth && connection.allowsAuth && options.forceAuth) {
              let err2 = new Error("Authentication info was not provided");
              err2.code = errors.ENOAUTH;
              returned = true;
              connection.close();
              return callback(err2);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
    };
    module2.exports = SMTPPool;
  }
});

// node_modules/nodemailer/lib/smtp-transport/index.js
var require_smtp_transport = __commonJS({
  "node_modules/nodemailer/lib/smtp-transport/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var XOAuth2 = require_xoauth2();
    var errors = require_errors();
    var packageData = require_package();
    var SMTPTransport = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        if (typeof options === "string") {
          options = {
            url: options
          };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === "function") {
          this.getSocket = options.getSocket;
        }
        if (options.url) {
          urlData = shared.parseConnectionUrl(options.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(
          false,
          // create new object
          options,
          // regular options
          urlData,
          // url options
          service && wellKnown(service)
          // wellknown options
        );
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-transport"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP";
        this.version = packageData.version + "[client:" + connection.version + "]";
        if (this.options.auth) {
          this.auth = this.getAuth({});
        }
      }
      /**
       * Placeholder function for creating proxy sockets. This method immediatelly returns
       * without a socket
       *
       * @param {Object} options Connection options
       * @param {Function} callback Callback function to run with the socket keys
       */
      getSocket(options, callback) {
        return setImmediate(() => callback(null, false));
      }
      getAuth(authOpts) {
        if (!authOpts) {
          return this.auth;
        }
        let hasAuth = false;
        let authData = {};
        if (this.options.auth && typeof this.options.auth === "object") {
          Object.keys(this.options.auth).forEach((key) => {
            hasAuth = true;
            authData[key] = this.options.auth[key];
          });
        }
        if (authOpts && typeof authOpts === "object") {
          Object.keys(authOpts).forEach((key) => {
            hasAuth = true;
            authData[key] = authOpts[key];
          });
        }
        if (!hasAuth) {
          return false;
        }
        switch ((authData.type || "").toString().toUpperCase()) {
          case "OAUTH2": {
            if (!authData.service && !authData.user) {
              return false;
            }
            let oauth2 = new XOAuth2(authData, this.logger);
            oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
            oauth2.on("token", (token) => this.mailer.emit("token", token));
            oauth2.on("error", (err) => this.emit("error", err));
            return {
              type: "OAUTH2",
              user: authData.user,
              oauth2,
              method: "XOAUTH2"
            };
          }
          default:
            return {
              type: (authData.type || "").toString().toUpperCase() || "LOGIN",
              user: authData.user,
              credentials: {
                user: authData.user || "",
                pass: authData.pass,
                options: authData.options
              },
              method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
            };
        }
      }
      /**
       * Sends an e-mail using the selected settings
       *
       * @param {Object} mail Mail object
       * @param {Function} callback Callback function
       */
      send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options.host || "",
                destPort: options.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options.host || "",
              options.port || ""
            );
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              returned = true;
              let err2 = new Error("Unexpected socket close");
              if (connection && connection._socket && connection._socket.upgrading) {
                err2.code = errors.ETLS;
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (_E) {
            }
          });
          let sendMessage = () => {
            let envelope = mail.message.getEnvelope();
            let messageId = mail.message.messageId();
            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
              recipients.push("...and " + recipients.splice(2).length + " more");
            }
            if (mail.data.dsn) {
              envelope.dsn = mail.data.dsn;
            }
            if (mail.data.requireTLSExtensionEnabled) {
              envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
            }
            this.logger.info(
              {
                tnx: "send",
                messageId
              },
              "Sending message %s to <%s>",
              messageId,
              recipients.join(", ")
            );
            connection.send(envelope, mail.message.createReadStream(), (err2, info) => {
              returned = true;
              connection.close();
              if (err2) {
                this.logger.error(
                  {
                    err: err2,
                    tnx: "send"
                  },
                  "Send error for %s: %s",
                  messageId,
                  err2.message
                );
                return callback(err2);
              }
              info.envelope = {
                from: envelope.from,
                to: envelope.to
              };
              info.messageId = messageId;
              try {
                return callback(null, info);
              } catch (E) {
                this.logger.error(
                  {
                    err: E,
                    tnx: "callback"
                  },
                  "Callback error for %s: %s",
                  messageId,
                  E.message
                );
              }
            });
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let auth = this.getAuth(mail.data.auth);
            if (auth && (connection.allowsAuth || options.forceAuth)) {
              connection.login(auth, (err2) => {
                if (auth && auth !== this.auth && auth.oauth2) {
                  auth.oauth2.removeAllListeners();
                }
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                sendMessage();
              });
            } else {
              sendMessage();
            }
          });
        });
      }
      /**
       * Verifies SMTP configuration
       *
       * @param {Function} callback Callback function
       */
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options.host || "",
                destPort: options.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options.host || "",
              options.port || ""
            );
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let authData = this.getAuth({});
            if (authData && (connection.allowsAuth || options.forceAuth)) {
              connection.login(authData, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else if (!authData && connection.allowsAuth && options.forceAuth) {
              let err2 = new Error("Authentication info was not provided");
              err2.code = errors.ENOAUTH;
              returned = true;
              connection.close();
              return callback(err2);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
      /**
       * Releases resources
       */
      close() {
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        this.emit("close");
      }
    };
    module2.exports = SMTPTransport;
  }
});

// node_modules/nodemailer/lib/sendmail-transport/index.js
var require_sendmail_transport = __commonJS({
  "node_modules/nodemailer/lib/sendmail-transport/index.js"(exports2, module2) {
    "use strict";
    var spawn = require("child_process").spawn;
    var packageData = require_package();
    var shared = require_shared();
    var errors = require_errors();
    var SendmailTransport = class {
      constructor(options) {
        options = options || {};
        this._spawn = spawn;
        this.options = options || {};
        this.name = "Sendmail";
        this.version = packageData.version;
        this.path = "sendmail";
        this.args = false;
        this.winbreak = false;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "sendmail"
        });
        if (options) {
          if (typeof options === "string") {
            this.path = options;
          } else if (typeof options === "object") {
            if (options.path) {
              this.path = options.path;
            }
            if (Array.isArray(options.args)) {
              this.args = options.args;
            }
            this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
          }
        }
      }
      /**
       * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
       *
       * @param {Object} emailMessage MailComposer object
       * @param {Function} callback Callback function to run when the sending is completed
       */
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let args;
        let sendmail;
        let returned;
        const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^-/.test(addr));
        if (hasInvalidAddresses) {
          let err = new Error("Can not send mail. Invalid envelope addresses.");
          err.code = errors.ESENDMAIL;
          return done(err);
        }
        if (this.args) {
          args = ["-i"].concat(this.args).concat(envelope.to);
        } else {
          args = ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
        }
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          if (typeof done === "function") {
            if (err) {
              return done(err);
            } else {
              return done(null, {
                envelope: mail.data.envelope || mail.message.getEnvelope(),
                messageId,
                response: "Messages queued for delivery"
              });
            }
          }
        };
        try {
          sendmail = this._spawn(this.path, args);
        } catch (E) {
          this.logger.error(
            {
              err: E,
              tnx: "spawn",
              messageId
            },
            "Error occurred while spawning sendmail. %s",
            E.message
          );
          return callback(E);
        }
        if (sendmail) {
          sendmail.on("error", (err) => {
            this.logger.error(
              {
                err,
                tnx: "spawn",
                messageId
              },
              "Error occurred when sending message %s. %s",
              messageId,
              err.message
            );
            callback(err);
          });
          sendmail.once("exit", (code) => {
            if (!code) {
              return callback();
            }
            let err;
            if (code === 127) {
              err = new Error("Sendmail command not found, process exited with code " + code);
            } else {
              err = new Error("Sendmail exited with code " + code);
            }
            err.code = errors.ESENDMAIL;
            this.logger.error(
              {
                err,
                tnx: "stdin",
                messageId
              },
              "Error sending message %s to sendmail. %s",
              messageId,
              err.message
            );
            callback(err);
          });
          sendmail.once("close", callback);
          sendmail.stdin.on("error", (err) => {
            this.logger.error(
              {
                err,
                tnx: "stdin",
                messageId
              },
              "Error occurred when piping message %s to sendmail. %s",
              messageId,
              err.message
            );
            callback(err);
          });
          let recipients = [].concat(envelope.to || []);
          if (recipients.length > 3) {
            recipients.push("...and " + recipients.splice(2).length + " more");
          }
          this.logger.info(
            {
              tnx: "send",
              messageId
            },
            "Sending message %s to <%s>",
            messageId,
            recipients.join(", ")
          );
          let sourceStream = mail.message.createReadStream();
          sourceStream.once("error", (err) => {
            this.logger.error(
              {
                err,
                tnx: "stdin",
                messageId
              },
              "Error occurred when generating message %s. %s",
              messageId,
              err.message
            );
            sendmail.kill("SIGINT");
            callback(err);
          });
          sourceStream.pipe(sendmail.stdin);
        } else {
          let err = new Error("sendmail was not found");
          err.code = errors.ESENDMAIL;
          return callback(err);
        }
      }
    };
    module2.exports = SendmailTransport;
  }
});

// node_modules/nodemailer/lib/stream-transport/index.js
var require_stream_transport = __commonJS({
  "node_modules/nodemailer/lib/stream-transport/index.js"(exports2, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var StreamTransport = class {
      constructor(options) {
        options = options || {};
        this.options = options || {};
        this.name = "StreamTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "stream-transport"
        });
        this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
      }
      /**
       * Compiles a mailcomposer message and forwards it to handler that sends it
       *
       * @param {Object} emailMessage MailComposer object
       * @param {Function} callback Callback function to run when the sending is completed
       */
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Sending message %s to <%s> using %s line breaks",
          messageId,
          recipients.join(", "),
          this.winbreak ? "<CR><LF>" : "<LF>"
        );
        setImmediate(() => {
          let stream;
          try {
            stream = mail.message.createReadStream();
          } catch (E) {
            this.logger.error(
              {
                err: E,
                tnx: "send",
                messageId
              },
              "Creating send stream failed for %s. %s",
              messageId,
              E.message
            );
            return done(E);
          }
          if (!this.options.buffer) {
            stream.once("error", (err) => {
              this.logger.error(
                {
                  err,
                  tnx: "send",
                  messageId
                },
                "Failed creating message for %s. %s",
                messageId,
                err.message
              );
            });
            return done(null, {
              envelope: mail.data.envelope || mail.message.getEnvelope(),
              messageId,
              message: stream
            });
          }
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          stream.once("error", (err) => {
            this.logger.error(
              {
                err,
                tnx: "send",
                messageId
              },
              "Failed creating message for %s. %s",
              messageId,
              err.message
            );
            return done(err);
          });
          stream.on(
            "end",
            () => done(null, {
              envelope: mail.data.envelope || mail.message.getEnvelope(),
              messageId,
              message: Buffer.concat(chunks, chunklen)
            })
          );
        });
      }
    };
    module2.exports = StreamTransport;
  }
});

// node_modules/nodemailer/lib/json-transport/index.js
var require_json_transport = __commonJS({
  "node_modules/nodemailer/lib/json-transport/index.js"(exports2, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var JSONTransport = class {
      constructor(options) {
        options = options || {};
        this.options = options || {};
        this.name = "JSONTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "json-transport"
        });
      }
      /**
       * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
       *
       * @param {Object} emailMessage MailComposer object
       * @param {Function} callback Callback function to run when the sending is completed
       */
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Composing JSON structure of %s to <%s>",
          messageId,
          recipients.join(", ")
        );
        setImmediate(() => {
          mail.normalize((err, data) => {
            if (err) {
              this.logger.error(
                {
                  err,
                  tnx: "send",
                  messageId
                },
                "Failed building JSON structure for %s. %s",
                messageId,
                err.message
              );
              return done(err);
            }
            delete data.envelope;
            delete data.normalizedHeaders;
            return done(null, {
              envelope,
              messageId,
              message: this.options.skipEncoding ? data : JSON.stringify(data)
            });
          });
        });
      }
    };
    module2.exports = JSONTransport;
  }
});

// node_modules/nodemailer/lib/ses-transport/index.js
var require_ses_transport = __commonJS({
  "node_modules/nodemailer/lib/ses-transport/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var packageData = require_package();
    var shared = require_shared();
    var LeWindows = require_le_windows();
    var MimeNode = require_mime_node();
    var SESTransport = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        this.options = options || {};
        this.ses = this.options.SES;
        this.name = "SESTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "ses-transport"
        });
      }
      getRegion(cb) {
        if (this.ses.sesClient.config && typeof this.ses.sesClient.config.region === "function") {
          return this.ses.sesClient.config.region().then((region) => cb(null, region)).catch((err) => cb(err));
        }
        return cb(null, false);
      }
      /**
       * Compiles a mailcomposer message and forwards it to SES
       *
       * @param {Object} emailMessage MailComposer object
       * @param {Function} callback Callback function to run when the sending is completed
       */
      send(mail, callback) {
        let statObject = {
          ts: Date.now(),
          pending: true
        };
        let fromHeader = mail.message._headers.find((header) => /^from$/i.test(header.key));
        if (fromHeader) {
          let mimeNode = new MimeNode("text/plain");
          fromHeader = mimeNode._convertAddresses(mimeNode._parseAddresses(fromHeader.value));
        }
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Sending message %s to <%s>",
          messageId,
          recipients.join(", ")
        );
        let getRawMessage = (next) => {
          if (!mail.data._dkim) {
            mail.data._dkim = {};
          }
          if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === "string") {
            mail.data._dkim.skipFields += ":date:message-id";
          } else {
            mail.data._dkim.skipFields = "date:message-id";
          }
          let sourceStream = mail.message.createReadStream();
          let stream = sourceStream.pipe(new LeWindows());
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          sourceStream.once("error", (err) => stream.emit("error", err));
          stream.once("error", (err) => {
            next(err);
          });
          stream.once("end", () => next(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(
          () => getRawMessage((err, raw) => {
            if (err) {
              this.logger.error(
                {
                  err,
                  tnx: "send",
                  messageId
                },
                "Failed creating message for %s. %s",
                messageId,
                err.message
              );
              statObject.pending = false;
              return callback(err);
            }
            let sesMessage = {
              Content: {
                Raw: {
                  // required
                  Data: raw
                  // required
                }
              },
              FromEmailAddress: fromHeader ? fromHeader : envelope.from,
              Destination: {
                ToAddresses: envelope.to
              }
            };
            Object.keys(mail.data.ses || {}).forEach((key) => {
              sesMessage[key] = mail.data.ses[key];
            });
            this.getRegion((err2, region) => {
              if (err2 || !region) {
                region = "us-east-1";
              }
              const command = new this.ses.SendEmailCommand(sesMessage);
              const sendPromise = this.ses.sesClient.send(command);
              sendPromise.then((data) => {
                if (region === "us-east-1") {
                  region = "email";
                }
                statObject.pending = true;
                callback(null, {
                  envelope: {
                    from: envelope.from,
                    to: envelope.to
                  },
                  messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
                  response: data.MessageId,
                  raw
                });
              }).catch((err3) => {
                this.logger.error(
                  {
                    err: err3,
                    tnx: "send"
                  },
                  "Send error for %s: %s",
                  messageId,
                  err3.message
                );
                statObject.pending = false;
                callback(err3);
              });
            });
          })
        );
      }
      /**
       * Verifies SES configuration
       *
       * @param {Function} callback Callback function
       */
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        const cb = (err) => {
          if (err && !["InvalidParameterValue", "MessageRejected"].includes(err.code || err.Code || err.name)) {
            return callback(err);
          }
          return callback(null, true);
        };
        const sesMessage = {
          Content: {
            Raw: {
              Data: Buffer.from("From: <invalid@invalid>\r\nTo: <invalid@invalid>\r\n Subject: Invalid\r\n\r\nInvalid")
            }
          },
          FromEmailAddress: "invalid@invalid",
          Destination: {
            ToAddresses: ["invalid@invalid"]
          }
        };
        this.getRegion((err, region) => {
          if (err || !region) {
            region = "us-east-1";
          }
          const command = new this.ses.SendEmailCommand(sesMessage);
          const sendPromise = this.ses.sesClient.send(command);
          sendPromise.then((data) => cb(null, data)).catch((err2) => cb(err2));
        });
        return promise;
      }
    };
    module2.exports = SESTransport;
  }
});

// node_modules/nodemailer/lib/nodemailer.js
var require_nodemailer = __commonJS({
  "node_modules/nodemailer/lib/nodemailer.js"(exports2, module2) {
    "use strict";
    var Mailer = require_mailer();
    var shared = require_shared();
    var SMTPPool = require_smtp_pool();
    var SMTPTransport = require_smtp_transport();
    var SendmailTransport = require_sendmail_transport();
    var StreamTransport = require_stream_transport();
    var JSONTransport = require_json_transport();
    var SESTransport = require_ses_transport();
    var errors = require_errors();
    var nmfetch = require_fetch();
    var packageData = require_package();
    var ETHEREAL_API = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
    var ETHEREAL_WEB = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
    var ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || "").replace(/\s*/g, "") || null;
    var ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
    var testAccount = false;
    module2.exports.createTransport = function(transporter, defaults) {
      let urlConfig;
      let options;
      let mailer;
      if (
        // provided transporter is a configuration object, not transporter plugin
        typeof transporter === "object" && typeof transporter.send !== "function" || // provided transporter looks like a connection url
        typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)
      ) {
        if (urlConfig = typeof transporter === "string" ? transporter : transporter.url) {
          options = shared.parseConnectionUrl(urlConfig);
        } else {
          options = transporter;
        }
        if (options.pool) {
          transporter = new SMTPPool(options);
        } else if (options.sendmail) {
          transporter = new SendmailTransport(options);
        } else if (options.streamTransport) {
          transporter = new StreamTransport(options);
        } else if (options.jsonTransport) {
          transporter = new JSONTransport(options);
        } else if (options.SES) {
          if (options.SES.ses && options.SES.aws) {
            let error = new Error(
              "Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/"
            );
            error.code = errors.ECONFIG;
            throw error;
          }
          transporter = new SESTransport(options);
        } else {
          transporter = new SMTPTransport(options);
        }
      }
      mailer = new Mailer(transporter, options, defaults);
      return mailer;
    };
    module2.exports.createTestAccount = function(apiUrl, callback) {
      let promise;
      if (!callback && typeof apiUrl === "function") {
        callback = apiUrl;
        apiUrl = false;
      }
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => callback(null, testAccount));
        return promise;
      }
      apiUrl = apiUrl || ETHEREAL_API;
      let chunks = [];
      let chunklen = 0;
      let requestHeaders = {};
      let requestBody = {
        requestor: packageData.name,
        version: packageData.version
      };
      if (ETHEREAL_API_KEY) {
        requestHeaders.Authorization = "Bearer " + ETHEREAL_API_KEY;
      }
      let req = nmfetch(apiUrl + "/user", {
        contentType: "application/json",
        method: "POST",
        headers: requestHeaders,
        body: Buffer.from(JSON.stringify(requestBody))
      });
      req.on("readable", () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      req.once("error", (err) => callback(err));
      req.once("end", () => {
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err;
        try {
          data = JSON.parse(res.toString());
        } catch (E) {
          err = E;
        }
        if (err) {
          return callback(err);
        }
        if (data.status !== "success" || data.error) {
          return callback(new Error(data.error || "Request failed"));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
      });
      return promise;
    };
    module2.exports.getTestMessageUrl = function(info) {
      if (!info || !info.response) {
        return false;
      }
      let infoProps = /* @__PURE__ */ new Map();
      info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m2, key, value) => {
          infoProps.set(key, value);
        });
      });
      if (infoProps.has("STATUS") && infoProps.has("MSGID")) {
        return (testAccount.web || ETHEREAL_WEB) + "/message/" + infoProps.get("MSGID");
      }
      return false;
    };
  }
});

// server/src/utils/send-email.js
var require_send_email = __commonJS({
  "server/src/utils/send-email.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var getSmtpSettings = async () => {
      const store = strapi.store({ type: "plugin", name: PLUGIN_ID });
      const value = await store.get({ key: "settings" }) || {};
      return value.smtp || null;
    };
    var sendEmail = async ({ to, subject, html, from = void 0, fromName = void 0 }) => {
      const smtpSettings = await getSmtpSettings();
      if (smtpSettings && smtpSettings.host && smtpSettings.port) {
        try {
          let nodemailer;
          try {
            nodemailer = require_nodemailer();
          } catch (requireError) {
            strapi.log.warn(
              `[${PLUGIN_ID}] nodemailer not found. Falling back to Strapi email plugin.`
            );
            throw new Error("nodemailer not available");
          }
          const transporter = nodemailer.createTransport({
            host: smtpSettings.host,
            port: parseInt(smtpSettings.port, 10),
            secure: smtpSettings.secure === true || smtpSettings.port === "465",
            auth: smtpSettings.username && smtpSettings.password ? {
              user: smtpSettings.username,
              pass: smtpSettings.password
            } : void 0,
            tls: {
              rejectUnauthorized: smtpSettings.rejectUnauthorized !== false
            }
          });
          const fromAddress = from || smtpSettings.from || "noreply@example.com";
          const fromDisplay = fromName || smtpSettings.fromName || "Strapi Advanced Ecommerce";
          const fromString = fromDisplay ? `${fromDisplay} <${fromAddress}>` : fromAddress;
          const info = await transporter.sendMail({
            from: fromString,
            to,
            subject,
            html
          });
          strapi.log.info(`[${PLUGIN_ID}] Email sent successfully via SMTP to ${to}:`, info.messageId);
          return { success: true, messageId: info.messageId };
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error sending email via SMTP:`, error);
          if (error.message === "nodemailer not available") {
            strapi.log.info(`[${PLUGIN_ID}] Falling back to Strapi email plugin`);
          } else {
            throw error;
          }
        }
      }
      try {
        const fromAddress = from || process.env.EMAIL_FROM || "noreply@example.com";
        await strapi.plugin("email").service("email").send({
          from: fromAddress,
          to,
          subject,
          html
        });
        strapi.log.info(`[${PLUGIN_ID}] Email sent successfully via Strapi email plugin to ${to}`);
        return { success: true };
      } catch (error) {
        strapi.log.error(`[${PLUGIN_ID}] Error sending email via Strapi email plugin:`, error);
        throw error;
      }
    };
    module2.exports = {
      sendEmail,
      getSmtpSettings
    };
  }
});

// server/src/controllers/auth.js
var require_auth = __commonJS({
  "server/src/controllers/auth.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { sendEmail } = require_send_email();
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var getStore = () => {
      return strapi.store({ type: "plugin", name: PLUGIN_ID });
    };
    var getLoginMethod = async () => {
      const store = getStore();
      const value = await store.get({ key: "settings" }) || {};
      return value.loginRegisterMethod || "default";
    };
    module2.exports = {
      /**
       * Login or Register with OTP
       * Supports both email and mobile number
       */
      async loginOrRegister(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const method = await getLoginMethod();
          if (method !== "otp") {
            return ctx.badRequest("OTP authentication is not enabled. Please enable it in plugin settings.");
          }
          const { email, mobile, type } = ctx.request.body;
          let normalizedEmail = email?.toLowerCase();
          if (!type || type !== "email" && type !== "mobile") {
            return ctx.badRequest('Type must be "email" or "mobile".');
          }
          let identifier = type === "email" ? normalizedEmail : mobile;
          if (!identifier) {
            return ctx.badRequest(
              `${type === "email" ? "Email" : "Mobile number"} is required.`
            );
          }
          let user = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: type === "email" ? { email: normalizedEmail } : { phone_no: mobile }
          });
          let isNewUser = false;
          if (!user) {
            let username = "";
            if (type === "email" && email) {
              let base = email.split("@")[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
              if (!base) base = "user";
              base = base.substring(0, 4);
              const digitsNeeded = 8 - base.length;
              const min = Math.pow(10, digitsNeeded - 1);
              const max = Math.pow(10, digitsNeeded) - 1;
              let randomDigits = String(Math.floor(Math.random() * (max - min + 1)) + min);
              username = (base + randomDigits).substring(0, 8);
            } else if (type === "mobile" && mobile) {
              const prefix = "webby";
              const randomDigits = String(Math.floor(100 + Math.random() * 900));
              username = prefix + randomDigits;
            } else {
              username = "user" + String(Math.floor(1e3 + Math.random() * 9e3));
            }
            const existing = await strapi.db.query("plugin::users-permissions.user").findOne({
              where: { username }
            });
            if (existing) {
              if (type === "mobile") {
                username = "webby" + String(Math.floor(100 + Math.random() * 900));
              } else {
                username = username.substring(0, 4) + String(Math.floor(1e3 + Math.random() * 9e3));
                username = username.substring(0, 8);
              }
            }
            const defaultRole = await strapi.db.query("plugin::users-permissions.role").findOne({ where: { type: "public" } });
            user = await strapi.plugin("users-permissions").service("user").add({
              email: type === "email" ? normalizedEmail : null,
              phone_no: type === "mobile" ? mobile : null,
              username,
              confirmed: false,
              role: defaultRole?.id || 2
            });
            isNewUser = true;
          }
          const otp = Math.floor(1e5 + Math.random() * 9e5);
          const otpDigits = otp.toString().split("");
          try {
            const db = strapi.db;
            const knex = db.connection;
            const tableName = "up_users";
            const client = db.config.connection.client;
            if (client === "postgres") {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otp, false, user.id]
              );
            } else if (client === "mysql" || client === "mysql2") {
              await knex.raw(
                `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
                [otp, false, user.id]
              );
            } else {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otp, false, user.id]
              );
            }
          } catch (err) {
            strapi.log.warn(
              `[${PLUGIN_ID}] OTP fields not found in database. Attempting to add them...`
            );
            try {
              const { extendUserSchemaWithOtpFields } = require_extend_user_schema();
              await extendUserSchemaWithOtpFields(strapi);
              const db = strapi.db;
              const knex = db.connection;
              const tableName = "up_users";
              const client = db.config.connection.client;
              if (client === "postgres") {
                await knex.raw(
                  `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                  [otp, false, user.id]
                );
              } else if (client === "mysql" || client === "mysql2") {
                await knex.raw(
                  `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
                  [otp, false, user.id]
                );
              } else {
                await knex.raw(
                  `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                  [otp, false, user.id]
                );
              }
            } catch (retryErr) {
              strapi.log.error(
                `[${PLUGIN_ID}] Failed to add OTP fields: ${retryErr.message}`
              );
              throw new Error(
                "OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README."
              );
            }
          }
          let emailSent = false;
          if (type === "email") {
            const otpEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" />
    <title>OTP Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 60px 20px 8px;">
                <h1 style="font-weight: bold; color: #111; font-size: 32px; margin: 0;">Your OTP Code for Secure Access</h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 16px 30px;">
                <p style="font-size: 16px; color: #333333; line-height: 24px; margin: 0; max-width: 500px;">
                    To complete your account verification, please use the One-Time Password (OTP) provided below. For security reasons, this OTP will expire in 10 minutes and can only be used once.
                </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 30px 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                    <tr>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[0]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[1]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[2]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[3]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[4]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[5]}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;
            try {
              await sendEmail({
                to: email,
                subject: "Your OTP Code - Strapi WebbyCommerce",
                html: otpEmailHTML
              });
              emailSent = true;
            } catch (emailError) {
              strapi.log.error(
                `[${PLUGIN_ID}] Failed to send OTP email (userId: ${user.id}, email: ${email}):`,
                emailError
              );
            }
          } else if (type === "mobile") {
            strapi.log.info(`[${PLUGIN_ID}] OTP for mobile ${mobile}: ${otp}`);
          }
          ctx.send({
            message: emailSent ? `OTP sent to ${type}.` : type === "email" ? "User created. OTP email could not be sent; please check email configuration on the server." : `OTP sent to ${type}.`,
            // mobile (future)
            userId: user.id,
            isNewUser,
            emailSent
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in loginOrRegister:`, error);
          ctx.internalServerError("Failed to send OTP. Please try again.");
        }
      },
      /**
       * Verify OTP and complete login/registration
       */
      async verifyOtp(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const method = await getLoginMethod();
          if (method !== "otp") {
            return ctx.badRequest("OTP authentication is not enabled. Please enable it in plugin settings.");
          }
          const { email, mobile, otp, type = "email" } = ctx.request.body;
          if (!otp || !(type === "email" && email || type === "mobile" && mobile)) {
            return ctx.badRequest(
              `${type === "email" ? "Email" : "Mobile number"} and OTP are required.`
            );
          }
          const identifier = type === "email" ? email.toLowerCase() : mobile;
          const user = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { [type === "email" ? "email" : "phone_no"]: identifier }
          });
          if (!user) return ctx.badRequest("User not found.");
          const db = strapi.db;
          const knex = db.connection;
          const tableName = "up_users";
          const client = db.config.connection.client;
          let userOtpData;
          let columnsExist = false;
          try {
            if (client === "postgres") {
              const result = await knex.raw(
                `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                [user.id]
              );
              userOtpData = result.rows[0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
            } else if (client === "mysql" || client === "mysql2") {
              const result = await knex.raw(
                `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
                [user.id]
              );
              userOtpData = result[0][0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
            } else {
              const result = await knex.raw(
                `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                [user.id]
              );
              userOtpData = result[0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
            }
          } catch (queryErr) {
            strapi.log.warn(`[${PLUGIN_ID}] OTP columns not found, attempting to add them:`, queryErr.message);
            columnsExist = false;
          }
          if (!columnsExist) {
            const { extendUserSchemaWithOtpFields } = require_extend_user_schema();
            const schemaExtended = await extendUserSchemaWithOtpFields(strapi);
            if (!schemaExtended) {
              return ctx.badRequest(
                "OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README."
              );
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
            try {
              if (client === "postgres") {
                const result = await knex.raw(
                  `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                  [user.id]
                );
                userOtpData = result.rows[0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
              } else if (client === "mysql" || client === "mysql2") {
                const result = await knex.raw(
                  `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
                  [user.id]
                );
                userOtpData = result[0][0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
              } else {
                const result = await knex.raw(
                  `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                  [user.id]
                );
                userOtpData = result[0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty("otp") && userOtpData.hasOwnProperty("is_otp_verified");
              }
              if (!columnsExist) {
                return ctx.badRequest(
                  "OTP fields were added but could not be queried. Please restart Strapi."
                );
              }
            } catch (retryErr) {
              strapi.log.error(`[${PLUGIN_ID}] Failed to query OTP fields after extension:`, retryErr);
              return ctx.badRequest(
                "OTP fields are not available. Please restart Strapi after extending the user schema."
              );
            }
          }
          const userOtp = userOtpData?.otp;
          const isOtpVerified = userOtpData?.is_otp_verified;
          if (isOtpVerified) return ctx.badRequest("User already verified.");
          if (userOtp !== parseInt(otp, 10)) return ctx.badRequest("Invalid OTP.");
          try {
            if (client === "postgres") {
              await knex.raw(
                `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = true, otp = NULL WHERE id = ?`,
                [true, user.id]
              );
            } else if (client === "mysql" || client === "mysql2") {
              await knex.raw(
                `UPDATE \`${tableName}\` SET \`is_otp_verified\` = ?, \`confirmed\` = true, \`otp\` = NULL WHERE \`id\` = ?`,
                [true, user.id]
              );
            } else {
              await knex.raw(
                `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = 1, otp = NULL WHERE id = ?`,
                [true, user.id]
              );
            }
          } catch (dbErr) {
            strapi.log.error(`[${PLUGIN_ID}] Database error during OTP verification:`, dbErr);
            return ctx.badRequest(
              "OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README."
            );
          }
          const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
            id: user.id
          });
          ctx.send({
            message: "Login successfully!",
            jwt,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              phone_no: user.phone_no
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in verifyOtp:`, error);
          ctx.internalServerError("Failed to verify OTP. Please try again.");
        }
      },
      /**
       * Get authenticated user profile
       * Returns all user details for the authenticated user
       */
      async getProfile(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const fullUser = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { id: user.id },
            populate: ["role"]
          });
          if (!fullUser) {
            return ctx.notFound("User not found.");
          }
          ctx.send({
            user: {
              id: fullUser.id,
              username: fullUser.username ?? null,
              email: fullUser.email ?? null,
              phone_no: fullUser.phone_no ?? null,
              first_name: fullUser.first_name ?? null,
              last_name: fullUser.last_name ?? null,
              display_name: fullUser.display_name ?? null,
              company_name: fullUser.company_name ?? null,
              confirmed: fullUser.confirmed ?? false,
              blocked: fullUser.blocked ?? false,
              role: fullUser.role ? {
                id: fullUser.role.id,
                name: fullUser.role.name,
                type: fullUser.role.type
              } : null,
              createdAt: fullUser.createdAt ?? null,
              updatedAt: fullUser.updatedAt ?? null
              // Only include fields that exist in the schema
              // Excluded: password, resetPasswordToken, confirmationToken (private fields)
              // Excluded: provider, otp, isOtpVerified (internal fields, not needed in profile)
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProfile:`, error);
          ctx.internalServerError("Failed to fetch user profile. Please try again.");
        }
      },
      /**
       * Update user profile
       * Updates user details including first_name, last_name, email, phone_no, and optional display name
       * Also supports password update if default login method is enabled
       */
      async updateProfile(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const {
            first_name,
            last_name,
            email,
            phone_no,
            display_name,
            company_name,
            currentPassword,
            newPassword
          } = ctx.request.body;
          if (!first_name || typeof first_name !== "string" || first_name.trim().length === 0) {
            return ctx.badRequest("First name is required.");
          }
          if (!last_name || typeof last_name !== "string" || last_name.trim().length === 0) {
            return ctx.badRequest("Last name is required.");
          }
          if (!email || typeof email !== "string" || email.trim().length === 0) {
            return ctx.badRequest("Email address is required.");
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email.trim())) {
            return ctx.badRequest("Invalid email format.");
          }
          if (!phone_no || typeof phone_no !== "string" || phone_no.trim().length === 0) {
            return ctx.badRequest("Phone number is required.");
          }
          const existingUserByEmail = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: {
              email: email.trim().toLowerCase(),
              $not: { id: user.id }
            }
          });
          if (existingUserByEmail) {
            return ctx.badRequest("Email address is already in use by another user.");
          }
          const existingUserByPhone = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: {
              phone_no: phone_no.trim(),
              $not: { id: user.id }
            }
          });
          if (existingUserByPhone) {
            return ctx.badRequest("Phone number is already in use by another user.");
          }
          const updateData = {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim().toLowerCase(),
            phone_no: phone_no.trim()
          };
          if (display_name !== void 0) {
            updateData.display_name = display_name.trim() || null;
          }
          if (company_name !== void 0) {
            updateData.company_name = company_name.trim() || null;
          }
          if (currentPassword || newPassword) {
            const method = await getLoginMethod();
            if (method !== "default") {
              return ctx.badRequest(
                "Password update is only available when using the default email/password authentication method."
              );
            }
            if (!currentPassword || !newPassword) {
              return ctx.badRequest("Both current password and new password are required for password update.");
            }
            const currentUser = await strapi.db.query("plugin::users-permissions.user").findOne({
              where: { id: user.id }
            });
            if (!currentUser) {
              return ctx.notFound("User not found.");
            }
            const validPassword = await strapi.plugin("users-permissions").service("users-permissions").validatePassword(currentPassword, currentUser.password);
            if (!validPassword) {
              return ctx.badRequest("Current password is incorrect.");
            }
            if (newPassword.length < 6) {
              return ctx.badRequest("New password must be at least 6 characters long.");
            }
            const hashedPassword = await strapi.plugin("users-permissions").service("users-permissions").hashPassword(newPassword);
            updateData.password = hashedPassword;
          }
          const updatedUser = await strapi.db.query("plugin::users-permissions.user").update({
            where: { id: user.id },
            data: updateData,
            populate: ["role"]
          });
          if (!updatedUser) {
            return ctx.notFound("User not found.");
          }
          ctx.send({
            message: "Profile updated successfully.",
            user: {
              id: updatedUser.id,
              username: updatedUser.username,
              email: updatedUser.email,
              phone_no: updatedUser.phone_no,
              first_name: updatedUser.first_name,
              last_name: updatedUser.last_name,
              display_name: updatedUser.display_name || null,
              company_name: updatedUser.company_name || null,
              confirmed: updatedUser.confirmed,
              blocked: updatedUser.blocked,
              role: updatedUser.role ? {
                id: updatedUser.role.id,
                name: updatedUser.role.name,
                type: updatedUser.role.type
              } : null,
              updatedAt: updatedUser.updatedAt
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateProfile:`, error);
          ctx.internalServerError("Failed to update profile. Please try again.");
        }
      }
    };
  }
});

// server/src/controllers/address.js
var require_address2 = __commonJS({
  "server/src/controllers/address.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var getStore = () => {
      return strapi.store({ type: "plugin", name: PLUGIN_ID });
    };
    var getShippingType = async () => {
      const store = getStore();
      const value = await store.get({ key: "settings" }) || {};
      return value.shippingType || "single";
    };
    module2.exports = {
      /**
       * Get all addresses for authenticated user
       */
      async getAddresses(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const { type } = ctx.query;
          const where = { user: user.id };
          if (type !== void 0) {
            where.type = parseInt(type, 10);
          }
          const addresses = await strapi.db.query("plugin::webbycommerce.address").findMany({
            where,
            orderBy: { createdAt: "desc" }
          });
          ctx.send({ data: addresses });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getAddresses:`, error);
          ctx.internalServerError("Failed to fetch addresses. Please try again.");
        }
      },
      /**
       * Get single address by ID
       */
      async getAddress(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const { id } = ctx.params;
          const address = await strapi.db.query("plugin::webbycommerce.address").findOne({
            where: { id, user: user.id }
          });
          if (!address) {
            return ctx.notFound("Address not found.");
          }
          ctx.send({ data: address });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getAddress:`, error);
          ctx.internalServerError("Failed to fetch address. Please try again.");
        }
      },
      /**
       * Create new address
       */
      async createAddress(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const shippingType = await getShippingType();
          const {
            type,
            first_name,
            last_name,
            company_name,
            country,
            region,
            city,
            street_address,
            postcode,
            phone,
            email_address
          } = ctx.request.body || {};
          if (type === void 0 || type === null) {
            return ctx.badRequest("Type is required and must be 0 (billing) or 1 (shipping).");
          }
          let typeInt;
          if (type === 0 || type === "0" || type === 0) {
            typeInt = 0;
          } else if (type === 1 || type === "1" || type === 1) {
            typeInt = 1;
          } else {
            typeInt = Number(type);
            if (isNaN(typeInt) || typeInt !== 0 && typeInt !== 1) {
              return ctx.badRequest("Type is required and must be 0 (billing) or 1 (shipping).");
            }
          }
          if (!first_name || typeof first_name !== "string" || first_name.trim().length === 0) {
            return ctx.badRequest("First name is required.");
          }
          if (!last_name || typeof last_name !== "string" || last_name.trim().length === 0) {
            return ctx.badRequest("Last name is required.");
          }
          if (!country || typeof country !== "string" || country.trim().length === 0) {
            return ctx.badRequest("Country is required.");
          }
          if (!city || typeof city !== "string" || city.trim().length === 0) {
            return ctx.badRequest("City is required.");
          }
          if (!street_address || typeof street_address !== "string" || street_address.trim().length === 0) {
            return ctx.badRequest("Street address is required.");
          }
          if (!postcode || typeof postcode !== "string" || postcode.trim().length === 0) {
            return ctx.badRequest("Postcode is required.");
          }
          if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
            return ctx.badRequest("Phone is required.");
          }
          if (typeInt === 0 && (!email_address || typeof email_address !== "string" || email_address.trim().length === 0)) {
            return ctx.badRequest("Email address is required for billing addresses.");
          }
          if (email_address) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email_address.trim())) {
              return ctx.badRequest("Invalid email format.");
            }
          }
          if (shippingType === "single") {
            const existingAddress = await strapi.db.query("plugin::webbycommerce.address").findOne({
              where: { user: user.id, type: typeInt }
            });
            if (existingAddress) {
              return ctx.forbidden(
                `A ${typeInt === 0 ? "billing" : "shipping"} address already exists. Please update the existing address or enable multiple address mode in settings.`
              );
            }
          }
          const address = await strapi.db.query("plugin::webbycommerce.address").create({
            data: {
              type: typeInt,
              first_name: first_name.trim(),
              last_name: last_name.trim(),
              company_name: company_name ? company_name.trim() : null,
              country: country.trim(),
              region: region ? region.trim() : null,
              city: city.trim(),
              street_address: street_address.trim(),
              postcode: postcode.trim(),
              phone: phone.trim(),
              email_address: email_address ? email_address.trim().toLowerCase() : null,
              user: user.id
            }
          });
          ctx.send({ data: address });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createAddress:`, error);
          ctx.internalServerError("Failed to create address. Please try again.");
        }
      },
      /**
       * Update address
       */
      async updateAddress(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const { id } = ctx.params;
          const {
            type,
            first_name,
            last_name,
            company_name,
            country,
            region,
            city,
            street_address,
            postcode,
            phone,
            email_address
          } = ctx.request.body;
          const existingAddress = await strapi.db.query("plugin::webbycommerce.address").findOne({
            where: { id, user: user.id }
          });
          if (!existingAddress) {
            return ctx.notFound("Address not found.");
          }
          if (type !== void 0) {
            const typeInt = parseInt(type, 10);
            if (isNaN(typeInt) || typeInt !== 0 && typeInt !== 1) {
              return ctx.badRequest("Type must be 0 (billing) or 1 (shipping).");
            }
          }
          if (first_name !== void 0 && (!first_name || typeof first_name !== "string" || first_name.trim().length === 0)) {
            return ctx.badRequest("First name is required.");
          }
          if (last_name !== void 0 && (!last_name || typeof last_name !== "string" || last_name.trim().length === 0)) {
            return ctx.badRequest("Last name is required.");
          }
          if (country !== void 0 && (!country || typeof country !== "string" || country.trim().length === 0)) {
            return ctx.badRequest("Country is required.");
          }
          if (city !== void 0 && (!city || typeof city !== "string" || city.trim().length === 0)) {
            return ctx.badRequest("City is required.");
          }
          if (street_address !== void 0 && (!street_address || typeof street_address !== "string" || street_address.trim().length === 0)) {
            return ctx.badRequest("Street address is required.");
          }
          if (postcode !== void 0 && (!postcode || typeof postcode !== "string" || postcode.trim().length === 0)) {
            return ctx.badRequest("Postcode is required.");
          }
          if (phone !== void 0 && (!phone || typeof phone !== "string" || phone.trim().length === 0)) {
            return ctx.badRequest("Phone is required.");
          }
          if (email_address !== void 0) {
            const addressType = type !== void 0 ? parseInt(type, 10) : existingAddress.type;
            if (addressType === 0 && (!email_address || typeof email_address !== "string" || email_address.trim().length === 0)) {
              return ctx.badRequest("Email address is required for billing addresses.");
            }
            if (email_address) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email_address.trim())) {
                return ctx.badRequest("Invalid email format.");
              }
            }
          }
          const updateData = {};
          if (type !== void 0) {
            const typeInt = parseInt(type, 10);
            if (!isNaN(typeInt) && (typeInt === 0 || typeInt === 1)) {
              updateData.type = typeInt;
            }
          }
          if (first_name !== void 0) updateData.first_name = first_name.trim();
          if (last_name !== void 0) updateData.last_name = last_name.trim();
          if (company_name !== void 0) updateData.company_name = company_name ? company_name.trim() : null;
          if (country !== void 0) updateData.country = country.trim();
          if (region !== void 0) updateData.region = region ? region.trim() : null;
          if (city !== void 0) updateData.city = city.trim();
          if (street_address !== void 0) updateData.street_address = street_address.trim();
          if (postcode !== void 0) updateData.postcode = postcode.trim();
          if (phone !== void 0) updateData.phone = phone.trim();
          if (email_address !== void 0) updateData.email_address = email_address ? email_address.trim().toLowerCase() : null;
          const updatedAddress = await strapi.db.query("plugin::webbycommerce.address").update({
            where: { id },
            data: updateData
          });
          ctx.send({ data: updatedAddress });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateAddress:`, error);
          ctx.internalServerError("Failed to update address. Please try again.");
        }
      },
      /**
       * Delete address
       */
      async deleteAddress(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const { id } = ctx.params;
          const address = await strapi.db.query("plugin::webbycommerce.address").findOne({
            where: { id, user: user.id }
          });
          if (!address) {
            return ctx.notFound("Address not found.");
          }
          await strapi.db.query("plugin::webbycommerce.address").delete({
            where: { id }
          });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteAddress:`, error);
          ctx.internalServerError("Failed to delete address. Please try again.");
        }
      }
    };
  }
});

// server/src/controllers/compare.js
var require_compare2 = __commonJS({
  "server/src/controllers/compare.js"(exports2, module2) {
    "use strict";
    var { createCoreController } = require("@strapi/strapi").factories;
    module2.exports = createCoreController("plugin::webbycommerce.compare", ({ strapi: strapi2 }) => ({
      async getCompare(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const compare = await strapi2.plugin("webbycommerce").service("compare").findUserCompare(user.id);
          if (!compare) {
            return ctx.send({
              data: {
                id: null,
                userId: user.id,
                userEmail: user.email,
                products: [],
                category: null,
                isPublic: false,
                name: null,
                notes: null
              },
              meta: {
                totalProducts: 0,
                comparisonData: {}
              }
            });
          }
          const compareData = await strapi2.plugin("webbycommerce").service("compare").getCompareData(user.id);
          ctx.send({
            data: compare,
            meta: {
              totalProducts: compare?.products?.length || 0,
              comparisonData: compareData.comparisonData
            }
          });
        } catch (error) {
          strapi2.log.error("Error fetching compare:", error);
          ctx.badRequest("Failed to fetch compare list", { error: error.message });
        }
      },
      async addToCompare(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productId } = ctx.request.body;
          if (!productId) {
            return ctx.badRequest("Product ID is required");
          }
          const compare = await strapi2.plugin("webbycommerce").service("compare").addProductToCompare(user.id, user.email, productId);
          const compareData = await strapi2.plugin("webbycommerce").service("compare").getCompareData(user.id);
          ctx.send({
            data: compare,
            meta: {
              totalProducts: compare?.products?.length || 0,
              comparisonData: compareData.comparisonData
            },
            message: "Product added to compare list successfully"
          });
        } catch (error) {
          strapi2.log.error("Error adding to compare:", error);
          ctx.badRequest("Failed to add product to compare list", { error: error.message });
        }
      },
      async removeFromCompare(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productId } = ctx.params;
          if (!productId) {
            return ctx.badRequest("Product ID is required");
          }
          const compare = await strapi2.plugin("webbycommerce").service("compare").removeProductFromCompare(user.id, productId);
          const compareData = await strapi2.plugin("webbycommerce").service("compare").getCompareData(user.id);
          ctx.send({
            data: compare,
            meta: {
              totalProducts: compare?.products?.length || 0,
              comparisonData: compareData.comparisonData
            },
            message: "Product removed from compare list successfully"
          });
        } catch (error) {
          strapi2.log.error("Error removing from compare:", error);
          ctx.badRequest("Failed to remove product from compare list", { error: error.message });
        }
      },
      async clearCompare(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const compare = await strapi2.plugin("webbycommerce").service("compare").clearCompare(user.id);
          ctx.send({
            data: compare,
            meta: {
              totalProducts: 0,
              comparisonData: {}
            },
            message: "Compare list cleared successfully"
          });
        } catch (error) {
          strapi2.log.error("Error clearing compare:", error);
          ctx.badRequest("Failed to clear compare list", { error: error.message });
        }
      },
      async updateCompare(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { name, notes, isPublic } = ctx.request.body;
          const compare = await strapi2.plugin("webbycommerce").service("compare").updateCompare(user.id, { name, notes, isPublic });
          ctx.send({
            data: compare,
            message: "Compare list updated successfully"
          });
        } catch (error) {
          strapi2.log.error("Error updating compare:", error);
          ctx.badRequest("Failed to update compare list", { error: error.message });
        }
      },
      async getComparisonData(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const compareData = await strapi2.plugin("webbycommerce").service("compare").getCompareData(user.id);
          ctx.send({
            data: compareData
          });
        } catch (error) {
          strapi2.log.error("Error getting comparison data:", error);
          ctx.badRequest("Failed to get comparison data", { error: error.message });
        }
      },
      async checkCompareStatus(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productIds } = ctx.query;
          if (!productIds) {
            return ctx.badRequest("Product IDs are required");
          }
          const compare = await strapi2.plugin("webbycommerce").service("compare").findUserCompare(user.id);
          const productIdArray = Array.isArray(productIds) ? productIds.map((id) => parseInt(id)) : [parseInt(productIds)];
          const inCompare = {};
          if (compare && compare.products && Array.isArray(compare.products)) {
            productIdArray.forEach((productId) => {
              inCompare[productId] = compare.products.some((product) => {
                const productIdValue = typeof product === "object" && product !== null ? product.id : product;
                return productIdValue === productId;
              });
            });
          } else {
            productIdArray.forEach((productId) => {
              inCompare[productId] = false;
            });
          }
          ctx.send({
            data: inCompare
          });
        } catch (error) {
          strapi2.log.error("Error checking compare status:", error);
          ctx.badRequest("Failed to check compare status", { error: error.message });
        }
      }
    }));
  }
});

// server/src/controllers/order.js
var require_order2 = __commonJS({
  "server/src/controllers/order.js"(exports2, module2) {
    "use strict";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var { sendEmail } = require_send_email();
    module2.exports = {
      // Create checkout order
      async checkout(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const {
            billing_address,
            shipping_address,
            payment_method,
            shipping_method,
            notes,
            tax_amount,
            shipping_amount,
            discount_amount
          } = ctx.request.body;
          if (!billing_address || !shipping_address || !payment_method) {
            return ctx.badRequest("Billing address, shipping address, and payment method are required");
          }
          let normalizedPaymentMethod = "COD";
          if (payment_method) {
            if (typeof payment_method === "object" && payment_method !== null) {
              normalizedPaymentMethod = payment_method.type || payment_method.method || payment_method.name || "COD";
            } else if (typeof payment_method === "string") {
              normalizedPaymentMethod = payment_method;
            }
          }
          const cart = await strapi.db.query("plugin::webbycommerce.cart").findOne({
            where: { user: user.id },
            select: ["id"]
          });
          const cartItems = cart?.id ? await strapi.db.query("plugin::webbycommerce.cart-item").findMany({
            where: { cart: cart.id },
            populate: {
              product: {
                populate: ["images"]
              }
            }
          }) : [];
          if (cartItems.length === 0) {
            return ctx.badRequest("Cart is empty");
          }
          let subtotal = 0;
          let totalItems = 0;
          const orderItems = [];
          for (const cartItem of cartItems) {
            const product = cartItem.product;
            if (!product) {
              return ctx.badRequest(`Product with ID ${cartItem.product} not found`);
            }
            if (product.stock_status !== "in_stock" || product.stock_quantity < cartItem.quantity) {
              return ctx.badRequest(`Insufficient stock for product: ${product.name}`);
            }
            const itemPrice = parseFloat(product.price);
            const itemTotal = itemPrice * cartItem.quantity;
            subtotal += itemTotal;
            totalItems += cartItem.quantity;
            orderItems.push({
              product_id: product.id,
              product_name: product.name,
              product_sku: product.sku,
              product_price: itemPrice,
              quantity: cartItem.quantity,
              total_price: itemTotal,
              product_image: product.images?.[0]?.url || null
            });
          }
          const taxAmount = tax_amount != null ? parseFloat(tax_amount) || 0 : 0;
          const finalShippingAmount = shipping_amount != null ? parseFloat(shipping_amount) || 0 : 0;
          const finalDiscountAmount = discount_amount != null ? parseFloat(discount_amount) || 0 : 0;
          const total = subtotal + taxAmount + finalShippingAmount - finalDiscountAmount;
          const orderNumber = await this.generateOrderNumber();
          const itemsConnect = cartItems.length > 0 ? { connect: cartItems.map((item) => ({ id: item.product.id })) } : void 0;
          const orderData = {
            order_number: orderNumber,
            status: "pending",
            user: user.id,
            subtotal: subtotal.toFixed(2),
            tax_amount: taxAmount.toFixed(2),
            shipping_amount: finalShippingAmount.toFixed(2),
            // Use from request
            discount_amount: finalDiscountAmount.toFixed(2),
            // Use from request
            total: total.toFixed(2),
            currency: "USD",
            billing_address,
            shipping_address,
            payment_method: normalizedPaymentMethod,
            // Store as string
            payment_status: "pending",
            shipping_method: shipping_method || null,
            notes: notes || null
          };
          if (itemsConnect) {
            orderData.items = itemsConnect;
          }
          const order = await strapi.db.query("plugin::webbycommerce.order").create({
            data: orderData
          });
          for (const cartItem of cartItems) {
            const newStockQuantity = cartItem.product.stock_quantity - cartItem.quantity;
            const newStockStatus = newStockQuantity <= 0 ? "out_of_stock" : "in_stock";
            await strapi.db.query("plugin::webbycommerce.product").update({
              where: { id: cartItem.product.id },
              data: {
                stock_quantity: newStockQuantity,
                stock_status: newStockStatus
              }
            });
          }
          await strapi.db.query("plugin::webbycommerce.cart-item").deleteMany({
            where: cart?.id ? { cart: cart.id } : { user: user.id }
          });
          try {
            await this.sendOrderConfirmationEmail(user, order);
          } catch (emailError) {
            strapi.log.error("Failed to send order confirmation email:", emailError);
          }
          ctx.send({
            data: {
              order_id: order.id,
              order_number: order.order_number,
              status: order.status,
              subtotal: parseFloat(order.subtotal),
              tax_amount: parseFloat(order.tax_amount),
              shipping_amount: parseFloat(order.shipping_amount),
              discount_amount: parseFloat(order.discount_amount),
              total: parseFloat(order.total),
              currency: order.currency,
              payment_method: order.payment_method,
              // Return payment method as string
              shipping_method: order.shipping_method,
              items: order.items,
              created_at: order.createdAt
            },
            message: "Order created successfully"
          });
        } catch (error) {
          strapi.log.error("Checkout error:", error);
          ctx.badRequest("Failed to process checkout");
        }
      },
      // Get user orders
      async getOrders(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const { page = 1, limit = 10, status } = ctx.query;
          const query = {
            where: { user: user.id },
            orderBy: { createdAt: "desc" },
            populate: ["items", "billing_address", "shipping_address", "user", "payment_transactions"],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
          };
          if (status) {
            query.where.status = status;
          }
          const orders = await strapi.db.query("plugin::webbycommerce.order").findMany(query);
          const total = await strapi.db.query("plugin::webbycommerce.order").count({
            where: { user: user.id, ...status && { status } }
          });
          const formattedOrders = await Promise.all(orders.map(async (order) => {
            let formattedItems = [];
            if (order.items && order.items.length > 0) {
              const itemIds = order.items.map((item) => typeof item === "object" && item.id ? item.id : item);
              const products = await strapi.db.query("plugin::webbycommerce.product").findMany({
                where: {
                  id: { $in: itemIds }
                },
                populate: {
                  images: true
                }
              });
              formattedItems = products.map((product) => ({
                id: product.id,
                name: product.name,
                sku: product.sku,
                price: parseFloat(product.price || 0),
                sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
                images: product.images || [],
                slug: product.slug,
                description: product.description
              }));
            } else if (order.items && Array.isArray(order.items)) {
              formattedItems = order.items.map((item) => ({
                id: item.id,
                name: item.name,
                sku: item.sku,
                price: parseFloat(item.price || 0),
                sale_price: item.sale_price ? parseFloat(item.sale_price) : null,
                images: item.images || [],
                slug: item.slug,
                description: item.description
              }));
            }
            const shippingAmount = parseFloat(order.shipping_amount || 0);
            const subtotalAmount = parseFloat(order.subtotal || 0);
            const discountAmount = parseFloat(order.discount_amount || 0);
            return {
              id: order.id,
              order_number: order.order_number,
              status: order.status,
              payment_status: order.payment_status,
              items: formattedItems,
              items_count: formattedItems.length,
              subtotal: subtotalAmount,
              tax_amount: parseFloat(order.tax_amount || 0),
              shipping: shippingAmount,
              shipping_amount: shippingAmount,
              discount: discountAmount,
              discount_amount: discountAmount,
              total: parseFloat(order.total || 0),
              currency: order.currency,
              billing_address: order.billing_address,
              shipping_address: order.shipping_address,
              payment_method: (() => {
                if (!order.payment_method) return "N/A";
                if (typeof order.payment_method === "object" && order.payment_method !== null) {
                  return order.payment_method.type || order.payment_method.method || order.payment_method.name || String(order.payment_method);
                }
                return String(order.payment_method);
              })(),
              shipping_method: order.shipping_method,
              notes: order.notes,
              tracking_number: order.tracking_number,
              estimated_delivery: order.estimated_delivery,
              payment_transactions: order.payment_transactions || [],
              user: order.user ? {
                id: order.user.id,
                username: order.user.username,
                email: order.user.email
              } : null,
              created_at: order.createdAt,
              updated_at: order.updatedAt
            };
          }));
          ctx.send({
            data: formattedOrders,
            meta: {
              pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
              }
            }
          });
        } catch (error) {
          strapi.log.error("Get orders error:", error);
          ctx.badRequest("Failed to retrieve orders");
        }
      },
      // Get specific order
      async getOrder(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const { id } = ctx.params;
          if (!id) {
            return ctx.badRequest("Order ID or order number is required");
          }
          const isOrderNumber = id.toString().startsWith("ORD-");
          const whereClause = {
            user: user.id
            // Filter by user ID directly for security
          };
          if (isOrderNumber) {
            whereClause.order_number = id;
          } else {
            whereClause.id = id;
          }
          let order = await strapi.db.query("plugin::webbycommerce.order").findOne({
            where: whereClause,
            populate: ["billing_address", "shipping_address", "items", "user"]
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          let formattedItems = [];
          if (order.items && order.items.length > 0) {
            const itemIds = order.items.map((item) => typeof item === "object" && item.id ? item.id : item);
            const products = await strapi.db.query("plugin::webbycommerce.product").findMany({
              where: {
                id: { $in: itemIds }
              },
              populate: {
                images: true
              }
            });
            formattedItems = products.map((product) => ({
              id: product.id,
              name: product.name,
              sku: product.sku,
              price: parseFloat(product.price || 0),
              sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
              images: product.images || [],
              slug: product.slug,
              description: product.description
            }));
          } else if (order.items && Array.isArray(order.items)) {
            formattedItems = order.items.map((item) => ({
              id: item.id,
              name: item.name,
              sku: item.sku,
              price: parseFloat(item.price || 0),
              sale_price: item.sale_price ? parseFloat(item.sale_price) : null,
              images: item.images || [],
              slug: item.slug,
              description: item.description
            }));
          }
          const shippingAmount = parseFloat(order.shipping_amount || 0);
          const subtotalAmount = parseFloat(order.subtotal || 0);
          const discountAmount = parseFloat(order.discount_amount || 0);
          ctx.send({
            data: {
              id: order.id,
              order_number: order.order_number,
              status: order.status,
              payment_status: order.payment_status,
              items: formattedItems,
              items_count: formattedItems.length,
              subtotal: subtotalAmount,
              tax_amount: parseFloat(order.tax_amount || 0),
              shipping: shippingAmount,
              shipping_amount: shippingAmount,
              discount: discountAmount,
              discount_amount: discountAmount,
              total: parseFloat(order.total || 0),
              currency: order.currency,
              billing_address: order.billing_address,
              shipping_address: order.shipping_address,
              payment_method: (() => {
                if (!order.payment_method) return "N/A";
                if (typeof order.payment_method === "object" && order.payment_method !== null) {
                  return order.payment_method.type || order.payment_method.method || order.payment_method.name || String(order.payment_method);
                }
                return String(order.payment_method);
              })(),
              shipping_method: order.shipping_method,
              notes: order.notes,
              tracking_number: order.tracking_number,
              estimated_delivery: order.estimated_delivery,
              created_at: order.createdAt,
              updated_at: order.updatedAt
            }
          });
        } catch (error) {
          strapi.log.error("Get order error:", error);
          ctx.badRequest("Failed to retrieve order");
        }
      },
      // Cancel order (only if pending or processing)
      async cancelOrder(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          try {
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return;
            }
          } catch (permissionError) {
            strapi.log.error(`[cancelOrder] Error checking permission:`, permissionError);
            return ctx.badRequest("Permission check failed");
          }
          const { id } = ctx.params;
          if (!id) {
            return ctx.badRequest("Order ID is required");
          }
          const orderId = typeof id === "string" ? isNaN(id) ? id : parseInt(id, 10) : id;
          strapi.log.info(`[cancelOrder] Attempting to cancel order ${orderId} (original: ${id}, type: ${typeof id}) for user ${user.id}`);
          let order;
          try {
            order = await strapi.db.query("plugin::webbycommerce.order").findOne({
              where: {
                id: orderId,
                user: user.id
                // Filter by user ID directly for security
              },
              populate: ["items", "user"]
            });
            if (!order && orderId !== id) {
              strapi.log.info(`[cancelOrder] Order not found with normalized ID ${orderId}, trying original ID ${id}`);
              order = await strapi.db.query("plugin::webbycommerce.order").findOne({
                where: {
                  id,
                  user: user.id
                },
                populate: ["items", "user"]
              });
            }
          } catch (queryError) {
            strapi.log.error(`[cancelOrder] Error querying order ${orderId}:`, queryError);
            strapi.log.error(`[cancelOrder] Query error message:`, queryError.message);
            return ctx.badRequest(`Failed to retrieve order: ${queryError.message || "Database error"}`);
          }
          if (!order) {
            strapi.log.warn(`[cancelOrder] Order ${orderId} not found for user ${user.id}`);
            return ctx.notFound("Order not found");
          }
          strapi.log.info(`[cancelOrder] Found order ${order.id} (order_number: ${order.order_number}) with status: ${order.status || "null/undefined"}`);
          const orderStatus = order.status || "";
          const cancellableStatuses = ["pending", "processing"];
          if (!orderStatus) {
            strapi.log.warn(`[cancelOrder] Order ${order.id} has no status`);
            return ctx.badRequest("Order status is invalid");
          }
          if (!cancellableStatuses.includes(orderStatus)) {
            if (orderStatus === "cancelled") {
              return ctx.badRequest("Order is already cancelled");
            }
            if (orderStatus === "delivered") {
              return ctx.badRequest("Delivered orders cannot be cancelled");
            }
            if (orderStatus === "shipped") {
              return ctx.badRequest("Shipped orders cannot be cancelled. Please contact support for returns.");
            }
            return ctx.badRequest(`Order with status '${orderStatus}' cannot be cancelled`);
          }
          let updatedOrder;
          try {
            updatedOrder = await strapi.db.query("plugin::webbycommerce.order").update({
              where: { id: order.id },
              data: { status: "cancelled" }
            });
            if (!updatedOrder) {
              strapi.log.error(`[cancelOrder] Failed to update order ${order.id} status - update returned null`);
              return ctx.badRequest("Failed to update order status");
            }
            strapi.log.info(`[cancelOrder] Successfully updated order ${order.id} status to cancelled`);
          } catch (updateError) {
            strapi.log.error(`[cancelOrder] Error updating order ${order.id}:`, updateError);
            strapi.log.error(`[cancelOrder] Update error message:`, updateError.message);
            strapi.log.error(`[cancelOrder] Update error stack:`, updateError.stack);
            return ctx.badRequest(`Failed to update order status: ${updateError.message || "Unknown error"}`);
          }
          if (order.items && Array.isArray(order.items) && order.items.length > 0) {
            try {
              for (const item of order.items) {
                const productId = typeof item === "object" && item.id ? item.id : item;
                if (!productId) {
                  strapi.log.warn(`[cancelOrder] Skipping item with invalid ID for order ${order.id}`);
                  continue;
                }
                try {
                  const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
                    where: { id: productId }
                  });
                  if (product) {
                    const quantityToRestore = 1;
                    const newStockQuantity = (product.stock_quantity || 0) + quantityToRestore;
                    const newStockStatus = newStockQuantity > 0 ? "in_stock" : "out_of_stock";
                    await strapi.db.query("plugin::webbycommerce.product").update({
                      where: { id: productId },
                      data: {
                        stock_quantity: newStockQuantity,
                        stock_status: newStockStatus
                      }
                    });
                    strapi.log.info(`[cancelOrder] Restored ${quantityToRestore} unit(s) of product ${productId} for order ${order.id}`);
                  } else {
                    strapi.log.warn(`[cancelOrder] Product ${productId} not found for order ${order.id}`);
                  }
                } catch (productError) {
                  strapi.log.error(`[cancelOrder] Error processing product ${productId} for order ${order.id}:`, productError);
                }
              }
            } catch (stockError) {
              strapi.log.error(`[cancelOrder] Error restoring stock for order ${order.id}:`, stockError);
            }
          }
          try {
            return ctx.send({
              data: {
                id: updatedOrder.id,
                order_number: updatedOrder.order_number,
                status: updatedOrder.status
              },
              message: "Order cancelled successfully"
            });
          } catch (sendError) {
            strapi.log.error(`[cancelOrder] Error sending response for order ${order.id}:`, sendError);
            return ctx.send({
              data: {
                id: updatedOrder.id,
                order_number: updatedOrder.order_number,
                status: updatedOrder.status
              },
              message: "Order cancelled successfully"
            });
          }
        } catch (error) {
          strapi.log.error(`[cancelOrder] Unexpected error cancelling order:`, error);
          strapi.log.error(`[cancelOrder] Error name:`, error.name);
          strapi.log.error(`[cancelOrder] Error message:`, error.message);
          strapi.log.error(`[cancelOrder] Error stack:`, error.stack);
          const errorMessage = error.message || "Unknown error occurred";
          const errorDetails = error.details ? JSON.stringify(error.details) : "";
          strapi.log.error(`[cancelOrder] Full error details:`, {
            name: error.name,
            message: errorMessage,
            details: errorDetails,
            stack: error.stack
          });
          return ctx.badRequest(`Failed to cancel order: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ""}`);
        }
      },
      // Update order status (admin only)
      async updateOrderStatus(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const { id } = ctx.params;
          const { status, tracking_number, estimated_delivery, notes } = ctx.request.body;
          if (!id) {
            return ctx.badRequest("Order ID is required");
          }
          if (!status) {
            return ctx.badRequest("Status is required");
          }
          const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];
          if (!validStatuses.includes(status)) {
            return ctx.badRequest(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
          }
          const order = await strapi.db.query("plugin::webbycommerce.order").findOne({
            where: { id },
            populate: ["user"]
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          const isAdmin = user.role && (user.role.type === "superadmin" || user.role.name === "Administrator");
          if (!isAdmin && order.user.id !== user.id) {
            return ctx.forbidden("You can only update your own orders");
          }
          const updateData = { status };
          if (tracking_number !== void 0) {
            updateData.tracking_number = tracking_number;
          }
          if (estimated_delivery !== void 0) {
            updateData.estimated_delivery = new Date(estimated_delivery);
          }
          if (notes !== void 0) {
            updateData.notes = notes;
          }
          const updatedOrder = await strapi.db.query("plugin::webbycommerce.order").update({
            where: { id },
            data: updateData
          });
          try {
            if (order.user.email) {
              await this.sendOrderStatusUpdateEmail(order.user, updatedOrder, status);
            }
          } catch (emailError) {
            strapi.log.error("Failed to send order status update email:", emailError);
          }
          if (status === "cancelled" && order.status !== "cancelled") {
            await this.restoreOrderStock(order);
          }
          ctx.send({
            data: {
              id: updatedOrder.id,
              order_number: updatedOrder.order_number,
              status: updatedOrder.status,
              tracking_number: updatedOrder.tracking_number,
              estimated_delivery: updatedOrder.estimated_delivery,
              updated_at: updatedOrder.updatedAt
            },
            message: "Order status updated successfully"
          });
        } catch (error) {
          strapi.log.error("Update order status error:", error);
          ctx.badRequest("Failed to update order status");
        }
      },
      // Get order tracking information
      async getOrderTracking(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const { id } = ctx.params;
          if (!id) {
            return ctx.badRequest("Order ID is required");
          }
          const order = await strapi.db.query("plugin::webbycommerce.order").findOne({
            where: {
              id,
              user: user.id
              // Filter by user ID directly for security
            },
            populate: ["shipping_address", "user"]
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          const trackingTimeline = this.generateTrackingTimeline(order);
          ctx.send({
            data: {
              order_id: order.id,
              order_number: order.order_number,
              status: order.status,
              tracking_number: order.tracking_number,
              estimated_delivery: order.estimated_delivery,
              shipping_method: order.shipping_method,
              shipping_address: order.shipping_address,
              tracking_timeline: trackingTimeline,
              current_location: this.getCurrentLocation(order.status),
              delivery_status: this.getDeliveryStatus(order.status)
            }
          });
        } catch (error) {
          strapi.log.error("Get order tracking error:", error);
          ctx.badRequest("Failed to retrieve order tracking information");
        }
      },
      // Generate unique order number
      async generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
        return `ORD-${timestamp}-${random}`;
      },
      // Send order confirmation email
      async sendOrderConfirmationEmail(user, order) {
        try {
          const settings = await strapi.store({ type: "plugin", name: "webbycommerce" }).get({ key: "settings" });
          const smtpSettings = settings?.smtp;
          if (!smtpSettings) {
            strapi.log.warn("SMTP settings not configured, skipping order confirmation email");
            return;
          }
          let orderWithItems = order;
          if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            orderWithItems = await strapi.db.query("plugin::webbycommerce.order").findOne({
              where: { id: order.id },
              populate: ["items"]
            });
          }
          let itemsHtml = "<li>No items found</li>";
          if (orderWithItems && orderWithItems.items && Array.isArray(orderWithItems.items) && orderWithItems.items.length > 0) {
            itemsHtml = orderWithItems.items.map((item) => {
              if (!item) return "";
              const productName = item.name || item.product_name || "Unknown Product";
              const productPrice = item.price || item.product_price || 0;
              return `<li>${productName} - $${parseFloat(productPrice).toFixed(2)}</li>`;
            }).filter((item) => item !== "").join("");
            if (!itemsHtml) {
              itemsHtml = "<li>No items found</li>";
            }
          }
          const emailData = {
            to: user.email,
            subject: `Order Confirmation - ${order.order_number || orderWithItems?.order_number || "N/A"}`,
            html: `
          <h2>Order Confirmation</h2>
          <p>Dear ${user.username || "Customer"},</p>
          <p>Thank you for your order! Here are the details:</p>
          <h3>Order #${order.order_number || orderWithItems?.order_number || "N/A"}</h3>
          <p><strong>Total: $${order.total || orderWithItems?.total || 0} ${order.currency || orderWithItems?.currency || "USD"}</strong></p>
          <p><strong>Status:</strong> ${order.status || orderWithItems?.status || "pending"}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${itemsHtml}
          </ul>
          <p>We will process your order shortly.</p>
          <p>Best regards,<br>Your Ecommerce Team</p>
        `
          };
          await sendEmail(emailData);
          strapi.log.info(`Order confirmation email sent successfully for order ${order.id || orderWithItems?.id}`);
        } catch (error) {
          strapi.log.error("Error sending order confirmation email:", error);
          strapi.log.error("Email error details:", {
            message: error.message,
            stack: error.stack,
            orderId: order?.id,
            orderNumber: order?.order_number
          });
        }
      },
      // Send order status update email
      async sendOrderStatusUpdateEmail(user, order, newStatus) {
        try {
          const settings = await strapi.store({ type: "plugin", name: "webbycommerce" }).get({ key: "settings" });
          const smtpSettings = settings?.smtp;
          if (!smtpSettings) {
            strapi.log.warn("SMTP settings not configured, skipping order status update email");
            return;
          }
          const statusMessages = {
            pending: "Your order is being prepared",
            processing: "Your order is now being processed",
            shipped: "Your order has been shipped",
            delivered: "Your order has been delivered successfully",
            cancelled: "Your order has been cancelled",
            refunded: "Your order has been refunded"
          };
          const emailData = {
            to: user.email,
            subject: `Order Status Update - ${order.order_number || "N/A"}`,
            html: `
          <h2>Order Status Update</h2>
          <p>Dear ${user.username || "Customer"},</p>
          <p>Your order status has been updated:</p>
          <h3>Order #${order.order_number || "N/A"}</h3>
          <p><strong>Status: ${newStatus ? newStatus.toUpperCase() : "UPDATED"}</strong></p>
          <p><strong>Message:</strong> ${statusMessages[newStatus] || "Status updated"}</p>
          ${order.tracking_number ? `<p><strong>Tracking Number:</strong> ${order.tracking_number}</p>` : ""}
          ${order.estimated_delivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(order.estimated_delivery).toLocaleDateString()}</p>` : ""}
          <p>You can track your order at any time using our order tracking feature.</p>
          <p>Best regards,<br>Your Ecommerce Team</p>
        `
          };
          await sendEmail(emailData);
          strapi.log.info(`Order status update email sent successfully for order ${order.id}`);
        } catch (error) {
          strapi.log.error("Error sending order status update email:", error);
          strapi.log.error("Email error details:", {
            message: error.message,
            stack: error.stack,
            orderId: order?.id,
            orderNumber: order?.order_number,
            newStatus
          });
        }
      },
      // Restore stock when order is cancelled
      async restoreOrderStock(order) {
        try {
          if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            strapi.log.warn(`[restoreOrderStock] No items found for order ${order.id}`);
            return;
          }
          for (const item of order.items) {
            const productId = typeof item === "object" && item.id ? item.id : item;
            if (!productId) {
              strapi.log.warn(`[restoreOrderStock] Skipping item with invalid ID for order ${order.id}`);
              continue;
            }
            const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
              where: { id: productId }
            });
            if (product) {
              const quantityToRestore = 1;
              const newStockQuantity = (product.stock_quantity || 0) + quantityToRestore;
              const newStockStatus = newStockQuantity > 0 ? "in_stock" : "out_of_stock";
              await strapi.db.query("plugin::webbycommerce.product").update({
                where: { id: productId },
                data: {
                  stock_quantity: newStockQuantity,
                  stock_status: newStockStatus
                }
              });
              strapi.log.info(`[restoreOrderStock] Restored ${quantityToRestore} unit(s) of product ${productId} for order ${order.id}`);
            } else {
              strapi.log.warn(`[restoreOrderStock] Product ${productId} not found for order ${order.id}`);
            }
          }
        } catch (error) {
          strapi.log.error(`[restoreOrderStock] Failed to restore order stock for order ${order.id}:`, error);
        }
      },
      // Generate tracking timeline based on order status
      generateTrackingTimeline(order) {
        const timeline = [];
        const createdAt = new Date(order.createdAt);
        const updatedAt = new Date(order.updatedAt);
        timeline.push({
          status: "Order Placed",
          description: "Your order has been successfully placed",
          timestamp: createdAt.toISOString(),
          completed: true
        });
        if (["processing", "shipped", "delivered"].includes(order.status)) {
          timeline.push({
            status: "Order Confirmed",
            description: "Your order has been confirmed and is being prepared",
            timestamp: createdAt.toISOString(),
            completed: true
          });
        } else {
          timeline.push({
            status: "Order Confirmed",
            description: "Your order has been confirmed and is being prepared",
            completed: false
          });
        }
        if (["shipped", "delivered"].includes(order.status)) {
          timeline.push({
            status: "Order Shipped",
            description: `Your order has been shipped${order.tracking_number ? ` (Tracking: ${order.tracking_number})` : ""}`,
            timestamp: order.status === "shipped" ? updatedAt.toISOString() : createdAt.toISOString(),
            completed: true
          });
        } else if (order.status === "processing") {
          timeline.push({
            status: "Order Shipped",
            description: "Your order will be shipped soon",
            completed: false
          });
        }
        if (order.status === "delivered") {
          timeline.push({
            status: "Order Delivered",
            description: "Your order has been successfully delivered",
            timestamp: updatedAt.toISOString(),
            completed: true
          });
        } else {
          timeline.push({
            status: "Order Delivered",
            description: `Estimated delivery: ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : "TBD"}`,
            completed: false
          });
        }
        return timeline;
      },
      // Get current location based on status
      getCurrentLocation(status) {
        const locations = {
          pending: "Order Processing Center",
          processing: "Order Processing Center",
          shipped: "In Transit",
          delivered: "Delivered to customer",
          cancelled: "Order cancelled",
          refunded: "Refund processed"
        };
        return locations[status] || "Unknown";
      },
      // Get delivery status description
      getDeliveryStatus(status) {
        const statuses = {
          pending: "Your order is being prepared",
          processing: "Your order is being processed",
          shipped: "Your order is on the way",
          delivered: "Your order has been delivered successfully",
          cancelled: "Your order has been cancelled",
          refunded: "Your order has been refunded"
        };
        return statuses[status] || "Status unknown";
      }
    };
  }
});

// server/src/controllers/payment.js
var require_payment = __commonJS({
  "server/src/controllers/payment.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    module2.exports = {
      /**
       * Create payment intent
       */
      async createIntent(ctx) {
        try {
          const { order_id, payment_method, amount, currency = "USD" } = ctx.request.body;
          if (!order_id || !payment_method || !amount) {
            return ctx.badRequest("Order ID, payment method, and amount are required.");
          }
          const order = await strapi.db.query("plugin::webbycommerce.order").findOne({
            where: { id: order_id },
            populate: ["user"]
          });
          if (!order) {
            return ctx.notFound("Order not found.");
          }
          if (order.user && order.user.id !== ctx.state.user?.id) {
          }
          const paymentTransaction = await strapi.db.query("plugin::webbycommerce.payment-transaction").create({
            data: {
              order: order_id,
              transaction_id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              // Temporary ID
              payment_method,
              amount: parseFloat(amount),
              currency,
              status: "pending"
            }
          });
          const paymentIntent = {
            client_secret: `pi_mock_${Date.now()}`,
            transaction_id: paymentTransaction.transaction_id,
            amount: parseFloat(amount),
            currency,
            payment_method
          };
          ctx.send({
            data: {
              payment_intent: paymentIntent,
              transaction: paymentTransaction
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createIntent:`, error);
          ctx.internalServerError("Failed to create payment intent. Please try again.");
        }
      },
      /**
       * Confirm payment
       */
      async confirmPayment(ctx) {
        try {
          const { transaction_id, payment_data } = ctx.request.body;
          if (!transaction_id) {
            return ctx.badRequest("Transaction ID is required.");
          }
          const paymentTransaction = await strapi.db.query("plugin::webbycommerce.payment-transaction").findOne({
            where: { transaction_id },
            populate: ["order"]
          });
          if (!paymentTransaction) {
            return ctx.notFound("Payment transaction not found.");
          }
          const updatedTransaction = await strapi.db.query("plugin::webbycommerce.payment-transaction").update({
            where: { id: paymentTransaction.id },
            data: {
              status: "completed",
              processed_at: /* @__PURE__ */ new Date(),
              gateway_response: payment_data
            }
          });
          await strapi.db.query("plugin::webbycommerce.order").update({
            where: { id: paymentTransaction.order.id },
            data: {
              payment_status: "paid",
              status: "processing"
              // Move order to processing
            }
          });
          ctx.send({
            data: {
              transaction: updatedTransaction,
              message: "Payment confirmed successfully"
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in confirmPayment:`, error);
          ctx.internalServerError("Failed to confirm payment. Please try again.");
        }
      },
      /**
       * Handle payment webhook
       */
      async handleWebhook(ctx) {
        try {
          const webhookData = ctx.request.body;
          const signature = ctx.request.headers["stripe-signature"] || ctx.request.headers["paypal-signature"];
          strapi.log.info(`[${PLUGIN_ID}] Webhook received:`, webhookData);
          ctx.send({ message: "Webhook processed successfully" });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in handleWebhook:`, error);
          ctx.internalServerError("Failed to process webhook.");
        }
      },
      /**
       * Process refund
       */
      async processRefund(ctx) {
        try {
          const { id } = ctx.params;
          const { amount, reason } = ctx.request.body;
          const paymentTransaction = await strapi.db.query("plugin::webbycommerce.payment-transaction").findOne({
            where: { id },
            populate: ["order"]
          });
          if (!paymentTransaction) {
            return ctx.notFound("Payment transaction not found.");
          }
          if (paymentTransaction.status !== "completed") {
            return ctx.badRequest("Only completed payments can be refunded.");
          }
          const refundAmount = amount ? parseFloat(amount) : paymentTransaction.amount;
          if (refundAmount > paymentTransaction.amount) {
            return ctx.badRequest("Refund amount cannot exceed payment amount.");
          }
          const updatedTransaction = await strapi.db.query("plugin::webbycommerce.payment-transaction").update({
            where: { id: paymentTransaction.id },
            data: {
              status: "refunded",
              refunded_at: /* @__PURE__ */ new Date(),
              refund_amount: refundAmount,
              failure_reason: reason
            }
          });
          await strapi.db.query("plugin::webbycommerce.order").update({
            where: { id: paymentTransaction.order.id },
            data: {
              payment_status: "refunded",
              status: "refunded"
            }
          });
          ctx.send({
            data: {
              transaction: updatedTransaction,
              message: "Refund processed successfully"
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in processRefund:`, error);
          ctx.internalServerError("Failed to process refund. Please try again.");
        }
      },
      /**
       * Get payment transactions (admin only)
       */
      async getTransactions(ctx) {
        try {
          const { limit = 10, start = 0, order_id, status } = ctx.query;
          const where = {};
          if (order_id) {
            where.order = { id: order_id };
          }
          if (status) {
            where.status = status;
          }
          const transactions = await strapi.db.query("plugin::webbycommerce.payment-transaction").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { createdAt: "desc" },
            populate: ["order"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.payment-transaction").count({ where });
          ctx.send({
            data: transactions,
            meta: {
              total,
              limit: parseInt(limit, 10),
              start: parseInt(start, 10)
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getTransactions:`, error);
          ctx.internalServerError("Failed to fetch payment transactions.");
        }
      }
    };
  }
});

// server/src/controllers/product.js
var require_product2 = __commonJS({
  "server/src/controllers/product.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    module2.exports = {
      /**
       * Get all products
       */
      async getProducts(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { product_category, tag, search, limit, start = 0, getAll } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (product_category) {
            where.product_categories = { id: product_category };
          }
          if (tag) {
            where.tags = { id: tag };
          }
          if (search) {
            where.name = { $containsi: search };
          }
          const total = await strapi.db.query("plugin::webbycommerce.product").count({ where });
          const shouldGetAll = getAll === "true" || getAll === true || limit === void 0 || limit === null;
          const queryOptions = {
            where,
            orderBy: { createdAt: "desc" },
            populate: {
              product_categories: true,
              tags: true,
              images: true,
              variations: {
                populate: ["attributes", "attributeValues"]
              }
            }
          };
          if (!shouldGetAll && limit) {
            queryOptions.limit = parseInt(limit, 10);
            queryOptions.start = parseInt(start, 10);
          }
          const products = await strapi.db.query("plugin::webbycommerce.product").findMany(queryOptions);
          const responseMeta = shouldGetAll ? { total, returned: products.length, pagination: false } : {
            total,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            pagination: true,
            page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
            pageCount: Math.ceil(total / parseInt(limit, 10))
          };
          ctx.send({ data: products, meta: responseMeta });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProducts:`, error);
          ctx.internalServerError("Failed to fetch products. Please try again.");
        }
      },
      /**
       * Get single product
       */
      async getProduct(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id, publishedAt: { $notNull: true } },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          ctx.send({ data: product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProduct:`, error);
          ctx.internalServerError("Failed to fetch product. Please try again.");
        }
      },
      /**
       * Get single product by slug
       */
      async getProductBySlug(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const rawSlug = ctx.params?.slug;
          const slug = typeof rawSlug === "string" ? decodeURIComponent(rawSlug).trim() : "";
          if (!slug) {
            return ctx.badRequest("Slug is required.");
          }
          if (/^[0-9]+$/.test(slug)) {
            const product2 = await strapi.db.query("plugin::webbycommerce.product").findOne({
              where: { id: slug, publishedAt: { $notNull: true } },
              populate: ["product_categories", "tags", "images", "variations"]
            });
            if (!product2) {
              return ctx.notFound("Product not found.");
            }
            ctx.send({ data: product2 });
            return;
          }
          const results = await strapi.db.query("plugin::webbycommerce.product").findMany({
            where: { slug, publishedAt: { $notNull: true } },
            limit: 1,
            orderBy: { publishedAt: "desc", id: "desc" },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          const product = results?.[0];
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          ctx.send({ data: product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProductBySlug:`, error);
          ctx.internalServerError("Failed to fetch product. Please try again.");
        }
      },
      /**
       * Create product
       */
      async createProduct(ctx) {
        try {
          const { name, description, price, sale_price, sku, slug, stock_quantity, stock_status, weight, dimensions, product_categories, tags, images } = ctx.request.body || {};
          if (!name || price === void 0 || price === null) {
            return ctx.badRequest("Name and price are required.");
          }
          const parsedPrice = parseFloat(price);
          if (isNaN(parsedPrice) || parsedPrice < 0) {
            return ctx.badRequest("Price must be a valid positive number.");
          }
          let parsedSalePrice = null;
          if (sale_price !== void 0 && sale_price !== null) {
            parsedSalePrice = parseFloat(sale_price);
            if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
              return ctx.badRequest("Sale price must be a valid positive number.");
            }
          }
          let parsedStockQuantity = 0;
          if (stock_quantity !== void 0 && stock_quantity !== null) {
            parsedStockQuantity = parseInt(stock_quantity, 10);
            if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
              return ctx.badRequest("Stock quantity must be a valid non-negative integer.");
            }
          }
          let parsedWeight = null;
          if (weight !== void 0 && weight !== null) {
            parsedWeight = parseFloat(weight);
            if (isNaN(parsedWeight) || parsedWeight < 0) {
              return ctx.badRequest("Weight must be a valid positive number.");
            }
          }
          const data = {
            name,
            description,
            price: parsedPrice,
            sale_price: parsedSalePrice,
            sku,
            slug,
            stock_quantity: parsedStockQuantity,
            stock_status: stock_status || "in_stock",
            weight: parsedWeight,
            dimensions,
            publishedAt: /* @__PURE__ */ new Date()
          };
          let categoryIds = [];
          if (product_categories && Array.isArray(product_categories) && product_categories.length > 0) {
            categoryIds = product_categories.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          let tagIds = [];
          if (tags && Array.isArray(tags) && tags.length > 0) {
            tagIds = tags.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          let imageIds = [];
          if (images && Array.isArray(images) && images.length > 0) {
            imageIds = images.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          const product = await strapi.entityService.create("plugin::webbycommerce.product", {
            data
          });
          const updateData = {};
          if (categoryIds.length > 0) {
            updateData.product_categories = categoryIds;
          }
          if (tagIds.length > 0) {
            updateData.tags = tagIds;
          }
          if (imageIds.length > 0) {
            updateData.images = imageIds;
          }
          let updatedProduct = product;
          if (Object.keys(updateData).length > 0) {
            updatedProduct = await strapi.entityService.update("plugin::webbycommerce.product", product.id, {
              data: updateData
            });
          }
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product", updatedProduct.id, {
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populated || updatedProduct });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createProduct:`, error);
          ctx.internalServerError("Failed to create product. Please try again.");
        }
      },
      /**
       * Create products in bulk
       */
      async createBulkProducts(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { products } = ctx.request.body || {};
          if (!Array.isArray(products)) {
            return ctx.badRequest("Products must be an array.");
          }
          if (products.length === 0) {
            return ctx.badRequest("Products array cannot be empty.");
          }
          const MAX_BULK_SIZE = 100;
          if (products.length > MAX_BULK_SIZE) {
            return ctx.badRequest(`Cannot create more than ${MAX_BULK_SIZE} products at once.`);
          }
          const buildConnect = (arr) => {
            if (!arr) return void 0;
            if (Array.isArray(arr) && arr.length > 0) {
              if (typeof arr[0] === "object") return arr;
              return arr.map((id) => ({ id }));
            }
            return void 0;
          };
          const validateAndPrepareProduct = (productData, index) => {
            const errors = [];
            if (!productData.name || productData.price === void 0 || productData.price === null) {
              errors.push("Name and price are required.");
            }
            const parsedPrice = parseFloat(productData.price);
            if (isNaN(parsedPrice) || parsedPrice < 0) {
              errors.push("Price must be a valid positive number.");
            }
            let parsedSalePrice = null;
            if (productData.sale_price !== void 0 && productData.sale_price !== null) {
              parsedSalePrice = parseFloat(productData.sale_price);
              if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
                errors.push("Sale price must be a valid positive number.");
              }
            }
            let parsedStockQuantity = 0;
            if (productData.stock_quantity !== void 0 && productData.stock_quantity !== null) {
              parsedStockQuantity = parseInt(productData.stock_quantity, 10);
              if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
                errors.push("Stock quantity must be a valid non-negative integer.");
              }
            }
            let parsedWeight = null;
            if (productData.weight !== void 0 && productData.weight !== null) {
              parsedWeight = parseFloat(productData.weight);
              if (isNaN(parsedWeight) || parsedWeight < 0) {
                errors.push("Weight must be a valid positive number.");
              }
            }
            if (errors.length > 0) {
              return { valid: false, errors, index };
            }
            const data = {
              name: productData.name,
              description: productData.description,
              price: parsedPrice,
              sale_price: parsedSalePrice,
              sku: productData.sku,
              slug: productData.slug,
              stock_quantity: parsedStockQuantity,
              stock_status: productData.stock_status || "in_stock",
              weight: parsedWeight,
              dimensions: productData.dimensions,
              publishedAt: /* @__PURE__ */ new Date()
            };
            const relations = {
              product_categories: [],
              tags: [],
              images: []
            };
            if (productData.product_categories && Array.isArray(productData.product_categories) && productData.product_categories.length > 0) {
              relations.product_categories = productData.product_categories.map(
                (id) => typeof id === "object" && id.id ? id.id : id
              );
            }
            if (productData.tags && Array.isArray(productData.tags) && productData.tags.length > 0) {
              relations.tags = productData.tags.map(
                (id) => typeof id === "object" && id.id ? id.id : id
              );
            }
            if (productData.images && Array.isArray(productData.images) && productData.images.length > 0) {
              relations.images = productData.images.map(
                (id) => typeof id === "object" && id.id ? id.id : id
              );
            }
            return { valid: true, data, relations, index };
          };
          const results = {
            success: [],
            failed: [],
            summary: {
              total: products.length,
              successful: 0,
              failed: 0
            }
          };
          for (let i = 0; i < products.length; i++) {
            const productData = products[i];
            const validation = validateAndPrepareProduct(productData, i);
            if (!validation.valid) {
              results.failed.push({
                index: i,
                product: productData,
                errors: validation.errors
              });
              results.summary.failed++;
              continue;
            }
            try {
              const product = await strapi.entityService.create("plugin::webbycommerce.product", {
                data: validation.data
              });
              const updateData = {};
              if (validation.relations.product_categories.length > 0) {
                updateData.product_categories = validation.relations.product_categories;
              }
              if (validation.relations.tags.length > 0) {
                updateData.tags = validation.relations.tags;
              }
              if (validation.relations.images.length > 0) {
                updateData.images = validation.relations.images;
              }
              let updatedProduct = product;
              if (Object.keys(updateData).length > 0) {
                updatedProduct = await strapi.entityService.update("plugin::webbycommerce.product", product.id, {
                  data: updateData
                });
              }
              const populated = await strapi.entityService.findOne("plugin::webbycommerce.product", updatedProduct.id, {
                populate: ["product_categories", "tags", "images", "variations"]
              });
              results.success.push({
                index: i,
                product: populated || updatedProduct
              });
              results.summary.successful++;
            } catch (error) {
              strapi.log.error(`[${PLUGIN_ID}] Error creating product at index ${i}:`, error);
              results.failed.push({
                index: i,
                product: productData,
                errors: [error.message || "Failed to create product."]
              });
              results.summary.failed++;
            }
          }
          const statusCode = results.summary.failed === 0 ? 200 : results.summary.successful === 0 ? 400 : 207;
          ctx.status = statusCode;
          ctx.send({ data: results });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createBulkProducts:`, error);
          ctx.internalServerError("Failed to create products in bulk. Please try again.");
        }
      },
      /**
       * Update product
       */
      async updateProduct(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const body = ctx.request.body || {};
          const updateData = { ...body };
          const buildConnectForUpdate = (key, target) => {
            const val = body[key];
            if (val === void 0) return;
            if (Array.isArray(val) && val.length > 0) {
              if (typeof val[0] === "object") {
                updateData[key] = { connect: val };
              } else {
                updateData[key] = { connect: val.map((id2) => ({ id: id2 })) };
              }
            } else if (Array.isArray(val) && val.length === 0) {
              updateData[key] = { disconnect: [] };
            }
          };
          buildConnectForUpdate("product_categories");
          buildConnectForUpdate("tags");
          buildConnectForUpdate("images");
          const product = await strapi.db.query("plugin::webbycommerce.product").update({
            where: { id },
            data: updateData
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          const populatedUpdated = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id: product.id },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populatedUpdated || product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateProduct:`, error);
          ctx.internalServerError("Failed to update product. Please try again.");
        }
      },
      /**
       * Delete product
       */
      async deleteProduct(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const product = await strapi.db.query("plugin::webbycommerce.product").delete({
            where: { id }
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          ctx.send({ data: product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteProduct:`, error);
          ctx.internalServerError("Failed to delete product. Please try again.");
        }
      },
      /**
       * Get related products
       */
      async getRelatedProducts(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const { limit = 4 } = ctx.query;
          const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id },
            populate: ["product_categories", "tags"]
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          const where = {
            id: { $ne: id },
            // Exclude current product
            publishedAt: { $notNull: true }
            // Only published products
          };
          const categoryIds = product.product_categories?.map((cat) => cat.id) || [];
          const tagIds = product.tags?.map((tag) => tag.id) || [];
          if (categoryIds.length > 0 || tagIds.length > 0) {
            where.$or = [];
            if (categoryIds.length > 0) {
              where.$or.push({ product_categories: { id: { $in: categoryIds } } });
            }
            if (tagIds.length > 0) {
              where.$or.push({ tags: { id: { $in: tagIds } } });
            }
          }
          const relatedProducts = await strapi.db.query("plugin::webbycommerce.product").findMany({
            where,
            limit: parseInt(limit, 10),
            orderBy: { createdAt: "desc" },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: relatedProducts });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getRelatedProducts:`, error);
          ctx.internalServerError("Failed to fetch related products. Please try again.");
        }
      },
      /**
       * Get product categories
       */
      async getCategories(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { limit = 20, start = 0, parent } = ctx.query;
          const where = { is_active: true };
          if (parent !== void 0) {
            if (parent === "null" || parent === "") {
              where.parent = null;
            } else {
              where.parent = { id: parent };
            }
          }
          const categories = await strapi.db.query("plugin::webbycommerce.product-category").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { sort_order: "asc" },
            populate: ["parent", "children"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-category").count({ where });
          ctx.send({
            data: categories,
            meta: {
              total,
              limit: parseInt(limit, 10),
              start: parseInt(start, 10)
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getCategories:`, error);
          ctx.internalServerError("Failed to fetch categories. Please try again.");
        }
      },
      /**
       * Get product tags
       */
      async getTags(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { limit = 20, start = 0, search } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (search) {
            where.name = { $containsi: search };
          }
          const tags = await strapi.db.query("plugin::webbycommerce.product-tag").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { name: "asc" }
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-tag").count({ where });
          ctx.send({
            data: tags,
            meta: {
              total,
              limit: parseInt(limit, 10),
              start: parseInt(start, 10)
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getTags:`, error);
          ctx.internalServerError("Failed to fetch tags. Please try again.");
        }
      },
      /**
       * Get product attributes
       */
      async getAttributes(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { limit = 20, start = 0, is_variation } = ctx.query;
          const where = {};
          if (is_variation !== void 0) {
            where.is_variation = is_variation === "true";
          }
          const attributes = await strapi.db.query("plugin::webbycommerce.product-attribute").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { sort_order: "asc" },
            populate: ["product_attribute_values"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-attribute").count({ where });
          ctx.send({
            data: attributes,
            meta: {
              total,
              limit: parseInt(limit, 10),
              start: parseInt(start, 10)
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getAttributes:`, error);
          ctx.internalServerError("Failed to fetch attributes. Please try again.");
        }
      },
      // Standard Strapi controller methods for content manager
      async find(ctx) {
        try {
          const { product_category, tag, search, limit = 25, start = 0, sort = "createdAt:desc" } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (product_category) {
            where.product_categories = { id: product_category };
          }
          if (tag) {
            where.tags = { id: tag };
          }
          if (search) {
            where.name = { $containsi: search };
          }
          const products = await strapi.db.query("plugin::webbycommerce.product").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: sort.split(":").reduce((acc, val, i) => {
              if (i === 0) acc[val] = "asc";
              else acc[val] = "desc";
              return acc;
            }, {}),
            populate: ["product_categories", "tags", "images", "variations"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product").count({ where });
          ctx.send({
            data: products,
            meta: {
              pagination: {
                page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
                pageSize: parseInt(limit, 10),
                pageCount: Math.ceil(total / parseInt(limit, 10)),
                total
              }
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in find:`, error);
          ctx.internalServerError("Failed to fetch products.");
        }
      },
      async findOne(ctx) {
        try {
          const { id } = ctx.params;
          const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id, publishedAt: { $notNull: true } },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          ctx.send({ data: product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
          ctx.internalServerError("Failed to fetch product.");
        }
      },
      async create(ctx) {
        try {
          const data = ctx.request.body.data || ctx.request.body;
          if (!data.name || data.price === void 0 || data.price === null) {
            return ctx.badRequest("Name and price are required.");
          }
          const parsedPrice = parseFloat(data.price);
          if (isNaN(parsedPrice) || parsedPrice < 0) {
            return ctx.badRequest("Price must be a valid positive number.");
          }
          data.price = parsedPrice;
          if (data.sale_price !== void 0 && data.sale_price !== null) {
            const parsedSalePrice = parseFloat(data.sale_price);
            if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
              return ctx.badRequest("Sale price must be a valid positive number.");
            }
            data.sale_price = parsedSalePrice;
          }
          if (data.stock_quantity !== void 0 && data.stock_quantity !== null) {
            const parsedStockQuantity = parseInt(data.stock_quantity, 10);
            if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
              return ctx.badRequest("Stock quantity must be a valid non-negative integer.");
            }
            data.stock_quantity = parsedStockQuantity;
          }
          if (data.weight !== void 0 && data.weight !== null) {
            const parsedWeight = parseFloat(data.weight);
            if (isNaN(parsedWeight) || parsedWeight < 0) {
              return ctx.badRequest("Weight must be a valid positive number.");
            }
            data.weight = parsedWeight;
          }
          if (!data.publishedAt) {
            data.publishedAt = /* @__PURE__ */ new Date();
          }
          const relations = {
            product_categories: data.product_categories || [],
            tags: data.tags || [],
            images: data.images || []
          };
          delete data.product_categories;
          delete data.tags;
          delete data.images;
          if (Array.isArray(relations.product_categories) && relations.product_categories.length > 0) {
            relations.product_categories = relations.product_categories.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          if (Array.isArray(relations.tags) && relations.tags.length > 0) {
            relations.tags = relations.tags.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          if (Array.isArray(relations.images) && relations.images.length > 0) {
            relations.images = relations.images.map(
              (id) => typeof id === "object" && id.id ? id.id : id
            );
          }
          const product = await strapi.entityService.create("plugin::webbycommerce.product", {
            data
          });
          const updateData = {};
          if (relations.product_categories.length > 0) {
            updateData.product_categories = relations.product_categories;
          }
          if (relations.tags.length > 0) {
            updateData.tags = relations.tags;
          }
          if (relations.images.length > 0) {
            updateData.images = relations.images;
          }
          let updatedProduct = product;
          if (Object.keys(updateData).length > 0) {
            updatedProduct = await strapi.entityService.update("plugin::webbycommerce.product", product.id, {
              data: updateData
            });
          }
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product", updatedProduct.id, {
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populated || updatedProduct });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
          ctx.internalServerError("Failed to create product.");
        }
      },
      async update(ctx) {
        try {
          const { id } = ctx.params;
          const data = ctx.request.body.data || ctx.request.body;
          if (data.price !== void 0 && data.price !== null) {
            const parsedPrice = parseFloat(data.price);
            if (isNaN(parsedPrice) || parsedPrice < 0) {
              return ctx.badRequest("Price must be a valid positive number.");
            }
            data.price = parsedPrice;
          }
          if (data.sale_price !== void 0 && data.sale_price !== null) {
            const parsedSalePrice = parseFloat(data.sale_price);
            if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
              return ctx.badRequest("Sale price must be a valid positive number.");
            }
            data.sale_price = parsedSalePrice;
          }
          if (data.stock_quantity !== void 0 && data.stock_quantity !== null) {
            const parsedStockQuantity = parseInt(data.stock_quantity, 10);
            if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
              return ctx.badRequest("Stock quantity must be a valid non-negative integer.");
            }
            data.stock_quantity = parsedStockQuantity;
          }
          if (data.weight !== void 0 && data.weight !== null) {
            const parsedWeight = parseFloat(data.weight);
            if (isNaN(parsedWeight) || parsedWeight < 0) {
              return ctx.badRequest("Weight must be a valid positive number.");
            }
            data.weight = parsedWeight;
          }
          const product = await strapi.db.query("plugin::webbycommerce.product").update({
            where: { id },
            data
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          const populated = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id: product.id },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populated || product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
          ctx.internalServerError("Failed to update product.");
        }
      },
      async delete(ctx) {
        try {
          const { id } = ctx.params;
          const product = await strapi.db.query("plugin::webbycommerce.product").delete({
            where: { id }
          });
          if (!product) {
            return ctx.notFound("Product not found.");
          }
          ctx.send({ data: product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
          ctx.internalServerError("Failed to delete product.");
        }
      }
    };
  }
});

// server/src/controllers/productTag.js
var require_productTag = __commonJS({
  "server/src/controllers/productTag.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var uniqBy = (items, keyFn) => {
      const seen = /* @__PURE__ */ new Set();
      return (Array.isArray(items) ? items : []).filter((item) => {
        const key = keyFn(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };
    module2.exports = {
      /**
       * List tags
       */
      async getTags(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { search, limit = 50, start = 0 } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (search) {
            where.name = { $containsi: search };
          }
          const tags = await strapi.db.query("plugin::webbycommerce.product-tag").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { createdAt: "desc" }
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-tag").count({ where });
          ctx.send({ data: tags, meta: { total, limit: parseInt(limit, 10), start: parseInt(start, 10) } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getTags:`, error);
          ctx.internalServerError("Failed to fetch tags. Please try again.");
        }
      },
      /**
       * Get single tag
       */
      async getTag(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const rawId = ctx.params?.id;
          const idOrSlug = typeof rawId === "string" ? decodeURIComponent(rawId).trim() : "";
          if (!idOrSlug) {
            return ctx.badRequest("Tag ID or slug is required.");
          }
          const isNumericId = /^[0-9]+$/.test(idOrSlug);
          let tag;
          if (isNumericId) {
            tag = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
              where: { id: idOrSlug },
              populate: {
                products: {
                  where: { publishedAt: { $notNull: true } }
                }
              }
            });
          } else {
            const results = await strapi.db.query("plugin::webbycommerce.product-tag").findMany({
              where: { slug: idOrSlug, publishedAt: { $notNull: true } },
              limit: 1,
              orderBy: { publishedAt: "desc", id: "desc" },
              populate: {
                products: {
                  where: { publishedAt: { $notNull: true } }
                }
              }
            });
            tag = results?.[0];
          }
          if (!tag) {
            return ctx.notFound("Tag not found.");
          }
          if (Array.isArray(tag?.products)) {
            const publishedOnly = tag.products.filter((p) => p && p.publishedAt);
            tag.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
          }
          ctx.send({ data: tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getTag:`, error);
          ctx.internalServerError("Failed to fetch tag. Please try again.");
        }
      },
      /**
       * Create tag
       */
      async createTag(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { name, slug } = ctx.request.body || {};
          if (!name) {
            return ctx.badRequest("Name is required.");
          }
          const tag = await strapi.entityService.create("plugin::webbycommerce.product-tag", {
            data: {
              name,
              slug: slug || void 0,
              publishedAt: /* @__PURE__ */ new Date()
              // Set publishedAt so it appears in content manager
            }
          });
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product-tag", tag.id, {
            populate: ["products"]
          });
          ctx.send({ data: populated || tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createTag:`, error);
          ctx.internalServerError("Failed to create tag. Please try again.");
        }
      },
      /**
       * Update tag
       */
      async updateTag(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const updateData = ctx.request.body || {};
          const updated = await strapi.db.query("plugin::webbycommerce.product-tag").update({
            where: { id },
            data: updateData
          });
          if (!updated) {
            return ctx.notFound("Tag not found.");
          }
          ctx.send({ data: updated });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateTag:`, error);
          ctx.internalServerError("Failed to update tag. Please try again.");
        }
      },
      /**
       * Delete tag
       */
      async deleteTag(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const existing = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({ where: { id } });
          if (!existing) {
            return ctx.notFound("Tag not found.");
          }
          await strapi.db.query("plugin::webbycommerce.product-tag").delete({ where: { id } });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteTag:`, error);
          ctx.internalServerError("Failed to delete tag. Please try again.");
        }
      },
      // Standard Strapi controller methods for content manager
      async find(ctx) {
        try {
          const { search, limit = 25, start = 0, sort = "createdAt:desc" } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (search) {
            where.name = { $containsi: search };
          }
          const tags = await strapi.db.query("plugin::webbycommerce.product-tag").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: sort.split(":").reduce((acc, val, i) => {
              if (i === 0) acc[val] = "asc";
              else acc[val] = "desc";
              return acc;
            }, {}),
            populate: ["products"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-tag").count({ where });
          ctx.send({
            data: tags,
            meta: {
              pagination: {
                page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
                pageSize: parseInt(limit, 10),
                pageCount: Math.ceil(total / parseInt(limit, 10)),
                total
              }
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in find:`, error);
          ctx.internalServerError("Failed to fetch tags.");
        }
      },
      async findOne(ctx) {
        try {
          const rawId = ctx.params?.id;
          const idOrSlug = typeof rawId === "string" ? decodeURIComponent(rawId).trim() : "";
          if (!idOrSlug) {
            return ctx.badRequest("Tag ID or slug is required.");
          }
          const isNumericId = /^[0-9]+$/.test(idOrSlug);
          let tag;
          if (isNumericId) {
            tag = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
              where: { id: idOrSlug, publishedAt: { $notNull: true } },
              populate: {
                products: {
                  where: { publishedAt: { $notNull: true } }
                }
              }
            });
          } else {
            const results = await strapi.db.query("plugin::webbycommerce.product-tag").findMany({
              where: { slug: idOrSlug, publishedAt: { $notNull: true } },
              limit: 1,
              orderBy: { publishedAt: "desc", id: "desc" },
              populate: {
                products: {
                  where: { publishedAt: { $notNull: true } }
                }
              }
            });
            tag = results?.[0];
          }
          if (!tag) {
            return ctx.notFound("Tag not found.");
          }
          if (Array.isArray(tag?.products)) {
            const publishedOnly = tag.products.filter((p) => p && p.publishedAt);
            tag.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
          }
          ctx.send({ data: tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
          ctx.internalServerError("Failed to fetch tag.");
        }
      },
      async create(ctx) {
        try {
          const data = ctx.request.body.data || ctx.request.body;
          if (!data.publishedAt) {
            data.publishedAt = /* @__PURE__ */ new Date();
          }
          const tag = await strapi.entityService.create("plugin::webbycommerce.product-tag", {
            data
          });
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product-tag", tag.id, {
            populate: ["products"]
          });
          ctx.send({ data: populated || tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
          ctx.internalServerError("Failed to create tag.");
        }
      },
      async update(ctx) {
        try {
          const { id } = ctx.params;
          const data = ctx.request.body.data || ctx.request.body;
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").update({
            where: { id },
            data
          });
          if (!tag) {
            return ctx.notFound("Tag not found.");
          }
          const populated = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
            where: { id: tag.id },
            populate: ["products"]
          });
          ctx.send({ data: populated || tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
          ctx.internalServerError("Failed to update tag.");
        }
      },
      async delete(ctx) {
        try {
          const { id } = ctx.params;
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").delete({
            where: { id }
          });
          if (!tag) {
            return ctx.notFound("Tag not found.");
          }
          ctx.send({ data: tag });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
          ctx.internalServerError("Failed to delete tag.");
        }
      }
    };
  }
});

// server/src/controllers/category.js
var require_category = __commonJS({
  "server/src/controllers/category.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var uniqBy = (items, keyFn) => {
      const seen = /* @__PURE__ */ new Set();
      return (Array.isArray(items) ? items : []).filter((item) => {
        const key = keyFn(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };
    module2.exports = {
      async getProductCategories(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { search, limit = 50, start = 0, publicationState, status, preview } = ctx.query;
          const includeDrafts = preview === "true" || publicationState === "preview" || status === "preview" || status === "draft";
          const where = {};
          if (search) {
            where.name = { $containsi: search };
          }
          if (!includeDrafts) {
            where.publishedAt = { $notNull: true };
          }
          const productCategories = await strapi.db.query("plugin::webbycommerce.product-category").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: { createdAt: "desc" },
            populate: includeDrafts ? ["products", "image"] : {
              products: {
                where: { publishedAt: { $notNull: true } }
              },
              image: true
            }
          });
          if (!includeDrafts && Array.isArray(productCategories)) {
            for (const category of productCategories) {
              if (Array.isArray(category?.products)) {
                const publishedOnly = category.products.filter((p) => p && p.publishedAt);
                category.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
              }
            }
          }
          const total = await strapi.db.query("plugin::webbycommerce.product-category").count({ where });
          ctx.send({ data: productCategories, meta: { total, limit: parseInt(limit, 10), start: parseInt(start, 10) } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProductCategories:`, error);
          ctx.internalServerError("Failed to fetch product categories. Please try again.");
        }
      },
      async getProductCategory(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const rawId = ctx.params?.id;
          const idOrSlug = typeof rawId === "string" ? decodeURIComponent(rawId).trim() : "";
          const { publicationState, status, preview } = ctx.query;
          const includeDrafts = preview === "true" || publicationState === "preview" || status === "preview" || status === "draft";
          if (!idOrSlug) {
            return ctx.badRequest("Category ID or slug is required.");
          }
          const isNumericId = /^[0-9]+$/.test(idOrSlug);
          let productCategory;
          if (isNumericId) {
            productCategory = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
              where: includeDrafts ? { id: idOrSlug } : { id: idOrSlug, publishedAt: { $notNull: true } },
              populate: includeDrafts ? ["products", "image", "parent"] : {
                products: {
                  where: { publishedAt: { $notNull: true } }
                },
                image: true,
                parent: true
              }
            });
          } else {
            const where = includeDrafts ? { slug: idOrSlug } : { slug: idOrSlug, publishedAt: { $notNull: true } };
            const results = await strapi.db.query("plugin::webbycommerce.product-category").findMany({
              where,
              limit: 1,
              orderBy: { publishedAt: "desc", id: "desc" },
              populate: includeDrafts ? ["products", "image", "parent"] : {
                products: {
                  where: { publishedAt: { $notNull: true } }
                },
                image: true,
                parent: true
              }
            });
            productCategory = results?.[0];
          }
          if (!productCategory) {
            return ctx.notFound("Product category not found.");
          }
          if (!includeDrafts && Array.isArray(productCategory?.products)) {
            const publishedOnly = productCategory.products.filter((p) => p && p.publishedAt);
            productCategory.products = uniqBy(publishedOnly, (p) => p.documentId || String(p.id));
          }
          ctx.send({ data: productCategory });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getProductCategory:`, error);
          ctx.internalServerError("Failed to fetch product category. Please try again.");
        }
      },
      async createProductCategory(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { name, slug, description, image, parent } = ctx.request.body || {};
          if (!name) {
            return ctx.badRequest("Name is required.");
          }
          const data = {
            name,
            slug: slug || void 0,
            description: description || void 0,
            image: image || void 0,
            publishedAt: /* @__PURE__ */ new Date()
            // Set publishedAt so it appears in content manager
          };
          if (parent) {
            data.parent = typeof parent === "object" && parent.id ? parent.id : parent;
          }
          const productCategory = await strapi.entityService.create("plugin::webbycommerce.product-category", {
            data
          });
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product-category", productCategory.id, {
            populate: ["products", "image", "parent"]
          });
          ctx.send({ data: populated || productCategory });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createProductCategory:`, error);
          ctx.internalServerError("Failed to create product category. Please try again.");
        }
      },
      async updateProductCategory(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const updateData = ctx.request.body || {};
          const updated = await strapi.db.query("plugin::webbycommerce.product-category").update({
            where: { id },
            data: updateData
          });
          if (!updated) {
            return ctx.notFound("Product category not found.");
          }
          ctx.send({ data: updated });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateProductCategory:`, error);
          ctx.internalServerError("Failed to update product category. Please try again.");
        }
      },
      async deleteProductCategory(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const existing = await strapi.db.query("plugin::webbycommerce.product-category").findOne({ where: { id } });
          if (!existing) {
            return ctx.notFound("Product category not found.");
          }
          await strapi.db.query("plugin::webbycommerce.product-category").delete({ where: { id } });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteProductCategory:`, error);
          ctx.internalServerError("Failed to delete product category. Please try again.");
        }
      },
      // Standard Strapi controller methods for content manager
      async find(ctx) {
        try {
          const { search, limit = 25, start = 0, sort = "createdAt:desc" } = ctx.query;
          const where = { publishedAt: { $notNull: true } };
          if (search) {
            where.name = { $containsi: search };
          }
          const categories = await strapi.db.query("plugin::webbycommerce.product-category").findMany({
            where,
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: sort.split(":").reduce((acc, val, i) => {
              if (i === 0) acc[val] = "asc";
              else acc[val] = "desc";
              return acc;
            }, {}),
            populate: ["products", "image"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-category").count({ where });
          ctx.send({
            data: categories,
            meta: {
              pagination: {
                page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
                pageSize: parseInt(limit, 10),
                pageCount: Math.ceil(total / parseInt(limit, 10)),
                total
              }
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in find:`, error);
          ctx.internalServerError("Failed to fetch product categories.");
        }
      },
      async findOne(ctx) {
        try {
          const rawId = ctx.params?.id;
          const idOrSlug = typeof rawId === "string" ? decodeURIComponent(rawId).trim() : "";
          if (!idOrSlug) {
            return ctx.badRequest("Category ID or slug is required.");
          }
          const isNumericId = /^[0-9]+$/.test(idOrSlug);
          let category;
          if (isNumericId) {
            category = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
              where: { id: idOrSlug, publishedAt: { $notNull: true } },
              populate: ["products", "image", "parent"]
            });
          } else {
            const results = await strapi.db.query("plugin::webbycommerce.product-category").findMany({
              where: { slug: idOrSlug, publishedAt: { $notNull: true } },
              limit: 1,
              orderBy: { publishedAt: "desc", id: "desc" },
              populate: ["products", "image", "parent"]
            });
            category = results?.[0];
          }
          if (!category) {
            return ctx.notFound("Product category not found.");
          }
          ctx.send({ data: category });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
          ctx.internalServerError("Failed to fetch product category.");
        }
      },
      async create(ctx) {
        try {
          const data = ctx.request.body.data || ctx.request.body;
          if (!data.publishedAt) {
            data.publishedAt = /* @__PURE__ */ new Date();
          }
          const category = await strapi.entityService.create("plugin::webbycommerce.product-category", {
            data
          });
          const populated = await strapi.entityService.findOne("plugin::webbycommerce.product-category", category.id, {
            populate: ["products", "image", "parent"]
          });
          ctx.send({ data: populated || category });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
          ctx.internalServerError("Failed to create product category.");
        }
      },
      async update(ctx) {
        try {
          const { id } = ctx.params;
          const data = ctx.request.body.data || ctx.request.body;
          const category = await strapi.db.query("plugin::webbycommerce.product-category").update({
            where: { id },
            data
          });
          if (!category) {
            return ctx.notFound("Product category not found.");
          }
          const populated = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
            where: { id: category.id },
            populate: ["products", "image"]
          });
          ctx.send({ data: populated || category });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
          ctx.internalServerError("Failed to update product category.");
        }
      },
      async delete(ctx) {
        try {
          const { id } = ctx.params;
          const category = await strapi.db.query("plugin::webbycommerce.product-category").delete({
            where: { id }
          });
          if (!category) {
            return ctx.notFound("Product category not found.");
          }
          ctx.send({ data: category });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
          ctx.internalServerError("Failed to delete product category.");
        }
      }
    };
  }
});

// server/src/controllers/productVariation.js
var require_productVariation = __commonJS({
  "server/src/controllers/productVariation.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    module2.exports = {
      // Standard Strapi controller methods for content manager
      async find(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { limit = 25, start = 0, sort = "createdAt:desc" } = ctx.query;
          const variations = await strapi.db.query("plugin::webbycommerce.product-variation").findMany({
            limit: parseInt(limit, 10),
            start: parseInt(start, 10),
            orderBy: sort.split(":").reduce((acc, val, i) => {
              if (i === 0) acc[val] = "asc";
              else acc[val] = "desc";
              return acc;
            }, {}),
            populate: ["product", "attributes", "attributeValues"]
          });
          const total = await strapi.db.query("plugin::webbycommerce.product-variation").count();
          ctx.send({
            data: variations,
            meta: {
              pagination: {
                page: Math.floor(parseInt(start, 10) / parseInt(limit, 10)) + 1,
                pageSize: parseInt(limit, 10),
                pageCount: Math.ceil(total / parseInt(limit, 10)),
                total
              }
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in find:`, error);
          ctx.internalServerError("Failed to fetch product variations.");
        }
      },
      async findOne(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const rawId = ctx.params?.id;
          const idOrSlug = typeof rawId === "string" ? decodeURIComponent(rawId).trim() : "";
          if (!idOrSlug) {
            return ctx.badRequest("Variation ID or slug is required.");
          }
          const isNumericId = /^[0-9]+$/.test(idOrSlug);
          let variation;
          if (isNumericId) {
            variation = await strapi.db.query("plugin::webbycommerce.product-variation").findOne({
              where: { id: idOrSlug },
              populate: ["product", "attributes", "attributeValues"]
            });
          } else {
            const results = await strapi.db.query("plugin::webbycommerce.product-variation").findMany({
              where: { slug: idOrSlug },
              limit: 1,
              orderBy: { id: "desc" },
              populate: ["product", "attributes", "attributeValues"]
            });
            variation = results?.[0];
          }
          if (!variation) {
            return ctx.notFound("Product variation not found.");
          }
          ctx.send({ data: variation });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in findOne:`, error);
          ctx.internalServerError("Failed to fetch product variation.");
        }
      },
      async create(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const data = ctx.request.body.data || ctx.request.body;
          if (data.slug === "") {
            data.slug = void 0;
          }
          const variation = await strapi.db.query("plugin::webbycommerce.product-variation").create({ data });
          const populated = await strapi.db.query("plugin::webbycommerce.product-variation").findOne({
            where: { id: variation.id },
            populate: ["product", "attributes", "attributeValues"]
          });
          ctx.send({ data: populated || variation });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in create:`, error);
          ctx.internalServerError("Failed to create product variation.");
        }
      },
      async update(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const data = ctx.request.body.data || ctx.request.body;
          if (data.slug === "") {
            data.slug = void 0;
          }
          const variation = await strapi.db.query("plugin::webbycommerce.product-variation").update({
            where: { id },
            data
          });
          if (!variation) {
            return ctx.notFound("Product variation not found.");
          }
          const populated = await strapi.db.query("plugin::webbycommerce.product-variation").findOne({
            where: { id: variation.id },
            populate: ["product", "attributes", "attributeValues"]
          });
          ctx.send({ data: populated || variation });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in update:`, error);
          ctx.internalServerError("Failed to update product variation.");
        }
      },
      async delete(ctx) {
        try {
          if (!await ensureEcommercePermission(ctx)) {
            return;
          }
          const { id } = ctx.params;
          const variation = await strapi.db.query("plugin::webbycommerce.product-variation").delete({
            where: { id }
          });
          if (!variation) {
            return ctx.notFound("Product variation not found.");
          }
          ctx.send({ data: variation });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in delete:`, error);
          ctx.internalServerError("Failed to delete product variation.");
        }
      }
    };
  }
});

// server/src/controllers/cart.js
var require_cart2 = __commonJS({
  "server/src/controllers/cart.js"(exports2, module2) {
    "use strict";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var { randomUUID } = require("crypto");
    var getGuestIdFromRequest = (ctx) => {
      const header = ctx?.request?.header || {};
      const fromHeader = header["x-guest-id"] || header["x-guestid"] || header["guest-id"];
      const fromQuery = ctx?.query?.guest_id || ctx?.query?.guestId;
      const fromBody = ctx?.request?.body?.guest_id || ctx?.request?.body?.guestId;
      const value = fromHeader || fromQuery || fromBody;
      return value ? String(value) : null;
    };
    module2.exports = {
      async getCart(ctx) {
        try {
          const user = ctx.state.user;
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) return;
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx) || randomUUID();
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const totals = await cartService.getTotalsFromItems(items, cart.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items,
              totals
            }
          });
        } catch (error) {
          strapi.log.error("Error fetching cart:", error);
          ctx.badRequest("Failed to fetch cart", { error: error.message });
        }
      },
      // Optional alias used by bootstrap middleware (getCart is preferred)
      async getItems(ctx) {
        return await this.getCart(ctx);
      },
      async createCart(ctx) {
        return await this.getCart(ctx);
      },
      async addItem(ctx) {
        try {
          const user = ctx.state.user;
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) return;
          const { productId, quantity } = ctx.request.body || {};
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx) || randomUUID();
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          await cartService.addOrUpdateItem({ cartId: cart.id, userId: user?.id, productId, quantity });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const updatedCart = await strapi.db.query("plugin::webbycommerce.cart").findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
          const totals = await cartService.getTotalsFromItems(items, updatedCart?.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items,
              totals
            },
            message: "Item added to cart"
          });
        } catch (error) {
          strapi.log.error("Error adding item to cart:", error);
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
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          await cartService.updateItemQuantity({ cartId: cart.id, userId: user?.id, cartItemId: id, quantity });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const updatedCart = await strapi.db.query("plugin::webbycommerce.cart").findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
          const totals = await cartService.getTotalsFromItems(items, updatedCart?.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items,
              totals
            },
            message: "Cart item updated"
          });
        } catch (error) {
          strapi.log.error("Error updating cart item:", error);
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
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          await cartService.removeItem({ cartId: cart.id, cartItemId: id });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const updatedCart = await strapi.db.query("plugin::webbycommerce.cart").findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
          const totals = await cartService.getTotalsFromItems(items, updatedCart?.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items,
              totals
            },
            message: "Cart item removed"
          });
        } catch (error) {
          strapi.log.error("Error removing cart item:", error);
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
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          await cartService.clearCart(cart.id);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items: [],
              totals: await cartService.getTotalsFromItems([])
            },
            message: "Cart cleared"
          });
        } catch (error) {
          strapi.log.error("Error clearing cart:", error);
          ctx.badRequest("Failed to clear cart", { error: error.message });
        }
      },
      async getTotals(ctx) {
        try {
          const user = ctx.state.user;
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) return;
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const totals = await cartService.getTotalsFromItems(items, cart.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              totals
            }
          });
        } catch (error) {
          strapi.log.error("Error calculating cart totals:", error);
          ctx.badRequest("Failed to calculate totals", { error: error.message });
        }
      },
      async applyCoupon(ctx) {
        try {
          const user = ctx.state.user;
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) return;
          const { coupon_code } = ctx.request.body || {};
          if (!coupon_code) {
            return ctx.badRequest("Coupon code is required");
          }
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          const coupon = await cartService.validateAndApplyCoupon({
            cartId: cart.id,
            couponCode: coupon_code
          });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const updatedCart = await strapi.db.query("plugin::webbycommerce.cart").findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
          const totals = await cartService.getTotalsFromItems(items, updatedCart?.coupon);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              coupon: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value,
                discount_amount: totals.discount
              },
              items,
              totals
            },
            message: "Coupon applied successfully"
          });
        } catch (error) {
          strapi.log.error("Error applying coupon:", error);
          const status = error?.status || 400;
          if (status === 404) return ctx.notFound(error.message);
          return ctx.badRequest(error.message || "Invalid coupon code");
        }
      },
      async removeCoupon(ctx) {
        try {
          const user = ctx.state.user;
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) return;
          const cartService = strapi.plugin("webbycommerce").service("cart");
          const guestId = user ? null : getGuestIdFromRequest(ctx);
          if (!user && !guestId) return ctx.badRequest("guest_id is required for guest cart");
          const cart = await cartService.getOrCreateCart({ userId: user?.id, guestId });
          await cartService.removeCoupon({ cartId: cart.id });
          const items = await cartService.getCartItems({ cartId: cart.id });
          const totals = await cartService.getTotalsFromItems(items, null);
          ctx.send({
            data: {
              cart: {
                id: cart.id,
                guest_id: cart.guest_id || guestId || null,
                currency: cart.currency || "USD"
              },
              items,
              totals
            },
            message: "Coupon removed successfully"
          });
        } catch (error) {
          strapi.log.error("Error removing coupon:", error);
          ctx.badRequest("Failed to remove coupon", { error: error.message });
        }
      },
      async checkout(ctx) {
        const orderController = strapi.plugin("webbycommerce").controller("order");
        if (orderController && typeof orderController.checkout === "function") {
          return await orderController.checkout(ctx);
        }
        return ctx.badRequest("Checkout is not available");
      }
    };
  }
});

// server/src/controllers/wishlist.js
var require_wishlist2 = __commonJS({
  "server/src/controllers/wishlist.js"(exports2, module2) {
    "use strict";
    var { createCoreController } = require("@strapi/strapi").factories;
    module2.exports = createCoreController("plugin::webbycommerce.wishlist", ({ strapi: strapi2 }) => ({
      async getWishlist(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").findUserWishlist(user.id);
          if (!wishlist) {
            return ctx.send({
              data: {
                id: null,
                userId: user.id,
                userEmail: user.email,
                products: [],
                isPublic: false,
                name: null,
                description: null
              },
              meta: {
                totalProducts: 0,
                totalValue: 0,
                categories: []
              }
            });
          }
          const stats = await strapi2.plugin("webbycommerce").service("wishlist").getWishlistStats(user.id);
          ctx.send({
            data: wishlist,
            meta: stats
          });
        } catch (error) {
          strapi2.log.error("Error fetching wishlist:", error);
          ctx.badRequest("Failed to fetch wishlist", { error: error.message });
        }
      },
      async addToWishlist(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productId } = ctx.request.body;
          if (!productId) {
            return ctx.badRequest("Product ID is required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").addProductToWishlist(user.id, user.email, productId);
          const stats = await strapi2.plugin("webbycommerce").service("wishlist").getWishlistStats(user.id);
          ctx.send({
            data: wishlist,
            meta: stats,
            message: "Product added to wishlist successfully"
          });
        } catch (error) {
          strapi2.log.error("Error adding to wishlist:", error);
          ctx.badRequest("Failed to add product to wishlist", { error: error.message });
        }
      },
      async removeFromWishlist(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productId } = ctx.params;
          if (!productId) {
            return ctx.badRequest("Product ID is required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").removeProductFromWishlist(user.id, productId);
          const stats = await strapi2.plugin("webbycommerce").service("wishlist").getWishlistStats(user.id);
          ctx.send({
            data: wishlist,
            meta: stats,
            message: "Product removed from wishlist successfully"
          });
        } catch (error) {
          strapi2.log.error("Error removing from wishlist:", error);
          ctx.badRequest("Failed to remove product from wishlist", { error: error.message });
        }
      },
      async clearWishlist(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").clearWishlist(user.id);
          ctx.send({
            data: wishlist,
            meta: {
              totalProducts: 0,
              totalValue: 0,
              categories: []
            },
            message: "Wishlist cleared successfully"
          });
        } catch (error) {
          strapi2.log.error("Error clearing wishlist:", error);
          ctx.badRequest("Failed to clear wishlist", { error: error.message });
        }
      },
      async updateWishlist(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { name, description, isPublic } = ctx.request.body;
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").updateWishlist(user.id, { name, description, isPublic });
          ctx.send({
            data: wishlist,
            message: "Wishlist updated successfully"
          });
        } catch (error) {
          strapi2.log.error("Error updating wishlist:", error);
          ctx.badRequest("Failed to update wishlist", { error: error.message });
        }
      },
      async checkWishlistStatus(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { productIds } = ctx.query;
          if (!productIds) {
            return ctx.badRequest("Product IDs are required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").findUserWishlist(user.id);
          const productIdArray = Array.isArray(productIds) ? productIds.map((id) => parseInt(id)) : [parseInt(productIds)];
          const inWishlist = {};
          if (wishlist) {
            productIdArray.forEach((productId) => {
              inWishlist[productId] = wishlist.products.some((product) => product.id === productId);
            });
          } else {
            productIdArray.forEach((productId) => {
              inWishlist[productId] = false;
            });
          }
          ctx.send({
            data: inWishlist
          });
        } catch (error) {
          strapi2.log.error("Error checking wishlist status:", error);
          ctx.badRequest("Failed to check wishlist status", { error: error.message });
        }
      },
      async moveToCart(ctx) {
        try {
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required");
          }
          const { id } = ctx.params;
          const { quantity = 1 } = ctx.request.body;
          if (!id) {
            return ctx.badRequest("Wishlist item ID is required");
          }
          const wishlist = await strapi2.plugin("webbycommerce").service("wishlist").findUserWishlist(user.id);
          if (!wishlist) {
            return ctx.notFound("Wishlist not found");
          }
          const wishlistItem = wishlist.products.find((product2) => product2.id === parseInt(id));
          if (!wishlistItem) {
            return ctx.notFound("Product not found in wishlist");
          }
          const product = await strapi2.db.query("plugin::webbycommerce.product").findOne({
            where: { id: wishlistItem.id }
          });
          if (!product) {
            return ctx.notFound("Product not found");
          }
          strapi2.log.debug(`Product ${product.id} stock status: ${product.stock_status}, quantity: ${product.stock_quantity}, requested quantity: ${quantity}`);
          if (product.stock_status === "out_of_stock") {
            return ctx.badRequest("Product is currently out of stock");
          }
          if (product.stock_status === "on_backorder") {
            strapi2.log.warn(`Moving backordered product ${product.id} (${product.name}) to cart for user ${user.id} - item is on backorder`);
          }
          if (product.stock_quantity !== null && product.stock_quantity !== void 0 && product.stock_quantity < quantity) {
            return ctx.badRequest(`Insufficient stock. Available: ${product.stock_quantity}, Requested: ${quantity}`);
          }
          const existingCartItem = await strapi2.db.query("plugin::webbycommerce.cart-item").findOne({
            where: {
              user: user.id,
              product: product.id
            }
          });
          let cartItem;
          if (existingCartItem) {
            const newQuantity = existingCartItem.quantity + quantity;
            if (product.stock_quantity !== null && product.stock_quantity !== void 0 && product.stock_quantity < newQuantity) {
              return ctx.badRequest(`Insufficient stock for updated quantity. Available: ${product.stock_quantity}, Total requested: ${newQuantity}`);
            }
            cartItem = await strapi2.db.query("plugin::webbycommerce.cart-item").update({
              where: { id: existingCartItem.id },
              data: { quantity: newQuantity }
            });
          } else {
            cartItem = await strapi2.db.query("plugin::webbycommerce.cart-item").create({
              data: {
                user: user.id,
                product: product.id,
                quantity,
                unit_price: product.price,
                total_price: product.price * quantity
              }
            });
          }
          await strapi2.plugin("webbycommerce").service("wishlist").removeProductFromWishlist(user.id, product.id);
          ctx.send({
            data: {
              cart_item: {
                id: cartItem.id,
                product_id: product.id,
                product_name: product.name,
                quantity: cartItem.quantity,
                unit_price: parseFloat(product.price),
                total_price: parseFloat(product.price) * cartItem.quantity
              }
            },
            message: "Product moved to cart successfully"
          });
        } catch (error) {
          strapi2.log.error("Error moving item to cart:", error);
          ctx.badRequest("Failed to move item to cart", { error: error.message });
        }
      }
    }));
  }
});

// server/src/controllers/ecommerce.js
var require_ecommerce = __commonJS({
  "server/src/controllers/ecommerce.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      // No-op endpoint (not routed by default). Kept for permission discovery.
      async enable(ctx) {
        ctx.body = { ok: true };
      }
    };
  }
});

// server/src/controllers/shipping.js
var require_shipping = __commonJS({
  "server/src/controllers/shipping.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { ensureEcommercePermission } = require_check_ecommerce_permission();
    var parseTextList = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
      if (typeof value !== "string") return [];
      return value.split(/[\n,;]+/g).map((t) => t.trim()).filter(Boolean);
    };
    var parsePostalCodes = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value !== "string") return [];
      return value.split(/[\n,;]+/g).map((t) => t.trim()).filter(Boolean).map((token) => {
        const m = token.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
        if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
        return token;
      });
    };
    var addressMatchesZone = (address, zone) => {
      const locations = Array.isArray(zone.location) ? zone.location : [zone.location].filter(Boolean);
      for (const location of locations) {
        const zoneCountries = parseTextList(location.countries);
        const zoneStates = parseTextList(location.states);
        const zonePostalCodes = parsePostalCodes(location.postal_codes);
        if (zoneCountries.length > 0) {
          if (!zoneCountries.includes(address.country)) {
            continue;
          }
        }
        if (zoneStates.length > 0) {
          if (!zoneStates.includes(address.region)) {
            continue;
          }
        }
        if (zonePostalCodes.length > 0) {
          const postcode = address.postcode;
          let matches = false;
          for (const pattern of zonePostalCodes) {
            if (typeof pattern === "string") {
              const regex = new RegExp(pattern.replace(/\*/g, ".*"));
              if (regex.test(postcode)) {
                matches = true;
                break;
              }
            } else if (typeof pattern === "object" && pattern.min && pattern.max) {
              const numPostcode = parseInt(postcode, 10);
              if (!isNaN(numPostcode) && numPostcode >= pattern.min && numPostcode <= pattern.max) {
                matches = true;
                break;
              }
            }
          }
          if (!matches) {
            continue;
          }
        }
        return true;
      }
      return false;
    };
    var calculateShippingCost = async (cartItems, shippingAddress, method) => {
      let totalCost = parseFloat(method.handling_fee || 0);
      const rates = await strapi.db.query("plugin::webbycommerce.shipping-rate").findMany({
        where: {
          shippingMethod: method.id,
          is_active: true
        },
        orderBy: { sort_order: "asc", min_value: "asc" }
      });
      for (const rate of rates) {
        let conditionValue = 0;
        switch (rate.condition_type) {
          case "weight":
            for (const item of cartItems) {
              const weight = parseFloat(item.product?.weight || 0);
              conditionValue += weight * item.quantity;
            }
            break;
          case "price":
            for (const item of cartItems) {
              conditionValue += parseFloat(item.price) * item.quantity;
            }
            break;
          case "quantity":
            for (const item of cartItems) {
              conditionValue += item.quantity;
            }
            break;
          default:
            continue;
        }
        const minValue = parseFloat(rate.min_value);
        const maxValue = rate.max_value ? parseFloat(rate.max_value) : null;
        if (conditionValue >= minValue && (maxValue === null || conditionValue <= maxValue)) {
          totalCost += parseFloat(rate.rate);
          break;
        }
      }
      return totalCost;
    };
    var getAppliesToMethodIds = (appliesToMethods) => {
      if (!Array.isArray(appliesToMethods)) return [];
      return appliesToMethods.map((m) => m && typeof m === "object" ? m.id : m).filter((id) => id !== null && id !== void 0).map((id) => String(id));
    };
    var applyShippingRules = async (methods, cartItems, shippingAddress) => {
      const rules = await strapi.db.query("plugin::webbycommerce.shipping-rule").findMany({
        where: { is_active: true },
        orderBy: { priority: "desc" },
        // Higher priority first
        populate: { applies_to_methods: true }
      });
      const filteredMethods = [];
      for (const method of methods) {
        let isEligible = true;
        let modifiedCost = method.calculated_cost || 0;
        let messages = [];
        const methodId = String(method.id);
        const applicableRules = rules.filter((rule) => {
          const ids = getAppliesToMethodIds(rule.applies_to_methods);
          return ids.length === 0 || ids.includes(methodId);
        });
        for (const rule of applicableRules) {
          let conditionMet = false;
          let conditionValue = null;
          switch (rule.condition_type) {
            case "product_category":
              for (const item of cartItems) {
                const categories = item.product?.categories || [];
                const categoryIds = categories.map((cat) => cat.id);
                conditionMet = evaluateCondition(categoryIds, rule.condition_operator, rule.condition_value);
                if (conditionMet) break;
              }
              break;
            case "product_tag":
              for (const item of cartItems) {
                const tags = item.product?.tags || [];
                const tagIds = tags.map((tag) => tag.id);
                conditionMet = evaluateCondition(tagIds, rule.condition_operator, rule.condition_value);
                if (conditionMet) break;
              }
              break;
            case "order_total":
              conditionValue = cartItems.reduce(
                (total, item) => total + parseFloat(item.price) * item.quantity,
                0
              );
              conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
              break;
            case "cart_quantity":
              conditionValue = cartItems.reduce((total, item) => total + item.quantity, 0);
              conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
              break;
            case "shipping_address":
              conditionValue = shippingAddress[rule.condition_value];
              conditionMet = evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
              break;
          }
          if (conditionMet) {
            switch (rule.action_type) {
              case "hide_method":
                isEligible = false;
                break;
              case "add_fee":
                modifiedCost += parseFloat(rule.action_value || 0);
                if (rule.action_message) messages.push(rule.action_message);
                break;
              case "subtract_fee":
                modifiedCost -= parseFloat(rule.action_value || 0);
                if (rule.action_message) messages.push(rule.action_message);
                break;
              case "set_rate":
                modifiedCost = parseFloat(rule.action_value || 0);
                if (rule.action_message) messages.push(rule.action_message);
                break;
              case "multiply_rate":
                modifiedCost *= parseFloat(rule.action_value || 1);
                if (rule.action_message) messages.push(rule.action_message);
                break;
            }
          }
        }
        if (isEligible) {
          filteredMethods.push({
            ...method,
            calculated_cost: Math.max(0, modifiedCost),
            // Ensure cost is not negative
            rule_messages: messages
          });
        }
      }
      return filteredMethods;
    };
    var evaluateCondition = (value, operator, conditionValue) => {
      switch (operator) {
        case "equals":
          return value === conditionValue;
        case "not_equals":
          return value !== conditionValue;
        case "greater_than":
          return parseFloat(value) > parseFloat(conditionValue);
        case "less_than":
          return parseFloat(value) < parseFloat(conditionValue);
        case "contains":
          if (Array.isArray(value)) {
            return value.includes(conditionValue);
          }
          return String(value).includes(String(conditionValue));
        case "not_contains":
          if (Array.isArray(value)) {
            return !value.includes(conditionValue);
          }
          return !String(value).includes(String(conditionValue));
        case "in":
          return Array.isArray(conditionValue) && conditionValue.includes(value);
        case "not_in":
          return !Array.isArray(conditionValue) || !conditionValue.includes(value);
        default:
          return false;
      }
    };
    module2.exports = {
      /**
       * Get available shipping methods for cart and address
       */
      async getShippingMethods(ctx) {
        try {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
          const user = ctx.state.user;
          if (!user) {
            return ctx.unauthorized("Authentication required. Please provide a valid JWT token.");
          }
          const { cart_items, shipping_address } = ctx.request.body;
          if (!cart_items || !Array.isArray(cart_items) || cart_items.length === 0) {
            return ctx.badRequest("Cart items are required.");
          }
          if (!shipping_address || typeof shipping_address !== "object") {
            return ctx.badRequest("Shipping address is required.");
          }
          const requiredFields = ["country", "city", "street_address", "postcode"];
          for (const field of requiredFields) {
            if (!shipping_address[field]) {
              return ctx.badRequest(`Shipping address ${field} is required.`);
            }
          }
          const zones = await strapi.db.query("plugin::webbycommerce.shipping-zone").findMany({
            where: { is_active: true },
            orderBy: { sort_order: "asc" },
            populate: ["shippingMethods"]
          });
          const matchingZones = zones.filter((zone) => addressMatchesZone(shipping_address, zone));
          if (matchingZones.length === 0) {
            return ctx.send({ data: [], message: "No shipping methods available for this address." });
          }
          let availableMethods = [];
          for (const zone of matchingZones) {
            const methods = await strapi.db.query("plugin::webbycommerce.shipping-method").findMany({
              where: {
                shippingZone: zone.id,
                is_active: true
              },
              orderBy: { sort_order: "asc" },
              populate: ["shippingRates", "shippingZone"]
            });
            availableMethods = availableMethods.concat(methods);
          }
          const uniqueMethods = availableMethods.filter(
            (method, index, self) => index === self.findIndex((m) => String(m.id) === String(method.id))
          );
          const methodsWithCosts = [];
          for (const method of uniqueMethods) {
            try {
              const cost = await calculateShippingCost(cart_items, shipping_address, method);
              let finalCost = cost;
              if (method.is_free_shipping && method.free_shipping_threshold) {
                const cartTotal = cart_items.reduce(
                  (total, item) => total + parseFloat(item.price) * item.quantity,
                  0
                );
                if (cartTotal >= parseFloat(method.free_shipping_threshold)) {
                  finalCost = 0;
                }
              }
              methodsWithCosts.push({
                id: method.id,
                name: method.name,
                description: method.description,
                carrier: method.carrier,
                service_type: method.service_type,
                transit_time: method.transit_time,
                cost: finalCost,
                calculated_cost: finalCost,
                currency: method.shippingRates?.[0]?.currency || "USD",
                zone: {
                  id: method.shippingZone.id,
                  name: method.shippingZone.name
                }
              });
            } catch (error) {
              strapi.log.error(`Error calculating cost for method ${method.id}:`, error);
            }
          }
          const finalMethods = await applyShippingRules(methodsWithCosts, cart_items, shipping_address);
          const uniqueFinalMethods = finalMethods.filter(
            (method, index, self) => index === self.findIndex((m) => String(m.id) === String(method.id))
          );
          ctx.send({
            data: uniqueFinalMethods,
            meta: {
              total: uniqueFinalMethods.length,
              address: shipping_address
            }
          });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getShippingMethods:`, error);
          ctx.internalServerError("Failed to calculate shipping methods. Please try again.");
        }
      },
      /**
       * Get all shipping zones (admin only)
       */
      async getShippingZones(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const zones = await strapi.db.query("plugin::webbycommerce.shipping-zone").findMany({
            orderBy: { sort_order: "asc" },
            populate: ["shippingMethods", "location"]
          });
          ctx.send({ data: zones });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getShippingZones:`, error);
          ctx.internalServerError("Failed to fetch shipping zones. Please try again.");
        }
      },
      /**
       * Create shipping zone (admin only)
       */
      async createShippingZone(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const {
            name,
            description,
            // New shape (preferred):
            location,
            // Legacy shape (backwards compatible):
            countries,
            states,
            postal_codes,
            is_active,
            sort_order
          } = ctx.request.body;
          if (!name || typeof name !== "string" || name.trim().length === 0) {
            return ctx.badRequest("Zone name is required.");
          }
          let finalLocation;
          if (Array.isArray(location) && location.length > 0) {
            finalLocation = location;
          } else if (location && typeof location === "object") {
            finalLocation = [location];
          } else {
            finalLocation = [{
              countries: Array.isArray(countries) ? countries.join(",") : countries,
              states: Array.isArray(states) ? states.join(",") : states,
              postal_codes: Array.isArray(postal_codes) ? postal_codes.map((p) => typeof p === "string" ? p : JSON.stringify(p)).join("\n") : postal_codes
            }];
          }
          const zone = await strapi.db.query("plugin::webbycommerce.shipping-zone").create({
            data: {
              name: name.trim(),
              description: description ? description.trim() : null,
              location: finalLocation,
              is_active: is_active !== void 0 ? Boolean(is_active) : true,
              sort_order: sort_order !== void 0 ? parseInt(sort_order, 10) : 0
            }
          });
          ctx.send({ data: zone });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createShippingZone:`, error);
          ctx.internalServerError("Failed to create shipping zone. Please try again.");
        }
      },
      /**
       * Update shipping zone (admin only)
       */
      async updateShippingZone(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const {
            name,
            description,
            // New shape (preferred):
            location,
            // Legacy shape (backwards compatible):
            countries,
            states,
            postal_codes,
            is_active,
            sort_order
          } = ctx.request.body;
          const existingZone = await strapi.db.query("plugin::webbycommerce.shipping-zone").findOne({
            where: { id }
          });
          if (!existingZone) {
            return ctx.notFound("Shipping zone not found.");
          }
          const updateData = {};
          if (name !== void 0) updateData.name = name.trim();
          if (description !== void 0) updateData.description = description ? description.trim() : null;
          if (location !== void 0) {
            if (Array.isArray(location)) {
              updateData.location = location;
            } else if (typeof location === "object") {
              updateData.location = [location];
            }
          }
          if (location === void 0 && (countries !== void 0 || states !== void 0 || postal_codes !== void 0)) {
            const existingLocations = Array.isArray(existingZone.location) ? existingZone.location : [existingZone.location].filter(Boolean);
            const existingLocation = existingLocations.length > 0 ? existingLocations[0] : {};
            updateData.location = [{
              ...existingLocation,
              ...countries !== void 0 ? { countries: Array.isArray(countries) ? countries.join(",") : countries } : {},
              ...states !== void 0 ? { states: Array.isArray(states) ? states.join(",") : states } : {},
              ...postal_codes !== void 0 ? { postal_codes: Array.isArray(postal_codes) ? postal_codes.map((p) => typeof p === "string" ? p : JSON.stringify(p)).join("\n") : postal_codes } : {}
            }];
          }
          if (is_active !== void 0) updateData.is_active = Boolean(is_active);
          if (sort_order !== void 0) updateData.sort_order = parseInt(sort_order, 10);
          const updatedZone = await strapi.db.query("plugin::webbycommerce.shipping-zone").update({
            where: { id },
            data: updateData
          });
          ctx.send({ data: updatedZone });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingZone:`, error);
          ctx.internalServerError("Failed to update shipping zone. Please try again.");
        }
      },
      /**
       * Delete shipping zone (admin only)
       */
      async deleteShippingZone(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const zone = await strapi.db.query("plugin::webbycommerce.shipping-zone").findOne({
            where: { id },
            populate: ["shippingMethods"]
          });
          if (!zone) {
            return ctx.notFound("Shipping zone not found.");
          }
          if (zone.shippingMethods && zone.shippingMethods.length > 0) {
            return ctx.badRequest("Cannot delete zone with associated shipping methods. Please remove methods first.");
          }
          await strapi.db.query("plugin::webbycommerce.shipping-zone").delete({
            where: { id }
          });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingZone:`, error);
          ctx.internalServerError("Failed to delete shipping zone. Please try again.");
        }
      },
      /**
       * Get all shipping methods (admin only)
       */
      async getShippingMethodsAdmin(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const methods = await strapi.db.query("plugin::webbycommerce.shipping-method").findMany({
            orderBy: { sort_order: "asc" },
            populate: ["shippingZone", "shippingRates"]
          });
          ctx.send({ data: methods });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getShippingMethodsAdmin:`, error);
          ctx.internalServerError("Failed to fetch shipping methods. Please try again.");
        }
      },
      /**
       * Create shipping method (admin only)
       */
      async createShippingMethod(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const {
            name,
            description,
            carrier,
            service_type,
            carrier_service_code,
            transit_time,
            is_active,
            is_free_shipping,
            free_shipping_threshold,
            handling_fee,
            zone,
            sort_order
          } = ctx.request.body;
          if (!name || typeof name !== "string" || name.trim().length === 0) {
            return ctx.badRequest("Method name is required.");
          }
          if (!carrier || typeof carrier !== "string" || carrier.trim().length === 0) {
            return ctx.badRequest("Carrier is required.");
          }
          if (!service_type || typeof service_type !== "string" || service_type.trim().length === 0) {
            return ctx.badRequest("Service type is required.");
          }
          if (!zone || !zone.id) {
            return ctx.badRequest("Shipping zone is required.");
          }
          const existingZone = await strapi.db.query("plugin::webbycommerce.shipping-zone").findOne({
            where: { id: zone.id }
          });
          if (!existingZone) {
            return ctx.notFound("Shipping zone not found.");
          }
          const method = await strapi.db.query("plugin::webbycommerce.shipping-method").create({
            data: {
              name: name.trim(),
              description: description ? description.trim() : null,
              carrier: carrier.trim(),
              service_type: service_type.trim(),
              carrier_service_code: carrier_service_code ? carrier_service_code.trim() : null,
              transit_time: transit_time ? transit_time.trim() : null,
              is_active: is_active !== void 0 ? Boolean(is_active) : true,
              is_free_shipping: Boolean(is_free_shipping),
              free_shipping_threshold: free_shipping_threshold ? parseFloat(free_shipping_threshold) : null,
              handling_fee: handling_fee !== void 0 ? parseFloat(handling_fee) : 0,
              shippingZone: zone.id,
              sort_order: sort_order !== void 0 ? parseInt(sort_order, 10) : 0
            }
          });
          ctx.send({ data: method });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createShippingMethod:`, error);
          ctx.internalServerError("Failed to create shipping method. Please try again.");
        }
      },
      /**
       * Update shipping method (admin only)
       */
      async updateShippingMethod(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const {
            name,
            description,
            carrier,
            service_type,
            carrier_service_code,
            transit_time,
            is_active,
            is_free_shipping,
            free_shipping_threshold,
            handling_fee,
            zone,
            sort_order
          } = ctx.request.body;
          const existingMethod = await strapi.db.query("plugin::webbycommerce.shipping-method").findOne({
            where: { id }
          });
          if (!existingMethod) {
            return ctx.notFound("Shipping method not found.");
          }
          if (zone && zone.id) {
            const existingZone = await strapi.db.query("plugin::webbycommerce.shipping-zone").findOne({
              where: { id: zone.id }
            });
            if (!existingZone) {
              return ctx.notFound("Shipping zone not found.");
            }
          }
          const updateData = {};
          if (name !== void 0) updateData.name = name.trim();
          if (description !== void 0) updateData.description = description ? description.trim() : null;
          if (carrier !== void 0) updateData.carrier = carrier.trim();
          if (service_type !== void 0) updateData.service_type = service_type.trim();
          if (carrier_service_code !== void 0) updateData.carrier_service_code = carrier_service_code ? carrier_service_code.trim() : null;
          if (transit_time !== void 0) updateData.transit_time = transit_time ? transit_time.trim() : null;
          if (is_active !== void 0) updateData.is_active = Boolean(is_active);
          if (is_free_shipping !== void 0) updateData.is_free_shipping = Boolean(is_free_shipping);
          if (free_shipping_threshold !== void 0) updateData.free_shipping_threshold = free_shipping_threshold ? parseFloat(free_shipping_threshold) : null;
          if (handling_fee !== void 0) updateData.handling_fee = parseFloat(handling_fee);
          if (zone !== void 0 && zone.id) updateData.shippingZone = zone.id;
          if (sort_order !== void 0) updateData.sort_order = parseInt(sort_order, 10);
          const updatedMethod = await strapi.db.query("plugin::webbycommerce.shipping-method").update({
            where: { id },
            data: updateData
          });
          ctx.send({ data: updatedMethod });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingMethod:`, error);
          ctx.internalServerError("Failed to update shipping method. Please try again.");
        }
      },
      /**
       * Delete shipping method (admin only)
       */
      async deleteShippingMethod(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const method = await strapi.db.query("plugin::webbycommerce.shipping-method").findOne({
            where: { id },
            populate: ["shippingRates"]
          });
          if (!method) {
            return ctx.notFound("Shipping method not found.");
          }
          if (method.shippingRates && method.shippingRates.length > 0) {
            return ctx.badRequest("Cannot delete method with associated rates. Please remove rates first.");
          }
          await strapi.db.query("plugin::webbycommerce.shipping-method").delete({
            where: { id }
          });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingMethod:`, error);
          ctx.internalServerError("Failed to delete shipping method. Please try again.");
        }
      },
      /**
       * Get shipping rates for a method (admin only)
       */
      async getShippingRates(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { methodId } = ctx.params;
          const rates = await strapi.db.query("plugin::webbycommerce.shipping-rate").findMany({
            where: { shippingMethod: methodId },
            orderBy: { sort_order: "asc", min_value: "asc" },
            populate: ["shippingMethod"]
          });
          ctx.send({ data: rates });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in getShippingRates:`, error);
          ctx.internalServerError("Failed to fetch shipping rates. Please try again.");
        }
      },
      /**
       * Create shipping rate (admin only)
       */
      async createShippingRate(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const {
            name,
            condition_type,
            min_value,
            max_value,
            rate,
            currency,
            method,
            is_active,
            sort_order
          } = ctx.request.body;
          if (!name || typeof name !== "string" || name.trim().length === 0) {
            return ctx.badRequest("Rate name is required.");
          }
          const validConditionTypes = ["weight", "price", "quantity", "volume", "dimension"];
          if (!condition_type || !validConditionTypes.includes(condition_type)) {
            return ctx.badRequest("Valid condition type is required.");
          }
          if (min_value === void 0 || min_value === null) {
            return ctx.badRequest("Minimum value is required.");
          }
          if (rate === void 0 || rate === null) {
            return ctx.badRequest("Rate is required.");
          }
          if (!method || !method.id) {
            return ctx.badRequest("Shipping method is required.");
          }
          const existingMethod = await strapi.db.query("plugin::webbycommerce.shipping-method").findOne({
            where: { id: method.id }
          });
          if (!existingMethod) {
            return ctx.notFound("Shipping method not found.");
          }
          const shippingRate = await strapi.db.query("plugin::webbycommerce.shipping-rate").create({
            data: {
              name: name.trim(),
              condition_type,
              min_value: parseFloat(min_value),
              max_value: max_value !== void 0 ? parseFloat(max_value) : null,
              rate: parseFloat(rate),
              currency: currency || "USD",
              shippingMethod: method.id,
              is_active: is_active !== void 0 ? Boolean(is_active) : true,
              sort_order: sort_order !== void 0 ? parseInt(sort_order, 10) : 0
            }
          });
          ctx.send({ data: shippingRate });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createShippingRate:`, error);
          ctx.internalServerError("Failed to create shipping rate. Please try again.");
        }
      },
      /**
       * Update shipping rate (admin only)
       */
      async updateShippingRate(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const {
            name,
            condition_type,
            min_value,
            max_value,
            rate,
            currency,
            method,
            is_active,
            sort_order
          } = ctx.request.body;
          const existingRate = await strapi.db.query("plugin::webbycommerce.shipping-rate").findOne({
            where: { id }
          });
          if (!existingRate) {
            return ctx.notFound("Shipping rate not found.");
          }
          if (method && method.id) {
            const existingMethod = await strapi.db.query("plugin::webbycommerce.shipping-method").findOne({
              where: { id: method.id }
            });
            if (!existingMethod) {
              return ctx.notFound("Shipping method not found.");
            }
          }
          const updateData = {};
          if (name !== void 0) updateData.name = name.trim();
          if (condition_type !== void 0) {
            const validConditionTypes = ["weight", "price", "quantity", "volume", "dimension"];
            if (!validConditionTypes.includes(condition_type)) {
              return ctx.badRequest("Invalid condition type.");
            }
            updateData.condition_type = condition_type;
          }
          if (min_value !== void 0) updateData.min_value = parseFloat(min_value);
          if (max_value !== void 0) updateData.max_value = max_value ? parseFloat(max_value) : null;
          if (rate !== void 0) updateData.rate = parseFloat(rate);
          if (currency !== void 0) updateData.currency = currency;
          if (method !== void 0 && method.id) updateData.shippingMethod = method.id;
          if (is_active !== void 0) updateData.is_active = Boolean(is_active);
          if (sort_order !== void 0) updateData.sort_order = parseInt(sort_order, 10);
          const updatedRate = await strapi.db.query("plugin::webbycommerce.shipping-rate").update({
            where: { id },
            data: updateData
          });
          ctx.send({ data: updatedRate });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in updateShippingRate:`, error);
          ctx.internalServerError("Failed to update shipping rate. Please try again.");
        }
      },
      /**
       * Delete shipping rate (admin only)
       */
      async deleteShippingRate(ctx) {
        try {
          const user = ctx.state.user;
          const userRole = user?.role?.type;
          if (!user || userRole !== "admin" && userRole !== "super_admin") {
            return ctx.forbidden("Admin access required.");
          }
          const { id } = ctx.params;
          const rate = await strapi.db.query("plugin::webbycommerce.shipping-rate").findOne({
            where: { id }
          });
          if (!rate) {
            return ctx.notFound("Shipping rate not found.");
          }
          await strapi.db.query("plugin::webbycommerce.shipping-rate").delete({
            where: { id }
          });
          ctx.send({ data: { id } });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in deleteShippingRate:`, error);
          ctx.internalServerError("Failed to delete shipping rate. Please try again.");
        }
      }
    };
  }
});

// server/src/controllers/index.js
var require_controllers = __commonJS({
  "server/src/controllers/index.js"(exports2, module2) {
    "use strict";
    var controller = require_controller();
    var auth = require_auth();
    var address = require_address2();
    var compare = require_compare2();
    var order = require_order2();
    var payment = require_payment();
    var product = require_product2();
    var productTag = require_productTag();
    var productCategory = require_category();
    var productVariation = require_productVariation();
    var cart = require_cart2();
    var wishlist = require_wishlist2();
    var ecommerce = require_ecommerce();
    var shipping = require_shipping();
    module2.exports = {
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
      shipping
    };
  }
});

// server/src/utils/seed-data.js
var require_seed_data = __commonJS({
  "server/src/utils/seed-data.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    async function seedDemoData(strapi2) {
      try {
        strapi2.log.info("[webbycommerce] Starting demo data seeding...");
        let demoDataPath = path.join(__dirname, "../../data/demo-data.json");
        if (!fs.existsSync(demoDataPath)) {
          demoDataPath = path.join(__dirname, "../data/demo-data.json");
        }
        if (!fs.existsSync(demoDataPath)) {
          throw new Error(`Demo data file not found at: ${demoDataPath}`);
        }
        const demoData = JSON.parse(fs.readFileSync(demoDataPath, "utf8"));
        const entityMap = {
          users: /* @__PURE__ */ new Map(),
          usersByIndex: [],
          categories: /* @__PURE__ */ new Map(),
          tags: /* @__PURE__ */ new Map(),
          attributes: /* @__PURE__ */ new Map(),
          products: /* @__PURE__ */ new Map(),
          addresses: /* @__PURE__ */ new Map(),
          orders: /* @__PURE__ */ new Map(),
          coupons: /* @__PURE__ */ new Map(),
          shippingZones: /* @__PURE__ */ new Map(),
          carts: /* @__PURE__ */ new Map()
        };
        await seedCategories(strapi2, demoData.categories, entityMap);
        await seedTags(strapi2, demoData.tags, entityMap);
        await seedAttributes(strapi2, demoData.attributes, entityMap);
        await seedCoupons(strapi2, demoData.coupons, entityMap);
        await seedUsers(strapi2, demoData.users, entityMap);
        await seedAddresses(strapi2, demoData.addresses, entityMap);
        await seedProducts(strapi2, demoData.products, entityMap);
        await seedProductVariations(strapi2, demoData.product_variations, entityMap);
        await seedOrders(strapi2, demoData.orders, entityMap);
        await seedPaymentTransactions(strapi2, demoData.payment_transactions, entityMap);
        await seedShippingRules(strapi2, demoData.shipping_rules, entityMap);
        await seedCarts(strapi2, demoData.carts, entityMap);
        await seedCartItems(strapi2, demoData.carts, entityMap);
        await seedCompares(strapi2, demoData.compares, entityMap);
        await seedWishlists(strapi2, demoData.wishlists, entityMap);
        await seedShippingZones(strapi2, demoData.shipping_zones, entityMap);
        strapi2.log.info("[webbycommerce] Demo data seeding completed successfully!");
        return { success: true, message: "Demo data seeded successfully" };
      } catch (error) {
        strapi2.log.error("[webbycommerce] Error seeding demo data:", error);
        throw error;
      }
    }
    async function seedCategories(strapi2, categories, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding categories...");
      for (const category of categories) {
        try {
          const existingCategory = await strapi2.entityService.findMany("plugin::webbycommerce.product-category", {
            filters: { slug: category.slug }
          });
          if (existingCategory.length > 0) {
            entityMap.categories.set(category.slug, existingCategory[0]);
            continue;
          }
          const createdCategory = await strapi2.entityService.create("plugin::webbycommerce.product-category", {
            data: {
              name: category.name,
              slug: category.slug,
              description: category.description,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.categories.set(category.slug, createdCategory);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating category ${category.name}:`, error);
        }
      }
    }
    async function seedTags(strapi2, tags, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding tags...");
      for (const tag of tags) {
        try {
          const existingTag = await strapi2.entityService.findMany("plugin::webbycommerce.product-tag", {
            filters: { slug: tag.slug }
          });
          if (existingTag.length > 0) {
            entityMap.tags.set(tag.slug, existingTag[0]);
            continue;
          }
          const createdTag = await strapi2.entityService.create("plugin::webbycommerce.product-tag", {
            data: {
              name: tag.name,
              slug: tag.slug,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.tags.set(tag.slug, createdTag);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating tag ${tag.name}:`, error);
        }
      }
    }
    async function seedAttributes(strapi2, attributes, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding product attributes...");
      for (const attribute of attributes) {
        try {
          const strictSlug = attribute.name.toLowerCase().trim().replace(/\s+/g, "-");
          const existingAttribute = await strapi2.entityService.findMany("plugin::webbycommerce.product-attribute", {
            filters: { slug: strictSlug }
          });
          let attributeId;
          if (existingAttribute.length > 0) {
            attributeId = existingAttribute[0].id;
            entityMap.attributes.set(strictSlug, existingAttribute[0]);
          } else {
            const createdAttribute = await strapi2.entityService.create("plugin::webbycommerce.product-attribute", {
              data: {
                name: attribute.name,
                display_name: attribute.display_name || attribute.name,
                slug: strictSlug,
                type: attribute.type,
                sort_order: 0,
                publishedAt: /* @__PURE__ */ new Date()
              }
            });
            attributeId = createdAttribute.id;
            entityMap.attributes.set(strictSlug, createdAttribute);
            strapi2.log.info(`[webbycommerce] Created attribute: ${attribute.name}`);
          }
          const attributeValues = [];
          if (attribute.values && attribute.values.length > 0) {
            for (const value of attribute.values) {
              try {
                const valueSlug = value.toString().toLowerCase().trim().replace(/\s+/g, "-");
                const existingValue = await strapi2.entityService.findMany("plugin::webbycommerce.product-attribute-value", {
                  filters: {
                    slug: valueSlug,
                    product_attribute: attributeId
                  }
                });
                if (existingValue.length > 0) {
                  attributeValues.push(existingValue[0].id);
                } else {
                  const createdValue = await strapi2.entityService.create("plugin::webbycommerce.product-attribute-value", {
                    data: {
                      value,
                      slug: valueSlug,
                      // <--- THIS WAS MISSING
                      product_attribute: attributeId,
                      publishedAt: /* @__PURE__ */ new Date()
                    }
                  });
                  attributeValues.push(createdValue.id);
                }
              } catch (valueError) {
                strapi2.log.error(`[webbycommerce] Error creating value ${value} for ${attribute.name}:`, valueError);
              }
            }
          }
          if (attributeValues.length > 0) {
            await strapi2.entityService.update("plugin::webbycommerce.product-attribute", attributeId, {
              data: {
                product_attribute_values: attributeValues
              }
            });
          }
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating attribute ${attribute.name}:`, error);
        }
      }
    }
    async function seedCoupons(strapi2, coupons, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding coupons...");
      for (const coupon of coupons) {
        try {
          const existingCoupon = await strapi2.entityService.findMany("plugin::webbycommerce.coupon", {
            filters: { code: coupon.code }
          });
          if (existingCoupon.length > 0) {
            entityMap.coupons.set(coupon.code, existingCoupon[0]);
            continue;
          }
          const createdCoupon = await strapi2.entityService.create("plugin::webbycommerce.coupon", {
            data: {
              code: coupon.code,
              type: coupon.type,
              value: coupon.value,
              description: coupon.description,
              usage_limit: coupon.usage_limit,
              is_active: coupon.is_active,
              expires_at: coupon.expires_at,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.coupons.set(coupon.code, createdCoupon);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating coupon ${coupon.code}:`, error);
        }
      }
    }
    async function seedUsers(strapi2, users, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding users...");
      for (const user of users) {
        try {
          const existingUser = await strapi2.db.query("plugin::users-permissions.user").findOne({
            where: { email: user.email }
          });
          if (existingUser) {
            entityMap.users.set(user.email, existingUser);
            entityMap.usersByIndex.push(existingUser);
            continue;
          }
          const createdUser = await strapi2.plugins["users-permissions"].services.user.add({
            username: user.username,
            email: user.email,
            password: user.password,
            confirmed: user.confirmed,
            blocked: user.blocked,
            firstName: user.firstName,
            lastName: user.lastName
          });
          if (!createdUser.role) {
            const authenticatedRole = await strapi2.db.query("plugin::users-permissions.role").findOne({
              where: { type: "authenticated" }
            });
            if (authenticatedRole) {
              await strapi2.db.query("plugin::users-permissions.user").update({
                where: { id: createdUser.id },
                data: { role: authenticatedRole.id }
              });
            }
          }
          entityMap.users.set(user.email, createdUser);
          entityMap.usersByIndex.push(createdUser);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating user ${user.email}:`, error);
        }
      }
    }
    async function seedAddresses(strapi2, addresses, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding addresses...");
      for (const address of addresses) {
        try {
          const user = entityMap.users.get(address.email_address);
          if (!user) continue;
          const existingAddress = await strapi2.entityService.findMany("plugin::webbycommerce.address", {
            filters: { email_address: address.email_address, type: address.type }
          });
          if (existingAddress.length > 0) continue;
          const createdAddress = await strapi2.entityService.create("plugin::webbycommerce.address", {
            data: {
              ...address,
              user: user.id,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.addresses.set(`${address.email_address}_${address.type}`, createdAddress);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating address:`, error);
        }
      }
    }
    async function seedProducts(strapi2, products, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding products...");
      for (const product of products) {
        try {
          const existingProduct = await strapi2.entityService.findMany("plugin::webbycommerce.product", {
            filters: { slug: product.slug }
          });
          if (existingProduct.length > 0) {
            entityMap.products.set(product.slug, existingProduct[0]);
            continue;
          }
          const categoryIds = product.categories.map((catSlug) => {
            const category = entityMap.categories.get(catSlug);
            return category ? category.id : null;
          }).filter((id) => id !== null);
          const tagIds = product.tags.map((tagSlug) => {
            const tag = entityMap.tags.get(tagSlug);
            return tag ? tag.id : null;
          }).filter((id) => id !== null);
          const createdProduct = await strapi2.entityService.create("plugin::webbycommerce.product", {
            data: {
              name: product.name,
              slug: product.slug,
              description: product.description,
              price: product.price,
              sale_price: product.sale_price || null,
              sku: product.sku,
              stock_quantity: product.stock_quantity,
              stock_status: product.stock_status,
              weight: product.weight,
              product_categories: categoryIds,
              tags: tagIds,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.products.set(product.slug, createdProduct);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating product ${product.name}:`, error);
        }
      }
    }
    async function seedProductVariations(strapi2, productVariations, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding product variations...");
      for (const variation of productVariations) {
        try {
          const existingVariation = await strapi2.entityService.findMany("plugin::webbycommerce.product-variation", {
            filters: { sku: variation.sku }
          });
          if (existingVariation.length > 0) continue;
          const product = entityMap.products.get(variation.product);
          if (!product) continue;
          await strapi2.entityService.create("plugin::webbycommerce.product-variation", {
            data: {
              ...variation,
              product: product.id,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating product variation:`, error);
        }
      }
    }
    async function seedOrders(strapi2, orders, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding orders...");
      for (const order of orders) {
        try {
          const existingOrder = await strapi2.entityService.findMany("plugin::webbycommerce.order", {
            filters: { order_number: order.order_number }
          });
          if (existingOrder.length > 0) {
            entityMap.orders.set(order.order_number, existingOrder[0]);
            continue;
          }
          const user = entityMap.usersByIndex[order.user];
          if (!user) continue;
          const billingAddress = entityMap.addresses.get(`${order.billing_address}_billing`);
          const shippingAddress = entityMap.addresses.get(`${order.shipping_address}_shipping`);
          const createdOrder = await strapi2.entityService.create("plugin::webbycommerce.order", {
            data: {
              order_number: order.order_number,
              status: order.status,
              subtotal: order.subtotal,
              tax_amount: order.tax_amount,
              shipping_amount: order.shipping_amount,
              total: order.total,
              currency: order.currency,
              payment_status: order.payment_status,
              payment_method: order.payment_method,
              user: user.id,
              billing_address: billingAddress ? billingAddress.id : null,
              shipping_address: shippingAddress ? shippingAddress.id : null,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          entityMap.orders.set(order.order_number, createdOrder);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating order ${order.order_number}:`, error);
        }
      }
    }
    async function seedPaymentTransactions(strapi2, transactions, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding payment transactions...");
      const ordersList = Array.from(entityMap.orders.values());
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        try {
          const existingTransaction = await strapi2.entityService.findMany("plugin::webbycommerce.payment-transaction", {
            filters: { transaction_id: transaction.transaction_id }
          });
          if (existingTransaction.length > 0) continue;
          const order = ordersList[i];
          const createdTransaction = await strapi2.entityService.create("plugin::webbycommerce.payment-transaction", {
            data: {
              transaction_id: transaction.transaction_id,
              payment_method: transaction.payment_method,
              amount: transaction.amount,
              currency: transaction.currency,
              status: transaction.status,
              processed_at: transaction.processed_at,
              order: order ? order.id : null,
              // Link Order here
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
          strapi2.log.info(`[webbycommerce] Created payment transaction: ${transaction.transaction_id} linked to Order ${order ? order.order_number : "None"}`);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating payment transaction ${transaction.transaction_id}:`, error);
        }
      }
    }
    async function seedShippingRules(strapi2, shippingRules, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding shipping rules...");
      for (const rule of shippingRules) {
        try {
          const existingRule = await strapi2.entityService.findMany("plugin::webbycommerce.shipping-rule", {
            filters: { name: rule.name }
          });
          if (existingRule.length > 0) continue;
          await strapi2.entityService.create("plugin::webbycommerce.shipping-rule", {
            data: { ...rule, publishedAt: /* @__PURE__ */ new Date() }
          });
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating shipping rule:`, error);
        }
      }
    }
    async function seedCompares(strapi2, compares, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding compares...");
      for (const compare of compares) {
        try {
          const user = entityMap.users.get(compare.userEmail);
          if (!user) continue;
          const productIds = compare.products.map((slug) => entityMap.products.get(slug)?.id).filter((id) => id);
          if (productIds.length === 0) continue;
          const existingCompare = await strapi2.entityService.findMany("plugin::webbycommerce.compare", {
            filters: { userId: String(user.id) }
          });
          if (existingCompare.length > 0) continue;
          await strapi2.entityService.create("plugin::webbycommerce.compare", {
            data: {
              userId: String(user.id),
              userEmail: user.email,
              name: compare.name,
              products: productIds,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating compare:`, error);
        }
      }
    }
    async function seedWishlists(strapi2, wishlists, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding wishlists...");
      for (const wishlist of wishlists) {
        try {
          const user = entityMap.users.get(wishlist.userEmail);
          if (!user) continue;
          const productIds = wishlist.products.map((slug) => entityMap.products.get(slug)?.id).filter((id) => id);
          if (productIds.length === 0) continue;
          const existingWishlist = await strapi2.entityService.findMany("plugin::webbycommerce.wishlist", {
            filters: { userId: String(user.id), name: wishlist.name }
          });
          if (existingWishlist.length > 0) continue;
          await strapi2.entityService.create("plugin::webbycommerce.wishlist", {
            data: {
              userId: String(user.id),
              userEmail: user.email,
              name: wishlist.name,
              description: wishlist.description,
              isPublic: wishlist.isPublic,
              products: productIds,
              publishedAt: /* @__PURE__ */ new Date()
            }
          });
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating wishlist:`, error);
        }
      }
    }
    async function seedCarts(strapi2, carts, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding carts...");
      for (const cart of carts) {
        try {
          const user = entityMap.users.get(cart.userEmail);
          if (!user) continue;
          const existingCart = await strapi2.entityService.findMany("plugin::webbycommerce.cart", {
            filters: { user: user.id }
          });
          if (existingCart.length > 0) {
            entityMap.carts.set(user.email, existingCart[0]);
            continue;
          }
          const createdCart = await strapi2.entityService.create("plugin::webbycommerce.cart", {
            data: {
              user: user.id,
              currency: cart.currency
            }
          });
          entityMap.carts.set(user.email, createdCart);
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating cart:`, error);
        }
      }
    }
    async function seedCartItems(strapi2, carts, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding cart items...");
      for (const cartData of carts) {
        try {
          const user = entityMap.users.get(cartData.userEmail);
          if (!user) continue;
          const cart = entityMap.carts.get(user.email);
          if (!cart) continue;
          for (const item of cartData.items) {
            const product = entityMap.products.get(item.product);
            if (!product) continue;
            const existingItem = await strapi2.entityService.findMany("plugin::webbycommerce.cart-item", {
              filters: { cart: cart.id, product: product.id }
            });
            if (existingItem.length > 0) continue;
            const finalPrice = product.sale_price && product.sale_price < product.price ? product.sale_price : product.price;
            await strapi2.entityService.create("plugin::webbycommerce.cart-item", {
              data: {
                cart: cart.id,
                product: product.id,
                quantity: item.quantity,
                unit_price: finalPrice,
                total_price: finalPrice * item.quantity,
                user: user.id
              }
            });
          }
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating cart items:`, error);
        }
      }
    }
    async function seedShippingZones(strapi2, shippingZones, entityMap) {
      strapi2.log.info("[webbycommerce] Seeding shipping zones...");
      for (const zone of shippingZones) {
        try {
          const existingZone = await strapi2.entityService.findMany("plugin::webbycommerce.shipping-zone", {
            filters: { name: zone.name }
          });
          if (existingZone.length > 0) continue;
          const shippingMethods = [];
          for (const method of zone.methods) {
            const createdMethod = await strapi2.entityService.create("plugin::webbycommerce.shipping-method", {
              data: {
                ...method,
                is_active: true,
                publishedAt: /* @__PURE__ */ new Date()
              }
            });
            if (method.rates) {
              for (const rate of method.rates) {
                await strapi2.entityService.create("plugin::webbycommerce.shipping-rate", {
                  data: {
                    ...rate,
                    shipping_method: createdMethod.id,
                    publishedAt: /* @__PURE__ */ new Date()
                  }
                });
              }
            }
            shippingMethods.push(createdMethod.id);
          }
          await strapi2.entityService.create("plugin::webbycommerce.shipping-zone", {
            data: {
              name: zone.name,
              location: [zone.location],
              shippingMethods,
              is_active: true,
              sort_order: 0
            }
          });
        } catch (error) {
          strapi2.log.error(`[webbycommerce] Error creating shipping zone:`, error);
        }
      }
    }
    module2.exports = {
      seedDemoData
    };
  }
});

// server/src/services/service.js
var require_service = __commonJS({
  "server/src/services/service.js"(exports2, module2) {
    "use strict";
    var PLUGIN_ID = "webbycommerce";
    var { seedDemoData } = require_seed_data();
    module2.exports = ({ strapi: strapi2 }) => ({
      getPluginInfo() {
        return {
          name: PLUGIN_ID,
          version: "1.0.0"
        };
      },
      async seedDemoData() {
        return await seedDemoData(strapi2);
      }
    });
  }
});

// server/src/services/compare.js
var require_compare3 = __commonJS({
  "server/src/services/compare.js"(exports2, module2) {
    "use strict";
    var { createCoreService } = require("@strapi/strapi").factories;
    module2.exports = createCoreService("plugin::webbycommerce.compare", ({ strapi: strapi2 }) => ({
      async findUserCompare(userId) {
        try {
          const compares = await strapi2.db.query("plugin::webbycommerce.compare").findMany({
            where: {
              userId: String(userId)
            },
            orderBy: { createdAt: "desc" },
            populate: {
              products: {
                populate: {
                  images: true,
                  product_categories: true,
                  tags: true,
                  variations: {
                    populate: {
                      attributes: true,
                      attributeValues: true
                    }
                  }
                }
              },
              category: true
            }
          });
          return compares.length > 0 ? compares[0] : null;
        } catch (error) {
          throw new Error(`Failed to find user compare: ${error.message}`);
        }
      },
      async createUserCompare(userId, userEmail, data = {}) {
        try {
          const compareData = {
            userId: String(userId),
            userEmail,
            products: [],
            isPublic: data.isPublic || false,
            name: data.name || null,
            notes: data.notes || null,
            category: data.categoryId || null
          };
          await strapi2.entityService.create("plugin::webbycommerce.compare", {
            data: compareData
          });
          return await this.findUserCompare(userId);
        } catch (error) {
          throw new Error(`Failed to create user compare: ${error.message}`);
        }
      },
      async addProductToCompare(userId, userEmail, productId) {
        try {
          let compare = await this.findUserCompare(userId);
          if (!compare) {
            compare = await this.createUserCompare(userId, userEmail);
          }
          if (!compare.products) {
            compare.products = [];
          }
          if (compare.products.length >= 4) {
            throw new Error("Compare list is full. Maximum 4 products allowed.");
          }
          const productExists = compare.products.some((product2) => {
            const productIdValue = typeof product2 === "object" && product2 !== null ? product2.id : product2;
            return productIdValue === parseInt(productId);
          });
          if (productExists) {
            throw new Error("Product already exists in compare list");
          }
          const product = await strapi2.entityService.findOne("plugin::webbycommerce.product", productId, {
            populate: ["product_categories"]
          });
          if (!product) {
            throw new Error("Product not found");
          }
          if (compare.category && product.product_categories && product.product_categories.length > 0 && compare.category.id !== product.product_categories[0].id) {
            strapi2.log.warn(`Adding product from different category to compare list. Compare category: ${compare.category.name}, Product category: ${product.product_categories[0].name}`);
          }
          const existingProductIds = compare.products.map((p) => {
            return typeof p === "object" && p !== null ? p.id : p;
          }).filter((id) => id != null);
          await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: [...existingProductIds, parseInt(productId, 10)].map((id) => ({ id })) },
              category: compare.category || product.product_categories?.[0]?.id || null
            }
          });
          return await this.findUserCompare(userId);
        } catch (error) {
          throw new Error(`Failed to add product to compare: ${error.message}`);
        }
      },
      async removeProductFromCompare(userId, productId) {
        try {
          const compare = await this.findUserCompare(userId);
          if (!compare) {
            throw new Error("Compare list not found");
          }
          if (!compare.products) {
            compare.products = [];
          }
          const updatedProducts = compare.products.filter((product) => {
            const productIdValue = typeof product === "object" && product !== null ? product.id : product;
            return productIdValue !== parseInt(productId);
          }).map((product) => {
            return typeof product === "object" && product !== null ? product.id : product;
          });
          await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: updatedProducts.map((id) => ({ id })) },
              // Reset category if no products left
              category: updatedProducts.length === 0 ? null : compare.category
            }
          });
          return await this.findUserCompare(userId);
        } catch (error) {
          throw new Error(`Failed to remove product from compare: ${error.message}`);
        }
      },
      async clearCompare(userId) {
        try {
          const compare = await this.findUserCompare(userId);
          if (!compare) {
            throw new Error("Compare list not found");
          }
          await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: [] },
              category: null
            }
          });
          return await this.findUserCompare(userId);
        } catch (error) {
          throw new Error(`Failed to clear compare list: ${error.message}`);
        }
      },
      async updateCompare(userId, data) {
        try {
          const compare = await this.findUserCompare(userId);
          if (!compare) {
            throw new Error("Compare list not found");
          }
          await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              name: data.name !== void 0 ? data.name : compare.name,
              notes: data.notes !== void 0 ? data.notes : compare.notes,
              isPublic: data.isPublic !== void 0 ? data.isPublic : compare.isPublic
            }
          });
          return await this.findUserCompare(userId);
        } catch (error) {
          throw new Error(`Failed to update compare list: ${error.message}`);
        }
      },
      async getCompareData(userId) {
        try {
          const compare = await this.findUserCompare(userId);
          if (!compare) {
            return {
              products: [],
              category: null,
              comparisonData: {}
            };
          }
          if (!compare.products) {
            compare.products = [];
          }
          const comparisonData = this.generateComparisonData(compare.products);
          return {
            products: compare.products,
            category: compare.category,
            comparisonData
          };
        } catch (error) {
          throw new Error(`Failed to get compare data: ${error.message}`);
        }
      },
      generateComparisonData(products) {
        if (!products || products.length === 0) {
          return {};
        }
        const comparisonData = {
          specifications: {},
          pricing: {},
          availability: {},
          ratings: {}
        };
        const specKeys = /* @__PURE__ */ new Set();
        products.forEach((product) => {
          if (product.specifications) {
            Object.keys(product.specifications).forEach((key) => specKeys.add(key));
          }
        });
        specKeys.forEach((specKey) => {
          comparisonData.specifications[specKey] = {};
          products.forEach((product) => {
            comparisonData.specifications[specKey][product.id] = product.specifications?.[specKey] || "N/A";
          });
        });
        products.forEach((product) => {
          comparisonData.pricing[product.id] = {
            regularPrice: product.regularPrice || 0,
            salePrice: product.salePrice || null,
            discount: product.discount || 0
          };
        });
        products.forEach((product) => {
          comparisonData.availability[product.id] = {
            inStock: product.stockQuantity > 0,
            stockQuantity: product.stockQuantity || 0,
            status: product.status || "active"
          };
        });
        products.forEach((product) => {
          comparisonData.ratings[product.id] = {
            averageRating: product.averageRating || 0,
            totalReviews: product.totalReviews || 0
          };
        });
        return comparisonData;
      }
    }));
  }
});

// server/src/services/cart.js
var require_cart3 = __commonJS({
  "server/src/services/cart.js"(exports2, module2) {
    "use strict";
    var { createCoreService } = require("@strapi/strapi").factories;
    var CART_UID = "plugin::webbycommerce.cart";
    var CART_ITEM_UID = "plugin::webbycommerce.cart-item";
    var PRODUCT_UID = "plugin::webbycommerce.product";
    var COUPON_UID = "plugin::webbycommerce.coupon";
    var asInt = (value) => {
      const n = Number.parseInt(String(value), 10);
      return Number.isFinite(n) ? n : null;
    };
    var asQty = (value) => {
      const n = asInt(value);
      if (!n || n < 1) return null;
      return n;
    };
    module2.exports = createCoreService(CART_ITEM_UID, ({ strapi: strapi2 }) => ({
      async getOrCreateCart({ userId, guestId }) {
        let cart;
        if (userId) {
          cart = await strapi2.db.query(CART_UID).findOne({
            where: { user: userId },
            select: ["id", "guest_id", "currency"]
          });
          if (cart?.id) {
            const cartWithCoupon = await strapi2.db.query(CART_UID).findOne({
              where: { id: cart.id },
              populate: { coupon: true }
            });
            return cartWithCoupon || cart;
          }
          cart = await strapi2.db.query(CART_UID).create({
            data: {
              user: userId,
              currency: "USD"
            },
            select: ["id", "guest_id", "currency"]
          });
          return await strapi2.db.query(CART_UID).findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
        }
        if (guestId) {
          cart = await strapi2.db.query(CART_UID).findOne({
            where: { guest_id: String(guestId) },
            select: ["id", "guest_id", "currency"]
          });
          if (cart?.id) {
            const cartWithCoupon = await strapi2.db.query(CART_UID).findOne({
              where: { id: cart.id },
              populate: { coupon: true }
            });
            return cartWithCoupon || cart;
          }
          cart = await strapi2.db.query(CART_UID).create({
            data: {
              guest_id: String(guestId),
              currency: "USD"
            },
            select: ["id", "guest_id", "currency"]
          });
          return await strapi2.db.query(CART_UID).findOne({
            where: { id: cart.id },
            populate: { coupon: true }
          });
        }
        cart = await strapi2.db.query(CART_UID).create({
          data: {
            currency: "USD"
          },
          select: ["id", "guest_id", "currency"]
        });
        return await strapi2.db.query(CART_UID).findOne({
          where: { id: cart.id },
          populate: { coupon: true }
        });
      },
      async getCartItems({ cartId }) {
        return await strapi2.db.query(CART_ITEM_UID).findMany({
          where: { cart: cartId },
          orderBy: { createdAt: "desc" },
          populate: {
            product: { populate: ["images"] },
            variation: true,
            attributes: true,
            attributeValues: true
          }
        });
      },
      async getTotalsFromItems(items, coupon = null) {
        const safe = Array.isArray(items) ? items : [];
        const totalItems = safe.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
        const subtotal = safe.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);
        let discount = 0;
        if (coupon) {
          if (coupon.type === "percentage") {
            discount = subtotal * Number(coupon.value || 0) / 100;
          } else if (coupon.type === "fixed") {
            discount = Number(coupon.value || 0);
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
          currency: "USD"
        };
      },
      async addOrUpdateItem({ cartId, userId, productId, quantity }) {
        const qty = asQty(quantity);
        const pid = asInt(productId);
        if (!pid) {
          const err = new Error("Product ID is required");
          err.status = 400;
          throw err;
        }
        if (!qty) {
          const err = new Error("Quantity must be an integer >= 1");
          err.status = 400;
          throw err;
        }
        const product = await strapi2.db.query(PRODUCT_UID).findOne({
          where: { id: pid },
          select: ["id", "name", "price", "sku", "stock_status", "stock_quantity"]
        });
        if (!product) {
          const err = new Error("Product not found");
          err.status = 404;
          throw err;
        }
        if (product.stock_status === "out_of_stock" || product.stock_quantity !== null && product.stock_quantity !== void 0 && product.stock_status !== "on_backorder" && product.stock_quantity < qty) {
          const available = product.stock_quantity === null || product.stock_quantity === void 0 ? null : product.stock_quantity;
          const err = new Error(
            available === null ? "Product is out of stock" : `Insufficient stock. Available: ${available}, Requested: ${qty}`
          );
          err.status = 400;
          throw err;
        }
        const unitPrice = Number(product.price || 0);
        const existing = await strapi2.db.query(CART_ITEM_UID).findOne({
          where: { cart: cartId, product: product.id },
          select: ["id", "quantity"]
        });
        if (existing?.id) {
          const newQty = (Number(existing.quantity) || 0) + qty;
          if (product.stock_quantity !== null && product.stock_quantity !== void 0 && product.stock_status !== "on_backorder" && product.stock_quantity < newQty) {
            const err = new Error(
              `Insufficient stock for updated quantity. Available: ${product.stock_quantity}, Total requested: ${newQty}`
            );
            err.status = 400;
            throw err;
          }
          return await strapi2.db.query(CART_ITEM_UID).update({
            where: { id: existing.id },
            data: {
              user: userId || null,
              cart: cartId,
              quantity: newQty,
              unit_price: unitPrice,
              total_price: unitPrice * newQty
            }
          });
        }
        return await strapi2.db.query(CART_ITEM_UID).create({
          data: {
            user: userId || null,
            cart: cartId,
            product: product.id,
            quantity: qty,
            unit_price: unitPrice,
            total_price: unitPrice * qty
          }
        });
      },
      async updateItemQuantity({ cartId, userId, cartItemId, quantity }) {
        const qty = asQty(quantity);
        const id = asInt(cartItemId);
        if (!id) {
          const err = new Error("Cart item ID is required");
          err.status = 400;
          throw err;
        }
        if (!qty) {
          const err = new Error("Quantity must be an integer >= 1");
          err.status = 400;
          throw err;
        }
        const existing = await strapi2.db.query(CART_ITEM_UID).findOne({
          where: { id, cart: cartId },
          populate: { product: { select: ["id", "price", "stock_status", "stock_quantity", "name"] } }
        });
        if (!existing) {
          const err = new Error("Cart item not found");
          err.status = 404;
          throw err;
        }
        const product = existing.product;
        if (!product) {
          const err = new Error("Product not found for this cart item");
          err.status = 400;
          throw err;
        }
        if (product.stock_status === "out_of_stock" || product.stock_quantity !== null && product.stock_quantity !== void 0 && product.stock_status !== "on_backorder" && product.stock_quantity < qty) {
          const available = product.stock_quantity === null || product.stock_quantity === void 0 ? null : product.stock_quantity;
          const err = new Error(
            available === null ? `Product is out of stock: ${product.name}` : `Insufficient stock. Available: ${available}, Requested: ${qty}`
          );
          err.status = 400;
          throw err;
        }
        const unitPrice = Number(product.price || existing.unit_price || 0);
        return await strapi2.db.query(CART_ITEM_UID).update({
          where: { id: existing.id },
          data: {
            user: userId || null,
            cart: cartId,
            quantity: qty,
            unit_price: unitPrice,
            total_price: unitPrice * qty
          }
        });
      },
      async removeItem({ cartId, cartItemId }) {
        const id = asInt(cartItemId);
        if (!id) {
          const err = new Error("Cart item ID is required");
          err.status = 400;
          throw err;
        }
        const existing = await strapi2.db.query(CART_ITEM_UID).findOne({
          where: { id, cart: cartId },
          select: ["id"]
        });
        if (!existing) {
          const err = new Error("Cart item not found");
          err.status = 404;
          throw err;
        }
        await strapi2.db.query(CART_ITEM_UID).delete({ where: { id: existing.id } });
        return true;
      },
      async clearCart(cartId) {
        await strapi2.db.query(CART_ITEM_UID).deleteMany({
          where: { cart: cartId }
        });
        return true;
      },
      async validateAndApplyCoupon({ cartId, couponCode }) {
        if (!couponCode || typeof couponCode !== "string" || !couponCode.trim()) {
          const err = new Error("Coupon code is required");
          err.status = 400;
          throw err;
        }
        const normalizedCode = couponCode.trim();
        strapi2.log.info(`[webbycommerce] Looking for coupon code: "${normalizedCode}"`);
        let coupon = null;
        try {
          const coupons = await strapi2.entityService.findMany(COUPON_UID, {
            filters: {
              code: normalizedCode
            }
          });
          strapi2.log.debug(`[webbycommerce] entityService found ${coupons?.length || 0} coupons with exact match`);
          if (coupons && Array.isArray(coupons) && coupons.length > 0) {
            coupon = coupons[0];
            strapi2.log.debug(`[webbycommerce] Found via entityService: "${coupon.code}"`);
          }
        } catch (entityServiceError) {
          strapi2.log.warn(`[webbycommerce] entityService query failed:`, entityServiceError.message);
        }
        if (!coupon) {
          try {
            coupon = await strapi2.db.query(COUPON_UID).findOne({
              where: { code: normalizedCode }
            });
            if (coupon) {
              strapi2.log.debug(`[webbycommerce] Found via db.query: "${coupon.code}"`);
            } else {
              strapi2.log.debug(`[webbycommerce] db.query exact match returned null`);
            }
          } catch (dbError) {
            strapi2.log.warn(`[webbycommerce] db.query exact match failed:`, dbError.message);
          }
        }
        if (!coupon) {
          try {
            coupon = await strapi2.db.query(COUPON_UID).findOne({
              where: { code: normalizedCode.toUpperCase() }
            });
            if (coupon) {
              strapi2.log.debug(`[webbycommerce] Found via db.query (uppercase): "${coupon.code}"`);
            }
          } catch (dbError) {
          }
        }
        if (!coupon) {
          try {
            coupon = await strapi2.db.query(COUPON_UID).findOne({
              where: { code: normalizedCode.toLowerCase() }
            });
            if (coupon) {
              strapi2.log.debug(`[webbycommerce] Found via db.query (lowercase): "${coupon.code}"`);
            }
          } catch (dbError) {
          }
        }
        if (!coupon) {
          try {
            strapi2.log.debug(`[webbycommerce] Trying fallback: fetching all coupons for case-insensitive match`);
            const allCoupons = await strapi2.entityService.findMany(COUPON_UID, {
              filters: {}
            });
            strapi2.log.debug(`[webbycommerce] Fetched ${allCoupons?.length || 0} total coupons`);
            if (allCoupons && Array.isArray(allCoupons)) {
              const allCodes = allCoupons.map((c) => `"${c.code || "N/A"}"`).join(", ");
              strapi2.log.debug(`[webbycommerce] All coupon codes: ${allCodes}`);
              coupon = allCoupons.find(
                (c) => {
                  const couponCode2 = c.code ? String(c.code).trim() : "";
                  const searchCode = normalizedCode.toLowerCase();
                  const match = couponCode2.toLowerCase() === searchCode;
                  if (match) {
                    strapi2.log.debug(`[webbycommerce] Case-insensitive match found: "${couponCode2}" === "${normalizedCode}"`);
                  }
                  return match;
                }
              );
            }
          } catch (fallbackError) {
            strapi2.log.error(`[webbycommerce] Fallback query failed:`, fallbackError.message, fallbackError.stack);
          }
        }
        if (!coupon) {
          strapi2.log.error(`[webbycommerce] Coupon not found: "${normalizedCode}"`);
          try {
            const availableCoupons = await strapi2.entityService.findMany(COUPON_UID, {
              filters: {}
            });
            if (availableCoupons && Array.isArray(availableCoupons)) {
              const codes = availableCoupons.slice(0, 20).map((c) => `"${c.code || "N/A"}"`).join(", ");
              strapi2.log.error(`[webbycommerce] Available coupons (${availableCoupons.length}): ${codes}`);
            } else {
              strapi2.log.error(`[webbycommerce] No coupons found in database or query returned invalid format`);
            }
          } catch (debugError) {
            strapi2.log.error(`[webbycommerce] Error fetching coupons for debug:`, debugError.message, debugError.stack);
          }
          const err = new Error("Invalid coupon code");
          err.status = 400;
          throw err;
        }
        strapi2.log.info(`[webbycommerce] Found coupon: "${coupon.code}" (ID: ${coupon.id}, Active: ${coupon.is_active})`);
        if (coupon.is_active === false) {
          const err = new Error("This coupon is not active");
          err.status = 400;
          throw err;
        }
        if (coupon.expires_at) {
          const now = /* @__PURE__ */ new Date();
          const expiresAt = new Date(coupon.expires_at);
          if (expiresAt < now) {
            const err = new Error("This coupon has expired");
            err.status = 400;
            throw err;
          }
        }
        if (coupon.usage_limit !== null && coupon.usage_limit !== void 0) {
          const usedCount = coupon.used_count || 0;
          if (usedCount >= coupon.usage_limit) {
            const err = new Error("This coupon has reached its usage limit");
            err.status = 400;
            throw err;
          }
        }
        const items = await this.getCartItems({ cartId });
        const subtotal = items.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);
        if (coupon.minimum_order_amount !== null && coupon.minimum_order_amount !== void 0) {
          if (subtotal < Number(coupon.minimum_order_amount)) {
            const err = new Error(
              `Minimum order amount of ${coupon.minimum_order_amount} required for this coupon`
            );
            err.status = 400;
            throw err;
          }
        }
        await strapi2.db.query(CART_UID).update({
          where: { id: cartId },
          data: { coupon: coupon.id }
        });
        return coupon;
      },
      async removeCoupon({ cartId }) {
        await strapi2.db.query(CART_UID).update({
          where: { id: cartId },
          data: { coupon: null }
        });
        return true;
      }
    }));
  }
});

// server/src/services/wishlist.js
var require_wishlist3 = __commonJS({
  "server/src/services/wishlist.js"(exports2, module2) {
    "use strict";
    var { createCoreService } = require("@strapi/strapi").factories;
    module2.exports = createCoreService("plugin::webbycommerce.wishlist", ({ strapi: strapi2 }) => ({
      async findUserWishlist(userId) {
        try {
          const wishlists = await strapi2.db.query("plugin::webbycommerce.wishlist").findMany({
            where: {
              userId: String(userId)
            },
            orderBy: { createdAt: "desc" },
            populate: {
              products: {
                populate: {
                  images: true,
                  product_categories: true,
                  tags: true,
                  variations: {
                    populate: {
                      attributes: true,
                      attributeValues: true
                    }
                  }
                }
              }
            }
          });
          return wishlists.length > 0 ? wishlists[0] : null;
        } catch (error) {
          throw new Error(`Failed to find user wishlist: ${error.message}`);
        }
      },
      async createUserWishlist(userId, userEmail, data = {}) {
        try {
          const wishlistData = {
            userId: String(userId),
            userEmail,
            products: [],
            isPublic: data.isPublic || false,
            name: data.name || null,
            description: data.description || null
          };
          await strapi2.entityService.create("plugin::webbycommerce.wishlist", {
            data: wishlistData
          });
          return await this.findUserWishlist(userId);
        } catch (error) {
          throw new Error(`Failed to create user wishlist: ${error.message}`);
        }
      },
      async addProductToWishlist(userId, userEmail, productId) {
        try {
          let wishlist = await this.findUserWishlist(userId);
          if (!wishlist) {
            wishlist = await this.createUserWishlist(userId, userEmail);
          }
          if (!wishlist.products) {
            wishlist.products = [];
          }
          const productExists = wishlist.products.some((product2) => {
            const productIdValue = typeof product2 === "object" && product2 !== null ? product2.id : product2;
            return productIdValue === parseInt(productId);
          });
          if (productExists) {
            throw new Error("Product already exists in wishlist");
          }
          const product = await strapi2.db.query("plugin::webbycommerce.product").findOne({
            where: { id: productId },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          if (!product) {
            throw new Error("Product not found");
          }
          const existingProductIds = wishlist.products.map((p) => {
            return typeof p === "object" && p !== null ? p.id : p;
          }).filter((id) => id != null);
          await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: { set: [...existingProductIds, parseInt(productId, 10)].map((id) => ({ id })) }
            }
          });
          return await this.findUserWishlist(userId);
        } catch (error) {
          throw new Error(`Failed to add product to wishlist: ${error.message}`);
        }
      },
      async removeProductFromWishlist(userId, productId) {
        try {
          const wishlist = await this.findUserWishlist(userId);
          if (!wishlist) {
            throw new Error("Wishlist not found");
          }
          if (!wishlist.products) {
            wishlist.products = [];
          }
          const updatedProducts = wishlist.products.filter((product) => {
            const productIdValue = typeof product === "object" && product !== null ? product.id : product;
            return productIdValue !== parseInt(productId);
          }).map((product) => {
            return typeof product === "object" && product !== null ? product.id : product;
          });
          await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: { set: updatedProducts.map((id) => ({ id })) }
            }
          });
          return await this.findUserWishlist(userId);
        } catch (error) {
          throw new Error(`Failed to remove product from wishlist: ${error.message}`);
        }
      },
      async clearWishlist(userId) {
        try {
          const wishlist = await this.findUserWishlist(userId);
          if (!wishlist) {
            throw new Error("Wishlist not found");
          }
          await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: { set: [] }
            }
          });
          return await this.findUserWishlist(userId);
        } catch (error) {
          throw new Error(`Failed to clear wishlist: ${error.message}`);
        }
      },
      async updateWishlist(userId, data) {
        try {
          const wishlist = await this.findUserWishlist(userId);
          if (!wishlist) {
            throw new Error("Wishlist not found");
          }
          await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              name: data.name !== void 0 ? data.name : wishlist.name,
              description: data.description !== void 0 ? data.description : wishlist.description,
              isPublic: data.isPublic !== void 0 ? data.isPublic : wishlist.isPublic
            }
          });
          return await this.findUserWishlist(userId);
        } catch (error) {
          throw new Error(`Failed to update wishlist: ${error.message}`);
        }
      },
      async getWishlistStats(userId) {
        try {
          const wishlist = await this.findUserWishlist(userId);
          if (!wishlist) {
            return {
              totalProducts: 0,
              totalValue: 0,
              categories: []
            };
          }
          if (!wishlist.products) {
            wishlist.products = [];
          }
          const totalProducts = wishlist.products.length;
          const totalValue = wishlist.products.reduce((sum, product) => {
            return sum + (product.price || 0);
          }, 0);
          const categoryCounts = {};
          wishlist.products.forEach((product) => {
            const categoryName = product.product_categories?.[0]?.name || "Uncategorized";
            categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
          });
          const categories = Object.entries(categoryCounts).map(([name, count]) => ({
            name,
            count
          }));
          return {
            totalProducts,
            totalValue,
            categories
          };
        } catch (error) {
          throw new Error(`Failed to get wishlist stats: ${error.message}`);
        }
      }
    }));
  }
});

// server/src/services/shipping.js
var require_shipping2 = __commonJS({
  "server/src/services/shipping.js"(exports2, module2) {
    "use strict";
    var { createCoreService } = require("@strapi/strapi").factories;
    module2.exports = createCoreService("plugin::webbycommerce.shipping", ({ strapi: strapi2 }) => ({
      /**
       * Parse comma/newline separated text into array tokens.
       * Also supports legacy arrays (backwards compatible).
       */
      parseTextList(value) {
        if (!value) return [];
        if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
        if (typeof value !== "string") return [];
        return value.split(/[\n,;]+/g).map((t) => t.trim()).filter(Boolean);
      },
      /**
       * Parse postal codes text into patterns/ranges.
       * Accepts:
       * - string: lines/tokens like "123*" or "1000-2000"
       * - legacy array: ["123*", {min:1000,max:2000}]
       */
      parsePostalCodes(value) {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value !== "string") return [];
        return value.split(/[\n,;]+/g).map((t) => t.trim()).filter(Boolean).map((token) => {
          const m = token.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
          if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
          return token;
        });
      },
      /**
       * Calculate shipping costs for cart items and address
       */
      async calculateShipping(cartItems, shippingAddress) {
        try {
          const zones = await strapi2.db.query("plugin::webbycommerce.shipping-zone").findMany({
            where: { is_active: true },
            orderBy: { sort_order: "asc" },
            populate: ["shippingMethods", "location"]
          });
          const matchingZones = zones.filter((zone) => this.addressMatchesZone(shippingAddress, zone));
          if (matchingZones.length === 0) {
            return { methods: [], message: "No shipping methods available for this address." };
          }
          let availableMethods = [];
          for (const zone of matchingZones) {
            const methods = await strapi2.db.query("plugin::webbycommerce.shipping-method").findMany({
              where: {
                shippingZone: zone.id,
                is_active: true
              },
              orderBy: { sort_order: "asc" },
              populate: ["shippingRates", "shippingZone"]
            });
            availableMethods = availableMethods.concat(methods);
          }
          const uniqueMethods = availableMethods.filter(
            (method, index, self) => index === self.findIndex((m) => String(m.id) === String(method.id))
          );
          const methodsWithCosts = [];
          for (const method of uniqueMethods) {
            try {
              const cost = await this.calculateShippingCost(cartItems, shippingAddress, method);
              let finalCost = cost;
              if (method.is_free_shipping && method.free_shipping_threshold) {
                const cartTotal = cartItems.reduce(
                  (total, item) => total + parseFloat(item.price) * item.quantity,
                  0
                );
                if (cartTotal >= parseFloat(method.free_shipping_threshold)) {
                  finalCost = 0;
                }
              }
              methodsWithCosts.push({
                id: method.id,
                name: method.name,
                description: method.description,
                carrier: method.carrier,
                service_type: method.service_type,
                transit_time: method.transit_time,
                cost: finalCost,
                calculated_cost: finalCost,
                currency: method.shippingRates?.[0]?.currency || "USD",
                zone: {
                  id: method.shippingZone.id,
                  name: method.shippingZone.name
                }
              });
            } catch (error) {
              strapi2.log.error(`Error calculating cost for method ${method.id}:`, error);
            }
          }
          const finalMethods = await this.applyShippingRules(methodsWithCosts, cartItems, shippingAddress);
          const uniqueFinalMethods = finalMethods.filter(
            (method, index, self) => index === self.findIndex((m) => String(m.id) === String(method.id))
          );
          return {
            methods: uniqueFinalMethods,
            address: shippingAddress
          };
        } catch (error) {
          throw new Error(`Failed to calculate shipping: ${error.message}`);
        }
      },
      /**
       * Check if an address matches a shipping zone
       */
      addressMatchesZone(address, zone) {
        const location = zone.location || {};
        const zoneCountries = this.parseTextList(location.countries);
        const zoneStates = this.parseTextList(location.states);
        const zonePostalCodes = this.parsePostalCodes(location.postal_codes);
        if (zoneCountries.length > 0) {
          if (!zoneCountries.includes(address.country)) {
            return false;
          }
        }
        if (zoneStates.length > 0) {
          if (!zoneStates.includes(address.region)) {
            return false;
          }
        }
        if (zonePostalCodes.length > 0) {
          const postcode = address.postcode;
          let matches = false;
          for (const pattern of zonePostalCodes) {
            if (typeof pattern === "string") {
              const regex = new RegExp(pattern.replace(/\*/g, ".*"));
              if (regex.test(postcode)) {
                matches = true;
                break;
              }
            } else if (typeof pattern === "object" && pattern.min && pattern.max) {
              const numPostcode = parseInt(postcode, 10);
              if (!isNaN(numPostcode) && numPostcode >= pattern.min && numPostcode <= pattern.max) {
                matches = true;
                break;
              }
            }
          }
          if (!matches) {
            return false;
          }
        }
        return true;
      },
      /**
       * Calculate shipping cost based on cart items and method
       */
      async calculateShippingCost(cartItems, shippingAddress, method) {
        let totalCost = parseFloat(method.handling_fee || 0);
        const rates = await strapi2.db.query("plugin::webbycommerce.shipping-rate").findMany({
          where: {
            shippingMethod: method.id,
            is_active: true
          },
          orderBy: { sort_order: "asc", min_value: "asc" }
        });
        for (const rate of rates) {
          let conditionValue = 0;
          switch (rate.condition_type) {
            case "weight":
              for (const item of cartItems) {
                const weight = parseFloat(item.product?.weight || 0);
                conditionValue += weight * item.quantity;
              }
              break;
            case "price":
              for (const item of cartItems) {
                conditionValue += parseFloat(item.price) * item.quantity;
              }
              break;
            case "quantity":
              for (const item of cartItems) {
                conditionValue += item.quantity;
              }
              break;
            default:
              continue;
          }
          const minValue = parseFloat(rate.min_value);
          const maxValue = rate.max_value ? parseFloat(rate.max_value) : null;
          if (conditionValue >= minValue && (maxValue === null || conditionValue <= maxValue)) {
            totalCost += parseFloat(rate.rate);
            break;
          }
        }
        return totalCost;
      },
      /**
       * Normalize `applies_to_methods` which can be:
       * - null/undefined (meaning: all methods)
       * - legacy JSON array of IDs
       * - populated relation array of entities ({ id, ... })
       */
      getAppliesToMethodIds(appliesToMethods) {
        if (!Array.isArray(appliesToMethods)) return [];
        return appliesToMethods.map((m) => m && typeof m === "object" ? m.id : m).filter((id) => id !== null && id !== void 0).map((id) => String(id));
      },
      /**
       * Apply shipping rules to available methods
       */
      async applyShippingRules(methods, cartItems, shippingAddress) {
        const rules = await strapi2.db.query("plugin::webbycommerce.shipping-rule").findMany({
          where: { is_active: true },
          orderBy: { priority: "desc" },
          // Higher priority first
          populate: { applies_to_methods: true }
        });
        const filteredMethods = [];
        for (const method of methods) {
          let isEligible = true;
          let modifiedCost = method.calculated_cost || 0;
          let messages = [];
          const methodId = String(method.id);
          const applicableRules = rules.filter((rule) => {
            const ids = this.getAppliesToMethodIds(rule.applies_to_methods);
            return ids.length === 0 || ids.includes(methodId);
          });
          for (const rule of applicableRules) {
            let conditionMet = false;
            let conditionValue = null;
            switch (rule.condition_type) {
              case "product_category":
                for (const item of cartItems) {
                  const categories = item.product?.categories || [];
                  const categoryIds = categories.map((cat) => cat.id);
                  conditionMet = this.evaluateCondition(categoryIds, rule.condition_operator, rule.condition_value);
                  if (conditionMet) break;
                }
                break;
              case "product_tag":
                for (const item of cartItems) {
                  const tags = item.product?.tags || [];
                  const tagIds = tags.map((tag) => tag.id);
                  conditionMet = this.evaluateCondition(tagIds, rule.condition_operator, rule.condition_value);
                  if (conditionMet) break;
                }
                break;
              case "order_total":
                conditionValue = cartItems.reduce(
                  (total, item) => total + parseFloat(item.price) * item.quantity,
                  0
                );
                conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
                break;
              case "cart_quantity":
                conditionValue = cartItems.reduce((total, item) => total + item.quantity, 0);
                conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
                break;
              case "shipping_address":
                conditionValue = shippingAddress[rule.condition_value];
                conditionMet = this.evaluateCondition(conditionValue, rule.condition_operator, rule.condition_value);
                break;
            }
            if (conditionMet) {
              switch (rule.action_type) {
                case "hide_method":
                  isEligible = false;
                  break;
                case "add_fee":
                  modifiedCost += parseFloat(rule.action_value || 0);
                  if (rule.action_message) messages.push(rule.action_message);
                  break;
                case "subtract_fee":
                  modifiedCost -= parseFloat(rule.action_value || 0);
                  if (rule.action_message) messages.push(rule.action_message);
                  break;
                case "set_rate":
                  modifiedCost = parseFloat(rule.action_value || 0);
                  if (rule.action_message) messages.push(rule.action_message);
                  break;
                case "multiply_rate":
                  modifiedCost *= parseFloat(rule.action_value || 1);
                  if (rule.action_message) messages.push(rule.action_message);
                  break;
              }
            }
          }
          if (isEligible) {
            filteredMethods.push({
              ...method,
              calculated_cost: Math.max(0, modifiedCost),
              // Ensure cost is not negative
              rule_messages: messages
            });
          }
        }
        return filteredMethods;
      },
      /**
       * Evaluate condition based on operator
       */
      evaluateCondition(value, operator, conditionValue) {
        switch (operator) {
          case "equals":
            return value === conditionValue;
          case "not_equals":
            return value !== conditionValue;
          case "greater_than":
            return parseFloat(value) > parseFloat(conditionValue);
          case "less_than":
            return parseFloat(value) < parseFloat(conditionValue);
          case "contains":
            if (Array.isArray(value)) {
              return value.includes(conditionValue);
            }
            return String(value).includes(String(conditionValue));
          case "not_contains":
            if (Array.isArray(value)) {
              return !value.includes(conditionValue);
            }
            return !String(value).includes(String(conditionValue));
          case "in":
            return Array.isArray(conditionValue) && conditionValue.includes(value);
          case "not_in":
            return !Array.isArray(conditionValue) || !conditionValue.includes(value);
          default:
            return false;
        }
      },
      /**
       * Validate shipping zone data
       */
      validateShippingZone(data) {
        const errors = [];
        if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
          errors.push("Zone name is required.");
        }
        if (data.location && typeof data.location !== "object") {
          errors.push("Location must be an object.");
        }
        return errors;
      },
      /**
       * Validate shipping method data
       */
      validateShippingMethod(data) {
        const errors = [];
        if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
          errors.push("Method name is required.");
        }
        if (!data.carrier || typeof data.carrier !== "string" || data.carrier.trim().length === 0) {
          errors.push("Carrier is required.");
        }
        if (!data.service_type || typeof data.service_type !== "string" || data.service_type.trim().length === 0) {
          errors.push("Service type is required.");
        }
        if (!data.shippingZone) {
          errors.push("Shipping zone is required.");
        }
        if (data.handling_fee !== void 0 && (isNaN(parseFloat(data.handling_fee)) || parseFloat(data.handling_fee) < 0)) {
          errors.push("Handling fee must be a valid positive number.");
        }
        return errors;
      },
      /**
       * Validate shipping rate data
       */
      validateShippingRate(data) {
        const errors = [];
        if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
          errors.push("Rate name is required.");
        }
        const validConditionTypes = ["weight", "price", "quantity", "volume", "dimension"];
        if (!data.condition_type || !validConditionTypes.includes(data.condition_type)) {
          errors.push("Valid condition type is required.");
        }
        if (data.min_value === void 0 || data.min_value === null) {
          errors.push("Minimum value is required.");
        }
        if (data.rate === void 0 || data.rate === null) {
          errors.push("Rate is required.");
        }
        if (!data.shippingMethod) {
          errors.push("Shipping method is required.");
        }
        return errors;
      },
      /**
       * Validate shipping rule data
       */
      validateShippingRule(data) {
        const errors = [];
        if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
          errors.push("Rule name is required.");
        }
        const validRuleTypes = ["restriction", "surcharge", "discount", "requirement"];
        if (!data.rule_type || !validRuleTypes.includes(data.rule_type)) {
          errors.push("Valid rule type is required.");
        }
        const validConditionTypes = ["product_category", "product_tag", "product_weight", "order_total", "customer_group", "shipping_address", "cart_quantity"];
        if (!data.condition_type || !validConditionTypes.includes(data.condition_type)) {
          errors.push("Valid condition type is required.");
        }
        const validOperators = ["equals", "not_equals", "greater_than", "less_than", "contains", "not_contains", "in", "not_in"];
        if (!data.condition_operator || !validOperators.includes(data.condition_operator)) {
          errors.push("Valid condition operator is required.");
        }
        const validActionTypes = ["hide_method", "add_fee", "subtract_fee", "set_rate", "multiply_rate"];
        if (!data.action_type || !validActionTypes.includes(data.action_type)) {
          errors.push("Valid action type is required.");
        }
        return errors;
      }
    }));
  }
});

// server/src/services/index.js
var require_services2 = __commonJS({
  "server/src/services/index.js"(exports2, module2) {
    "use strict";
    var service = require_service();
    var compare = require_compare3();
    var cart = require_cart3();
    var wishlist = require_wishlist3();
    var shipping = require_shipping2();
    module2.exports = {
      service,
      compare,
      cart,
      wishlist,
      shipping
    };
  }
});

// server/src/middlewares/index.js
var require_middlewares = __commonJS({
  "server/src/middlewares/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// server/src/policies/index.js
var require_policies = __commonJS({
  "server/src/policies/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// server/src/index.js
var register = require_register();
var bootstrap = require_bootstrap();
var destroy = require_destroy();
var config = require_config();
var controllers = require_controllers();
var routes = require_routes();
var services = require_services2();
var middlewares = require_middlewares();
var policies = require_policies();
var contentTypes = require_content_types();
module.exports = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  contentTypes,
  policies,
  middlewares,
  routes,
  services
};
