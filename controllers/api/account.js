const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

// Updates Users name
router.post('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update(
      { name: req.body.name },
      { where: { id: req.session.userId } }
    );
    const user = userData.get({ plain: true });
    res.status(200).json(user);
  } catch (err) {
    res.redirect('/account');
  }
});
module.exports = router;
