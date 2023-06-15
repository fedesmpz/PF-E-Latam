const { Cart, Product }= require("../../db.js")

const removeProductFromCart = async(cartId, productId) => {
    try {
        const cart = await  Cart.findByPk(cartId, {
            include: Product
        })
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        const product = await Product.findByPk(productId)
        if (!product) {
            throw new Error("El producto no fue encontrado");
        }
        const hasProduct = await cart.hasProduct(product);
        if (!hasProduct) {
        throw new Error("El producto no está en el carrito");
        }
        await cart.removeProduct(product)
        return `${product.title} fue removido del carrito`
    } catch(error) {
        throw error
    }
}

module.exports = {
    removeProductFromCart
}