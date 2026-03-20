'use strict';

/**
 * Extend the users-permissions user schema with OTP fields
 * This function adds 'otp' and 'isOtpVerified' fields to the user table
 */
async function extendUserSchemaWithOtpFields(strapi) {
  try {
    const db = strapi.db;
    const client = db.config.connection.client;
    const tableName = 'up_users'; // Strapi's default users table name

    // Check if database columns already exist by querying the database directly
    let fieldsExist = false;
    try {
      const connection = db.connection;
      const knex = connection;
      
      // Check if columns exist in the database
      if (client === 'postgres') {
        const result = await knex.raw(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name='${tableName}' 
          AND (column_name='otp' OR column_name='is_otp_verified')
        `);
        fieldsExist = result.rows.length >= 2;
      } else if (client === 'mysql' || client === 'mysql2') {
        const result = await knex.raw(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_SCHEMA = DATABASE() 
          AND TABLE_NAME = '${tableName}' 
          AND (COLUMN_NAME = 'otp' OR COLUMN_NAME = 'is_otp_verified')
        `);
        fieldsExist = result[0].length >= 2;
      } else {
        // SQLite
        const tableInfo = await knex.raw(`PRAGMA table_info(${tableName})`);
        const columns = tableInfo.map((col) => col.name);
        fieldsExist = columns.includes('otp') && columns.includes('is_otp_verified');
      }
    } catch (err) {
      fieldsExist = false;
    }

    if (fieldsExist) {
      strapi.log.info('[webbycommerce] OTP fields already exist in database');
      return true;
    }

    strapi.log.info('[webbycommerce] OTP fields not found, adding them to user schema...');

    // Get the database connection
    const connection = db.connection;
    const knex = connection;

    // Add columns based on database type
    let otpAdded = false;
    let isOtpVerifiedAdded = false;

    if (client === 'sqlite' || client === 'sqlite3') {
      // SQLite doesn't support ALTER TABLE ADD COLUMN IF NOT EXISTS directly
      // We need to check if column exists first
      const tableInfo = await knex.raw(`PRAGMA table_info(${tableName})`);
      const columns = tableInfo.map((col) => col.name);

      if (!columns.includes('otp')) {
        await knex.schema.alterTable(tableName, (table) => {
          table.integer('otp').nullable();
        });
        otpAdded = true;
        strapi.log.info('[webbycommerce] Added "otp" column to user table');
      }

      if (!columns.includes('is_otp_verified')) {
        await knex.schema.alterTable(tableName, (table) => {
          table.boolean('is_otp_verified').defaultTo(false);
        });
        isOtpVerifiedAdded = true;
        strapi.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
      }
    } else if (client === 'postgres') {
      // PostgreSQL
      const otpExists = await knex.raw(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='${tableName}' AND column_name='otp'
      `);

      if (otpExists.rows.length === 0) {
        await knex.raw(`ALTER TABLE ${tableName} ADD COLUMN otp INTEGER`);
        otpAdded = true;
        strapi.log.info('[webbycommerce] Added "otp" column to user table');
      }

      const isOtpVerifiedExists = await knex.raw(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='${tableName}' AND column_name='is_otp_verified'
      `);

      if (isOtpVerifiedExists.rows.length === 0) {
        await knex.raw(`ALTER TABLE ${tableName} ADD COLUMN is_otp_verified BOOLEAN DEFAULT false`);
        isOtpVerifiedAdded = true;
        strapi.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
      }
    } else if (client === 'mysql' || client === 'mysql2') {
      // MySQL
      const otpExists = await knex.raw(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = '${tableName}' 
        AND COLUMN_NAME = 'otp'
      `);

      if (otpExists[0].length === 0) {
        await knex.raw(`ALTER TABLE \`${tableName}\` ADD COLUMN \`otp\` INT NULL`);
        otpAdded = true;
        strapi.log.info('[webbycommerce] Added "otp" column to user table');
      }

      const isOtpVerifiedExists = await knex.raw(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = '${tableName}' 
        AND COLUMN_NAME = 'is_otp_verified'
      `);

      if (isOtpVerifiedExists[0].length === 0) {
        await knex.raw(`ALTER TABLE \`${tableName}\` ADD COLUMN \`is_otp_verified\` BOOLEAN DEFAULT false`);
        isOtpVerifiedAdded = true;
        strapi.log.info('[webbycommerce] Added "is_otp_verified" column to user table');
      }
    } else {
      strapi.log.warn(
        `[webbycommerce] Database client "${client}" not supported for automatic schema extension. Please manually add OTP fields to user schema.`
      );
      return false;
    }

    // Note: We don't modify the content-type schema at runtime as it breaks the admin panel
    // The raw SQL queries in the controller will work with the database columns directly
    // If you need the fields to appear in the admin panel, create a schema extension file
    // in your main Strapi project: src/extensions/users-permissions/content-types/user/schema.json

    strapi.log.info('[webbycommerce] User schema extension completed successfully');
    return true;
  } catch (error) {
    strapi.log.error('[webbycommerce] Failed to extend user schema with OTP fields:', error);
    strapi.log.error('[webbycommerce] Error details:', error.message);
    strapi.log.error(
      '[webbycommerce] Please manually extend the user schema by creating a schema extension file in your Strapi project.'
    );
    return false;
  }
}

module.exports = { extendUserSchemaWithOtpFields };
