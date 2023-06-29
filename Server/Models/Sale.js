const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sale', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products_id: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
 {timestamp: true});
 
};