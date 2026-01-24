import { PLUGIN_ID } from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

export default {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: true,
      name: 'Strapi Advanced Ecommerce',
    });

    // Settings page: Advanced Ecommerce -> Configure (single page with tabs)
    app.addSettingsLink(
      {
        id: 'webbycommerce',
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section`,
          defaultMessage: 'Advanced Ecommerce',
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

