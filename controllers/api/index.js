const router = require('express').Router();

//Use for each api route!
/* router.use('/', ); */
const loginRoutes = require('./loginRoute');

router.use('/user', loginRoutes);

module.exports = router;

module.exports = router;
