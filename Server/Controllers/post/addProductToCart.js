const { Cart, Product } = require("../../db");

const addProductToCart = async(cartId, products, total_price) => {
    try {
        const cart = await Cart.findByPk(cartId, {
            include: Product
        })
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        for (const product of products) {
            const { id, quantity } = product;
            const productExists = await Product.findByPk(id);
            if (!productExists) {
                throw new Error("El producto no fue encontrado");
            }
            if(cart.currency_id !== productExists.currency_id) {
                throw new Error(`No puede añadir al carrito productos de ${productExists.country}, si esta comprando en ${cart.currency_id} Para comprar en ${product.country}, cambie la configuración de país en su perfil de usuario`)
            }
            await cart.addProduct(productExists, {
                through: {
                  quantity: quantity,
                },
            });
        }
        await cart.update({ current_state: "Pending", total_price: total_price });
        return `Productos añadidos correctamente al carrito`
    } catch(error) {
        throw error
    }
}

module.exports = {
    addProductToCart
}
