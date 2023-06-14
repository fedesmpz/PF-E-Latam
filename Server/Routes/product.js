const { Router } = require('express');
const router = Router();

const { getApiInfoHandler } = require('../Handlers/get/index')
const { getByCountryHandler } = require("../Handlers/get/getByCountry")
const { getProductByIdHandler } = require("../Handlers/get/getProductById")
const getByCategoryHandler = require("../Handlers/get/getByCategory")
const { postProductHandler } = require("../Handlers/post/postProduct")
const { deleteProductHandler } = require("../Handlers/delete/deleteProduct")
const { logicDeleteHandler } = require("../Handlers/put/logicDeleteProduct")
const { editProductHandler } = require("../Handlers/put/updateProduct")

router.get("/", getApiInfoHandler);
router.get("/:countryId", getByCountryHandler);
router.get("/:countryId/:category", getByCategoryHandler);
router.get("/:countryId/:category/:id", getProductByIdHandler)
router.post("/new", postProductHandler)
router.delete("/delete/:id", deleteProductHandler)
router.put("/hide/:id", logicDeleteHandler)
router.put("/edit/:id", editProductHandler)

module.exports = router;

