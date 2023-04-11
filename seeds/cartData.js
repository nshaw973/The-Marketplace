const Cart = require('../models/cart');

const cartData = [
  {
    user_id: 1,
    product_id: 1,
  },
];
const seedCart = () => Cart.bulkCreate(cartData);
// Sent to seed.js
module.exports = seedCart;
