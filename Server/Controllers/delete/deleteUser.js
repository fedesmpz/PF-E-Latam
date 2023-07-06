const { User, Cart } = require("../../db.js");

const deleteUser = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id }, include: Cart });
    if (!user) {
      return "No se encontró usuario con el ID especificado. No se pudo eliminar";
    }

    const cart = user.cart;
    if (cart) {
      await cart.destroy();
    }

    await user.destroy();

    return id;
  } catch (error) {

    throw new Error("Error al eliminar el usuario");
  }
};

module.exports = {
  deleteUser,
};
