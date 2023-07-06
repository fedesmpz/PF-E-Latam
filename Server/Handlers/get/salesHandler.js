const {allSales}= require("../../Controllers/get/allSales")
const { getSalesByUserId } = require('../../Controllers/get/getAllSalesById')

const salesHandler= async(req, res)=>{
try {
    const sales= await allSales()
    return res.status(200).json(sales)
} catch (error) {
    res.status(400).json({error: error.message})
    
}
}

const getAllSalesHandler= async(req, res)=>{
    const { userId } = req.query

    try {
        const sales= await getSalesByUserId(userId)
        return res.status(200).json(sales)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
    }


module.exports={
    salesHandler,
    getAllSalesHandler

}

