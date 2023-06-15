const {updateUser}= require("../../Controllers/put/updateUser")

const updateUserHandler= async(req,res)=>{
    const {id} = req.params 
    const {name,surname,email,birth_date,profile_picture,country,city,address,postal_code,admin,superAdmin} = req.body
    try {
        const update= await updateUser( id,name,surname,email,birth_date,profile_picture,country,city,address,postal_code,admin,superAdmin)
        return res.status(200).send("Se actualizaron exitosamente los datos")
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

module.exports={
    updateUserHandler
}