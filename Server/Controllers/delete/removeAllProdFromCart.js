const { Cart }= require("../../db.js")

const removeAllProdFromCart = async(cartId) => {
    try {
        const cart = await  Cart.findByPk(cartId, {
            include: Product
        })
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        await cart.setProducts([]);
        await cart.update({ current_state: "Empty"})
        return "Todos los productos fueron removidos del carrito";
    } catch(error) {
        throw error
    }
}

module.exports = {
    removeAllProdFromCart
}