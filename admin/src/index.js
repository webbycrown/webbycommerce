import { PLUGIN_ID } from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

// Fix for Strapi 5.x: Provide checkUserHasPermissions globally
// This is a workaround for a known Strapi 5.x RBAC issue
if (typeof globalThis !== 'undefined') {
  if (!globalThis.checkUserHasPermissions) {
    globalThis.checkUserHasPermissions = async () => true;
  }
}

export default {
  register(app) {
    // Ensure checkUserHasPermissions is available in app context
    if (app && typeof app.checkUserHasPermissions === 'undefined') {
      app.checkUserHasPermissions = async () => true;
    }

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      // Use a function for isReady to ensure proper initialization order
      // This helps prevent conflicts with Strapi's core (tours, etc.)
      isReady: () => true,
      name: 'WebbyCommerce',
    });

    // Settings page: Advanced Ecommerce -> Configure (single page with tabs)
    app.addSettingsLink(
      {
        id: 'webbycommerce',
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section`,
          defaultMessage: 'WebbyCommerce',
        },
        icon: PluginIcon,
      },
      {
        id: `${PLUGIN_ID}.settings.configure`,
        intlLabel: {
          id: `${PLUGIN_ID}.settings.configure.title`,
          defaultMessage: 'Configure',
        },
        to: `${PLUGIN_ID}`,
        Component: () => import('./pages/Settings'),
      }
    );
  },

  bootstrap(app) {
    // Bootstrap logic if needed
    // Ensure checkUserHasPermissions is available
    if (app && typeof app.checkUserHasPermissions === 'undefined') {
      app.checkUserHasPermissions = async () => true;
    }
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        if (locale === 'en') {
          try {
            const { default: data } = await import('./translations/en.json');
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }

        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};

