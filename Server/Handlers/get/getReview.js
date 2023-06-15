const { getReviewById } = require("../../Controllers/get/getReview");

const getReviewHandler = async (req, res) => {
  const { reviewID } = req.params;
  try {
    const review = await getReviewById(reviewID);
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getReviewHandler };
