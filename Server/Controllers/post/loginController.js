const { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, } = require ("firebase/auth");
const { auth } = require('../../Utilities/firebase')
const provider = new GoogleAuthProvider()
const {User} = require("../../db.js");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const loginController= async( email, password )=>{
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        if (userCredentials.user.accessToken){
            const existingUser = await User.findOne({ where: { email: email } }); 
            const emailCredential = userCredentials.user.email
            const adminCredential = existingUser.admin
            const superAdminCredential = existingUser.superAdmin
            const token = jwt.sign({ emailCredential, adminCredential, superAdminCredential }, SECRET_KEY, { expiresIn: '100h' });
            return {
                name: userCredentials.user.displayName,
                email: emailCredential,
                access: true,
                token: token,
                verified: userCredentials.user.emailVerified,
                isAdmin: adminCredential, 
                isSuperAdmin: superAdminCredential
            };
        }
        
    } catch (error) {
        return error.message;
    }
}


module.exports={
    loginController
}
