const {searchProduct} = require ("../../Controllers/get/searchProduct")


const searchProductHandler = async(req,res)=>{
    let {title,country} = req.query;
   title = title.charAt(0).toUpperCase()+ title.slice(1)
  console.log(title)      
try {
    const result = await searchProduct(title,country)
    console.log(result)

    return res.status(200).json(result)

    
} catch (error) {
    res.status(400).json({error:error.message})
}
}

module.exports={
    searchProductHandler
}