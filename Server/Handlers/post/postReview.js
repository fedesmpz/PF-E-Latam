const { postReview } = require('../../Controllers/post/postReview');

const postReviewHandler = async (req, res) => {
  const { rating, review_description, productId } = req.body;
  try {
    const createdReview = await postReview( rating, review_description, productId );
   console.log(createdReview)
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postReviewHandler };
