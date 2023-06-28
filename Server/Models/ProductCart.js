const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product_Cart',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true
    });
}