'use strict';

import React from 'react';
import { Box, Grid, Typography, Divider, Flex, Link } from '@strapi/design-system';
import { Mail, Phone } from '@strapi/icons';

import { PLUGIN_ID } from '../pluginId';
import pluginPackage from '../../../package.json';

// Use remote URLs for images so npm-published packages don't need to bundle `public/uploads`.
// Matches your requested format:
// https://raw.githubusercontent.com/<owner>/<repo>/<branch>/public/uploads/<file>
const ASSET_BASE_URL = 'https://raw.githubusercontent.com/webbycrown/webbycommerce/main/public/uploads/';
const webbyCommercePreviewImage = `${ASSET_BASE_URL}Webbycommerce.png`;
const apiImage = `${ASSET_BASE_URL}api.png`;
const authImage = `${ASSET_BASE_URL}auth.png`;
const cartsImage = `${ASSET_BASE_URL}carts.png`;
const productsImage = `${ASSET_BASE_URL}products.png`;
const shippingImage = `${ASSET_BASE_URL}shipping.png`;

const VIDEO_LINK = 'https://youtu.be/CWXKxQ9i7o8';
const VIDEO_PREVIEW_IMAGE = webbyCommercePreviewImage;
const latestVersion = '2.0.0';

const BENEFITS = [
  'Complete ecommerce stack for Strapi with products, cart, orders, and checkout support.',
  'Faster project setup using prebuilt ecommerce collections and reusable configuration.',
  'Role-based access and secure flows for admins, customers, and order management.',
  'Flexible integrations for shipping, SMTP, and storefront-ready APIs.',
  'Production-ready architecture with scalable content and commerce workflows.',
];

const MODULE_FEATURES = [
  {
    title: '1. Product & Catalog Management',
    image: productsImage,
    points: [
      'Manage products, categories, attributes, and variants from one place.',
      'Supports pricing, stock tracking, and rich media for each product.',
    ],
  },
  {
    title: '2. Cart, Checkout & Order Flow',
    image: cartsImage,
    points: [
      'Includes cart lifecycle, checkout handling, and complete order processing.',
      'Designed to help teams launch storefront APIs quickly with minimal custom code.',
    ],
  },
  {
    title: '3. Customer Auth & Account Experience',
    image: authImage,
    points: [
      'Built-in login/register workflows for ecommerce customer journeys.',
      'Supports account-level order tracking and profile-driven commerce actions.',
    ],
  },
  {
    title: '4. Shipping & Transaction Setup',
    image: shippingImage,
    points: [
      'Configure shipping types and commerce settings from plugin-managed sections.',
      'Ready for extending payment and delivery strategies in real projects.',
    ],
  },
  {
    title: '5. API Collections & Integrations',
    image: apiImage,
    points: [
      'Expose clean API collections for frontend storefronts and mobile apps.',
      'Great for headless commerce builds with Strapi and custom UIs.',
    ],
  },
];

const HOW_TO_USE = [
  'Install and enable WebbyCommerce in your Strapi project.',
  'Restart Strapi so ecommerce routes and content models are registered.',
  'Open WebbyCommerce settings from the admin panel.',
  `Use ${PLUGIN_ID} sections to configure commerce flows for your project.`,
  'Set up products, authentication, shipping, and API collections.',
  'Connect your frontend and start managing ecommerce data at scale.',
];

const FAQS = [
  {
    q: 'Is WebbyCommerce suitable for production projects?',
    a: 'Yes. It is built as a production-focused plugin with complete ecommerce modules and scalable patterns.',
  },
  {
    q: 'Can I use this plugin with a custom frontend?',
    a: 'Yes. WebbyCommerce is designed for headless usage and works with any frontend consuming Strapi APIs.',
  },
  {
    q: 'Does it support customization for business-specific requirements?',
    a: 'Yes. The plugin is modular and can be extended for custom workflows, validations, and integrations.',
  },
];

const MORE_APPS = [
  {
    name: 'Advanced Fields Plugin',
    description: 'Create cleaner content models with powerful custom field controls.',
    url: 'https://market.strapi.io/plugins/@webbycrown-advanced-fields',
  },
  {
    name: 'Strapi Advanced Sitemap',
    description: 'Generate SEO-focused sitemaps with advanced routing controls.',
    url: 'https://market.strapi.io/plugins/@webbycrown-strapi-advanced-sitemap',
  },
];

const currentVersion = pluginPackage.version;
const hasUpdate = currentVersion !== latestVersion;

const SectionCard = ({ title, children }) => (
  <Box background="neutral0" borderColor="neutral150" hasRadius padding={6} shadow="filterShadow">
    {title ? (
      <>
        <Typography variant="delta" tag="h2">
          {title}
        </Typography>
        <Box paddingTop={4}>{children}</Box>
      </>
    ) : (
      children
    )}
  </Box>
);

const StepCard = ({ index, text }) => (
  <Box background="neutral0" borderColor="neutral200" hasRadius padding={4} shadow="tableShadow">
    <Box
      background="primary100"
      borderColor="primary200"
      hasRadius
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      width="fit-content"
    >
      <Typography variant="pi" fontWeight="bold" textColor="primary700">
        Step {index}
      </Typography>
    </Box>
    <Box paddingTop={3}>
      <Typography variant="omega" textColor="neutral700">
        {text}
      </Typography>
    </Box>
  </Box>
);

const OverviewContent = () => {
  return (
    <>
      <Grid.Root gap={6}>
        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="1. Introduction & Overview">
            <Flex alignItems="flex-start" gap={6} wrap="wrap">
              <Box style={{ flex: 1, minWidth: '320px' }}>
                <Flex direction="column" gap={2} alignItems="flex-start">
                  <Typography variant="omega" textColor="neutral700">
                    <strong>Plugin Name:</strong> WebbyCommerce
                  </Typography>
                  <Typography variant="omega" textColor="neutral600">
                    <strong>Description:</strong> WebbyCommerce is a complete ecommerce-ready Strapi
                    plugin that helps teams manage products, cart flows, orders, shipping setup, and
                    customer journeys from one admin ecosystem.
                  </Typography>
                  <Box paddingTop={1}>
                    <Typography variant="delta" tag="h3">
                      Key Benefits
                    </Typography>
                    <Box as="ul" paddingTop={2} paddingLeft={5}>
                      {BENEFITS.map((benefit) => (
                        <Box as="li" key={benefit} paddingBottom={2}>
                          <Typography variant="omega" textColor="neutral700">
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box style={{ flex: 1, minWidth: '320px' }}>
                <Flex direction="column" gap={3} alignItems="flex-start">
                 
                  <Link href={VIDEO_LINK} isExternal>
                    <Box
                      as="img"
                      src={VIDEO_PREVIEW_IMAGE}
                      alt="WebbyCommerce video preview"
                      width="100%"
                      style={{ maxWidth: '500px', borderRadius: '8px', border: '1px solid #dcdce4' }}
                    />
                  </Link>
                  <Typography variant="omega">
                    Video link:{' '}
                    <Link href={VIDEO_LINK} isExternal>
                      {VIDEO_LINK}
                    </Link>
                  </Typography>
                </Flex>
              </Box>
            </Flex>
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="Version Information">
            <Typography variant="omega" textColor="neutral700">
              <strong>Current Installed Version:</strong> {currentVersion}
            </Typography>
            <Box paddingTop={2}>
              <Typography variant="omega" textColor={hasUpdate ? 'warning600' : 'success600'}>
                {hasUpdate
                  ? 'Update available. Please consider upgrading to the latest version.'
                  : 'You are on the latest version.'}
              </Typography>
            </Box>
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="How to Use">
            <Grid.Root gap={4}>
              {HOW_TO_USE.map((step, idx) => (
                <Grid.Item key={step} col={6} s={12} xs={12}>
                  <StepCard index={idx + 1} text={step} />
                </Grid.Item>
              ))}
            </Grid.Root>
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="2. Modules & Features">
            <Box>
              {MODULE_FEATURES.map((feature, index) => (
                <Box key={feature.title} paddingBottom={6}>
                  <Grid.Root gap={6}>
                    {index % 2 === 0 ? (
                      <>
                        <Grid.Item col={7} s={12} xs={12}>
                          <Flex alignItems="left" direction="column" gap={2}>
                            <Typography variant="delta" tag="h3">
                              {feature.title}
                            </Typography>
                            <Box as="ul" paddingLeft={0}>
                              {feature.points.map((point) => (
                                <Box as="li" key={point} paddingBottom={2}>
                                  <Typography variant="omega" textColor="neutral700">
                                    {point}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Flex>
                        </Grid.Item>
                        <Grid.Item col={5} s={12} xs={12}>
                          <Box display="flex" justifyContent="center">
                            <Box
                              as="img"
                              src={feature.image}
                              alt={`${feature.title} preview`}
                           
                              style={{
                                borderRadius: '10px',
                                border: '1px solid #dcdce4',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                        </Grid.Item>
                      </>
                    ) : (
                      <>
                        <Grid.Item col={5} s={12} xs={12}>
                          <Box display="flex" justifyContent="center">
                            <Box
                              as="img"
                              src={feature.image}
                              alt={`${feature.title} preview`}
                           
                              style={{
                                borderRadius: '10px',
                                border: '1px solid #dcdce4',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                        </Grid.Item>
                        <Grid.Item col={7} s={12} xs={12}>
                          <Flex alignItems="left" direction="column" gap={2}>
                            <Typography variant="delta" tag="h3">
                              {feature.title}
                            </Typography>
                            <Box as="ul" paddingLeft={0}>
                              {feature.points.map((point) => (
                                <Box as="li" key={point} paddingBottom={2}>
                                  <Typography variant="omega" textColor="neutral700">
                                    {point}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Flex>
                        </Grid.Item>
                      </>
                    )}
                  </Grid.Root>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="3. FAQs">
            {FAQS.map((item) => (
              <Box key={item.q} paddingBottom={4}>
                <Typography variant="delta" tag="h3">
                  {item.q}
                </Typography>
                <Box paddingTop={2}>
                  <Typography variant="omega" textColor="neutral700">
                    {item.a}
                  </Typography>
                </Box>
              </Box>
            ))}
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard title="Explore More Powerful Plugins">
            <Grid.Root gap={4}>
              {MORE_APPS.map((app) => (
                <Grid.Item key={app.name} col={6} s={12} xs={12}>
                  <Box
                    as="a"
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    background="neutral0"
                    borderColor="neutral200"
                    hasRadius
                    padding={5}
                    shadow="tableShadow"
                    style={{ textDecoration: 'none', display: 'block', minHeight: '140px' }}
                  >
                    <Typography variant="delta" tag="h3" textColor="primary600">
                      {app.name}
                    </Typography>
                    <Box paddingTop={2}>
                      <Typography variant="omega" textColor="neutral700">
                        {app.description}
                      </Typography>
                    </Box>
                    <Box paddingTop={3}>
                      <Typography variant="pi" textColor="primary600">
                        View Plugin
                      </Typography>
                    </Box>
                  </Box>
                </Grid.Item>
              ))}
            </Grid.Root>
          </SectionCard>
        </Grid.Item>

        <Grid.Item col={12} s={12} xs={12}>
          <SectionCard>
            <Typography variant="beta">Thank You for Visiting the WebbyCommerce Plugin!</Typography>
            <Box paddingTop={4}>
              <Grid.Root gap={4}>
                <Grid.Item col={6} s={12} xs={12}>
                  <Box
                    background="primary100"
                    borderColor="primary200"
                    hasRadius
                    padding={5}
                    style={{ minHeight: '130px' }}
                  >
                    <Box display="flex" alignItems="center" gap={3}>
                      <Phone width="20px" height="20px" fill="#4945ff" />
                      <Typography variant="beta">Have Any Question ?</Typography>
                    </Box>
                    <Box paddingTop={3}>
                      <Typography variant="omega">
                        <Typography as="span" variant="omega" textColor="primary600">
                          Sales :
                        </Typography>{' '}
                        +91 (942) 867-7503
                      </Typography>
                    </Box>
                  </Box>
                </Grid.Item>

                <Grid.Item col={6} s={12} xs={12}>
                  <Box
                    background="primary100"
                    borderColor="primary200"
                    hasRadius
                    padding={5}
                    style={{ minHeight: '130px' }}
                  >
                    <Box display="flex" alignItems="center" gap={3}>
                      <Mail width="20px" height="20px" fill="#4945ff" />
                      <Typography variant="beta">Write &amp; Send Email</Typography>
                    </Box>
                    <Box paddingTop={3}>
                      <Typography variant="omega">
                        <Typography as="span" variant="omega" textColor="primary600">
                          Sales :
                        </Typography>{' '}
                        <Link href="mailto:sales@webbycrown.com">sales@webbycrown.com</Link>
                      </Typography>
                    </Box>
                    <Box paddingTop={2}>
                      <Typography variant="omega">
                        <Typography as="span" variant="omega" textColor="primary600">
                          Support :
                        </Typography>{' '}
                        <Link href="mailto:info@webbycrown.com">info@webbycrown.com</Link>
                      </Typography>
                    </Box>
                  </Box>
                </Grid.Item>
              </Grid.Root>
            </Box>
          </SectionCard>
        </Grid.Item>
      </Grid.Root>

      <Box paddingTop={6}>
        <Divider />
      </Box>
    </>
  );
};

export default OverviewContent;
