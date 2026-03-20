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
 * Upsert a key/value pair in a dotenv-style file.
 * - Replaces only exact `KEY=...` lines.
 * - Creates the file if it doesn't exist.
 */
function upsertEnvVar(envFilePath, key, value) {
  const os = require('os');
  const eol = os.EOL;
  const desiredLine = `${key}=${value}`;

  let current = '';
  if (fs.existsSync(envFilePath)) {
    current = fs.readFileSync(envFilePath, 'utf8');
  }

  const keyRegex = new RegExp(`^${key}=.*$`, 'm');
  if (keyRegex.test(current)) {
    return current.replace(keyRegex, desiredLine);
  }

  const needsNewline = current.length > 0 && !current.endsWith('\n') && !current.endsWith('\r\n');
  if (!current.length) return desiredLine + eol;
  return current + (needsNewline ? eol : '') + desiredLine + eol;
}

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
      const key = 'STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA';
      const value = 'true';

      // Set environment variable for the current process (useful if user starts Strapi from the same command context).
      process.env[key] = value;

      // Also persist it to `.env` so the next Strapi startup actually seeds.
      // Usually this script is executed from the Strapi project root, not from within `node_modules`.
      const isLikelyStrapiProject =
        fs.existsSync(path.join(projectRoot, 'config')) &&
        fs.existsSync(path.join(projectRoot, 'package.json'));

      if (isLikelyStrapiProject) {
        try {
          const envFilePath = path.join(projectRoot, '.env');
          const updated = upsertEnvVar(envFilePath, key, value);
          fs.writeFileSync(envFilePath, updated, 'utf8');
          print(`✅ Set ${key}=true in ${path.join(projectRoot, '.env')}. Restart Strapi to seed demo data.`);
        } catch (e) {
          print(`⚠️  Could not update .env automatically (${e.message}). You can manually set ${key}=true and restart Strapi.`);
        }
      } else {
        print(`✅ Demo data will be seeded when you start Strapi (set ${key}=true in your Strapi project's .env).`);
      }

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
