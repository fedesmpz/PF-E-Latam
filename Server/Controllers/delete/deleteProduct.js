const { Product }= require("../../db.js")

const deleteProduct = async(id) => {
    try {
        const product = await Product.findByPk(id)
        const deletedProduct = await Product.destroy(
            {where: {id:id} }
        )
        if(deletedProduct) {
            return product
        }
    } catch(error) {
        throw error
    }
}

module.exports = {
    deleteProduct
}