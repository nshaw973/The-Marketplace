const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

class User extends Model {
    // Checks user inputed password with encrypted pass in db
    chkpass(passWord) {
        return bcrypt.compareSync(passWord, this.password);
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true,
            validate: {
                //checks ___@___.com
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //Pass Length min 8 characters
                len: [8]
            },
        // In case we want to add "Member since {{user_created}}!!!"
        user_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
        },
    },
    {
    //Encrypts created users password.
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
)

module.exports = User;
