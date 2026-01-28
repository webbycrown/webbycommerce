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
const Initializer = () => {
  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(icons.ShoppingCart, {});
const index = {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: true,
      name: "Strapi Advanced Ecommerce"
    });
    app.addSettingsLink(
      {
        id: "webbycommerce",
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section`,
          defaultMessage: "Advanced Ecommerce"
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
        Component: () => Promise.resolve().then(() => require("./Settings-DFWX7U9g.js"))
      }
    );
  },
  bootstrap(app) {
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        if (locale === "en") {
          try {
            const { default: data } = await Promise.resolve().then(() => require("./en-DSLzcw5q.js"));
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-DSLzcw5q.js")) }), `./translations/${locale}.json`, 3);
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
