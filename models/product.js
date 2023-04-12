const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize')

//seller_id connects to the user that created the product
class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        images:{
            type:DataTypes.JSON,
            allowNull:true
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,      
        },
        discountPercentage:{
            type:DataTypes.DECIMAL,
            allowNull:true,
        },
        rating:{
            type:DataTypes.DECIMAL,
            allowNull:true,
        },
        brand:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        category:{
            type:DataTypes.STRING,
            allowNull:true,
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
        
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: 'user',
                key: 'id'
            }
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
      }
);

module.exports = Product;