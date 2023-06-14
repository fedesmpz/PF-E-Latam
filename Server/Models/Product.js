const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
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
    },
    available_quantity: {
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
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    attributes: {
      type: DataTypes.TEXT
    },
    // attributes: [
    //   {
    //     name:{
    //       type: DataTypes.STRING
    //     },
    //     value: {
    //       type: DataTypes.STRING
    //     }
    //   }
    // ],

    //POSIBLEMENTE SE PUEDA USAR PARA ORDENES
    // installments: [
    //   {
    //     quantity: {
    //       type: DataTypes.INTEGER,
    //       allowNull: false
    //     },
    //     amount: {
    //       type: DataTypes.DECIMAL,
    //       allowNull: false
    //     },
    //     rate: {
    //       type: DataTypes.INTEGER,
    //       allowNull: false
    //     },
    //     currency_id: {
    //       type: DataTypes.STRING,
    //       allowNull: false
    //     }
    //   }
    // ],
    catalog_listing: {
      type: DataTypes.BOOLEAN
    },
    discounts: {
      type: DataTypes.STRING
    },
    promotions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      validate : {
        len:[0,10]
      }
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  });
};
