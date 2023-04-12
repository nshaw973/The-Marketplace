const router = require('express').Router();
const { User, Profileimage } = require('../../models');

// SIGN UP

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;
      req.session.has_pic = newUser.has_pic;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: [{ model: Profileimage }],
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.chkpass(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Password doesnt match!' });
      return;
    }

    if (user.profile_image === null) {
      imagePath = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    } else {
      imagePath = `uploads/${user.profile_image.filename}.${user.profile_image.mimetype.split('/')[1]}`;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.loggedIn = true;
      req.session.imagePath = imagePath;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// LOGOUT
//need to set up logout button/functionality
//need to render page with logout button when logged in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});

module.exports = router;
