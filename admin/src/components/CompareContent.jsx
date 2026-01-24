import React, { useState, useEffect } from 'react';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  ActionLayout,
} from '@strapi/design-system/Layout';
import {
  Box,
  Typography,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Avatar,
  Badge,
  Flex,
  IconButton,
} from '@strapi/design-system';
import {
  Eye,
  Pencil,
  Trash,
  Plus,
} from '@strapi/icons';

// Alternative imports if the above don't work:
// import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import { useNotification } from '@strapi/admin/strapi-admin';

const CompareContent = () => {
  const { formatMessage } = useIntl();
  const { get, del } = useFetchClient();
  const { toggleNotification } = useNotification();

  const [compares, setCompares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompare, setSelectedCompare] = useState(null);

  useEffect(() => {
    fetchCompares();
  }, []);

  const fetchCompares = async () => {
    try {
      setLoading(true);
      const response = await get('/webbycommerce/compares');
      setCompares(response.data.data || []);
    } catch (error) {
      console.error('Error fetching compares:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to fetch compare lists',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompare = async (compareId) => {
    if (!confirm('Are you sure you want to delete this compare list?')) {
      return;
    }

    try {
      await del(`/webbycommerce/compares/${compareId}`);
      setCompares(compares.filter(c => c.id !== compareId));
      toggleNotification({
        type: 'success',
        message: 'Compare list deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting compare:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to delete compare list',
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Layout>
      <HeaderLayout
        title="Compare Management"
        subtitle="Manage user compare lists and product comparisons"
        as="h2"
      />
      <ActionLayout
        startActions={
          <Button
            onClick={fetchCompares}
            loading={loading}
            variant="secondary"
          >
            Refresh
          </Button>
        }
      />
      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          padding={6}
        >
          {loading ? (
            <Box padding={4}>
              <Typography>Loading compare lists...</Typography>
            </Box>
          ) : compares.length === 0 ? (
            <Box padding={4}>
              <Typography>No compare lists found.</Typography>
            </Box>
          ) : (
            <Table colCount={5} rowCount={compares.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">User</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Products</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Category</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Public</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Actions</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {compares.map((compare) => (
                  <Tr key={compare.id}>
                    <Td>
                      <Flex>
                        <Avatar
                          src={null}
                          alt={compare.userEmail}
                          initials={compare.userEmail?.charAt(0).toUpperCase()}
                        />
                        <Box marginLeft={2}>
                          <Typography>{compare.userEmail}</Typography>
                          <Typography variant="pi" textColor="neutral600">
                            ID: {compare.userId}
                          </Typography>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge>{compare.products?.length || 0}/4 products</Badge>
                    </Td>
                    <Td>
                      <Typography variant="pi">
                        {compare.category?.name || 'Mixed'}
                      </Typography>
                    </Td>
                    <Td>
                      <Badge color={compare.isPublic ? 'success' : 'neutral'}>
                        {compare.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </Td>
                    <Td>
                      <Flex gap={1}>
                        <IconButton
                          onClick={() => setSelectedCompare(compare)}
                          label="View compare list"
                          icon={<Eye />}
                        />
                        <IconButton
                          onClick={() => handleDeleteCompare(compare.id)}
                          label="Delete compare list"
                          icon={<Trash />}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>

        {/* Compare Detail Modal/View */}
        {selectedCompare && (
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            padding={6}
            marginTop={4}
          >
            <Typography variant="beta" marginBottom={4}>
              Compare List Details - {selectedCompare.userEmail}
            </Typography>

            {selectedCompare.name && (
              <Typography variant="epsilon" marginBottom={2}>
                Name: {selectedCompare.name}
              </Typography>
            )}

            {selectedCompare.notes && (
              <Typography variant="pi" marginBottom={4}>
                Notes: {selectedCompare.notes}
              </Typography>
            )}

            <Typography variant="delta" marginBottom={3}>
              Products ({selectedCompare.products?.length || 0}/4):
            </Typography>

            {selectedCompare.products?.length > 0 ? (
              <Flex gap={4} wrap="wrap">
                {selectedCompare.products.map((product) => (
                  <Box key={product.id} flex="1" minWidth="300px">
                    <Box
                      padding={4}
                      background="neutral100"
                      hasRadius
                      borderColor="neutral200"
                    >
                      <Flex alignItems="center" marginBottom={3}>
                        {product.images?.[0] && (
                          <Box marginRight={3}>
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                            />
                          </Box>
                        )}
                        <Box flex={1}>
                          <Typography variant="omega" fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Typography variant="pi" textColor="neutral600">
                            ${product.price || 'N/A'}
                          </Typography>
                        </Box>
                        <Badge color={product.stockQuantity > 0 ? 'success' : 'danger'}>
                          {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </Flex>

                      {product.specifications && (
                        <Box>
                          <Typography variant="pi" fontWeight="bold" marginBottom={2}>
                            Specifications:
                          </Typography>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <Flex key={key} justifyContent="space-between" marginBottom={1}>
                              <Typography variant="pi" textColor="neutral600">
                                {key}:
                              </Typography>
                              <Typography variant="pi">
                                {value || 'N/A'}
                              </Typography>
                            </Flex>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Flex>
            ) : (
              <Typography variant="pi" textColor="neutral600">
                No products in this compare list
              </Typography>
            )}

            <Flex marginTop={4} justifyContent="flex-end">
              <Button
                onClick={() => setSelectedCompare(null)}
                variant="tertiary"
              >
                Close
              </Button>
            </Flex>
          </Box>
        )}
      </ContentLayout>
    </Layout>
  );
};

export default CompareContent;