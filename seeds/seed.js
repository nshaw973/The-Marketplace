const sequelize = require('../config/connection');
const {User,Product} = require('../models');
const seedUsers = require('./userData');


const seedComments = require('./commentData');
const productsdata = require('./product-database.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    // await seedProducts();
    const products = () => Product.bulkCreate(productsdata);
    await products();

    // await seedCart();
    await seedComments();
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.addIndex('product',{
      fields: ['product_name','description','category'],
      type: 'FULLTEXT',
    });
  process.exit(0);
};

seedDatabase();
