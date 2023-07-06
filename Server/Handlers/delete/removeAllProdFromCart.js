const { removeAllProdFromCart } = require("../../Controllers/delete/removeAllProdFromCart")

const removeAllProdFromCartHandler = async(req, res) => {
    try {
        const { cartId } = req.params;
        const removedProduct = await removeAllProdFromCart(cartId)
        res.status(200).json(removedProduct)
    } catch(error) {

        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    removeAllProdFromCartHandler
}
