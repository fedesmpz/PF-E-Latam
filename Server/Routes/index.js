const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler)

module.exports = router;