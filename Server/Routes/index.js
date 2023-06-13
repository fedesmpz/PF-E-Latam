const { Router } = require('express');
const router = Router();

const getApiInfo = require('./get/getApiInfo')

router.use('/', getApiInfo)

module.exports = router;