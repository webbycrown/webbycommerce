'use strict';

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, Flex, Typography, TextInput, Button } from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import { useFetchClient } from '@strapi/admin/strapi-admin';

import { PLUGIN_ID } from '../pluginId';

const emptyOriginRow = () => ({
  id: Math.random().toString(36).slice(2),
  value: '',
});

const ConfigureContent = () => {
  const { formatMessage } = useIntl();
  const fetchClient = useFetchClient();

  const [rows, setRows] = useState([emptyOriginRow()]);
  const [routePrefix, setRoutePrefix] = useState('webbycommerce');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const title = formatMessage({
    id: `${PLUGIN_ID}.settings.configure.title`,
    defaultMessage: 'Configure',
  });

  const description = formatMessage({
    id: `${PLUGIN_ID}.settings.configure.description`,
    defaultMessage:
      'Global settings for the Strapi Advanced Ecommerce plugin. Use this page to control ecommerce-wide behavior.',
  });

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchClient.get(`/webbycommerce/settings`);
        const origins = Array.isArray(data?.allowedOrigins) ? data.allowedOrigins : [];
        const prefix = data?.routePrefix || 'webbycommerce';
        if (!isMounted) return;

        setRoutePrefix(prefix);
        if (origins.length) {
          setRows(
            origins.map((value) => ({
              id: Math.random().toString(36).slice(2),
              value,
            }))
          );
        } else {
          setRows([emptyOriginRow()]);
        }
      } catch (error) {
        if (isMounted) {
          setFeedback({
            type: 'error',
            message: formatMessage({
              id: `${PLUGIN_ID}.settings.configure.load.error`,
              defaultMessage: 'Failed to load settings.',
            }),
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [fetchClient, formatMessage]);

  const updateRowValue = (id, value) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  const addRow = () => {
    setRows((current) => [...current, emptyOriginRow()]);
  };

  const removeRow = (id) => {
    setRows((current) => {
      const next = current.filter((row) => row.id !== id);
      return next.length ? next : [emptyOriginRow()];
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setFeedback(null);

      const allowedOrigins = rows
        .map((row) => (typeof row.value === 'string' ? row.value.trim() : ''))
        .filter((value) => value.length > 0);

      // Sanitize route prefix
      const sanitizedPrefix = (routePrefix || 'webbycommerce')
        .trim()
        .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
        .replace(/\/+/g, '/') // Replace multiple slashes with single
        .replace(/[^a-zA-Z0-9\/_-]/g, '') // Remove invalid characters
        || 'webbycommerce';

      const { data } = await fetchClient.put(`/webbycommerce/settings`, {
        allowedOrigins,
        routePrefix: sanitizedPrefix,
      });

      const persisted = Array.isArray(data?.allowedOrigins) ? data.allowedOrigins : [];
      setRows(
        (persisted.length ? persisted : ['']).map((value) => ({
          id: Math.random().toString(36).slice(2),
          value,
        }))
      );

      setFeedback({
        type: 'success',
        message: formatMessage({
          id: `${PLUGIN_ID}.settings.configure.save.success`,
          defaultMessage: 'Settings updated successfully.',
        }),
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: formatMessage({
          id: `${PLUGIN_ID}.settings.configure.save.error`,
          defaultMessage: 'Failed to save settings.',
        }),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeedDemo = async () => {
    if (!window.confirm(formatMessage({
      id: `${PLUGIN_ID}.settings.configure.demo.confirm`,
      defaultMessage: 'Are you sure you want to seed demo data? This will overwrite existing data with the same slugs.'
    }))) {
      return;
    }

    try {
      setIsSeeding(true);
      setFeedback(null);

      const { data } = await fetchClient.post(`/webbycommerce/seed-demo`);

      if (data.success) {
        setFeedback({
          type: 'success',
          message: formatMessage({
            id: `${PLUGIN_ID}.settings.configure.demo.success`,
            defaultMessage: 'Demo data seeded successfully!',
          }),
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: formatMessage({
          id: `${PLUGIN_ID}.settings.configure.demo.error`,
          defaultMessage: 'Failed to seed demo data.',
        }) + (error.message ? `: ${error.message}` : ''),
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Box paddingTop={6}>
      <Typography variant="beta" textColor="neutral800">
        {title}
      </Typography>

      <Box marginTop={2}>
        <Typography variant="pi" textColor="neutral600">
          {description}
        </Typography>
      </Box>

      <Box marginTop={6}>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          padding={4}
          style={{ maxWidth: '640px' }}
        >
          <Typography variant="delta" textColor="neutral800">
            {formatMessage({
              id: `${PLUGIN_ID}.settings.configure.routePrefix.title`,
              defaultMessage: 'API Route Prefix',
            })}
          </Typography>
          <Box marginTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.routePrefix.description`,
                defaultMessage:
                  'Customize the API route prefix. All ecommerce API endpoints will use this prefix. Default: webbycommerce',
              })}
            </Typography>
          </Box>
          <Box marginTop={4}>
            <TextInput
              name="routePrefix"
              label={formatMessage({
                id: `${PLUGIN_ID}.settings.configure.routePrefix.label`,
                defaultMessage: 'Route prefix',
              })}
              placeholder={formatMessage({
                id: `${PLUGIN_ID}.settings.configure.routePrefix.placeholder`,
                defaultMessage: 'e.g. ecommerce, v1, api/ecommerce',
              })}
              value={routePrefix}
              onChange={(event) => setRoutePrefix(event.target.value)}
              disabled={isLoading || isSaving}
              hint={formatMessage({
                id: `${PLUGIN_ID}.settings.configure.routePrefix.hint`,
                defaultMessage: 'API endpoints will be available at /api/{prefix}/...',
              })}
            />
          </Box>
        </Box>

        <Box marginTop={6}>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            padding={4}
            style={{ maxWidth: '640px' }}
          >
            <Typography variant="delta" textColor="neutral800">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.origins.title`,
                defaultMessage: 'Allowed frontend domains',
              })}
            </Typography>
          <Box marginTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.origins.description`,
                defaultMessage:
                  'Only requests coming from these domains will be allowed to use the ecommerce facility. Leave empty to allow all domains.',
              })}
            </Typography>
          </Box>

          <Box marginTop={4}>
            {rows.map((row, index) => (
              <Box
                key={row.id}
                marginTop={index === 0 ? 2 : 4}
                padding={4}
                hasRadius
                background="neutral100"
                style={{ border: '1px solid #dcdce4' }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={4}
                  wrap="wrap"
                >
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="epsilon" textColor="neutral800">
                      {formatMessage(
                        {
                          id: `${PLUGIN_ID}.settings.configure.origins.entryTitle`,
                          defaultMessage: 'Domain #{index}',
                        },
                        { index: index + 1 }
                      )}
                    </Typography>
                    <Box marginTop={2}>
                      <TextInput
                        name={`origin-${row.id}`}
                        label={formatMessage({
                          id: `${PLUGIN_ID}.settings.configure.origins.label`,
                          defaultMessage: 'Frontend domain',
                        })}
                        placeholder={formatMessage({
                          id: `${PLUGIN_ID}.settings.configure.origins.placeholder`,
                          defaultMessage: 'e.g. https://shop.example.com',
                        })}
                        value={row.value}
                        onChange={(event) => updateRowValue(row.id, event.target.value)}
                        disabled={isLoading || isSaving}
                      />
                    </Box>
                  </Box>
                  <Button
                    variant="tertiary"
                    startIcon={<Trash />}
                    onClick={() => removeRow(row.id)}
                    disabled={isLoading || isSaving}
                  >
                    {formatMessage({
                      id: `${PLUGIN_ID}.settings.configure.origins.remove`,
                      defaultMessage: 'Remove domain',
                    })}
                  </Button>
                </Flex>
              </Box>
            ))}

            <Box>
              <Button
                marginTop={2}
                variant="tertiary"
                onClick={addRow}
                disabled={isLoading || isSaving}
              >
                {formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.origins.add`,
                  defaultMessage: 'Add domain',
                })}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box marginTop={6}>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          padding={4}
          style={{ maxWidth: '640px' }}
        >
          <Typography variant="delta" textColor="neutral800">
            {formatMessage({
              id: `${PLUGIN_ID}.settings.configure.demo.title`,
              defaultMessage: 'Demo Data',
            })}
          </Typography>
          <Box marginTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.demo.description`,
                defaultMessage:
                  'Import sample products, categories, tags, and shipping settings to test the plugin. This will not overwrite existing data with the same slugs.',
              })}
            </Typography>
          </Box>
          <Box marginTop={4}>
            <Button
              variant="secondary"
              onClick={handleSeedDemo}
              loading={isSeeding}
              disabled={isLoading || isSaving || isSeeding}
            >
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.demo.button`,
                defaultMessage: 'Seed Demo Data',
              })}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box marginTop={6}>
        <Flex gap={3} alignItems="center">
            <Button onClick={handleSave} loading={isSaving} disabled={isLoading || isSaving}>
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.save`,
                defaultMessage: 'Save settings',
              })}
            </Button>
            {feedback && (
              <Typography
                variant="pi"
                textColor={feedback.type === 'error' ? 'danger600' : 'success600'}
              >
                {feedback.message}
              </Typography>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigureContent;

