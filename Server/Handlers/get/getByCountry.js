const getByCountry = require("../../Controllers/get/getByCountry")

const getByCountryHandler = async(req, res) => {
    try {
        const { countryId } = req.params;
        if(countryId === "ARG" || countryId === "COL" || countryId === "MEX") {
            const products = await getByCountry(countryId)
            return res.status(200).json(products)
        } else {
            return res.status(404).json({ error: "Page not found" })
        }
    } catch(error) {

        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getByCountryHandler
}