const { Product } = require("../../db");

const getByCountry = async (countryId) => {
    try {
        if(countryId === "ARS") {
            const products = await Product.findAll({ where: { country: "Argentina" } })
            return products
        }
        if(countryId === "COP") {
            const products = await Product.findAll({ where: { country: "Colombia" } })
            return products
        }
        if(countryId === "MXN") {
            const products = await Product.findAll({ where: { country: "Mexico" } })
            return products
        }
    } catch(error) {
        throw error
    }
}

module.exports = getByCountry