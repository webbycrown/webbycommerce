'use strict';

import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Flex,
  Typography,
  Button,
  Modal,
  Pagination,
  PageLink,
  PreviousLink,
  NextLink,
  Dots,
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/admin/strapi-admin';

import { PLUGIN_ID } from '../pluginId';

const ApiCollectionsContent = () => {
  const { formatMessage } = useIntl();
  const fetchClient = useFetchClient();
  const [openModalId, setOpenModalId] = useState(null);
  const [routePrefix, setRoutePrefix] = useState('webbycommerce');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadRoutePrefix = async () => {
      try {
        const { data } = await fetchClient.get(`/webbycommerce/settings`);
        if (data?.routePrefix) {
          setRoutePrefix(data.routePrefix);
        }
      } catch (error) {
        console.error('Failed to load route prefix:', error);
      }
    };
    loadRoutePrefix();
  }, [fetchClient]);

  const description = formatMessage({
    id: `${PLUGIN_ID}.settings.apiCollections.description`,
    defaultMessage:
      'Reference for the public endpoints exposed by the Strapi Advanced Ecommerce plugin.',
  });

  const getApiPath = (endpointPath) => {
    // Replace the default prefix with the configured prefix
    return endpointPath.replace('/api/webbycommerce', `/api/${routePrefix}`);
  };

  const endpoints = useMemo(() => [
    {
      id: 'health',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/health'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.health.title`,
        defaultMessage: 'Health Check',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.health.summary`,
        defaultMessage:
          'Simple endpoint to verify that the ecommerce plugin is installed and running.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.health.auth`,
        defaultMessage:
          'Auth: public (no authentication required by default, but respects plugin permissions).',
      }),
      response: `{
  "status": "ok",
  "plugin": "webbycommerce",
  "message": "Ecommerce plugin is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.health.usage.monitoring`,
          defaultMessage: 'Use in uptime monitors to check ecommerce availability.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.health.usage.deploy`,
          defaultMessage:
            'Use in deployment or CI pipelines to validate the plugin is bootstrapped.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.health.usage.manual`,
          defaultMessage:
            'Quick manual verification from a browser or API client (Postman, Insomnia, curl).',
        }),
      ],
      getCurl: () => `curl http://localhost:1337${getApiPath('/api/webbycommerce/health')}`,
    },
    {
      id: 'login-register-otp',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/auth/login-register'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.title`,
        defaultMessage: 'Login/Register (OTP)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.summary`,
        defaultMessage:
          'Initiate login or registration via email or mobile and send a one-time password (OTP) to the user.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.auth`,
        defaultMessage:
          'Auth: public (OTP method must be enabled in plugin settings).',
      }),
      response: `{
  "message": "OTP sent to email.",
  "userId": 1,
  "isNewUser": false
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.usage.request`,
          defaultMessage: 'Send email or mobile number to receive an OTP code.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.usage.verify`,
          defaultMessage: 'User enters the OTP code in your frontend application.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.loginRegister.usage.next`,
          defaultMessage: 'Call the verify-otp endpoint to complete authentication.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/auth/login-register')} \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "type": "email"}'`,
      requestBody: `{
  "email": "user@example.com",
  "type": "email"
}`,
    },
    {
      id: 'verify-otp',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/auth/verify-otp'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.title`,
        defaultMessage: 'Verify OTP',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.summary`,
        defaultMessage:
          'Verify the OTP for a given email or mobile number and return a JWT token for authenticated access.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.auth`,
        defaultMessage:
          'Auth: public (OTP method must be enabled in plugin settings).',
      }),
      response: `{
  "message": "Login successfully!",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com",
    "phone_no": null
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.usage.verify`,
          defaultMessage: 'Submit the OTP code received via email or SMS.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.usage.token`,
          defaultMessage: 'Receive a JWT token for authenticated API requests.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.verifyOtp.usage.store`,
          defaultMessage: 'Store the JWT token securely and include it in subsequent requests.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/auth/verify-otp')} \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "otp": "123456", "type": "email"}'`,
      requestBody: `{
  "email": "user@example.com",
  "otp": "123456",
  "type": "email"
}`,
    },
    {
      id: 'default-login',
      method: 'POST',
      path: '/api/auth/local',
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultLogin.title`,
        defaultMessage: 'Default Login (Email/Password)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultLogin.summary`,
        defaultMessage:
          "Use Strapi's built-in /auth/local endpoint for email/password login when the authentication method is set to Default.",
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultLogin.auth`,
        defaultMessage:
          "Auth: public (uses Strapi's core Users & Permissions authentication).",
      }),
      response: `{
  "jwt": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.defaultLogin.usage.request`,
          defaultMessage:
            'Send identifier (email or username) and password to authenticate the user.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.defaultLogin.usage.next`,
          defaultMessage:
            'Store the returned JWT token and use it for authenticated requests.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier": "user@example.com", "password": "password"}'`,
      requestBody: `{
  "identifier": "user@example.com",
  "password": "password"
}`,
    },
    {
      id: 'default-register',
      method: 'POST',
      path: '/api/auth/local/register',
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultRegister.title`,
        defaultMessage: 'Default Register (Email/Password)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultRegister.summary`,
        defaultMessage:
          "Use Strapi's built-in /auth/local/register endpoint for email/password registration when the authentication method is set to Default.",
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.defaultRegister.auth`,
        defaultMessage:
          "Auth: public (uses Strapi's core Users & Permissions registration).",
      }),
      response: `{
  "jwt": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.defaultRegister.usage.request`,
          defaultMessage:
            'Send username, email and password to create a new user.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.defaultRegister.usage.next`,
          defaultMessage:
            'Use the returned JWT token or confirmation flow according to your Users & Permissions settings.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user1234", "email": "user@example.com", "password": "password"}'`,
      requestBody: `{
  "username": "user1234",
  "email": "user@example.com",
  "password": "password"
}`,
    },
    {
      id: 'profile',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/auth/profile'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.profile.title`,
        defaultMessage: 'Get User Profile',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.profile.summary`,
        defaultMessage:
          'Get complete user profile details for the authenticated user. Requires a valid JWT token.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.profile.auth`,
        defaultMessage:
          'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "user": {
    "id": 1,
    "username": "user1234",
    "email": "user@example.com",
    "phone_no": "+1234567890",
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
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.profile.usage.token`,
          defaultMessage: 'Include the JWT token in the Authorization header.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.profile.usage.details`,
          defaultMessage: 'Returns all user details including custom fields from the user schema.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/auth/profile')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'update-profile',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/auth/profile'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.title`,
        defaultMessage: 'Update User Profile',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.summary`,
        defaultMessage:
          'Update user profile details including name, email, phone number, and optionally change password (if default login method is enabled).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.auth`,
        defaultMessage:
          'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
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
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.usage.required`,
          defaultMessage: 'First name, last name, email, and phone number are required fields.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.usage.unique`,
          defaultMessage: 'Email and phone number must be unique (not used by other users).',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.updateProfile.usage.password`,
          defaultMessage: 'Password update is only available when default login method is enabled.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/auth/profile')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"first_name": "John", "last_name": "Doe", "email": "user@example.com", "phone_no": "+1234567890", "display_name": "John Doe"}'`,
      requestBody: `{
  "first_name": "John",
  "last_name": "Doe",
  "email": "user@example.com",
  "phone_no": "+1234567890",
  "display_name": "John Doe",
  "company_name": "WebbyCrown Solutions",
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}`,
    },
    {
      id: 'get-addresses',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/addresses'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.getList.title`,
        defaultMessage: 'Get All Addresses',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.getList.summary`,
        defaultMessage: 'Retrieve all addresses for the authenticated user. Optionally filter by type (0=billing, 1=shipping).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
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
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Optionally add ?type=0 for billing addresses or ?type=1 for shipping addresses.',
        'Returns all addresses for the authenticated user.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/addresses')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-address',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/addresses/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.getSingle.title`,
        defaultMessage: 'Get Single Address',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.getSingle.summary`,
        defaultMessage: 'Retrieve a specific address by ID for the authenticated user.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
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
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual address ID.',
        'Returns the address if it belongs to the authenticated user.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/addresses/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-address',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/addresses'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.create.title`,
        defaultMessage: 'Create Address',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.create.summary`,
        defaultMessage: 'Create a new billing or shipping address for the authenticated user.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
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
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Type must be 0 (billing) or 1 (shipping).',
        'Email address is required for billing addresses (type=0).',
        'In single address mode, only one billing and one shipping address are allowed.',
        'In multiple address mode, users can create unlimited addresses.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/addresses')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"type": 0, "first_name": "John", "last_name": "Doe", "country": "United States", "city": "San Francisco", "street_address": "123 Main Street", "postcode": "94102", "phone": "+1234567890", "email_address": "john@example.com"}'`,
      requestBody: `{
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
}`,
    },
    {
      id: 'update-address',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/addresses/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.update.title`,
        defaultMessage: 'Update Address',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.update.summary`,
        defaultMessage: 'Update an existing address for the authenticated user.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "type": 0,
    "first_name": "John",
    "last_name": "Doe",
    "company_name": "WebbyCrown Solutions",
    "country": "United States",
    "region": "California",
    "city": "San Francisco",
    "street_address": "456 Updated Street",
    "postcode": "94102",
    "phone": "+1234567890",
    "email_address": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual address ID.',
        'Only fields provided in the request body will be updated.',
        'All fields are optional, but if provided, they must be valid.',
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/addresses/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"street_address": "456 Updated Street"}'`,
      requestBody: `{
  "first_name": "John",
  "last_name": "Doe",
  "company_name": "WebbyCrown Solutions",
  "country": "United States",
  "region": "California",
  "city": "San Francisco",
  "street_address": "456 Updated Street",
  "postcode": "94102",
  "phone": "+1234567890",
  "email_address": "john@example.com"
}`,
    },
    {
      id: 'delete-address',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/addresses/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.delete.title`,
        defaultMessage: 'Delete Address',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.delete.summary`,
        defaultMessage: 'Delete an address for the authenticated user.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.addresses.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual address ID.',
        'Only addresses belonging to the authenticated user can be deleted.',
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/addresses/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-products',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getList.title`,
        defaultMessage: 'Get All Products',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getList.summary`,
        defaultMessage: 'Retrieve all products with optional filtering by product category, tag, or search.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "Sample Product",
      "description": "Product description",
      "price": 29.99,
      "sku": "SP001",
      "slug": "sample-product",
      "stock_quantity": 100,
      "stock_status": "in_stock",
      "images": [],
      "product_categories": [],
      "tags": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "start": 0
  }
}`,
      usage: [
        'Optional query parameters: ?product_category=1&tag=2&search=product&limit=10&start=0',
        'Returns paginated list of products.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products')}`,
    },
    {
      id: 'get-product',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getSingle.title`,
        defaultMessage: 'Get Single Product',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getSingle.summary`,
        defaultMessage: 'Retrieve a specific product by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "Sample Product",
    "description": "Product description",
    "price": 29.99,
    "sku": "SP001",
    "slug": "sample-product",
    "stock_quantity": 100,
    "stock_status": "in_stock",
    "images": [],
    "product_categories": [],
    "tags": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        'Replace :id with the actual product ID.',
        'Returns the product details.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/1')}`,
    },
    {
      id: 'get-product-by-slug',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/:slug'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getBySlug.title`,
        defaultMessage: 'Get Single Product (By Slug)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.getBySlug.summary`,
        defaultMessage: 'Retrieve a specific product by slug.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "Sample Product",
    "description": "Product description",
    "price": 29.99,
    "sku": "SP001",
    "slug": "sample-product",
    "stock_quantity": 100,
    "stock_status": "in_stock",
    "images": [],
    "product_categories": [],
    "tags": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        'Replace :slug with the actual product slug.',
        'Returns the product details.',
      ],
      getCurl: () =>
        `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/sample-product')}`,
    },
    {
      id: 'create-product',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/products'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.create.title`,
        defaultMessage: 'Create Product',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.create.summary`,
        defaultMessage: 'Create a new product. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "New Product",
    "description": "Product description",
    "price": 49.99,
    "sku": "NP001",
    "slug": "new-product",
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "images": [],
    "product_categories": [],
    "tags": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Name and price are required fields.',
        'Only administrators can create products.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/products')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "New Product", "price": 49.99, "description": "Product description"}'`,
      requestBody: `{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "sale_price": 39.99,
  "sku": "NP001",
  "slug": "new-product",
  "stock_quantity": 50,
  "stock_status": "in_stock",
  "weight": 1.5,
  "dimensions": {"length": 10, "width": 5, "height": 2},
  "product_categories": [1, 2],
  "tags": [1]
}`,
    },
    {
      id: 'update-product',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/products/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.update.title`,
        defaultMessage: 'Update Product',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.update.summary`,
        defaultMessage: 'Update an existing product. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "Updated Product",
    "description": "Updated description",
    "price": 59.99,
    "sku": "UP001",
    "slug": "updated-product",
    "stock_quantity": 75,
    "stock_status": "in_stock",
    "images": [],
    "product_categories": [],
    "tags": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual product ID.',
        'Only fields provided in the request body will be updated.',
        'Only administrators can update products.',
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/products/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Updated Product", "price": 59.99}'`,
      requestBody: `{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 59.99,
  "slug": "updated-product",
  "stock_quantity": 75
}`,
    },
    {
      id: 'delete-product',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/products/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.delete.title`,
        defaultMessage: 'Delete Product',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.delete.summary`,
        defaultMessage: 'Delete a product. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.products.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual product ID.',
        'Only administrators can delete products.',
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/products/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-product-variants',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-variants'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.getList.title`,
        defaultMessage: 'Get All Product Variants',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.getList.summary`,
        defaultMessage: 'Retrieve all product variants with optional filtering by product ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.auth`,
        defaultMessage: 'Auth: public (no authentication required by default).',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "name": "Small",
      "sku": "TSHIRT-S",
      "price": 19.99,
      "stock_quantity": 50,
      "stock_status": "in_stock",
      "attributes": {
        "size": "S",
        "color": "Black"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "start": 0
  }
}`,
      usage: [
        'Optional query parameters: ?product_id=1&limit=10&start=0',
        'Returns paginated list of product variants.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-variants')}`,
    },
    {
      id: 'get-product-variant',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-variants/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.getSingle.title`,
        defaultMessage: 'Get Single Product Variant',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.getSingle.summary`,
        defaultMessage: 'Retrieve a specific product variant by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.auth`,
        defaultMessage: 'Auth: public (no authentication required by default).',
      }),
      response: `{
  "data": {
    "id": 1,
    "product_id": 1,
    "name": "Small",
    "sku": "TSHIRT-S",
    "price": 19.99,
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "attributes": {
      "size": "S",
      "color": "Black"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        'Replace :id with the actual product variant ID.',
        'Returns the product variant details.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-variants/1')}`,
    },
    {
      id: 'create-product-variant',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/product-variants'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.create.title`,
        defaultMessage: 'Create Product Variant',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.create.summary`,
        defaultMessage: 'Create a new product variant. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "product_id": 1,
    "name": "Small",
    "sku": "TSHIRT-S",
    "price": 19.99,
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "attributes": {
      "size": "S",
      "color": "Black"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Product ID and name are required fields.',
        'Only administrators can create product variants.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/product-variants')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"product_id": 1, "name": "Small", "sku": "TSHIRT-S", "price": 19.99, "attributes": {"size": "S"}}'`,
      requestBody: `{
  "product_id": 1,
  "name": "Small",
  "sku": "TSHIRT-S",
  "price": 19.99,
  "stock_quantity": 50,
  "stock_status": "in_stock",
  "attributes": {
    "size": "S",
    "color": "Black"
  }
}`,
    },
    {
      id: 'update-product-variant',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/product-variants/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.update.title`,
        defaultMessage: 'Update Product Variant',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.update.summary`,
        defaultMessage: 'Update an existing product variant. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "product_id": 1,
    "name": "Medium",
    "sku": "TSHIRT-M",
    "price": 19.99,
    "stock_quantity": 75,
    "stock_status": "in_stock",
    "attributes": {
      "size": "M",
      "color": "Black"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual product variant ID.',
        'Only fields provided in the request body will be updated.',
        'Only administrators can update product variants.',
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/product-variants/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Medium", "sku": "TSHIRT-M", "stock_quantity": 75}'`,
      requestBody: `{
  "name": "Medium",
  "sku": "TSHIRT-M",
  "price": 19.99,
  "stock_quantity": 75,
  "stock_status": "in_stock",
  "attributes": {
    "size": "M",
    "color": "Black"
  }
}`,
    },
    {
      id: 'delete-product-variant',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/product-variants/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.delete.title`,
        defaultMessage: 'Delete Product Variant',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.delete.summary`,
        defaultMessage: 'Delete a product variant. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productVariants.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual product variant ID.',
        'Only administrators can delete product variants.',
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/product-variants/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-product-categories',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-categories'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.getList.title`,
        defaultMessage: 'Get All Product Categories',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.getList.summary`,
        defaultMessage: 'Retrieve all product categories with optional search.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": [
    { "id": 1, "name": "Electronics", "slug": "electronics", "description": "Electronic products", "image": {"id": 1, "url": "/uploads/electronics-category.png", "alternativeText": "electronics category image"}, "createdAt": "2024-01-01T00:00:00.000Z" }
  ],
  "meta": { "total": 1, "limit": 50, "start": 0 }
}`,
      usage: ['Optional query parameters: ?search=category&limit=50&start=0'],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-categories')}`,
    },
    {
      id: 'get-product-category',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-categories/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.getSingle.title`,
        defaultMessage: 'Get Single Product Category',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.getSingle.summary`,
        defaultMessage: 'Retrieve a specific product category by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": { "id": 1, "name": "Electronics", "slug": "electronics", "description": "Electronic products", "image": {"id": 1, "url": "/uploads/electronics-category.png", "alternativeText": "electronics category image"}, "products": [] }
}`,
      usage: ['Replace :id with the actual product category ID.'],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-categories/1')}`,
    },
    {
      id: 'create-product-category',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/product-categories'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.create.title`,
        defaultMessage: 'Create Product Category',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.create.summary`,
        defaultMessage: 'Create a new product category. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2, "name": "New Product Category", "slug": "new-product-category", "description": "Category description", "image": {"id": 2, "url": "/uploads/new-product-category-category.png", "alternativeText": "new-product-category category image"} }
}`,
      usage: ['Include the JWT token in the Authorization header. Name is required.'],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/product-categories')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "New Product Category"}'`,
      requestBody: `{
  "name": "New Product Category",
  "slug": "new-product-category",
  "description": "Category description",
  "image": 1
}`,
    },
    {
      id: 'update-product-category',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/product-categories/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.update.title`,
        defaultMessage: 'Update Product Category',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.update.summary`,
        defaultMessage: 'Update an existing product category. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2, "name": "Updated Product Category", "slug": "updated-product-category", "description": "Updated description", "image": {"id": 2, "url": "/uploads/updated-product-category-category.png", "alternativeText": "updated-product-category category image"} }
}`,
      usage: ['Include the JWT token in the Authorization header.'],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/product-categories/2')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Updated Product Category"}'`,
      requestBody: `{
  "name": "Updated Product Category",
  "slug": "updated-product-category",
  "description": "Updated description",
  "image": 2
}`,
    },
    {
      id: 'delete-product-category',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/product-categories/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.delete.title`,
        defaultMessage: 'Delete Product Category',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.delete.summary`,
        defaultMessage: 'Delete a product category. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productCategories.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2 }
}`,
      usage: ['Include the JWT token in the Authorization header. Replace :id with the product category ID.'],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/product-categories/2')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-tags',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/tags'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.getList.title`,
        defaultMessage: 'Get All Tags',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.getList.summary`,
        defaultMessage: 'Retrieve all product tags with optional search.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": [
    { "id": 1, "name": "New", "slug": "new", "createdAt": "2024-01-01T00:00:00.000Z" }
  ],
  "meta": { "total": 1, "limit": 50, "start": 0 }
}`,
      usage: ['Optional query parameters: ?search=tag&limit=50&start=0'],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/tags')}`,
    },
    {
      id: 'get-tag',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/tags/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.getSingle.title`,
        defaultMessage: 'Get Single Tag',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.getSingle.summary`,
        defaultMessage: 'Retrieve a specific tag by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.auth`,
        defaultMessage: 'Auth: public (no authentication required).',
      }),
      response: `{
  "data": { "id": 1, "name": "New", "slug": "new", "products": [] }
}`,
      usage: ['Replace :id with the actual tag ID.'],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/tags/1')}`,
    },
    {
      id: 'create-tag',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/tags'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.create.title`,
        defaultMessage: 'Create Tag',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.create.summary`,
        defaultMessage: 'Create a new product tag. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2, "name": "New Tag", "slug": "new-tag" }
}`,
      usage: ['Include the JWT token in the Authorization header. Name is required.'],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/tags')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "New Tag"}'`,
      requestBody: `{
  "name": "New Tag",
  "slug": "new-tag"
}`,
    },
    {
      id: 'update-tag',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/tags/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.update.title`,
        defaultMessage: 'Update Tag',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.update.summary`,
        defaultMessage: 'Update an existing tag. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2, "name": "Updated Tag", "slug": "updated-tag" }
}`,
      usage: ['Include the JWT token in the Authorization header.'],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/tags/2')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Updated Tag"}'`,
      requestBody: `{
  "name": "Updated Tag",
  "slug": "updated-tag"
}`,
    },
    {
      id: 'delete-tag',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/tags/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.delete.title`,
        defaultMessage: 'Delete Tag',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.delete.summary`,
        defaultMessage: 'Delete a tag. Requires administrator privileges.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.tags.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": { "id": 2 }
}`,
      usage: ['Include the JWT token in the Authorization header. Replace :id with the tag ID.'],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/tags/2')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-cart',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/cart'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.getCart.title`,
        defaultMessage: 'Get My Cart',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.getCart.summary`,
        defaultMessage: 'Retrieve the authenticated user\'s active cart with items and totals.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 59.98,
    "tax": 0,
    "discount": 0,
    "total": 59.98,
    "items": [
      {
        "id": 10,
        "product_id": 1,
        "product_variation_id": null,
        "quantity": 2,
        "unit_price": 29.99,
        "total_price": 59.98,
        "product": {
          "id": 1,
          "name": "Sample Product",
          "slug": "sample-product",
          "sku": "SP001",
          "image": "/uploads/sample.jpg"
        },
        "added_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "meta": {
      "total_items": 1,
      "total_quantity": 2
    }
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.getCart.usage.cart`,
          defaultMessage: 'Returns cart with calculated subtotal/tax/discount/total.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.getCart.usage.items`,
          defaultMessage: 'Includes cart items with product details and pricing snapshot.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/cart')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-cart',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/cart/create'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.createCart.title`,
        defaultMessage: 'Create Cart (If Missing)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.createCart.summary`,
        defaultMessage: 'Create the authenticated user\'s cart if it does not already exist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 0,
    "tax": 0,
    "discount": 0,
    "total": 0,
    "items": [],
    "meta": {
      "total_items": 0,
      "total_quantity": 0
    }
  },
  "message": "Cart ready"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.createCart.usage.create`,
          defaultMessage: 'Useful on login or app bootstrap to ensure a cart exists.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/cart/create')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'add-cart-item',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/cart'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.addItem.title`,
        defaultMessage: 'Add Item to Cart',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.addItem.summary`,
        defaultMessage: 'Add a product to the authenticated user\'s shopping cart or update quantity if product already exists.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 89.97,
    "tax": 0,
    "discount": 0,
    "total": 89.97,
    "items": [
      {
        "id": 10,
        "product_id": 1,
        "product_variation_id": null,
        "quantity": 3,
        "unit_price": 29.99,
        "total_price": 89.97
      }
    ],
    "meta": {
      "total_items": 1,
      "total_quantity": 3
    }
  },
  "message": "Item added to cart successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.addItem.usage.product`,
          defaultMessage: 'Provide product ID and quantity to add to cart.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.addItem.usage.existing`,
          defaultMessage: 'If product already exists in cart, quantity will be increased.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.addItem.usage.stock`,
          defaultMessage: 'System validates stock availability before adding to cart.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/cart')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"product_id": 1, "product_variation_id": null, "quantity": 2}'`,
      requestBody: `{
  "product_id": 1,
  "product_variation_id": null,
  "quantity": 2
}`,
    },
    {
      id: 'update-cart-item',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/cart/:cartItemId'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.updateItem.title`,
        defaultMessage: 'Update Cart Item',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.updateItem.summary`,
        defaultMessage: 'Update the quantity of a specific item in the authenticated user\'s shopping cart.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 149.95,
    "tax": 0,
    "discount": 0,
    "total": 149.95,
    "items": [
      { "id": 10, "product_id": 1, "quantity": 5, "unit_price": 29.99, "total_price": 149.95 }
    ],
    "meta": { "total_items": 1, "total_quantity": 5 }
  },
  "message": "Cart item updated successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.updateItem.usage.quantity`,
          defaultMessage: 'Update quantity for an existing cart item.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.updateItem.usage.zero`,
          defaultMessage: 'Setting quantity to 0 will remove the item from cart.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/cart/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"quantity": 5}'`,
      requestBody: `{
  "quantity": 5
}`,
    },
    {
      id: 'remove-cart-item',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/cart/:cartItemId'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.removeItem.title`,
        defaultMessage: 'Remove Cart Item',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.removeItem.summary`,
        defaultMessage: 'Remove a specific item from the authenticated user\'s shopping cart.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 0,
    "tax": 0,
    "discount": 0,
    "total": 0,
    "items": [],
    "meta": { "total_items": 0, "total_quantity": 0 }
  },
  "message": "Item removed from cart successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.removeItem.usage.item`,
          defaultMessage: 'Remove a specific item by providing cart item ID.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/cart/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'clear-cart',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/cart'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.clearCart.title`,
        defaultMessage: 'Clear Cart',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.clearCart.summary`,
        defaultMessage: 'Remove all items from the authenticated user\'s shopping cart.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "active",
    "currency": "USD",
    "subtotal": 0,
    "tax": 0,
    "discount": 0,
    "total": 0,
    "items": [],
    "meta": { "total_items": 0, "total_quantity": 0 }
  },
  "message": "Cart cleared successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.clearCart.usage.all`,
          defaultMessage: 'Removes all items from the cart in one operation.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/cart')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'cart-checkout',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/cart/checkout'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.checkout.title`,
        defaultMessage: 'Checkout Cart (Mark Ordered)',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.checkout.summary`,
        defaultMessage: 'Mark the authenticated user\'s cart as ordered.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.cart.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "status": "ordered",
    "currency": "USD",
    "subtotal": 149.95,
    "tax": 0,
    "discount": 0,
    "total": 149.95,
    "items": [
      { "id": 10, "product_id": 1, "quantity": 5, "unit_price": 29.99, "total_price": 149.95 }
    ],
    "meta": { "total_items": 1, "total_quantity": 5 }
  },
  "message": "Cart checked out successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.cart.checkout.usage.status`,
          defaultMessage: 'Updates cart status to ordered (order creation is handled by the /checkout endpoint).',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/cart/checkout')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'checkout',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/checkout'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.checkout.title`,
        defaultMessage: 'Checkout',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.checkout.summary`,
        defaultMessage: 'Process checkout for the authenticated user\'s cart, create an order, update inventory, and clear the cart.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.checkout.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "order_id": 1,
    "order_number": "ORD-1703123456789-123",
    "status": "pending",
    "total": 149.99,
    "currency": "USD",
    "items": [
      {
        "product_id": 1,
        "product_name": "Sample Product",
        "product_sku": "SP001",
        "product_price": 49.99,
        "quantity": 3,
        "total_price": 149.97
      }
    ],
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "Order created successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.checkout.usage.cart`,
          defaultMessage: 'Requires items in the user\'s cart before checkout.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.checkout.usage.validation`,
          defaultMessage: 'Validates stock availability and cart contents.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.checkout.usage.inventory`,
          defaultMessage: 'Automatically updates product inventory after successful checkout.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.checkout.usage.clear`,
          defaultMessage: 'Clears the cart after successful order creation.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/checkout')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"billing_address": {"first_name": "John", "last_name": "Doe", "email": "john@example.com", "address_line_1": "123 Main St", "city": "New York", "postal_code": "10001", "country": "US"}, "shipping_address": {"first_name": "John", "last_name": "Doe", "address_line_1": "123 Main St", "city": "New York", "postal_code": "10001", "country": "US"}, "payment_method": {"type": "credit_card", "card_number": "****-****-****-1234", "expiry_date": "12/25"}, "shipping_method": "standard"}'`,
      requestBody: `{
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address_line_1": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "payment_method": {
    "type": "credit_card",
    "card_number": "****-****-****-1234",
    "expiry_date": "12/25",
    "card_holder_name": "John Doe"
  },
  "shipping_method": "standard",
  "notes": "Please handle with care"
}`,
    },
    {
      id: 'get-orders',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/orders'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getList.title`,
        defaultMessage: 'Get Orders',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getList.summary`,
        defaultMessage: 'Retrieve all orders for the authenticated user with optional filtering and pagination.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "order_number": "ORD-1703123456789-123",
      "status": "delivered",
      "total": 149.99,
      "currency": "USD",
      "items_count": 3,
      "created_at": "2024-01-01T00:00:00.000Z",
      "estimated_delivery": "2024-01-05T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getList.usage.pagination`,
          defaultMessage: 'Supports pagination with ?page=1&limit=10 parameters.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getList.usage.filter`,
          defaultMessage: 'Filter by status with ?status=delivered parameter.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getList.usage.sort`,
          defaultMessage: 'Orders are sorted by creation date (newest first).',
        }),
      ],
      getCurl: () => `curl -X GET "http://localhost:1337${getApiPath('/api/webbycommerce/orders')}?page=1&limit=10&status=delivered" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-order',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/orders/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getSingle.title`,
        defaultMessage: 'Get Order Details',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getSingle.summary`,
        defaultMessage: 'Retrieve detailed information for a specific order by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "order_number": "ORD-1703123456789-123",
    "status": "delivered",
    "payment_status": "paid",
    "items": [
      {
        "product_id": 1,
        "product_name": "Sample Product",
        "product_sku": "SP001",
        "product_price": 49.99,
        "quantity": 3,
        "total_price": 149.97
      }
    ],
    "subtotal": "149.97",
    "tax_amount": "0.00",
    "shipping_amount": "0.00",
    "discount_amount": "0.00",
    "total": "149.97",
    "currency": "USD",
    "billing_address": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "address_line_1": "123 Main Street",
      "city": "New York",
      "postal_code": "10001",
      "country": "US"
    },
    "shipping_address": {
      "first_name": "John",
      "last_name": "Doe",
      "address_line_1": "123 Main Street",
      "city": "New York",
      "postal_code": "10001",
      "country": "US"
    },
    "payment_method": {
      "type": "credit_card",
      "card_number": "****-****-****-1234",
      "expiry_date": "12/25"
    },
    "shipping_method": "standard",
    "notes": "Please handle with care",
    "tracking_number": "TRK123456789",
    "estimated_delivery": "2024-01-05T00:00:00.000Z",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getSingle.usage.id`,
          defaultMessage: 'Replace :id with the actual order ID.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getSingle.usage.ownership`,
          defaultMessage: 'Users can only view their own orders.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getSingle.usage.details`,
          defaultMessage: 'Returns complete order information including addresses and payment details.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/orders/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'cancel-order',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/orders/:id/cancel'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.cancel.title`,
        defaultMessage: 'Cancel Order',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.cancel.summary`,
        defaultMessage: 'Cancel a pending order and restore product inventory.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "order_number": "ORD-1703123456789-123",
    "status": "cancelled"
  },
  "message": "Order cancelled successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.cancel.usage.pending`,
          defaultMessage: 'Only pending orders can be cancelled.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.cancel.usage.inventory`,
          defaultMessage: 'Automatically restores product inventory when order is cancelled.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.cancel.usage.ownership`,
          defaultMessage: 'Users can only cancel their own orders.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/orders/1/cancel')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'update-order-status',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/orders/:id/status'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.title`,
        defaultMessage: 'Update Order Status',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.summary`,
        defaultMessage: 'Update the status of an existing order (admin functionality or user\'s own orders).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "id": 1,
    "order_number": "ORD-1703123456789-123",
    "status": "shipped",
    "tracking_number": "TRK123456789",
    "estimated_delivery": "2024-01-10T00:00:00.000Z",
    "updated_at": "2024-01-05T12:00:00.000Z"
  },
  "message": "Order status updated successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.usage.admin`,
          defaultMessage: 'Administrators can update any order status.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.usage.user`,
          defaultMessage: 'Regular users can only update their own orders.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.usage.stock`,
          defaultMessage: 'Cancelling an order automatically restores product inventory.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.updateStatus.usage.email`,
          defaultMessage: 'Status updates trigger email notifications to customers.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/orders/1/status')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "shipped", "tracking_number": "TRK123456789", "estimated_delivery": "2024-01-10T00:00:00.000Z"}'`,
      requestBody: `{
  "status": "shipped",
  "tracking_number": "TRK123456789",
  "estimated_delivery": "2024-01-10T00:00:00.000Z",
  "notes": "Order has been shipped via UPS"
}`,
    },
    {
      id: 'get-order-tracking',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/orders/:id/tracking'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.title`,
        defaultMessage: 'Get Order Tracking',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.summary`,
        defaultMessage: 'Retrieve detailed tracking information and timeline for a specific order.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.orders.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": {
    "order_id": 1,
    "order_number": "ORD-1703123456789-123",
    "status": "shipped",
    "tracking_number": "TRK123456789",
    "estimated_delivery": "2024-01-10T00:00:00.000Z",
    "shipping_method": "standard",
    "shipping_address": {
      "first_name": "John",
      "last_name": "Doe",
      "address_line_1": "123 Main Street",
      "city": "New York",
      "postal_code": "10001",
      "country": "US"
    },
    "tracking_timeline": [
      {
        "status": "Order Placed",
        "description": "Your order has been successfully placed",
        "timestamp": "2024-01-01T10:00:00.000Z",
        "completed": true
      },
      {
        "status": "Order Confirmed",
        "description": "Your order has been confirmed and is being prepared",
        "timestamp": "2024-01-01T10:30:00.000Z",
        "completed": true
      },
      {
        "status": "Order Shipped",
        "description": "Your order has been shipped (Tracking: TRK123456789)",
        "timestamp": "2024-01-05T12:00:00.000Z",
        "completed": true
      },
      {
        "status": "Order Delivered",
        "description": "Estimated delivery: 1/10/2024",
        "completed": false
      }
    ],
    "current_location": "In Transit",
    "delivery_status": "Your order is on the way"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.usage.timeline`,
          defaultMessage: 'Returns a complete tracking timeline showing order progress.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.usage.location`,
          defaultMessage: 'Shows current location and delivery status.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.usage.ownership`,
          defaultMessage: 'Users can only track their own orders.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.orders.getTracking.usage.realTime`,
          defaultMessage: 'Tracking information updates in real-time based on order status.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/orders/1/tracking')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-wishlist',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/wishlist'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.getWishlist.title`,
        defaultMessage: 'Get Wishlist',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.getWishlist.summary`,
        defaultMessage: 'Retrieve all products in the authenticated user\'s wishlist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "userId": "123",
    "userEmail": "user@example.com",
    "products": [
      {
        "id": 1,
        "name": "Sample Product",
        "price": 29.99,
        "images": [{"url": "https://example.com/image.jpg"}]
      }
    ],
    "isPublic": false
  },
  "meta": {
    "totalProducts": 3,
    "totalValue": 89.97,
    "categories": [{"name": "Electronics", "count": 2}]
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.getWishlist.title`,
          defaultMessage: 'GET /wishlist - Get user\'s wishlist',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'add-to-wishlist',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/wishlist'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.addToWishlist.title`,
        defaultMessage: 'Add to Wishlist',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.addToWishlist.summary`,
        defaultMessage: 'Add a product to the authenticated user\'s wishlist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": [1, 2, 3]
  },
  "meta": {
    "totalProducts": 3,
    "totalValue": 89.97
  },
  "message": "Product added to wishlist successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.addToWishlist.title`,
          defaultMessage: 'POST /wishlist - Add product to wishlist',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"productId": 1}'`,
      requestBody: `{
  "productId": 1
}`,
    },
    {
      id: 'remove-from-wishlist',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/wishlist/{productId}'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.removeFromWishlist.title`,
        defaultMessage: 'Remove from Wishlist',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.removeFromWishlist.summary`,
        defaultMessage: 'Remove a specific product from the authenticated user\'s wishlist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": [2, 3]
  },
  "meta": {
    "totalProducts": 2,
    "totalValue": 69.98
  },
  "message": "Product removed from wishlist successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.removeFromWishlist.title`,
          defaultMessage: 'DELETE /wishlist/{productId} - Remove from wishlist',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')}/1 \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'clear-wishlist',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/wishlist'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.clearWishlist.title`,
        defaultMessage: 'Clear Wishlist',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.clearWishlist.summary`,
        defaultMessage: 'Remove all products from the authenticated user\'s wishlist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": []
  },
  "meta": {
    "totalProducts": 0,
    "totalValue": 0
  },
  "message": "Wishlist cleared successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.clearWishlist.title`,
          defaultMessage: 'DELETE /wishlist - Clear entire wishlist',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'update-wishlist',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/wishlist'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.updateWishlist.title`,
        defaultMessage: 'Update Wishlist Settings',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.updateWishlist.summary`,
        defaultMessage: 'Update wishlist settings and preferences.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "My Favorites",
    "description": "My favorite products",
    "isPublic": true
  },
  "message": "Wishlist updated successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.updateWishlist.title`,
          defaultMessage: 'PUT /wishlist - Update wishlist settings',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Favorites", "isPublic": true}'`,
      requestBody: `{
  "name": "My Favorites",
  "description": "My favorite products",
  "isPublic": true
}`,
    },
    {
      id: 'check-wishlist-status',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/wishlist/status'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.checkWishlistStatus.title`,
        defaultMessage: 'Check Wishlist Status',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.checkWishlistStatus.summary`,
        defaultMessage: 'Check if specific products are in the authenticated user\'s wishlist.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.wishlist.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "1": true,
    "2": false,
    "3": true
  },
  "message": "Wishlist status checked successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.wishlist.checkWishlistStatus.title`,
          defaultMessage: 'GET /wishlist/status - Check if products are in wishlist',
        }),
      ],
      getCurl: () => `curl -X GET "http://localhost:1337${getApiPath('/api/webbycommerce/wishlist')}/status?productIds=1,2,3" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-compare',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/compare'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareList.title`,
        defaultMessage: 'Get Compare List',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareList.summary`,
        defaultMessage: 'Retrieve all products in the authenticated user\'s compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "userId": "123",
    "userEmail": "user@example.com",
    "products": [
      {
        "id": 1,
        "name": "Product A",
        "price": 29.99,
        "specifications": {"screen": "6.1 inch"}
      },
      {
        "id": 2,
        "name": "Product B",
        "price": 39.99,
        "specifications": {"screen": "6.5 inch"}
      }
    ],
    "category": {"id": 1, "name": "Electronics"}
  },
  "meta": {
    "totalProducts": 2,
    "comparisonData": {
      "specifications": {
        "screen": {"1": "6.1 inch", "2": "6.5 inch"}
      }
    }
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareList.title`,
          defaultMessage: 'GET /compare - Get user\'s compare list',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/compare')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'add-to-compare',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/compare'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.addToCompare.title`,
        defaultMessage: 'Add to Compare',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.addToCompare.summary`,
        defaultMessage: 'Add a product to the authenticated user\'s compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": [1, 2, 3]
  },
  "meta": {
    "totalProducts": 3,
    "comparisonData": {...}
  },
  "message": "Product added to compare list successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.addToCompare.title`,
          defaultMessage: 'POST /compare - Add product to compare list',
        }),
        'Maximum 4 products allowed in compare list',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/compare')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"productId": 1}'`,
      requestBody: `{
  "productId": 1
}`,
    },
    {
      id: 'remove-from-compare',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/compare/{productId}'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.removeFromCompare.title`,
        defaultMessage: 'Remove from Compare',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.removeFromCompare.summary`,
        defaultMessage: 'Remove a specific product from the authenticated user\'s compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": [2, 3]
  },
  "meta": {
    "totalProducts": 2,
    "comparisonData": {...}
  },
  "message": "Product removed from compare list successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.removeFromCompare.title`,
          defaultMessage: 'DELETE /compare/{productId} - Remove from compare list',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/compare')}/1 \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'clear-compare',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/compare'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.clearCompare.title`,
        defaultMessage: 'Clear Compare List',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.clearCompare.summary`,
        defaultMessage: 'Remove all products from the authenticated user\'s compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "products": []
  },
  "meta": {
    "totalProducts": 0,
    "comparisonData": {}
  },
  "message": "Compare list cleared successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.clearCompare.title`,
          defaultMessage: 'DELETE /compare - Clear entire compare list',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/compare')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'update-compare',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/compare'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.updateCompare.title`,
        defaultMessage: 'Update Compare Settings',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.updateCompare.summary`,
        defaultMessage: 'Update compare list settings and preferences.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "My Comparison",
    "description": "Comparing my favorite products"
  },
  "message": "Compare list updated successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.updateCompare.title`,
          defaultMessage: 'PUT /compare - Update compare list settings',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/compare')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Comparison"}'`,
      requestBody: `{
  "name": "My Comparison",
  "description": "Comparing my favorite products"
}`,
    },
    {
      id: 'get-compare-data',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/compare/data'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareData.title`,
        defaultMessage: 'Get Compare Data',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareData.summary`,
        defaultMessage: 'Retrieve comparison data matrix for products in the compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "specifications": {
      "screen": {"1": "6.1 inch", "2": "6.5 inch", "3": "6.7 inch"},
      "camera": {"1": "12MP", "2": "48MP", "3": "64MP"},
      "battery": {"1": "3000mAh", "2": "4000mAh", "3": "5000mAh"}
    },
    "prices": {"1": 599, "2": 699, "3": 799},
    "availability": {"1": true, "2": true, "3": false}
  },
  "meta": {
    "totalProducts": 3,
    "category": "Smartphones"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.getCompareData.title`,
          defaultMessage: 'GET /compare/data - Get comparison data matrix',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/compare')}/data \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'check-compare-status',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/compare/status'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.checkCompareStatus.title`,
        defaultMessage: 'Check Compare Status',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.checkCompareStatus.summary`,
        defaultMessage: 'Check if specific products are in the authenticated user\'s compare list.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.compare.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      }),
      response: `{
  "data": {
    "1": true,
    "2": false,
    "3": true
  },
  "message": "Compare status checked successfully"
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.compare.checkCompareStatus.title`,
          defaultMessage: 'GET /compare/status - Check if products are in compare list',
        }),
      ],
      getCurl: () => `curl -X GET "http://localhost:1337${getApiPath('/api/webbycommerce/compare')}/status?productIds=1,2,3" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-product-related',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/:id/related'),
      title: 'Get Related Products',
      summary: 'Get products related to a specific product (same categories or tags).',
      auth: 'Auth: public (no authentication required).',
      response: `{
  "data": [
    {
      "id": 2,
      "name": "Related Product",
      "price": 29.99,
      "images": []
    }
  ]
}`,
      usage: [
        'Replace :id with the actual product ID.',
        'Optional query parameter: ?limit=4',
        'Returns up to 4 related products by default.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/1/related')}`,
    },
    {
      id: 'get-product-categories-list',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/categories'),
      title: 'List Product Categories',
      summary: 'Get all active product categories with optional filtering.',
      auth: 'Auth: public (no authentication required).',
      response: `{
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic products"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 20,
    "start": 0
  }
}`,
      usage: [
        'Optional query parameters: ?parent=1&limit=20&start=0',
        'Returns hierarchical product categories.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/categories')}`,
    },
    {
      id: 'get-product-tags-list',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/tags'),
      title: 'List Product Tags',
      summary: 'Get all product tags with optional search and pagination.',
      auth: 'Auth: public (no authentication required).',
      response: `{
  "data": [
    {
      "id": 1,
      "name": "New",
      "slug": "new"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 20,
    "start": 0
  }
}`,
      usage: [
        'Optional query parameters: ?search=tag&limit=20&start=0',
        'Returns paginated list of product tags.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/tags')}`,
    },
    {
      id: 'get-product-attributes-list',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/products/attributes'),
      title: 'List Product Attributes',
      summary: 'Get all product attributes with optional filtering.',
      auth: 'Auth: public (no authentication required).',
      response: `{
  "data": [
    {
      "id": 1,
      "name": "Color",
      "type": "select",
      "is_variation": true
    }
  ],
  "meta": {
    "total": 1,
    "limit": 20,
    "start": 0
  }
}`,
      usage: [
        'Optional query parameters: ?is_variation=true&limit=20&start=0',
        'Returns paginated list of product attributes.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/products/attributes')}`,
    },
    {
      id: 'get-product-attributes',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-attributes'),
      title: 'Get All Product Attributes',
      summary: 'Retrieve all product attributes with optional filtering by variation status.',
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.auth`,
        defaultMessage: 'Auth: public for reading, admin for writing.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "Color",
      "is_variation": true,
      "sort_order": 1,
      "product_attribute_values": [
        {
          "id": 1,
          "value": "Red",
          "sort_order": 1
        }
      ]
    }
  ]
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getList.usage.filter`,
          defaultMessage: 'Optional query parameters: ?is_variation=true&limit=20&start=0',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getList.usage.variation`,
          defaultMessage: 'Filter attributes that are used for product variations.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getList.usage.sort`,
          defaultMessage: 'Attributes are sorted by sort_order field.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-attributes')}`,
    },
    {
      id: 'get-product-attribute',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-attributes/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getSingle.title`,
        defaultMessage: 'Get Single Product Attribute',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getSingle.summary`,
        defaultMessage: 'Retrieve detailed information for a specific product attribute by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.auth`,
        defaultMessage: 'Auth: public for reading, admin for writing.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "Color",
    "is_variation": true,
    "sort_order": 1,
    "product_attribute_values": [
      {
        "id": 1,
        "value": "Red",
        "sort_order": 1
      },
      {
        "id": 2,
        "value": "Blue",
        "sort_order": 2
      }
    ]
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getSingle.usage.id`,
          defaultMessage: 'Replace :id with the actual attribute ID.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.getSingle.usage.populate`,
          defaultMessage: 'Returns attribute with all associated attribute values.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-attributes/1')}`,
    },
    {
      id: 'create-product-attribute',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/product-attributes'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.create.title`,
        defaultMessage: 'Create Product Attribute',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.create.summary`,
        defaultMessage: 'Create a new product attribute (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 2,
    "name": "Size",
    "is_variation": true,
    "sort_order": 2,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.create.usage.required`,
          defaultMessage: 'Required fields: name, is_variation (boolean).',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.create.usage.sort`,
          defaultMessage: 'Optional sort_order field to control display order.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/product-attributes')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Size", "is_variation": true}'`,
      requestBody: `{
  "name": "Size",
  "is_variation": true,
  "sort_order": 2
}`,
    },
    {
      id: 'update-product-attribute',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/product-attributes/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.update.title`,
        defaultMessage: 'Update Product Attribute',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.update.summary`,
        defaultMessage: 'Update an existing product attribute (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "Color Updated",
    "is_variation": true,
    "sort_order": 1,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.update.usage.fields`,
          defaultMessage: 'Update name, is_variation, or sort_order fields.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.update.usage.impact`,
          defaultMessage: 'Changing is_variation may affect existing product variations.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/product-attributes/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Color Updated"}'`,
      requestBody: `{
  "name": "Color Updated",
  "sort_order": 1
}`,
    },
    {
      id: 'delete-product-attribute',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/product-attributes/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.delete.title`,
        defaultMessage: 'Delete Product Attribute',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.delete.summary`,
        defaultMessage: 'Delete a product attribute (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.delete.usage.cascade`,
          defaultMessage: 'Deleting an attribute also removes all associated attribute values.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributes.delete.usage.impact`,
          defaultMessage: 'May affect products that use this attribute in their variations.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/product-attributes/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-product-attribute-values',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-attribute-values'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getList.title`,
        defaultMessage: 'Get All Product Attribute Values',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getList.summary`,
        defaultMessage: 'Retrieve all product attribute values with optional filtering by attribute ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.auth`,
        defaultMessage: 'Auth: public for reading, admin for writing.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "value": "Red",
      "sort_order": 1,
      "product_attribute": {
        "id": 1,
        "name": "Color",
        "is_variation": true
      }
    },
    {
      "id": 2,
      "value": "Blue",
      "sort_order": 2,
      "product_attribute": {
        "id": 1,
        "name": "Color",
        "is_variation": true
      }
    }
  ]
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getList.usage.filter`,
          defaultMessage: 'Optional query parameters: ?product_attribute=1&limit=20&start=0',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getList.usage.attribute`,
          defaultMessage: 'Filter values by parent attribute ID.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getList.usage.sort`,
          defaultMessage: 'Values are sorted by sort_order field.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-attribute-values')}`,
    },
    {
      id: 'get-product-attribute-value',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/product-attribute-values/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getSingle.title`,
        defaultMessage: 'Get Single Product Attribute Value',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getSingle.summary`,
        defaultMessage: 'Retrieve detailed information for a specific attribute value by ID.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.auth`,
        defaultMessage: 'Auth: public for reading, admin for writing.',
      }),
      response: `{
  "data": {
    "id": 1,
    "value": "Red",
    "sort_order": 1,
    "product_attribute": {
      "id": 1,
      "name": "Color",
      "is_variation": true
    }
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getSingle.usage.id`,
          defaultMessage: 'Replace :id with the actual attribute value ID.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.getSingle.usage.populate`,
          defaultMessage: 'Returns value with associated attribute information.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/product-attribute-values/1')}`,
    },
    {
      id: 'create-product-attribute-value',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/product-attribute-values'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.create.title`,
        defaultMessage: 'Create Product Attribute Value',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.create.summary`,
        defaultMessage: 'Create a new value for a product attribute (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 3,
    "value": "Green",
    "sort_order": 3,
    "product_attribute": {
      "id": 1,
      "name": "Color"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.create.usage.required`,
          defaultMessage: 'Required fields: value, product_attribute (ID of parent attribute).',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.create.usage.sort`,
          defaultMessage: 'Optional sort_order field to control display order.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.create.usage.unique`,
          defaultMessage: 'Value must be unique within the same attribute.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/product-attribute-values')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"value": "Green", "product_attribute": 1}'`,
      requestBody: `{
  "value": "Green",
  "product_attribute": 1,
  "sort_order": 3
}`,
    },
    {
      id: 'update-product-attribute-value',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/product-attribute-values/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.update.title`,
        defaultMessage: 'Update Product Attribute Value',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.update.summary`,
        defaultMessage: 'Update an existing attribute value (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "value": "Crimson Red",
    "sort_order": 1,
    "product_attribute": {
      "id": 1,
      "name": "Color"
    },
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.update.usage.fields`,
          defaultMessage: 'Update value, sort_order, or product_attribute fields.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.update.usage.impact`,
          defaultMessage: 'Changing product_attribute may affect existing product variations.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/product-attribute-values/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"value": "Crimson Red"}'`,
      requestBody: `{
  "value": "Crimson Red",
  "sort_order": 1
}`,
    },
    {
      id: 'delete-product-attribute-value',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/product-attribute-values/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.delete.title`,
        defaultMessage: 'Delete Product Attribute Value',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.delete.summary`,
        defaultMessage: 'Delete an attribute value (admin functionality).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.delete.usage.impact`,
          defaultMessage: 'May affect products that use this attribute value in their variations.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.productAttributeValues.delete.usage.check`,
          defaultMessage: 'Ensure no products are currently using this value before deletion.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/product-attribute-values/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'apply-coupon',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/cart/apply-coupon'),
      title: 'Apply Coupon to Cart',
      summary: 'Apply a discount coupon to the authenticated user\'s cart.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "data": {
    "coupon_code": "SAVE10",
    "coupon_type": "percentage",
    "coupon_value": 10,
    "discount_amount": 25.00,
    "subtotal": 250.00,
    "total": 225.00
  },
  "message": "Coupon applied successfully"
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Validates coupon expiry, usage limits, and minimum order amount.',
        'Returns updated cart totals with discount applied.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/cart/apply-coupon')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"coupon_code": "SAVE10"}'`,
      requestBody: `{
  "coupon_code": "SAVE10"
}`,
    },
    {
      id: 'remove-coupon',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/cart/coupon'),
      title: 'Remove Coupon from Cart',
      summary: 'Remove any applied coupon from the authenticated user\'s cart.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "message": "Coupon removed successfully"
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Removes any active coupon from the user\'s cart.',
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/cart/coupon')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-cart-totals',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/cart/totals'),
      title: 'Get Cart Totals',
      summary: 'Calculate and return the authenticated user\'s cart totals.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "data": {
    "subtotal": 250.00,
    "tax": 0.00,
    "discount": 25.00,
    "total": 225.00,
    "currency": "USD",
    "item_count": 3
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Returns calculated cart totals including subtotal, tax, and discounts.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/cart/totals')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'move-to-cart',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/wishlist/items/:id/move-to-cart'),
      title: 'Move Wishlist Item to Cart',
      summary: 'Move a product from the authenticated user\'s wishlist to their cart.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "data": {
    "cart_item": {
      "id": 1,
      "product_id": 5,
      "product_name": "Sample Product",
      "quantity": 1,
      "unit_price": 29.99,
      "total_price": 29.99
    }
  },
  "message": "Product moved to cart successfully"
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the actual product ID from wishlist.',
        'Optional quantity parameter (defaults to 1).',
        'Automatically removes the product from wishlist after adding to cart.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/wishlist/items/5/move-to-cart')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"quantity": 1}'`,
      requestBody: `{
  "quantity": 1
}`,
    },

    // Shipping endpoints
    {
      id: 'calculate-shipping',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/shipping/calculate'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.title`,
        defaultMessage: 'Calculate Shipping Costs',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.summary`,
        defaultMessage: 'Calculate available shipping methods and costs for cart items and delivery address.',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.auth`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and ecommerce permission enabled.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "UPS Ground",
      "carrier": "UPS",
      "service_type": "Ground",
      "transit_time": "1-3 business days",
      "cost": 9.99,
      "currency": "USD",
      "zone": {
        "id": 1,
        "name": "United States"
      }
    },
    {
      "id": 2,
      "name": "USPS Priority Mail",
      "carrier": "USPS",
      "service_type": "Priority",
      "transit_time": "2-3 business days",
      "cost": 7.50,
      "currency": "USD",
      "zone": {
        "id": 1,
        "name": "United States"
      }
    }
  ],
  "meta": {
    "total": 2,
    "address": {
      "country": "US",
      "city": "New York",
      "postcode": "10001"
    }
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.usage.cart`,
          defaultMessage: 'Requires cart items and valid shipping address.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.usage.methods`,
          defaultMessage: 'Returns all eligible shipping methods with calculated costs.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.usage.free`,
          defaultMessage: 'Automatically applies free shipping when cart meets threshold.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.calculate.usage.rules`,
          defaultMessage: 'Applies shipping rules, restrictions, and surcharges.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/shipping/calculate')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"cart_items": [{"product": {"weight": 2.5}, "price": 29.99, "quantity": 2}], "shipping_address": {"country": "US", "city": "New York", "street_address": "123 Main St", "postcode": "10001"}}'`,
      requestBody: `{
  "cart_items": [
    {
      "product": {"weight": 2.5},
      "price": 29.99,
      "quantity": 2
    }
  ],
  "shipping_address": {
    "country": "US",
    "city": "New York",
    "street_address": "123 Main St",
    "postcode": "10001"
  }
}`,
    },
    {
      id: 'get-shipping-zones',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/shipping/zones'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.getList.title`,
        defaultMessage: 'Get All Shipping Zones',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.getList.summary`,
        defaultMessage: 'Retrieve all shipping zones with optional filtering (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "United States",
      "description": "Mainland US shipping zone",
      "countries": ["US"],
      "is_active": true,
      "sort_order": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.getList.usage.zones`,
          defaultMessage: 'Returns all active shipping zones.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.getList.usage.filter`,
          defaultMessage: 'Optional query parameters: ?is_active=true&limit=20&start=0',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/shipping/zones')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-shipping-zone',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/shipping/zones'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.create.title`,
        defaultMessage: 'Create Shipping Zone',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.create.summary`,
        defaultMessage: 'Create a new shipping zone with countries, states, and postal codes (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 2,
    "name": "European Union",
    "description": "EU countries shipping zone",
    "countries": ["DE", "FR", "IT", "ES"],
    "is_active": true,
    "sort_order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.create.usage.required`,
          defaultMessage: 'Required fields: name, countries array.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.create.usage.geography`,
          defaultMessage: 'Define geographical areas using countries, states, or postal codes.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/shipping/zones')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "European Union", "countries": ["DE", "FR", "IT", "ES"]}'`,
      requestBody: `{
  "name": "European Union",
  "description": "EU countries shipping zone",
  "countries": ["DE", "FR", "IT", "ES"],
  "is_active": true,
  "sort_order": 1
}`,
    },
    {
      id: 'update-shipping-zone',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/shipping/zones/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.update.title`,
        defaultMessage: 'Update Shipping Zone',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.update.summary`,
        defaultMessage: 'Update an existing shipping zone (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "United States Updated",
    "description": "Updated US shipping zone",
    "countries": ["US", "CA"],
    "is_active": true,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.update.usage.fields`,
          defaultMessage: 'Update zone name, geography, or active status.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.update.usage.methods`,
          defaultMessage: 'Zone changes may affect associated shipping methods.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/shipping/zones/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "United States Updated", "countries": ["US", "CA"]}'`,
      requestBody: `{
  "name": "United States Updated",
  "description": "Updated US shipping zone",
  "countries": ["US", "CA"]
}`,
    },
    {
      id: 'delete-shipping-zone',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/shipping/zones/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.delete.title`,
        defaultMessage: 'Delete Shipping Zone',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.delete.summary`,
        defaultMessage: 'Delete a shipping zone (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.delete.usage.methods`,
          defaultMessage: 'Cannot delete zones with associated shipping methods.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.delete.usage.check`,
          defaultMessage: 'Ensure no shipping methods reference this zone before deletion.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/shipping/zones/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-shipping-methods',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/shipping/methods'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.getList.title`,
        defaultMessage: 'Get All Shipping Methods',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.getList.summary`,
        defaultMessage: 'Retrieve all shipping methods with optional filtering (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "UPS Ground",
      "carrier": "UPS",
      "service_type": "Ground",
      "transit_time": "1-3 business days",
      "handling_fee": 0,
      "is_free_shipping": false,
      "is_active": true,
      "zone": {
        "id": 1,
        "name": "United States"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.getList.usage.methods`,
          defaultMessage: 'Returns all shipping methods with carrier information.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.getList.usage.filter`,
          defaultMessage: 'Optional query parameters: ?carrier=UPS&is_active=true&zone=1',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/shipping/methods')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-shipping-method',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/shipping/methods'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.create.title`,
        defaultMessage: 'Create Shipping Method',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.create.summary`,
        defaultMessage: 'Create a new shipping method with carrier and pricing (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 2,
    "name": "FedEx Express",
    "carrier": "FedEx",
    "service_type": "Express",
    "transit_time": "1-2 business days",
    "handling_fee": 2.99,
    "is_free_shipping": false,
    "is_active": true,
    "zone": {
      "id": 1,
      "name": "United States"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.create.usage.required`,
          defaultMessage: 'Required fields: name, carrier, service_type, zone.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.create.usage.carrier`,
          defaultMessage: 'Supports UPS, FedEx, USPS, DHL, and custom carriers.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.create.usage.free`,
          defaultMessage: 'Set is_free_shipping=true and free_shipping_threshold for free shipping.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/shipping/methods')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "FedEx Express", "carrier": "FedEx", "service_type": "Express", "zone": {"id": 1}}'`,
      requestBody: `{
  "name": "FedEx Express",
  "description": "Fast delivery service",
  "carrier": "FedEx",
  "service_type": "Express",
  "carrier_service_code": "FEDEX_EXPRESS",
  "transit_time": "1-2 business days",
  "handling_fee": 2.99,
  "is_free_shipping": false,
  "free_shipping_threshold": null,
  "zone": {"id": 1},
  "is_active": true,
  "sort_order": 1
}`,
    },
    {
      id: 'update-shipping-method',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/shipping/methods/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.update.title`,
        defaultMessage: 'Update Shipping Method',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.update.summary`,
        defaultMessage: 'Update an existing shipping method (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "name": "UPS Ground Updated",
    "handling_fee": 1.99,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.update.usage.fields`,
          defaultMessage: 'Update carrier, pricing, or free shipping settings.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.update.usage.rates`,
          defaultMessage: 'Method changes affect associated shipping rates.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/shipping/methods/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"handling_fee": 1.99}'`,
      requestBody: `{
  "handling_fee": 1.99,
  "transit_time": "1-3 business days"
}`,
    },
    {
      id: 'delete-shipping-method',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/shipping/methods/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.delete.title`,
        defaultMessage: 'Delete Shipping Method',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.delete.summary`,
        defaultMessage: 'Delete a shipping method (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.delete.usage.rates`,
          defaultMessage: 'Cannot delete methods with associated shipping rates.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.methods.delete.usage.check`,
          defaultMessage: 'Ensure no shipping rates reference this method before deletion.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/shipping/methods/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'get-shipping-rates',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/shipping/methods/:methodId/rates'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.getList.title`,
        defaultMessage: 'Get Shipping Rates',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.getList.summary`,
        defaultMessage: 'Retrieve shipping rates for a specific method (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": [
    {
      "id": 1,
      "name": "0-5 lbs",
      "condition_type": "weight",
      "min_value": 0,
      "max_value": 5,
      "rate": 9.99,
      "currency": "USD",
      "is_active": true,
      "method": {
        "id": 1,
        "name": "UPS Ground"
      }
    }
  ]
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.getList.usage.method`,
          defaultMessage: 'Replace :methodId with the actual shipping method ID.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.getList.usage.rates`,
          defaultMessage: 'Returns all rate tiers for the specified method.',
        }),
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/shipping/methods/1/rates')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-shipping-rate',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/shipping/rates'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.create.title`,
        defaultMessage: 'Create Shipping Rate',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.create.summary`,
        defaultMessage: 'Create a new shipping rate tier (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 2,
    "name": "5-10 lbs",
    "condition_type": "weight",
    "min_value": 5,
    "max_value": 10,
    "rate": 14.99,
    "currency": "USD",
    "is_active": true,
    "method": {
      "id": 1,
      "name": "UPS Ground"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.create.usage.required`,
          defaultMessage: 'Required fields: name, condition_type, min_value, rate, method.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.create.usage.condition`,
          defaultMessage: 'Conditions: weight, price, quantity, volume, dimension.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.create.usage.tier`,
          defaultMessage: 'Use min_value and max_value to create pricing tiers.',
        }),
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/shipping/rates')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "5-10 lbs", "condition_type": "weight", "min_value": 5, "max_value": 10, "rate": 14.99, "method": {"id": 1}}'`,
      requestBody: `{
  "name": "5-10 lbs",
  "condition_type": "weight",
  "min_value": 5,
  "max_value": 10,
  "rate": 14.99,
  "currency": "USD",
  "method": {"id": 1},
  "is_active": true,
  "sort_order": 1
}`,
    },
    {
      id: 'update-shipping-rate',
      method: 'PUT',
      path: getApiPath('/api/webbycommerce/shipping/rates/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.update.title`,
        defaultMessage: 'Update Shipping Rate',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.update.summary`,
        defaultMessage: 'Update an existing shipping rate (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1,
    "rate": 12.99,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.update.usage.fields`,
          defaultMessage: 'Update rate values, conditions, or pricing tiers.',
        }),
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.update.usage.calculation`,
          defaultMessage: 'Rate changes affect shipping cost calculations.',
        }),
      ],
      getCurl: () => `curl -X PUT http://localhost:1337${getApiPath('/api/webbycommerce/shipping/rates/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"rate": 12.99}'`,
      requestBody: `{
  "rate": 12.99,
  "max_value": 7.5
}`,
    },
    {
      id: 'delete-shipping-rate',
      method: 'DELETE',
      path: getApiPath('/api/webbycommerce/shipping/rates/:id'),
      title: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.delete.title`,
        defaultMessage: 'Delete Shipping Rate',
      }),
      summary: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.delete.summary`,
        defaultMessage: 'Delete a shipping rate (admin only).',
      }),
      auth: formatMessage({
        id: `${PLUGIN_ID}.settings.apiCollections.shipping.zones.authAdmin`,
        defaultMessage: 'Auth: requires JWT token (Authorization: Bearer <token>) and administrator role.',
      }),
      response: `{
  "data": {
    "id": 1
  }
}`,
      usage: [
        formatMessage({
          id: `${PLUGIN_ID}.settings.apiCollections.shipping.rates.delete.usage.rates`,
          defaultMessage: 'Deleting rates may affect shipping cost calculations.',
        }),
      ],
      getCurl: () => `curl -X DELETE http://localhost:1337${getApiPath('/api/webbycommerce/shipping/rates/1')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
    {
      id: 'create-payment-intent',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/payments/create-intent'),
      title: 'Create Payment Intent',
      summary: 'Create a payment intent for an order using Stripe, PayPal, or other payment gateways.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "data": {
    "payment_intent": {
      "client_secret": "pi_1234567890_secret_ABCDEF",
      "transaction_id": "temp_1234567890",
      "amount": 25000,
      "currency": "usd",
      "payment_method": "stripe"
    },
    "transaction": {
      "id": 1,
      "transaction_id": "temp_1234567890",
      "amount": 250.00,
      "status": "pending"
    }
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Order ID, payment method, and amount are required.',
        'Returns payment gateway-specific data for client-side payment processing.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/payments/create-intent')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"order_id": 1, "payment_method": "stripe", "amount": 250.00}'`,
      requestBody: `{
  "order_id": 1,
  "payment_method": "stripe",
  "amount": 250.00,
  "currency": "USD"
}`,
    },
    {
      id: 'confirm-payment',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/payments/confirm'),
      title: 'Confirm Payment',
      summary: 'Confirm a payment after successful processing by the payment gateway.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>).',
      response: `{
  "data": {
    "transaction": {
      "id": 1,
      "transaction_id": "pi_1234567890",
      "amount": 250.00,
      "status": "completed",
      "processed_at": "2024-01-01T12:00:00.000Z"
    }
  },
  "message": "Payment confirmed successfully"
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Transaction ID and payment data from gateway are required.',
        'Updates order payment status and creates transaction record.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/payments/confirm')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"transaction_id": "temp_1234567890", "payment_data": {"gateway_response": "success"}}'`,
      requestBody: `{
  "transaction_id": "temp_1234567890",
  "payment_data": {
    "gateway_response": "success"
  }
}`,
    },
    {
      id: 'payment-webhook',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/payments/webhook'),
      title: 'Payment Webhook',
      summary: 'Handle webhooks from payment gateways (Stripe, PayPal, etc.) for payment status updates.',
      auth: 'Auth: public (webhook signatures are validated internally).',
      response: `{
  "message": "Webhook processed successfully"
}`,
      usage: [
        'Called automatically by payment gateways.',
        'Validates webhook signatures and updates payment/transaction status.',
        'Handles payment completion, failures, and other gateway events.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/payments/webhook')} \\
  -H "Content-Type: application/json" \\
  -H "Stripe-Signature: t=1234567890,v1=signature..." \\
  -d '{"type": "payment_intent.succeeded", "data": {"object": {"id": "pi_123"}}}'`,
    },
    {
      id: 'process-refund',
      method: 'POST',
      path: getApiPath('/api/webbycommerce/payments/:id/refund'),
      title: 'Process Refund',
      summary: 'Process a refund for a completed payment transaction.',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>) and admin privileges.',
      response: `{
  "data": {
    "transaction": {
      "id": 1,
      "transaction_id": "pi_1234567890",
      "amount": 250.00,
      "status": "refunded",
      "refund_amount": 250.00,
      "refunded_at": "2024-01-01T12:00:00.000Z"
    }
  },
  "message": "Refund processed successfully"
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Replace :id with the payment transaction ID.',
        'Optional amount parameter (defaults to full refund).',
        'Updates transaction and order status.',
      ],
      getCurl: () => `curl -X POST http://localhost:1337${getApiPath('/api/webbycommerce/payments/1/refund')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 100.00, "reason": "Customer request"}'`,
      requestBody: `{
  "amount": 100.00,
  "reason": "Customer request"
}`,
    },
    {
      id: 'get-payment-transactions',
      method: 'GET',
      path: getApiPath('/api/webbycommerce/payments/transactions'),
      title: 'List Payment Transactions',
      summary: 'Get all payment transactions with optional filtering (admin only).',
      auth: 'Auth: requires JWT token (Authorization: Bearer <token>) and admin privileges.',
      response: `{
  "data": [
    {
      "id": 1,
      "transaction_id": "pi_1234567890",
      "payment_method": "stripe",
      "amount": 250.00,
      "status": "completed",
      "processed_at": "2024-01-01T12:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "start": 0
  }
}`,
      usage: [
        'Include the JWT token in the Authorization header.',
        'Optional query parameters: ?order_id=1&status=completed&limit=10&start=0',
        'Admin-only endpoint for viewing payment transactions.',
      ],
      getCurl: () => `curl -X GET http://localhost:1337${getApiPath('/api/webbycommerce/payments/transactions')} \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    },
  ], [routePrefix, formatMessage]);

  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(endpoints.length / pageSize));
  }, [endpoints.length]);

  useEffect(() => {
    setPage((current) => Math.min(Math.max(current, 1), pageCount));
  }, [pageCount]);

  const pagedEndpoints = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return endpoints.slice(start, end);
  }, [endpoints, page]);

  const pageItems = useMemo(() => {
    const items = [];
    const maxVisible = 7;

    if (pageCount <= maxVisible) {
      for (let i = 1; i <= pageCount; i += 1) items.push(i);
      return items;
    }

    items.push(1);

    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 1, page + 1);

    if (start > 2) items.push('dots');

    for (let i = start; i <= end; i += 1) items.push(i);

    if (end < pageCount - 1) items.push('dots');

    items.push(pageCount);
    return items;
  }, [page, pageCount]);

  const activeEndpoint = endpoints.find((ep) => ep.id === openModalId) || null;

  return (
    <Box paddingTop={6}>
      <Typography variant="epsilon" textColor="neutral800">
        {description}
      </Typography>

      <Box marginTop={4}>
        <Box
          as="table"
          width="100%"
          style={{
            borderCollapse: 'collapse',
            fontSize: 13,
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="sigma" textColor="neutral600">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.column.method`,
                    defaultMessage: 'Method',
                  })}
                </Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="sigma" textColor="neutral600">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.column.name`,
                    defaultMessage: 'Name',
                  })}
                </Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="sigma" textColor="neutral600">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.column.path`,
                    defaultMessage: 'Path',
                  })}
                </Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="sigma" textColor="neutral600">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.column.summary`,
                    defaultMessage: 'Summary',
                  })}
                </Typography>
              </th>
              <th style={{ textAlign: 'right', padding: '8px 12px' }}>
                <Typography variant="sigma" textColor="neutral600">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.column.actions`,
                    defaultMessage: 'Actions',
                  })}
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedEndpoints.map((endpoint) => (
              <tr key={endpoint.id} style={{ borderTop: '1px solid #e5e5ef' }}>
                <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                  <Typography variant="pi" fontWeight="bold" textColor="success600">
                    {endpoint.method}
                  </Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="pi" textColor="neutral800">
                    {endpoint.title}
                  </Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="pi" textColor="neutral800">
                    {endpoint.path}
                  </Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="pi" textColor="neutral600">
                    {endpoint.summary}
                  </Typography>
                </td>
                <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                  <Button
                    size="S"
                    variant="tertiary"
                    onClick={() => setOpenModalId(endpoint.id)}
                  >
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.apiCollections.action.details`,
                      defaultMessage: 'Show details',
                    })}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>

      {pageCount > 1 && (
        <Box marginTop={4}>
          <Flex justifyContent="flex-end">
            <Pagination
              activePage={page}
              pageCount={pageCount}
              label={formatMessage({
                id: `${PLUGIN_ID}.settings.apiCollections.pagination.label`,
                defaultMessage: 'API collections pagination',
              })}
            >
              <PreviousLink
                as="button"
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
              {pageItems.map((item, idx) => {
                if (item === 'dots') {
                  return <Dots key={`dots-${idx}`}>…</Dots>;
                }

                return (
                  <PageLink
                    key={item}
                    as="button"
                    type="button"
                    number={item}
                    onClick={() => setPage(item)}
                  />
                );
              })}
              <NextLink
                as="button"
                type="button"
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              />
            </Pagination>
          </Flex>
        </Box>
      )}

      <Box marginTop={6}>
        <Typography variant="pi" textColor="neutral500">
          {formatMessage({
            id: `${PLUGIN_ID}.settings.apiCollections.footer`,
            defaultMessage:
              'As you add more ecommerce endpoints (products, cart, orders, etc.), they can be documented here for your team.',
          })}
        </Typography>
      </Box>

      {activeEndpoint && (
        <Modal.Root
          open={Boolean(activeEndpoint)}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModalId(null);
            }
          }}
        >
          <Modal.Content style={{ width: 'clamp(360px, 90vw, 720px)' }}>
            <Modal.Header
              closeLabel={formatMessage({
                id: `${PLUGIN_ID}.settings.apiCollections.modal.close`,
                defaultMessage: 'Close details',
              })}
            >
              <Modal.Title>{activeEndpoint.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Box paddingTop={2} paddingBottom={4}>
                <Box marginBottom={4}>
                  <Typography variant="pi" textColor="neutral600">
                    {activeEndpoint.summary}
                  </Typography>
                </Box>

                <Box marginBottom={4}>
                  <Typography variant="pi" fontWeight="bold">
                    {activeEndpoint.method}
                  </Typography>{' '}
                  <Typography variant="pi" textColor="neutral800">
                    {activeEndpoint.path}
                  </Typography>
                  <Box marginTop={1}>
                    <Typography variant="pi" textColor="neutral600">
                      {activeEndpoint.auth}
                    </Typography>
                  </Box>
                </Box>

                {activeEndpoint.requestBody && (
                  <Box marginBottom={4}>
                    <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.apiCollections.request.title`,
                        defaultMessage: 'Request body',
                      })}
                    </Typography>
                    <Box
                      marginTop={2}
                      padding={4}
                      background="neutral100"
                      hasRadius
                      style={{ fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}
                    >
                      {activeEndpoint.requestBody}
                    </Box>
                  </Box>
                )}

                <Box marginBottom={4}>
                  <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.apiCollections.response.title`,
                      defaultMessage: 'Successful response (200 OK)',
                    })}
                  </Typography>
                  <Box
                    marginTop={2}
                    padding={4}
                    background="neutral100"
                    hasRadius
                    style={{ fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}
                  >
                    {activeEndpoint.response}
                  </Box>
                </Box>

                <Box marginBottom={4}>
                  <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.apiCollections.usage.title`,
                      defaultMessage: 'Typical usage',
                    })}
                  </Typography>
                  <Box as="ul" marginTop={1} paddingLeft={4}>
                    {activeEndpoint.usage.map((usageItem, index) => (
                      <li key={index}>
                        <Typography variant="pi" textColor="neutral600">
                          {usageItem}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                    curl
                  </Typography>
                  <Box
                    marginTop={2}
                    padding={4}
                    background="neutral100"
                    hasRadius
                    style={{ fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}
                  >
                    {typeof activeEndpoint.curl === 'function' 
                      ? activeEndpoint.curl() 
                      : (activeEndpoint.getCurl ? activeEndpoint.getCurl() : activeEndpoint.curl)}
                  </Box>
                </Box>
              </Box>
            </Modal.Body>
            <Modal.Footer justifyContent="flex-end" gap={2}>
              <Button
                variant="tertiary"
                onClick={() => setOpenModalId(null)}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.apiCollections.modal.close`,
                  defaultMessage: 'Close',
                })}
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      )}
    </Box>
  );
};

export default ApiCollectionsContent;

