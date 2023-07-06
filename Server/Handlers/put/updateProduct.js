const { editProduct } = require("../../Controllers/put/updateProduct");
const { cloudinary } = require("../../cloudinaryConfig");

const editProductHandler = async(req, res) => {
    try {
        let editedProduct;
        const { id } = req.params;
        const {title, uri, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, promotions, categories, country} = req.body;
        if(uri) {
            const uploadResponse = await cloudinary.uploader.upload(uri, {
                upload_preset: "products-thumbnails"
        })
            if(uploadResponse) {
                const thumbnail = uploadResponse.url
                editedProduct = await editProduct(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, promotions, categories, country);
            }
        }
        // editedProduct = await editProduct(id, title, uri, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, promotions, categories, country);
        return res.status(200).json(editedProduct)
    } catch(error) {

        return res.status(400).json({ error: error })
    }
}

module.exports = {
    editProductHandler
}