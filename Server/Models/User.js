const { DataTypes, UUID } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false,
            validate: {
                len: [1, 25],
            },
        },
        surname: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false,
            validate: {
              len: [1, 25],
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            },
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            },
        },
        adress: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            },
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false

        },
        superAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false

        }
    },
        { timestamps: true });
};