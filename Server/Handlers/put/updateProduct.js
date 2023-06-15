const { editProduct } = require("../../Controllers/put/updateProduct")

const editProductHandler = async(req, res) => {
    try {
        const { id } = req.params
        const {title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country} = req.body
        const editedProduct = await editProduct(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country)
        return res.status(200).json(editedProduct)
    } catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    editProductHandler
}