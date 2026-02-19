import { useRef, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
import { ShoppingCart } from "@strapi/icons";
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
  const hasInitialized = useRef(false);
  useEffect(() => {
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
const PluginIcon = () => /* @__PURE__ */ jsx(ShoppingCart, {});
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
        Component: () => import("./Settings-yLx-YvVy.mjs")
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
            const { default: data } = await import("./en-DE15m4xZ.mjs");
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-DE15m4xZ.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  PLUGIN_ID as P,
  index as i
};
