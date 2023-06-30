const { searchSale}= require("../../Controllers/get/searchSale")

const searchSaleHandler= async (req,res)=>{
    const {email}= req.query
      try {
        const result= await searchSale(email)
            if(!result.length){
                throw new Error("No se encontro una venta con ese email")
            }
          return res.status(200).json(result)        
  
      } catch (error) {
    res.status(400).json({error:error.message})        
      }
}

module.exports={
    searchSaleHandler
}