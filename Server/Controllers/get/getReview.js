const { ReviewRating } = require('../../db');

const getAllReviews = async (productId) => {
  try {
    const reviews = await ReviewRating.findAll({ where: { productId } });
    return reviews;
  } catch (error) {
    throw new Error('No se pudieron obtener las reseñas');
  }
};

const getReviewById = async (reviewID) => {
  try {
    const review = await ReviewRating.findByPk(reviewID);
    if (!review) {
      throw new Error('No se pudo encontrar la reseña por ID');
    }

    return review;
  } catch (error) {

    throw new Error(error.message);
  }
};

module.exports = {
  getAllReviews,
  getReviewById
}