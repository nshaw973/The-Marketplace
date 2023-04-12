const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

//seller_id connects to the user that created the product
class Profileimage extends Model {}

Profileimage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'profile_image',
  }
);

module.exports = Profileimage;
