# WebbyCommerce Plugin

A complete, production-ready ecommerce solution for Strapi CMS. This plugin provides a comprehensive backend for managing ecommerce functionality without requiring developers to manually create content types, routes, or controllers. Simply install, configure, and start building your online store.

## 🎯 Plugin Goal

This plugin is designed to be a **drop-in ecommerce backend layer** for Strapi:

- **Zero Manual Setup**: No need to create content types, routes, or controllers manually
- **Ready-to-Use APIs**: All ecommerce endpoints are pre-built and documented
- **Admin Configuration**: Manage all settings through the Strapi admin panel
- **WooCommerce-like Flow**: Complete ecommerce workflow similar to WooCommerce
- **Production Ready**: Built with security, validation, and best practices in mind

## 📦 Installation

### From NPM (Published Package)

```bash
npm install @webbycrown/webbycommerce
```

### Enable in Strapi

Add the plugin to your `config/plugins.js`:

```javascript
module.exports = ({ env }) => ({
  'webbycommerce': {
    enabled: true,
    resolve: require.resolve('@webbycrown/webbycommerce'),
  },
});
```

### Local Development

If you're developing locally, you can enable it from the local path:

```javascript
module.exports = ({ env }) => ({
  'webbycommerce': {
    enabled: true,
    resolve: './src/plugins/webbycommerce',
  },
});
```


## ⚙️ Initial Setup

### 0. (Optional) Seed Demo Data

You can populate your store with sample products/categories/etc using any of the following options:

#### Option A: Run the setup and answer `y`

```bash
npx strapi-ecommerce-setup
```

When prompted **"Would you like to seed example data? (y/n):"**, answer **`y`**.

#### Option B: Seed from Strapi Admin (works even if you answered `n`)

- Go to **Strapi Admin → Settings → Advanced Ecommerce**
- Click **"Seed Demo Data"**

#### Option C: Seed via `.env` flag (programmatic / CI-friendly)

Add this to your Strapi project’s `.env` and then start Strapi:

```bash
STRAPI_PLUGIN_ADVANCED_ECOMMERCE_SEED_DATA=true
```

```bash
npm run develop
```

After the demo data is seeded once, set it back to `false` (or remove it) to avoid reseeding on every startup.

### 1. Enable Permissions

After installation, navigate to **Settings → Users & Permissions → Roles** and select the **Public** role (or any role you want to grant access).

Under the **WebbyCommerce** section, enable the **Enable** permission to allow access to ecommerce API endpoints.

### 2. Configure Plugin Settings

Navigate to **Settings → WebbyCommerce** in the Strapi admin panel. You'll find several configuration tabs:

#### **Configure Tab**
- **Allowed Frontend Domains**: Add your frontend domain(s) for CORS and security
- **API Route Prefix**: Customize the API route prefix (default: `webbycommerce`)
  - Examples: `/api/ecommerce`, `/api/v1`, `/api/shop`
- **SMTP Configuration**: Configure email settings for OTP and notifications
  - Host, Port, Secure (TLS), Username, Password
  - From Email and From Name

#### **Login/Register Tab**
- **Authentication Method**: Choose between:
  - **Default (Email/Password)**: Uses Strapi's built-in authentication
  - **OTP (Email/Mobile Verification)**: One-time password authentication

#### **Shipping Type Tab**
- **Single Address Mode**: Users can have only one billing and one shipping address
- **Multiple Address Mode**: Users can create unlimited addresses

### 3. User Schema Extension

The plugin automatically extends the user schema with ecommerce-specific fields. The plugin will attempt to automatically add OTP fields to the user schema when it starts up.

**Required Fields:**
- `username` (string, required, unique)
- `email` (email, required)
- `phone_no` (string, required, unique)
- `first_name` (string, required)
- `last_name` (string, required)

**Optional Fields:**
- `display_name` (string)
- `company_name` (string)

**OTP Fields (required if using OTP authentication):**
- `otp` (integer, nullable) - Stores the OTP code
- `isOtpVerified` (boolean, default: false) - Tracks if OTP has been verified

#### Automatic Schema Extension

The plugin automatically adds OTP fields to the user schema on startup. If you see an error about OTP fields not being available, you may need to manually extend the schema.

#### Manual Schema Extension (if automatic extension fails)

If the automatic schema extension doesn't work, create a schema extension file in your main Strapi project:

1. Create the directory structure:
   ```
   src/extensions/users-permissions/content-types/user/
   ```

2. Create `schema.json` in that directory with the following content:
   ```json
   {
     "kind": "collectionType",
     "collectionName": "up_users",
     "info": {
       "name": "user",
       "description": "",
       "singularName": "user",
       "pluralName": "users"
     },
     "options": {},
     "pluginOptions": {},
     "attributes": {
       "otp": {
         "type": "integer",
         "required": false,
         "private": true
       },
       "isOtpVerified": {
         "type": "boolean",
         "default": false,
         "required": false,
         "private": true
       }
     }
   }
   ```

3. Restart Strapi to apply the schema changes.

### 4. Address Content Type

The plugin creates an `Address` content type automatically with the following fields:

**Required Fields:**
- `type` (integer, 0=billing, 1=shipping)
- `first_name` (string)
- `last_name` (string)
- `country` (string)
- `city` (string)
- `street_address` (text)
- `postcode` (string)
- `phone` (string)
- `email_address` (email, required for billing addresses)

**Optional Fields:**
- `company_name` (string)
- `region` (string)

**Relations:**
- `user` (manyToOne → plugin::users-permissions.user)

## 📚 API Documentation

All API endpoints are documented in the Strapi admin panel under **Settings → Advanced Ecommerce → API Collections**. Each endpoint includes:

- Request/Response examples
- Authentication requirements
- Usage instructions
- cURL examples

### Base URL

The base URL depends on your configured route prefix:

- Default: `http://localhost:1337/api/webbycommerce`
- Custom: `http://localhost:1337/api/{your-prefix}`

### Authentication

Most endpoints require a JWT token. Include it in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔐 Authentication APIs

### Default Authentication (Email/Password)

When **Default** authentication method is selected:

#### Login
```
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "user@example.com",
  "password": "password"
}
```

#### Register
```
POST /api/auth/local/register
Content-Type: application/json

{
  "username": "user1234",
  "email": "user@example.com",
  "password": "password"
}
```

### OTP Authentication (Email/Mobile)

When **OTP** authentication method is selected:

#### Login/Register (Send OTP)
```
POST /api/{prefix}/auth/login-register
Content-Type: application/json

{
  "email": "user@example.com",
  "type": "email"
}
```

**Response:**
```json
{
  "message": "OTP sent to email.",
  "userId": 1,
  "isNewUser": false,
  "emailSent": true
}
```

#### Verify OTP
```
POST /api/{prefix}/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "type": "email"
}
```

**Response:**
```json
{
  "message": "Login successfully!",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com",
    "phone_no": null
  }
}
```

## 👤 User Profile APIs

### Get Profile
```
GET /api/{prefix}/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com",
    "phone_no": "+1234567890",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "company_name": "WebbyCrown Solutions",
    "confirmed": true,
    "blocked": false,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "type": "authenticated"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** All fields (except password) are always returned, using `null` for missing values.

### Update Profile
```
PUT /api/{prefix}/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "user@example.com",
  "phone_no": "+1234567890",
  "display_name": "John Doe",
  "company_name": "WebbyCrown Solutions",
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Required Fields:**
- `first_name`
- `last_name`
- `email` (must be unique)
- `phone_no` (must be unique)

**Optional Fields:**
- `display_name`
- `company_name`
- `currentPassword` and `newPassword` (only available when Default authentication method is enabled)

**Response:**
```json
{
  "message": "Profile updated successfully.",
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com",
    "phone_no": "+1234567890",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "company_name": "WebbyCrown Solutions",
    "confirmed": true,
    "blocked": false,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## 📍 Address Management APIs

### Get All Addresses
```
GET /api/{prefix}/addresses
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `type` (optional): Filter by type (0=billing, 1=shipping)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "type": 0,
      "first_name": "John",
      "last_name": "Doe",
      "company_name": "WebbyCrown Solutions",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "street_address": "123 Main Street",
      "postcode": "94102",
      "phone": "+1234567890",
      "email_address": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Address
```
GET /api/{prefix}/addresses/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Address
```
POST /api/{prefix}/addresses
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "type": 0,
  "first_name": "John",
  "last_name": "Doe",
  "company_name": "WebbyCrown Solutions",
  "country": "United States",
  "region": "California",
  "city": "San Francisco",
  "street_address": "123 Main Street",
  "postcode": "94102",
  "phone": "+1234567890",
  "email_address": "john@example.com"
}
```

**Required Fields:**
- `type` (0=billing, 1=shipping)
- `first_name`
- `last_name`
- `country`
- `city`
- `street_address`
- `postcode`
- `phone`
- `email_address` (required for billing addresses, type=0)

**Optional Fields:**
- `company_name`
- `region`

**Single Address Mode:**
- In single address mode, only one billing (type=0) and one shipping (type=1) address are allowed per user
- Attempting to create a duplicate address type returns `403 Forbidden`

**Multiple Address Mode:**
- Users can create unlimited addresses

### Update Address
```
PUT /api/{prefix}/addresses/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "street_address": "456 Updated Street",
  "city": "Los Angeles"
}
```

All fields are optional. Only provided fields will be updated.

### Delete Address
```
DELETE /api/{prefix}/addresses/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔒 Security Features

### Permission System
- All endpoints require the **Enable** permission to be granted in Users & Permissions
- Custom permission checking via `ensureEcommercePermission` utility

### Origin Validation
- CORS protection through allowed frontend domains configuration
- API token validation for additional security layers

### Authentication Enforcement
- JWT token validation for protected endpoints
- User-specific data isolation (users can only access their own data)

### Input Validation
- Comprehensive field validation (required fields, email format, etc.)
- Type checking and sanitization
- Unique constraint validation (email, phone_no)


### Key Components

**Controllers:**
- `auth.js`: Authentication and profile management
- `address.js`: Address CRUD operations
- `controller.js`: Plugin settings management
- `shipping.js`: Shipping CRUD operations
- `product.js`: Product CRUD operations
- `order.js`: Order CRUD operations
- `cart.js`: Cart CRUD operations
- `payment.js`: Payment CRUD operations
- `review.js`: Review CRUD operations
- `wishlist.js`: Wishlist CRUD operations
- `webhook.js`: Webhook CRUD operations
- `coupon.js`: Coupon CRUD operations

**Utilities:**
- `check-ecommerce-permission.js`: Permission validation
- `send-email.js`: Email sending (SMTP or Strapi email plugin)

### Database Schema

**User Extensions:**
- Custom fields added to `plugin::users-permissions.user`
- Relations to addresses

**Address Content Type:**
- Created automatically as `api::address.address`
- Many-to-one relation with users

## 📝 Development Notes

2. Test endpoints using:
   - Postman
   - cURL
   - The API Collections page in admin panel

3. Check logs for errors:
```bash
# Strapi logs will show plugin-specific errors with [webbycommerce] prefix
```

## 🐛 Troubleshooting

### OTP Not Sending
- Check SMTP configuration in **Configure** tab
- Verify email plugin is configured (fallback)
- Check server logs for email errors

### 401 Unauthorized Errors
- Verify JWT token is valid and not expired
- Check that **Enable** permission is granted in Users & Permissions
- Ensure token is included in `Authorization: Bearer <token>` header

### 403 Forbidden on Address Creation
- Check shipping type mode (single vs multiple)
- In single mode, update existing address instead of creating duplicate

### 404 Not Found
- Verify route prefix matches configuration
- Check that plugin is enabled in `config/plugins.js`
- Restart Strapi after configuration changes

### Schema Errors
- Ensure user schema extension is properly configured
- Restart Strapi after schema changes
- Check that all required fields are present in schema

### API Collections
- The API Collections page in admin panel shows all available endpoints
- Use this page to test endpoints and view responses

---

## 📜 Changelog

## [1.1.0]
- ✨ Added Bulk Product API for mass product creation

## [1.0.2] – Patch Release

### Fixed
- Fix critical bugs

## [1.0.1] – Patch Release

### Changed
- Updated README documentation

### Fixed
- Resolved reported bugs

## [1.0.0] – Initial Stable Release

🎉 First production-ready release of WebbyCommerce, a complete ecommerce backend plugin for Strapi CMS.

✨ Added
#### Core Plugin

- Drop-in ecommerce backend for Strapi with zero manual setup
- Automatic creation of required content types, routes, and controllers
- Admin panel integration for plugin configuration
- Customizable API route prefix support
- Allowed frontend domain (CORS) configuration

#### Authentication

- Default authentication (Email / Password) using Strapi auth
- OTP-based authentication (Email / Mobile)
- OTP verification and login flow
- JWT-based authentication enforcement
- Automatic user creation for new OTP users

#### User Management

- User profile APIs (get & update)
- Automatic user schema extension with ecommerce fields
- first_name, last_name
- phone_no
- display_name, company_name
- OTP-related fields
- Secure password update support (default auth)

#### Address Management

- Automatic Address content type creation
- Billing and Shipping address support
- Single-address mode (1 billing + 1 shipping)
- Multiple-address mode (unlimited addresses)
- Full CRUD APIs with user-level data isolation

#### Ecommerce APIs

- Cart management
- Order management
- Product management
- Shipping management
- Payment handling
- Coupon management
- Wishlist functionality
- Product reviews
- Webhook handling

#### Admin Configuration

- SMTP configuration for OTP & notifications
- Authentication method selection (Default / OTP)
- Shipping address mode configuration
- Centralized plugin settings UI in Strapi admin

#### Security

- Permission-based API access control
- Custom ecommerce permission validator
- JWT validation for protected routes
- User-owned resource access enforcement
- Input validation & sanitization
- Unique constraint validation (email, phone)

#### Developer Experience

- Built-in API Collections documentation in admin panel
- Request/response examples for all endpoints
- cURL examples for testing
- Clear plugin-specific logging with [webbycommerce] prefix


## Author

**WebbyCrown**
- Email: info@webbycrown.com
- Website: https://webbycrown.com