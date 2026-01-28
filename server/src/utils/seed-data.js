'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Seed demo data from demo-data.json
 */
async function seedDemoData(strapi) {
  try {
    strapi.log.info('[webbycommerce] Starting demo data seeding...');

    // Read demo data from JSON file
    const demoDataPath = path.join(__dirname, '../data/demo-data.json');
    const demoData = JSON.parse(fs.readFileSync(demoDataPath, 'utf8'));

    // Track created entities for relationships
    const entityMap = {
      users: new Map(),
      usersByIndex: [], 
      categories: new Map(),
      tags: new Map(),
      attributes: new Map(),
      products: new Map(),
      addresses: new Map(),
      orders: new Map(),
      coupons: new Map(),
      shippingZones: new Map(),
      carts: new Map(),
    };

    // Seed data in order of dependencies
    await seedCategories(strapi, demoData.categories, entityMap);
    await seedTags(strapi, demoData.tags, entityMap);
    await seedAttributes(strapi, demoData.attributes, entityMap); // Fixed Value Slug generation
    await seedCoupons(strapi, demoData.coupons, entityMap);
    await seedUsers(strapi, demoData.users, entityMap);
    await seedAddresses(strapi, demoData.addresses, entityMap);
    await seedProducts(strapi, demoData.products, entityMap);
    await seedProductVariations(strapi, demoData.product_variations, entityMap);
    await seedOrders(strapi, demoData.orders, entityMap);
    await seedPaymentTransactions(strapi, demoData.payment_transactions, entityMap);
    await seedShippingRules(strapi, demoData.shipping_rules, entityMap);
    await seedCarts(strapi, demoData.carts, entityMap);
    await seedCartItems(strapi, demoData.carts, entityMap);
    await seedCompares(strapi, demoData.compares, entityMap);
    await seedWishlists(strapi, demoData.wishlists, entityMap);
    await seedShippingZones(strapi, demoData.shipping_zones, entityMap);

    strapi.log.info('[webbycommerce] Demo data seeding completed successfully!');
    return { success: true, message: 'Demo data seeded successfully' };

  } catch (error) {
    strapi.log.error('[webbycommerce] Error seeding demo data:', error);
    throw error;
  }
}

async function seedCategories(strapi, categories, entityMap) {
  strapi.log.info('[webbycommerce] Seeding categories...');
  for (const category of categories) {
    try {
      const existingCategory = await strapi.entityService.findMany('plugin::webbycommerce.product-category', {
        filters: { slug: category.slug }
      });
      if (existingCategory.length > 0) {
        entityMap.categories.set(category.slug, existingCategory[0]);
        continue;
      }
      const createdCategory = await strapi.entityService.create('plugin::webbycommerce.product-category', {
        data: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          publishedAt: new Date(),
        }
      });
      entityMap.categories.set(category.slug, createdCategory);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating category ${category.name}:`, error);
    }
  }
}

async function seedTags(strapi, tags, entityMap) {
  strapi.log.info('[webbycommerce] Seeding tags...');
  for (const tag of tags) {
    try {
      const existingTag = await strapi.entityService.findMany('plugin::webbycommerce.product-tag', {
        filters: { slug: tag.slug }
      });
      if (existingTag.length > 0) {
        entityMap.tags.set(tag.slug, existingTag[0]);
        continue;
      }
      const createdTag = await strapi.entityService.create('plugin::webbycommerce.product-tag', {
        data: {
          name: tag.name,
          slug: tag.slug,
          publishedAt: new Date(),
        }
      });
      entityMap.tags.set(tag.slug, createdTag);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating tag ${tag.name}:`, error);
    }
  }
}

async function seedAttributes(strapi, attributes, entityMap) {
  strapi.log.info('[webbycommerce] Seeding product attributes...');

  for (const attribute of attributes) {
    try {
      // Strict slug generation from NAME
      const strictSlug = attribute.name.toLowerCase().trim().replace(/\s+/g, '-');

      const existingAttribute = await strapi.entityService.findMany('plugin::webbycommerce.product-attribute', {
        filters: { slug: strictSlug }
      });

      let attributeId;

      if (existingAttribute.length > 0) {
        attributeId = existingAttribute[0].id;
        entityMap.attributes.set(strictSlug, existingAttribute[0]);
      } else {
        // Create Attribute First
        const createdAttribute = await strapi.entityService.create('plugin::webbycommerce.product-attribute', {
          data: {
            name: attribute.name,
            display_name: attribute.display_name || attribute.name,
            slug: strictSlug,
            type: attribute.type,
            sort_order: 0,
            publishedAt: new Date(),
          }
        });
        attributeId = createdAttribute.id;
        entityMap.attributes.set(strictSlug, createdAttribute);
        strapi.log.info(`[webbycommerce] Created attribute: ${attribute.name}`);
      }

      // Create Values
      const attributeValues = [];
      if (attribute.values && attribute.values.length > 0) {
        for (const value of attribute.values) {
          try {
            // Generate slug for the value
            const valueSlug = value.toString().toLowerCase().trim().replace(/\s+/g, '-');
            
            const existingValue = await strapi.entityService.findMany('plugin::webbycommerce.product-attribute-value', {
              filters: {
                slug: valueSlug,
                product_attribute: attributeId
              }
            });

            if (existingValue.length > 0) {
              attributeValues.push(existingValue[0].id);
            } else {
              // CRITICAL FIX: Added slug: valueSlug
              const createdValue = await strapi.entityService.create('plugin::webbycommerce.product-attribute-value', {
                data: {
                  value: value,
                  slug: valueSlug, // <--- THIS WAS MISSING
                  product_attribute: attributeId,
                  publishedAt: new Date(),
                }
              });
              attributeValues.push(createdValue.id);
            }
          } catch (valueError) {
            strapi.log.error(`[webbycommerce] Error creating value ${value} for ${attribute.name}:`, valueError);
          }
        }
      }

      // Update Attribute with Values
      if (attributeValues.length > 0) {
        await strapi.entityService.update('plugin::webbycommerce.product-attribute', attributeId, {
          data: {
            product_attribute_values: attributeValues,
          }
        });
      }

    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating attribute ${attribute.name}:`, error);
    }
  }
}

async function seedCoupons(strapi, coupons, entityMap) {
  strapi.log.info('[webbycommerce] Seeding coupons...');
  for (const coupon of coupons) {
    try {
      const existingCoupon = await strapi.entityService.findMany('plugin::webbycommerce.coupon', {
        filters: { code: coupon.code }
      });
      if (existingCoupon.length > 0) {
        entityMap.coupons.set(coupon.code, existingCoupon[0]);
        continue;
      }
      const createdCoupon = await strapi.entityService.create('plugin::webbycommerce.coupon', {
        data: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
          description: coupon.description,
          usage_limit: coupon.usage_limit,
          is_active: coupon.is_active,
          expires_at: coupon.expires_at,
          publishedAt: new Date(),
        }
      });
      entityMap.coupons.set(coupon.code, createdCoupon);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating coupon ${coupon.code}:`, error);
    }
  }
}

async function seedUsers(strapi, users, entityMap) {
  strapi.log.info('[webbycommerce] Seeding users...');
  for (const user of users) {
    try {
      const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email: user.email }
      });
      if (existingUser) {
        entityMap.users.set(user.email, existingUser);
        entityMap.usersByIndex.push(existingUser);
        continue;
      }
      const createdUser = await strapi.plugins['users-permissions'].services.user.add({
        username: user.username,
        email: user.email,
        password: user.password,
        confirmed: user.confirmed,
        blocked: user.blocked,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      if (!createdUser.role) {
        const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: { type: 'authenticated' }
        });
        if (authenticatedRole) {
          await strapi.db.query('plugin::users-permissions.user').update({
            where: { id: createdUser.id },
            data: { role: authenticatedRole.id }
          });
        }
      }
      entityMap.users.set(user.email, createdUser);
      entityMap.usersByIndex.push(createdUser);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating user ${user.email}:`, error);
    }
  }
}

async function seedAddresses(strapi, addresses, entityMap) {
  strapi.log.info('[webbycommerce] Seeding addresses...');
  for (const address of addresses) {
    try {
      const user = entityMap.users.get(address.email_address);
      if (!user) continue;
      const existingAddress = await strapi.entityService.findMany('plugin::webbycommerce.address', {
        filters: { email_address: address.email_address, type: address.type }
      });
      if (existingAddress.length > 0) continue;
      const createdAddress = await strapi.entityService.create('plugin::webbycommerce.address', {
        data: {
          ...address,
          user: user.id,
          publishedAt: new Date(),
        }
      });
      entityMap.addresses.set(`${address.email_address}_${address.type}`, createdAddress);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating address:`, error);
    }
  }
}

async function seedProducts(strapi, products, entityMap) {
  strapi.log.info('[webbycommerce] Seeding products...');
  for (const product of products) {
    try {
      const existingProduct = await strapi.entityService.findMany('plugin::webbycommerce.product', {
        filters: { slug: product.slug }
      });
      if (existingProduct.length > 0) {
        entityMap.products.set(product.slug, existingProduct[0]);
        continue;
      }
      const categoryIds = product.categories.map(catSlug => {
        const category = entityMap.categories.get(catSlug);
        return category ? category.id : null;
      }).filter(id => id !== null);

      const tagIds = product.tags.map(tagSlug => {
        const tag = entityMap.tags.get(tagSlug);
        return tag ? tag.id : null;
      }).filter(id => id !== null);

      const createdProduct = await strapi.entityService.create('plugin::webbycommerce.product', {
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          sale_price: product.sale_price || null,
          sku: product.sku,
          stock_quantity: product.stock_quantity,
          stock_status: product.stock_status,
          weight: product.weight,
          product_categories: categoryIds,
          tags: tagIds,
          publishedAt: new Date(),
        }
      });
      entityMap.products.set(product.slug, createdProduct);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating product ${product.name}:`, error);
    }
  }
}

async function seedProductVariations(strapi, productVariations, entityMap) {
  strapi.log.info('[webbycommerce] Seeding product variations...');
  for (const variation of productVariations) {
    try {
      const existingVariation = await strapi.entityService.findMany('plugin::webbycommerce.product-variation', {
        filters: { sku: variation.sku }
      });
      if (existingVariation.length > 0) continue;

      const product = entityMap.products.get(variation.product);
      if (!product) continue;

      await strapi.entityService.create('plugin::webbycommerce.product-variation', {
        data: {
          ...variation,
          product: product.id,
          publishedAt: new Date(),
        }
      });
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating product variation:`, error);
    }
  }
}

async function seedOrders(strapi, orders, entityMap) {
  strapi.log.info('[webbycommerce] Seeding orders...');
  for (const order of orders) {
    try {
      const existingOrder = await strapi.entityService.findMany('plugin::webbycommerce.order', {
        filters: { order_number: order.order_number }
      });
      if (existingOrder.length > 0) {
        entityMap.orders.set(order.order_number, existingOrder[0]);
        continue;
      }
      const user = entityMap.usersByIndex[order.user];
      if (!user) continue;

      const billingAddress = entityMap.addresses.get(`${order.billing_address}_billing`);
      const shippingAddress = entityMap.addresses.get(`${order.shipping_address}_shipping`);

      const createdOrder = await strapi.entityService.create('plugin::webbycommerce.order', {
        data: {
          order_number: order.order_number,
          status: order.status,
          subtotal: order.subtotal,
          tax_amount: order.tax_amount,
          shipping_amount: order.shipping_amount,
          total: order.total,
          currency: order.currency,
          payment_status: order.payment_status,
          payment_method: order.payment_method,
          user: user.id,
          billing_address: billingAddress ? billingAddress.id : null,
          shipping_address: shippingAddress ? shippingAddress.id : null,
          publishedAt: new Date(),
        }
      });
      entityMap.orders.set(order.order_number, createdOrder);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating order ${order.order_number}:`, error);
    }
  }
}

async function seedPaymentTransactions(strapi, transactions, entityMap) {
  strapi.log.info('[webbycommerce] Seeding payment transactions...');
  const ordersList = Array.from(entityMap.orders.values());

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    try {
      const existingTransaction = await strapi.entityService.findMany('plugin::webbycommerce.payment-transaction', {
        filters: { transaction_id: transaction.transaction_id }
      });

      if (existingTransaction.length > 0) continue;

      const order = ordersList[i];

      const createdTransaction = await strapi.entityService.create('plugin::webbycommerce.payment-transaction', {
        data: {
          transaction_id: transaction.transaction_id,
          payment_method: transaction.payment_method,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          processed_at: transaction.processed_at,
          order: order ? order.id : null, // Link Order here
          publishedAt: new Date(),
        }
      });
      strapi.log.info(`[webbycommerce] Created payment transaction: ${transaction.transaction_id} linked to Order ${order ? order.order_number : 'None'}`);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating payment transaction ${transaction.transaction_id}:`, error);
    }
  }
}

async function seedShippingRules(strapi, shippingRules, entityMap) {
  strapi.log.info('[webbycommerce] Seeding shipping rules...');
  for (const rule of shippingRules) {
    try {
      const existingRule = await strapi.entityService.findMany('plugin::webbycommerce.shipping-rule', {
        filters: { name: rule.name }
      });
      if (existingRule.length > 0) continue;
      await strapi.entityService.create('plugin::webbycommerce.shipping-rule', {
        data: { ...rule, publishedAt: new Date() }
      });
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating shipping rule:`, error);
    }
  }
}

async function seedCompares(strapi, compares, entityMap) {
  strapi.log.info('[webbycommerce] Seeding compares...');
  for (const compare of compares) {
    try {
      const user = entityMap.users.get(compare.userEmail);
      if (!user) continue;

      const productIds = compare.products.map(slug => entityMap.products.get(slug)?.id).filter(id => id);
      if (productIds.length === 0) continue;

      const existingCompare = await strapi.entityService.findMany('plugin::webbycommerce.compare', {
        filters: { userId: String(user.id) } 
      });
      if (existingCompare.length > 0) continue;

      await strapi.entityService.create('plugin::webbycommerce.compare', {
        data: {
          userId: String(user.id),
          userEmail: user.email,
          name: compare.name,
          products: productIds,
          publishedAt: new Date(),
        }
      });
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating compare:`, error);
    }
  }
}

async function seedWishlists(strapi, wishlists, entityMap) {
  strapi.log.info('[webbycommerce] Seeding wishlists...');
  for (const wishlist of wishlists) {
    try {
      const user = entityMap.users.get(wishlist.userEmail);
      if (!user) continue;

      const productIds = wishlist.products.map(slug => entityMap.products.get(slug)?.id).filter(id => id);
      if (productIds.length === 0) continue;

      const existingWishlist = await strapi.entityService.findMany('plugin::webbycommerce.wishlist', {
        filters: { userId: String(user.id), name: wishlist.name }
      });
      if (existingWishlist.length > 0) continue;

      await strapi.entityService.create('plugin::webbycommerce.wishlist', {
        data: {
          userId: String(user.id),
          userEmail: user.email,
          name: wishlist.name,
          description: wishlist.description,
          isPublic: wishlist.isPublic,
          products: productIds,
          publishedAt: new Date(),
        }
      });
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating wishlist:`, error);
    }
  }
}

async function seedCarts(strapi, carts, entityMap) {
  strapi.log.info('[webbycommerce] Seeding carts...');
  for (const cart of carts) {
    try {
      const user = entityMap.users.get(cart.userEmail);
      if (!user) continue;

      const existingCart = await strapi.entityService.findMany('plugin::webbycommerce.cart', {
        filters: { user: user.id }
      });
      if (existingCart.length > 0) {
        entityMap.carts.set(user.email, existingCart[0]);
        continue;
      }
      const createdCart = await strapi.entityService.create('plugin::webbycommerce.cart', {
        data: {
          user: user.id,
          currency: cart.currency,
        }
      });
      entityMap.carts.set(user.email, createdCart);
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating cart:`, error);
    }
  }
}

async function seedCartItems(strapi, carts, entityMap) {
  strapi.log.info('[webbycommerce] Seeding cart items...');
  for (const cartData of carts) {
    try {
      const user = entityMap.users.get(cartData.userEmail);
      if (!user) continue;

      const cart = entityMap.carts.get(user.email);
      if (!cart) continue;

      for (const item of cartData.items) {
        const product = entityMap.products.get(item.product);
        if (!product) continue;

        const existingItem = await strapi.entityService.findMany('plugin::webbycommerce.cart-item', {
          filters: { cart: cart.id, product: product.id }
        });
        if (existingItem.length > 0) continue;

        const finalPrice = (product.sale_price && product.sale_price < product.price) ? product.sale_price : product.price;

        await strapi.entityService.create('plugin::webbycommerce.cart-item', {
          data: {
            cart: cart.id,
            product: product.id,
            quantity: item.quantity,
            unit_price: finalPrice,
            total_price: finalPrice * item.quantity,
            user: user.id,
          }
        });
      }
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating cart items:`, error);
    }
  }
}

async function seedShippingZones(strapi, shippingZones, entityMap) {
  strapi.log.info('[webbycommerce] Seeding shipping zones...');
  for (const zone of shippingZones) {
    try {
      const existingZone = await strapi.entityService.findMany('plugin::webbycommerce.shipping-zone', {
        filters: { name: zone.name }
      });
      if (existingZone.length > 0) continue;

      const shippingMethods = [];
      for (const method of zone.methods) {
        const createdMethod = await strapi.entityService.create('plugin::webbycommerce.shipping-method', {
          data: {
            ...method,
            is_active: true,
            publishedAt: new Date(),
          }
        });

        if (method.rates) {
          for (const rate of method.rates) {
            await strapi.entityService.create('plugin::webbycommerce.shipping-rate', {
              data: {
                ...rate,
                shipping_method: createdMethod.id,
                publishedAt: new Date(),
              }
            });
          }
        }
        shippingMethods.push(createdMethod.id);
      }

      await strapi.entityService.create('plugin::webbycommerce.shipping-zone', {
        data: {
          name: zone.name,
          location: [zone.location],
          shippingMethods: shippingMethods,
          is_active: true,
          sort_order: 0,
        }
      });
    } catch (error) {
      strapi.log.error(`[webbycommerce] Error creating shipping zone:`, error);
    }
  }
}


module.exports = {
  seedDemoData,
};