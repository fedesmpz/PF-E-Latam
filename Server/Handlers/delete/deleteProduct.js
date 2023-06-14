const { deleteProduct } = require("../../Controllers/delete/deleteProduct")

const deleteProductHandler = async(req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await deleteProduct(id)
        res.status(200).json(deletedProduct)
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = {
    deleteProductHandler
}