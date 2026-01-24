'use strict';

import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Flex, Typography } from '@strapi/design-system';

import { PLUGIN_ID } from '../pluginId';

const Configure = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: `${PLUGIN_ID}.settings.configure.title`,
    defaultMessage: 'Configure',
  });

  const description = formatMessage({
    id: `${PLUGIN_ID}.settings.configure.description`,
    defaultMessage:
      'Global settings for the Strapi Advanced Ecommerce plugin. Use this page to control ecommerce-wide behavior.',
  });

  return (
    <Box padding={6}>
      <Typography variant="alpha" textColor="neutral800">
        {formatMessage({
          id: `${PLUGIN_ID}.settings.section`,
          defaultMessage: 'Advanced Ecommerce',
        })}
      </Typography>

      <Box
        background="neutral0"
        padding={6}
        shadow="filterShadow"
        hasRadius
        marginTop={4}
      >
        <Typography variant="beta" textColor="neutral800">
          {title}
        </Typography>

        <Box marginTop={2}>
          <Typography variant="pi" textColor="neutral600">
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Configure;


