'use strict';

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Flex,
  Typography,
  Button,
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import { PLUGIN_ID } from '../pluginId';

const LoginRegisterContent = () => {
  const { formatMessage } = useIntl();
  const fetchClient = useFetchClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [method, setMethod] = useState('default'); // 'default' or 'otp'
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchClient.get(`/webbycommerce/settings`);
      if (data.loginRegisterMethod) {
        setMethod(data.loginRegisterMethod);
      }
    } catch (err) {
      console.error('Failed to load login/register settings:', err);
      setError(
        formatMessage({
          id: `${PLUGIN_ID}.settings.loginRegister.load.error`,
          defaultMessage: 'Failed to load settings.',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      await fetchClient.put(`/webbycommerce/settings`, {
        loginRegisterMethod: method,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save login/register settings:', err);
      setError(
        formatMessage({
          id: `${PLUGIN_ID}.settings.loginRegister.save.error`,
          defaultMessage: 'Failed to save settings.',
        })
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box paddingTop={6}>
        <Typography variant="omega" textColor="neutral600">
          {formatMessage({
            id: `${PLUGIN_ID}.settings.loginRegister.loading`,
            defaultMessage: 'Loading settings...',
          })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box paddingTop={6}>
      <Typography variant="delta" textColor="neutral800" fontWeight="bold" marginBottom={4}>
        {formatMessage({
          id: `${PLUGIN_ID}.settings.loginRegister.title`,
          defaultMessage: 'Login/Register Configuration',
        })}
      </Typography>

      <Typography variant="omega" textColor="neutral600" marginBottom={6} display="block">
        {formatMessage({
          id: `${PLUGIN_ID}.settings.loginRegister.description`,
          defaultMessage:
            'Choose the authentication method for user login and registration. Default uses Strapi\'s standard email/password authentication. OTP allows users to login or register using email or mobile number with OTP verification.',
        })}
      </Typography>

      <Box
        background="neutral0"
        hasRadius
        shadow="filterShadow"
        padding={4}
        style={{ maxWidth: '640px' }}
      >
        <Typography variant="delta" textColor="neutral800" fontWeight="semiBold">
          {formatMessage({
            id: `${PLUGIN_ID}.settings.loginRegister.method.label`,
            defaultMessage: 'Authentication Method',
          })}
        </Typography>
        <Box marginTop={1}>
          <Typography variant="pi" textColor="neutral600">
            {formatMessage({
              id: `${PLUGIN_ID}.settings.loginRegister.method.hint`,
              defaultMessage: 'Select the method users will use to login and register.',
            })}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Flex direction="column" gap={3} alignItems="start">
            <Box
              as="label"
              padding={3}
              background={method === 'default' ? 'primary100' : 'neutral0'}
              hasRadius
              style={{
                cursor: 'pointer',
                border: `1px solid ${method === 'default' ? '#4945ff' : '#dcdce4'}`,
              }}
            >
              <Flex gap={2} alignItems="flex-start">
                <input
                  type="radio"
                  name="loginMethod"
                  value="default"
                  checked={method === 'default'}
                  onChange={(e) => setMethod(e.target.value)}
                  style={{
                    marginTop: '4px',
                    cursor: 'pointer',
                  }}
                />
                <Box>
                  <Typography variant="omega" textColor="neutral800" fontWeight="semiBold">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.loginRegister.method.default`,
                      defaultMessage: 'Default (Email/Password)',
                    })}
                  </Typography>
                  <Typography variant="pi" textColor="neutral600" marginTop={1} display="block">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.loginRegister.method.default.description`,
                      defaultMessage:
                        'Uses Strapi\'s built-in authentication system with email and password.',
                    })}
                  </Typography>
                </Box>
              </Flex>
            </Box>

            <Box
              as="label"
              padding={3}
              background={method === 'otp' ? 'primary100' : 'neutral0'}
              hasRadius
              style={{
                cursor: 'pointer',
                border: `1px solid ${method === 'otp' ? '#4945ff' : '#dcdce4'}`,
              }}
            >
              <Flex gap={2} alignItems="flex-start">
                <input
                  type="radio"
                  name="loginMethod"
                  value="otp"
                  checked={method === 'otp'}
                  onChange={(e) => setMethod(e.target.value)}
                  style={{
                    marginTop: '4px',
                    cursor: 'pointer',
                  }}
                />
                <Box>
                  <Typography variant="omega" textColor="neutral800" fontWeight="semiBold">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.loginRegister.method.otp`,
                      defaultMessage: 'OTP (Email/Mobile Verification)',
                    })}
                  </Typography>
                  <Typography variant="pi" textColor="neutral600" marginTop={1} display="block">
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.loginRegister.method.otp.description`,
                      defaultMessage:
                        'Users can login or register using email or mobile number. An OTP (One-Time Password) will be sent for verification.',
                    })}
                  </Typography>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {error && (
          <Box marginTop={4} padding={3} background="danger100" hasRadius>
            <Typography variant="omega" textColor="danger700">
              {error}
            </Typography>
          </Box>
        )}

        {success && (
          <Box marginTop={4} padding={3} background="success100" hasRadius>
            <Typography variant="omega" textColor="success700">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.loginRegister.save.success`,
                defaultMessage: 'Settings updated successfully.',
              })}
            </Typography>
          </Box>
        )}

        <Flex marginTop={6} gap={2}>
          <Button onClick={handleSave} loading={saving} disabled={saving}>
            {formatMessage({
              id: `${PLUGIN_ID}.settings.loginRegister.save`,
              defaultMessage: 'Save settings',
            })}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginRegisterContent;

