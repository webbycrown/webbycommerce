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

const ShippingTypeContent = () => {
  const { formatMessage } = useIntl();
  const fetchClient = useFetchClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [shippingType, setShippingType] = useState('single'); // 'single' or 'multiple'
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
      if (data.shippingType) {
        setShippingType(data.shippingType);
      }
    } catch (err) {
      console.error('Failed to load shipping type settings:', err);
      setError(
        formatMessage({
          id: `${PLUGIN_ID}.settings.shippingType.load.error`,
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

      const { data } = await fetchClient.put(`/webbycommerce/settings`, {
        shippingType,
      });

      if (data.shippingType) {
        setShippingType(data.shippingType);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save shipping type settings:', err);
      setError(
        formatMessage({
          id: `${PLUGIN_ID}.settings.shippingType.save.error`,
          defaultMessage: 'Failed to save settings. Please try again.',
        })
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box padding={4}>
        <Typography>
          {formatMessage({
            id: `${PLUGIN_ID}.settings.shippingType.loading`,
            defaultMessage: 'Loading settings...',
          })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box paddingBottom={4}>
        <Typography variant="beta" as="h2">
          {formatMessage({
            id: `${PLUGIN_ID}.settings.shippingType.title`,
            defaultMessage: 'Shipping Type Settings',
          })}
        </Typography>
        <Typography variant="omega" textColor="neutral600" as="p" style={{ marginTop: '8px' }}>
          {formatMessage({
            id: `${PLUGIN_ID}.settings.shippingType.description`,
            defaultMessage: 'Configure how users can manage their billing and shipping addresses.',
          })}
        </Typography>
      </Box>

      <Box paddingBottom={6}>
        <Box paddingBottom={3}>
          <Typography variant="omega" fontWeight="semiBold" as="label" style={{ display: 'block', marginBottom: '8px' }}>
            {formatMessage({
              id: `${PLUGIN_ID}.settings.shippingType.method.label`,
              defaultMessage: 'Address Management Type',
            })}
          </Typography>
        </Box>

        <Flex direction="column" gap={3} alignItems="start">
          <Box
            as="label"
            padding={4}
            borderColor={shippingType === 'single' ? 'primary600' : 'neutral200'}
            borderStyle="solid"
            borderWidth="1px"
            hasRadius
            style={{
              cursor: 'pointer',
              backgroundColor: shippingType === 'single' ? 'rgba(0, 122, 255, 0.05)' : 'transparent',
            }}
            onClick={() => setShippingType('single')}
          >
            <Flex gap={2} alignItems="center">
              <input
                type="radio"
                name="shippingType"
                value="single"
                checked={shippingType === 'single'}
                onChange={() => setShippingType('single')}
                style={{ margin: 0 }}
              />
              <Box>
                <Typography variant="omega" fontWeight="semiBold">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.shippingType.single.label`,
                    defaultMessage: 'Single Address Mode',
                  })}
                </Typography>
                <Typography variant="omega" textColor="neutral600" style={{ marginTop: '4px' }} display="block">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.shippingType.single.description`,
                    defaultMessage: 'Users can have one billing address and one shipping address. Suitable for simple e-commerce sites.',
                  })}
                </Typography>
              </Box>
            </Flex>
          </Box>

          <Box
            as="label"
            padding={4}
            borderColor={shippingType === 'multiple' ? 'primary600' : 'neutral200'}
            borderStyle="solid"
            borderWidth="1px"
            hasRadius
            style={{
              cursor: 'pointer',
              backgroundColor: shippingType === 'multiple' ? 'rgba(0, 122, 255, 0.05)' : 'transparent',
            }}
            onClick={() => setShippingType('multiple')}
          >
            <Flex gap={2} alignItems="center">
              <input
                type="radio"
                name="shippingType"
                value="multiple"
                checked={shippingType === 'multiple'}
                onChange={() => setShippingType('multiple')}
                style={{ margin: 0 }}
              />
              <Box>
                <Typography variant="omega" fontWeight="semiBold">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.shippingType.multiple.label`,
                    defaultMessage: 'Multiple Address Mode',
                  })}
                </Typography>
                <Typography variant="omega" textColor="neutral600" style={{ marginTop: '4px' }} display="block">
                  {formatMessage({
                    id: `${PLUGIN_ID}.settings.shippingType.multiple.description`,
                    defaultMessage: 'Users can have multiple billing and shipping addresses. They can select any address during checkout. Similar to Amazon/Flipkart.',
                  })}
                </Typography>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {error && (
        <Box paddingBottom={4}>
          <Typography textColor="danger600" variant="omega">
            {error}
          </Typography>
        </Box>
      )}

      {success && (
        <Box paddingBottom={4}>
          <Typography textColor="success600" variant="omega">
            {formatMessage({
              id: `${PLUGIN_ID}.settings.shippingType.save.success`,
              defaultMessage: 'Settings saved successfully!',
            })}
          </Typography>
        </Box>
      )}

      <Flex justifyContent="flex-start">
        <Button onClick={handleSave} loading={saving} disabled={saving}>
          {formatMessage({
            id: `${PLUGIN_ID}.settings.shippingType.save.button`,
            defaultMessage: 'Save Settings',
          })}
        </Button>
      </Flex>
    </Box>
  );
};

export default ShippingTypeContent;

