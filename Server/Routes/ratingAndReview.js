const { Router } = require('express');
const router = Router();

const { getAllReviewsHandler, getReviewHandler } = require('../Handlers/get/getReview'); 
const { postReviewHandler } = require('../Handlers/post/postReview');
const { deleteReviewHandler } = require('../Handlers/delete/deleteReview');
const { putReviewHandler } = require('../Handlers/put/updateReview');

router.get('/', getAllReviewsHandler);
router.get('/:reviewID', getReviewHandler);
router.post('/', postReviewHandler);
router.delete('/delete/:reviewID', deleteReviewHandler);
router.put('/update/:reviewID', putReviewHandler); 


module.exports = router;

