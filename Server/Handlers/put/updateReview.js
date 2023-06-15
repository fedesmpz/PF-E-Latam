const { updateReview } = require("../../Controllers/put/updateReview");

const putReviewHandler = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    const updatedReview = req.body; // Suponiendo que los nuevos datos de la reseña se envían en el cuerpo de la solicitud
    const result = await updateReview(reviewID, updatedReview);
    res.status(200).json(result);
  } catch (error) {
    console.error("No sé qué pasa", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  putReviewHandler,
};
