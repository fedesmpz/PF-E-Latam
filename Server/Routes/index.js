const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")
const {registerHandler} = require("../Handlers/register")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler)
router.post("/register", registerHandler)

module.exports = router;