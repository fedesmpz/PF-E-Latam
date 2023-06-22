const {reviewsByProductId}= require("../../Controllers/get/getReviewsByProductId")

const getReviewsByProductIdHandler= async(req,res)=>{
    try {
        const {productId}= req.params
        const reviews = await reviewsByProductId(productId)
       return res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }

}

module.exports={
    getReviewsByProductIdHandler
}