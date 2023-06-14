const {User}=require("../../db")

const updateUser = async(id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin)=>{

try {
    const user = await User.findByPk(id)
    if(!user){
        throw new Error("No se encontro usuario con ese ID para su update")
    }
    const updateUser = await User.update({
            name,surname,email,birth_date,profile_picture,country,city,adress,postal_code,admin,superAdmin
        },{
            where:{id:id}
        })
    
} catch (error) {
    throw new Error('Error al actualizar el usuario');
}

}

module.exports={
    updateUser
}