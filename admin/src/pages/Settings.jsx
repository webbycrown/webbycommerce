'use strict';

import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Main, Box, Flex, Typography, Button, DesignSystemProvider } from '@strapi/design-system';

import { PLUGIN_ID } from '../pluginId';
import ConfigureContent from '../components/ConfigureContent';
import ApiCollectionsContent from '../components/ApiCollectionsContent';
import LoginRegisterContent from '../components/LoginRegisterContent';
import ShippingTypeContent from '../components/ShippingTypeContent';
import SmtpContent from '../components/SmtpContent';

const Settings = () => {
  const { formatMessage } = useIntl();
  const [activeView, setActiveView] = useState('configure');

  const titleId = `${PLUGIN_ID}-settings-title`;

  return (
    <DesignSystemProvider>
      <Main labelledBy={titleId}>
        <Box padding={8} background="neutral100">
          <Box paddingBottom={4}>
            <Typography id={titleId} variant="alpha" as="h1">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.section`,
                defaultMessage: 'Advanced Ecommerce',
              })}
            </Typography>
          </Box>

          <Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
            <Flex gap={2} marginBottom={6} wrap="wrap">
             
              <Button
                variant={activeView === 'configure' ? 'default' : 'tertiary'}
                onClick={() => setActiveView('configure')}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.title`,
                  defaultMessage: 'Configure',
                })}
              </Button>
              <Button
                variant={activeView === 'login-register' ? 'default' : 'tertiary'}
                onClick={() => setActiveView('login-register')}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.loginRegister.title`,
                  defaultMessage: 'Login/Register',
                })}
              </Button>
              <Button
                variant={activeView === 'shipping-type' ? 'default' : 'tertiary'}
                onClick={() => setActiveView('shipping-type')}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.shippingType.title`,
                  defaultMessage: 'Shipping Type',
                })}
              </Button>
              <Button
                variant={activeView === 'smtp' ? 'default' : 'tertiary'}
                onClick={() => setActiveView('smtp')}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.smtp.title`,
                  defaultMessage: 'SMTP',
                })}
              </Button>
              <Button
                variant={activeView === 'api-collections' ? 'default' : 'tertiary'}
                onClick={() => setActiveView('api-collections')}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.apiCollections.title`,
                  defaultMessage: 'API Collections',
                })}
              </Button>
            </Flex>

            {activeView === 'configure' && <ConfigureContent />}
            {activeView === 'login-register' && <LoginRegisterContent />}
            {activeView === 'shipping-type' && <ShippingTypeContent />}
            {activeView === 'smtp' && <SmtpContent />}
            {activeView === 'api-collections' && <ApiCollectionsContent />}
          </Box>
        </Box>
      </Main>
    </DesignSystemProvider>
  );
};

export default Settings;

