const Product = require('../models/product');

const productData = [
    {
        product_name: 'Dummy Product',
        description: 'small description about product',
        price: 9.99,
        stock: 42,
        seller_id: 1
    },
];

const seedProducts = () => Product.bulkCreate(productData);
// Sent to seed.js
module.exports = seedProducts;
