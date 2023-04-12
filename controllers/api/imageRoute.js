const multer = require('multer');
const { User, Profileimage } = require('../../models');
const fs = require('fs');
const router = require('express').Router();

// Limits filesize to 1mb
// Also only allows certain filetypes
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'));
    }
  }
});

// Uploads the users profile pic
router.post('/upload', upload.single('image'), async (req, res) => {
  // Create a new row in the Image table with information about the uploaded file
  try {
    const user_id = req.session.userId;
    const { filename, mimetype, path } = req.file;

    const userData = await User.findByPk(req.session.userId);
    const userPic = userData.get({ plain: true });

    // User has a check to make sure if the user has a pic, gives us the ability to update the user route without having to create a new method route
    if (userPic.has_pic === true) {
      // Update Profile Pic
      await Profileimage.update(
        { filename, mimetype, path },
        { where: { user_id: req.session.userId } }
      );
    } else {
      // Create Profile pic
      await Profileimage.create({ filename, mimetype, path, user_id });
      await User.update(
        // Changes users has_pic to true so when another upload happens, the profile_image gets updated
        { has_pic: true },
        { where: { id: req.session.userId } }
      );
    }
    // Save the uploaded file to the server using the correct format, by taking the mimetype and adding it to the end of the file.
    const newPath = `${path}.${mimetype.split('/')[1]}`;
    fs.renameSync(path, newPath);

    req.session.imagePath = 
    //Refreshes page so the user can see their new profile pic
    res.reload('/account');
  } catch (err) {
    //Refreshes regardless
    res.redirect('/account');
  }
});

module.exports = router;
