const { updateStock } = require("../../Controllers/put/updateStock");


const updateStockHandler = async(req, res) => {
    try {


      const productUpdated = await updateStock(req.body);
      return res.status(200).json(productUpdated);
    } catch (error) {

      return res.status(400).json({ error: error.message });
    }
  };
  
  

module.exports = {
    updateStockHandler

}

