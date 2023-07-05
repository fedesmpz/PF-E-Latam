const {User} = require("../../db.js");
const {Cart} = require("../../db.js");
const { conn } = require("../../db.js");
const { getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    GoogleAuthProvider } = require ("firebase/auth");
const { auth } = require('../../Utilities/firebase.js')
const provider = new GoogleAuthProvider()

const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")

const registerUser= async(name, surname, email, password, country, city, address)=>{
    const transaction = await conn.transaction();
    
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        sendEmailVerification(userCredentials.user)
        const userRegistered = await User.findOne({
            where:{ email:email}
        });
        if (userRegistered) {
            throw new Error('Ya existe un usuario registrado con ese email');
        }
        const newUser = await User.create({
            name, 
            surname, 
            email, 
            country, 
            city, 
            address,
            firebaseId: userCredentials.user.uid,
            profile_picture: userCredentials.user.photoURL
            },
            { transaction }
        )
        const currency_id = currencyIdValidator(country)
        const newCart = await Cart.create(
            {
                currency_id: currency_id,
                userId: newUser.id,
            },
            { transaction }
        );
        await transaction.commit();
        return {message: `Usuario de ${name} ${surname} creado de manera exitosa y asociado a carrito con ID ${newCart.id}.`}
    } catch (error) {

        return {message: error.message};
    }
}

module.exports={
    registerUser
}
