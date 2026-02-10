"use strict";
const React = require("react");
const jsxRuntime = require("react/jsx-runtime");
const icons = require("@strapi/icons");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "webbycommerce";
const provideCheckUserHasPermissions = () => {
  const defaultImpl = async () => true;
  if (typeof window !== "undefined") {
    if (!window.checkUserHasPermissions) {
      window.checkUserHasPermissions = defaultImpl;
    }
  }
  if (typeof globalThis !== "undefined") {
    if (!globalThis.checkUserHasPermissions) {
      globalThis.checkUserHasPermissions = defaultImpl;
    }
  }
  if (typeof global !== "undefined") {
    if (!global.checkUserHasPermissions) {
      global.checkUserHasPermissions = defaultImpl;
    }
  }
};
provideCheckUserHasPermissions();
const Initializer = () => {
  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      provideCheckUserHasPermissions();
      try {
        const checkInterval = setInterval(() => {
          if (window.strapi?.app && typeof window.strapi.app.checkUserHasPermissions === "undefined") {
            window.strapi.app.checkUserHasPermissions = async () => true;
            clearInterval(checkInterval);
          }
        }, 100);
        setTimeout(() => clearInterval(checkInterval), 5e3);
      } catch (error) {
      }
    }
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(icons.ShoppingCart, {});
if (typeof globalThis !== "undefined") {
  if (!globalThis.checkUserHasPermissions) {
    globalThis.checkUserHasPermissions = async () => true;
  }
}
const index = {
  register(app) {
    if (app && typeof app.checkUserHasPermissions === "undefined") {
      app.checkUserHasPermissions = async () => true;
    }
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      // Use a function for isReady to ensure proper initialization order
      // This helps prevent conflicts with Strapi's core (tours, etc.)
      isReady: () => true,
      name: "WebbyCommerce"
    });
    app.addSettingsLink(
      {
        id: "webbycommerce",
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section`,
          defaultMessage: "WebbyCommerce"
        },
        icon: PluginIcon
      },
      {
        id: `${PLUGIN_ID}.settings.configure`,
        intlLabel: {
          id: `${PLUGIN_ID}.settings.configure.title`,
          defaultMessage: "Configure"
        },
        to: `${PLUGIN_ID}`,
        Component: () => Promise.resolve().then(() => require("./Settings-TToktNAy.js"))
      }
    );
  },
  bootstrap(app) {
    if (app && typeof app.checkUserHasPermissions === "undefined") {
      app.checkUserHasPermissions = async () => true;
    }
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        if (locale === "en") {
          try {
            const { default: data } = await Promise.resolve().then(() => require("./en-CwvqDxF2.js"));
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-CwvqDxF2.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.index = index;
