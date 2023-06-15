const {Product}= require("../../db")
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;

const searchProduct = async(title,country)=>{
try {
    const productFound = await Product.findAll({
        where: Sequelize.literal(`LOWER(title) LIKE LOWER('%${title}%') AND country = '${country}'`)
           
})

    return productFound

} catch (error) {
    return ({error:"No se puedo encontrar por ese dato"})
}
}

module.exports={
    searchProduct
}