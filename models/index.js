const Comment = require('./comment');
const Cart = require('./cart');
const Product = require('./product');
const User = require('./user');
const Profileimage = require('./profile_image')

// User Joins
// User can have many comments spread around the site
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// User can have many products up for sale
User.hasMany(Product, {
    foreignKey: 'seller_id',
    onDelete: 'CASCADE'
});
//User many products on a single cart

User.hasOne(Profileimage, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Product.belongsTo(User, {
    foreignKey: 'seller_id'
})
//connects comments to product.
Product.hasMany(Comment, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})

//Comment Joins
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Profileimage.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    Comment,
    Cart,
    Product,
    User,
    Profileimage
};