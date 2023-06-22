const { Product } = require("../../db.js")

const postProduct = async(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes,catalog_listing, discounts, promotions, categories, country) => {
    try {
        const productExists = await Product.findOne({
            where:{ title: title}
        });
        if (productExists) {
            throw new Error(`Ya existe un producto con el titulo ${title}`);
        }
        const newProduct = await Product.create({id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, discounts, promotions, categories, country});
        if(newProduct){
            return `Producto ${title} creado correctamente con ID ${id}` 
        }
    } catch(error) {
        throw error
    }
}

module.exports = postProduct