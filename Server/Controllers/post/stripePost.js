const { Sale } = require("../../db.js")

const stripePost = async (amount,products_id,receipt_email) => {
        const newSale = await Sale.create({
            total_price:amount,
            products_id:products_id,
            user_id: receipt_email,
        })
    }

module.exports = {stripePost}
