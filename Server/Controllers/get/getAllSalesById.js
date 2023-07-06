const { Sale, Product } = require ('../../db'); // Reemplaza './models' con la ruta correcta a tus modelos

const getSalesByUserId = async (userId) => {
  try {
    const sales = await Sale.findAll({
      where: { user_id: userId },
      order: [['updatedAt', 'DESC']],
    });

    const result = [];

    for (const sale of sales) {
      const products = await Product.findAll({
        where: { id: sale.products_id },
      });

      const productData = products.map((product) => ({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        original_price: product.original_price,
      }));

      result.push({
        user_id: sale.user_id,
        updatedAt: sale.updatedAt,
        total_price: sale.total_price,
        products: productData,
      });
    }

    return result;

  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving sales by user ID');
  }
}

module.exports={
    getSalesByUserId
}
