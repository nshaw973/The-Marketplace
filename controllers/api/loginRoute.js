const router = require('express').Router();
// models later


router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(500)
    }
});
router.post('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(500)
    }
});
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch(err) {
        res.status(500)
    }
});
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch(err) {
        res.status(500)
    }
});
module.exports = router;