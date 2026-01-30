"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

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
    var fs = require("fs");
    var path = require("path");
    module2.exports = async ({ strapi: strapi2 }) => {
      strapi2.log.info("[webbycommerce] ========================================");
      strapi2.log.info("[webbycommerce] Registering plugin...");
      try {
        const schemaPath = path.join(__dirname, "components", "shared", "shipping-zone-location.json");
        const componentSchema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
        const uid = "plugin::webbycommerce.shared.shipping-zone-location";
        const registered = strapi2.get("components").get(uid);
        if (!registered) {
          strapi2.get("components").set(uid, {
            ...componentSchema,
            __schema__: JSON.parse(JSON.stringify(componentSchema)),
            uid,
            category: "shared",
            modelType: "component",
            modelName: "shipping-zone-location",
            globalId: componentSchema.globalId || "ComponentPluginStrapiAdvancedEcommerceSharedShippingZoneLocation"
          });
          strapi2.log.info(`[webbycommerce] Registered component: ${uid}`);
        }
      } catch (error) {
        strapi2.log.error("[webbycommerce] Failed to register plugin component shipping-zone-location:", error.message);
        strapi2.log.error("[webbycommerce] Error stack:", error.stack);
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
      pluginOptions: {},
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
      pluginOptions: {},
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
          component: "plugin::webbycommerce.shared.shipping-zone-location",
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
    module2.exports = async ({ strapi: strapi2 }) => {
      try {
        strapi2.log.info("[webbycommerce] ========================================");
        strapi2.log.info("[webbycommerce] Bootstrapping plugin...");
        if (process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === "true") {
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
        }
        const contentTypes2 = require_content_types();
        strapi2.log.info("[webbycommerce] Content types loaded:", Object.keys(contentTypes2));
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
        strapi2.server.use(async (ctx, next) => {
          const routePrefix = await getRoutePrefix();
          if (routePrefix !== "webbycommerce") {
            const customBasePath = `/api/${routePrefix}`;
            const defaultBasePath = `/api/webbycommerce`;
            if (ctx.path.startsWith(customBasePath)) {
              ctx.state.originalPath = ctx.path;
              const remainingPath = ctx.path.replace(customBasePath, "");
              ctx.path = `${defaultBasePath}${remainingPath}`;
            }
          }
          return next();
        });
        strapi2.server.use(async (ctx, next) => {
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
          if (ctx.method === "POST" && (ctx.path === "/api/auth/local" || ctx.path === "/api/auth/local/register")) {
            try {
              const hasPermission = await ensureEcommercePermission(ctx);
              if (!hasPermission) {
                return;
              }
              const store = strapi2.store({ type: "plugin", name: "webbycommerce" });
              const value = await store.get({ key: "settings" }) || {};
              const method = value.loginRegisterMethod || "default";
              if (method === "otp") {
                ctx.badRequest(
                  "Authentication method is set to OTP. Please use the OTP login/register endpoints."
                );
                return;
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for address route:`, error.message);
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
            const reserved = /* @__PURE__ */ new Set(["attributes", "categories", "tags", "slug"]);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for product route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for cart route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for product-variant route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for product-attribute route:`, error.message);
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
              const entity = await strapi2.entityService.findOne("plugin::webbycommerce.product-attribute", productAttributeId, {
                populate: ["product_attribute_values"]
              });
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for product-attribute-value route:`, error.message);
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
              const entity = await strapi2.entityService.findOne("plugin::webbycommerce.product-attribute-value", productAttributeValueId, {
                populate: ["product_attribute"]
              });
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for wishlist route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for move-to-cart route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for compare route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for product-category route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for tag route:`, error.message);
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
                    strapi2.log.error(`[webbycommerce] JWT verification failed for payment route:`, error.message);
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
                  strapi2.log.error(`[webbycommerce] JWT verification failed for order route:`, error.message);
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
            const isAdminRoute = action && [
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
            if (isAdminRoute) {
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
                    strapi2.log.error(`[webbycommerce] JWT verification failed for shipping admin route:`, error.message);
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
                    strapi2.log.error(`[webbycommerce] JWT verification failed for shipping route:`, error.message);
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
            nodemailer = require("nodemailer");
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
            await strapi.db.query("plugin::users-permissions.user").update({
              where: { id: user.id },
              data: { otp, isOtpVerified: false }
            });
          } catch (err) {
            strapi.log.warn(
              `[${PLUGIN_ID}] OTP fields not found in user schema. Please extend the user schema to include 'otp' and 'isOtpVerified' fields.`
            );
            throw new Error(
              "OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README."
            );
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
                subject: "Your OTP Code - Strapi Advanced Ecommerce",
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
          if (user.isOtpVerified === void 0 || user.otp === void 0) {
            return ctx.badRequest(
              "OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README."
            );
          }
          if (user.isOtpVerified) return ctx.badRequest("User already verified.");
          if (user.otp !== parseInt(otp, 10)) return ctx.badRequest("Invalid OTP.");
          await strapi.db.query("plugin::users-permissions.user").update({
            where: { id: user.id },
            data: {
              isOtpVerified: true,
              confirmed: true,
              otp: null
            }
          });
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
              totalProducts: compare.products.length,
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
              totalProducts: compare.products.length,
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
              totalProducts: compare.products.length,
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
          if (compare) {
            productIdArray.forEach((productId) => {
              inCompare[productId] = compare.products.some((product) => product.id === productId);
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
            notes
          } = ctx.request.body;
          if (!billing_address || !shipping_address || !payment_method) {
            return ctx.badRequest("Billing address, shipping address, and payment method are required");
          }
          const normalizedPaymentMethod = payment_method;
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
          const taxAmount = 0;
          const shippingAmount = 0;
          const discountAmount = 0;
          const total = subtotal + taxAmount + shippingAmount - discountAmount;
          const orderNumber = await this.generateOrderNumber();
          const order = await strapi.db.query("plugin::webbycommerce.order").create({
            data: {
              order_number: orderNumber,
              status: "pending",
              user: user.id,
              items: cartItems.map((item) => item.product.id),
              subtotal: subtotal.toFixed(2),
              tax_amount: taxAmount.toFixed(2),
              shipping_amount: shippingAmount.toFixed(2),
              discount_amount: discountAmount.toFixed(2),
              total: total.toFixed(2),
              currency: "USD",
              billing_address,
              shipping_address,
              payment_method: normalizedPaymentMethod,
              payment_status: "pending",
              shipping_method: shipping_method || null,
              notes: notes || null
            }
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
              total: parseFloat(order.total),
              currency: order.currency,
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
            populate: ["items"],
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
          const formattedOrders = orders.map((order) => ({
            id: order.id,
            order_number: order.order_number,
            status: order.status,
            payment_method: order.payment_method,
            payment_status: order.payment_status,
            total: parseFloat(order.total),
            currency: order.currency,
            items_count: order.items.length,
            created_at: order.createdAt,
            estimated_delivery: order.estimated_delivery
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
            return ctx.badRequest("Order ID is required");
          }
          const order = await strapi.db.query("plugin::webbycommerce.order").findOne({
            where: { id },
            populate: ["billing_address", "shipping_address", "items"]
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          if (order.user !== user.id) {
            return ctx.forbidden("You can only view your own orders");
          }
          ctx.send({
            data: {
              id: order.id,
              order_number: order.order_number,
              status: order.status,
              payment_status: order.payment_status,
              items: order.items,
              subtotal: parseFloat(order.subtotal),
              tax_amount: parseFloat(order.tax_amount),
              shipping_amount: parseFloat(order.shipping_amount),
              discount_amount: parseFloat(order.discount_amount),
              total: parseFloat(order.total),
              currency: order.currency,
              billing_address: order.billing_address,
              shipping_address: order.shipping_address,
              payment_method: order.payment_method,
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
      // Cancel order (only if pending)
      async cancelOrder(ctx) {
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
            where: { id }
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          if (order.user !== user.id) {
            return ctx.forbidden("You can only cancel your own orders");
          }
          if (order.status !== "pending") {
            return ctx.badRequest("Only pending orders can be cancelled");
          }
          const updatedOrder = await strapi.db.query("plugin::webbycommerce.order").update({
            where: { id },
            data: { status: "cancelled" }
          });
          for (const item of order.items) {
            const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
              where: { id: item.product_id }
            });
            if (product) {
              const newStockQuantity = product.stock_quantity + item.quantity;
              const newStockStatus = newStockQuantity > 0 ? "in_stock" : "out_of_stock";
              await strapi.db.query("plugin::webbycommerce.product").update({
                where: { id: item.product_id },
                data: {
                  stock_quantity: newStockQuantity,
                  stock_status: newStockStatus
                }
              });
            }
          }
          ctx.send({
            data: {
              id: updatedOrder.id,
              order_number: updatedOrder.order_number,
              status: updatedOrder.status
            },
            message: "Order cancelled successfully"
          });
        } catch (error) {
          strapi.log.error("Cancel order error:", error);
          ctx.badRequest("Failed to cancel order");
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
            where: { id },
            populate: ["shipping_address"]
          });
          if (!order) {
            return ctx.notFound("Order not found");
          }
          if (order.user !== user.id) {
            return ctx.forbidden("You can only view your own order tracking");
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
        const settings = await strapi.store({ type: "plugin", name: "webbycommerce" }).get({ key: "settings" });
        const smtpSettings = settings?.smtp;
        if (!smtpSettings) {
          strapi.log.warn("SMTP settings not configured, skipping order confirmation email");
          return;
        }
        const emailData = {
          to: user.email,
          subject: `Order Confirmation - ${order.order_number}`,
          html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${user.username || "Customer"},</p>
        <p>Thank you for your order! Here are the details:</p>
        <h3>Order #${order.order_number}</h3>
        <p><strong>Total: $${order.total} ${order.currency}</strong></p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items.map((item) => `<li>${item.product_name} (x${item.quantity}) - $${item.total_price}</li>`).join("")}
        </ul>
        <p>We will process your order shortly.</p>
        <p>Best regards,<br>Your Ecommerce Team</p>
      `
        };
        await sendEmail(emailData);
      },
      // Send order status update email
      async sendOrderStatusUpdateEmail(user, order, newStatus) {
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
          subject: `Order Status Update - ${order.order_number}`,
          html: `
        <h2>Order Status Update</h2>
        <p>Dear ${user.username || "Customer"},</p>
        <p>Your order status has been updated:</p>
        <h3>Order #${order.order_number}</h3>
        <p><strong>Status: ${newStatus.toUpperCase()}</strong></p>
        <p><strong>Message:</strong> ${statusMessages[newStatus] || "Status updated"}</p>
        ${order.tracking_number ? `<p><strong>Tracking Number:</strong> ${order.tracking_number}</p>` : ""}
        ${order.estimated_delivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(order.estimated_delivery).toLocaleDateString()}</p>` : ""}
        <p>You can track your order at any time using our order tracking feature.</p>
        <p>Best regards,<br>Your Ecommerce Team</p>
      `
        };
        await sendEmail(emailData);
      },
      // Restore stock when order is cancelled
      async restoreOrderStock(order) {
        try {
          for (const item of order.items) {
            const product = await strapi.db.query("plugin::webbycommerce.product").findOne({
              where: { id: item.product_id }
            });
            if (product) {
              const newStockQuantity = product.stock_quantity + item.quantity;
              const newStockStatus = newStockQuantity > 0 ? "in_stock" : "out_of_stock";
              await strapi.db.query("plugin::webbycommerce.product").update({
                where: { id: item.product_id },
                data: {
                  stock_quantity: newStockQuantity,
                  stock_status: newStockStatus
                }
              });
            }
          }
        } catch (error) {
          strapi.log.error("Failed to restore order stock:", error);
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
          const { product_category, tag, search, limit = 10, start = 0 } = ctx.query;
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
            orderBy: { createdAt: "desc" },
            populate: {
              product_categories: true,
              tags: true,
              images: true,
              variations: {
                populate: ["attributes", "attributeValues"]
              }
            }
          });
          const total = await strapi.db.query("plugin::webbycommerce.product").count({ where });
          ctx.send({ data: products, meta: { total, limit: parseInt(limit, 10), start: parseInt(start, 10) } });
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
          const buildConnect = (arr) => {
            if (!arr) return void 0;
            if (Array.isArray(arr) && arr.length > 0) {
              if (typeof arr[0] === "object") return arr;
              return arr.map((id) => ({ id }));
            }
            return void 0;
          };
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
          const productCategoriesConnect = buildConnect(product_categories);
          if (productCategoriesConnect) data.product_categories = { connect: productCategoriesConnect };
          const tagsConnect = buildConnect(tags);
          if (tagsConnect) data.tags = { connect: tagsConnect };
          const imagesConnect = buildConnect(images);
          if (imagesConnect) data.images = { connect: imagesConnect };
          const product = await strapi.db.query("plugin::webbycommerce.product").create({ data });
          const populated = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id: product.id },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populated || product });
        } catch (error) {
          strapi.log.error(`[${PLUGIN_ID}] Error in createProduct:`, error);
          ctx.internalServerError("Failed to create product. Please try again.");
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
          const product = await strapi.db.query("plugin::webbycommerce.product").create({ data });
          const populated = await strapi.db.query("plugin::webbycommerce.product").findOne({
            where: { id: product.id },
            populate: ["product_categories", "tags", "images", "variations"]
          });
          ctx.send({ data: populated || product });
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
          const { id } = ctx.params;
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
            where: { id },
            populate: ["products"]
          });
          if (!tag) {
            return ctx.notFound("Tag not found.");
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
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").create({
            data: {
              name,
              slug: slug || void 0
            }
          });
          ctx.send({ data: tag });
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
          const { id } = ctx.params;
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
            where: { id, publishedAt: { $notNull: true } },
            populate: ["products"]
          });
          if (!tag) {
            return ctx.notFound("Tag not found.");
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
          const tag = await strapi.db.query("plugin::webbycommerce.product-tag").create({ data });
          const populated = await strapi.db.query("plugin::webbycommerce.product-tag").findOne({
            where: { id: tag.id },
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
          const { id } = ctx.params;
          const { publicationState, status, preview } = ctx.query;
          const includeDrafts = preview === "true" || publicationState === "preview" || status === "preview" || status === "draft";
          const productCategory = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
            where: includeDrafts ? { id } : { id, publishedAt: { $notNull: true } },
            populate: includeDrafts ? ["products", "image"] : {
              products: {
                where: { publishedAt: { $notNull: true } }
              },
              image: true
            }
          });
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
          const productCategory = await strapi.db.query("plugin::webbycommerce.product-category").create({
            data: {
              name,
              slug: slug || void 0,
              description: description || void 0,
              image: image || void 0
            }
          });
          ctx.send({ data: productCategory });
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
          const { id } = ctx.params;
          const category = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
            where: { id, publishedAt: { $notNull: true } },
            populate: ["products", "image"]
          });
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
          const category = await strapi.db.query("plugin::webbycommerce.product-category").create({ data });
          const populated = await strapi.db.query("plugin::webbycommerce.product-category").findOne({
            where: { id: category.id },
            populate: ["products", "image"]
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
          const { id } = ctx.params;
          const variation = await strapi.db.query("plugin::webbycommerce.product-variation").findOne({
            where: { id },
            populate: ["product", "attributes", "attributeValues"]
          });
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
          const totals = await cartService.getTotalsFromItems(items);
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
          const totals = await cartService.getTotalsFromItems(items);
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
          const totals = await cartService.getTotalsFromItems(items);
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
          const totals = await cartService.getTotalsFromItems(items);
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
          const totals = await cartService.getTotalsFromItems(items);
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
        ctx.badRequest("Coupon support is not implemented yet");
      },
      async removeCoupon(ctx) {
        ctx.badRequest("Coupon support is not implemented yet");
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
        const demoDataPath = path.join(__dirname, "../data/demo-data.json");
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
          const compare = await strapi2.entityService.findMany("plugin::webbycommerce.compare", {
            filters: {
              userId
            },
            populate: {
              products: {
                populate: {
                  images: true,
                  product_categories: true,
                  tags: true,
                  variations: true
                }
              },
              category: true
            },
            sort: { createdAt: "desc" }
          });
          return compare.length > 0 ? compare[0] : null;
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
          const compare = await strapi2.entityService.create("plugin::webbycommerce.compare", {
            data: compareData
          });
          return compare;
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
          const productExists = compare.products.some((product2) => product2.id === parseInt(productId));
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
          const updatedCompare = await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: [...compare.products.map((p) => p.id), parseInt(productId, 10)].map((id) => ({ id })) },
              category: compare.category || product.product_categories?.[0]?.id || null
            }
          });
          return updatedCompare;
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
          const updatedProducts = compare.products.filter((product) => product.id !== parseInt(productId)).map((product) => product.id);
          const updatedCompare = await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: updatedProducts.map((id) => ({ id })) },
              // Reset category if no products left
              category: updatedProducts.length === 0 ? null : compare.category
            }
          });
          return updatedCompare;
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
          const updatedCompare = await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              products: { set: [] },
              category: null
            }
          });
          return updatedCompare;
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
          const updatedCompare = await strapi2.entityService.update("plugin::webbycommerce.compare", compare.id, {
            data: {
              name: data.name !== void 0 ? data.name : compare.name,
              notes: data.notes !== void 0 ? data.notes : compare.notes,
              isPublic: data.isPublic !== void 0 ? data.isPublic : compare.isPublic
            }
          });
          return updatedCompare;
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
        if (userId) {
          const existing = await strapi2.db.query(CART_UID).findOne({
            where: { user: userId },
            select: ["id", "guest_id", "currency"]
          });
          if (existing?.id) return existing;
          return await strapi2.db.query(CART_UID).create({
            data: {
              user: userId,
              currency: "USD"
            },
            select: ["id", "guest_id", "currency"]
          });
        }
        if (guestId) {
          const existing = await strapi2.db.query(CART_UID).findOne({
            where: { guest_id: String(guestId) },
            select: ["id", "guest_id", "currency"]
          });
          if (existing?.id) return existing;
          return await strapi2.db.query(CART_UID).create({
            data: {
              guest_id: String(guestId),
              currency: "USD"
            },
            select: ["id", "guest_id", "currency"]
          });
        }
        const created = await strapi2.db.query(CART_UID).create({
          data: {
            currency: "USD"
          },
          select: ["id", "guest_id", "currency"]
        });
        return created;
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
      async getTotalsFromItems(items) {
        const safe = Array.isArray(items) ? items : [];
        const totalItems = safe.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
        const subtotal = safe.reduce((sum, it) => sum + (Number(it.total_price) || 0), 0);
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
          const wishlist = await strapi2.entityService.findMany("plugin::webbycommerce.wishlist", {
            filters: {
              // userId is stored as a string in this content-type; normalize to string for reliable matching
              userId: String(userId)
            },
            populate: {
              products: {
                populate: {
                  images: true,
                  product_categories: true,
                  tags: true,
                  variations: true
                }
              }
            },
            sort: { createdAt: "desc" }
          });
          return wishlist.length > 0 ? wishlist[0] : null;
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
          const wishlist = await strapi2.entityService.create("plugin::webbycommerce.wishlist", {
            data: wishlistData
          });
          return wishlist;
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
          const productExists = wishlist.products.some((product2) => product2.id === parseInt(productId));
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
          const updatedWishlist = await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: [...wishlist.products.map((p) => p.id), productId]
            }
          });
          return updatedWishlist;
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
          const updatedProducts = wishlist.products.filter((product) => product.id !== parseInt(productId)).map((product) => product.id);
          const updatedWishlist = await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: updatedProducts
            }
          });
          return updatedWishlist;
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
          const updatedWishlist = await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              products: []
            }
          });
          return updatedWishlist;
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
          const updatedWishlist = await strapi2.entityService.update("plugin::webbycommerce.wishlist", wishlist.id, {
            data: {
              name: data.name !== void 0 ? data.name : wishlist.name,
              description: data.description !== void 0 ? data.description : wishlist.description,
              isPublic: data.isPublic !== void 0 ? data.isPublic : wishlist.isPublic
            }
          });
          return updatedWishlist;
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
var require_services = __commonJS({
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
var services = require_services();
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
