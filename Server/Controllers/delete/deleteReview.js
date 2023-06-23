const { ReviewRating } = require("../../db");

const deleteReview = async (reviewID) => {
  try {
    const review = await ReviewRating.findByPk(reviewID);

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
