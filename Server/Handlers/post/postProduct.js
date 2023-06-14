const postProduct = require("../../Controllers/post/postProduct");
const { createId } = require("../../Utilities/idCreator")

const postProductHandler = async(req, res) => {
    try {
        const { title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country } = req.body;
        const id = createId(country)
        const postedProduct = await postProduct(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country)
        return res.status(200).json(postedProduct)
    } catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports ={ 
    postProductHandler
}