const {Sales } = require ("../../db")
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;
const searchSale= async(email)=>{
 
try {
     const search= await Sales.findAll({
    where:Sequelize.literal(`LOWER(email) LIKE LOWER('%${email}`)
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