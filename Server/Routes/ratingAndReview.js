const { Router } = require('express');
const router = Router();

const { getReviewHandler } = require('../Handlers/get/getReview'); 
const { postReviewHandler } = require('../Handlers/post/postReview');
const { deleteReviewHandler } = require('../Handlers/delete/deleteReview');

router.get('/:reviewID', getReviewHandler);
router.post('/:reviewID', postReviewHandler);
router.delete('/delete/:reviewID', deleteReviewHandler);


module.exports = router;

