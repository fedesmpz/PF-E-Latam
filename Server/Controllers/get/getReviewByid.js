const {Review_Rating}= require("../../db")

const getReviewById = async (id) => {


    try {
      const review = await Review_Rating.findAll({
        where:{userId:id}
      });

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
