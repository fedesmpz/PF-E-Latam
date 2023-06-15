const { ReviewRating } = require("../../db");

const postReview = async ({ reviewID, rating, review_description, product}) => {
  try {
    const createdReview = await ReviewRating.create({
      reviewID,
      rating : rating,
      review_description : '',
      product
    });
    return createdReview;
  } catch (error) {
    throw new Error('No se pudo crear la reseña');
  }
};

module.exports = { postReview };
