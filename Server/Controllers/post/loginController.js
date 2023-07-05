const { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, } = require ("firebase/auth");
const { auth } = require('../../Utilities/firebase')
const provider = new GoogleAuthProvider()
const {User, Cart} = require("../../db.js");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const loginController= async( email, password )=>{
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        if (userCredentials.user.accessToken){
            const existingUser = await User.findOne({ where: { email: email }}); 
            if (existingUser){
            }
            const cart = await Cart.findOne({ where: { userId: existingUser.id } });
            const emailFind = userCredentials.user.email
            const adminCredential = existingUser.admin
            const superAdminCredential = existingUser.superAdmin
            const cartFind = cart.id
            
            const user = {
                userId: existingUser.id,
                name: existingUser.name,
                surname: existingUser.surname,
                email: emailFind,
                access: true,
                verified: userCredentials.user.emailVerified,
                isAdmin: adminCredential, 
                isSuperAdmin: superAdminCredential,
                postal_code: existingUser.postal_code,
                address: existingUser.address,
                city: existingUser.city,
                country: existingUser.country,

                profile_picture: existingUser.profile_picture || userCredentials.user.photoURL,
                cartId: cartFind,
                firebaseId: existingUser.firebaseId
            };
            const token = jwt.sign(user, SECRET_KEY, { expiresIn: '100h' })

            const userData = {
                ...user,
                token: token
            }
            
            return userData
        }
        
    } catch (error) {
        return error.message;
    }
}


module.exports={
    loginController
}
