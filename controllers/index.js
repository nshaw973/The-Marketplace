const router = require('express').Router();

const apiRoutes = require('./api');
const searchRoutes = require('./api/search');

const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/search', searchRoutes);




module.exports = router;