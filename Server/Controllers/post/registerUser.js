const {User} = require("../../db.js");
const {Cart} = require("../../db.js");
const { conn } = require("../../db.js");

const { currencyIdValidator } = require("../../Utilities/currencyIdValidator.js")

const registerUser= async(id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code)=>{
    const transaction = await conn.transaction();
    try {
        const userRegistered = await User.findOne({
            where:{ email:email}
        });
        if (userRegistered) {
            throw new Error('Ya existe un usuario registrado con ese email');
        }
        const newUser = await User.create({
            id,name,surname,email,birth_date,profile_picture,country,city,adress,postal_code
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
        if(newUser){
            console.log(`Usuario de ${name} ${surname} creado de manera exitosa y asociado a carrito con ID ${newCart.id}.`) 
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al registrar al usuario');
    }
}

module.exports={
    registerUser
}