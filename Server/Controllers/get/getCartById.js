const { Cart, Product } = require("../../db");

const getCartById = async(id) => {
    try {
        const cart = await Cart.findByPk(id, {
            include: Product
        })
        return cart
    } catch(error) {
        throw error
    }
}

module.exports = {
    getCartById
}