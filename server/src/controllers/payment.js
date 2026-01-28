'use strict';

const PLUGIN_ID = 'webbycommerce';
const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');

module.exports = {
  /**
   * Create payment intent
   */
  async createIntent(ctx) {
    try {
      const { order_id, payment_method, amount, currency = 'USD' } = ctx.request.body;

      if (!order_id || !payment_method || !amount) {
        return ctx.badRequest('Order ID, payment method, and amount are required.');
      }

      // Validate order exists and belongs to user
      const order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: { id: order_id },
        populate: ['user']
      });

      if (!order) {
        return ctx.notFound('Order not found.');
      }

      // Check if user owns the order (unless it's an admin)
      if (order.user && order.user.id !== ctx.state.user?.id) {
        // For now, allow all authenticated users - you might want to add admin check here
      }

      // Create payment transaction record
      const paymentTransaction = await strapi.db.query('plugin::webbycommerce.payment-transaction').create({
        data: {
          order: order_id,
          transaction_id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Temporary ID
          payment_method,
          amount: parseFloat(amount),
          currency,
          status: 'pending'
        }
      });

      // Here you would integrate with actual payment gateways (Stripe, PayPal, Razorpay)
      // For now, return mock data
      const paymentIntent = {
        client_secret: `pi_mock_${Date.now()}`,
        transaction_id: paymentTransaction.transaction_id,
        amount: parseFloat(amount),
        currency,
        payment_method
      };

      ctx.send({
        data: {
          payment_intent: paymentIntent,
          transaction: paymentTransaction
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in createIntent:`, error);
      ctx.internalServerError('Failed to create payment intent. Please try again.');
    }
  },

  /**
   * Confirm payment
   */
  async confirmPayment(ctx) {
    try {
      const { transaction_id, payment_data } = ctx.request.body;

      if (!transaction_id) {
        return ctx.badRequest('Transaction ID is required.');
      }

      // Find the payment transaction
      const paymentTransaction = await strapi.db.query('plugin::webbycommerce.payment-transaction').findOne({
        where: { transaction_id },
        populate: ['order']
      });

      if (!paymentTransaction) {
        return ctx.notFound('Payment transaction not found.');
      }

      // Update payment transaction
      const updatedTransaction = await strapi.db.query('plugin::webbycommerce.payment-transaction').update({
        where: { id: paymentTransaction.id },
        data: {
          status: 'completed',
          processed_at: new Date(),
          gateway_response: payment_data
        }
      });

      // Update order payment status
      await strapi.db.query('plugin::webbycommerce.order').update({
        where: { id: paymentTransaction.order.id },
        data: {
          payment_status: 'paid',
          status: 'processing' // Move order to processing
        }
      });

      ctx.send({
        data: {
          transaction: updatedTransaction,
          message: 'Payment confirmed successfully'
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in confirmPayment:`, error);
      ctx.internalServerError('Failed to confirm payment. Please try again.');
    }
  },

  /**
   * Handle payment webhook
   */
  async handleWebhook(ctx) {
    try {
      const webhookData = ctx.request.body;
      const signature = ctx.request.headers['stripe-signature'] || ctx.request.headers['paypal-signature'];

      // Here you would verify webhook signatures and handle different gateway webhooks
      // For now, just log the webhook
      strapi.log.info(`[${PLUGIN_ID}] Webhook received:`, webhookData);

      // Process webhook based on type
      // This is a placeholder implementation

      ctx.send({ message: 'Webhook processed successfully' });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in handleWebhook:`, error);
      ctx.internalServerError('Failed to process webhook.');
    }
  },

  /**
   * Process refund
   */
  async processRefund(ctx) {
    try {
      const { id } = ctx.params;
      const { amount, reason } = ctx.request.body;

      // Find the payment transaction
      const paymentTransaction = await strapi.db.query('plugin::webbycommerce.payment-transaction').findOne({
        where: { id },
        populate: ['order']
      });

      if (!paymentTransaction) {
        return ctx.notFound('Payment transaction not found.');
      }

      if (paymentTransaction.status !== 'completed') {
        return ctx.badRequest('Only completed payments can be refunded.');
      }

      // Calculate refund amount
      const refundAmount = amount ? parseFloat(amount) : paymentTransaction.amount;

      if (refundAmount > paymentTransaction.amount) {
        return ctx.badRequest('Refund amount cannot exceed payment amount.');
      }

      // Here you would integrate with payment gateway refund APIs
      // For now, update the transaction
      const updatedTransaction = await strapi.db.query('plugin::webbycommerce.payment-transaction').update({
        where: { id: paymentTransaction.id },
        data: {
          status: 'refunded',
          refunded_at: new Date(),
          refund_amount: refundAmount,
          failure_reason: reason
        }
      });

      // Update order status
      await strapi.db.query('plugin::webbycommerce.order').update({
        where: { id: paymentTransaction.order.id },
        data: {
          payment_status: 'refunded',
          status: 'refunded'
        }
      });

      ctx.send({
        data: {
          transaction: updatedTransaction,
          message: 'Refund processed successfully'
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in processRefund:`, error);
      ctx.internalServerError('Failed to process refund. Please try again.');
    }
  },

  /**
   * Get payment transactions (admin only)
   */
  async getTransactions(ctx) {
    try {
      const { limit = 10, start = 0, order_id, status } = ctx.query;

      const where = {};

      if (order_id) {
        where.order = { id: order_id };
      }

      if (status) {
        where.status = status;
      }

      const transactions = await strapi.db.query('plugin::webbycommerce.payment-transaction').findMany({
        where,
        limit: parseInt(limit, 10),
        start: parseInt(start, 10),
        orderBy: { createdAt: 'desc' },
        populate: ['order']
      });

      const total = await strapi.db.query('plugin::webbycommerce.payment-transaction').count({ where });

      ctx.send({
        data: transactions,
        meta: {
          total,
          limit: parseInt(limit, 10),
          start: parseInt(start, 10)
        }
      });
    } catch (error) {
      strapi.log.error(`[${PLUGIN_ID}] Error in getTransactions:`, error);
      ctx.internalServerError('Failed to fetch payment transactions.');
    }
  }
};