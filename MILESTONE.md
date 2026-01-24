# Strapi Advanced Ecommerce - Development Milestones

This document tracks the development progress and roadmap for the Strapi Advanced Ecommerce plugin.

## ✅ Completed Features (v1.0.0)

### 🔐 Authentication System
- [x] **Default Authentication (Email/Password)**
  - Integration with Strapi's built-in `/api/auth/local` and `/api/auth/local/register`
  - Automatic blocking of OTP endpoints when default method is selected
  - Password update functionality in profile API

- [x] **OTP Authentication (Email/Mobile)**
  - Email-based OTP login/register flow
  - OTP generation and verification
  - Mobile OTP support (structure ready, SMS provider integration pending)
  - Beautiful HTML email templates for OTP
  - Automatic user creation with unique username generation
  - JWT token generation after OTP verification

- [x] **Authentication Method Switching**
  - Admin settings to switch between Default and OTP methods
  - Automatic endpoint blocking based on selected method
  - Middleware enforcement of authentication method

### 👤 User Profile Management
- [x] **User Schema Extensions**
  - Extended user schema with ecommerce fields:
    - `first_name` (required)
    - `last_name` (required)
    - `phone_no` (required, unique)
    - `display_name` (optional)
    - `company_name` (optional)
    - `otp` (integer, for OTP flow)
    - `isOtpVerified` (boolean, for OTP flow)
  - Relation to addresses (oneToMany)

- [x] **Profile APIs**
  - `GET /api/{prefix}/auth/profile` - Get authenticated user profile
    - Returns all user fields (except password)
    - Always includes all fields (null for missing values)
    - Only includes fields present in schema
  - `PUT /api/{prefix}/auth/profile` - Update user profile
    - Required fields validation (first_name, last_name, email, phone_no)
    - Unique validation (email, phone_no)
    - Optional password update (only for default login method)
    - Optional display_name and company_name updates

### 📍 Address Management
- [x] **Address Content Type**
  - Automatic creation of `api::address.address` content type
  - Fields: type, first_name, last_name, company_name, country, region, city, street_address, postcode, phone, email_address
  - Many-to-one relation with users

- [x] **Address Modes**
  - Single Address Mode: One billing and one shipping address per user
  - Multiple Address Mode: Unlimited addresses per user
  - Admin settings to switch between modes

- [x] **Address CRUD APIs**
  - `GET /api/{prefix}/addresses` - List all addresses (with optional type filter)
  - `GET /api/{prefix}/addresses/:id` - Get single address
  - `POST /api/{prefix}/addresses` - Create address
    - Validation for required fields
    - Email required for billing addresses
    - Single mode duplicate prevention (403 Forbidden)
  - `PUT /api/{prefix}/addresses/:id` - Update address
  - `DELETE /api/{prefix}/addresses/:id` - Delete address
  - User-specific data isolation (users can only access their own addresses)

### ⚙️ Configuration & Settings
- [x] **Admin Panel Settings**
  - Configure tab: Allowed frontend domains, API route prefix, SMTP configuration
  - Login/Register tab: Authentication method selection
  - Shipping Type tab: Single or multiple address mode
  - Settings persistence using Strapi plugin store

- [x] **API Route Prefix Customization**
  - Configurable route prefix (default: `webbycommerce`)
  - Dynamic route rewriting via middleware
  - API Collections documentation updates automatically

- [x] **SMTP Configuration**
  - SMTP host, port, secure (TLS), username, password
  - From email and from name
  - Fallback to Strapi's email plugin if SMTP not configured
  - Graceful error handling (returns 200 OK with emailSent flag)

### 📚 API Documentation
- [x] **API Collections Page**
  - Interactive API documentation in admin panel
  - Endpoint listing with method, path, and summary
  - Detailed modals for each endpoint:
    - Request body examples
    - Response examples
    - Authentication requirements
    - Usage instructions
    - cURL examples
  - Dynamic route prefix in documentation

### 🔒 Security & Permissions
- [x] **Permission System**
  - Custom ecommerce permission registration
  - `ensureEcommercePermission` utility for endpoint protection
  - Origin validation (CORS)
  - API token validation support

- [x] **Authentication & Authorization**
  - JWT token validation middleware
  - User-specific data access control
  - Input validation and sanitization
  - Unique constraint validation

### 🛠️ Technical Infrastructure
- [x] **Plugin Architecture**
  - Clean separation of admin and server code
  - Modular controller structure
  - Utility functions for reusable logic
  - Custom Koa middleware for routing and authentication

- [x] **Error Handling**
  - Comprehensive error responses (400, 401, 403, 404, 500)
  - Detailed error messages
  - Server-side logging with plugin prefix

- [x] **Internationalization**
  - i18n support for admin UI
  - Translation keys for all user-facing text

## 🚧 In Progress / Pending Features

### 🛍️ Products Management (Next Priority)

#### Products Content Type
- [ ] Create `api::product.product` content type with fields:
  - Basic Info:
    - `name` (string, required)
    - `slug` (string, unique, required)
    - `description` (text, rich text)
    - `short_description` (text)
    - `sku` (string, unique)
    - `price` (decimal, required)
    - `sale_price` (decimal, optional)
    - `stock_quantity` (integer, default: 0)
    - `manage_stock` (boolean, default: true)
    - `stock_status` (enum: 'in_stock', 'out_of_stock', 'on_backorder')
    - `weight` (decimal)
    - `length` (decimal)
    - `width` (decimal)
    - `height` (decimal)
    - `status` (enum: 'draft', 'published', 'archived')
    - `featured` (boolean, default: false)
    - `on_sale` (boolean, default: false)
  - Media:
    - `images` (media, multiple)
    - `thumbnail` (media, single)
  - Relations:
    - `category` (manyToOne → product-category)
    - `categories` (manyToMany → product-category)
    - `tags` (manyToMany → product-tag)
    - `attributes` (oneToMany → product-attribute)
    - `variations` (oneToMany → product-variation, for variable products)

#### Product Attributes
- [ ] Create `api::product-attribute.product-attribute` content type:
  - `name` (string, required, unique) - e.g., "Color", "Size", "Material"
  - `slug` (string, unique, required)
  - `type` (enum: 'select', 'text', 'number', 'date')
  - `description` (text)
  - `is_required` (boolean, default: false)
  - `is_variation` (boolean, default: false) - Used for product variations
  - `sort_order` (integer, default: 0)

#### Product Attribute Values
- [ ] Create `api::product-attribute-value.product-attribute-value` content type:
  - `attribute` (manyToOne → product-attribute)
  - `value` (string, required)
  - `slug` (string, unique)
  - `description` (text)
  - `color_code` (string, optional, for color attributes)
  - `image` (media, optional)
  - `sort_order` (integer, default: 0)

#### Product Tags
- [ ] Create `api::product-tag.product-tag` content type:
  - `name` (string, required, unique)
  - `slug` (string, unique, required)
  - `description` (text)
  - `count` (integer, default: 0) - Auto-calculated product count

#### Product Categories
- [ ] Create `api::product-category.product-category` content type:
  - `name` (string, required)
  - `slug` (string, unique, required)
  - `description` (text, rich text)
  - `image` (media, optional)
  - `parent` (manyToOne → product-category, self-referential)
  - `children` (oneToMany → product-category, self-referential)
  - `sort_order` (integer, default: 0)
  - `is_active` (boolean, default: true)

#### Product Variations (for variable products)
- [ ] Create `api::product-variation.product-variation` content type:
  - `product` (manyToOne → product)
  - `sku` (string, unique)
  - `price` (decimal)
  - `sale_price` (decimal, optional)
  - `stock_quantity` (integer)
  - `manage_stock` (boolean)
  - `stock_status` (enum)
  - `image` (media, optional)
  - `attributes` (JSON, stores attribute-value pairs)
  - `is_default` (boolean, default: false)

#### Product APIs
- [ ] `GET /api/{prefix}/products` - List products
  - Query parameters: category, tag, status, featured, on_sale, search, sort, pagination
  - Filtering and sorting support
- [ ] `GET /api/{prefix}/products/:id` - Get single product
  - Include relations: categories, tags, attributes, variations
- [ ] `POST /api/{prefix}/products` - Create product (admin only)
- [ ] `PUT /api/{prefix}/products/:id` - Update product (admin only)
- [ ] `DELETE /api/{prefix}/products/:id` - Delete product (admin only)
- [ ] `GET /api/{prefix}/products/:id/related` - Get related products
- [ ] `GET /api/{prefix}/products/categories` - List categories
- [ ] `GET /api/{prefix}/products/tags` - List tags
- [ ] `GET /api/{prefix}/products/attributes` - List attributes

### 🛒 Shopping Cart (Next Priority)

#### Cart Content Type
- [ ] Create `api::cart.cart` content type:
  - `user` (manyToOne → user, optional - for logged-in users)
  - `session_id` (string, unique, required for guest users)
  - `items` (oneToMany → cart-item)
  - `subtotal` (decimal, calculated)
  - `tax` (decimal, calculated)
  - `shipping` (decimal, calculated)
  - `discount` (decimal, calculated)
  - `total` (decimal, calculated)
  - `currency` (string, default: 'USD')
  - `expires_at` (datetime, for guest carts)
  - `created_at` (datetime)
  - `updated_at` (datetime)

#### Cart Item Content Type
- [ ] Create `api::cart-item.cart-item` content type:
  - `cart` (manyToOne → cart)
  - `product` (manyToOne → product)
  - `variation` (manyToOne → product-variation, optional)
  - `quantity` (integer, required, min: 1)
  - `price` (decimal, snapshot of product price at time of add)
  - `subtotal` (decimal, calculated: quantity * price)
  - `attributes` (JSON, stores selected attribute values)

#### Cart APIs
- [ ] `GET /api/{prefix}/cart` - Get current user's cart
  - Auto-create cart if doesn't exist
  - Support for logged-in users and guest users (session_id)
- [ ] `POST /api/{prefix}/cart/items` - Add item to cart
  - Validate product availability
  - Handle variations
  - Update cart totals
- [ ] `PUT /api/{prefix}/cart/items/:id` - Update cart item quantity
- [ ] `DELETE /api/{prefix}/cart/items/:id` - Remove item from cart
- [ ] `DELETE /api/{prefix}/cart` - Clear cart
- [ ] `POST /api/{prefix}/cart/apply-coupon` - Apply discount coupon
- [ ] `DELETE /api/{prefix}/cart/coupon` - Remove coupon
- [ ] `GET /api/{prefix}/cart/totals` - Calculate cart totals
  - Subtotal, tax, shipping, discount, total

#### Cart Features
- [ ] Guest cart support (session-based)
- [ ] Cart merging when guest user logs in
- [ ] Cart expiration for guest users
- [ ] Stock validation before adding to cart
- [ ] Minimum/maximum quantity validation
- [ ] Cart persistence across sessions

### ❤️ Wishlist (Next Priority)

#### Wishlist Content Type
- [ ] Create `api::wishlist.wishlist` content type:
  - `user` (manyToOne → user, optional - for logged-in users)
  - `session_id` (string, unique, required for guest users)
  - `items` (oneToMany → wishlist-item)
  - `created_at` (datetime)
  - `updated_at` (datetime)

#### Wishlist Item Content Type
- [ ] Create `api::wishlist-item.wishlist-item` content type:
  - `wishlist` (manyToOne → wishlist)
  - `product` (manyToOne → product)
  - `variation` (manyToOne → product-variation, optional)
  - `added_at` (datetime)

#### Wishlist APIs
- [ ] `GET /api/{prefix}/wishlist` - Get user's wishlist
- [ ] `POST /api/{prefix}/wishlist/items` - Add product to wishlist
- [ ] `DELETE /api/{prefix}/wishlist/items/:id` - Remove from wishlist
- [ ] `POST /api/{prefix}/wishlist/items/:id/move-to-cart` - Move wishlist item to cart
- [ ] `DELETE /api/{prefix}/wishlist` - Clear wishlist

#### Wishlist Features
- [ ] Guest wishlist support (session-based)
- [ ] Wishlist merging when guest user logs in
- [ ] Duplicate prevention

### 📦 Orders Management (High Priority)

#### Order Content Type
- [ ] Create `api::order.order` content type:
  - `order_number` (string, unique, auto-generated)
  - `user` (manyToOne → user, optional - guest orders)
  - `status` (enum: 'pending', 'processing', 'on_hold', 'completed', 'cancelled', 'refunded', 'failed')
  - `payment_status` (enum: 'pending', 'paid', 'failed', 'refunded')
  - `payment_method` (string)
  - `payment_transaction_id` (string)
  - `billing_address` (component or JSON)
  - `shipping_address` (component or JSON)
  - `items` (oneToMany → order-item)
  - `subtotal` (decimal)
  - `tax` (decimal)
  - `shipping_cost` (decimal)
  - `discount` (decimal)
  - `total` (decimal)
  - `currency` (string, default: 'USD')
  - `notes` (text)
  - `customer_note` (text)
  - `shipping_method` (string)
  - `tracking_number` (string)
  - `ordered_at` (datetime)
  - `completed_at` (datetime, optional)

#### Order Item Content Type
- [ ] Create `api::order-item.order-item` content type:
  - `order` (manyToOne → order)
  - `product` (manyToOne → product)
  - `variation` (manyToOne → product-variation, optional)
  - `product_name` (string, snapshot)
  - `product_sku` (string, snapshot)
  - `quantity` (integer)
  - `price` (decimal, snapshot)
  - `subtotal` (decimal, calculated)
  - `attributes` (JSON, snapshot of selected attributes)

#### Order APIs
- [ ] `POST /api/{prefix}/orders` - Create order from cart
  - Validate cart items
  - Create order with items
  - Clear cart after order creation
  - Generate order number
  - Send order confirmation email
- [ ] `GET /api/{prefix}/orders` - List user's orders
  - Filter by status
  - Pagination
- [ ] `GET /api/{prefix}/orders/:id` - Get single order
  - Include order items and addresses
- [ ] `PUT /api/{prefix}/orders/:id/status` - Update order status (admin only)
- [ ] `PUT /api/{prefix}/orders/:id/cancel` - Cancel order
- [ ] `GET /api/{prefix}/orders/:id/tracking` - Get tracking information

#### Order Features
- [ ] Order number generation (unique, sequential or random)
- [ ] Order status workflow
- [ ] Order history for users
- [ ] Order confirmation emails
- [ ] Order cancellation (with stock restoration)
- [ ] Order notes (customer and admin)

### 💳 Payment Integration (High Priority)

#### Payment Transaction Content Type
- [ ] Create `api::payment-transaction.payment-transaction` content type:
  - `order` (manyToOne → order)
  - `transaction_id` (string, unique, from payment gateway)
  - `payment_method` (string) - e.g., 'stripe', 'paypal', 'razorpay'
  - `amount` (decimal)
  - `currency` (string)
  - `status` (enum: 'pending', 'processing', 'completed', 'failed', 'refunded')
  - `gateway_response` (JSON, stores gateway response)
  - `failure_reason` (text)
  - `processed_at` (datetime)
  - `refunded_at` (datetime, optional)
  - `refund_amount` (decimal, optional)

#### Payment APIs
- [ ] `POST /api/{prefix}/payments/create-intent` - Create payment intent
  - For Stripe, Razorpay, PayPal, etc.
  - Return client secret or payment URL
- [ ] `POST /api/{prefix}/payments/confirm` - Confirm payment
  - Verify payment with gateway
  - Update order payment status
  - Create payment transaction record
- [ ] `POST /api/{prefix}/payments/webhook` - Payment webhook handler
  - Handle gateway callbacks
  - Update order and transaction status
- [ ] `POST /api/{prefix}/payments/:id/refund` - Process refund (admin only)
- [ ] `GET /api/{prefix}/payments/transactions` - List payment transactions (admin only)

#### Payment Gateway Integrations
- [ ] **Stripe Integration**
  - Payment intents
  - Webhook handling
  - Refund support
- [ ] **Razorpay Integration**
  - Payment creation
  - Webhook handling
  - Refund support
- [ ] **PayPal Integration**
  - Payment creation
  - Webhook handling
  - Refund support
- [ ] **Payment Gateway Settings**
  - Admin configuration for each gateway
  - API keys, webhook secrets
  - Test/live mode switching

### 📊 Additional Features (Future)

#### Coupons & Discounts
- [ ] Coupon content type
- [ ] Coupon validation APIs
- [ ] Percentage and fixed amount discounts
- [ ] Usage limits and expiration
- [ ] Minimum order amount requirements

#### Reviews & Ratings
- [ ] Product review content type
- [ ] Rating system (1-5 stars)
- [ ] Review moderation
- [ ] Review APIs (create, list, update, delete)

#### Inventory Management
- [ ] Stock tracking
- [ ] Low stock alerts
- [ ] Stock history
- [ ] Bulk stock updates

#### Shipping Management
- [ ] Shipping zones
- [ ] Shipping methods
- [ ] Shipping rate calculation
- [ ] Free shipping thresholds

#### Tax Management
- [ ] Tax rates by region
- [ ] Tax calculation
- [ ] Tax-inclusive/exclusive pricing

#### Analytics & Reporting
- [ ] Sales reports
- [ ] Product performance
- [ ] Customer analytics
- [ ] Revenue tracking

#### Email Notifications
- [ ] Order confirmation emails
- [ ] Shipping notifications
- [ ] Order status updates
- [ ] Abandoned cart emails

#### Search & Filtering
- [ ] Advanced product search
- [ ] Filter by attributes, price range, categories
- [ ] Sort options
- [ ] Search suggestions/autocomplete

## 📋 Implementation Guidelines

### For Each New Feature

1. **Content Type Creation**
   - Create schema in `src/api/{feature}/content-types/{feature}/schema.json`
   - Define all fields, relations, and validations
   - Test schema bootstrap

2. **Controller Development**
   - Create controller in `server/src/controllers/{feature}.js`
   - Implement CRUD operations
   - Add validation and error handling
   - Include permission checks

3. **Route Registration**
   - Add routes in `server/src/routes/index.js`
   - Configure authentication requirements
   - Set up policies

4. **Middleware Integration**
   - Add route handling in `server/src/bootstrap.js`
   - Implement JWT validation if needed
   - Add permission checks

5. **API Documentation**
   - Add endpoint to `admin/src/components/ApiCollectionsContent.jsx`
   - Include request/response examples
   - Add usage instructions and cURL examples

6. **Admin UI (if needed)**
   - Create admin components if management UI is required
   - Add translations
   - Update settings pages if needed

7. **Testing**
   - Test all CRUD operations
   - Test validation and error cases
   - Test permission enforcement
   - Test with different user roles

## 🎯 Priority Order

1. ✅ **Authentication & User Management** (Completed)
2. ✅ **Address Management** (Completed)
3. 🚧 **Products Management** (Next)
4. 🚧 **Shopping Cart** (Next)
5. 🚧 **Wishlist** (Next)
6. 🚧 **Orders Management** (High Priority)
7. 🚧 **Payment Integration** (High Priority)
8. 📋 **Additional Features** (Future)

## 📝 Notes

- All features should follow the same pattern as existing implementations
- Maintain backward compatibility
- Document all APIs in the API Collections page
- Ensure proper error handling and validation
- Follow Strapi best practices for content types and controllers
- Keep security and permissions in mind for all endpoints

---

**Last Updated:** 2024-01-01  
**Current Version:** 1.0.0  
**Next Milestone:** Products Management (v1.1.0)

