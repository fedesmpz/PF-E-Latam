const {
  getAllReviews,
  getReviewById,
} = require("../../Controllers/get/getReview");

const getAllReviewsHandler = async (req, res) => {
  const { productId } = req.query;
  try {
    const reviews = await getAllReviews(productId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewHandler = async (req, res) => {
  const { reviewID } = req.params;
  try {
    const review = await getReviewById(reviewID);
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllReviewsHandler, getReviewHandler };
