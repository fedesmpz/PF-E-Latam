const { Sale } = require("../../db.js")

const stripePost = async (amount,products_id,email) => {
        const newSale = await Sale.create({
            total_price:amount,
            products_id:products_id,
            user_id: email,
        })
    }

module.exports = {stripePost}
