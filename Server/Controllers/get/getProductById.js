const { Product } = require("../../db");

const getProductById=async (id)=>{
try {
    const product = await Product.findByPk(id)
    if(!product){
       throw new Error
    }
    return product
} catch (error) {
    return ({error:"No se pudo encontrar el producto"})
    
}
}

module.exports ={
    getProductById
}