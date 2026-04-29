
'use strict';

module.exports = {
    // GET /product-reviews — not publicly used, stub for router completeness
    async find(ctx) {
        ctx.status = 405;
        ctx.body = { error: 'Use the Strapi admin panel to view reviews.' };
    },

    // GET /product-reviews/:id
    async findOne(ctx) {
        ctx.status = 405;
        ctx.body = { error: 'Use the Strapi admin panel to view reviews.' };
    },

    // POST /product-reviews
    // async create(ctx) {
    //     console.log("Review API HIT");
    //     try {
    //         const { review, rating, product, user } = ctx.request.body;

    //         // ✅ Validate required fields
    //         if (!review || !rating || !product || !user) {
    //             return ctx.badRequest('Review, rating, product, and user are required');
    //         }

    //         // ✅ Validate product exists
    //         const productExists = await strapi.db
    //             .query('plugin::webbycommerce.product')
    //             .findOne({
    //                 where: { id: product },
    //             });

    //         if (!productExists) {
    //             return ctx.badRequest('Invalid product');
    //         }

    //         // ✅ Validate user exists
    //         const userExists = await strapi.db
    //             .query('plugin::users-permissions.user')
    //             .findOne({
    //                 where: { id: user },
    //             });

    //         if (!userExists) {
    //             return ctx.badRequest('Invalid user');
    //         }

    //         // ✅ Create review
    //         const newReview = await strapi.db
    //             .query('plugin::webbycommerce.product-review')
    //             .create({
    //                 data: {
    //                     review,
    //                     rating,
    //                     product,   // relation
    //                     user,      // relation
    //                     is_visible: false, // moderation
    //                 },
    //             });

    //         ctx.send({
    //             message: 'Review submitted successfully',
    //             data: newReview,
    //         });

    //     } catch (error) {
    //         strapi.log.error('Review create error:', error);
    //         ctx.badRequest('Failed to create review');
    //     }
    // },

    async create(ctx) {
        console.log("Review API HIT");

        try {
            const { review, rating, product, user } = ctx.request.body;

            if (!review || !rating || !product || !user) {
                return ctx.badRequest('Review, rating, product, and user are required');
            }

            // ✅ Get correct published product
            const productData = await strapi.db
                .query('plugin::webbycommerce.product')
                .findMany({
                    where: {
                        documentId: product,
                        publishedAt: { $notNull: true },
                    },
                    orderBy: { publishedAt: 'desc', id: 'desc' },
                    limit: 1,
                });

            const finalProduct = productData?.[0];

            if (!finalProduct) {
                return ctx.badRequest('Invalid product');
            }

            // ✅ Validate user
            const userData = await strapi.db
                .query('plugin::users-permissions.user')
                .findOne({
                    where: { id: user },
                });

            if (!userData) {
                return ctx.badRequest('Invalid user');
            }

            // ✅ Create review
            const newReview = await strapi.db
                .query('plugin::webbycommerce.product-review')
                .create({
                    data: {
                        review,
                        rating,
                        product: finalProduct.id, // ✅ ALWAYS correct ID
                        user: user,
                        is_visible: false,
                    },
                });

            ctx.send({
                message: 'Review submitted successfully',
                data: newReview,
            });

        } catch (error) {
            strapi.log.error('Review create error:', error);
            ctx.badRequest('Failed to create review');
        }
    }
};