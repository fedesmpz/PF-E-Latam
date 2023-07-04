const { Review_Rating, Product, User } = require("../../db");

const postReview = async (rating, review_description, productId, userId, username) => {
  try {
    const createdReview = await Review_Rating.create({
      rating: rating,
      review_description: review_description,
      productId: productId,
      userId: userId,
      username: username
    });

    const product = await Product.findByPk(productId);
    const user = await User.findByPk(userId);

    await product.addReview_Rating(createdReview);
    await user.addReview_Rating(createdReview);

    return createdReview;
  } catch (error) {
    throw error;
  }
};

module.exports = { postReview };
