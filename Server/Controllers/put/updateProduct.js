const { Product }= require("../../db.js")

const editProduct = async(id, title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, promotions, categories, country) => {
    try {
        const product = await Product.findByPk(id)
        if (!product) {
            throw new Error('El producto no existe');
        }
        const existingProduct = await Product.findOne({ where: { title } });
        if (existingProduct.id !== product.id) {
            throw new Error('El título del producto ya está en uso');
        }
        if (existingProduct) {
            let updatedProduct = await Product.update({ title, thumbnail, original_price, currency_id, price, sale_price, available_quantity, sold_quantity, official_store_name, shipping, attributes, catalog_listing, promotions, categories, country }, { where: { id: id }});
        }
        return `Producto ${id} actualizado correctamente`
    } catch(error) {
        throw error
    }
}

module.exports = {
    editProduct
}