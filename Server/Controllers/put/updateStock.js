const { Product } = require("../../db");

const updateStock = async (cartData) => {
    try {
        for (const item of cartData) {
            const { id, quantity } = item;
            const product = await Product.findByPk(id);

            if (!product) {
                throw new Error("No se encontróel producto por ID");
            }
            const newStock = product.available_quantity -quantity
            const newSold = quantity + product.sold_quantity

            const updatedProduct = await Product.update(
                {
                    sold_quantity: newSold,
                    available_quantity: newStock
                },
                { where: { id: id } }
            );}
        
        return "actualizacion de stock exitosa"

    } catch (error) {
        throw new Error("No se pudo actualizar la venta");
    }
};

module.exports = { updateStock };
