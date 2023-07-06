const postProduct = require("../../Controllers/post/postProduct");
const { createId } = require("../../Utilities/idCreator");
const { cloudinary } = require("../../cloudinaryConfig");

const postProductHandler = async(req, res) => {
    try {
        let postedProduct;
        const { title, uri, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country } = req.body;
        if(uri) {
            const uploadResponse = await cloudinary.uploader.upload(uri, {
                upload_preset: "products-thumbnails"
            })

            if(uploadResponse) {
                const id = createId(country)
                const thumbnail = uploadResponse.url
                postedProduct = await postProduct(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country)
            }
        }
        return res.status(200).json(postedProduct)
    } catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports ={ 
    postProductHandler
}