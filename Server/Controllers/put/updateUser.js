// const {User}=require("../../db");
// const {Cart}=require("../../db");

// const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")


// const updateUser = async(userData)=>{

// const {id,name,surname,email,birth_date,profile_picture,country,city,address,postal_code, admin, superAdmin} = userData

// try {
//     const user = await User.findByPk(id, {
//         include: Cart
//     })
//     if(!user){
//         throw new Error("No se encontro usuario con ese ID para su actualizacion")
//     }
//     let currency_id = null
//     if(user.country !== country) {
//         currency_id = currencyIdValidator(country)
//     };
//     const updatedUser = await User.update({
//             name,surname,email,birth_date,profile_picture,country,city,address,postal_code, admin, superAdmin
//         },
//         {where:{id:id}}
//     );
//     if (currency_id) {
//         const updatedCart = await Cart.update(
//           {
//             currency_id: currency_id
//           },
//           { where: { userId: id } }
//         );
//     }

//     let userReturned = {}
//    if(updatedUser) {
//     const userUpdated = await User.findOne({ where: { id: id }});
//     const cartUpdated = await Cart.findOne({ where: { userId: id } });

//     userReturned = {
//         userId: userUpdated.id,
//         name: userUpdated.name,
//         surname: userUpdated.surname,
//         email: userUpdated.email,
//         access: true,
//         verified: userData.verified,
//         isAdmin: userUpdated.isAdmin, 
//         isSuperAdmin: userUpdated.isSuperAdmin,
//         postal_code: userUpdated.postal_code,
//         address: userUpdated.address,
//         city: userUpdated.city,
//         country: userUpdated.country,
//         cartId: cartUpdated.id,
//         firebaseId: userUpdated.firebaseId
//     };
//     } else {
//       userReturned = userData
//     }


//     return userReturned

// } catch (error) {
//     throw new Error('Error al actualizar el usuario');
// }

// }

// module.exports={
//     updateUser
// }

const {User, Cart}=require("../../db");
const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")

const updateUser = async(id, userData)=>{

const {name,surname,email,birth_date,profile_picture,country,city,address,postal_code, admin, superAdmin} = userData

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
        userUpdated = await User.findByPk(id, {
            include: Cart
        })
    }
    return userUpdated

} catch (error) {
    throw error;
}
 
}

module.exports={
    updateUser
}