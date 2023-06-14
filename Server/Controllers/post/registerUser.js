const {User} = require("../../db.js")

const registerUser= async(id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin)=>{
    try {
        const userRegistered = await User.findOne({
            where:{ email:email}
        });
        if (userRegistered) {
            throw new Error('Ya existe un usuario registrado con ese email');
        }
        const newUser = await User.create({
            id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin
        })
        if(newUser){
            console.log("guardado exitoxamente en la BDD") 
        }
       
    } catch (error) {
        throw new Error('Error al registrar al usuario');
    }
}

module.exports={
    registerUser
}