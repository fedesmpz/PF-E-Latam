const {Review_Rating}= require("../../db")

const getReviewById = async (id) => {
  console.log(id)
    try {
      const review = await Review_Rating.findAll({
        where:{userId:id}
      });
      console.log("esta es la review:",review)
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