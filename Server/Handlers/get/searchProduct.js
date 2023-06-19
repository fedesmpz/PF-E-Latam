const { searchProduct } = require("../../Controllers/get/searchProduct")

const searchProductHandler = async (req, res) => {
    let { title, country } = req.query;
    try {
        const result = await searchProduct(title, country)
        if (!result.length){
            throw new Error("No se encontro producto con ese dato")
        }
        return res.status(200).json(result)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    searchProductHandler
}