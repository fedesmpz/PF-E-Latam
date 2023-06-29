const { Router } = require('express');
const router = Router();

const { getCartByIdHandler } = require("../Handlers/get/getCartById")
const { addProductsToCartHandler } = require("../Handlers/post/addProductsToCart")
const { removeProductFromCartHandler } = require("../Handlers/delete/removeProductFromCart")
const { removeAllProdFromCartHandler } = require("../Handlers/delete/removeAllProdFromCart")

router.get("/:cartId", getCartByIdHandler)
router.post("/:cartId/products", addProductsToCartHandler);
router.delete("/:cartId/products", removeAllProdFromCartHandler);
router.delete("/:cartId/products/:productId", removeProductFromCartHandler);

module.exports = router;