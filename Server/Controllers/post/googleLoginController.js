const { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, } = require ("firebase/auth");
const { auth } = require('../../Utilities/firebase')
const provider = new GoogleAuthProvider()
const { User } = require("../../db.js");
const { conn } = require("../../db.js");
const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")
const {Cart} = require("../../db.js");

const googleLoginController= async(user)=>{
    const transaction = await conn.transaction();
    try {
        const newUser = await User.create({
          name: user.name,
          surname: user.surname || 'AAAA',
          email: user.email,
          country: user.country,
          city: user.city || 'AAAA',
          address: user.address || 'AAAA',
          birth_date: null,
          postal_code: ''
        },
        { transaction })
        const currency_id = currencyIdValidator(user.country)
        const newCart = await Cart.create(
            {
                currency_id: currency_id,
                userId: newUser.id,
            },
            { transaction }
        );
        await transaction.commit();
        return {
            exist: true,
            access: true, 
            isAdmin: newUser.admin, 
            isSuperAdmin: newUser.superAdmin
            }
    } catch (error) {
        return error.message
    }
}

const googleExistController= async(user)=>{
    
    try {
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (!existingUser) {
            return {exist: false};
        }else{
            return {
                    exist: true, 
                    access: true,
                    isAdmin: existingUser.admin, 
                    isSuperAdmin: existingUser.superAdmin
                    };
        }
    } catch (error) {
        return error.message;
    }
}


module.exports={
    googleLoginController,
    googleExistController
}
