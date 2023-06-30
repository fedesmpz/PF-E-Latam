const {allSales}= require("../../Controllers/get/allSales")

const salesHandler= async(req, res)=>{
try {
    const sales= await allSales()
    return res.status(200).json(sales)
} catch (error) {
    res.status(400).json({error: error.message})
    
}
}

module.exports={
    salesHandler
}