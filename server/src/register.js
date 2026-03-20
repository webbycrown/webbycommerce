'use strict';

module.exports = async ({ strapi }) => {
  strapi.log.info('[webbycommerce] ========================================');
  strapi.log.info('[webbycommerce] Registering plugin...');

  // Register plugin components
  try {
    // Register shipping-zone-location component
    const shippingZoneSchema = require('./components/shipping-zone-location.json');
    const shippingZoneUid = 'plugin::webbycommerce.shipping-zone-location';

    const existingShippingZone = strapi.get('components').get(shippingZoneUid);
    if (!existingShippingZone) {
      strapi.get('components').set(shippingZoneUid, {
        ...shippingZoneSchema,
        uid: shippingZoneUid,
        modelType: 'component',
        modelName: 'shipping-zone-location',
        globalId: 'ComponentPluginWebbycommerceShippingZoneLocation',
        category: shippingZoneSchema.category || 'WebbyCommerce Shared',
      });
      strapi.log.info(`[webbycommerce] Component registered: ${shippingZoneUid}`);
    } else {
      strapi.log.info(`[webbycommerce] Component already exists: ${shippingZoneUid}`);
    }

    // Register content-block component
    const contentBlockSchema = require('./components/content-block.json');
    const contentBlockUid = 'plugin::webbycommerce.content-block';

    const existingContentBlock = strapi.get('components').get(contentBlockUid);
    if (!existingContentBlock) {
      strapi.get('components').set(contentBlockUid, {
        ...contentBlockSchema,
        uid: contentBlockUid,
        modelType: 'component',
        modelName: 'content-block',
        globalId: 'ComponentPluginWebbycommerceContentBlock',
        category: contentBlockSchema.category || 'WebbyCommerce Shared',
      });
      strapi.log.info(`[webbycommerce] Component registered: ${contentBlockUid}`);
    } else {
      strapi.log.info(`[webbycommerce] Component already exists: ${contentBlockUid}`);
    }
  } catch (error) {
    strapi.log.error('[webbycommerce] Failed to register component:', error.message);
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

