const {registerUser} = require("../../Controllers/post/registerUser")

const registerHandler= async(req,res)=>{
    const{ name, surname, email, password, country, city, address }= req.body
    try {
        const register= await registerUser(name, surname, email, password, country, city, address)
        res.status(200).json(register)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

module.exports={
    registerHandler
}