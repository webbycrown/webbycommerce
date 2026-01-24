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
import { useIntl } from 'react-intl';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import { useNotification } from '@strapi/admin/strapi-admin';

const WishlistContent = () => {
  const { formatMessage } = useIntl();
  const { get, del } = useFetchClient();
  const { toggleNotification } = useNotification();

  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWishlist, setSelectedWishlist] = useState(null);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      const response = await get('/webbycommerce/wishlists');
      setWishlists(response.data.data || []);
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to fetch wishlists',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWishlist = async (wishlistId) => {
    if (!confirm('Are you sure you want to delete this wishlist?')) {
      return;
    }

    try {
      await del(`/webbycommerce/wishlists/${wishlistId}`);
      setWishlists(wishlists.filter(w => w.id !== wishlistId));
      toggleNotification({
        type: 'success',
        message: 'Wishlist deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to delete wishlist',
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Layout>
      <HeaderLayout
        title="Wishlist Management"
        subtitle="Manage user wishlists and favorite products"
        as="h2"
      />
      <ActionLayout
        startActions={
          <Button
            onClick={fetchWishlists}
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
              <Typography>Loading wishlists...</Typography>
            </Box>
          ) : wishlists.length === 0 ? (
            <Box padding={4}>
              <Typography>No wishlists found.</Typography>
            </Box>
          ) : (
            <Table colCount={5} rowCount={wishlists.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">User</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Products</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Public</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Created</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Actions</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {wishlists.map((wishlist) => (
                  <Tr key={wishlist.id}>
                    <Td>
                      <Flex>
                        <Avatar
                          src={null}
                          alt={wishlist.userEmail}
                          initials={wishlist.userEmail?.charAt(0).toUpperCase()}
                        />
                        <Box marginLeft={2}>
                          <Typography>{wishlist.userEmail}</Typography>
                          <Typography variant="pi" textColor="neutral600">
                            ID: {wishlist.userId}
                          </Typography>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge>{wishlist.products?.length || 0} products</Badge>
                    </Td>
                    <Td>
                      <Badge color={wishlist.isPublic ? 'success' : 'neutral'}>
                        {wishlist.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </Td>
                    <Td>
                      <Typography>{formatDate(wishlist.createdAt)}</Typography>
                    </Td>
                    <Td>
                      <Flex gap={1}>
                        <IconButton
                          onClick={() => setSelectedWishlist(wishlist)}
                          label="View wishlist"
                          icon={<Eye />}
                        />
                        <IconButton
                          onClick={() => handleDeleteWishlist(wishlist.id)}
                          label="Delete wishlist"
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

        {/* Wishlist Detail Modal/View */}
        {selectedWishlist && (
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            padding={6}
            marginTop={4}
          >
            <Typography variant="beta" marginBottom={4}>
              Wishlist Details - {selectedWishlist.userEmail}
            </Typography>

            {selectedWishlist.name && (
              <Typography variant="epsilon" marginBottom={2}>
                Name: {selectedWishlist.name}
              </Typography>
            )}

            {selectedWishlist.description && (
              <Typography variant="pi" marginBottom={4}>
                Description: {selectedWishlist.description}
              </Typography>
            )}

            <Typography variant="delta" marginBottom={3}>
              Products ({selectedWishlist.products?.length || 0}):
            </Typography>

            {selectedWishlist.products?.length > 0 ? (
              <Box>
                {selectedWishlist.products.map((product) => (
                  <Flex
                    key={product.id}
                    alignItems="center"
                    padding={3}
                    background="neutral100"
                    hasRadius
                    marginBottom={2}
                  >
                    {product.images?.[0] && (
                      <Box marginRight={3}>
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        />
                      </Box>
                    )}
                    <Box flex={1}>
                      <Typography variant="omega">{product.name}</Typography>
                      <Typography variant="pi" textColor="neutral600">
                        ${product.price || 'N/A'}
                      </Typography>
                    </Box>
                    <Badge color={product.stockQuantity > 0 ? 'success' : 'danger'}>
                      {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Typography variant="pi" textColor="neutral600">
                No products in this wishlist
              </Typography>
            )}

            <Flex marginTop={4} justifyContent="flex-end">
              <Button
                onClick={() => setSelectedWishlist(null)}
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

export default WishlistContent;