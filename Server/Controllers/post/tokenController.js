require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const getTokenController= async(user)=>{


    try {

        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '100h' })
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
          if (tokenDecode.email != user.email) return { validate: false }
          if (tokenDecode.isAdmin != user.isAdmin) return { validate: false }
          if (tokenDecode.isSuperAdmin != user.isSuperAdmin) return { validate: false }
          return { validate: true };
        } catch (error) {
          return { validate: false };
        }
}

module.exports={
    getTokenController,
    validateTokenController
}
