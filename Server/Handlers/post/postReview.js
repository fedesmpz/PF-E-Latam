const { postReview } = require('../../Controllers/post/postReview');

const postReviewHandler = async (req, res) => {
  const { reviewID } = req.params;
  const { reviewData } = req.body;

  try {
    const createdReview = await postReview(reviewID, reviewData);
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postReviewHandler };
