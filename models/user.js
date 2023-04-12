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
        //changed allowNull to true so only email is required to login
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: ""
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
        },
        has_pic: {
            type: DataTypes.BOOLEAN, 
        },
        // In case we want to add "Member since {{user_created}}!!!"
        user_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },    
    },
    {
    //Encrypts created users password.
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
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
