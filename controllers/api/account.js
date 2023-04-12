const multer = require('multer');
const { User } = require('../../models');
const fs = require('fs');
const router = require('express').Router();

router.post('/name', async (req, res) => {
  try {
    const userData = await User.update(
      { name: req.name },
      { where: { id: req.session.userId } }
    );
    const user = userData.get({ plain: true });

    res.reload('/account');
  } catch (err) {
    res.redirect('/account');
  }
});
module.exports = router;
