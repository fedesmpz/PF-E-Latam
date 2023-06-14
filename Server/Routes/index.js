const { Router } = require('express');
const router = Router();

const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")
const { getProductByIdHandler } = require ("../Handlers/getProductById")
const { registerHandler } = require("../Handlers/register")
const { getUserByIdHandler } = require("../Handlers/getUserById")
const getByCategoryHandler = require("../Handlers/getByCategory")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler);
router.get("/users/:id", getUserByIdHandler)
router.get("/products/:countryId/:category", getByCategoryHandler);















module.exports = router;


