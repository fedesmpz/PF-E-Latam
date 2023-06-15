const { Router } = require('express');
const router = Router();

const { getReviewHandler } = require('../Handlers/get/getReview'); 
const { postReviewHandler } = require('../Handlers/post/postReview');

router.get('/:reviewID', getReviewHandler);
router.post('/:reviewID', postReviewHandler);


module.exports = router;

