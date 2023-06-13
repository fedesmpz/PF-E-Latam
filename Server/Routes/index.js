const { Router } = require('express');
const router = Router();
const { getApiInfoHandler } = require('../Handlers/index')

router.get('/products', getApiInfoHandler)

module.exports = router;