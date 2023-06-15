const getByCategory = require('../../Controllers/get/getByCategory');

const getByCategoryHandler = async (req, res, next) => {
    try {
        const { countryId, category } = req.params;
        const products = await getByCategory(countryId, category);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = getByCategoryHandler;
