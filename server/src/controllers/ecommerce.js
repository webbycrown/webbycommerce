'use strict';

/**
 * This controller exists primarily so that Strapi's Users & Permissions plugin
 * `syncPermissions()` can "see" the action:
 *   plugin::webbycommerce.ecommerce.enable
 *
 * Without a real controller action present in the codebase, `syncPermissions()`
 * may delete the permission from the DB on restart (because it thinks it's stale),
 * which makes the checkbox turn OFF again.
 *
 * We intentionally do not expose a public route for this action.
 */
module.exports = {
  // No-op endpoint (not routed by default). Kept for permission discovery.
  async enable(ctx) {
    ctx.body = { ok: true };
  },
};

