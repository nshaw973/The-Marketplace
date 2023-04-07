const Product = require('../models/product');

const productData = [
    {
        product_name: 'Dummy Product',
        description: 'small description about product',
        price: 9.99,
        stock: 42,
        seller_id: 1
    },
    {
        product_name: "Truffles",
        price: 15.59,
        img: "https://www.candywarehouse.com/assets/item/regular/french-mint-filled-dark-chocolate-truffles.jpg",
        description: "Succulent morsels of decadent dark chocolate with exquisite truffle fillings",
        stock: 145,
        seller_id: 1
    },
    { 
        product_name: "Pico-Balla",
        price: 5.19,
        img: "https://images-na.ssl-images-amazon.com/images/I/613pCvZqzDL.jpg",
        description: "Great and tasty Gummy candiesThis lot contains one pack. Free shipping worldwide. Package weight is 175g",
        stock: 100,
        seller_id: 1
    },
    {
        product_name: "Kisses",
        price: 13.59,
        img: "https://images-na.ssl-images-amazon.com/images/I/61JudlWjJDL._AC_US436_QL65_.jpg",
        description: "An American Classic, Hershey KISSES are bite-sized PIECES of chocolate with a unique shape and wrapped in colorful foil.",
        stock: 100,
        seller_id: 1
    },
    { 
        product_name: "Baerchen",
        price: 4.77,
        img: "https://images-na.ssl-images-amazon.com/images/I/911Jj5qqvLL._SX522_.jpg",
        description: "Imported from Germany",
        stock: 100,
        seller_id: 1
    },
    {
        product_name: "Gummy Bears",
        price: 24.99,
        img: "https://s3.amazonaws.com/kidzworld_photo/images/2016323/5b89be7a-ff3c-45c6-a065-aec7839c9e97/gummybears-inarow.jpg",
        description: "An American Classic, Hershey KISSES are bite-sized PIECES of chocolate with a unique shape and wrapped in colorful foil.",
        stock: 345,
        seller_id: 1
    },
];

const seedProducts = () => Product.bulkCreate(productData);
// Sent to seed.js
module.exports = seedProducts;
