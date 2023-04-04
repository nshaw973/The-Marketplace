const Sequelize = require('sequelize');
//add credentials in the .env file!!!
require('dotenv').config();

let sequelize;
//Boilerplate code from the heroku deployment documentation
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
//Code for localhost
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
}
//Exporting to server, seed
module.exports = sequelize;