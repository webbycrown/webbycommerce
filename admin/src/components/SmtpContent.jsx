'use strict';

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, Flex, Typography, TextInput, Button } from '@strapi/design-system';
import { useFetchClient } from '@strapi/admin/strapi-admin';

import { PLUGIN_ID } from '../pluginId';

const SmtpContent = () => {
  const { formatMessage } = useIntl();
  const fetchClient = useFetchClient();

  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: '587',
    secure: false,
    username: '',
    password: '',
    from: '',
    fromName: '',
    rejectUnauthorized: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const title = formatMessage({
    id: `${PLUGIN_ID}.settings.smtp.title`,
    defaultMessage: 'SMTP Configuration',
  });

  const description = formatMessage({
    id: `${PLUGIN_ID}.settings.smtp.description`,
    defaultMessage:
      'Configure SMTP settings to send OTP emails. If not configured, Strapi\'s default email plugin will be used.',
  });

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchClient.get(`/webbycommerce-ecommerce/settings`);
        const smtp = data?.smtp || {};
        if (!isMounted) return;

        setSmtpSettings({
          host: smtp.host || '',
          port: smtp.port || '587',
          secure: smtp.secure === true,
          username: smtp.username || '',
          password: smtp.password || '',
          from: smtp.from || '',
          fromName: smtp.fromName || '',
          rejectUnauthorized: smtp.rejectUnauthorized !== false,
        });
      } catch (error) {
        if (isMounted) {
          setFeedback({
            type: 'error',
            message: formatMessage({
              id: `${PLUGIN_ID}.settings.smtp.load.error`,
              defaultMessage: 'Failed to load SMTP settings.',
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setFeedback(null);

      const { data } = await fetchClient.put(`/webbycommerce-ecommerce/settings`, {
        smtp: smtpSettings,
      });

      setFeedback({
        type: 'success',
        message: formatMessage({
          id: `${PLUGIN_ID}.settings.smtp.save.success`,
          defaultMessage: 'SMTP settings updated successfully.',
        }),
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: formatMessage({
          id: `${PLUGIN_ID}.settings.smtp.save.error`,
          defaultMessage: 'Failed to save SMTP settings.',
        }),
      });
    } finally {
      setIsSaving(false);
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
              id: `${PLUGIN_ID}.settings.configure.smtp.title`,
              defaultMessage: 'SMTP Configuration (for OTP emails)',
            })}
          </Typography>
          <Box marginTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {formatMessage({
                id: `${PLUGIN_ID}.settings.configure.smtp.description`,
                defaultMessage:
                  'Configure SMTP settings to send OTP emails. If not configured, Strapi\'s default email plugin will be used.',
              })}
            </Typography>
          </Box>

          <Box marginTop={4}>
            <Flex direction="column" gap={4} alignItems="start">
              <TextInput
                name="smtp-host"
                label={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.host.label`,
                  defaultMessage: 'SMTP Host',
                })}
                placeholder={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.host.placeholder`,
                  defaultMessage: 'e.g. smtp.gmail.com',
                })}
                value={smtpSettings.host}
                onChange={(event) =>
                  setSmtpSettings({ ...smtpSettings, host: event.target.value })
                }
                disabled={isLoading || isSaving}
              />

              <Flex gap={3} alignItems="flex-end">
                <Box style={{ flex: 1 }}>
                  <TextInput
                    name="smtp-port"
                    label={formatMessage({
                      id: `${PLUGIN_ID}.settings.configure.smtp.port.label`,
                      defaultMessage: 'SMTP Port',
                    })}
                    placeholder="587"
                    value={smtpSettings.port}
                    onChange={(event) =>
                      setSmtpSettings({ ...smtpSettings, port: event.target.value })
                    }
                    disabled={isLoading || isSaving}
                    type="number"
                  />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Box marginBottom={2}>
                    <Typography variant="pi" textColor="neutral800" fontWeight="semiBold">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.configure.smtp.secure.label`,
                        defaultMessage: 'Secure (TLS/SSL)',
                      })}
                    </Typography>
                  </Box>
                  <Flex alignItems="center" gap={2}>
                    <input
                      type="checkbox"
                      id="smtp-secure"
                      checked={smtpSettings.secure}
                      onChange={(event) =>
                        setSmtpSettings({
                          ...smtpSettings,
                          secure: event.target.checked,
                        })
                      }
                      disabled={isLoading || isSaving}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#4945ff',
                        cursor: isLoading || isSaving ? 'not-allowed' : 'pointer',
                      }}
                    />
                    <Typography variant="pi" textColor="neutral600">
                      {formatMessage({
                        id: `${PLUGIN_ID}.settings.configure.smtp.secure.hint`,
                        defaultMessage: 'Enable for port 465 (SSL), disable for port 587 (TLS)',
                      })}
                    </Typography>
                  </Flex>
                </Box>
              </Flex>

              <TextInput
                name="smtp-username"
                label={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.username.label`,
                  defaultMessage: 'SMTP Username',
                })}
                placeholder={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.username.placeholder`,
                  defaultMessage: 'Your email address',
                })}
                value={smtpSettings.username}
                onChange={(event) =>
                  setSmtpSettings({ ...smtpSettings, username: event.target.value })
                }
                disabled={isLoading || isSaving}
              />

              <TextInput
                name="smtp-password"
                label={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.password.label`,
                  defaultMessage: 'SMTP Password',
                })}
                placeholder={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.password.placeholder`,
                  defaultMessage: 'Your email password or app password',
                })}
                value={smtpSettings.password}
                onChange={(event) =>
                  setSmtpSettings({ ...smtpSettings, password: event.target.value })
                }
                disabled={isLoading || isSaving}
                type="password"
              />

              <TextInput
                name="smtp-from"
                label={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.from.label`,
                  defaultMessage: 'From Email',
                })}
                placeholder={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.from.placeholder`,
                  defaultMessage: 'noreply@example.com',
                })}
                value={smtpSettings.from}
                onChange={(event) =>
                  setSmtpSettings({ ...smtpSettings, from: event.target.value })
                }
                disabled={isLoading || isSaving}
              />

              <TextInput
                name="smtp-from-name"
                label={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.fromName.label`,
                  defaultMessage: 'From Name',
                })}
                placeholder={formatMessage({
                  id: `${PLUGIN_ID}.settings.configure.smtp.fromName.placeholder`,
                  defaultMessage: 'Strapi Advanced Ecommerce',
                })}
                value={smtpSettings.fromName}
                onChange={(event) =>
                  setSmtpSettings({ ...smtpSettings, fromName: event.target.value })
                }
                disabled={isLoading || isSaving}
              />
            </Flex>
          </Box>
        </Box>

        <Box marginTop={6}>
          <Flex gap={3} alignItems="center">
            <Button onClick={handleSave} loading={isSaving} disabled={isLoading || isSaving}>
              {formatMessage({
                id: `${PLUGIN_ID}.settings.smtp.save`,
                defaultMessage: 'Save SMTP settings',
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

export default SmtpContent;