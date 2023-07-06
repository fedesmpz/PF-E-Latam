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
              superAdmin: false,
              firebaseId: user.firebaseId,
              profile_picture: user.profile_picture,
            },)
            const currency_id = currencyIdValidator(user.country);
            const newCart = await Cart.create(
            {
              currency_id: currency_id,
              userId: newUser.id
            },)
            //const cart = await Cart.findOne({ where: { userId: existingUser.id } });
            return {
              userId: newUser.id,
              name: newUser.name,
              surname: newUser.surname,
              exist: true, 
              access: true,
              isAdmin: newUser.admin, 
              isSuperAdmin: newUser.superAdmin,
              cartId: newCart.id,
              address: newUser.address,
              postal_code:newUser.postal_code,
              city: newUser.city,
              country: newUser.country,
              firebaseId: newUser.firebaseId,
              profile_picture: newUser.profile_picture,
              };

          //return {exist: false};
        }else{
          const cart = await Cart.findOne({ where: { userId: existingUser.id } });
            return {
                    userId: existingUser.id,
                    name: existingUser.name,
                    surname: existingUser.surname,
                    exist: true, 
                    access: true,
                    isAdmin: existingUser.admin, 
                    isSuperAdmin: existingUser.superAdmin,
                    cartId: cart.id,
                    postal_code:existingUser.postal_code,
                    address: existingUser.address,
                    city: existingUser.city,
                    country: existingUser.country,
                    firebaseId: existingUser.firebaseId,
                    profile_picture: existingUser.profile_picture,
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
