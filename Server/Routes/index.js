const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")
const {getProductByIdHandler} = require ("../Handlers/getProductById")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler)
router.get("/products/productId/:id", getProductByIdHandler)
module.exports = router;