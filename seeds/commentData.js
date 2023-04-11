const Comment = require('../models/comment');

const commentData = [
  {
    comment: 'Test Comment',
    user_id: 1,
    product_id: 1,
  },
];
const seedComments = () => Comment.bulkCreate(commentData);
// Sent to seed.js
module.exports = seedComments;
