const { Product }= require("../../db.js")

const logicDelete = async(id) => {
    try {
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe' });
        }
        const hiddenProduct = await Product.update({ catalog_listing: !product.catalog_listing }, { where: { id: id }});
        return "Se actualizó correctamente"
    } catch(error) {
        throw error
    }
}

module.exports = {
    logicDelete
}