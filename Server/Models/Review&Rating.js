const { DataTypes, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      rating: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        defaultValue: 1,
        allowNull: false,
      },

      review_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
