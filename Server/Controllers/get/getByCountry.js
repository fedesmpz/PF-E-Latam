const { Product } = require("../../db");

const getByCountry = async (countryId) => {
    try {
        if(countryId === "ARG") {
            const products = await Product.findAll({ where: { country: "Argentina" } })
            return products
        }
        if(countryId === "COL") {
            const products = await Product.findAll({ where: { country: "Colombia" } })
            return products
        }
        if(countryId === "MEX") {
            const products = await Product.findAll({ where: { country: "Mexico" } })
            return products
        }
    } catch(error) {
        throw error
    }
}

module.exports = getByCountry