'use strict';

const PLUGIN_ID = 'webbycommerce';
const SETTINGS_KEY = 'settings';

const getStore = () => {
  return strapi.store({ type: 'plugin', name: PLUGIN_ID });
};

const sanitizeOrigins = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }
  return input
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter((value) => value.length > 0);
};

module.exports = {
  async health(ctx) {
    strapi.log.info(`[${PLUGIN_ID}] Health endpoint called`);
    ctx.body = {
      status: 'ok',
      plugin: PLUGIN_ID,
      message: 'Ecommerce plugin is running',
      timestamp: new Date().toISOString(),
    };
  },

  async getSettings(ctx) {
    const store = getStore();
    const value = (await store.get({ key: SETTINGS_KEY })) || {};
    const allowedOrigins = sanitizeOrigins(value.allowedOrigins);
    const loginRegisterMethod = value.loginRegisterMethod || 'default';
    const routePrefix = value.routePrefix || 'webbycommerce';
    const smtp = value.smtp || null;
    const shippingType = value.shippingType || 'single';
    ctx.body = {
      allowedOrigins,
      loginRegisterMethod,
      routePrefix,
      smtp,
      shippingType,
    };
  },

  async updateSettings(ctx) {
    const store = getStore();
    const body = ctx.request.body || {};
    const currentValue = (await store.get({ key: SETTINGS_KEY })) || {};

    // Merge allowedOrigins
    const allowedOrigins =
      body.allowedOrigins !== undefined
        ? sanitizeOrigins(body.allowedOrigins)
        : sanitizeOrigins(currentValue.allowedOrigins);

    // Merge loginRegisterMethod with validation
    let loginRegisterMethod =
      body.loginRegisterMethod !== undefined
        ? body.loginRegisterMethod
        : currentValue.loginRegisterMethod || 'default';

    if (loginRegisterMethod !== 'default' && loginRegisterMethod !== 'otp') {
      return ctx.badRequest('Invalid loginRegisterMethod. Must be "default" or "otp".');
    }

    // Merge routePrefix with sanitization
    let routePrefix =
      body.routePrefix !== undefined
        ? body.routePrefix
        : currentValue.routePrefix || 'webbycommerce';

    // Sanitize route prefix
    routePrefix = routePrefix
      .trim()
      .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
      .replace(/\/+/g, '/') // Replace multiple slashes with single
      .replace(/[^a-zA-Z0-9\/_-]/g, '') // Remove invalid characters
      || 'webbycommerce';

    // Merge SMTP settings
    const smtp = body.smtp !== undefined ? body.smtp : currentValue.smtp;

    // Merge shippingType with validation
    let shippingType =
      body.shippingType !== undefined
        ? body.shippingType
        : currentValue.shippingType || 'single';

    if (shippingType !== 'single' && shippingType !== 'multiple') {
      return ctx.badRequest('Invalid shippingType. Must be "single" or "multiple".');
    }

    const newValue = {
      ...currentValue,
      allowedOrigins,
      loginRegisterMethod,
      routePrefix,
      smtp,
      shippingType,
    };

    await store.set({
      key: SETTINGS_KEY,
      value: newValue,
    });

    ctx.body = {
      allowedOrigins,
      loginRegisterMethod,
      routePrefix,
      smtp,
      shippingType,
    };
  },

  async seedDemo(ctx) {
    strapi.log.info(`[${PLUGIN_ID}] Seed demo data requested`);
    try {
      const result = await strapi
        .plugin(PLUGIN_ID)
        .service('service')
        .seedDemoData();

      ctx.body = result;
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Seed demo failed:`, error);
      ctx.badRequest('Failed to seed demo data', { error: error.message });
    }
  },

  async generateDemo(ctx) {
    strapi.log.info(`[${PLUGIN_ID}] Demo data generation requested`);

    try {
      const path = require('path');
      // Use absolute path from project root for reliability
      const demoScriptPath = path.join(strapi.dirs.app.root, 'scripts', 'demo-ecommerce-visual.js');
      
      strapi.log.info(`[${PLUGIN_ID}] Loading demo script from: ${demoScriptPath}`);
      
      // Import the demo script
      const { createVisualDemo } = require(demoScriptPath);

      if (typeof createVisualDemo !== 'function') {
        throw new Error('createVisualDemo is not a function in the demo script');
      }

      // Run the demo generation
      const result = await createVisualDemo();

      ctx.body = {
        success: true,
        message: 'Demo data generated successfully',
        data: result
      };

    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Demo generation failed:`, error);
      ctx.badRequest('Failed to generate demo data', { 
        error: error.message,
        details: error.stack
      });
    }
  },
};

