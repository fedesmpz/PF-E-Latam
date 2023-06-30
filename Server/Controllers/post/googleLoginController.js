// const { getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     GoogleAuthProvider,
//     signInWithPopup, } = require ("firebase/auth");
// const { auth } = require('../../Utilities/firebase')
// const provider = new GoogleAuthProvider()
const { User } = require("../../db.js");
const { conn } = require("../../db.js");
const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")
const {Cart} = require("../../db.js");

const googleLoginController= async(user)=>{
    const transaction = await conn.transaction();
    try {

        const newUser = await User.create(
          {
            name: user.name,
            surname: user.surname || 'AAAA',
            email: user.email,
            country: user.country,
            city: user.city || 'AAAA',
            address: user.address || 'AAAA',
            birth_date: null,
            postal_code: '',
            admin: false,
            superAdmin: false
          },
          { transaction }
          );

        const currency_id = currencyIdValidator(newUser.dataValues.country);
        const newCart = await Cart.create(
          {
            currency_id: currency_id,
            userId: newUser.id
          },
          { transaction }
        );
        await transaction.commit();

        return {
          exist: true,
          access: true,
          isAdmin: newUser.dataValues.admin,
          isSuperAdmin: newUser.dataValues.superAdmin,
          cartId: newCart.dataValues.id,
          address: newUser.dataValues.address,
          city: newUser.dataValues.city,
          country: newUser.dataValues.country
        };
      //}
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
        return error.message;
    }

}

const googleExistController= async(user)=>{
    
    try {
        const existingUser = await User.findOne({ where: { email: user.email } });

        if (!existingUser) {
          const newUser = await User.create(
            {
              name: user.name,
              surname: user.surname || 'AAAA',
              email: user.email,
              country: user.country,
              city: user.city || 'AAAA',
              address: user.address || 'AAAA',
              birth_date: null,
              postal_code: '',
              admin: false,
              superAdmin: false
            },)
            const currency_id = currencyIdValidator(user.country);
            const newCart = await Cart.create(
            {
              currency_id: currency_id,
              userId: newUser.id
            },)
            //const cart = await Cart.findOne({ where: { userId: existingUser.id } });
            return {
              exist: true, 
              access: true,
              isAdmin: newUser.admin, 
              isSuperAdmin: newUser.superAdmin,
              cartId: newCart.id,
              address: newUser.address,
              city: newUser.city,
              country: newUser.country
              };

          //return {exist: false};
        }else{
          const cart = await Cart.findOne({ where: { userId: existingUser.id } });
            return {
                    exist: true, 
                    access: true,
                    isAdmin: existingUser.admin, 
                    isSuperAdmin: existingUser.superAdmin,
                    cartId: cart.id,
                    address: existingUser.address,
                    city: existingUser.city,
                    country: existingUser.country
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
