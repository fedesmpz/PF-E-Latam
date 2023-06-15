const { Product } = require("../../db");

const getByCategory = async (countryId, category) => {
    try {
        let products;
        
        if (countryId === "ARS") {
            if (category === "Computacion") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Computacion" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Celulares" } });
            } else if (category === "Electronica") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Electronica" } });
            } else if (category === "Videojuegos") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Videojuegos" } });
            }

        } else if (countryId === "COP") {
            if (category === "Computacion") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Computacion" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Celulares" } });
            } else if (category === "Electronica") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Electronica" } });
            } else if (category === "Videojuegos") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Videojuegos" } });
            }

        } else if (countryId === "MXN") {
            if (category === "Computacion") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Computacion" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Celulares" } });
            } else if (category === "Electronica") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Electronica" } });
            } else if (category === "Videojuegos") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Videojuegos" } });
            }
        }
        
        return products;
    } catch (error) {
        throw error;
    }
};

module.exports = getByCategory;
