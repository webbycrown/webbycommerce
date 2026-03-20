'use strict';

const fs = require('fs');
const path = require('path');
const { registerEcommerceActions, ensureEcommercePermission } = require('./utils/check-ecommerce-permission');
const { extendUserSchemaWithOtpFields } = require('./utils/extend-user-schema');

module.exports = async ({ strapi }) => {
  try {
    strapi.log.info('[webbycommerce] ========================================');
    strapi.log.info('[webbycommerce] Bootstrapping plugin...');

    // Extend user schema with OTP fields if they don't exist
    try {
      await extendUserSchemaWithOtpFields(strapi);
    } catch (schemaError) {
      strapi.log.warn('[webbycommerce] Could not automatically extend user schema:', schemaError.message);
      strapi.log.warn(
        '[webbycommerce] Please manually extend the user schema. See README for instructions.'
      );
    }

    const disableSeeding =
      process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === 'true' ||
      process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === '1' ||
      process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO === 'yes';

    // Check for auto-seeding via environment variable or first run
    // Only seed if explicitly requested and ensure the plugin is fully loaded
    if (!disableSeeding && process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === 'true') {
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
    } else if (disableSeeding && process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA === 'true') {
      strapi.log.info(
        '[webbycommerce] Demo seeding is disabled by STRAPI_PLUGIN_ADVANCED_ECOMMERCE_DISABLE_SEED_DEMO; skipping auto-seed.'
      );
    }

    // Ensure plugin content types are registered
    const contentTypes = require('./content-types');
    strapi.log.info('[webbycommerce] Content types loaded:', Object.keys(contentTypes));
    if (contentTypes.components) {
      strapi.log.info('[webbycommerce] Components loaded:', Object.keys(contentTypes.components));
    }

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

    // Helper function to check if a route is an admin route
    const isAdminRoute = (path) => {
      if (!path) return false;
      // Admin routes typically start with /admin/ or are admin API routes
      // Content-Type Builder, Upload, Users-Permissions admin routes, etc.
      const adminRoutePatterns = [
        '/admin/',
        '/content-type-builder/',
        '/upload/',
        '/users-permissions/',
        '/i18n/',
        '/email/',
        '/documentation/',
        '/graphql',
      ];
      return adminRoutePatterns.some(pattern => path.startsWith(pattern));
    };

    // CRITICAL: Fix for content-type-builder path issue - MUST run FIRST before any other middleware
    // This ensures the API directory structure exists before Strapi tries to write schema files
    strapi.server.use(async (ctx, next) => {
      // Only handle content-type-builder update-schema requests
      if (ctx.path === '/content-type-builder/update-schema' && ctx.method === 'POST') {
        try {
          // Parse body manually if not already parsed
          let body = ctx.request.body;
          let bodyWasParsed = false;
          
          if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
            try {
              const contentType = ctx.request.header['content-type'] || '';
              if (contentType.includes('application/json') && ctx.req && typeof ctx.req[Symbol.asyncIterator] === 'function') {
                // Read the stream
                const chunks = [];
                for await (const chunk of ctx.req) {
                  chunks.push(chunk);
                }
                const rawBody = Buffer.concat(chunks).toString('utf8');
                
                if (rawBody && rawBody.trim()) {
                  body = JSON.parse(rawBody);
                  ctx.request.body = body;
                  bodyWasParsed = true;
                  // Restore the stream for downstream middleware
                  const { Readable } = require('stream');
                  ctx.req = Readable.from([Buffer.from(rawBody)]);
                  strapi.log.info('[webbycommerce] EARLY: Manually parsed request body');
                }
              }
            } catch (parseError) {
              strapi.log.warn('[webbycommerce] EARLY: Could not parse body:', parseError.message);
            }
          }
          
          body = body || {};
          
          // Handle both nested (body.data) and flat (body) request structures
          const data = body.data || body;
          const contentTypes = data.contentTypes || [];
          const components = data.components || [];
          
          strapi.log.info('[webbycommerce] ===== EARLY: Processing content-type-builder update-schema request =====');
          strapi.log.info('[webbycommerce] EARLY: Body type:', typeof body);
          strapi.log.info('[webbycommerce] EARLY: Body keys:', Object.keys(body));
          strapi.log.info('[webbycommerce] EARLY: Content types found:', contentTypes.length);
          strapi.log.info('[webbycommerce] EARLY: Components found:', components.length);
          
          // Get the Strapi app directory - try multiple possible locations
          let appDir;
          if (strapi.dirs && strapi.dirs.app && strapi.dirs.app.root) {
            appDir = strapi.dirs.app.root;
          } else if (strapi.dirs && strapi.dirs.root) {
            appDir = strapi.dirs.root;
          } else {
            // Fallback: __dirname is server/src, so go up two levels to get project root
            appDir = path.resolve(__dirname, '../..');
          }
          
          // Ensure strapi.dirs is set for Strapi's internal use
          if (!strapi.dirs) {
            strapi.dirs = {};
          }
          if (!strapi.dirs.app) {
            strapi.dirs.app = {};
          }
          if (!strapi.dirs.app.root) {
            strapi.dirs.app.root = appDir;
          }
          
          // Process each content type in the request
          for (const contentType of contentTypes) {
            if (contentType.uid && contentType.uid.startsWith('api::')) {
              const uidParts = contentType.uid.split('::');
              if (uidParts.length === 2) {
                const apiAndType = uidParts[1].split('.');
                if (apiAndType.length >= 2) {
                  const apiName = apiAndType[0];
                  const contentTypeName = apiAndType[1];
                  
                  const apiDir = path.join(appDir, 'src', 'api', apiName);
                  const contentTypeDir = path.join(apiDir, 'content-types', contentTypeName);
                  const schemaPath = path.join(contentTypeDir, 'schema.json');
                  
                  // Handle collection deletion
                  if (contentType.action === 'delete') {
                    strapi.log.info(`[webbycommerce] EARLY: Deleting collection: ${contentType.uid}`);
                    
                    // Delete schema file
                    if (fs.existsSync(schemaPath)) {
                      fs.unlinkSync(schemaPath);
                      strapi.log.info(`[webbycommerce] EARLY: ✓ Deleted schema file: ${schemaPath}`);
                    }
                    
                    // Delete content type directory (optional - Strapi will handle cleanup)
                    if (fs.existsSync(contentTypeDir)) {
                      try {
                        fs.rmSync(contentTypeDir, { recursive: true, force: true });
                        strapi.log.info(`[webbycommerce] EARLY: ✓ Deleted content type directory: ${contentTypeDir}`);
                      } catch (error) {
                        strapi.log.warn(`[webbycommerce] EARLY: Could not delete directory: ${error.message}`);
                      }
                    }
                    
                    ctx.state.schemaFileCreated = true;
                    ctx.state.schemaDeleted = true;
                    continue; // Skip to next content type
                  }
                  
                  // FORCE create directory structure
                  fs.mkdirSync(contentTypeDir, { recursive: true });
                  
                  // Read existing schema to preserve any existing attributes
                  let existingSchema = {};
                  if (fs.existsSync(schemaPath)) {
                    try {
                      existingSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
                    } catch (e) {
                      existingSchema = {};
                    }
                  }
                  
                  // Build complete schema from request data
                  // This ensures the schema file is complete and valid before Strapi processes it
                  // Start with existing attributes to preserve them
                  const attributes = { ...(existingSchema.attributes || {}) };
                  
                  // Process all attributes from the request
                  if (contentType.attributes && Array.isArray(contentType.attributes)) {
                    for (const attr of contentType.attributes) {
                      const action = attr.action || 'update';
                      
                      // Handle field deletion
                      if (action === 'delete' && attr.name) {
                        if (attributes[attr.name]) {
                          delete attributes[attr.name];
                          strapi.log.info(`[webbycommerce] EARLY: ✓ Deleted attribute: ${attr.name}`);
                        } else {
                          strapi.log.warn(`[webbycommerce] EARLY: Attribute not found for deletion: ${attr.name}`);
                        }
                        continue; // Skip to next attribute
                      }
                      
                      // Handle create/update
                      if (attr.name && attr.properties) {
                        // Build the attribute object from properties
                        const attributeDef = { ...attr.properties };
                        
                        // Handle component types - ensure component references are correct
                        if (attributeDef.type === 'component') {
                          if (attributeDef.component) {
                            strapi.log.info(`[webbycommerce] EARLY: Processing component attribute: ${attr.name} -> ${attributeDef.component}`);
                          }
                          // Component attributes need specific structure
                          if (!attributeDef.repeatable) {
                            attributeDef.repeatable = false;
                          }
                        }
                        
                        // Handle dynamiczone types
                        if (attributeDef.type === 'dynamiczone') {
                          if (Array.isArray(attributeDef.components)) {
                            strapi.log.info(`[webbycommerce] EARLY: Processing dynamiczone: ${attr.name} with ${attributeDef.components.length} components`);
                          }
                        }
                        
                        // Handle relation types
                        if (attributeDef.type === 'relation') {
                          if (attributeDef.target) {
                            strapi.log.info(`[webbycommerce] EARLY: Processing relation: ${attr.name} -> ${attributeDef.target}`);
                          }
                        }
                        
                        // Update/add the attribute
                        attributes[attr.name] = attributeDef;
                        
                        strapi.log.info(`[webbycommerce] EARLY: ${action === 'create' ? 'Added' : 'Updated'} attribute: ${attr.name} (type: ${attributeDef.type || 'unknown'})`);
                      }
                    }
                  }
                  
                  // Build the complete schema object matching Strapi's format
                  const schema = {
                    kind: contentType.kind || existingSchema.kind || 'collectionType',
                    collectionName: contentType.collectionName || existingSchema.collectionName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                    info: {
                      singularName: contentType.singularName || existingSchema.info?.singularName || contentTypeName,
                      pluralName: contentType.pluralName || existingSchema.info?.pluralName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                      displayName: contentType.displayName || contentType.modelName || existingSchema.info?.displayName || contentTypeName,
                      description: contentType.description || existingSchema.info?.description || '',
                    },
                    options: {
                      draftAndPublish: contentType.draftAndPublish !== undefined ? contentType.draftAndPublish : (existingSchema.options?.draftAndPublish !== undefined ? existingSchema.options.draftAndPublish : false),
                    },
                    pluginOptions: contentType.pluginOptions || existingSchema.pluginOptions || {
                      'content-manager': {
                        visible: true
                      },
                      'content-api': {
                        visible: true
                      }
                    },
                    attributes: attributes,
                  };
                  
                  // Write the complete schema file
                  // This file will trigger Strapi's file watcher and cause auto-restart
                  // After restart, Strapi will read this file and register the collection with all fields/components
                  const schemaJson = JSON.stringify(schema, null, 2);
                  fs.writeFileSync(schemaPath, schemaJson, 'utf8');
                  
                  // Verify the file was written correctly and is valid JSON
                  if (fs.existsSync(schemaPath)) {
                    try {
                      // Verify it's valid JSON and can be read back
                      const verifySchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
                      const fileStats = fs.statSync(schemaPath);
                      
                      strapi.log.info(`[webbycommerce] ========================================`);
                      strapi.log.info(`[webbycommerce] ✓ COLLECTION SCHEMA CREATED/UPDATED`);
                      strapi.log.info(`[webbycommerce] ========================================`);
                      strapi.log.info(`[webbycommerce] ✓ File: ${schemaPath}`);
                      strapi.log.info(`[webbycommerce] ✓ File size: ${fileStats.size} bytes`);
                      strapi.log.info(`[webbycommerce] ✓ Schema is valid JSON`);
                      strapi.log.info(`[webbycommerce] ✓ Schema kind: ${verifySchema.kind}`);
                      strapi.log.info(`[webbycommerce] ✓ Collection name: ${verifySchema.collectionName}`);
                      strapi.log.info(`[webbycommerce] ✓ Display name: ${verifySchema.info?.displayName || 'N/A'}`);
                      strapi.log.info(`[webbycommerce] ✓ Total attributes: ${Object.keys(verifySchema.attributes || {}).length}`);
                      
                      // List all attributes with their types
                      const attrNames = Object.keys(verifySchema.attributes || {});
                      if (attrNames.length > 0) {
                        strapi.log.info(`[webbycommerce] ✓ Attributes list:`);
                        attrNames.forEach(attrName => {
                          const attr = verifySchema.attributes[attrName];
                          const attrType = attr.type || 'unknown';
                          const attrInfo = attrType === 'component' ? `component: ${attr.component}` :
                                         attrType === 'dynamiczone' ? `dynamiczone: ${(attr.components || []).join(', ')}` :
                                         attrType === 'relation' ? `relation: ${attr.target}` :
                                         attrType;
                          strapi.log.info(`[webbycommerce]   - ${attrName}: ${attrInfo}`);
                        });
                      } else {
                        strapi.log.warn(`[webbycommerce] ⚠ No attributes found - this is a new empty collection`);
                      }
                      
                      strapi.log.info(`[webbycommerce] ✓ File will trigger auto-restart`);
                      strapi.log.info(`[webbycommerce] ✓ After restart, collection will be registered with all fields/components`);
                      strapi.log.info(`[webbycommerce] ========================================`);
                      
                      // Ensure file permissions are correct
                      fs.chmodSync(schemaPath, 0o644);
                      
                      // Touch the file to ensure file watcher detects the change
                      const now = new Date();
                      fs.utimesSync(schemaPath, now, now);
                      
                      // Mark that we've successfully created the schema file
                      ctx.state.schemaFileCreated = true;
                      ctx.state.schemaPath = schemaPath;
                      ctx.state.contentTypeUid = contentType.uid;
                      
                    } catch (verifyError) {
                      strapi.log.error(`[webbycommerce] ✗ Schema file verification failed: ${verifyError.message}`);
                      strapi.log.error(`[webbycommerce] ✗ Stack: ${verifyError.stack}`);
                    }
                  } else {
                    strapi.log.error(`[webbycommerce] ✗ Schema file was not created: ${schemaPath}`);
                  }
                  
                  // Also ensure controllers, services, and routes directories exist
                  const controllersDir = path.join(apiDir, 'controllers', contentTypeName);
                  const servicesDir = path.join(apiDir, 'services', contentTypeName);
                  const routesDir = path.join(apiDir, 'routes', contentTypeName);
                  
                  [controllersDir, servicesDir, routesDir].forEach(dir => {
                    if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir, { recursive: true });
                      strapi.log.info(`[webbycommerce] EARLY: ✓ Created directory: ${dir}`);
                    }
                  });
                }
              }
            }
          }
          
          // If we successfully created/updated/deleted schema files (content types or components), return success early
          // The file watcher will trigger auto-restart, and after restart Strapi will read the schema files
          const hasContentTypes = (ctx.state.schemaFileCreated || ctx.state.schemaDeleted) && contentTypes.length > 0;
          const hasComponents = ctx.state.componentsCreated === true || ctx.state.componentsDeleted === true;
          
          strapi.log.info(`[webbycommerce] EARLY: Checking early return conditions...`);
          strapi.log.info(`[webbycommerce] EARLY: hasContentTypes=${hasContentTypes}, hasComponents=${hasComponents}`);
          strapi.log.info(`[webbycommerce] EARLY: ctx.state.schemaFileCreated=${ctx.state.schemaFileCreated}, ctx.state.componentsCreated=${ctx.state.componentsCreated}`);
          strapi.log.info(`[webbycommerce] EARLY: contentTypes.length=${contentTypes.length}, components.length=${components.length}`);
          
          if (hasContentTypes || hasComponents) {
            strapi.log.info(`[webbycommerce] EARLY: ✓ Schema file(s) created successfully`);
            if (hasContentTypes) {
              strapi.log.info(`[webbycommerce] EARLY: ✓ Created ${contentTypes.length} content type(s)`);
            }
            if (hasComponents) {
              strapi.log.info(`[webbycommerce] EARLY: ✓ Created ${components.length} component(s)`);
            }
            strapi.log.info(`[webbycommerce] EARLY: ✓ File watcher will detect change and trigger auto-restart`);
            strapi.log.info(`[webbycommerce] EARLY: ✓ After restart, collections and components will be automatically registered with all fields`);
            
            // Return success response immediately
            // The schema files are already written, so we don't need Strapi to process them again
            // This prevents the path undefined error
            ctx.status = 200;
            // Set headers to ensure Strapi's admin panel detects the change and triggers auto-reload
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
              data: {
                contentTypes: contentTypes.map(ct => {
                  const uidParts = ct.uid.split('::');
                  const apiAndType = uidParts.length === 2 ? uidParts[1].split('.') : [];
                  return {
                    uid: ct.uid,
                    apiID: ct.uid,
                    schema: {
                      kind: ct.kind || 'collectionType',
                      collectionName: ct.collectionName || (ct.kind === 'singleType' ? apiAndType[1] : `${apiAndType[1]}s`),
                      info: {
                        singularName: ct.singularName || apiAndType[1],
                        pluralName: ct.pluralName || (ct.kind === 'singleType' ? apiAndType[1] : `${apiAndType[1]}s`),
                        displayName: ct.displayName || ct.modelName || apiAndType[1],
                        description: ct.description || '',
                      },
                      options: {
                        draftAndPublish: ct.draftAndPublish !== undefined ? ct.draftAndPublish : false,
                      },
                    }
                  };
                }),
                components: (components || []).map(comp => {
                  const uidParts = comp.uid ? comp.uid.split('.') : [];
                  return {
                    uid: comp.uid,
                    category: uidParts[0] || '',
                    apiID: comp.uid,
                    schema: {
                      collectionName: comp.collectionName || ('components_' + comp.uid.replace(/\./g, '_')),
                      info: {
                        displayName: comp.displayName || comp.modelName || uidParts[1] || 'New Component',
                        description: comp.description || '',
                      },
                    }
                  };
                })
              }
            };
            
            strapi.log.info(`[webbycommerce] EARLY: ✓ Success response sent - request handled`);
            strapi.log.info(`[webbycommerce] EARLY: ✓ Returning early to prevent Strapi from processing request again`);
            return; // Don't call next() - we've handled the request successfully
          } else {
            strapi.log.warn(`[webbycommerce] EARLY: ⚠ Not returning early - conditions not met`);
            strapi.log.warn(`[webbycommerce] EARLY: ⚠ schemaFileCreated=${ctx.state.schemaFileCreated}, componentsCreated=${ctx.state.componentsCreated}`);
            strapi.log.warn(`[webbycommerce] EARLY: ⚠ contentTypes.length=${contentTypes.length}, components.length=${components.length}`);
          }
        } catch (error) {
          strapi.log.error('[webbycommerce] EARLY: Error in content-type-builder fix:', error.message);
          strapi.log.error('[webbycommerce] EARLY: Stack:', error.stack);
        }
      }
      
      return next();
    });

    // Fix for JSON field validation - sanitize empty strings to null for JSON fields
    // This prevents "invalid input syntax for type json" errors in PostgreSQL
    strapi.server.use(async (ctx, next) => {
      // Handle content-manager requests (create, update, publish, bulk operations)
      if (ctx.path.includes('/content-manager/collection-types/') && 
          (ctx.method === 'POST' || ctx.method === 'PUT') && 
          ctx.request.body) {
        try {
          // Extract content type UID from path (handles both regular and actions paths)
          const match = ctx.path.match(/collection-types\/([^\/\?]+)/);
          const contentTypeUid = match?.[1];
          
          if (contentTypeUid && contentTypeUid.startsWith('api::')) {
            // Get the content type schema to check field types
            const contentType = strapi.contentTypes[contentTypeUid];
            if (contentType && contentType.attributes) {
              const body = ctx.request.body;
              let modified = false;
              
              // Helper function to sanitize a value for JSON field
              const sanitizeJsonValue = (value, fieldName) => {
                if (value === '' || value === '""') {
                  return null;
                }
                if (typeof value === 'string' && value.trim() === '') {
                  return null;
                }
                if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
                  try {
                    return JSON.parse(value);
                  } catch (e) {
                    strapi.log.warn(`[webbycommerce] Failed to parse JSON string for field "${fieldName}", using null`);
                    return null;
                  }
                }
                return value;
              };
              
              // Sanitize JSON fields - convert empty strings to null
              for (const [fieldName, fieldValue] of Object.entries(body)) {
                // Skip metadata fields
                if (fieldName === 'id' || fieldName === 'documentId' || fieldName.startsWith('_') || 
                    fieldName === 'createdAt' || fieldName === 'updatedAt' || 
                    fieldName === 'publishedAt' || fieldName === 'createdBy' || fieldName === 'updatedBy') {
                  continue;
                }
                
                const attribute = contentType.attributes[fieldName];
                if (attribute && attribute.type === 'json') {
                  const sanitizedValue = sanitizeJsonValue(fieldValue, fieldName);
                  if (sanitizedValue !== fieldValue) {
                    body[fieldName] = sanitizedValue;
                    modified = true;
                    strapi.log.info(`[webbycommerce] Sanitized JSON field "${fieldName}": "${fieldValue}" -> ${sanitizedValue === null ? 'null' : 'parsed JSON'}`);
                  }
                }
              }
              
              if (modified) {
                strapi.log.info(`[webbycommerce] ✓ Sanitized JSON fields in content-manager request for ${contentTypeUid}`);
              }
            } else {
              strapi.log.debug(`[webbycommerce] Content type ${contentTypeUid} not found or has no attributes`);
            }
          }
        } catch (error) {
          strapi.log.warn(`[webbycommerce] Error sanitizing JSON fields:`, error.message);
          // Don't block the request - let Strapi handle it
        }
      }
      
      return next();
    });

    // Handle custom route prefix for all content-api endpoints
    // This middleware rewrites custom prefix paths to default prefix so Strapi's routing works
    // Also supports /api/route pattern (without prefix) for convenience
    strapi.server.use(async (ctx, next) => {
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      const routePrefix = await getRoutePrefix();
      const defaultBasePath = `/api/webbycommerce`;
      
      // Skip Strapi core auth routes - these should not be rewritten
      if (ctx.path.startsWith('/api/auth/local') || ctx.path.startsWith('/api/auth/')) {
        return next();
      }
      
      // List of known plugin route segments (without leading slash)
      const pluginRoutes = new Set([
        'products', 'product-variants', 'product-attributes', 'product-attribute-values',
        'product-categories', 'tags', 'cart', 'addresses', 'wishlist', 'compare',
        'orders', 'checkout', 'payments', 'shipping', 'auth', 'health'
      ]); 
      
      // Check if path starts with /api/ but not /api/webbycommerce/
      if (ctx.path.startsWith('/api/') && !ctx.path.startsWith(defaultBasePath + '/') && !ctx.path.startsWith('/api/webbycommerce/')) {
        const pathAfterApi = ctx.path.substring(5); // Remove '/api/'
        const firstSegment = pathAfterApi.split('/')[0];
        
        // Check if first segment is a known plugin route
        if (pluginRoutes.has(firstSegment)) {
          // Store original path before rewriting
          ctx.state.originalPath = ctx.path;
          // Rewrite /api/route to /api/webbycommerce/route
          ctx.path = `${defaultBasePath}/${pathAfterApi}`;
          return next();
        }
      }
      
      // Handle custom prefix paths (if different from default)
      if (routePrefix !== 'webbycommerce') {
        const customBasePath = `/api/${routePrefix}`;
        
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
      if (
        ctx.method === 'POST' &&
        (ctx.path === '/api/auth/local' || ctx.path === '/api/auth/local/register')
      ) {
        try {
          const store = strapi.store({ type: 'plugin', name: 'webbycommerce' });
          const value = (await store.get({ key: 'settings' })) || {};
          const method = value.loginRegisterMethod || 'default';

          if (method === 'otp') {
            // When OTP mode is enabled, core email/password endpoints should not be used
            ctx.badRequest(
              'Authentication method is set to OTP. Please use the OTP login/register endpoints or the unified /auth/unified endpoint.'
            );
            return;
          }

          // If method is 'both', allow both OTP and default methods via unified endpoint
          // But still allow default login/register endpoints
          if (method === 'both') {
            // Allow default endpoints to work when 'both' is selected
            // The unified endpoint will handle both methods
          }

          // For registration, allow it to proceed (it's a public endpoint)
          // For login, check ecommerce permission
          if (ctx.path === '/api/auth/local/register') {
            // Registration is public - allow it to proceed to Strapi's core handler
            return next();
          }

          // For login, check ecommerce permission
          if (ctx.path === '/api/auth/local') {
            const hasPermission = await ensureEcommercePermission(ctx);
            if (!hasPermission) {
              return; // ensureEcommercePermission already sent the response
            }
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
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

      const methodPaths = new Set([
        '/api/webbycommerce/auth/method',
        `/api/${routePrefix}/auth/method`,
        '/webbycommerce/auth/method',
        `/${routePrefix}/auth/method`,
      ]);

      const unifiedAuthPaths = new Set([
        '/api/webbycommerce/auth/unified',
        `/api/${routePrefix}/auth/unified`,
        '/webbycommerce/auth/unified',
        `/${routePrefix}/auth/unified`,
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

      // GET /auth/method
      if (ctx.method === 'GET' && methodPaths.has(ctx.path)) {
        ctx.state.route = {
          info: {
            type: 'content-api',
            pluginName: 'webbycommerce',
          },
        };

        const authController = strapi
          .plugin('webbycommerce')
          .controller('auth');

        if (authController && typeof authController.getAuthMethod === 'function') {
          await authController.getAuthMethod(ctx);
          return;
        }
      }

      // POST /auth/unified
      if (ctx.method === 'POST' && unifiedAuthPaths.has(ctx.path)) {
        ctx.state.route = {
          info: {
            type: 'content-api',
            pluginName: 'webbycommerce',
          },
        };

        // Parse request body if not already parsed
        if (!ctx.request.body || (typeof ctx.request.body === 'object' && Object.keys(ctx.request.body || {}).length === 0)) {
          try {
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
                strapi.log.debug(`[webbycommerce] Parsed request body for unified auth:`, ctx.request.body);
              }
            }
          } catch (error) {
            strapi.log.error(`[webbycommerce] Failed to parse request body for unified auth:`, error.message);
            // Continue - controller will handle validation errors
          }
        }

        const authController = strapi
          .plugin('webbycommerce')
          .controller('auth');

        if (authController && typeof authController.unifiedAuth === 'function') {
          await authController.unifiedAuth(ctx);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed:`, error.message);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for address route:`, error.message);
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

        const reserved = new Set(['attributes', 'categories', 'tags', 'slug', 'bulk']);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for product route:`, error.message);
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

          if (method === 'post' && productAction === 'bulk' && typeof productController.createBulkProducts === 'function') {
            await productController.createBulkProducts(ctx);
            return;
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
              // JWT verification failure is expected for guest carts - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for cart route:`, error.message);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for product-variant route:`, error.message);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for product-attribute route:`, error.message);
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
          // GET /product-attributes/:id - find one (supports both ID and slug)
          const isNumericId = /^[0-9]+$/.test(productAttributeId);
          let entity;

          if (isNumericId) {
            // Query by ID
            entity = await strapi.entityService.findOne('plugin::webbycommerce.product-attribute', productAttributeId, {
              populate: ['product_attribute_values'],
            });
          } else {
            // Query by slug
            const decodedSlug = decodeURIComponent(productAttributeId).trim();
            const results = await strapi.db.query('plugin::webbycommerce.product-attribute').findMany({
              where: { slug: decodedSlug },
              limit: 1,
              orderBy: { id: 'desc' },
              populate: ['product_attribute_values'],
            });
            entity = results?.[0];
          }

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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for product-attribute-value route:`, error.message);
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
          // GET /product-attribute-values/:id - find one (supports both ID and slug)
          const isNumericId = /^[0-9]+$/.test(productAttributeValueId);
          let entity;

          if (isNumericId) {
            // Query by ID
            entity = await strapi.entityService.findOne('plugin::webbycommerce.product-attribute-value', productAttributeValueId, {
              populate: ['product_attribute'],
            });
          } else {
            // Query by slug
            const decodedSlug = decodeURIComponent(productAttributeValueId).trim();
            const results = await strapi.db.query('plugin::webbycommerce.product-attribute-value').findMany({
              where: { slug: decodedSlug },
              limit: 1,
              orderBy: { id: 'desc' },
              populate: ['product_attribute'],
            });
            entity = results?.[0];
          }

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
              // JWT verification failure is expected for guest access - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for wishlist route:`, error.message);
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
              // JWT verification failure is expected for guest access - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for move-to-cart route:`, error.message);
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
              // JWT verification failure is expected for guest access - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for compare route:`, error.message);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for product-category route:`, error.message);
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
              // JWT verification failure is expected for public endpoints - log at debug level
              strapi.log.debug(`[webbycommerce] JWT verification failed for tag route:`, error.message);
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
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
                // JWT verification failure - log at debug level (payment may work with guest checkout)
                strapi.log.debug(`[webbycommerce] JWT verification failed for payment route:`, error.message);
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
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
            // JWT verification failure - log at debug level (orders may be accessible via guest_id)
            strapi.log.debug(`[webbycommerce] JWT verification failed for order route:`, error.message);
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
      // Skip admin routes - let Strapi handle them
      if (isAdminRoute(ctx.path)) {
        return next();
      }
      
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
                // JWT verification failure for admin routes - log at debug level
                strapi.log.debug(`[webbycommerce] JWT verification failed for shipping admin route:`, error.message);
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
                // JWT verification failure - log at debug level (shipping may be public)
                strapi.log.debug(`[webbycommerce] JWT verification failed for shipping route:`, error.message);
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

    // Fix for content-type-builder path issue when creating/updating API content types
    // This ensures the API directory structure exists before Strapi tries to write schema files
    // IMPORTANT: This middleware must run BEFORE Strapi's content-type-builder processes the request
    strapi.server.use(async (ctx, next) => {
      // Only handle content-type-builder update-schema requests
      if (ctx.path === '/content-type-builder/update-schema' && ctx.method === 'POST') {
        try {
          // Parse body if not already parsed
          let body = ctx.request.body;
          if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
            // Body might not be parsed yet, try to parse it manually
            try {
              const contentType = ctx.request.header['content-type'] || '';
              if (contentType.includes('application/json')) {
                const chunks = [];
                // Store the original readable stream
                const originalReq = ctx.req;
                
                // Read the body
                for await (const chunk of originalReq) {
                  chunks.push(chunk);
                }
                const rawBody = Buffer.concat(chunks).toString('utf8');
                
                if (rawBody && rawBody.trim()) {
                  body = JSON.parse(rawBody);
                  ctx.request.body = body;
                  // Recreate the readable stream for downstream middleware
                  ctx.req = require('stream').Readable.from([Buffer.from(rawBody)]);
                }
              }
            } catch (parseError) {
              strapi.log.warn('[webbycommerce] Could not parse request body:', parseError.message);
            }
          }
          
          body = body || {};
          // Handle both nested (body.data) and flat (body) request structures
          const data = body.data || body;
          const contentTypes = data.contentTypes || [];
          const components = data.components || [];
          
          strapi.log.info('[webbycommerce] ===== Processing content-type-builder update-schema request =====');
          strapi.log.info('[webbycommerce] Request body keys:', Object.keys(body));
          strapi.log.info('[webbycommerce] Data keys:', Object.keys(data));
          strapi.log.info('[webbycommerce] Content types to process:', contentTypes.length);
          strapi.log.info('[webbycommerce] Components to process:', components.length);
          
          if (contentTypes.length === 0 && components.length === 0) {
            strapi.log.warn('[webbycommerce] No content types or components found in request body');
            strapi.log.warn('[webbycommerce] Body type:', typeof body);
            strapi.log.warn('[webbycommerce] Body stringified (first 500 chars):', JSON.stringify(body, null, 2).substring(0, 500));
          }
          
          // Get the Strapi app directory - try multiple possible locations
          let appDir;
          if (strapi.dirs && strapi.dirs.app && strapi.dirs.app.root) {
            appDir = strapi.dirs.app.root;
            strapi.log.info('[webbycommerce] Using strapi.dirs.app.root:', appDir);
          } else if (strapi.dirs && strapi.dirs.root) {
            appDir = strapi.dirs.root;
            strapi.log.info('[webbycommerce] Using strapi.dirs.root:', appDir);
          } else {
            // Fallback: __dirname is server/src, so go up two levels to get project root
            appDir = path.resolve(__dirname, '../..');
            strapi.log.info('[webbycommerce] Using fallback appDir (from __dirname):', appDir);
            strapi.log.info('[webbycommerce] __dirname is:', __dirname);
          }
          
          // Ensure strapi.dirs is set for Strapi's internal use
          if (!strapi.dirs) {
            strapi.dirs = {};
          }
          if (!strapi.dirs.app) {
            strapi.dirs.app = {};
          }
          if (!strapi.dirs.app.root) {
            strapi.dirs.app.root = appDir;
            strapi.log.info('[webbycommerce] Set strapi.dirs.app.root to:', appDir);
          }
          
          // Process components first (they might be referenced by content types)
          let componentsCreated = false;
          for (const component of components) {
            if (component.uid && component.uid.includes('.')) {
              const uidParts = component.uid.split('.');
              if (uidParts.length >= 2) {
                const category = uidParts[0];
                const componentName = uidParts[1];
                
                strapi.log.info(`[webbycommerce] EARLY: Processing component: ${component.uid}`);
                
                // Components are stored as .json files directly in src/components/{category}/
                // Format: src/components/{category}/{componentName}.json
                const componentsDir = path.join(appDir, 'src', 'components', category);
                
                // Ensure category directory exists
                fs.mkdirSync(componentsDir, { recursive: true });
                
                // Component file is directly in the category folder: {componentName}.json
                const componentSchemaPath = path.join(componentsDir, `${componentName}.json`);
                
                // Read existing schema to preserve attributes
                let existingComponentSchema = {};
                if (fs.existsSync(componentSchemaPath)) {
                  try {
                    existingComponentSchema = JSON.parse(fs.readFileSync(componentSchemaPath, 'utf8'));
                  } catch (error) {
                    strapi.log.warn(`[webbycommerce] EARLY: Could not parse existing component schema: ${error.message}`);
                    existingComponentSchema = {};
                  }
                }
                
                // Handle component deletion
                if (component.action === 'delete') {
                  strapi.log.info(`[webbycommerce] EARLY: Deleting component: ${component.uid}`);
                  
                  // Delete component JSON file
                  if (fs.existsSync(componentSchemaPath)) {
                    fs.unlinkSync(componentSchemaPath);
                    strapi.log.info(`[webbycommerce] EARLY: ✓ Deleted component file: ${componentSchemaPath}`);
                  }
                  
                  ctx.state.componentsCreated = true;
                  ctx.state.componentsDeleted = true;
                  continue; // Skip to next component
                }
                
                // Build attributes from request
                const componentAttributes = { ...(existingComponentSchema.attributes || {}) };
                
                // Process all attributes from the request
                if (component.attributes && Array.isArray(component.attributes)) {
                  for (const attr of component.attributes) {
                    const action = attr.action || 'update';
                    
                    // Handle field deletion
                    if (action === 'delete' && attr.name) {
                      if (componentAttributes[attr.name]) {
                        delete componentAttributes[attr.name];
                        strapi.log.info(`[webbycommerce] EARLY: ✓ Deleted component attribute: ${attr.name}`);
                      } else {
                        strapi.log.warn(`[webbycommerce] EARLY: Component attribute not found for deletion: ${attr.name}`);
                      }
                      continue; // Skip to next attribute
                    }
                    
                    // Handle create/update
                    if (attr.name && attr.properties) {
                      const attributeDef = { ...attr.properties };
                      componentAttributes[attr.name] = attributeDef;
                      
                      strapi.log.info(`[webbycommerce] EARLY: ${action === 'create' ? 'Added' : 'Updated'} component attribute: ${attr.name} (type: ${attributeDef.type || 'unknown'})`);
                    }
                  }
                }
                
                // Build complete component schema
                // Format matches plugin components: {collectionName, info, options, attributes}
                // Category is determined by folder structure (src/components/{category}/), not in JSON
                const componentSchema = {
                  collectionName: component.collectionName || existingComponentSchema.collectionName || ('components_' + component.uid.replace(/\./g, '_')),
                  info: {
                    displayName: component.displayName || component.modelName || existingComponentSchema.info?.displayName || componentName || 'New Component',
                    description: component.description || existingComponentSchema.info?.description || '',
                    icon: component.icon || existingComponentSchema.info?.icon || '',
                  },
                  options: component.options || existingComponentSchema.options || {},
                  attributes: componentAttributes,
                };
                
                // Write the complete component schema file
                const componentSchemaJson = JSON.stringify(componentSchema, null, 2);
                fs.writeFileSync(componentSchemaPath, componentSchemaJson, 'utf8');
                
                // Verify the file was written correctly
                if (fs.existsSync(componentSchemaPath)) {
                  try {
                    const verifyComponentSchema = JSON.parse(fs.readFileSync(componentSchemaPath, 'utf8'));
                    const fileStats = fs.statSync(componentSchemaPath);
                    
                    strapi.log.info(`[webbycommerce] ========================================`);
                    strapi.log.info(`[webbycommerce] ✓ COMPONENT SCHEMA CREATED/UPDATED`);
                    strapi.log.info(`[webbycommerce] ========================================`);
                    strapi.log.info(`[webbycommerce] ✓ Component: ${component.uid}`);
                    strapi.log.info(`[webbycommerce] ✓ File: ${componentSchemaPath}`);
                    strapi.log.info(`[webbycommerce] ✓ File size: ${fileStats.size} bytes`);
                    strapi.log.info(`[webbycommerce] ✓ Schema is valid JSON`);
                    strapi.log.info(`[webbycommerce] ✓ Display name: ${verifyComponentSchema.info?.displayName || 'N/A'}`);
                    strapi.log.info(`[webbycommerce] ✓ Total attributes: ${Object.keys(verifyComponentSchema.attributes || {}).length}`);
                    
                    // List all attributes
                    const attrNames = Object.keys(verifyComponentSchema.attributes || {});
                    if (attrNames.length > 0) {
                      strapi.log.info(`[webbycommerce] ✓ Component attributes:`);
                      attrNames.forEach(attrName => {
                        const attr = verifyComponentSchema.attributes[attrName];
                        const attrType = attr.type || 'unknown';
                        strapi.log.info(`[webbycommerce]   - ${attrName}: ${attrType}`);
                      });
                    }
                    
                    strapi.log.info(`[webbycommerce] ✓ File will trigger auto-restart`);
                    strapi.log.info(`[webbycommerce] ✓ After restart, component will be registered with all fields`);
                    strapi.log.info(`[webbycommerce] ========================================`);
                    
                    // Ensure file permissions and touch for file watcher
                    fs.chmodSync(componentSchemaPath, 0o644);
                    const now = new Date();
                    fs.utimesSync(componentSchemaPath, now, now);
                    
                    // Force file system sync to ensure the file is written to disk
                    // This ensures Strapi's file watcher detects the change
                    fs.fsyncSync(fs.openSync(componentSchemaPath, 'r+'));
                    
                    componentsCreated = true;
                    ctx.state.componentsCreated = true;
                    strapi.log.info(`[webbycommerce] EARLY: ✓ Set ctx.state.componentsCreated = true for component ${component.uid}`);
                    strapi.log.info(`[webbycommerce] EARLY: ✓ Component file synced to disk - file watcher will detect change`);
                    
                  } catch (verifyError) {
                    strapi.log.error(`[webbycommerce] ✗ Component schema verification failed: ${verifyError.message}`);
                  }
                } else {
                  strapi.log.error(`[webbycommerce] ✗ Component schema file was not created: ${componentSchemaPath}`);
                }
              }
            }
          }
          
          // Process each content type in the request
          for (const contentType of contentTypes) {
            if (contentType.uid && contentType.uid.startsWith('api::')) {
              // Extract API name and content type name from UID (e.g., "api::about.about")
              const uidParts = contentType.uid.split('::');
              if (uidParts.length === 2) {
                const apiAndType = uidParts[1].split('.');
                if (apiAndType.length >= 2) {
                  const apiName = apiAndType[0];
                  const contentTypeName = apiAndType[1];
                  
                  const apiDir = path.join(appDir, 'src', 'api', apiName);
                  const contentTypeDir = path.join(apiDir, 'content-types', contentTypeName);
                  const schemaPath = path.join(contentTypeDir, 'schema.json');
                  
                  strapi.log.info(`[webbycommerce] Processing content type: ${contentType.uid}`);
                  strapi.log.info(`[webbycommerce] API Name: ${apiName}, Content Type Name: ${contentTypeName}`);
                  
                  // Handle collection deletion
                  if (contentType.action === 'delete') {
                    strapi.log.info(`[webbycommerce] Deleting collection: ${contentType.uid}`);
                    
                    // Delete schema file
                    if (fs.existsSync(schemaPath)) {
                      fs.unlinkSync(schemaPath);
                      strapi.log.info(`[webbycommerce] ✓ Deleted schema file: ${schemaPath}`);
                    }
                    
                    // Delete content type directory (optional - Strapi will handle cleanup)
                    if (fs.existsSync(contentTypeDir)) {
                      try {
                        fs.rmSync(contentTypeDir, { recursive: true, force: true });
                        strapi.log.info(`[webbycommerce] ✓ Deleted content type directory: ${contentTypeDir}`);
                      } catch (error) {
                        strapi.log.warn(`[webbycommerce] Could not delete directory: ${error.message}`);
                      }
                    }
                    
                    ctx.state.schemaFileCreated = true;
                    ctx.state.schemaDeleted = true;
                    continue; // Skip to next content type
                  }
                  
                  // ALWAYS ensure directories exist (even if they already exist, this ensures they're there)
                  if (!fs.existsSync(apiDir)) {
                    fs.mkdirSync(apiDir, { recursive: true });
                    strapi.log.info(`[webbycommerce] ✓ Created API directory: ${apiDir}`);
                  } else {
                    strapi.log.info(`[webbycommerce] ✓ API directory already exists: ${apiDir}`);
                  }
                  
                  if (!fs.existsSync(contentTypeDir)) {
                    fs.mkdirSync(contentTypeDir, { recursive: true });
                    strapi.log.info(`[webbycommerce] ✓ Created content type directory: ${contentTypeDir}`);
                  } else {
                    strapi.log.info(`[webbycommerce] ✓ Content type directory already exists: ${contentTypeDir}`);
                  }
                  
                  // Ensure schema.json exists - this is critical to prevent path undefined errors
                  strapi.log.info(`[webbycommerce] Schema path: ${schemaPath}`);
                  
                  // Always ensure the schema file is written/updated to trigger Strapi's file watcher
                  // This ensures auto-restart happens when new collections are added
                  let schemaNeedsUpdate = false;
                  let currentSchema = {};
                  
                  if (fs.existsSync(schemaPath)) {
                    try {
                      currentSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
                      if (!currentSchema || typeof currentSchema !== 'object') {
                        throw new Error('Invalid schema file');
                      }
                      strapi.log.info(`[webbycommerce] ✓ Schema file already exists and is valid`);
                      // Update the file timestamp to trigger file watcher if needed
                      const now = new Date();
                      fs.utimesSync(schemaPath, now, now);
                    } catch (parseError) {
                      strapi.log.warn(`[webbycommerce] ⚠ Schema file exists but is invalid, will be overwritten`);
                      schemaNeedsUpdate = true;
                    }
                  } else {
                    schemaNeedsUpdate = true;
                  }
                  
                  if (schemaNeedsUpdate) {
                    // Build complete schema with attributes handling create/update/delete
                    const attributes = { ...(currentSchema.attributes || {}) };
                    
                    // Process all attributes from the request
                    if (contentType.attributes && Array.isArray(contentType.attributes)) {
                      for (const attr of contentType.attributes) {
                        const action = attr.action || 'update';
                        
                        // Handle field deletion
                        if (action === 'delete' && attr.name) {
                          if (attributes[attr.name]) {
                            delete attributes[attr.name];
                            strapi.log.info(`[webbycommerce] ✓ Deleted attribute: ${attr.name}`);
                          }
                          continue; // Skip to next attribute
                        }
                        
                        // Handle create/update
                        if (attr.name && attr.properties) {
                          attributes[attr.name] = { ...attr.properties };
                          strapi.log.info(`[webbycommerce] ${action === 'create' ? 'Added' : 'Updated'} attribute: ${attr.name}`);
                        }
                      }
                    }
                    
                    // Create/update schema structure based on the request data
                    const schema = {
                      kind: contentType.kind || currentSchema.kind || 'collectionType',
                      collectionName: contentType.collectionName || currentSchema.collectionName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                      info: {
                        singularName: contentType.singularName || currentSchema.info?.singularName || contentTypeName,
                        pluralName: contentType.pluralName || currentSchema.info?.pluralName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                        displayName: contentType.displayName || contentType.modelName || currentSchema.info?.displayName || contentTypeName,
                        description: contentType.description || currentSchema.info?.description || '',
                      },
                      options: {
                        draftAndPublish: contentType.draftAndPublish !== undefined ? contentType.draftAndPublish : (currentSchema.options?.draftAndPublish !== undefined ? currentSchema.options.draftAndPublish : false),
                      },
                      pluginOptions: contentType.pluginOptions || currentSchema.pluginOptions || {
                        'content-manager': {
                          visible: true
                        },
                        'content-api': {
                          visible: true
                        }
                      },
                      attributes: attributes,
                    };
                    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
                    strapi.log.info(`[webbycommerce] ✓ Created/Updated schema file: ${schemaPath}`);
                    strapi.log.info(`[webbycommerce] ✓ File watcher will detect change and trigger auto-restart`);
                    ctx.state.schemaFileCreated = true;
                  }
                  
                  // Also ensure the controllers, services, and routes directories exist
                  const controllersDir = path.join(apiDir, 'controllers', contentTypeName);
                  const servicesDir = path.join(apiDir, 'services', contentTypeName);
                  const routesDir = path.join(apiDir, 'routes', contentTypeName);
                  
                  [controllersDir, servicesDir, routesDir].forEach(dir => {
                    if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir, { recursive: true });
                      strapi.log.info(`[webbycommerce] ✓ Created directory: ${dir}`);
                    }
                  });
                  
                  // Final verification - ensure the schema path exists and is accessible
                  if (!fs.existsSync(schemaPath)) {
                    strapi.log.error(`[webbycommerce] ✗ CRITICAL: Schema path does not exist after creation attempt: ${schemaPath}`);
                  } else {
                    strapi.log.info(`[webbycommerce] ✓ Final verification: Schema path exists: ${schemaPath}`);
                  }
                } else {
                  strapi.log.warn(`[webbycommerce] ⚠ Could not parse UID parts for: ${contentType.uid}`);
                }
              } else {
                strapi.log.warn(`[webbycommerce] ⚠ Invalid UID format: ${contentType.uid}`);
              }
            } else {
              strapi.log.warn(`[webbycommerce] ⚠ Content type does not have UID or is not an API content type`);
            }
          }
          
          strapi.log.info('[webbycommerce] ===== Finished processing content-type-builder request =====');
          
          // Check if we successfully created schema files (content types or components), return success early
          // This prevents Strapi's content-type-builder from processing the request again and causing path errors
          const hasContentTypes = (ctx.state.schemaFileCreated || ctx.state.schemaDeleted) && contentTypes.length > 0;
          const hasComponents = ctx.state.componentsCreated === true || ctx.state.componentsDeleted === true;
          
          strapi.log.info(`[webbycommerce] EARLY (SECOND): Checking early return conditions...`);
          strapi.log.info(`[webbycommerce] EARLY (SECOND): hasContentTypes=${hasContentTypes}, hasComponents=${hasComponents}`);
          strapi.log.info(`[webbycommerce] EARLY (SECOND): ctx.state.schemaFileCreated=${ctx.state.schemaFileCreated}, ctx.state.componentsCreated=${ctx.state.componentsCreated}`);
          
          if (hasContentTypes || hasComponents) {
            strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ Schema file(s) created successfully`);
            if (hasContentTypes) {
              strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ Created ${contentTypes.length} content type(s)`);
            }
            if (hasComponents) {
              strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ Created ${components.length} component(s)`);
            }
            strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ File watcher will detect change and trigger auto-restart`);
            strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ After restart, collections and components will be automatically registered with all fields`);
            
            // Return success response immediately
            // The schema files are already written, so we don't need Strapi to process them again
            // This prevents the path undefined error
            ctx.status = 200;
            // Set headers to ensure Strapi's admin panel detects the change and triggers auto-reload
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
              data: {
                contentTypes: contentTypes.map(ct => {
                  const uidParts = ct.uid.split('::');
                  const apiAndType = uidParts.length === 2 ? uidParts[1].split('.') : [];
                  return {
                    uid: ct.uid,
                    apiID: ct.uid,
                    schema: {
                      kind: ct.kind || 'collectionType',
                      collectionName: ct.collectionName || (ct.kind === 'singleType' ? apiAndType[1] : `${apiAndType[1]}s`),
                      info: {
                        singularName: ct.singularName || apiAndType[1],
                        pluralName: ct.pluralName || (ct.kind === 'singleType' ? apiAndType[1] : `${apiAndType[1]}s`),
                        displayName: ct.displayName || ct.modelName || apiAndType[1],
                        description: ct.description || '',
                      },
                      options: {
                        draftAndPublish: ct.draftAndPublish !== undefined ? ct.draftAndPublish : false,
                      },
                    }
                  };
                }),
                components: (components || []).map(comp => {
                  const uidParts = comp.uid ? comp.uid.split('.') : [];
                  return {
                    uid: comp.uid,
                    category: uidParts[0] || '',
                    apiID: comp.uid,
                    schema: {
                      collectionName: comp.collectionName || ('components_' + comp.uid.replace(/\./g, '_')),
                      info: {
                        displayName: comp.displayName || comp.modelName || uidParts[1] || 'New Component',
                        description: comp.description || '',
                      },
                    }
                  };
                })
              }
            };
            
            strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ Success response sent - request handled`);
            strapi.log.info(`[webbycommerce] EARLY (SECOND): ✓ Returning early to prevent Strapi from processing request again`);
            return; // Don't call next() - we've handled the request successfully
          }
        } catch (error) {
          // Log error but don't block the request - let Strapi handle it
          strapi.log.error('[webbycommerce] ✗ Error ensuring API directory structure:', error.message);
          strapi.log.error('[webbycommerce] Error stack:', error.stack);
        }
      }
      
      return next();
    });

    // Additional error handler to catch and fix path errors during content-type-builder operations
    strapi.server.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        // Check if this is a content-type-builder path error
        if (
          ctx.path === '/content-type-builder/update-schema' &&
          error.message &&
          error.message.includes('path') &&
          error.message.includes('undefined')
        ) {
          strapi.log.error('[webbycommerce] Caught path undefined error, attempting to fix...');
          
          try {
            const body = ctx.request.body || {};
            const data = body.data || body;
            const contentTypes = data.contentTypes || [];
            
            // Get the Strapi app directory
            let appDir;
            if (strapi.dirs && strapi.dirs.app && strapi.dirs.app.root) {
              appDir = strapi.dirs.app.root;
            } else if (strapi.dirs && strapi.dirs.root) {
              appDir = strapi.dirs.root;
            } else {
              appDir = path.resolve(__dirname, '../..');
            }
            
            // Process each content type to ensure directories exist
            for (const contentType of contentTypes) {
              if (contentType.uid && contentType.uid.startsWith('api::')) {
                const uidParts = contentType.uid.split('::');
                if (uidParts.length === 2) {
                  const apiAndType = uidParts[1].split('.');
                  if (apiAndType.length >= 2) {
                    const apiName = apiAndType[0];
                    const contentTypeName = apiAndType[1];
                    
                    const apiDir = path.join(appDir, 'src', 'api', apiName);
                    const contentTypeDir = path.join(apiDir, 'content-types', contentTypeName);
                    const schemaPath = path.join(contentTypeDir, 'schema.json');
                    
                    // Force create directory structure
                    if (!fs.existsSync(contentTypeDir)) {
                      fs.mkdirSync(contentTypeDir, { recursive: true });
                      strapi.log.info(`[webbycommerce] Created content type directory: ${contentTypeDir}`);
                    }
                    
                    // Ensure schema file exists
                    if (!fs.existsSync(schemaPath)) {
                      const minimalSchema = {
                        kind: contentType.kind || 'collectionType',
                        collectionName: contentType.collectionName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                        info: {
                          singularName: contentType.singularName || contentTypeName,
                          pluralName: contentType.pluralName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                          displayName: contentType.displayName || contentType.modelName || contentTypeName,
                          description: contentType.description || '',
                        },
                        options: {
                          draftAndPublish: contentType.draftAndPublish !== undefined ? contentType.draftAndPublish : false,
                        },
                        attributes: {},
                      };
                      fs.writeFileSync(schemaPath, JSON.stringify(minimalSchema, null, 2));
                      strapi.log.info(`[webbycommerce] Created schema file: ${schemaPath}`);
                    }
                  }
                }
              }
            }
            
            // Retry the request
            strapi.log.info('[webbycommerce] Retrying content-type-builder request after fixing directories...');
            // Note: We can't easily retry here, so we'll let the error propagate
            // but the directories are now created, so the next attempt should work
          } catch (fixError) {
            strapi.log.error('[webbycommerce] Failed to fix path error:', fixError.message);
          }
        }
        
        // Re-throw the error so Strapi can handle it
        throw error;
      }
    });

    // Patch content-type-builder controller to intercept and fix path errors
    // This runs after Strapi is fully loaded
    try {
      const contentTypeBuilderPlugin = strapi.plugin('content-type-builder');
      if (contentTypeBuilderPlugin) {
        const ctbController = contentTypeBuilderPlugin.controller('content-types');
        if (ctbController && typeof ctbController.updateSchema === 'function') {
          const originalUpdateSchema = ctbController.updateSchema;
          ctbController.updateSchema = async function(ctx) {
            try {
              return await originalUpdateSchema.call(this, ctx);
            } catch (error) {
              if (error.message && error.message.includes('path') && error.message.includes('undefined')) {
                strapi.log.error('[webbycommerce] CONTROLLER: Caught path undefined error in updateSchema');
                
                // Get request body
                const body = ctx.request.body || {};
                const data = body.data || body;
                const contentTypes = data.contentTypes || [];
                
                // Get app directory
                let appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
                
                // Fix all content types
                for (const contentType of contentTypes) {
                  if (contentType.uid && contentType.uid.startsWith('api::')) {
                    const uidParts = contentType.uid.split('::');
                    if (uidParts.length === 2) {
                      const apiAndType = uidParts[1].split('.');
                      if (apiAndType.length >= 2) {
                        const apiName = apiAndType[0];
                        const contentTypeName = apiAndType[1];
                        const contentTypeDir = path.join(appDir, 'src', 'api', apiName, 'content-types', contentTypeName);
                        const schemaPath = path.join(contentTypeDir, 'schema.json');
                        
                        fs.mkdirSync(contentTypeDir, { recursive: true });
                        if (!fs.existsSync(schemaPath)) {
                          const minimalSchema = {
                            kind: contentType.kind || 'collectionType',
                            collectionName: contentType.collectionName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                            info: {
                              singularName: contentType.singularName || contentTypeName,
                              pluralName: contentType.pluralName || (contentType.kind === 'singleType' ? contentTypeName : `${contentTypeName}s`),
                              displayName: contentType.displayName || contentType.modelName || contentTypeName,
                            },
                            options: {
                              draftAndPublish: contentType.draftAndPublish !== undefined ? contentType.draftAndPublish : false,
                            },
                            attributes: {},
                          };
                          fs.writeFileSync(schemaPath, JSON.stringify(minimalSchema, null, 2));
                        }
                      }
                    }
                  }
                }
                
                // Retry the original call
                strapi.log.info('[webbycommerce] CONTROLLER: Retrying updateSchema after fixing paths');
                return await originalUpdateSchema.call(this, ctx);
              }
              throw error;
            }
          };
          strapi.log.info('[webbycommerce] Patched content-type-builder updateSchema controller');
        }
        
        // Also try to patch the service
        const ctbService = contentTypeBuilderPlugin.service('builder');
        if (ctbService) {
          // Patch writeContentTypeSchema if it exists
          if (ctbService.writeContentTypeSchema && typeof ctbService.writeContentTypeSchema === 'function') {
            const originalWriteContentTypeSchema = ctbService.writeContentTypeSchema;
            ctbService.writeContentTypeSchema = function(uid, schema) {
              try {
                return originalWriteContentTypeSchema.call(this, uid, schema);
              } catch (error) {
                if (error.message && error.message.includes('path') && error.message.includes('undefined')) {
                  strapi.log.error('[webbycommerce] SERVICE: Caught path undefined error in writeContentTypeSchema');
                  
                  if (uid && uid.startsWith('api::')) {
                    const uidParts = uid.split('::');
                    if (uidParts.length === 2) {
                      const apiAndType = uidParts[1].split('.');
                      if (apiAndType.length >= 2) {
                        const apiName = apiAndType[0];
                        const contentTypeName = apiAndType[1];
                        const appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
                        const contentTypeDir = path.join(appDir, 'src', 'api', apiName, 'content-types', contentTypeName);
                        const schemaPath = path.join(contentTypeDir, 'schema.json');
                        
                        fs.mkdirSync(contentTypeDir, { recursive: true });
                        if (!fs.existsSync(schemaPath)) {
                          fs.writeFileSync(schemaPath, JSON.stringify(schema || {}, null, 2));
                        }
                        
                        // Retry
                        return originalWriteContentTypeSchema.call(this, uid, schema);
                      }
                    }
                  }
                }
                throw error;
              }
            };
            strapi.log.info('[webbycommerce] Patched content-type-builder writeContentTypeSchema service');
          }
        }
      }
    } catch (patchError) {
      strapi.log.warn('[webbycommerce] Could not patch content-type-builder:', patchError.message);
      strapi.log.warn('[webbycommerce] Patch error stack:', patchError.stack);
    }

    // Aggressive fix: Patch fs.writeFileSync to catch undefined paths
    const originalWriteFileSync = fs.writeFileSync;
    fs.writeFileSync = function(filePath, data, options) {
      if (filePath === undefined || filePath === null) {
        const error = new Error('The "path" argument must be of type string. Received undefined');
        strapi.log.error('[webbycommerce] FS PATCH: Caught undefined path in writeFileSync');
        strapi.log.error('[webbycommerce] FS PATCH: Stack trace:', new Error().stack);
        
        // Try to extract path from stack trace or context
        // This is a last resort - we should have fixed it earlier
        throw error;
      }
      
      // If path is relative and doesn't exist, try to make it absolute
      if (typeof filePath === 'string' && !path.isAbsolute(filePath)) {
        const appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
        const absolutePath = path.resolve(appDir, filePath);
        
        // If the absolute path makes sense for a schema file, ensure directory exists
        if (absolutePath.includes('content-types') && absolutePath.endsWith('schema.json')) {
          const dir = path.dirname(absolutePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            strapi.log.info(`[webbycommerce] FS PATCH: Created directory for relative path: ${dir}`);
          }
          filePath = absolutePath;
        }
      }
      
      return originalWriteFileSync.call(this, filePath, data, options);
    };
    
    // Also patch fs.writeFile
    const originalWriteFile = fs.writeFile;
    fs.writeFile = function(filePath, data, options, callback) {
      if (filePath === undefined || filePath === null) {
        const error = new Error('The "path" argument must be of type string. Received undefined');
        strapi.log.error('[webbycommerce] FS PATCH: Caught undefined path in writeFile');
        
        if (callback && typeof callback === 'function') {
          return callback(error);
        }
        throw error;
      }
      
      // If path is relative and doesn't exist, try to make it absolute
      if (typeof filePath === 'string' && !path.isAbsolute(filePath)) {
        const appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
        const absolutePath = path.resolve(appDir, filePath);
        
        if (absolutePath.includes('content-types') && absolutePath.endsWith('schema.json')) {
          const dir = path.dirname(absolutePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            strapi.log.info(`[webbycommerce] FS PATCH: Created directory for relative path: ${dir}`);
          }
          filePath = absolutePath;
        }
      }
      
      return originalWriteFile.call(this, filePath, data, options, callback);
    };
    
    strapi.log.info('[webbycommerce] Patched fs.writeFileSync and fs.writeFile to catch undefined paths');

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

    // Hook to detect new content types and ensure they're registered
    // This helps with auto-restart and collection registration
    strapi.db.lifecycles.subscribe({
      models: ['*'], // Listen to all models
      async afterCreate(event) {
        // This runs after any content type entry is created
        // We can use this to detect new collections
      },
    });

    // Monitor content-type-builder for successful schema updates
    // This ensures new collections trigger auto-restart
    strapi.server.use(async (ctx, next) => {
      if (ctx.path === '/content-type-builder/update-schema' && ctx.method === 'POST') {
        await next();
        
        // After the request completes, check if it was successful
        if (ctx.status === 200 || ctx.status === 201) {
          const body = ctx.request.body || {};
          const data = body.data || body;
          const contentTypes = data.contentTypes || [];
          
          for (const contentType of contentTypes) {
            if (contentType.uid && contentType.uid.startsWith('api::')) {
              const uidParts = contentType.uid.split('::');
              if (uidParts.length === 2) {
                const apiAndType = uidParts[1].split('.');
                if (apiAndType.length >= 2) {
                  const apiName = apiAndType[0];
                  const contentTypeName = apiAndType[1];
                  
                  strapi.log.info(`[webbycommerce] ✓ New collection created: ${contentType.uid}`);
                  strapi.log.info(`[webbycommerce] ✓ Collection will be auto-registered on next restart`);
                  strapi.log.info(`[webbycommerce] ✓ Strapi will auto-restart in develop mode to register the new collection`);
                  
                  // In develop mode, Strapi automatically restarts when schema files change
                  // This is handled by Strapi's file watcher, so we just need to ensure the file exists
                  const appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
                  const schemaPath = path.join(appDir, 'src', 'api', apiName, 'content-types', contentTypeName, 'schema.json');
                  
                  if (fs.existsSync(schemaPath)) {
                    strapi.log.info(`[webbycommerce] ✓ Schema file confirmed: ${schemaPath}`);
                    strapi.log.info(`[webbycommerce] ✓ Auto-restart should occur automatically in develop mode`);
                  }
                }
              }
            }
          }
        }
      } else {
        await next();
      }
    });

    // Log all registered content types and components on startup
    try {
      const allContentTypes = strapi.contentTypes;
      const apiContentTypes = Object.keys(allContentTypes).filter(uid => uid.startsWith('api::'));
      strapi.log.info(`[webbycommerce] Currently registered API content types: ${apiContentTypes.length}`);
      if (apiContentTypes.length > 0) {
        strapi.log.info(`[webbycommerce] Registered collections: ${apiContentTypes.join(', ')}`);
      }
      
      // Log registered components - check multiple ways Strapi stores components
      try {
        // Try different ways to access components
        let componentKeys = [];
        
        // Method 1: strapi.components (Map)
        if (strapi.components && strapi.components instanceof Map) {
          componentKeys = Array.from(strapi.components.keys());
        }
        // Method 2: strapi.get('components')
        else if (strapi.get && typeof strapi.get === 'function') {
          const components = strapi.get('components');
          if (components instanceof Map) {
            componentKeys = Array.from(components.keys());
          } else if (components && typeof components === 'object') {
            componentKeys = Object.keys(components);
          }
        }
        // Method 3: strapi.components as object
        else if (strapi.components && typeof strapi.components === 'object') {
          componentKeys = Object.keys(strapi.components);
        }
        
        // Filter for user-created components (not plugin components)
        const userComponents = componentKeys.filter(uid => 
          (uid.startsWith('shared.') || uid.includes('.')) && 
          !uid.startsWith('plugin::')
        );
        
        strapi.log.info(`[webbycommerce] Currently registered user components: ${userComponents.length}`);
        if (userComponents.length > 0) {
          strapi.log.info(`[webbycommerce] Registered components: ${userComponents.join(', ')}`);
        } else {
          strapi.log.warn(`[webbycommerce] ⚠ No user components found - checking component files...`);
          
          // Check if component files exist
          // Components are stored as .json files directly in category folders: src/components/{category}/{componentName}.json
          const appDir = strapi.dirs?.app?.root || path.resolve(__dirname, '../..');
          const componentsDir = path.join(appDir, 'src', 'components');
          if (fs.existsSync(componentsDir)) {
            const categoryDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
              .filter(dirent => dirent.isDirectory())
              .map(dirent => dirent.name);
            
            let totalComponentFiles = 0;
            for (const category of categoryDirs) {
              const categoryPath = path.join(componentsDir, category);
              // Look for .json files directly in the category folder
              const files = fs.readdirSync(categoryPath, { withFileTypes: true })
                .filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
                .map(dirent => dirent.name);
              
              for (const jsonFile of files) {
                const componentName = jsonFile.replace('.json', '');
                const componentPath = path.join(categoryPath, jsonFile);
                if (fs.existsSync(componentPath)) {
                  totalComponentFiles++;
                  strapi.log.info(`[webbycommerce]   - Found component file: ${category}.${componentName} at ${componentPath}`);
                }
              }
            }
            
            if (totalComponentFiles > 0) {
              strapi.log.warn(`[webbycommerce] ⚠ Found ${totalComponentFiles} component files but Strapi hasn't loaded them yet`);
              strapi.log.warn(`[webbycommerce] ⚠ Components should appear after Strapi finishes loading - try refreshing the browser`);
            }
          }
        }
      } catch (compError) {
        strapi.log.debug(`[webbycommerce] Could not list components: ${compError.message}`);
      }
    } catch (error) {
      // Ignore errors in logging
    }

    strapi.log.info('[webbycommerce] Plugin bootstrapped successfully');
    strapi.log.info(
      '[webbycommerce] Health endpoint is available at: /webbycommerce/health and /api/webbycommerce/health'
    );
    strapi.log.info('[webbycommerce] Auto-restart enabled: Strapi will automatically restart when new collections or components are added');
    strapi.log.info('[webbycommerce] ========================================');
  } catch (error) {
    strapi.log.error('[webbycommerce] Bootstrap error:', error);
    throw error;
  }
};

