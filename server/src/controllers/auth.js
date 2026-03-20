'use strict';

const PLUGIN_ID = 'webbycommerce';
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/send-email');
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

const getStore = () => {
  return strapi.store({ type: 'plugin', name: PLUGIN_ID });
};

const getLoginMethod = async () => {
  const store = getStore();
  const value = (await store.get({ key: 'settings' })) || {};
  return value.loginRegisterMethod || 'default';
};

module.exports = {
  /**
   * Login or Register with OTP
   * Supports both email and mobile number
   */
  async loginOrRegister(ctx) {
    try {
      // Check ecommerce permission first
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return; // ensureEcommercePermission already sent the response
      }

      // Check if OTP method is enabled
      const method = await getLoginMethod();
      if (method !== 'otp') {
        return ctx.badRequest('OTP authentication is not enabled. Please enable it in plugin settings.');
      }

      const { email, mobile, type } = ctx.request.body;

      // Normalize email for case-insensitive match
      let normalizedEmail = email?.toLowerCase();

      if (!type || (type !== 'email' && type !== 'mobile')) {
        return ctx.badRequest('Type must be "email" or "mobile".');
      }

      let identifier = type === 'email' ? normalizedEmail : mobile;

      if (!identifier) {
        return ctx.badRequest(
          `${type === 'email' ? 'Email' : 'Mobile number'} is required.`
        );
      }

      // Find user
      let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: type === 'email' ? { email: normalizedEmail } : { phone_no: mobile },
      });

      let isNewUser = false;

      // Create user if not exists
      if (!user) {
        let username = '';

        if (type === 'email' && email) {
          // EMAIL USERNAME — exactly 8 chars (letters + numbers)
          let base = email.split('@')[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
          if (!base) base = 'user';

          base = base.substring(0, 4); // max 4 letters

          const digitsNeeded = 8 - base.length;
          const min = Math.pow(10, digitsNeeded - 1);
          const max = Math.pow(10, digitsNeeded) - 1;

          let randomDigits = String(Math.floor(Math.random() * (max - min + 1)) + min);

          username = (base + randomDigits).substring(0, 8);
        } else if (type === 'mobile' && mobile) {
          // MOBILE USERNAME — MUST start with "webby" and be exactly 8 chars
          const prefix = 'webby'; // length 5

          // Need exactly 3 digits
          const randomDigits = String(Math.floor(100 + Math.random() * 900)); // 100–999

          username = prefix + randomDigits; // total = 8 chars
        } else {
          username = 'user' + String(Math.floor(1000 + Math.random() * 9000)); // fallback 8 chars
        }

        // Ensure unique
        const existing = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: { username },
        });

        if (existing) {
          if (type === 'mobile') {
            username = 'webby' + String(Math.floor(100 + Math.random() * 900));
          } else {
            username = username.substring(0, 4) + String(Math.floor(1000 + Math.random() * 9000));
            username = username.substring(0, 8);
          }
        }

        // Get default role (usually Public role with ID 2)
        const defaultRole = await strapi.db
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: 'public' } });

        // Create user
        user = await strapi.plugin('users-permissions').service('user').add({
          email: type === 'email' ? normalizedEmail : null,
          phone_no: type === 'mobile' ? mobile : null,
          username,
          confirmed: false,
          role: defaultRole?.id || 2,
        });

        isNewUser = true;
      }

      // Generate OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpDigits = otp.toString().split('');

      // Save OTP using raw query to bypass schema validation
      // This allows us to use fields that may exist in DB but not in schema
      try {
        const db = strapi.db;
        const knex = db.connection;
        const tableName = 'up_users';
        const client = db.config.connection.client;

        // Use raw SQL to update OTP fields
        if (client === 'postgres') {
          await knex.raw(
            `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
            [otp, false, user.id]
          );
        } else if (client === 'mysql' || client === 'mysql2') {
          await knex.raw(
            `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
            [otp, false, user.id]
          );
        } else {
          // SQLite
          await knex.raw(
            `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
            [otp, false, user.id]
          );
        }
      } catch (err) {
        // If OTP fields don't exist in database, try to add them
        strapi.log.warn(
          `[${PLUGIN_ID}] OTP fields not found in database. Attempting to add them...`
        );
        
        // Try to extend schema and retry
        try {
          const { extendUserSchemaWithOtpFields } = require('../utils/extend-user-schema');
          await extendUserSchemaWithOtpFields(strapi);
          
          // Retry the update
          const db = strapi.db;
          const knex = db.connection;
          const tableName = 'up_users';
          const client = db.config.connection.client;

          if (client === 'postgres') {
            await knex.raw(
              `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
              [otp, false, user.id]
            );
          } else if (client === 'mysql' || client === 'mysql2') {
            await knex.raw(
              `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
              [otp, false, user.id]
            );
          } else {
            await knex.raw(
              `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
              [otp, false, user.id]
            );
          }
        } catch (retryErr) {
          strapi.log.error(
            `[${PLUGIN_ID}] Failed to add OTP fields: ${retryErr.message}`
          );
          throw new Error(
            'OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README.'
          );
        }
      }

      // Send OTP
      let emailSent = false;

      if (type === 'email') {
        // Send OTP via email
        const otpEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" />
    <title>OTP Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 60px 20px 8px;">
                <h1 style="font-weight: bold; color: #111; font-size: 32px; margin: 0;">Your OTP Code for Secure Access</h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 16px 30px;">
                <p style="font-size: 16px; color: #333333; line-height: 24px; margin: 0; max-width: 500px;">
                    To complete your account verification, please use the One-Time Password (OTP) provided below. For security reasons, this OTP will expire in 10 minutes and can only be used once.
                </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 30px 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                    <tr>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[0]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[1]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[2]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[3]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[4]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[5]}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        try {
          // Send OTP email using configured SMTP or fallback to Strapi's email plugin
          await sendEmail({
            to: email,
            subject: 'Your OTP Code - Strapi WebbyCommerce',
            html: otpEmailHTML,
          });
          emailSent = true;
        } catch (emailError) {
          // Do not block user creation/login if email fails; just log the error
          strapi.log.error(
            `[${PLUGIN_ID}] Failed to send OTP email (userId: ${user.id}, email: ${email}):`,
            emailError
          );
        }
      } else if (type === 'mobile') {
        // Send OTP via SMS (requires SMS provider configuration)
        // For now, we'll just log it. You can integrate with AWS SNS, Twilio, etc.
        strapi.log.info(`[${PLUGIN_ID}] OTP for mobile ${mobile}: ${otp}`);
        // TODO: Integrate with SMS provider (AWS SNS, Twilio, etc.)
        // Example with AWS SNS:
        // const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
        // const snsClient = new SNSClient({ region: 'ap-south-1', credentials: {...} });
        // await snsClient.send(new PublishCommand({
        //   Message: `Your OTP is ${otp}. Do not share this code.`,
        //   PhoneNumber: mobile,
        // }));
      }

      ctx.send({
        message: emailSent
          ? `OTP sent to ${type}.`
          : type === 'email'
          ? 'User created. OTP email could not be sent; please check email configuration on the server.'
          : `OTP sent to ${type}.`, // mobile (future)
        userId: user.id,
        isNewUser,
        emailSent,
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in loginOrRegister:`, error);
      ctx.internalServerError('Failed to send OTP. Please try again.');
    }
  },

  /**
   * Verify OTP and complete login/registration
   */
  async verifyOtp(ctx) {
    try {
      // Check ecommerce permission first
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return; // ensureEcommercePermission already sent the response
      }

      // Check if OTP method is enabled
      const method = await getLoginMethod();
      if (method !== 'otp') {
        return ctx.badRequest('OTP authentication is not enabled. Please enable it in plugin settings.');
      }

      const { email, mobile, otp, type = 'email' } = ctx.request.body;

      if (!otp || !((type === 'email' && email) || (type === 'mobile' && mobile))) {
        return ctx.badRequest(
          `${type === 'email' ? 'Email' : 'Mobile number'} and OTP are required.`
        );
      }

      const identifier = type === 'email' ? email.toLowerCase() : mobile;

      // Get user using ORM
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { [type === 'email' ? 'email' : 'phone_no']: identifier },
      });

      if (!user) return ctx.badRequest('User not found.');

      // Get OTP fields using raw query to bypass schema validation
      const db = strapi.db;
      const knex = db.connection;
      const tableName = 'up_users';
      const client = db.config.connection.client;

      let userOtpData;
      let columnsExist = false;
      
      try {
        if (client === 'postgres') {
          const result = await knex.raw(
            `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
            [user.id]
          );
          userOtpData = result.rows[0];
          columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
        } else if (client === 'mysql' || client === 'mysql2') {
          const result = await knex.raw(
            `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
            [user.id]
          );
          userOtpData = result[0][0];
          columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
        } else {
          // SQLite
          const result = await knex.raw(
            `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
            [user.id]
          );
          userOtpData = result[0];
          columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
        }
      } catch (queryErr) {
        // If query fails (columns don't exist), try to add them
        strapi.log.warn(`[${PLUGIN_ID}] OTP columns not found, attempting to add them:`, queryErr.message);
        columnsExist = false;
      }

      // Check if columns exist, if not try to add them
      if (!columnsExist) {
        // Try to add the columns
        const { extendUserSchemaWithOtpFields } = require('../utils/extend-user-schema');
        const schemaExtended = await extendUserSchemaWithOtpFields(strapi);
        
        if (!schemaExtended) {
          return ctx.badRequest(
            'OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README.'
          );
        }
        
        // Wait a moment for the schema changes to be committed
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Retry the query
        try {
          if (client === 'postgres') {
            const result = await knex.raw(
              `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
              [user.id]
            );
            userOtpData = result.rows[0];
            columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
          } else if (client === 'mysql' || client === 'mysql2') {
            const result = await knex.raw(
              `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
              [user.id]
            );
            userOtpData = result[0][0];
            columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
          } else {
            const result = await knex.raw(
              `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
              [user.id]
            );
            userOtpData = result[0];
            columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
          }
          
          if (!columnsExist) {
            return ctx.badRequest(
              'OTP fields were added but could not be queried. Please restart Strapi.'
            );
          }
        } catch (retryErr) {
          strapi.log.error(`[${PLUGIN_ID}] Failed to query OTP fields after extension:`, retryErr);
          return ctx.badRequest(
            'OTP fields are not available. Please restart Strapi after extending the user schema.'
          );
        }
      }

      const userOtp = userOtpData?.otp;
      const isOtpVerified = userOtpData?.is_otp_verified;

      if (isOtpVerified) return ctx.badRequest('User already verified.');
      if (userOtp !== parseInt(otp, 10)) return ctx.badRequest('Invalid OTP.');

      // Update user verification using raw query
      try {
        if (client === 'postgres') {
          await knex.raw(
            `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = true, otp = NULL WHERE id = ?`,
            [true, user.id]
          );
        } else if (client === 'mysql' || client === 'mysql2') {
          await knex.raw(
            `UPDATE \`${tableName}\` SET \`is_otp_verified\` = ?, \`confirmed\` = true, \`otp\` = NULL WHERE \`id\` = ?`,
            [true, user.id]
          );
        } else {
          await knex.raw(
            `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = 1, otp = NULL WHERE id = ?`,
            [true, user.id]
          );
        }
      } catch (dbErr) {
        strapi.log.error(`[${PLUGIN_ID}] Database error during OTP verification:`, dbErr);
        return ctx.badRequest(
          'OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README.'
        );
      }

      // Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      ctx.send({
        message: 'Login successfully!',
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone_no: user.phone_no,
        },
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in verifyOtp:`, error);
      ctx.internalServerError('Failed to verify OTP. Please try again.');
    }
  },

  /**
   * Get current authentication method
   * Returns which authentication method is currently enabled (default or otp)
   * This endpoint is public and can be used by frontend to determine which auth flow to use
   */
  async getAuthMethod(ctx) {
    try {
      const method = await getLoginMethod();
      
      ctx.send({
        method,
        message: `Current authentication method: ${method}`,
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getAuthMethod:`, error);
      // Default to 'default' if there's an error reading settings
      ctx.send({
        method: 'default',
        message: 'Current authentication method: default',
      });
    }
  },

  /**
   * Unified Login/Register endpoint
   * Supports both OTP and default (email/password) authentication methods
   * Automatically detects which method to use based on request body
   * 
   * For OTP method:
   *   - First call: Send email/mobile to receive OTP (step: 'request')
   *   - Second call: Verify OTP to complete login (step: 'verify')
   * 
   * For Default method:
   *   - Single call: Send email/username and password to login
   *   - Register: Send username, email, and password to register
   */
  async unifiedAuth(ctx) {
    try {
      // Check ecommerce permission first
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return; // ensureEcommercePermission already sent the response
      }

      // Validate request body exists
      if (!ctx.request.body || typeof ctx.request.body !== 'object') {
        return ctx.badRequest('Request body is required. Please provide authentication credentials.');
      }

      const { 
        step,           // 'request' or 'verify' for OTP, 'login' or 'register' for default
        authMethod,     // 'otp' or 'default' (optional, auto-detected if not provided)
        // OTP fields
        email, 
        mobile, 
        type,           // 'email' or 'mobile' for OTP
        otp,            // OTP code for verification
        // Default fields
        identifier,     // email or username for default login
        password,       // password for default login
        username,       // username for default register
      } = ctx.request.body;

      // Log request for debugging
      strapi.log.debug(`[${PLUGIN_ID}] Unified auth request:`, {
        step,
        authMethod,
        hasEmail: !!email,
        hasMobile: !!mobile,
        hasType: !!type,
        hasOtp: !!otp,
        hasIdentifier: !!identifier,
        hasPassword: !!password,
        hasUsername: !!username,
      });

      // Get configured method
      const configuredMethod = await getLoginMethod();
      
      // Auto-detect authentication method if not provided
      let detectedMethod = authMethod;
      if (!detectedMethod) {
        // If OTP fields are present, use OTP method
        if ((email || mobile) && type) {
          detectedMethod = 'otp';
        }
        // If identifier/password or username/email/password are present, use default
        else if ((identifier && password) || (username && email && password)) {
          detectedMethod = 'default';
        }
        // Default to configured method
        else {
          detectedMethod = configuredMethod;
        }
      }

      // If configured method is 'both', allow both OTP and default
      // Otherwise, validate that detected method matches configured method
      if (configuredMethod !== 'both') {
        if (detectedMethod === 'otp' && configuredMethod !== 'otp') {
          return ctx.badRequest('OTP authentication is not enabled. Please enable it in plugin settings or use the unified endpoint.');
        }
        if (detectedMethod === 'default' && configuredMethod !== 'default') {
          return ctx.badRequest('Default authentication is not enabled. Please enable it in plugin settings or use the unified endpoint.');
        }
      }

      // Handle OTP authentication
      if (detectedMethod === 'otp') {
        // Step 1: Request OTP
        if (step === 'request' || (!step && !otp)) {
          // Normalize email for case-insensitive match
          let normalizedEmail = email?.toLowerCase();

          if (!type || (type !== 'email' && type !== 'mobile')) {
            return ctx.badRequest('Type must be "email" or "mobile" for OTP authentication.');
          }

          let identifier = type === 'email' ? normalizedEmail : mobile;

          if (!identifier) {
            return ctx.badRequest(
              `${type === 'email' ? 'Email' : 'Mobile number'} is required.`
            );
          }

          // Find user
          let user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: type === 'email' ? { email: normalizedEmail } : { phone_no: mobile },
          });

          let isNewUser = false;

          // Create user if not exists
          if (!user) {
            let generatedUsername = '';

            if (type === 'email' && email) {
              // EMAIL USERNAME — exactly 8 chars (letters + numbers)
              let base = email.split('@')[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
              if (!base) base = 'user';

              base = base.substring(0, 4); // max 4 letters

              const digitsNeeded = 8 - base.length;
              const min = Math.pow(10, digitsNeeded - 1);
              const max = Math.pow(10, digitsNeeded) - 1;

              let randomDigits = String(Math.floor(Math.random() * (max - min + 1)) + min);

              generatedUsername = (base + randomDigits).substring(0, 8);
            } else if (type === 'mobile' && mobile) {
              // MOBILE USERNAME — MUST start with "webby" and be exactly 8 chars
              const prefix = 'webby'; // length 5
              const randomDigits = String(Math.floor(100 + Math.random() * 900)); // 100–999
              generatedUsername = prefix + randomDigits; // total = 8 chars
            } else {
              generatedUsername = 'user' + String(Math.floor(1000 + Math.random() * 9000)); // fallback 8 chars
            }

            // Ensure unique
            const existing = await strapi.db.query('plugin::users-permissions.user').findOne({
              where: { username: generatedUsername },
            });

            if (existing) {
              if (type === 'mobile') {
                generatedUsername = 'webby' + String(Math.floor(100 + Math.random() * 900));
              } else {
                generatedUsername = generatedUsername.substring(0, 4) + String(Math.floor(1000 + Math.random() * 9000));
                generatedUsername = generatedUsername.substring(0, 8);
              }
            }

            // Get default role
            const defaultRole = await strapi.db
              .query('plugin::users-permissions.role')
              .findOne({ where: { type: 'public' } });

            // Create user
            user = await strapi.plugin('users-permissions').service('user').add({
              email: type === 'email' ? normalizedEmail : null,
              phone_no: type === 'mobile' ? mobile : null,
              username: generatedUsername,
              confirmed: false,
              role: defaultRole?.id || 2,
            });

            isNewUser = true;
          }

          // Generate OTP (6 digits)
          const otpCode = Math.floor(100000 + Math.random() * 900000);
          const otpDigits = otpCode.toString().split('');

          // Save OTP using raw query
          try {
            const db = strapi.db;
            const knex = db.connection;
            const tableName = 'up_users';
            const client = db.config.connection.client;

            if (client === 'postgres') {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otpCode, false, user.id]
              );
            } else if (client === 'mysql' || client === 'mysql2') {
              await knex.raw(
                `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
                [otpCode, false, user.id]
              );
            } else {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otpCode, false, user.id]
              );
            }
          } catch (err) {
            const { extendUserSchemaWithOtpFields } = require('../utils/extend-user-schema');
            await extendUserSchemaWithOtpFields(strapi);
            
            const db = strapi.db;
            const knex = db.connection;
            const tableName = 'up_users';
            const client = db.config.connection.client;

            if (client === 'postgres') {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otpCode, false, user.id]
              );
            } else if (client === 'mysql' || client === 'mysql2') {
              await knex.raw(
                `UPDATE \`${tableName}\` SET \`otp\` = ?, \`is_otp_verified\` = ? WHERE \`id\` = ?`,
                [otpCode, false, user.id]
              );
            } else {
              await knex.raw(
                `UPDATE ${tableName} SET otp = ?, is_otp_verified = ? WHERE id = ?`,
                [otpCode, false, user.id]
              );
            }
          }

          // Send OTP via email
          let emailSent = false;
          if (type === 'email') {
            const otpEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" />
    <title>OTP Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 60px 20px 8px;">
                <h1 style="font-weight: bold; color: #111; font-size: 32px; margin: 0;">Your OTP Code for Secure Access</h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 16px 30px;">
                <p style="font-size: 16px; color: #333333; line-height: 24px; margin: 0; max-width: 500px;">
                    To complete your account verification, please use the One-Time Password (OTP) provided below. For security reasons, this OTP will expire in 10 minutes and can only be used once.
                </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 30px 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                    <tr>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[0]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[1]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[2]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[3]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[4]}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 0 6px;">
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; border: 1px solid #0156D559; border-radius: 8px; background-color: #f8f9fa;">
                                <tr>
                                    <td align="center" style="font-size: 28px; font-weight: bold; color: #111;">${otpDigits[5]}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `;

            try {
              await sendEmail({
                to: email,
                subject: 'Your OTP Code - Strapi WebbyCommerce',
                html: otpEmailHTML,
              });
              emailSent = true;
            } catch (emailError) {
              strapi.log.error(
                `[${PLUGIN_ID}] Failed to send OTP email (userId: ${user.id}, email: ${email}):`,
                emailError
              );
            }
          } else if (type === 'mobile') {
            strapi.log.info(`[${PLUGIN_ID}] OTP for mobile ${mobile}: ${otpCode}`);
          }

          ctx.send({
            success: true,
            step: 'request',
            method: 'otp',
            message: emailSent
              ? `OTP sent to ${type}.`
              : type === 'email'
              ? 'User created. OTP email could not be sent; please check email configuration on the server.'
              : `OTP sent to ${type}.`,
            userId: user.id,
            isNewUser,
            emailSent,
            nextStep: 'verify',
          });
          return;
        }

        // Step 2: Verify OTP
        if (step === 'verify' || (!step && otp)) {
          if (!otp || !((type === 'email' && email) || (type === 'mobile' && mobile))) {
            return ctx.badRequest(
              `${type === 'email' ? 'Email' : 'Mobile number'} and OTP are required.`
            );
          }

          const identifier = type === 'email' ? email.toLowerCase() : mobile;

          // Get user
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { [type === 'email' ? 'email' : 'phone_no']: identifier },
          });

          if (!user) return ctx.badRequest('User not found.');

          // Get OTP fields using raw query
          const db = strapi.db;
          const knex = db.connection;
          const tableName = 'up_users';
          const client = db.config.connection.client;

          let userOtpData;
          let columnsExist = false;
          
          try {
            if (client === 'postgres') {
              const result = await knex.raw(
                `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                [user.id]
              );
              userOtpData = result.rows[0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
            } else if (client === 'mysql' || client === 'mysql2') {
              const result = await knex.raw(
                `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
                [user.id]
              );
              userOtpData = result[0][0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
            } else {
              const result = await knex.raw(
                `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                [user.id]
              );
              userOtpData = result[0];
              columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
            }
          } catch (queryErr) {
            strapi.log.warn(`[${PLUGIN_ID}] OTP columns not found, attempting to add them:`, queryErr.message);
            columnsExist = false;
          }

          if (!columnsExist) {
            const { extendUserSchemaWithOtpFields } = require('../utils/extend-user-schema');
            await extendUserSchemaWithOtpFields(strapi);
            await new Promise(resolve => setTimeout(resolve, 200));
            
            try {
              if (client === 'postgres') {
                const result = await knex.raw(
                  `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                  [user.id]
                );
                userOtpData = result.rows[0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
              } else if (client === 'mysql' || client === 'mysql2') {
                const result = await knex.raw(
                  `SELECT \`otp\`, \`is_otp_verified\` FROM \`${tableName}\` WHERE \`id\` = ?`,
                  [user.id]
                );
                userOtpData = result[0][0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
              } else {
                const result = await knex.raw(
                  `SELECT otp, is_otp_verified FROM ${tableName} WHERE id = ?`,
                  [user.id]
                );
                userOtpData = result[0];
                columnsExist = userOtpData && userOtpData.hasOwnProperty('otp') && userOtpData.hasOwnProperty('is_otp_verified');
              }
            } catch (retryErr) {
              return ctx.badRequest(
                'OTP fields are not available. Please restart Strapi after extending the user schema.'
              );
            }
          }

          const userOtp = userOtpData?.otp;
          const isOtpVerified = userOtpData?.is_otp_verified;

          if (isOtpVerified) return ctx.badRequest('User already verified.');
          if (userOtp !== parseInt(otp, 10)) return ctx.badRequest('Invalid OTP.');

          // Update user verification
          try {
            if (client === 'postgres') {
              await knex.raw(
                `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = true, otp = NULL WHERE id = ?`,
                [true, user.id]
              );
            } else if (client === 'mysql' || client === 'mysql2') {
              await knex.raw(
                `UPDATE \`${tableName}\` SET \`is_otp_verified\` = ?, \`confirmed\` = true, \`otp\` = NULL WHERE \`id\` = ?`,
                [true, user.id]
              );
            } else {
              await knex.raw(
                `UPDATE ${tableName} SET is_otp_verified = ?, confirmed = 1, otp = NULL WHERE id = ?`,
                [true, user.id]
              );
            }
          } catch (dbErr) {
            strapi.log.error(`[${PLUGIN_ID}] Database error during OTP verification:`, dbErr);
            return ctx.badRequest(
              'OTP fields are not available in the user schema. Please extend the user schema as described in the plugin README.'
            );
          }

          // Generate JWT token
          const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: user.id,
          });

          ctx.send({
            success: true,
            step: 'verify',
            method: 'otp',
            message: 'Login successfully!',
            jwt,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              phone_no: user.phone_no,
            },
          });
          return;
        }

        return ctx.badRequest('Invalid step for OTP authentication. Use "request" or "verify".');
      }

      // Handle Default authentication
      if (detectedMethod === 'default') {
        // Login
        if (step === 'login' || (!step && identifier && password)) {
          if (!identifier || !password) {
            return ctx.badRequest('Identifier (email/username) and password are required for login.');
          }

          // Use Strapi's built-in authentication
          const userService = strapi.plugin('users-permissions').service('user');
          const jwt = strapi.plugins['users-permissions'].services.jwt;

          // Find user by identifier (email or username)
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
              $or: [
                { email: identifier.toLowerCase() },
                { username: identifier },
              ],
            },
            populate: ['role'],
          });

          if (!user) {
            return ctx.badRequest('Invalid identifier or password.');
          }

          // Validate password using bcrypt compare
          if (!user.password) {
            return ctx.badRequest('Invalid identifier or password.');
          }
          
          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
            return ctx.badRequest('Invalid identifier or password.');
          }

          // Check if user is blocked
          if (user.blocked) {
            return ctx.badRequest('Your account has been blocked.');
          }

          // Generate JWT token
          const token = jwt.issue({
            id: user.id,
          });

          ctx.send({
            success: true,
            step: 'login',
            method: 'default',
            message: 'Login successfully!',
            jwt: token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              phone_no: user.phone_no,
              role: user.role
                ? {
                    id: user.role.id,
                    name: user.role.name,
                    type: user.role.type,
                  }
                : null,
            },
          });
          return;
        }

        // Register
        if (step === 'register' || (!step && username && email && password)) {
          if (!username || !email || !password) {
            return ctx.badRequest('Username, email, and password are required for registration.');
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email.trim())) {
            return ctx.badRequest('Invalid email format.');
          }

          // Check if email already exists
          const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
              $or: [
                { email: email.toLowerCase() },
                { username: username },
              ],
            },
          });

          if (existingUser) {
            return ctx.badRequest('Email or username already exists.');
          }

          // Get default role
          const defaultRole = await strapi.db
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'public' } });

          // Create user using Strapi's user service
          const user = await strapi.plugin('users-permissions').service('user').add({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            confirmed: true, // Auto-confirm for default method
            role: defaultRole?.id || 2,
          });

          // Generate JWT token
          const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: user.id,
          });

          ctx.send({
            success: true,
            step: 'register',
            method: 'default',
            message: 'Registration successful!',
            jwt,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
                ? {
                    id: user.role.id,
                    name: user.role.name,
                    type: user.role.type,
                  }
                : null,
            },
          });
          return;
        }

        return ctx.badRequest('Invalid step for default authentication. Use "login" or "register".');
      }

      // If we reach here, no valid authentication method was detected
      return ctx.badRequest(
        'Invalid request. Please provide valid authentication credentials. ' +
        'For OTP: provide step="request" with email/mobile and type, or step="verify" with OTP code. ' +
        'For default: provide step="login" with identifier and password, or step="register" with username, email, and password.'
      );
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in unifiedAuth:`, error);
      strapi.log.error(`[${PLUGIN_ID}] Error stack:`, error.stack);
      strapi.log.error(`[${PLUGIN_ID}] Request body:`, JSON.stringify(ctx.request.body, null, 2));
      
      // Provide more specific error messages
      if (error.message) {
        return ctx.internalServerError(`Authentication failed: ${error.message}`);
      }
      ctx.internalServerError('Authentication failed. Please try again.');
    }
  },

  /**
   * Get authenticated user profile
   * Returns all user details for the authenticated user
   */
  async getProfile(ctx) {
    try {
      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return; // ensureEcommercePermission already sent the response
      }

      // Get authenticated user from context
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      // Fetch full user details from database
      const fullUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id },
        populate: ['role'],
      });

      if (!fullUser) {
        return ctx.notFound('User not found.');
      }

      // Return user profile (exclude sensitive/private fields)
      // Only include fields that exist in the user schema
      ctx.send({
        user: {
          id: fullUser.id,
          username: fullUser.username ?? null,
          email: fullUser.email ?? null,
          phone_no: fullUser.phone_no ?? null,
          first_name: fullUser.first_name ?? null,
          last_name: fullUser.last_name ?? null,
          display_name: fullUser.display_name ?? null,
          company_name: fullUser.company_name ?? null,
          confirmed: fullUser.confirmed ?? false,
          blocked: fullUser.blocked ?? false,
          role: fullUser.role
            ? {
                id: fullUser.role.id,
                name: fullUser.role.name,
                type: fullUser.role.type,
              }
            : null,
          createdAt: fullUser.createdAt ?? null,
          updatedAt: fullUser.updatedAt ?? null,
          // Only include fields that exist in the schema
          // Excluded: password, resetPasswordToken, confirmationToken (private fields)
          // Excluded: provider, otp, isOtpVerified (internal fields, not needed in profile)
        },
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getProfile:`, error);
      ctx.internalServerError('Failed to fetch user profile. Please try again.');
    }
  },

  /**
   * Update user profile
   * Updates user details including first_name, last_name, email, phone_no, and optional display name
   * Also supports password update if default login method is enabled
   */
  async updateProfile(ctx) {
    try {
      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return; // ensureEcommercePermission already sent the response
      }

      // Get authenticated user from context
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('Authentication required. Please provide a valid JWT token.');
      }

      const {
        first_name,
        last_name,
        email,
        phone_no,
        display_name,
        company_name,
        currentPassword,
        newPassword,
      } = ctx.request.body;

      // Validate required fields
      if (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0) {
        return ctx.badRequest('First name is required.');
      }

      if (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0) {
        return ctx.badRequest('Last name is required.');
      }

      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        return ctx.badRequest('Email address is required.');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return ctx.badRequest('Invalid email format.');
      }

      if (!phone_no || typeof phone_no !== 'string' || phone_no.trim().length === 0) {
        return ctx.badRequest('Phone number is required.');
      }

      // Check if email is unique (excluding current user)
      const existingUserByEmail = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
          email: email.trim().toLowerCase(),
          $not: { id: user.id },
        },
      });

      if (existingUserByEmail) {
        return ctx.badRequest('Email address is already in use by another user.');
      }

      // Check if phone_no is unique (excluding current user)
      const existingUserByPhone = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
          phone_no: phone_no.trim(),
          $not: { id: user.id },
        },
      });

      if (existingUserByPhone) {
        return ctx.badRequest('Phone number is already in use by another user.');
      }

      // Prepare update data
      const updateData = {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim().toLowerCase(),
        phone_no: phone_no.trim(),
      };

      // Add display_name if provided (optional)
      if (display_name !== undefined) {
        updateData.display_name = display_name.trim() || null;
      }

      // Add company_name if provided (optional)
      if (company_name !== undefined) {
        updateData.company_name = company_name.trim() || null;
      }

      // Handle password update (only if default login method is enabled)
      if (currentPassword || newPassword) {
        const method = await getLoginMethod();
        if (method !== 'default') {
          return ctx.badRequest(
            'Password update is only available when using the default email/password authentication method.'
          );
        }

        if (!currentPassword || !newPassword) {
          return ctx.badRequest('Both current password and new password are required for password update.');
        }

        // Verify current password
        const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: { id: user.id },
        });

        if (!currentUser) {
          return ctx.notFound('User not found.');
        }

        if (!currentUser.password) {
          return ctx.badRequest('Current password is incorrect.');
        }
        
        const validPassword = await bcrypt.compare(currentPassword, currentUser.password);

        if (!validPassword) {
          return ctx.badRequest('Current password is incorrect.');
        }

        // Validate new password length
        if (newPassword.length < 6) {
          return ctx.badRequest('New password must be at least 6 characters long.');
        }

        // Hash and set new password
        const hashedPassword = await strapi
          .plugin('users-permissions')
          .service('users-permissions')
          .hashPassword(newPassword);

        updateData.password = hashedPassword;
      }

      // Update user in database
      const updatedUser = await strapi.db.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: updateData,
        populate: ['role'],
      });

      if (!updatedUser) {
        return ctx.notFound('User not found.');
      }

      // Return updated user profile (exclude sensitive fields)
      ctx.send({
        message: 'Profile updated successfully.',
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          phone_no: updatedUser.phone_no,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          display_name: updatedUser.display_name || null,
          company_name: updatedUser.company_name || null,
          confirmed: updatedUser.confirmed,
          blocked: updatedUser.blocked,
          role: updatedUser.role
            ? {
                id: updatedUser.role.id,
                name: updatedUser.role.name,
                type: updatedUser.role.type,
              }
            : null,
          updatedAt: updatedUser.updatedAt,
        },
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in updateProfile:`, error);
      ctx.internalServerError('Failed to update profile. Please try again.');
    }
  },
};

