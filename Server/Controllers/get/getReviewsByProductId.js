const { Review_Rating } = require("../../db")

const reviewsByProductId= async(productId)=>{
try {
    const reviews = await Review_Rating.findAll({
        where:{
            productId:productId
        }
    })
    if(reviews.length === 0){
        throw error
    }
    return reviews
} catch (error) {
throw new Error(`No se pudieron encontrar reviews del producto con id ${productId}`)    
}
}

module.exports={
    reviewsByProductId
}
