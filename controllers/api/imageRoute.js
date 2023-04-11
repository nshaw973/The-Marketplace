const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Profileimage } = require('../../models')
const router = require('express').Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  // Create a new row in the Image table with information about the uploaded file
  try {
    const { filename, mimetype, path } = req.file;
    await Profileimage.create({ filename, mimetype, path });

    // Save the uploaded file to the server
    const newPath = `${path}.${mimetype.split('/')[1]}`;
    fs.renameSync(path, newPath);

    res.send('Image uploaded successfully');
  } catch (err) {
    res.redirect('/account')
  }
});

module.exports = router;