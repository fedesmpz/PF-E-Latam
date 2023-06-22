const { deleteReview } = require("../../Controllers/delete/deleteReview");

const deleteReviewHandler = async (req, res) => {
  try {
    const {reviewID} = req.params
    const deletedReview = await deleteReview(reviewID);
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteReviewHandler,
};
