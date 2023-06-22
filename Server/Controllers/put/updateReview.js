const { ReviewRating } = require("../../db");

const updateReview = async (reviewID, rating,review_description) => {
  try {
    console.log("esta es la  "+reviewID)
    const review = await ReviewRating.findByPk(reviewID);

    if (!review) {
      throw new Error("No se encontró la reseña por ID");
    }

    const updatedReview =await ReviewRating.update({rating,review_description},
      {where:{id: reviewID}})
    return { message: "Reseña actualizada exitosamente" };
  } catch (error) {
    throw new Error("No se pudo actualizar la reseña");
  }
};

module.exports = { updateReview };
