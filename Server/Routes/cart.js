const { Router } = require('express');
const router = Router();

const { getCartByIdHandler } = require("../Handlers/get/getCartById")
const { addProductToCartHandler } = require("../Handlers/post/addProductToCart")

router.get("/:id", getCartByIdHandler)
router.post("/:id/products", addProductToCartHandler);
// router.delete("/:cartId/products/:productId", removeProductFromCartHandler);


module.exports = router;