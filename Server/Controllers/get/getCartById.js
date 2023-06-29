const { Cart, Product } = require("../../db");

const getCartById = async(id) => {
    try {
        const cart = await Cart.findByPk(id, {
            include: [
                {
                  model: Product,
                  attributes: ["id", "title", "original_price", "sale_price", "price"],
                  through: {
                    attributes: ["quantity"],
                  },
                },
              ],
        })
        return cart
    } catch(error) {
        throw error
    }
}

module.exports = {
    getCartById
}