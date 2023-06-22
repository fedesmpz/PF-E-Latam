const {ReviewRating}= require("../../db")

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
    getReviewById
  }