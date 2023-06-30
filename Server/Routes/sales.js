const { Router } = require('express');
const router = Router();


const { salesHandler} = require("../Handlers/get/salesHandler")
const { searchSaleHandler} = require("../Handlers/get/searchSaleHandler")

router.get("/",salesHandler)
router.get("/search", searchSaleHandler)

module.exports=router