const { Cart, Product } = require("../../db");

const addProductToCart = async(cartId, id, quantity) => {
    try {
        const cart = await Cart.findByPk(cartId, {
            include: Product
        })
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        const product = await Product.findByPk(id)
        if (!product) {
            throw new Error("El producto no fue encontrado");
        }
        if(cart.currency_id !== product.currency_id) {
            throw new Error(`No puede añadir al carrito productos de ${product.country}, si esta comprando en ${cart.currency_id} Para comprar en ${product.country}, cambie la configuración de país en su perfil de usuario`)
        }
        await cart.addProduct(product, {
            through: {
              quantity: quantity,
            },
        });
        await cart.update({ current_state: "Pending", total_price: `${product.original_price * quantity}` });
        return `Productos añadidos correctamente al carrito`
    } catch(error) {
        throw error
    }
}

module.exports = {
    addProductToCart
}
