const { removeProductFromCart } = require("../../Controllers/delete/removeProductFromCart")

const removeProductFromCartHandler = async(req, res) => {
    try {
        const { cartId, productId } = req.params;
        const removedProduct = await removeProductFromCart(cartId, productId)
        res.status(200).json(removedProduct)
    } catch(error) {

        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    removeProductFromCartHandler
}