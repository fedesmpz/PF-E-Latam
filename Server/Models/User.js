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
            allowNull: false,
            validate: {
                len: [1, 25],
            },
        },
        surname: {
            type: DataTypes.STRING(25),
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
            allowNull: true
        },
        profile_picture: {
            type: DataTypes.TEXT,
            allowNull: true
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
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            },
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true
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

        },
        firebaseId: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        { timestamps: true });
};
