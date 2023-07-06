const { Router } = require('express');
const router = Router();


const { salesHandler, getAllSalesHandler } = require("../Handlers/get/salesHandler")
const { searchSaleHandler} = require("../Handlers/get/searchSaleHandler")

router.get("/",salesHandler)
router.get("/search", searchSaleHandler)
router.get("/allSales", getAllSalesHandler)

module.exports=router
