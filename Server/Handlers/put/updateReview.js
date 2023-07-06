const { updateReview } = require("../../Controllers/put/updateReview");

const putReviewHandler = async (req, res) => {
  try {
    const {reviewID} = req.params
    const {rating,review_description} = req.body; 
 

    const result = await updateReview(reviewID,rating,review_description);
   
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  putReviewHandler,
};
