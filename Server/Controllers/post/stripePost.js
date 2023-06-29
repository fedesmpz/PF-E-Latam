const { Sale } = require("../../db.js")

const stripePost = async (amount,products_id,email) => {
    try {
        const newSale = await Sale.create({
            total_price:amount,
            products_id,
            user_id: email,
        })

    } catch (error) {
        throw error
    }
}

module.export = {stripePost}