const { Router } = require('express');
const router = Router();

const { getCartByIdHandler } = require("../Handlers/get/getCartByIdHandler") 

router.get("/:id", getCartByIdHandler)
// router.post("/:id", addProductToCartHandler)
// router.put("/:id". removeProductFromCartHandler)

module.exports = router;