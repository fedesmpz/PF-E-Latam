const { getCartById } = require("../../Controllers/get/getCartById")

const getCartByIdHandler = async(req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await getCartById(cartId)
        res.status(200).json(cart)
    } catch(error) {

        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getCartByIdHandler
}