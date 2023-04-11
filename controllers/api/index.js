const router = require('express').Router();
const imageRoute = require('./imageRoute')

router.use('/image', imageRoute)

module.exports = router;
