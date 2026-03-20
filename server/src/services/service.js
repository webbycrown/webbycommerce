'use strict';

const PLUGIN_ID = 'webbycommerce';

const { seedDemoData } = require('../utils/seed-data');

module.exports = ({ strapi }) => ({
  getPluginInfo() {
    return {
      name: PLUGIN_ID,
      version: '1.0.0',
    };
  },

  async seedDemoData() {
    return await seedDemoData(strapi);
  }
});

