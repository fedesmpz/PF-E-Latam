const { addProductToCart } = require("../../Controllers/post/addProductToCart")

const addProductsToCartHandler = async(req, res) => {
    try {
        const { cartId } = req.params;
        let {products, total_price} = req.body;
        const cart = await addProductToCart(cartId, products, total_price);
        res.status(200).json(cart)
    } catch(error) {

        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    addProductsToCartHandler
}

// const { addProductToCart } = require("../../Controllers/post/addProductToCart")

// const addProductsToCartHandler = async(req, res) => {
//     try {
//         const { cartId } = req.params;
//         let products = req.body;
//         let cart;
//         for (const product of products) {
//             const { id, quantity } = product;
//             cart = await addProductToCart(cartId, id, quantity);
//         }
//         res.status(200).json(cart)
//     } catch(error) {
//         console.log(error);
//         res.status(400).json({ error: error.message })
//     }
// }

// module.exports = {
//     addProductsToCartHandler
// }


