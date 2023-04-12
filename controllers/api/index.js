const router = require('express').Router();
const imageRoute = require('./imageRoute');
const accountRoutes = require('./account')
//Use for each api route!
/* router.use('/', ); */
const loginRoutes = require('./loginRoute');

router.use('/user', loginRoutes);
router.use('/image', imageRoute);
router.use('/account', accountRoutes)

module.exports = router;
