const { Product } = require("../../db");

const getByCategory = async (countryId, category) => {
    try {
        let products;
        
        if (countryId === "ARG") {
            if (category === "Computación") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Computación" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Celulares" } });
            } else if (category === "Electrónica") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Electrónica" } });
            } else if (category === "Videojuegos") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "Videojuegos" } });
            }

        } else if (countryId === "COL") {
            if (category === "Computación") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Computación" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Celulares" } });
            } else if (category === "Electrónica") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Electrónica" } });
            } else if (category === "Videojuegos") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "Videojuegos" } });
            }

        } else if (countryId === "MEX") {
            if (category === "Computación") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Computación" } });
            } else if (category === "Celulares") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Celulares" } });
            } else if (category === "Electrónica") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "Electrónica" } });
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
