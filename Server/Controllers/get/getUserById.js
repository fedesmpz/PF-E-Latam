const { User } = require("../../db");

const getUserById= async(id)=>{
try {
     const user = await User.findByPk(id)
    return user
} catch (error) {
    return ({error:"No se puedo encontrar por ID"})
}}

module.exports={
    getUserById
}