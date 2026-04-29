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
        notes,
        // tax_amount,
        shipping_amount,
        discount_amount
      } = ctx.request.body;

      // Validate required fields
      if (!billing_address || !shipping_address || !payment_method) {
        return ctx.badRequest('Billing address, shipping address, and payment method are required');
      }

      // Payment method is an enum string (e.g. "Stripe", "PayPal", "Razorpay", "COD").
      // Handle case where payment_method might be an object
      let normalizedPaymentMethod = 'COD'; // Default fallback
      if (payment_method) {
        if (typeof payment_method === 'object' && payment_method !== null) {
          // Extract from object
          normalizedPaymentMethod = payment_method.type || payment_method.method || payment_method.name || 'COD';
        } else if (typeof payment_method === 'string') {
          // Use string directly
          normalizedPaymentMethod = payment_method;
        }
      }

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

      // Calculate totals using values from request (default to 0 if not provided)
      // const taxAmount = tax_amount != null ? (parseFloat(tax_amount) || 0) : 0;
      // const taxAmount = await strapi
      //   .plugin("webbycommerce")
      //   .service("taxService")
      //   .calculateTax({
      //     items: orderItems,               // better: per-item support
      //     subtotal,
      //     address: shipping_address,      // or billing_address (your rule)
      //     shipping: finalShippingAmount,
      //   });
      // const finalShippingAmount = shipping_amount != null ? (parseFloat(shipping_amount) || 0) : 0;
      // const finalDiscountAmount = discount_amount != null ? (parseFloat(discount_amount) || 0) : 0;
      // const total = subtotal + taxAmount + finalShippingAmount - finalDiscountAmount;


      // ✅ FIRST define values
      const finalShippingAmount = shipping_amount != null
        ? (parseFloat(shipping_amount) || 0)
        : 0;

      const finalDiscountAmount = discount_amount != null
        ? (parseFloat(discount_amount) || 0)
        : 0;

      // ✅ THEN call tax service
      const taxAmount = await strapi
        .plugin("webbycommerce")
        .service("taxService")
        .calculateTax({
          items: orderItems,
          subtotal,
          address: shipping_address,
          shipping: finalShippingAmount,
        });

      // ✅ THEN total
      const total = subtotal + taxAmount + finalShippingAmount - finalDiscountAmount;


      // Generate unique order number
      const orderNumber = await this.generateOrderNumber();

      // Prepare items connection for manyToMany relation
      const itemsConnect = cartItems.length > 0
        ? { connect: cartItems.map(item => ({ id: item.product.id })) }
        : undefined;

      // Create order
      const orderData = {
        order_number: orderNumber,
        status: 'pending',
        user: user.id,
        subtotal: subtotal.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        shipping_amount: finalShippingAmount.toFixed(2), // Use from request
        discount_amount: finalDiscountAmount.toFixed(2), // Use from request
        total: total.toFixed(2),
        currency: 'USD',
        billing_address,
        shipping_address,
        payment_method: normalizedPaymentMethod, // Store as string
        payment_status: 'pending',
        shipping_method: shipping_method || null,
        notes: notes || null,
      };

      if (itemsConnect) {
        orderData.items = itemsConnect;
      }

      const order = await strapi.db.query('plugin::webbycommerce.order').create({
        data: orderData,
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

      // Return order details - include all fields for thank you page
      ctx.send({
        data: {
          order_id: order.id,
          order_number: order.order_number,
          status: order.status,
          subtotal: parseFloat(order.subtotal),
          tax_amount: parseFloat(order.tax_amount),
          shipping_amount: parseFloat(order.shipping_amount),
          discount_amount: parseFloat(order.discount_amount),
          total: parseFloat(order.total),
          currency: order.currency,
          payment_method: order.payment_method, // Return payment method as string
          shipping_method: order.shipping_method,
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
        populate: ['items', 'billing_address', 'shipping_address', 'user', 'payment_transactions'],
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

      // Format orders with all data
      const formattedOrders = await Promise.all(orders.map(async (order) => {
        // Format items with full product details
        let formattedItems = [];
        if (order.items && order.items.length > 0) {
          const itemIds = order.items.map(item => typeof item === 'object' && item.id ? item.id : item);

          const products = await strapi.db.query('plugin::webbycommerce.product').findMany({
            where: {
              id: { $in: itemIds },
            },
            populate: {
              images: true,
            },
          });

          formattedItems = products.map(product => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: parseFloat(product.price || 0),
            sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
            images: product.images || [],
            slug: product.slug,
            description: product.description,
          }));
        } else if (order.items && Array.isArray(order.items)) {
          // Items are already populated, format them
          formattedItems = order.items.map(item => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            price: parseFloat(item.price || 0),
            sale_price: item.sale_price ? parseFloat(item.sale_price) : null,
            images: item.images || [],
            slug: item.slug,
            description: item.description,
          }));
        }

        const shippingAmount = parseFloat(order.shipping_amount || 0);
        const subtotalAmount = parseFloat(order.subtotal || 0);
        const discountAmount = parseFloat(order.discount_amount || 0);

        return {
          id: order.id,
          order_number: order.order_number,
          status: order.status,
          payment_status: order.payment_status,
          items: formattedItems,
          items_count: formattedItems.length,
          subtotal: subtotalAmount,
          tax_amount: parseFloat(order.tax_amount || 0),
          shipping: shippingAmount,
          shipping_amount: shippingAmount,
          discount: discountAmount,
          discount_amount: discountAmount,
          total: parseFloat(order.total || 0),
          currency: order.currency,
          billing_address: order.billing_address,
          shipping_address: order.shipping_address,
          payment_method: (() => {
            // Ensure payment_method is always a string
            if (!order.payment_method) return 'N/A';
            if (typeof order.payment_method === 'object' && order.payment_method !== null) {
              return order.payment_method.type || order.payment_method.method || order.payment_method.name || String(order.payment_method);
            }
            return String(order.payment_method);
          })(),
          shipping_method: order.shipping_method,
          notes: order.notes,
          tracking_number: order.tracking_number,
          estimated_delivery: order.estimated_delivery,
          payment_transactions: order.payment_transactions || [],
          user: order.user ? {
            id: order.user.id,
            username: order.user.username,
            email: order.user.email,
          } : null,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        };
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
        return ctx.badRequest('Order ID or order number is required');
      }

      // Determine if id is a numeric ID or an order_number (starts with ORD-)
      const isOrderNumber = id.toString().startsWith('ORD-');

      const whereClause = {
        user: user.id, // Filter by user ID directly for security
      };

      if (isOrderNumber) {
        whereClause.order_number = id;
      } else {
        whereClause.id = id;
      }

      // First, get the order with basic populate
      let order = await strapi.db.query('plugin::webbycommerce.order').findOne({
        where: whereClause,
        populate: ['billing_address', 'shipping_address', 'items', 'user'],
      });

      if (!order) {
        // Don't reveal if order exists but belongs to another user
        return ctx.notFound('Order not found');
      }

      // If items exist but aren't fully populated, fetch them separately
      let formattedItems = [];
      if (order.items && order.items.length > 0) {
        // Items might be just IDs, so fetch full product details
        const itemIds = order.items.map(item => typeof item === 'object' && item.id ? item.id : item);

        const products = await strapi.db.query('plugin::webbycommerce.product').findMany({
          where: {
            id: { $in: itemIds },
          },
          populate: {
            images: true,
          },
        });

        formattedItems = products.map(product => ({
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: parseFloat(product.price || 0),
          sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
          images: product.images || [],
          slug: product.slug,
          description: product.description,
        }));
      } else if (order.items && Array.isArray(order.items)) {
        // Items are already populated, format them
        formattedItems = order.items.map(item => ({
          id: item.id,
          name: item.name,
          sku: item.sku,
          price: parseFloat(item.price || 0),
          sale_price: item.sale_price ? parseFloat(item.sale_price) : null,
          images: item.images || [],
          slug: item.slug,
          description: item.description,
        }));
      }

      const shippingAmount = parseFloat(order.shipping_amount || 0);
      const subtotalAmount = parseFloat(order.subtotal || 0);
      const discountAmount = parseFloat(order.discount_amount || 0);

      ctx.send({
        data: {
          id: order.id,
          order_number: order.order_number,
          status: order.status,
          payment_status: order.payment_status,
          items: formattedItems,
          items_count: formattedItems.length,
          subtotal: subtotalAmount,
          tax_amount: parseFloat(order.tax_amount || 0),
          shipping: shippingAmount,
          shipping_amount: shippingAmount,
          discount: discountAmount,
          discount_amount: discountAmount,
          total: parseFloat(order.total || 0),
          currency: order.currency,
          billing_address: order.billing_address,
          shipping_address: order.shipping_address,
          payment_method: (() => {
            // Ensure payment_method is always a string
            if (!order.payment_method) return 'N/A';
            if (typeof order.payment_method === 'object' && order.payment_method !== null) {
              return order.payment_method.type || order.payment_method.method || order.payment_method.name || String(order.payment_method);
            }
            return String(order.payment_method);
          })(),
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

  // Cancel order (only if pending or processing)
  async cancelOrder(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Authentication required');
      }

      // Check ecommerce permission
      try {
        const hasPermission = await ensureEcommercePermission(ctx);
        if (!hasPermission) {
          return; // ensureEcommercePermission already sent the response
        }
      } catch (permissionError) {
        strapi.log.error(`[cancelOrder] Error checking permission:`, permissionError);
        return ctx.badRequest('Permission check failed');
      }

      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest('Order ID is required');
      }

      // Normalize ID (handle both string and number)
      const orderId = typeof id === 'string' ? (isNaN(id) ? id : parseInt(id, 10)) : id;

      strapi.log.info(`[cancelOrder] Attempting to cancel order ${orderId} (original: ${id}, type: ${typeof id}) for user ${user.id}`);

      // Query order - try with normalized ID first
      let order;
      try {
        order = await strapi.db.query('plugin::webbycommerce.order').findOne({
          where: {
            id: orderId,
            user: user.id, // Filter by user ID directly for security
          },
          populate: ['items', 'user'],
        });

        // If not found with normalized ID, try with original ID
        if (!order && orderId !== id) {
          strapi.log.info(`[cancelOrder] Order not found with normalized ID ${orderId}, trying original ID ${id}`);
          order = await strapi.db.query('plugin::webbycommerce.order').findOne({
            where: {
              id: id,
              user: user.id,
            },
            populate: ['items', 'user'],
          });
        }
      } catch (queryError) {
        strapi.log.error(`[cancelOrder] Error querying order ${orderId}:`, queryError);
        strapi.log.error(`[cancelOrder] Query error message:`, queryError.message);
        return ctx.badRequest(`Failed to retrieve order: ${queryError.message || 'Database error'}`);
      }

      if (!order) {
        strapi.log.warn(`[cancelOrder] Order ${orderId} not found for user ${user.id}`);
        // Don't reveal if order exists but belongs to another user
        return ctx.notFound('Order not found');
      }

      strapi.log.info(`[cancelOrder] Found order ${order.id} (order_number: ${order.order_number}) with status: ${order.status || 'null/undefined'}`);

      // Check if order can be cancelled
      const orderStatus = order.status || '';
      const cancellableStatuses = ['pending', 'processing'];

      if (!orderStatus) {
        strapi.log.warn(`[cancelOrder] Order ${order.id} has no status`);
        return ctx.badRequest('Order status is invalid');
      }

      if (!cancellableStatuses.includes(orderStatus)) {
        if (orderStatus === 'cancelled') {
          return ctx.badRequest('Order is already cancelled');
        }
        if (orderStatus === 'delivered') {
          return ctx.badRequest('Delivered orders cannot be cancelled');
        }
        if (orderStatus === 'shipped') {
          return ctx.badRequest('Shipped orders cannot be cancelled. Please contact support for returns.');
        }
        return ctx.badRequest(`Order with status '${orderStatus}' cannot be cancelled`);
      }

      // Update order status
      let updatedOrder;
      try {
        updatedOrder = await strapi.db.query('plugin::webbycommerce.order').update({
          where: { id: order.id },
          data: { status: 'cancelled' },
        });

        if (!updatedOrder) {
          strapi.log.error(`[cancelOrder] Failed to update order ${order.id} status - update returned null`);
          return ctx.badRequest('Failed to update order status');
        }

        strapi.log.info(`[cancelOrder] Successfully updated order ${order.id} status to cancelled`);
      } catch (updateError) {
        strapi.log.error(`[cancelOrder] Error updating order ${order.id}:`, updateError);
        strapi.log.error(`[cancelOrder] Update error message:`, updateError.message);
        strapi.log.error(`[cancelOrder] Update error stack:`, updateError.stack);
        return ctx.badRequest(`Failed to update order status: ${updateError.message || 'Unknown error'}`);
      }

      // Restore product stock quantities (non-blocking - don't fail cancellation if this fails)
      // Note: order.items is a manyToMany relation to products, so items are product objects
      // Since quantities aren't stored in the order, we'll restore 1 unit per product
      // This is a limitation of the current schema - ideally quantities should be stored
      if (order.items && Array.isArray(order.items) && order.items.length > 0) {
        try {
          for (const item of order.items) {
            // item is a product object from the manyToMany relation
            const productId = typeof item === 'object' && item.id ? item.id : item;

            if (!productId) {
              strapi.log.warn(`[cancelOrder] Skipping item with invalid ID for order ${order.id}`);
              continue;
            }

            try {
              const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
                where: { id: productId },
              });

              if (product) {
                // Since we don't have exact quantities, restore 1 unit per product
                // This is a limitation - ideally order items should store quantities
                const quantityToRestore = 1;
                const newStockQuantity = (product.stock_quantity || 0) + quantityToRestore;
                const newStockStatus = newStockQuantity > 0 ? 'in_stock' : 'out_of_stock';

                await strapi.db.query('plugin::webbycommerce.product').update({
                  where: { id: productId },
                  data: {
                    stock_quantity: newStockQuantity,
                    stock_status: newStockStatus,
                  },
                });

                strapi.log.info(`[cancelOrder] Restored ${quantityToRestore} unit(s) of product ${productId} for order ${order.id}`);
              } else {
                strapi.log.warn(`[cancelOrder] Product ${productId} not found for order ${order.id}`);
              }
            } catch (productError) {
              strapi.log.error(`[cancelOrder] Error processing product ${productId} for order ${order.id}:`, productError);
              // Continue with other products
            }
          }
        } catch (stockError) {
          // Log error but don't fail the cancellation
          strapi.log.error(`[cancelOrder] Error restoring stock for order ${order.id}:`, stockError);
        }
      }

      // Send success response
      try {
        return ctx.send({
          data: {
            id: updatedOrder.id,
            order_number: updatedOrder.order_number,
            status: updatedOrder.status,
          },
          message: 'Order cancelled successfully',
        });
      } catch (sendError) {
        strapi.log.error(`[cancelOrder] Error sending response for order ${order.id}:`, sendError);
        // Even if sending response fails, order is already cancelled
        return ctx.send({
          data: {
            id: updatedOrder.id,
            order_number: updatedOrder.order_number,
            status: updatedOrder.status,
          },
          message: 'Order cancelled successfully',
        });
      }

    } catch (error) {
      strapi.log.error(`[cancelOrder] Unexpected error cancelling order:`, error);
      strapi.log.error(`[cancelOrder] Error name:`, error.name);
      strapi.log.error(`[cancelOrder] Error message:`, error.message);
      strapi.log.error(`[cancelOrder] Error stack:`, error.stack);

      // Provide more detailed error message
      const errorMessage = error.message || 'Unknown error occurred';
      const errorDetails = error.details ? JSON.stringify(error.details) : '';

      strapi.log.error(`[cancelOrder] Full error details:`, {
        name: error.name,
        message: errorMessage,
        details: errorDetails,
        stack: error.stack,
      });

      return ctx.badRequest(`Failed to cancel order: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`);
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
        where: {
          id: id,
          user: user.id, // Filter by user ID directly for security
        },
        populate: ['shipping_address', 'user'],
      });

      if (!order) {
        // Don't reveal if order exists but belongs to another user
        return ctx.notFound('Order not found');
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
    try {
      const settings = await strapi.store({ type: 'plugin', name: 'webbycommerce' }).get({ key: 'settings' });
      const smtpSettings = settings?.smtp;

      if (!smtpSettings) {
        strapi.log.warn('SMTP settings not configured, skipping order confirmation email');
        return;
      }

      // Ensure order has items populated
      let orderWithItems = order;
      if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
        // Fetch order with items populated
        orderWithItems = await strapi.db.query('plugin::webbycommerce.order').findOne({
          where: { id: order.id },
          populate: ['items'],
        });
      }

      // Format items for email
      // Note: order.items is a manyToMany relation to products, not order items with quantities
      let itemsHtml = '<li>No items found</li>';

      if (orderWithItems && orderWithItems.items && Array.isArray(orderWithItems.items) && orderWithItems.items.length > 0) {
        // Items are product objects, not order items with quantities
        // Since we don't have quantities stored, we'll just show product names
        itemsHtml = orderWithItems.items.map(item => {
          if (!item) return '';
          const productName = item.name || item.product_name || 'Unknown Product';
          const productPrice = item.price || item.product_price || 0;
          // We don't have quantity, so we'll show the product name and price
          return `<li>${productName} - $${parseFloat(productPrice).toFixed(2)}</li>`;
        }).filter(item => item !== '').join('');

        if (!itemsHtml) {
          itemsHtml = '<li>No items found</li>';
        }
      }

      const emailData = {
        to: user.email,
        subject: `Order Confirmation - ${order.order_number || orderWithItems?.order_number || 'N/A'}`,
        html: `
          <h2>Order Confirmation</h2>
          <p>Dear ${user.username || 'Customer'},</p>
          <p>Thank you for your order! Here are the details:</p>
          <h3>Order #${order.order_number || orderWithItems?.order_number || 'N/A'}</h3>
          <p><strong>Total: $${order.total || orderWithItems?.total || 0} ${order.currency || orderWithItems?.currency || 'USD'}</strong></p>
          <p><strong>Status:</strong> ${order.status || orderWithItems?.status || 'pending'}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${itemsHtml}
          </ul>
          <p>We will process your order shortly.</p>
          <p>Best regards,<br>Your Ecommerce Team</p>
        `,
      };

      await sendEmail(emailData);
      strapi.log.info(`Order confirmation email sent successfully for order ${order.id || orderWithItems?.id}`);
    } catch (error) {
      strapi.log.error('Error sending order confirmation email:', error);
      strapi.log.error('Email error details:', {
        message: error.message,
        stack: error.stack,
        orderId: order?.id,
        orderNumber: order?.order_number,
      });
      // Don't throw - email failures shouldn't break the order creation
    }
  },

  // Send order status update email
  async sendOrderStatusUpdateEmail(user, order, newStatus) {
    try {
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
        subject: `Order Status Update - ${order.order_number || 'N/A'}`,
        html: `
          <h2>Order Status Update</h2>
          <p>Dear ${user.username || 'Customer'},</p>
          <p>Your order status has been updated:</p>
          <h3>Order #${order.order_number || 'N/A'}</h3>
          <p><strong>Status: ${newStatus ? newStatus.toUpperCase() : 'UPDATED'}</strong></p>
          <p><strong>Message:</strong> ${statusMessages[newStatus] || 'Status updated'}</p>
          ${order.tracking_number ? `<p><strong>Tracking Number:</strong> ${order.tracking_number}</p>` : ''}
          ${order.estimated_delivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(order.estimated_delivery).toLocaleDateString()}</p>` : ''}
          <p>You can track your order at any time using our order tracking feature.</p>
          <p>Best regards,<br>Your Ecommerce Team</p>
        `,
      };

      await sendEmail(emailData);
      strapi.log.info(`Order status update email sent successfully for order ${order.id}`);
    } catch (error) {
      strapi.log.error('Error sending order status update email:', error);
      strapi.log.error('Email error details:', {
        message: error.message,
        stack: error.stack,
        orderId: order?.id,
        orderNumber: order?.order_number,
        newStatus: newStatus,
      });
      // Don't throw - email failures shouldn't break the status update
    }
  },

  // Restore stock when order is cancelled
  async restoreOrderStock(order) {
    try {
      if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
        strapi.log.warn(`[restoreOrderStock] No items found for order ${order.id}`);
        return;
      }

      for (const item of order.items) {
        // item is a product object from the manyToMany relation
        const productId = typeof item === 'object' && item.id ? item.id : item;

        if (!productId) {
          strapi.log.warn(`[restoreOrderStock] Skipping item with invalid ID for order ${order.id}`);
          continue;
        }

        const product = await strapi.db.query('plugin::webbycommerce.product').findOne({
          where: { id: productId },
        });

        if (product) {
          // Since we don't have exact quantities stored in order, restore 1 unit per product
          // This is a limitation - ideally order items should store quantities
          const quantityToRestore = 1;
          const newStockQuantity = (product.stock_quantity || 0) + quantityToRestore;
          const newStockStatus = newStockQuantity > 0 ? 'in_stock' : 'out_of_stock';

          await strapi.db.query('plugin::webbycommerce.product').update({
            where: { id: productId },
            data: {
              stock_quantity: newStockQuantity,
              stock_status: newStockStatus,
            },
          });

          strapi.log.info(`[restoreOrderStock] Restored ${quantityToRestore} unit(s) of product ${productId} for order ${order.id}`);
        } else {
          strapi.log.warn(`[restoreOrderStock] Product ${productId} not found for order ${order.id}`);
        }
      }
    } catch (error) {
      strapi.log.error(`[restoreOrderStock] Failed to restore order stock for order ${order.id}:`, error);
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