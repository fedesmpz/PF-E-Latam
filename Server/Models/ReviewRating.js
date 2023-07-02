const { DataTypes, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Review_Rating',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      rating: {
        type: DataTypes.INTEGER,
        validate:{
          min: 1,
          max: 5
        },
        defaultValue: 1,
      },

      review_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      productId: {
        type: DataTypes.TEXT,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

    },
    { timestamps: true }
  );
};
