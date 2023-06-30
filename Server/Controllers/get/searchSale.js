const {Sale } = require ("../../db")
const { Sequelize } = require('sequelize');

const searchSale= async(email)=>{
 
try {
     const search= await Sale.findAll({
      where: Sequelize.literal(`LOWER(user_id) = LOWER('${email}')`)
  })
  if(!search.length){
    throw new Error ("No se pudo encontrar esa venta con ese email")
  }
  return search
} catch (error) {
    return ({error:"No se pudo encontrar esa venta con ese email"})
}}

module.exports={
    searchSale
}