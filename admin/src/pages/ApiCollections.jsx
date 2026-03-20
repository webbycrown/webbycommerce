'use strict';

import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Flex, Typography } from '@strapi/design-system';

import { PLUGIN_ID } from '../pluginId';

const ApiCollections = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: `${PLUGIN_ID}.settings.apiCollections.title`,
    defaultMessage: 'API Collections',
  });

  const description = formatMessage({
    id: `${PLUGIN_ID}.settings.apiCollections.description`,
    defaultMessage:
      'Reference for the public endpoints exposed by the Strapi Advanced Ecommerce plugin.',
  });

  return (
    <Box padding={6}>
      <Typography variant="alpha" textColor="neutral800">
        {title}
      </Typography>

      <Box
        background="neutral0"
        padding={6}
        shadow="filterShadow"
        hasRadius
        marginTop={4}
      >
        <Typography variant="epsilon" textColor="neutral800">
          {description}
        </Typography>

        <Box marginTop={6}>
          <Typography variant="delta" textColor="neutral800">
            {formatMessage({
              id: `${PLUGIN_ID}.settings.apiCollections.health.title`,
              defaultMessage: 'Health Check',
            })}
          </Typography>

          <Box marginTop={2}>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.apiCollections.health.summary`,
                defaultMessage:
                  'Simple endpoint to verify that the ecommerce plugin is installed and running.',
              })}
            </Typography>
          </Box>

          <Box marginTop={4}>
            <Flex gap={3} direction="column" alignItems="flex-start">
              <Box>
                <Typography variant="pi" fontWeight="bold">
                  GET
                </Typography>{' '}
                <Typography variant="pi" textColor="neutral800">
                  /webbycommerce/health
                </Typography>
              </Box>

              <Typography variant="pi" textColor="neutral600">
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.apiCollections.health.auth`,
                  defaultMessage: 'Auth: public (no authentication required by default).',
                })}
              </Typography>

              <Box>
                <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.health.response.title`,
                    defaultMessage: 'Successful response (200 OK)',
                  })}
                </Typography>
                <Box
                  marginTop={2}
                  padding={4}
                  background="neutral100"
                  hasRadius
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                >
                  {`{
  "status": "ok",
  "plugin": "webbycommerce",
  "message": "Ecommerce plugin is running"
}`}
                </Box>
              </Box>

              <Box marginTop={2}>
                <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.apiCollections.health.usage.title`,
                    defaultMessage: 'Typical usage',
                  })}
                </Typography>
                <Box as="ul" marginTop={1} paddingLeft={4}>
                  <li>
                    <Typography variant="pi" textColor="neutral600">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.apiCollections.health.usage.monitoring`,
                        defaultMessage: 'Use in uptime monitors to check ecommerce availability.',
                      })}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="pi" textColor="neutral600">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.apiCollections.health.usage.deploy`,
                        defaultMessage:
                          'Use in deployment or CI pipelines to validate the plugin is bootstrapped.',
                      })}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="pi" textColor="neutral600">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.apiCollections.health.usage.manual`,
                        defaultMessage:
                          'Quick manual verification from a browser or API client (Postman, Insomnia, curl).',
                      })}
                    </Typography>
                  </li>
                </Box>
              </Box>

              <Box marginTop={2}>
                <Typography variant="pi" textColor="neutral800" fontWeight="bold">
                  curl
                </Typography>
                <Box
                  marginTop={2}
                  padding={4}
                  background="neutral100"
                  hasRadius
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                >
                  {`curl http://localhost:1337/webbycommerce/health`}
                </Box>
              </Box>
            </Flex>
          </Box>

          <Box marginTop={8}>
            <Typography variant="pi" textColor="neutral500">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.apiCollections.footer`,
                defaultMessage:
                  'As you add more ecommerce endpoints (products, cart, orders, etc.), they can be documented here for your team.',
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ApiCollections;


