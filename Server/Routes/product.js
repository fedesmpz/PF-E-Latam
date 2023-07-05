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
const {searchProductHandler}= require ("../Handlers/get/searchProduct")
const {updateStockHandler} = require ("../Handlers/put/updateStockHandler")

router.get("/", getApiInfoHandler);
router.get("/search",searchProductHandler)
router.post("/new", postProductHandler)
// router.post("/payment", postProductPayment)
router.get("/:countryId", getByCountryHandler);
router.get("/:countryId/:category", getByCategoryHandler);
router.get("/search/sales/:id",getProductByIdHandler)
router.get("/:countryId/:category/:id", getProductByIdHandler)
router.delete("/delete/:id", deleteProductHandler)
router.put("/hide/:id", logicDeleteHandler)
router.put("/edit/:id", editProductHandler)
router.put("/update", updateStockHandler)
module.exports = router;

