const { User } = require('../../models');
const router = require('express').Router();

router.post('/:id', async (req, res) => {
  try {
    const userData = await User.update(
      { name: req.body.name },
      { where: { id: req.session.userId } }
    );
    const user = userData.get({ plain: true });
    res.status(200).json(user);
    res.reload('/account');
  } catch (err) {
    res.redirect('/account');
  }
});
module.exports = router;
