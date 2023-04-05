const router = require('express').Router();
// for testing purpose
const user = [

]
router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch(err) {
        res.status(500)
    }
});
router.get('/login', async (req, res) => {
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
router.post('/signup', async (req, res) => {
    try {
        const password = (req.body.password);
        user.push({
            id:Date.now().toString(),
            name: req.body.name,
            password: password
        })
        res.redirect('/login')
    } catch(err) {
        res.status(500)
        res.redirect('/register');
    }
    console.log(user);
});
router.get('/carts', async (req, res) => {
    try {
        res.render('carts');
    } catch(err) {
        res.status(500)
    }
});
module.exports = router