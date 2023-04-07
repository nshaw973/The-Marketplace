const router = require('express').Router();
const { User } = require('../../models');
// models later

//sign up route - GET request
console.log('got this far')
router.post('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch(err) {
        res.status(500).send('Internal Server Error')
    }
});
//sign up route - POST request
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({ 
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
          });
        
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.name = newUser.name;
            req.session.email = newUser.email;
            req.session.loggedIn = true;

            res.redirect('/carts')
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
});
//login get request
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(500).send("internal Server Error");
    }
});
//login post request
router.post('/login', async (req, res) => {
    try {
     const user = await User.findOne({
        where: {
            name: req.body.name
        },
     });
     if (!user) {
        res.status(400).json({ message: 'No user found' });
        return;
     }
     req.session.save(() => {
        req.session.userId = user.id;
        req.session.name = user.name;
        req.session.loggedIn = true;
        res.json({ user, message: 'Logged In'});
     });
    } catch (err) {
        res.status(400).json({ message: 'No user found'});
    }
});
//logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;