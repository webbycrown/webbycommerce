'use strict';

const { registerEcommerceActions, ensureEcommercePermission } = require('./utils/check-ecommerce-permission');

module.exports = async ({ strapi }) => {
  try {
    strapi.log.info('[webbycommerce] ========================================');
    strapi.log.info('[webbycommerce] Bootstrapping plugin...');

    // Check for auto-seeding via environment variable or first run
    // Only seed if explicitly requested and ensure the plugin is fully loaded
    if (process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === 'true') {
      try {
        // Wait a bit to ensure all content types are registered
        await new Promise(resolve => setTimeout(resolve, 1000));

        strapi.log.info('[webbycommerce] Auto-seeding demo data as requested by environment variable...');

        // Verify plugin is available before seeding
        const pluginService = strapi.plugin('webbycommerce')?.service('service');
        if (pluginService && typeof pluginService.seedDemoData === 'function') {
          await pluginService.seedDemoData();
        } else {
          strapi.log.warn('[webbycommerce] Plugin service not available for seeding');
        }
      } catch (seedError) {
        strapi.log.error('[webbycommerce] Auto-seeding failed:', seedError.message);
        strapi.log.error('[webbycommerce] Stack:', seedError.stack);
      }
    }

    // Ensure plugin content types are registered
    const contentTypes = require('./content-types');
    strapi.log.info('[webbycommerce] Content types loaded:', Object.keys(contentTypes));

    // Verify routes are accessible
    const routes = require('./routes');
    strapi.log.info('[webbycommerce] Routes structure verified');
    strapi.log.info('[webbycommerce] Full routes object:', JSON.stringify(routes, null, 2));
    strapi.log.info('[webbycommerce] Content-API routes count: ' + (routes['content-api']?.routes?.length || 0));
    strapi.log.info('[webbycommerce] Admin routes count: ' + (routes.admin?.routes?.length || 0));
    strapi.log.info('[webbycommerce] Has content-api: ' + !!routes['content-api']);
    strapi.log.info('[webbycommerce] Has admin: ' + !!routes.admin);

    // Helper function to get route prefix from settings
    const getRoutePrefix = async () => {
      try {
        const store = strapi.store({ type: 'plugin', name: 'webbycommerce' });
        const value = (await store.get({ key: 'settings' })) || {};
        return value.routePrefix || 'webbycommerce';
      } catch (error) {
        return 'webbycommerce';
      }
    };

    // Handle custom route prefix for all content-api endpoints
    // This middleware rewrites custom prefix paths to default prefix so Strapi's routing works
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      
      // Only rewrite if using custom prefix
      if (routePrefix !== 'webbycommerce') {
        const customBasePath = `/api/${routePrefix}`;
        const defaultBasePath = `/api/webbycommerce`;
        
        // Rewrite custom prefix paths to default paths for route matching
        if (ctx.path.startsWith(customBasePath)) {
          // Store original path before rewriting
          ctx.state.originalPath = ctx.path;
          const remainingPath = ctx.path.replace(customBasePath, '');
          ctx.path = `${defaultBasePath}${remainingPath}`;
        }
      }

      return next();
    });

 

    // Lightweight health endpoint mounted via Koa middleware.
    // This bypasses routing quirks and provides public access for health checks.
    // Supports both default and custom route prefixes.
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      const defaultPath = `/api/webbycommerce/health`;
      const customPath = `/api/${routePrefix}/health`;
      const legacyPath = `/${routePrefix}/health`;

      if (
        ctx.method === 'GET' &&
        (ctx.path === defaultPath ||
          ctx.path === customPath ||
          ctx.path === legacyPath ||
          ctx.path === '/webbycommerce/health' ||
          ctx.path === '/api/webbycommerce/health')
      ) {
        // Health check is public - no permission required
        ctx.set('Content-Type', 'application/json; charset=utf-8');
        ctx.body = {
          status: 'ok',
          plugin: 'webbycommerce',
          message: 'Ecommerce plugin is running',
        };
        return;
      }

      return next();
    });

    // Enforce login/register method and ecommerce permission for core Strapi auth endpoints.
    // - When method is "otp": block /api/auth/local and /api/auth/local/register
    // - When method is "default": allow them but check ecommerce permission
    strapi.server.use(async (ctx, next) => {
      if (
        ctx.method === 'POST' &&
        (ctx.path === '/api/auth/local' || ctx.path === '/api/auth/local/register')
      ) {
        try {
          // Check ecommerce permission first
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return; // ensureEcommercePermission already sent the response
          }

          const store = strapi.store({ type: 'plugin', name: 'webbycommerce' });
          const value = (await store.get({ key: 'settings' })) || {};
          const method = value.loginRegisterMethod || 'default';

          if (method === 'otp') {
            // When OTP mode is enabled, core email/password endpoints should not be used
            ctx.badRequest(
              'Authentication method is set to OTP. Please use the OTP login/register endpoints.'
            );
            return;
          }
        } catch (error) {
          // If settings cannot be read, fall back to Strapi default behavior
          strapi.log.error(
            '[webbycommerce] Failed to read loginRegisterMethod for auth guard:',
            error
          );
        }
      }

      return next();
    });

    // OTP auth routes (login/register and verify-otp) mounted via Koa middleware.
    // This ensures they work reliably with both default and custom route prefixes.
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      const originalPath = ctx.state.originalPath || ctx.path;

      const loginPaths = new Set([
        '/api/webbycommerce/auth/login-register',
        `/api/${routePrefix}/auth/login-register`,
        '/webbycommerce/auth/login-register',
        `/${routePrefix}/auth/login-register`,
      ]);

      const verifyPaths = new Set([
        '/api/webbycommerce/auth/verify-otp',
        `/api/${routePrefix}/auth/verify-otp`,
        '/webbycommerce/auth/verify-otp',
        `/${routePrefix}/auth/verify-otp`,
      ]);

      const profilePaths = new Set([
        '/api/webbycommerce/auth/profile',
        `/api/${routePrefix}/auth/profile`,
        '/webbycommerce/auth/profile',
        `/${routePrefix}/auth/profile`,
      ]);

      // POST /auth/login-register
      if (ctx.method === 'POST' && loginPaths.has(ctx.path)) {
        // Mark this as a content-api request for the plugin
        ctx.state.route = {
          info: {
            type: 'content-api',
            pluginName: 'webbycommerce',
          },
        };

        const authController = strapi
          .plugin('webbycommerce')
          .controller('auth');

        if (authController && typeof authController.loginOrRegister === 'function') {
          await authController.loginOrRegister(ctx);
          return;
        }
      }

      // POST /auth/verify-otp
      if (ctx.method === 'POST' && verifyPaths.has(ctx.path)) {
        ctx.state.route = {
          info: {
            type: 'content-api',
            pluginName: 'webbycommerce',
          },
        };

        const authController = strapi
          .plugin('webbycommerce')
          .controller('auth');

        if (authController && typeof authController.verifyOtp === 'function') {
          await authController.verifyOtp(ctx);
          return;
        }
      }

      // GET /auth/profile and PUT /auth/profile
      if ((ctx.method === 'GET' || ctx.method === 'PUT') && profilePaths.has(ctx.path)) {
        ctx.state.route = {
          info: {
            type: 'content-api',
            pluginName: 'webbycommerce',
          },
        };

        // Authenticate user via JWT token before calling controller
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              // Verify JWT token
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);
                
                if (decoded && decoded.id) {
                  // Fetch user from database
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });
                  
                  if (user) {
                    ctx.state.user = user;
                    strapi.log.debug(`[webbycommerce] User authenticated: ${user.id}`);
                  } else {
                    strapi.log.warn(`[webbycommerce] User not found for ID: ${decoded.id}`);
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed:`, error.message);
              // Continue to controller - it will handle the unauthorized response
            }
          }
        }

        const authController = strapi
          .plugin('webbycommerce')
          .controller('auth');

        if (ctx.method === 'GET' && authController && typeof authController.getProfile === 'function') {
          await authController.getProfile(ctx);
          return;
        }

        if (ctx.method === 'PUT' && authController && typeof authController.updateProfile === 'function') {
          await authController.updateProfile(ctx);
          return;
        }
      }

      // Handle address routes
      // Check both custom prefix and default prefix (after rewrite)
      const customAddressPath = `/api/${routePrefix}/addresses`;
      const defaultAddressPath = `/api/webbycommerce/addresses`;
      const isAddressRoute = 
        ctx.path === customAddressPath || 
        ctx.path.startsWith(`${customAddressPath}/`) ||
        ctx.path === defaultAddressPath ||
        ctx.path.startsWith(`${defaultAddressPath}/`) ||
        originalPath === customAddressPath ||
        originalPath.startsWith(`${customAddressPath}/`);

      if (isAddressRoute) {
        // Extract ID from path if present
        let addressId = null;
        const pathMatch = ctx.path.match(/\/addresses\/([^\/]+)/);
        if (pathMatch) {
          addressId = pathMatch[1];
          // Set ctx.params.id for controller access
          if (!ctx.params) {
            ctx.params = {};
          }
          ctx.params.id = addressId;
        }

        // Authenticate user for address routes
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);
                
                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });
                  
                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for address route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            // Read and parse JSON body manually since we're intercepting before body parser
            const contentType = ctx.request.header['content-type'] || '';
            
            if (contentType.includes('application/json')) {
              // Read raw body from request stream
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');
              
              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const addressController = strapi
          .plugin('webbycommerce')
          .controller('address');

        if (addressController) {
          if (method === 'get' && !addressId && typeof addressController.getAddresses === 'function') {
            await addressController.getAddresses(ctx);
            return;
          }

          if (method === 'get' && addressId && typeof addressController.getAddress === 'function') {
            await addressController.getAddress(ctx);
            return;
          }

          if (method === 'post' && typeof addressController.createAddress === 'function') {
            await addressController.createAddress(ctx);
            return;
          }

          if (method === 'put' && addressId && typeof addressController.updateAddress === 'function') {
            await addressController.updateAddress(ctx);
            return;
          }

          if (method === 'delete' && addressId && typeof addressController.deleteAddress === 'function') {
            await addressController.deleteAddress(ctx);
            return;
          }
        }
      }

      // Handle product routes
      // Check both custom prefix and default prefix (after rewrite)
      const customProductPath = `/api/${routePrefix}/products`;
      const defaultProductPath = `/api/webbycommerce/products`;
      const isProductRoute = 
        ctx.path === customProductPath || 
        ctx.path.startsWith(`${customProductPath}/`) ||
        ctx.path === defaultProductPath ||
        ctx.path.startsWith(`${defaultProductPath}/`) ||
        originalPath === customProductPath ||
        originalPath.startsWith(`${customProductPath}/`);

      if (isProductRoute) {
        // Parse product route segments safely so we can support:
        // - GET    /products
        // - GET    /products/:id
        // - GET    /products/:id/related
        // - GET    /products/slug/:slug
        // - GET    /products/categories
        // - GET    /products/tags
        // - GET    /products/attributes
        // - POST   /products
        // - PUT    /products/:id
        // - DELETE /products/:id
        const pathParts = (ctx.path || '').split('/').filter(Boolean);
        const productsIndex = pathParts.lastIndexOf('products');
        const next1 = productsIndex >= 0 ? pathParts[productsIndex + 1] : null;
        const next2 = productsIndex >= 0 ? pathParts[productsIndex + 2] : null;

        const reserved = new Set(['attributes', 'categories', 'tags', 'slug']);
        const productAction = next1 && reserved.has(next1) ? next1 : null;
        const productId = next1 && !productAction ? next1 : null;
        const isRelated = Boolean(productId && next2 === 'related');
        const slugValue = productAction === 'slug' ? next2 : null;
        const isNumericId = (value) => typeof value === 'string' && /^[0-9]+$/.test(value);

        // Set ctx.params for controller access
        if (!ctx.params) {
          ctx.params = {};
        }
        if (productId) {
          ctx.params.id = productId;
        }
        if (slugValue) {
          ctx.params.slug = slugValue;
        }

        // Authenticate user for product routes
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);
                
                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });
                  
                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for product route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            // Read and parse JSON body manually since we're intercepting before body parser
            const contentType = ctx.request.header['content-type'] || '';
            
            if (contentType.includes('application/json')) {
              // Read raw body from request stream
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');
              
              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const productController = strapi
          .plugin('webbycommerce')
          .controller('product');

        if (productController) {
          // Handle special product routes first (before generic :id routes)
          if (method === 'get' && productAction === 'attributes' && typeof productController.getAttributes === 'function') {
            await productController.getAttributes(ctx);
            return;
          }

          if (method === 'get' && productAction === 'categories' && typeof productController.getCategories === 'function') {
            await productController.getCategories(ctx);
            return;
          }

          if (method === 'get' && productAction === 'tags' && typeof productController.getTags === 'function') {
            await productController.getTags(ctx);
            return;
          }

          if (method === 'get' && productAction === 'slug' && slugValue && typeof productController.getProductBySlug === 'function') {
            await productController.getProductBySlug(ctx);
            return;
          }

          if (method === 'get' && isRelated && typeof productController.getRelatedProducts === 'function') {
            await productController.getRelatedProducts(ctx);
            return;
          }

          if (method === 'get' && !productId && !productAction && typeof productController.getProducts === 'function') {
            await productController.getProducts(ctx);
            return;
          }

          // GET /products/:slug (slug OR numeric id)
          if (method === 'get' && productId && !isRelated) {
            if (isNumericId(productId) && typeof productController.getProduct === 'function') {
              await productController.getProduct(ctx);
              return;
            }

            if (typeof productId === 'string' && productId && typeof productController.getProductBySlug === 'function') {
              ctx.params.slug = productId;
              await productController.getProductBySlug(ctx);
              return;
            }
          }

          if (method === 'post' && !productId && !productAction && typeof productController.createProduct === 'function') {
            await productController.createProduct(ctx);
            return;
          }

          if (method === 'put' && productId && typeof productController.updateProduct === 'function') {
            await productController.updateProduct(ctx);
            return;
          }

          if (method === 'delete' && productId && typeof productController.deleteProduct === 'function') {
            await productController.deleteProduct(ctx);
            return;
          }
        }
      }

      // Handle cart routes
      // Check both custom prefix and default prefix (after rewrite)
      const customCartPath = `/api/${routePrefix}/cart`;
      const defaultCartPath = `/api/webbycommerce/cart`;
      const isCartRoute =
        ctx.path === customCartPath ||
        ctx.path.startsWith(`${customCartPath}/`) ||
        ctx.path === defaultCartPath ||
        ctx.path.startsWith(`${defaultCartPath}/`) ||
        originalPath === customCartPath ||
        originalPath.startsWith(`${customCartPath}/`);

      // Debug logging for all cart-related requests
      if (ctx.path.includes('/cart/')) {
        strapi.log.debug(`[webbycommerce] Cart route detected:`, {
          path: ctx.path,
          originalPath,
          method: ctx.method,
          routePrefix
        });
      }

      // Exclude special cart routes that should be handled by normal Strapi routing
      // Note: apply-coupon and coupon routes are now handled by custom middleware for proper authentication
      const isSpecialCartRoute = false; // Temporarily disable special route exclusion

      if (ctx.path.includes('/cart/')) {
        strapi.log.debug(`[webbycommerce] Cart route analysis:`, {
          isCartRoute,
          isSpecialCartRoute,
          willIntercept: isCartRoute && !isSpecialCartRoute
        });
      }

      if (isCartRoute && !isSpecialCartRoute) {
        // Determine cart sub-route/action and cart item id safely
        // Supported:
        //   GET    /cart                -> get cart
        //   POST   /cart                -> add item
        //   PUT    /cart/:id            -> update item qty
        //   DELETE /cart/:id            -> remove item
        //   DELETE /cart                -> clear cart
        //   GET    /cart/totals         -> totals
        //   POST   /cart/create         -> create/get cart
        //   POST   /cart/checkout       -> mark ordered
        //   POST   /cart/apply-coupon   -> apply coupon (legacy)
        //   DELETE /cart/coupon         -> remove coupon (legacy)
        const pathParts = (ctx.path || '').split('/').filter(Boolean);
        const cartIndex = pathParts.lastIndexOf('cart');
        const cartNext = cartIndex >= 0 ? pathParts[cartIndex + 1] : null;

        const reserved = new Set(['apply-coupon', 'coupon', 'totals', 'create', 'checkout']);
        const isNumericId = (value) => typeof value === 'string' && /^[0-9]+$/.test(value);

        const cartAction = cartNext && reserved.has(cartNext) ? cartNext : null;
        const cartItemId = cartNext && !cartAction && isNumericId(cartNext) ? cartNext : null;

        // Set ctx.params.id for controllers expecting :id
        if (cartItemId) {
          if (!ctx.params) {
            ctx.params = {};
          }
          ctx.params.id = cartItemId;
        }

        // Authenticate user for cart routes
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for cart route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            // Read and parse JSON body manually since we're intercepting before body parser
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              // Read raw body from request stream
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for cart:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for cart:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const cartController = strapi
          .plugin('webbycommerce')
          .controller('cart');

        if (cartController) {
          // Special cart routes first
          if (method === 'get' && cartAction === 'totals' && typeof cartController.getTotals === 'function') {
            await cartController.getTotals(ctx);
            return;
          }

          if (method === 'post' && cartAction === 'create' && typeof cartController.createCart === 'function') {
            await cartController.createCart(ctx);
            return;
          }

          if (method === 'post' && cartAction === 'checkout' && typeof cartController.checkout === 'function') {
            await cartController.checkout(ctx);
            return;
          }

          // Legacy coupon endpoints (kept for compatibility)
          if (method === 'post' && cartAction === 'apply-coupon' && typeof cartController.applyCoupon === 'function') {
            await cartController.applyCoupon(ctx);
            return;
          }

          if (method === 'delete' && cartAction === 'coupon' && typeof cartController.removeCoupon === 'function') {
            await cartController.removeCoupon(ctx);
            return;
          }

          // Base cart routes
          if (method === 'get' && !cartAction && !cartItemId && typeof cartController.getCart === 'function') {
            await cartController.getCart(ctx);
            return;
          }

          if (method === 'get' && !cartAction && !cartItemId && typeof cartController.getItems === 'function') {
            await cartController.getItems(ctx);
            return;
          }

          if (method === 'post' && !cartAction && !cartItemId && typeof cartController.addItem === 'function') {
            await cartController.addItem(ctx);
            return;
          }

          if (method === 'put' && cartItemId && typeof cartController.updateItem === 'function') {
            await cartController.updateItem(ctx);
            return;
          }

          if (method === 'delete' && cartItemId && typeof cartController.removeItem === 'function') {
            await cartController.removeItem(ctx);
            return;
          }

          if (method === 'delete' && !cartAction && !cartItemId && typeof cartController.clearCart === 'function') {
            await cartController.clearCart(ctx);
            return;
          }

        }
      }

      // Handle product-variant routes
      const customProductVariantPath = `/api/${routePrefix}/product-variants`;
      const defaultProductVariantPath = `/api/webbycommerce/product-variants`;
      const isProductVariantRoute =
        ctx.path === customProductVariantPath ||
        ctx.path.startsWith(`${customProductVariantPath}/`) ||
        ctx.path === defaultProductVariantPath ||
        ctx.path.startsWith(`${defaultProductVariantPath}/`) ||
        originalPath === customProductVariantPath ||
        originalPath.startsWith(`${customProductVariantPath}/`);

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

        // Authenticate user for product-variant routes (optional for public endpoints)
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for product-variant route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermissionForProductVariants = await ensureEcommercePermission(ctx);
        if (!hasPermissionForProductVariants) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for product-variants:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for product-variant route:`, error.message);
          }
        }

        const productVariantController = strapi.plugin('webbycommerce').controller('productVariant');

        if (productVariantController) {
          if (method === 'get' && !productVariantId && typeof productVariantController.getProductVariants === 'function') {
            await productVariantController.getProductVariants(ctx);
            return;
          }

          if (method === 'get' && productVariantId && typeof productVariantController.getProductVariant === 'function') {
            await productVariantController.getProductVariant(ctx);
            return;
          }

          if (method === 'post' && typeof productVariantController.createProductVariant === 'function') {
            await productVariantController.createProductVariant(ctx);
            return;
          }

          if (method === 'put' && productVariantId && typeof productVariantController.updateProductVariant === 'function') {
            await productVariantController.updateProductVariant(ctx);
            return;
          }

          if (method === 'delete' && productVariantId && typeof productVariantController.deleteProductVariant === 'function') {
            await productVariantController.deleteProductVariant(ctx);
            return;
          }
        }
      }

      // Handle product-attribute routes
      const customProductAttributePath = `/api/${routePrefix}/product-attributes`;
      const defaultProductAttributePath = `/api/webbycommerce/product-attributes`;
      const isProductAttributeRoute =
        ctx.path === customProductAttributePath ||
        ctx.path.startsWith(`${customProductAttributePath}/`) ||
        ctx.path === defaultProductAttributePath ||
        ctx.path.startsWith(`${defaultProductAttributePath}/`) ||
        originalPath === customProductAttributePath ||
        originalPath.startsWith(`${customProductAttributePath}/`);

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

        // Authenticate user for product-attribute routes (optional for public endpoints)
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for product-attribute route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermissionForProductAttributes = await ensureEcommercePermission(ctx);
        if (!hasPermissionForProductAttributes) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for product-attributes:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for product-attribute route:`, error.message);
          }
        }

        // Route to Strapi's content API handlers
        if (method === 'get' && !productAttributeId) {
          // GET /product-attributes - find many
          const entities = await strapi.entityService.findMany('plugin::webbycommerce.product-attribute', {
            sort: { sort_order: 'asc' },
            populate: ['product_attribute_values'],
          });
          ctx.send({ data: entities });
          return;
        }

        if (method === 'get' && productAttributeId) {
          // GET /product-attributes/:id - find one
          const entity = await strapi.entityService.findOne('plugin::webbycommerce.product-attribute', productAttributeId, {
            populate: ['product_attribute_values'],
          });
          if (!entity) {
            return ctx.notFound('Product attribute not found');
          }
          ctx.send({ data: entity });
          return;
        }

        if (method === 'post') {
          // POST /product-attributes - create
          const entity = await strapi.entityService.create('plugin::webbycommerce.product-attribute', {
            data: ctx.request.body,
          });
          ctx.send({ data: entity });
          return;
        }

        if (method === 'put' && productAttributeId) {
          // PUT /product-attributes/:id - update
          const entity = await strapi.entityService.update('plugin::webbycommerce.product-attribute', productAttributeId, {
            data: ctx.request.body,
          });
          if (!entity) {
            return ctx.notFound('Product attribute not found');
          }
          ctx.send({ data: entity });
          return;
        }

        if (method === 'delete' && productAttributeId) {
          // DELETE /product-attributes/:id - delete
          const entity = await strapi.entityService.delete('plugin::webbycommerce.product-attribute', productAttributeId);
          if (!entity) {
            return ctx.notFound('Product attribute not found');
          }
          ctx.send({ data: entity });
          return;
        }
      }

      // Handle product-attribute-value routes
      const customProductAttributeValuePath = `/api/${routePrefix}/product-attribute-values`;
      const defaultProductAttributeValuePath = `/api/webbycommerce/product-attribute-values`;
      const isProductAttributeValueRoute =
        ctx.path === customProductAttributeValuePath ||
        ctx.path.startsWith(`${customProductAttributeValuePath}/`) ||
        ctx.path === defaultProductAttributeValuePath ||
        ctx.path.startsWith(`${defaultProductAttributeValuePath}/`) ||
        originalPath === customProductAttributeValuePath ||
        originalPath.startsWith(`${customProductAttributeValuePath}/`);

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

        // Authenticate user for product-attribute-value routes (optional for public endpoints)
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for product-attribute-value route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermissionForProductAttributeValues = await ensureEcommercePermission(ctx);
        if (!hasPermissionForProductAttributeValues) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for product-attribute-values:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for product-attribute-value route:`, error.message);
          }
        }

        // Route to Strapi's content API handlers
        if (method === 'get' && !productAttributeValueId) {
          // GET /product-attribute-values - find many
          const entities = await strapi.entityService.findMany('plugin::webbycommerce.product-attribute-value', {
            sort: { sort_order: 'asc' },
            populate: ['product_attribute'],
          });
          ctx.send({ data: entities });
          return;
        }

        if (method === 'get' && productAttributeValueId) {
          // GET /product-attribute-values/:id - find one
          const entity = await strapi.entityService.findOne('plugin::webbycommerce.product-attribute-value', productAttributeValueId, {
            populate: ['product_attribute'],
          });
          if (!entity) {
            return ctx.notFound('Product attribute value not found');
          }
          ctx.send({ data: entity });
          return;
        }

        if (method === 'post') {
          // POST /product-attribute-values - create
          const entity = await strapi.entityService.create('plugin::webbycommerce.product-attribute-value', {
            data: ctx.request.body,
          });
          ctx.send({ data: entity });
          return;
        }

        if (method === 'put' && productAttributeValueId) {
          // PUT /product-attribute-values/:id - update
          const entity = await strapi.entityService.update('plugin::webbycommerce.product-attribute-value', productAttributeValueId, {
            data: ctx.request.body,
          });
          if (!entity) {
            return ctx.notFound('Product attribute value not found');
          }
          ctx.send({ data: entity });
          return;
        }

        if (method === 'delete' && productAttributeValueId) {
          // DELETE /product-attribute-values/:id - delete
          const entity = await strapi.entityService.delete('plugin::webbycommerce.product-attribute-value', productAttributeValueId);
          if (!entity) {
            return ctx.notFound('Product attribute value not found');
          }
          ctx.send({ data: entity });
          return;
        }
      }

      // Handle wishlist routes
      // Check both custom prefix and default prefix (after rewrite)
      const customWishlistPath = `/api/${routePrefix}/wishlist`;
      const defaultWishlistPath = `/api/webbycommerce/wishlist`;
      const isWishlistRoute =
        ctx.path === customWishlistPath ||
        ctx.path.startsWith(`${customWishlistPath}/`) ||
        ctx.path === defaultWishlistPath ||
        ctx.path.startsWith(`${defaultWishlistPath}/`) ||
        originalPath === customWishlistPath ||
        originalPath.startsWith(`${customWishlistPath}/`);

      // Check if this is a move-to-cart route
      const isMoveToCartRoute =
        ctx.path.includes('/move-to-cart') ||
        originalPath.includes('/move-to-cart');

      // Exclude special wishlist routes that should be handled by normal Strapi routing
      // But include move-to-cart routes
      const isSpecialWishlistRoute =
        (ctx.path.includes('/wishlist/items/') ||
        originalPath.includes('/wishlist/items/')) &&
        !isMoveToCartRoute;

      if (isWishlistRoute && !isSpecialWishlistRoute) {
        // Extract product ID from path if present (for remove operations)
        let productId = null;
        const pathMatch = ctx.path.match(/\/wishlist\/([^\/]+)/);
        if (pathMatch) {
          productId = pathMatch[1];
          // Set ctx.params.productId for controller access
          if (!ctx.params) {
            ctx.params = {};
          }
          ctx.params.productId = productId;
        }

        // Authenticate user for wishlist routes
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for wishlist route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for wishlist:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for wishlist:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const wishlistController = strapi
          .plugin('webbycommerce')
          .controller('wishlist');

        if (wishlistController) {
          if (method === 'get' && !productId && typeof wishlistController.getWishlist === 'function') {
            await wishlistController.getWishlist(ctx);
            return;
          }

          if (method === 'post' && !productId && typeof wishlistController.addToWishlist === 'function') {
            await wishlistController.addToWishlist(ctx);
            return;
          }

          if (method === 'delete' && productId && typeof wishlistController.removeFromWishlist === 'function') {
            await wishlistController.removeFromWishlist(ctx);
            return;
          }

          if (method === 'delete' && !productId && typeof wishlistController.clearWishlist === 'function') {
            await wishlistController.clearWishlist(ctx);
            return;
          }

          if (method === 'put' && !productId && typeof wishlistController.updateWishlist === 'function') {
            await wishlistController.updateWishlist(ctx);
            return;
          }

          if (method === 'get' && ctx.path.includes('/status') && typeof wishlistController.checkWishlistStatus === 'function') {
            await wishlistController.checkWishlistStatus(ctx);
            return;
          }

        }
      }

      // Handle move-to-cart route (special wishlist route)
      if (isWishlistRoute && isMoveToCartRoute) {
        // Authenticate user for move-to-cart route
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for move-to-cart route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST requests if not already parsed
        const method = ctx.method.toLowerCase();
        if (method === 'post' && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for move-to-cart:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for move-to-cart:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const wishlistController = strapi
          .plugin('webbycommerce')
          .controller('wishlist');

        if (wishlistController && method === 'post' && typeof wishlistController.moveToCart === 'function') {
          // Extract ID from path for move-to-cart
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

      // Handle compare routes
      // Check both custom prefix and default prefix (after rewrite)
      const customComparePath = `/api/${routePrefix}/compare`;
      const defaultComparePath = `/api/webbycommerce/compare`;
      const isCompareRoute =
        ctx.path === customComparePath ||
        ctx.path.startsWith(`${customComparePath}/`) ||
        ctx.path === defaultComparePath ||
        ctx.path.startsWith(`${defaultComparePath}/`) ||
        originalPath === customComparePath ||
        originalPath.startsWith(`${customComparePath}/`);

      if (isCompareRoute) {
        // Extract product ID from path if present (for remove operations)
        let productId = null;
        const pathMatch = ctx.path.match(/\/compare\/([^\/]+)/);
        if (pathMatch) {
          productId = pathMatch[1];
          // Set ctx.params.productId for controller access
          if (!ctx.params) {
            ctx.params = {};
          }
          ctx.params.productId = productId;
        }

        // Authenticate user for compare routes
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for compare route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for compare:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for compare:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const compareController = strapi
          .plugin('webbycommerce')
          .controller('compare');

        if (compareController) {
          if (method === 'get' && !productId && !ctx.path.includes('/data') && !ctx.path.includes('/status') && typeof compareController.getCompare === 'function') {
            await compareController.getCompare(ctx);
            return;
          }

          if (method === 'post' && !productId && typeof compareController.addToCompare === 'function') {
            await compareController.addToCompare(ctx);
            return;
          }

          if (method === 'delete' && productId && typeof compareController.removeFromCompare === 'function') {
            await compareController.removeFromCompare(ctx);
            return;
          }

          if (method === 'delete' && !productId && typeof compareController.clearCompare === 'function') {
            await compareController.clearCompare(ctx);
            return;
          }

          if (method === 'put' && !productId && typeof compareController.updateCompare === 'function') {
            await compareController.updateCompare(ctx);
            return;
          }

          if (method === 'get' && ctx.path.includes('/data') && typeof compareController.getComparisonData === 'function') {
            await compareController.getComparisonData(ctx);
            return;
          }

          if (method === 'get' && ctx.path.includes('/status') && typeof compareController.checkCompareStatus === 'function') {
            await compareController.checkCompareStatus(ctx);
            return;
          }
        }
      }

      // Handle tag routes
      // Handle product-category routes
      const customProductCategoryPath = `/api/${routePrefix}/product-categories`;
      const defaultProductCategoryPath = `/api/webbycommerce/product-categories`;
      const isProductCategoryRoute =
        ctx.path === customProductCategoryPath ||
        ctx.path.startsWith(`${customProductCategoryPath}/`) ||
        ctx.path === defaultProductCategoryPath ||
        ctx.path.startsWith(`${defaultProductCategoryPath}/`) ||
        originalPath === customProductCategoryPath ||
        originalPath.startsWith(`${customProductCategoryPath}/`);

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

        // Authenticate user for product-category routes (optional for public endpoints)
        const authHeaderCat = ctx.request.header.authorization;
        if (authHeaderCat && authHeaderCat.startsWith('Bearer ')) {
          const token = authHeaderCat.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for product-category route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermissionForProductCategories = await ensureEcommercePermission(ctx);
        if (!hasPermissionForProductCategories) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const methodCat = ctx.method.toLowerCase();
        if ((methodCat === 'post' || methodCat === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for product-categories:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for product-category route:`, error.message);
          }
        }

        const productCategoryController = strapi.plugin('webbycommerce').controller('productCategory');

        if (productCategoryController) {
          if (methodCat === 'get' && !productCategoryId && typeof productCategoryController.getProductCategories === 'function') {
            await productCategoryController.getProductCategories(ctx);
            return;
          }

          if (methodCat === 'get' && productCategoryId && typeof productCategoryController.getProductCategory === 'function') {
            await productCategoryController.getProductCategory(ctx);
            return;
          }

          if (methodCat === 'post' && typeof productCategoryController.createProductCategory === 'function') {
            await productCategoryController.createProductCategory(ctx);
            return;
          }

          if (methodCat === 'put' && productCategoryId && typeof productCategoryController.updateProductCategory === 'function') {
            await productCategoryController.updateProductCategory(ctx);
            return;
          }

          if (methodCat === 'delete' && productCategoryId && typeof productCategoryController.deleteProductCategory === 'function') {
            await productCategoryController.deleteProductCategory(ctx);
            return;
          }
        }
      }

      const customTagPath = `/api/${routePrefix}/tags`;
      const defaultTagPath = `/api/webbycommerce/tags`;
      const isTagRoute =
        ctx.path === customTagPath ||
        ctx.path.startsWith(`${customTagPath}/`) ||
        ctx.path === defaultTagPath ||
        ctx.path.startsWith(`${defaultTagPath}/`) ||
        originalPath === customTagPath ||
        originalPath.startsWith(`${customTagPath}/`);

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

        // Authenticate user for tag routes (optional for public endpoints)
        const authHeader = ctx.request.header.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          if (token) {
            try {
              const jwtService = strapi.plugins['users-permissions'].services.jwt;
              if (jwtService && typeof jwtService.verify === 'function') {
                const decoded = await jwtService.verify(token);

                if (decoded && decoded.id) {
                  const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: decoded.id },
                    populate: ['role'],
                  });

                  if (user) {
                    ctx.state.user = user;
                  }
                }
              }
            } catch (error) {
              strapi.log.error(`[webbycommerce] JWT verification failed for tag route:`, error.message);
            }
          }
        }

        // Check ecommerce permission
        const hasPermissionForTags = await ensureEcommercePermission(ctx);
        if (!hasPermissionForTags) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for tags:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for tag route:`, error.message);
          }
        }

        const tagController = strapi.plugin('webbycommerce').controller('productTag');

        if (tagController) {
          if (method === 'get' && !tagId && typeof tagController.getTags === 'function') {
            await tagController.getTags(ctx);
            return;
          }

          if (method === 'get' && tagId && typeof tagController.getTag === 'function') {
            await tagController.getTag(ctx);
            return;
          }

          if (method === 'post' && typeof tagController.createTag === 'function') {
            await tagController.createTag(ctx);
            return;
          }

          if (method === 'put' && tagId && typeof tagController.updateTag === 'function') {
            await tagController.updateTag(ctx);
            return;
          }

          if (method === 'delete' && tagId && typeof tagController.deleteTag === 'function') {
            await tagController.deleteTag(ctx);
            return;
          }
        }
      }

      return next();
    });

    // Handle payment routes
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      const originalPath = ctx.state.originalPath || ctx.path;

      // Check both custom prefix and default prefix (after rewrite)
      const customPaymentsPath = `/api/${routePrefix}/payments`;
      const defaultPaymentsPath = `/api/webbycommerce/payments`;
      const isPaymentRoute =
        ctx.path === customPaymentsPath ||
        ctx.path.startsWith(`${customPaymentsPath}/`) ||
        ctx.path === defaultPaymentsPath ||
        ctx.path.startsWith(`${defaultPaymentsPath}/`) ||
        originalPath === customPaymentsPath ||
        originalPath.startsWith(`${customPaymentsPath}/`);

      if (isPaymentRoute) {
        // Extract action/id from path (create-intent, confirm, webhook, :id/refund, transactions)
        let action = null;
        let paymentId = null;
        const pathMatch = ctx.path.match(/\/payments\/([^\/]+)(?:\/([^\/]+))?/);
        if (pathMatch) {
          const firstSegment = pathMatch[1];
          const secondSegment = pathMatch[2];

          // Check if first segment is an action or an ID
          const knownActions = ['create-intent', 'confirm', 'webhook', 'transactions'];
          if (knownActions.includes(firstSegment)) {
            action = firstSegment;
          } else if (secondSegment === 'refund') {
            // Pattern: /payments/{id}/refund
            paymentId = firstSegment;
            action = secondSegment;
          } else {
            // Assume it's an ID for other operations
            paymentId = firstSegment;
          }

          // Set ctx.params for controller access
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

        // Authenticate user for payment routes (except webhook)
        if (action !== 'webhook') {
          const authHeader = ctx.request.header.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '').trim();
            if (token) {
              try {
                const jwtService = strapi.plugins['users-permissions'].services.jwt;
                if (jwtService && typeof jwtService.verify === 'function') {
                  const decoded = await jwtService.verify(token);

                  if (decoded && decoded.id) {
                    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                      where: { id: decoded.id },
                      populate: ['role'],
                    });

                    if (user) {
                      ctx.state.user = user;
                    }
                  }
                }
              } catch (error) {
                strapi.log.error(`[webbycommerce] JWT verification failed for payment route:`, error.message);
              }
            }
          }
        }

        // Check ecommerce permission for authenticated routes
        if (action !== 'webhook') {
          const hasPermission = await ensureEcommercePermission(ctx);
          if (!hasPermission) {
            return;
          }
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for payment:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for payment route:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const paymentController = strapi
          .plugin('webbycommerce')
          .controller('payment');

        if (paymentController) {
          if (method === 'post' && action === 'create-intent' && typeof paymentController.createIntent === 'function') {
            await paymentController.createIntent(ctx);
            return;
          }

          if (method === 'post' && action === 'confirm' && typeof paymentController.confirmPayment === 'function') {
            await paymentController.confirmPayment(ctx);
            return;
          }

          if (method === 'post' && action === 'webhook' && typeof paymentController.handleWebhook === 'function') {
            await paymentController.handleWebhook(ctx);
            return;
          }

          if (method === 'post' && action === 'refund' && typeof paymentController.processRefund === 'function') {
            await paymentController.processRefund(ctx);
            return;
          }

          if (method === 'get' && action === 'transactions' && typeof paymentController.getTransactions === 'function') {
            await paymentController.getTransactions(ctx);
            return;
          }
        }
      }

      return next();
    });

    // Handle order/checkout routes
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      const originalPath = ctx.state.originalPath || ctx.path;

      // Check both custom prefix and default prefix (after rewrite)
      const customOrderPath = `/api/${routePrefix}/orders`;
      const defaultOrderPath = `/api/webbycommerce/orders`;
      const customCheckoutPath = `/api/${routePrefix}/checkout`;
      const defaultCheckoutPath = `/api/webbycommerce/checkout`;
      const isOrderRoute =
        ctx.path === customOrderPath ||
        ctx.path.startsWith(`${customOrderPath}/`) ||
        ctx.path === defaultOrderPath ||
        ctx.path.startsWith(`${defaultOrderPath}/`) ||
        ctx.path === customCheckoutPath ||
        ctx.path === defaultCheckoutPath ||
        originalPath === customOrderPath ||
        originalPath.startsWith(`${customOrderPath}/`) ||
        originalPath === customCheckoutPath;

    if (isOrderRoute) {
      // Extract ID from path if present (for specific order operations)
      let orderId = null;
      const orderPathMatch = ctx.path.match(/\/orders\/([^\/]+)/);
      if (orderPathMatch) {
        orderId = orderPathMatch[1];
        // Set ctx.params.id for controller access
        if (!ctx.params) {
          ctx.params = {};
        }
        ctx.params.id = orderId;
      }

      // Authenticate user for order routes
      const authHeader = ctx.request.header.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.replace('Bearer ', '').trim();
        if (token) {
          try {
            const jwtService = strapi.plugins['users-permissions'].services.jwt;
            if (jwtService && typeof jwtService.verify === 'function') {
              const decoded = await jwtService.verify(token);

              if (decoded && decoded.id) {
                const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                  where: { id: decoded.id },
                  populate: ['role'],
                });

                if (user) {
                  ctx.state.user = user;
                }
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] JWT verification failed for order route:`, error.message);
          }
        }
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      // Parse request body for POST/PUT requests if not already parsed
      const method = ctx.method.toLowerCase();
      if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
        try {
          const contentType = ctx.request.header['content-type'] || '';

          if (contentType.includes('application/json')) {
            const chunks = [];
            for await (const chunk of ctx.req) {
              chunks.push(chunk);
            }
            const rawBody = Buffer.concat(chunks).toString('utf8');

            if (rawBody && rawBody.trim()) {
              ctx.request.body = JSON.parse(rawBody);
              strapi.log.debug(`[webbycommerce] Parsed request body for order:`, ctx.request.body);
            }
          }
        } catch (error) {
          strapi.log.error(`[webbycommerce] Failed to parse request body for order route:`, error.message);
          // Continue - controller will handle validation errors
        }
      }

      const orderController = strapi
        .plugin('webbycommerce')
        .controller('order');

      if (orderController) {
        if (ctx.path.includes('/checkout') && method === 'post' && typeof orderController.checkout === 'function') {
          await orderController.checkout(ctx);
          return;
        }

        if (method === 'get' && !orderId && typeof orderController.getOrders === 'function') {
          await orderController.getOrders(ctx);
          return;
        }

        if (method === 'get' && orderId && typeof orderController.getOrder === 'function') {
          await orderController.getOrder(ctx);
          return;
        }

        if (method === 'put' && orderId && ctx.path.includes('/cancel') && typeof orderController.cancelOrder === 'function') {
          await orderController.cancelOrder(ctx);
          return;
        }

        if (method === 'put' && orderId && ctx.path.includes('/status') && typeof orderController.updateOrderStatus === 'function') {
          await orderController.updateOrderStatus(ctx);
          return;
        }

        if (method === 'get' && orderId && ctx.path.includes('/tracking') && typeof orderController.getOrderTracking === 'function') {
          await orderController.getOrderTracking(ctx);
          return;
        }
      }
    }

      return next();
    });

    // Handle shipping routes
    strapi.server.use(async (ctx, next) => {
      const routePrefix = await getRoutePrefix();
      const originalPath = ctx.state.originalPath || ctx.path;

      // Check both custom prefix and default prefix (after rewrite)
      const customShippingPath = `/api/${routePrefix}/shipping`;
      const defaultShippingPath = `/api/webbycommerce/shipping`;
      const isShippingRoute =
        ctx.path === customShippingPath ||
        ctx.path.startsWith(`${customShippingPath}/`) ||
        ctx.path === defaultShippingPath ||
        ctx.path.startsWith(`${defaultShippingPath}/`) ||
        originalPath === customShippingPath ||
        originalPath.startsWith(`${customShippingPath}/`);

      if (isShippingRoute) {
        // Extract IDs from path if present
        let shippingZoneId = null;
        let shippingMethodId = null;
        let shippingRateId = null;
        let action = null;

        // Match different shipping route patterns
        const calculateMatch = ctx.path.match(/\/shipping\/calculate$/);
        const zonesListMatch = ctx.path.match(/\/shipping\/zones$/);
        const zonesSingleMatch = ctx.path.match(/\/shipping\/zones\/([^\/]+)$/);
        const methodsListMatch = ctx.path.match(/\/shipping\/methods$/);
        const methodsSingleMatch = ctx.path.match(/\/shipping\/methods\/([^\/]+)$/);
        const ratesListMatch = ctx.path.match(/\/shipping\/methods\/([^\/]+)\/rates$/);
        const ratesSingleMatch = ctx.path.match(/\/shipping\/rates\/([^\/]+)$/);
        const ratesCreateMatch = ctx.path.match(/\/shipping\/rates$/);

        if (calculateMatch) {
          action = 'calculate';
        } else if (zonesListMatch) {
          action = ctx.method.toLowerCase() === 'get' ? 'get-zones' : 'create-zone';
        } else if (zonesSingleMatch) {
          shippingZoneId = zonesSingleMatch[1];
          action = ctx.method.toLowerCase() === 'put' ? 'update-zone' : 'delete-zone';
        } else if (methodsListMatch) {
          action = ctx.method.toLowerCase() === 'get' ? 'get-methods' : 'create-method';
        } else if (methodsSingleMatch) {
          shippingMethodId = methodsSingleMatch[1];
          action = ctx.method.toLowerCase() === 'put' ? 'update-method' : 'delete-method';
        } else if (ratesListMatch) {
          shippingMethodId = ratesListMatch[1];
          action = 'get-rates';
        } else if (ratesCreateMatch && ctx.method.toLowerCase() === 'post') {
          action = 'create-rate';
        } else if (ratesSingleMatch) {
          shippingRateId = ratesSingleMatch[1];
          action = ctx.method.toLowerCase() === 'put' ? 'update-rate' : 'delete-rate';
        }

        // Set ctx.params for controller access
        if (!ctx.params) {
          ctx.params = {};
        }
        if (shippingZoneId) {
          ctx.params.id = shippingZoneId;
        }
        if (shippingMethodId && action !== 'get-rates') {
          ctx.params.id = shippingMethodId;
        }
        if (shippingRateId) {
          ctx.params.id = shippingRateId;
        }
        if (shippingMethodId && action === 'get-rates') {
          ctx.params.methodId = shippingMethodId;
        }

        // Authenticate user for shipping routes (admin routes require admin auth)
        const isAdminRoute = action && [
          'get-zones', 'create-zone', 'update-zone', 'delete-zone',
          'get-methods', 'create-method', 'update-method', 'delete-method',
          'get-rates', 'create-rate', 'update-rate', 'delete-rate'
        ].includes(action);

        if (isAdminRoute) {
          // Admin routes require admin authentication
          const authHeader = ctx.request.header.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '').trim();
            if (token) {
              try {
                const jwtService = strapi.plugins['users-permissions'].services.jwt;
                if (jwtService && typeof jwtService.verify === 'function') {
                  const decoded = await jwtService.verify(token);

                  if (decoded && decoded.id) {
                    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                      where: { id: decoded.id },
                      populate: ['role'],
                    });

                    if (user) {
                      ctx.state.user = user;
                      // Check if user is admin
                      const userRole = user.role?.type;
                      if (userRole !== 'admin' && userRole !== 'super_admin') {
                        ctx.forbidden('Admin access required for this operation.');
                        return;
                      }
                    }
                  }
                }
              } catch (error) {
                strapi.log.error(`[webbycommerce] JWT verification failed for shipping admin route:`, error.message);
                ctx.forbidden('Authentication failed.');
                return;
              }
            }
          } else {
            ctx.forbidden('Authentication required for admin operations.');
            return;
          }
        } else {
          // Frontend routes (calculate) require user authentication
          const authHeader = ctx.request.header.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '').trim();
            if (token) {
              try {
                const jwtService = strapi.plugins['users-permissions'].services.jwt;
                if (jwtService && typeof jwtService.verify === 'function') {
                  const decoded = await jwtService.verify(token);

                  if (decoded && decoded.id) {
                    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                      where: { id: decoded.id },
                      populate: ['role'],
                    });

                    if (user) {
                      ctx.state.user = user;
                    }
                  }
                }
              } catch (error) {
                strapi.log.error(`[webbycommerce] JWT verification failed for shipping route:`, error.message);
              }
            }
          }
        }

        // Check ecommerce permission
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return;
        }

        // Parse request body for POST/PUT requests if not already parsed
        const method = ctx.method.toLowerCase();
        if ((method === 'post' || method === 'put') && (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0))) {
          try {
            const contentType = ctx.request.header['content-type'] || '';

            if (contentType.includes('application/json')) {
              const chunks = [];
              for await (const chunk of ctx.req) {
                chunks.push(chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf8');

              if (rawBody && rawBody.trim()) {
                ctx.request.body = JSON.parse(rawBody);
                strapi.log.debug(`[webbycommerce] Parsed request body for shipping:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for shipping route:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const shippingController = strapi
          .plugin('webbycommerce')
          .controller('shipping');

        if (shippingController) {
          if (action === 'calculate' && method === 'post' && typeof shippingController.getShippingMethods === 'function') {
            await shippingController.getShippingMethods(ctx);
            return;
          }

          if (action === 'get-zones' && method === 'get' && typeof shippingController.getShippingZones === 'function') {
            await shippingController.getShippingZones(ctx);
            return;
          }

          if (action === 'create-zone' && method === 'post' && typeof shippingController.createShippingZone === 'function') {
            await shippingController.createShippingZone(ctx);
            return;
          }

          if (action === 'update-zone' && method === 'put' && typeof shippingController.updateShippingZone === 'function') {
            await shippingController.updateShippingZone(ctx);
            return;
          }

          if (action === 'delete-zone' && method === 'delete' && typeof shippingController.deleteShippingZone === 'function') {
            await shippingController.deleteShippingZone(ctx);
            return;
          }

          if (action === 'get-methods' && method === 'get' && typeof shippingController.getShippingMethodsAdmin === 'function') {
            await shippingController.getShippingMethodsAdmin(ctx);
            return;
          }

          if (action === 'create-method' && method === 'post' && typeof shippingController.createShippingMethod === 'function') {
            await shippingController.createShippingMethod(ctx);
            return;
          }

          if (action === 'update-method' && method === 'put' && typeof shippingController.updateShippingMethod === 'function') {
            await shippingController.updateShippingMethod(ctx);
            return;
          }

          if (action === 'delete-method' && method === 'delete' && typeof shippingController.deleteShippingMethod === 'function') {
            await shippingController.deleteShippingMethod(ctx);
            return;
          }

          if (action === 'get-rates' && method === 'get' && typeof shippingController.getShippingRates === 'function') {
            await shippingController.getShippingRates(ctx);
            return;
          }

          if (action === 'create-rate' && method === 'post' && typeof shippingController.createShippingRate === 'function') {
            await shippingController.createShippingRate(ctx);
            return;
          }

          if (action === 'update-rate' && method === 'put' && typeof shippingController.updateShippingRate === 'function') {
            await shippingController.updateShippingRate(ctx);
            return;
          }

          if (action === 'delete-rate' && method === 'delete' && typeof shippingController.deleteShippingRate === 'function') {
            await shippingController.deleteShippingRate(ctx);
            return;
          }
        }
      }

      return next();
    });

    // Register ecommerce actions with retry logic
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const registerWithRetry = async () => {
      try {
        await registerEcommerceActions();
        strapi.log.info('[webbycommerce] Ecommerce actions registered successfully');

        return true;
      } catch (error) {
        strapi.log.warn(`[webbycommerce] Failed to register ecommerce actions (attempt ${retryCount + 1}/${maxRetries}):`, error.message);

        if (retryCount < maxRetries - 1) {
          retryCount++;
          strapi.log.info(`[webbycommerce] Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return registerWithRetry();
        } else {
          strapi.log.error('[webbycommerce] Failed to register ecommerce actions after all retries');
          throw error;
        }
      }
    };

    await registerWithRetry();

    strapi.log.info('[webbycommerce] Plugin bootstrapped successfully');
    strapi.log.info(
      '[webbycommerce] Health endpoint is available at: /webbycommerce/health and /api/webbycommerce/health'
    );
    strapi.log.info('[webbycommerce] ========================================');
  } catch (error) {
    strapi.log.error('[webbycommerce] Bootstrap error:', error);
    throw error;
  }
};

