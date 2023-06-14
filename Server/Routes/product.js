const { Router } = require('express');
const router = Router();

const { getApiInfoHandler } = require('../Handlers/get/index')
const { getByCountryHandler } = require("../Handlers/get/getByCountry")
const { getProductByIdHandler } = require("../Handlers/get/getProductById")
const getByCategoryHandler = require("../Handlers/get/getByCategory")

router.get("/", getApiInfoHandler);
router.get("/:countryId", getByCountryHandler);
router.get("/:countryId/:category", getByCategoryHandler);
router.get("/:countryId/:category/:id", getProductByIdHandler)



module.exports = router;

