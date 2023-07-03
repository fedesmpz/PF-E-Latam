const { Review_Rating } = require('../../db');

const getAllReviews = async () => {
  try {
    const reviews = await Review_Rating.findAll();
    return reviews;
  } catch (error) {
    throw new Error('No se pudieron obtener las reseñas');
  }
};


module.exports = {
  getAllReviews
}
