const { Product } = require("../../db");

const getByCategory = async (countryId, category) => {
    try {
        let products;
        
        if (countryId === "ARG") {
            if (category === "computacion") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "computacion" } });
            } else if (category === "celulares") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "celulares" } });
            } else if (category === "electronica") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "electronica" } });
            } else if (category === "videojuegos") {
                products = await Product.findAll({ where: { country: "Argentina", categories: "videojuegos" } });
            } else {
                products = await Product.findAll({ where: {country: "Argentina"}});
            }

        } else if (countryId === "COL") {
            if (category === "computacion") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "computacion" } });
            } else if (category === "celulares") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "celulares" } });
            } else if (category === "electronica") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "electronica" } });
            } else if (category === "videojuegos") {
                products = await Product.findAll({ where: { country: "Colombia", categories: "videojuegos" } });
            } else {
                products = await Product.findAll({ where: {country: "Colombia"}});
            }

        } else if (countryId === "MEX") {
            if (category === "computacion") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "computacion" } });
            } else if (category === "celulares") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "celulares" } });
            } else if (category === "electronica") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "electronica" } });
            } else if (category === "videojuegos") {
                products = await Product.findAll({ where: { country: "Mexico", categories: "videojuegos" } });
            } else {
                products = await Product.findAll({ where: {country: "Mexico"}});
            }
        }    
        return products;
    } catch (error) {
        throw error;
    }
};

module.exports = getByCategory;
