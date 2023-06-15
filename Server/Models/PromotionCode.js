const { DataTypes, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('PromotionCode', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token_validation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
