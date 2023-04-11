const router = require('express').Router();
const imageRoute = require('./imageRoute');
//Use for each api route!
/* router.use('/', ); */
const loginRoutes = require('./loginRoute');

router.use('/user', loginRoutes);
router.use('/image', imageRoute);

module.exports = router;
