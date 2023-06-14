const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')
const { getByCountryHandler } = require("../Handlers/getByCountry")
const {getUserByIdHandler} = require("../Handlers/getUserById")

router.get('/products', getApiInfoHandler);
router.get("/products/:id", getByCountryHandler)
router.get("/users/:id", getUserByIdHandler)

module.exports = router;