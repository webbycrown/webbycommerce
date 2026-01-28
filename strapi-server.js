'use strict';

const register = require('./server/src/register');
const bootstrap = require('./server/src/bootstrap');
const destroy = require('./server/src/destroy');
const config = require('./server/src/config');
const controllers = require('./server/src/controllers');
const routes = require('./server/src/routes');
const services = require('./server/src/services');
const middlewares = require('./server/src/middlewares');
const policies = require('./server/src/policies');
const contentTypes = require('./server/src/content-types');

module.exports = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  contentTypes,
  policies,
  middlewares,
  routes,
  services,
};

