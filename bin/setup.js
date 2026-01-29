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
  let isInteractive = false;

  log('--- Setup Started ---');
  log('Platform: ' + process.platform);
  log('CWD: ' + projectRoot);
  log('Is TTY: ' + process.stdout.isTTY);
  log('Is Interactive: ' + (process.stdout.isTTY && process.stdin.isTTY));

  try {
    // Check if we're running in an interactive environment
    isInteractive = process.stdout.isTTY && process.stdin.isTTY;

    if (isInteractive) {
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
    } else {
      // Non-interactive environment (like local npm install)
      log('Non-interactive environment detected, skipping interactive prompts');
      ttyIn = process.stdin;
      ttyOut = process.stdout;
    }

    const rl = readline.createInterface({
      input: ttyIn,
      output: ttyOut,
      terminal: true
    });

    const question = (query) => new Promise((resolve) => {
      if (!isInteractive) {
        // In non-interactive environments, check environment variable or default to 'n'
        const envSeed = process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA;
        if (envSeed === 'true' || envSeed === '1' || envSeed === 'yes') {
          log('Non-interactive mode: STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA=true detected');
          resolve('y');
        } else {
          log('Non-interactive mode: no seeding requested');
          resolve('n');
        }
        return;
      }

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

    if (!isInteractive) {
      print('🔧 Non-interactive installation detected.');
      print('   To seed demo data, set: STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA=true');
      print('   Or run setup manually: npx strapi-ecommerce-setup');
      print('');
    }

    // Prompt for seeding demo data (only in interactive mode)
    const seedAnswer = await question('Would you like to seed example data? (y/n): ');
    const shouldSeed = seedAnswer.toLowerCase().trim() === 'y';

    if (shouldSeed) {
      // Set environment variable for seeding
      process.env.STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA = 'true';
      print('✅ Demo data will be seeded when you start Strapi.');
      print('');
    } else {
      print('ℹ️  Demo data seeding skipped.');
      print('');
    }

    print('📋 Installation complete! Next steps:');
    print('1. Start your Strapi application: npm run develop');

    if (shouldSeed) {
      print('2. Demo data will be automatically seeded during startup');
      print('3. Visit your Strapi Admin to explore the seeded data');
    } else {
      print('2. Go to Strapi Admin > Settings > Advanced Ecommerce');
      print('3. Click "Seed Demo Data" to populate your store with sample products');
    }

    print('');
    print('💡 Additional options:');
    print('• To seed data programmatically, set: STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA=true');
    print('• To run setup manually: npx strapi-ecommerce-setup');
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
