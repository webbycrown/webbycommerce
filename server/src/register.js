'use strict';

const fs = require('fs');
const path = require('path');

module.exports = async ({ strapi }) => {
  strapi.log.info('[webbycommerce] ========================================');
  strapi.log.info('[webbycommerce] Registering plugin...');

  // Register plugin-scoped components early (before DB init).
  // Strapi only auto-loads app components from src/components/*, so plugin components must be registered manually
  // if referenced via `plugin::pluginName.category.componentName`.
  try {
    const schemaPath = path.join(__dirname, 'components', 'shared', 'shipping-zone-location.json');
    const componentSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const uid = 'plugin::webbycommerce.shared.shipping-zone-location';

    const registered = strapi.get('components').get(uid);
    if (!registered) {
      strapi.get('components').set(uid, {
        ...componentSchema,
        __schema__: JSON.parse(JSON.stringify(componentSchema)),
        uid,
        category: 'shared',
        modelType: 'component',
        modelName: 'shipping-zone-location',
        globalId: componentSchema.globalId || 'ComponentPluginStrapiAdvancedEcommerceSharedShippingZoneLocation',
      });
      strapi.log.info(`[webbycommerce] Registered component: ${uid}`);
    }
  } catch (error) {
    strapi.log.error('[webbycommerce] Failed to register plugin component shipping-zone-location:', error.message);
    strapi.log.error('[webbycommerce] Error stack:', error.stack);
  }

  // Verify routes are loaded
  try {
    const routes = require('./routes');
    strapi.log.info('[webbycommerce] Routes structure:', JSON.stringify({
      hasAdmin: !!routes.admin,
      hasContentApi: !!routes['content-api'],
      adminRoutes: routes.admin?.routes?.length || 0,
      contentApiRoutes: routes['content-api']?.routes?.length || 0,
    }, null, 2));
  } catch (error) {
    strapi.log.error('[webbycommerce] Error loading routes:', error.message);
    strapi.log.error('[webbycommerce] Error stack:', error.stack);
  }

  strapi.log.info('[webbycommerce] Plugin registered successfully');
  strapi.log.info('[webbycommerce] ========================================');
};

