const { addProductToCart } = require("../../Controllers/post/addProductToCart")

const addProductToCartHandler = async(req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;
        console.log( productId, quantity)
        const cart = await addProductToCart(id, productId, quantity)
        res.status(200).json(cart)
    } catch(error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    addProductToCartHandler
}