const { Product } = require("../../db");

const getByCountry = async (id) => {
    try {
        if(id === "ARG") {
            const products = await Product.findAll({ where: { country: "Argentina" } })
            return products
        }
        if(id === "COL") {
            const products = await Product.findAll({ where: { country: "Colombia" } })
            return products
        }
        if(id === "MEX") {
            const products = await Product.findAll({ where: { country: "Mexico" } })
            return products
        }
    } catch(error) {
        throw error
    }
}

module.exports = getByCountry