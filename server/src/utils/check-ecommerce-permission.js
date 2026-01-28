'use strict';

const PLUGIN_ID = 'webbycommerce';
const ECOMMERCE_ACTION = 'plugin::webbycommerce.ecommerce.enable';
const PATCHED_FLAG = Symbol('webbycommerce-permissions-patched');
const SETTINGS_KEY = 'settings';

const getStore = () => {
  return strapi.store({ type: 'plugin', name: PLUGIN_ID });
};

const loadAllowedOrigins = async () => {
  const store = getStore();
  const value = (await store.get({ key: SETTINGS_KEY })) || {};
  const input = Array.isArray(value.allowedOrigins) ? value.allowedOrigins : [];

  return input
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter((value) => value.length > 0)
    .map((value) => value.toLowerCase().replace(/\/+$/, ''));
};

const isOriginAllowed = async (ctx) => {
  const allowedOrigins = await loadAllowedOrigins();

  // If no origins are configured, allow all
  if (!allowedOrigins.length) {
    return true;
  }

  const originHeader = ctx.request.header?.origin || '';
  const hostHeader = ctx.request.header?.host || '';
  let hostname = '';

  if (originHeader) {
    try {
      const parsed = new URL(originHeader);
      hostname = parsed.hostname.toLowerCase();
    } catch {
      // ignore invalid origin header
    }
  }

  if (!hostname && hostHeader) {
    hostname = hostHeader.split(':')[0].toLowerCase();
  }

  if (!hostname) {
    return false;
  }

  const normalized = (value) =>
    value
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .split('/')[0]
      .split(':')[0];

  const requestHost = hostname.split(':')[0];

  return allowedOrigins.some((origin) => normalized(origin) === requestHost);
};

const patchUsersPermissionsGetActions = (usersPermissionsService) => {
  if (!usersPermissionsService || usersPermissionsService[PATCHED_FLAG]) {
    return;
  }

  const originalGetActions = usersPermissionsService.getActions.bind(usersPermissionsService);

  usersPermissionsService.getActions = (options = {}) => {
    const result = originalGetActions(options) || {};
    const defaultEnable = options?.defaultEnable ?? false;
    const namespace = `plugin::${PLUGIN_ID}`;

    const currentControllers = result[namespace]?.controllers || {};
    const patchedControllers = { ...currentControllers };

    // Register ecommerce enable action
    const controllerActions = patchedControllers.ecommerce ? { ...patchedControllers.ecommerce } : {};
    if (!controllerActions.enable) {
      controllerActions.enable = { enabled: defaultEnable, policy: '' };
    }
    patchedControllers.ecommerce = controllerActions;

    result[namespace] = {
      controllers: patchedControllers,
    };

    return result;
  };

  usersPermissionsService[PATCHED_FLAG] = true;
};

const registerEcommerceActions = async () => {
  const permissionsService = strapi.plugin('users-permissions')?.service('users-permissions');

  if (!permissionsService || typeof permissionsService.syncPermissions !== 'function') {
    return;
  }

  patchUsersPermissionsGetActions(permissionsService);

  // Sync ensures the action exists in the Users & Permissions schema
  await permissionsService.syncPermissions();
};

const getRoleIdFromCtx = async (ctx) => {
  if (ctx.state?.user?.role?.id) {
    return ctx.state.user.role.id;
  }

  if (ctx.state?.auth?.credentials?.role?.id) {
    return ctx.state.auth.credentials.role.id;
  }

  if (ctx.state?.auth?.strategy?.name === 'api-token') {
    // API tokens are handled separately via the permissions array on the token
    return null;
  }

  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    select: ['id'],
  });

  return publicRole?.id || null;
};

const hasApiTokenPermission = (ctx, action) => {
  if (ctx.state?.auth?.strategy?.name !== 'api-token') {
    return false;
  }

  const permissions = ctx.state?.auth?.credentials?.permissions;
  if (!Array.isArray(permissions)) {
    return false;
  }

  return permissions.includes(action);
};

const isActionEnabledForRole = (rolePermissions, action) => {
  if (!rolePermissions) {
    return false;
  }

  // Action format for plugins:
  //   plugin::webbycommerce.ecommerce.enable
  // namespace: plugin::webbycommerce
  // controller: ecommerce
  // actionName: enable
  const [namespace, controller, actionName] = action.split('.');

  const controllerSet = rolePermissions?.[namespace]?.controllers?.[controller];
  return controllerSet?.[actionName]?.enabled === true;
};

const ensureEcommercePermission = async (ctx) => {
  const action = ECOMMERCE_ACTION;

  // First, enforce allowed origin settings (if any are configured)
  const originOk = await isOriginAllowed(ctx);
  if (!originOk) {
    ctx.unauthorized('Ecommerce facility is not enabled for this origin');
    return false;
  }

  if (hasApiTokenPermission(ctx, action)) {
    return true;
  }

  const roleId = await getRoleIdFromCtx(ctx);

  if (!roleId) {
    ctx.unauthorized('Ecommerce facility is not enabled for this role');
    return false;
  }

  // Check plugin permission via Users & Permissions permissions table
  const permissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({
      where: {
        action,
        role: roleId,
      },
    });

  if (Array.isArray(permissions) && permissions.length > 0) {
    return true;
  }

  ctx.unauthorized('Ecommerce facility is not enabled for this role');
  return false;
};

module.exports = {
  ECOMMERCE_ACTION,
  registerEcommerceActions,
  ensureEcommercePermission,
};

