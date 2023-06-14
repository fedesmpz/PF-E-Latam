const {registerUser} = require("../../Controllers/post/registerUser")


const registerHandler= async(req,res)=>{
    const{id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin}= req.body
    try {
        const register= await registerUser(id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin)
        res.status(200).json(register)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

module.exports={
    registerHandler
}