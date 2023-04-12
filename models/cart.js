const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize')

//Cart Connects the Product to the user when purchasing
class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
            
        },
        product_name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        
        thumbnail:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER(255),
            allowNull: false,
        },

        
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
      }
);

module.exports = Cart;