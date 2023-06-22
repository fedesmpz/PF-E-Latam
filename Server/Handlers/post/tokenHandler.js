const { getTokenController, validateTokenController } = require("../../Controllers/post/tokenController")

const getToken= async(req,res)=>{
    const user = req.body
    try {
        const token = await getTokenController(user)
        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const validateToken= async(req,res)=>{
    const token = req.headers.authorization;
    const user = req.body
    try {
        const data = await validateTokenController(token, user)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    getToken,
    validateToken
}