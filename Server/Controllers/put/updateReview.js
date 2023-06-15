const { ReviewRating } = require("../../db");

const updateReview = async (reviewID, updatedReview) => {
  try {
    const review = await ReviewRating.findByPk(reviewID);

    if (!review) {
      throw new Error("No se encontró la reseña por ID");
    }

    // Actualizar los datos de la reseña
    review.property1 = updatedReview.property1;
    review.property2 = updatedReview.property2;
    // ...

    await review.save();
    return { message: "Reseña actualizada exitosamente" };
  } catch (error) {
    throw new Error("No se pudo actualizar la reseña");
  }
};

module.exports = { updateReview };
