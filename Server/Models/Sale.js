const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sale', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pay_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    products_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
 {timestamp: true});
};