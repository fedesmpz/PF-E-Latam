const { Sale} = require ('../../db')

const allSales= async ()=>{
    try {
        const sales = await Sale.findAll();
        return sales
    } catch (error) {
    throw new Error ('No se pudieron obtener las ventas')
        
    }
}

module.exports={
    allSales
}