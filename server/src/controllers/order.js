'use strict';

const { ensureEcommercePermission } = require('../utils/check-ecommerce-permission');
const { sendEmail } = require('../utils/send-email');

/**
 * Order controller
 */

module.exports = {
  // Create checkout order
  async checkout(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const {
        billing_address,
        shipping_address,
        payment_method,
        shipping_method,
        notes
      } = ctx.request.body;

      // Validate required fields
      if (!billing_address || !shipping_address || !payment_method) {
        return ctx.badRequest('Billing address, shipping address, and payment method are required');
      }

      // Payment method is an enum string (e.g. "Stripe", "PayPal").
      const normalizedPaymentMethod = payment_method;

      // Get cart items
      const cart = await strapi.db.query('plugin::webbycommerce.cart').findOne({
        where: { user: user.id },
        select: ['id'],
      });

      const cartItems = cart?.id
        ? await strapi.db.query('plugin::webbycommerce.cart-item').findMany({
            where: { cart: cart.id },
            populate: {
              product: {
                populate: ['images'],
              },
            },
          })
        : [];

      if (cartItems.length === 0) {
        return ctx.badRequest('Cart is empty');
      }

      // Validate cart items and calculate totals
      let subtotal = 0;
      let totalItems = 0;
      const orderItems = [];

      for (const cartItem of cartItems) {
        const product = cartItem.product;

        // Check if product exists
        if (!product) {
          return ctx.badRequest(`Product with ID ${cartItem.product} not found`);
        }

        // Check stock availability
        if (product.stock_status !== 'in_stock' || product.stock_quantity < cartItem.quantity) {
          return ctx.badRequest(`Insufficient stock for product: ${product.name}`);
        }

        // Calculate item total
        const itemPrice = parseFloat(product.price);
        const itemTotal = itemPrice * cartItem.quantity;
        subtotal += itemTotal;
        totalItems += cartItem.quantity;

        // Prepare order item
        orderItems.push({
          product_id: product.id,
          product_name: product.name,
          product_sku: product.sku,
          product_price: itemPrice,
          quantity: cartItem.quantity,
          total_price: itemTotal,
          product_image: product.images?.[0]?.url || null,
        });
      }

      // Calculate totals (you can extend this with tax, shipping, discount calculations)
      const taxAmount = 0; // Implement tax calculation logic
      const shippingAmount = 0; // Implement shipping cost calculation logic
      const discountAmount = 0; // Implement discount calculation logic
      const total = subtotal + taxAmount + shippingAmount - discountAmount;

      // Generate unique order number
      const orderNumber = await this.generateOrderNumber();

      // Create order
      const order = await strapi.db.query('plugin::webbycommerce.order').create({
        data: {
          order_number: orderNumber,
          status: 'pending',
          user: user.id,
          items: cartItems.map(item => item.product.id),
          subtotal: subtotal.toFixed(2),
          tax_amount: taxAmount.toFixed(2),
          shipping_amount: shippingAmount.toFixed(2),
          discount_amount: discountAmount.toFixed(2),
          total: total.toFixed(2),
          currency: 'USD',
          billing_address,
          shipping_address,
          payment_method: normalizedPaymentMethod,
          payment_status: 'pending',
          shipping_method: shipping_method || null,
          notes: notes || null,
        },
      });

      // Update product stock quantities
      for (const cartItem of cartItems) {
        const newStockQuantity = cartItem.product.stock_quantity - cartItem.quantity;
        const newStockStatus = newStockQuantity <= 0 ? 'out_of_stock' : 'in_stock';

        await strapi.db.query('plugin::webbycommerce.product').update({
          where: { id: cartItem.product.id },
          data: {
            stock_quantity: newStockQuantity,
            stock_status: newStockStatus,
          },
        });
      }

      // Clear cart after successful order creation
      await strapi.db.query('plugin::webbycommerce.cart-item').deleteMany({
        where: cart?.id ? { cart: cart.id } : { user: user.id },
      });

      // Send order confirmation email (optional)
      try {
        await this.sendOrderConfirmationEmail(user, order);
      } catch (emailError) {
        strapi.log.error('Failed to send order confirmation email:', emailError);
        // Don't fail the order if email fails
      }

      // Return order details
      ctx.send({
        data: {
          order_id: order.id,
          order_number: order.order_number,
          status: order.status,
          total: parseFloat(order.total),
          currency: order.currency,
          items: order.items,
          created_at: order.createdAt,
        },
        message: 'Order created successfully',
      });

    } catch (error) {
      strapi.log.error('Checkout error:', error);
      ctx.badRequest('Failed to process checkout');
    }
  },

  // Get user orders
  async getOrders(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const { page = 1, limit = 10, status } = ctx.query;

      const query = {
        where: { user: user.id },
        orderBy: { createdAt: 'desc' },
        populate: ['items'],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      };

      if (status) {
        query.where.status = status;
      }

      const orders = await strapi.db.query('plugin::webbycommerce.order').findMany(query);
      const total = await strapi.db.query('plugin::webbycommerce.order').count({
        where: { user: user.id, ...(status && { status }) },
      });

      const formattedOrders = orders.map(order => ({
        id: order.id,
        order_number: order.order_number,
        status: order.status,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        total: parseFloat(order.total),
        currency: order.currency,
        items_count: order.items.length,
        created_at: order.createdAt,
        estimated_delivery: order.estimated_delivery,
      }));

      ctx.send({
        data: formattedOrders,
        meta: {
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit)),
          },
        },
      });

    } catch (error) {
      strapi.log.error('Get orders error:', error);
      ctx.badRequest('Failed to retrieve orders');
    }
  },

  // Get specific order
  async getOrder(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest('Order ID is required');
      }

      const order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: { id: id },
        populate: ['billing_address', 'shipping_address', 'items'],
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      if (order.user !== user.id) {
        return ctx.forbidden('You can only view your own orders');
      }

      ctx.send({
        data: {
          id: order.id,
          order_number: order.order_number,
          status: order.status,
          payment_status: order.payment_status,
          items: order.items,
          subtotal: parseFloat(order.subtotal),
          tax_amount: parseFloat(order.tax_amount),
          shipping_amount: parseFloat(order.shipping_amount),
          discount_amount: parseFloat(order.discount_amount),
          total: parseFloat(order.total),
          currency: order.currency,
          billing_address: order.billing_address,
          shipping_address: order.shipping_address,
          payment_method: order.payment_method,
          shipping_method: order.shipping_method,
          notes: order.notes,
          tracking_number: order.tracking_number,
          estimated_delivery: order.estimated_delivery,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        },
      });

    } catch (error) {
      strapi.log.error('Get order error:', error);
      ctx.badRequest('Failed to retrieve order');
    }
  },

  // Cancel order (only if pending)
  async cancelOrder(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest('Order ID is required');
      }

      const order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: { id: id },
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      if (order.user !== user.id) {
        return ctx.forbidden('You can only cancel your own orders');
      }

      if (order.status !== 'pending') {
        return ctx.badRequest('Only pending orders can be cancelled');
      }

      // Update order status
      const updatedOrder = await strapi.db.query('plugin::webbycommerce.order').update({
        where: { id: id },
        data: { status: 'cancelled' },
      });

      // Restore product stock quantities
      for (const item of order.items) {
        const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
          where: { id: item.product_id },
        });

        if (product) {
          const newStockQuantity = product.stock_quantity + item.quantity;
          const newStockStatus = newStockQuantity > 0 ? 'in_stock' : 'out_of_stock';

          await strapi.db.query('plugin::webbycommerce.product').update({
            where: { id: item.product_id },
            data: {
              stock_quantity: newStockQuantity,
              stock_status: newStockStatus,
            },
          });
        }
      }

      ctx.send({
        data: {
          id: updatedOrder.id,
          order_number: updatedOrder.order_number,
          status: updatedOrder.status,
        },
        message: 'Order cancelled successfully',
      });

    } catch (error) {
      strapi.log.error('Cancel order error:', error);
      ctx.badRequest('Failed to cancel order');
    }
  },

  // Update order status (admin only)
  async updateOrderStatus(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const { id } = ctx.params;
      const { status, tracking_number, estimated_delivery, notes } = ctx.request.body;

      if (!id) {
        return ctx.badRequest('Order ID is required');
      }

      if (!status) {
        return ctx.badRequest('Status is required');
      }

      // Validate status
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
      if (!validStatuses.includes(status)) {
        return ctx.badRequest(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Find order
      const order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: { id: id },
        populate: ['user'],
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      // For regular users, they can only view their own orders
      // For admins, they can update any order status
      const isAdmin = user.role && (user.role.type === 'superadmin' || user.role.name === 'Administrator');
      if (!isAdmin && order.user.id !== user.id) {
        return ctx.forbidden('You can only update your own orders');
      }

      // Prepare update data
      const updateData = { status };

      // Add optional fields if provided
      if (tracking_number !== undefined) {
        updateData.tracking_number = tracking_number;
      }

      if (estimated_delivery !== undefined) {
        updateData.estimated_delivery = new Date(estimated_delivery);
      }

      if (notes !== undefined) {
        updateData.notes = notes;
      }

      // Update order
      const updatedOrder = await strapi.db.query('plugin::webbycommerce.order').update({
        where: { id: id },
        data: updateData,
      });

      // Send status update email notification
      try {
        if (order.user.email) {
          await this.sendOrderStatusUpdateEmail(order.user, updatedOrder, status);
        }
      } catch (emailError) {
        strapi.log.error('Failed to send order status update email:', emailError);
        // Don't fail the update if email fails
      }

      // If order is being cancelled and wasn't already cancelled, restore stock
      if (status === 'cancelled' && order.status !== 'cancelled') {
        await this.restoreOrderStock(order);
      }

      ctx.send({
        data: {
          id: updatedOrder.id,
          order_number: updatedOrder.order_number,
          status: updatedOrder.status,
          tracking_number: updatedOrder.tracking_number,
          estimated_delivery: updatedOrder.estimated_delivery,
          updated_at: updatedOrder.updatedAt,
        },
        message: 'Order status updated successfully',
      });

    } catch (error) {
      strapi.log.error('Update order status error:', error);
      ctx.badRequest('Failed to update order status');
    }
  },

  // Get order tracking information
  async getOrderTracking(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      const hasPermission = await ensureEcommercePermission(ctx);
      if (!hasPermission) {
        return;
      }

      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest('Order ID is required');
      }

      const order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: { id: id },
        populate: ['shipping_address'],
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      if (order.user !== user.id) {
        return ctx.forbidden('You can only view your own order tracking');
      }

      // Generate tracking timeline based on order status
      const trackingTimeline = this.generateTrackingTimeline(order);

      ctx.send({
        data: {
          order_id: order.id,
          order_number: order.order_number,
          status: order.status,
          tracking_number: order.tracking_number,
          estimated_delivery: order.estimated_delivery,
          shipping_method: order.shipping_method,
          shipping_address: order.shipping_address,
          tracking_timeline: trackingTimeline,
          current_location: this.getCurrentLocation(order.status),
          delivery_status: this.getDeliveryStatus(order.status),
        },
      });

    } catch (error) {
      strapi.log.error('Get order tracking error:', error);
      ctx.badRequest('Failed to retrieve order tracking information');
    }
  },

  // Generate unique order number
  async generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  },

  // Send order confirmation email
  async sendOrderConfirmationEmail(user, order) {
    const settings = await strapi.store({ type: 'plugin', name: 'webbycommerce' }).get({ key: 'settings' });
    const smtpSettings = settings?.smtp;

    if (!smtpSettings) {
      strapi.log.warn('SMTP settings not configured, skipping order confirmation email');
      return;
    }

    const emailData = {
      to: user.email,
      subject: `Order Confirmation - ${order.order_number}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${user.username || 'Customer'},</p>
        <p>Thank you for your order! Here are the details:</p>
        <h3>Order #${order.order_number}</h3>
        <p><strong>Total: $${order.total} ${order.currency}</strong></p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items.map(item => `<li>${item.product_name} (x${item.quantity}) - $${item.total_price}</li>`).join('')}
        </ul>
        <p>We will process your order shortly.</p>
        <p>Best regards,<br>Your Ecommerce Team</p>
      `,
    };

    await sendEmail(emailData);
  },

  // Send order status update email
  async sendOrderStatusUpdateEmail(user, order, newStatus) {
    const settings = await strapi.store({ type: 'plugin', name: 'webbycommerce' }).get({ key: 'settings' });
    const smtpSettings = settings?.smtp;

    if (!smtpSettings) {
      strapi.log.warn('SMTP settings not configured, skipping order status update email');
      return;
    }

    const statusMessages = {
      pending: 'Your order is being prepared',
      processing: 'Your order is now being processed',
      shipped: 'Your order has been shipped',
      delivered: 'Your order has been delivered successfully',
      cancelled: 'Your order has been cancelled',
      refunded: 'Your order has been refunded'
    };

    const emailData = {
      to: user.email,
      subject: `Order Status Update - ${order.order_number}`,
      html: `
        <h2>Order Status Update</h2>
        <p>Dear ${user.username || 'Customer'},</p>
        <p>Your order status has been updated:</p>
        <h3>Order #${order.order_number}</h3>
        <p><strong>Status: ${newStatus.toUpperCase()}</strong></p>
        <p><strong>Message:</strong> ${statusMessages[newStatus] || 'Status updated'}</p>
        ${order.tracking_number ? `<p><strong>Tracking Number:</strong> ${order.tracking_number}</p>` : ''}
        ${order.estimated_delivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(order.estimated_delivery).toLocaleDateString()}</p>` : ''}
        <p>You can track your order at any time using our order tracking feature.</p>
        <p>Best regards,<br>Your Ecommerce Team</p>
      `,
    };

    await sendEmail(emailData);
  },

  // Restore stock when order is cancelled
  async restoreOrderStock(order) {
    try {
      for (const item of order.items) {
        const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
          where: { id: item.product_id },
        });

        if (product) {
          const newStockQuantity = product.stock_quantity + item.quantity;
          const newStockStatus = newStockQuantity > 0 ? 'in_stock' : 'out_of_stock';

          await strapi.db.query('plugin::webbycommerce.product').update({
            where: { id: item.product_id },
            data: {
              stock_quantity: newStockQuantity,
              stock_status: newStockStatus,
            },
          });
        }
      }
    } catch (error) {
      strapi.log.error('Failed to restore order stock:', error);
    }
  },

  // Generate tracking timeline based on order status
  generateTrackingTimeline(order) {
    const timeline = [];
    const createdAt = new Date(order.createdAt);
    const updatedAt = new Date(order.updatedAt);

    // Order placed
    timeline.push({
      status: 'Order Placed',
      description: 'Your order has been successfully placed',
      timestamp: createdAt.toISOString(),
      completed: true,
    });

    // Order confirmed/processing
    if (['processing', 'shipped', 'delivered'].includes(order.status)) {
      timeline.push({
        status: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        timestamp: createdAt.toISOString(),
        completed: true,
      });
    } else {
      timeline.push({
        status: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        completed: false,
      });
    }

    // Order shipped
    if (['shipped', 'delivered'].includes(order.status)) {
      timeline.push({
        status: 'Order Shipped',
        description: `Your order has been shipped${order.tracking_number ? ` (Tracking: ${order.tracking_number})` : ''}`,
        timestamp: order.status === 'shipped' ? updatedAt.toISOString() : createdAt.toISOString(),
        completed: true,
      });
    } else if (order.status === 'processing') {
      timeline.push({
        status: 'Order Shipped',
        description: 'Your order will be shipped soon',
        completed: false,
      });
    }

    // Order delivered
    if (order.status === 'delivered') {
      timeline.push({
        status: 'Order Delivered',
        description: 'Your order has been successfully delivered',
        timestamp: updatedAt.toISOString(),
        completed: true,
      });
    } else {
      timeline.push({
        status: 'Order Delivered',
        description: `Estimated delivery: ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : 'TBD'}`,
        completed: false,
      });
    }

    return timeline;
  },

  // Get current location based on status
  getCurrentLocation(status) {
    const locations = {
      pending: 'Order Processing Center',
      processing: 'Order Processing Center',
      shipped: 'In Transit',
      delivered: 'Delivered to customer',
      cancelled: 'Order cancelled',
      refunded: 'Refund processed'
    };
    return locations[status] || 'Unknown';
  },

  // Get delivery status description
  getDeliveryStatus(status) {
    const statuses = {
      pending: 'Your order is being prepared',
      processing: 'Your order is being processed',
      shipped: 'Your order is on the way',
      delivered: 'Your order has been delivered successfully',
      cancelled: 'Your order has been cancelled',
      refunded: 'Your order has been refunded'
    };
    return statuses[status] || 'Status unknown';
  },
};