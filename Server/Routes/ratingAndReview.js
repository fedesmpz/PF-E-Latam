const { Router } = require('express');
const router = Router();

const { getReviewHandler } = require('../Handlers/get/getReview'); 

router.get('/:reviewID', getReviewHandler);


module.exports = router;

