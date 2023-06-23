const { googleLoginController, googleExistController } = require("../../Controllers/post/googleLoginController")

const googleLoginHandler= async(req,res)=>{
    const user = req.body
    try {
        const register= await googleLoginController(user)
        res.status(200).json(register)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const googleExist= async(req,res)=>{
    const user = req.body
    try {
        const data = await googleExistController(user)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    googleLoginHandler,
    googleExist
}


