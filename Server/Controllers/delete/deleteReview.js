const { Review_Rating } = require("../../db");

const deleteReview = async (reviewID) => {
  try {
    const review = await Review_Rating.findByPk(reviewID);

    if (!review) {
      throw new Error("No se encontró la reseña por ID");
    }

    await review.destroy();
    return "Reseña eliminada exitosamente" ;
  } catch (error) {
    throw new Error("No se pudo eliminar la reseña");
  }
};

module.exports = { deleteReview };
