const { Cart, Product, conn } = require("../../db");

const addProductToCart = async(id, productId, quantity) => {
    try {
        // const updateCartProductQuery = `UPDATE product_cart SET quantity = ${quantity} WHERE cartId = '${id}' AND productId = '${productId}';`;
        const cart = await Cart.findByPk(id, {
            include: Product
        })
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        const product = await Product.findByPk(productId)
        if (!product) {
            throw new Error("El producto no fue encontrado");
        }
        if(cart.currency_id !== product.currency_id) {
            throw new Error(`No puede añadir al carrito productos de ${product.country}, si esta comprando en ${cart.currency_id} Para comprar en ${product.country}, cambie la configuración de país en su perfil de usuario`)
        }
        await cart.addProduct(product);
        await cart.update({ current_state: "Pending"});
        // conn.query(updateCartProductQuery, {
        //     // replacements: { quantity, cartId, productId },
        //     type: conn.QueryTypes.UPDATE
        //   })
        return `${product.title} añadido correctamente al carrito`
    } catch(error) {
        throw error
    }
}

// const addProductToCart = async (id, productId, productQuantity) => {
//     try {
//         console.log(productQuantity)
//       const cart = await Cart.findByPk(id, {
//         include: Product,
//       });
//       if (!cart) {
//         throw new Error("El carrito no fue encontrado");
//       }
//       const product = await Product.findByPk(productId);
//       if (!product) {
//         throw new Error("El producto no fue encontrado");
//       }
//       if (cart.currency_id !== product.currency_id) {
//         throw new Error(
//           `No puede añadir al carrito productos de ${product.country}, si esta comprando en ${cart.currency_id} Para comprar en ${product.country}, cambie la configuración de país en su perfil de usuario`
//         );
//       }
  
//       // Actualizar la cantidad en la tabla intermedia product_cart
//       await cart.addProduct(product, { through: { productQuantity } });
  
//       await cart.update({ current_state: "Pending" });
  
//       return `${product.title} añadido correctamente al carrito`;
//     } catch (error) {
//       throw error;
//     }
//   };

module.exports = {
    addProductToCart
}