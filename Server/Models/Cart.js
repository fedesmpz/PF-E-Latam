const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cart', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    current_state: {
      type: DataTypes.STRING,
      defaultValue: "Empty",
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE, //formato ISO 8601. ('YYYY-MM-DDTHH:mm:ssZ')
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
   total_price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00,
      allowNull: false,    
    },
    currency_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    promotion_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
  }, { timestamps: true });
};
