const { User } = require('../../db');

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('No se pudieron obtener las reseñas');
  }
};


module.exports = {
  getAllUsers
}