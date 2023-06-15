const getProducts = require("../../Controllers/get/getApiInfo")

const getApiInfoHandler = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getApiInfoHandler
}