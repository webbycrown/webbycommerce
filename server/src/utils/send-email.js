'use strict';

const PLUGIN_ID = 'webbycommerce';

/**
 * Get SMTP settings from plugin store
 */
const getSmtpSettings = async () => {
  try {
    const store = strapi.store({ type: 'plugin', name: PLUGIN_ID });
    const value = (await store.get({ key: 'settings' })) || {};
    return value.smtp || null;
  } catch (error) {
    strapi.log.warn(`[${PLUGIN_ID}] Failed to load SMTP settings from store, using defaults:`, error.message);
    return null; // Return null to indicate no SMTP settings available
  }
};

/**
 * Send email using configured SMTP or fallback to Strapi's email plugin
 */
const sendEmail = async ({ to, subject, html, from = undefined, fromName = undefined }) => {
  const smtpSettings = await getSmtpSettings();

  // If SMTP is configured, use nodemailer directly 
  if (smtpSettings && smtpSettings.host && smtpSettings.port) {
    try {
      // Dynamically require nodemailer (should be available via Strapi's email plugin)
      let nodemailer;
      try {
        nodemailer = require('nodemailer');
      } catch (requireError) {
        strapi.log.warn(
          `[${PLUGIN_ID}] nodemailer not found. Falling back to Strapi email plugin.`
        );
        throw new Error('nodemailer not available');
      }

      // Create transporter with SMTP settings
      const transporter = nodemailer.createTransport({
        host: smtpSettings.host,
        port: parseInt(smtpSettings.port, 10),
        secure: smtpSettings.secure === true || smtpSettings.port === '465',
        auth: smtpSettings.username && smtpSettings.password
          ? {
              user: smtpSettings.username,
              pass: smtpSettings.password,
            }
          : undefined,
        tls: {
          rejectUnauthorized: smtpSettings.rejectUnauthorized !== false,
        },
      });

      // Prepare from address
      const fromAddress = from || smtpSettings.from || 'noreply@example.com';
      const fromDisplay = fromName || smtpSettings.fromName || 'Strapi Advanced Ecommerce';
      const fromString = fromDisplay ? `${fromDisplay} <${fromAddress}>` : fromAddress;

      // Send email
      const info = await transporter.sendMail({
        from: fromString,
        to,
        subject,
        html,
      });

      strapi.log.info(`[${PLUGIN_ID}] Email sent successfully via SMTP to ${to}:`, info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error sending email via SMTP:`, error);
      // If SMTP fails and nodemailer is not available, fall back to Strapi email plugin
      if (error.message === 'nodemailer not available') {
        strapi.log.info(`[${PLUGIN_ID}] Falling back to Strapi email plugin`);
        // Continue to fallback section below
      } else {
        throw error;
      }
    }
  }

  // Fallback to Strapi's email plugin (if SMTP not configured or failed)
  try {
    const fromAddress = from || process.env.EMAIL_FROM || 'noreply@example.com';
    await strapi.plugin('email').service('email').send({
      from: fromAddress,
      to,
      subject,
      html,
    });
    strapi.log.info(`[${PLUGIN_ID}] Email sent successfully via Strapi email plugin to ${to}`);
    return { success: true };
  } catch (error) {
    strapi.log.error(`[${PLUGIN_ID}] Error sending email via Strapi email plugin:`, error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  getSmtpSettings,
};

