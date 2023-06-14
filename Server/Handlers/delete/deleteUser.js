const {deleteUser}= require("../../Controllers/delete/deleteUser")

const deleteUserHandler = async(req,res)=>{
    try {
      const {id}= req.params
    const deleted = await deleteUser(id)
    return res.status(200).json(deleted)
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  }
  
  module.exports={
    deleteUserHandler
  }