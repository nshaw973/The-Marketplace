const router = require('express').Router();
const loginRoutes = require('./loginRoute')

//Use for each api route!
/* router.use('/', ); */
router.use('/login',loginRoutes);

module.exports = router;
