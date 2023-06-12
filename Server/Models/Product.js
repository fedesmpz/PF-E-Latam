const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dogs', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    original_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sale_price: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    availiable_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    official_store_name: {
      type: DataTypes.STRING
    },
    shipping: {
      free_shipping: {
        type: DataTypes.BOOLEAN
      }
    },
    attributes: [
      {
        name:{
          type: DataTypes.STRING
        },
        value_name: {
          type: DataTypes.STRING
        },
        source: {
          type: DataTypes.INTEGER
        },
        value_type: {
          type: DataTypes.STRING
        },
      }
    ],
    installments: {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    catalog_listing: {
      type: DataTypes.BOOLEAN
    },
    discounts: {
      type: DataTypes.BOOLEAN
    },
    promotions: {
      type: DataTypes.ARRAY
    }
  },
  {
    timestamps: false
  });
};
