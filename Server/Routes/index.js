const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")
const getByCategoryHandler = require("../Handlers/getByCategory")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler);
router.get("/products/:countryId/:category", getByCategoryHandler);

module.exports = router;