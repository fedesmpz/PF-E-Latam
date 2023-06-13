const { Router } = require('express');
const router = Router();
const getApiInfo = require('../../Controllers/get/getApiInfo')

router.get('/products', async(req,res)=>{
    const allProducts = await getApiInfo();
    res.status(200).json(allProducts)
})

module.exports = router;