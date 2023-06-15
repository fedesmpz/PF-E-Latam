const { Router } = require('express');
const router = Router();

const { getCartByIdHandler } = require("../Handlers/get/getCartById")
const { addProductToCartHandler } = require("../Handlers/post/addProductToCart")
const { removeProductFromCartHandler } = require("../Handlers/delete/removeProductFromCart")

router.get("/:id", getCartByIdHandler)
router.post("/:id/products", addProductToCartHandler);
// router.delete("/:cartId/products/", removeAllProductsHandler);
router.delete("/:cartId/products/:productId", removeProductFromCartHandler);

module.exports = router;