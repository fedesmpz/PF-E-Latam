const { ReviewRating,Product } = require("../../db");

const postReview = async ( rating, review_description, productId) => {
  try {
    const createdReview = await ReviewRating.create({
      rating:rating,
      review_description:review_description,
      productId:productId,
    });

    return createdReview;
  } catch (error) {
    throw new Error('No se pudo crear la reseña');
  }
};

module.exports = { postReview };
