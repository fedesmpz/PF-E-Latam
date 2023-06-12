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
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE, //formato ISO 8601. ('YYYY-MM-DDTHH:mm:ssZ')
        allowNull: false,
      },
   products_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,    
    },
    promotion_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
  }, { timestamps: true });
};
