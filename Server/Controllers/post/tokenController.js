require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const getTokenController= async(user)=>{

    try {
        const emailCredential = user.email
        const adminCredential = user.admin
        const superAdminCredential = user.superAdmin

        const token = jwt.sign({ emailCredential, adminCredential, superAdminCredential }, SECRET_KEY, { expiresIn: '100h' });
        return token
    } catch (error) {
        return error.message;
    }
}


const validateTokenController= async(token, user)=>{
    if (!token) {
        return ({ message: 'No se proporcionó un token de autenticación' });
      }
    
      try {
          const tokenDecode = jwt.verify(token, SECRET_KEY);
          console.log(tokenDecode);
          if (tokenDecode.emailCredential != user.email) return { validate: false }
          if (tokenDecode.adminCredential != user.isAdmin) return { validate: false }
          if (tokenDecode.superAdminCredential != user.isSuperAdmin) return { validate: false }
          return { validate: true };
        } catch (error) {
          return { validate: false };
        }
}

module.exports={
    getTokenController,
    validateTokenController
}