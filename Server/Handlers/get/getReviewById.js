
const {getReviewById} = require("../../Controllers/get/getReviewByid");

const getReviewByIdHandler = async (req, res) => {
  const { id } = req.query;


  try {
    const review = await getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getReviewByIdHandler };
