const { updateUser, updateUserImage }= require("../../Controllers/put/updateUser")

const updateUserHandler= async(req,res)=>{
    const {id} = req.params 
    const userData = req.body
    try {
        const update = await updateUser(id, userData )
        return res.status(200).json(update)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const updateUserImageHandler = async (req, res) =>{
    const {id} = req.params 
    const image = req.body
    try {
        const update = await updateUserImage(id, image )
        return res.status(200).json(update)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }


}

module.exports={
    updateUserHandler,
    updateUserImageHandler
}
