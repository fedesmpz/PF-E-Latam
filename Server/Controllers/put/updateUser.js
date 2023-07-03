const {User, Cart}=require("../../db");
const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")

const updateUser = async(id, userData)=>{

const {name,surname,email,birth_date,profile_picture,country,city,address,postal_code, admin, superAdmin, access, firebaseId, verified} = userData

try {
    const user = await User.findByPk(id, {
        include: Cart
    })
    if(!user){
        throw new Error("No se encontro usuario con ese ID para su actualizacion")
    }
    let currency_id = null
    if(user.country !== country) {
        currency_id = currencyIdValidator(country)
    };
    const updatedUser = await User.update({
            name,surname,email,birth_date,profile_picture,country,city,address,postal_code, admin, superAdmin
        },
        {where:{id:id}}
    );
    if (currency_id) {
        const updatedCart = await Cart.update(
          {
            currency_id: currency_id
          },
          { where: { userId: id } }
        );
    }
    let userUpdated;
    if(updatedUser) {
        userUpdated = await User.findByPk(id);
        cartUpdated = await Cart.findOne({where: {
            userId: id
        }})
    }
    const userReturned = {
        ...userUpdated.dataValues,
        cartId: cartUpdated.id,
        userId: id,
        access: access,
        verified: verified,
        firebaseId: firebaseId
    }
    return userReturned
} catch (error) {
    throw error;
}
 
}

module.exports={
    updateUser
}

module.exports={
    updateUser
}
