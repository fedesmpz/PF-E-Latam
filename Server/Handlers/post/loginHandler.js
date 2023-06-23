const { loginController } = require("../../Controllers/post/loginController")

const loginHandler= async(req,res)=>{
    const{ email, password }= req.body
    try {
        const register = await loginController( email, password )
        res.status(200).json(register)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    loginHandler
}