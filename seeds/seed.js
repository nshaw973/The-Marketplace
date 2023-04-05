const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedProducts = require('./productData');
const seedCart = require('./cartData');
const seedComments = require('./commentData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedProducts();
    await seedCart();
    await seedComments();

  process.exit(0);
};

seedDatabase();
