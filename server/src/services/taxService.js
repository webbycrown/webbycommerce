// /plugins/your-plugin/server/services/taxService.js

module.exports = {
    async calculateTax({ subtotal, address, shipping = 0 }) {

        const rates = await strapi.db
            .query("plugin::webbycommerce.tax-rate")
            .findMany({
                where: { country: address.country, is_active: true },
                orderBy: { priority: "asc" },
            });

        let totalTax = 0;

        for (const rate of rates) {

            let base = subtotal;

            // include shipping
            if (rate.apply_to_shipping) {
                base += shipping;
            }

            let tax = 0;

            // ✅ normalize type
            const type = (rate.tax_type || "").toLowerCase().trim();

            // ✅ FIXED vs PERCENTAGE
            if (type === "percentage") {
                tax = (base * rate.rate) / 100;
            } else if (type === "fixed") {
                tax = rate.rate; // direct amount
            }

            // ✅ COMPOUND (only for percentage)
            if (rate.compound && type === "percentage") {
                tax = ((base + totalTax) * rate.rate) / 100;
            }

            // ✅ MAX CAP (AFTER calculation)
            if (rate.max_amount && tax > rate.max_amount) {
                tax = rate.max_amount;
            }

            totalTax += tax;
        }

        return totalTax;
    },
};