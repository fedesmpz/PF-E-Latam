const { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, } = require ("firebase/auth");
const { auth } = require('../../Utilities/firebase')
const provider = new GoogleAuthProvider()
const {User} = require("../../db.js");


const loginController= async( email, password )=>{
    
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        if (userCredentials.user.accessToken){
            const existingUser = await User.findOne({ where: { email: email } });  
            return {
                name: userCredentials.user.displayName,
                email: userCredentials.user.email,
                access: true,
                token: userCredentials.user.accessToken,
                isAdmin: existingUser.admin, 
                isSuperAdmin: existingUser.superAdmin
            };
        }
        
    } catch (error) {
        return error.message;
    }
}


module.exports={
    loginController
}
