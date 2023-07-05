const { Router } = require('express');
const router = Router();

const { getAllReviewsHandler } = require('../Handlers/get/getAllReview'); 
const { postReviewHandler } = require('../Handlers/post/postReview');
const { deleteReviewHandler } = require('../Handlers/delete/deleteReview');
const { putReviewHandler } = require('../Handlers/put/updateReview');
const { getReviewByIdHandler } = require('../Handlers/get/getReviewById');
const { getReviewsByProductIdHandler }  = require('../Handlers/get/getReviewsByProductId')

router.get('/', getAllReviewsHandler);
router.get('/product/:productId',getReviewsByProductIdHandler)

router.get('/reviewID', getReviewByIdHandler);
router.post('/', postReviewHandler);
router.delete('/delete/:reviewID', deleteReviewHandler);
router.put('/update/:reviewID', putReviewHandler); 


module.exports = router;

