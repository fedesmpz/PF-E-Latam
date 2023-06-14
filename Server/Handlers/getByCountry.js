const getByCountry = require("../Controllers/get/getByCountry")

const getByCountryHandler = async(req, res) => {
    try {
        const { id } = req.params;
        if(id === "ARG" || id === "COL" || id === "MEX") {
            const products = await getByCountry(id)
            return res.status(200).json(products)
        } else {
            return res.status(404).json({ error: "Page not found" })
        }
    } catch(error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getByCountryHandler
}