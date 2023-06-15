const {Product}= require("../../db")
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;

const searchProduct = async(title,country)=>{
try {
    const productFound = await Product.findAll({
        where:{
            country:country,
             title:{
                [Op.like]: `%${title}%`}
             }})

    return productFound

} catch (error) {
    return ({error:"No se puedo encontrar por ese dato"})
}
}

module.exports={
    searchProduct
}