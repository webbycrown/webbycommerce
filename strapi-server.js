'use strict';

// Try to load from dist first (for packaged version), fallback to server (for development)
try {
  module.exports = require('./dist/server');
} catch (error) {
  module.exports = require('./server/src');
}

