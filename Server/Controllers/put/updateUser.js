const {User}=require("../../db");
const {Cart}=require("../../db");

const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")

const updateUser = async(id,name,surname,email,birth_date,profile_picture,country,city,address,postal_code)=>{

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
            name,surname,email,birth_date,profile_picture,country,city,address,postal_code
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
    return "Usuario actulizado correctamente"    
} catch (error) {
    throw new Error('Error al actualizar el usuario');
}

}

module.exports={
    updateUser
}