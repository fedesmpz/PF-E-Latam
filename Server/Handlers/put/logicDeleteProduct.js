const { logicDelete } = require("../../Controllers/put/logicDeleteProduct")

const logicDeleteHandler = async(req, res) => {
    try {
        const { id } = req.params
        const hiddenProduct = await logicDelete(id)
        return res.status(200).json(hiddenProduct)
    } catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    logicDeleteHandler
}