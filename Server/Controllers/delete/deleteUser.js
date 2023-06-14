const {User}= require("../../db.js")

const deleteUser = async (id)=>{
 try {
    const users= await User.destroy(
      {where:{id:id} }
    )
    if(users ===1){
      return id
    }
    else{
      return "No se encontro el id para eliminar"
    }
 } catch (error) {
    throw new Error('Error al eliminar el usuario');
 }
    
   
  }

  module.exports={
    deleteUser
  }