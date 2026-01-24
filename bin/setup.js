#!/usr/bin/env node

'use strict';

const readline = require('readline');
const path = require('path');
const fs = require('fs');

// Global log function to be accessible everywhere
const projectRoot = process.cwd();
const logPath = path.join(projectRoot, 'ecommerce-setup-debug.log');
const log = (msg) => {
  try {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
  } catch (e) {
    // Ignore logging errors
  }
};

/**
 * Setup script for @webbycrown/webbycommerce
 */
async function setup() {
  let ttyIn, ttyOut;
  
  log('--- Setup Started ---');
  log('Platform: ' + process.platform);
  log('CWD: ' + projectRoot);

  try {
    if (process.platform === 'win32') {
      log('Attempting to open Windows console devices...');
      try {
        const fdIn = fs.openSync('CONIN$', 'r');
        const fdOut = fs.openSync('CONOUT$', 'w');
        ttyIn = fs.createReadStream(null, { fd: fdIn });
        ttyOut = fs.createWriteStream(null, { fd: fdOut });
        log('Opened CONIN$/CONOUT$ successfully');
      } catch (e) {
        log('CONIN$/CONOUT$ failed, falling back to process streams: ' + e.message);
        ttyIn = process.stdin;
        ttyOut = process.stdout;
      }
    } else {
      try {
        ttyIn = fs.createReadStream('/dev/tty');
        ttyOut = fs.createWriteStream('/dev/tty');
        log('Opened /dev/tty successfully');
      } catch (e) {
        log('/dev/tty failed, falling back to process streams');
        ttyIn = process.stdin;
        ttyOut = process.stdout;
      }
    }

    const rl = readline.createInterface({
      input: ttyIn,
      output: ttyOut,
      terminal: true
    });

    const question = (query) => new Promise((resolve) => {
      const timer = setTimeout(() => {
        if (ttyOut && ttyOut.writable) ttyOut.write('\n⏰ Setup timed out. Skipping...\n');
        resolve('n');
      }, 60000);

      rl.question(query, (answer) => {
        clearTimeout(timer);
        resolve(answer);
      });
    });

    const print = (msg) => {
      if (ttyOut && ttyOut.writable) ttyOut.write(msg + '\n');
      log('Output: ' + msg);
    };

    print('\n🛍️  @webbycrown/webbycommerce Setup');
    print('===============================================');
    print('');
    print('⚠️  Important: Demo data seeding is now done through the Strapi Admin interface.');
    print('');
    print('📋 Installation complete! Next steps:');
    print('1. Start your Strapi application: npm run develop');
    print('2. Go to Strapi Admin > Settings > Advanced Ecommerce');
    print('3. Click "Seed Demo Data" to populate your store with sample products');
    print('');
    print('💡 You can also seed data programmatically by setting:');
    print('   STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA=true');
    print('   before starting Strapi.');
    print('');

    rl.close();
  } catch (error) {
    log('FATAL ERROR: ' + error.message + '\n' + error.stack);
    if (ttyOut && ttyOut.writable) ttyOut.write('\n❌ Setup encounterd an error. See ecommerce-setup-debug.log for details.\n');
  }
}

setup().then(() => {
  log('--- Setup Finished ---');
  if (require.main === module) process.exit(0);
});
