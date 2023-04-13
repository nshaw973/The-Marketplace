const search = require('express').Router();
const pollDatabase = require('../../utils/polling.js');

//get route to search query, update HTML, and redirect to new URL
//When client sends url ./search with query parameters ?term=* &category=*
//client side js creates the complete url and fetches. Server decodes query and returns data from database
//then server updates the search html to reflect the search results
search.get('/', async (req, res) => {
  try {
    let imageSearchPath;
    // Checks first to see if there even is an imagePath value, or else it wouldn't load the shop now or search categories
    // Search has a weird issue going on where it needs a special path in order to get the profile image to load.
    // Looks for the uploads/ path and adds the new pathing for just search.
    if (req.session.imagePath) {
      if (req.session.imagePath.includes('uploads/')) {
        imageSearchPath = `../${req.session.imagePath}`;
      } else {
        imageSearchPath =
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
      }
    }

    if (req.query.term) {
      const data = await pollDatabase(req.query);

      if (data.length === 0) {
        res.render('search', {
          imagePath: imageSearchPath,
          loggedIn: req.session.loggedIn,
          products: data,
          resultAvailiable: false,
          script: '/js/cartscript.js',
        });
      } else {
        for (let i = 0; i < data.length; i++) {
          data[i].discountPercentage = Math.floor(data[i].discountPercentage);
          data[i].listPrice = Math.floor(
            data[i].price / (1 - data[i].discountPercentage / 100)
          );
        }

        res.render('search', {
          imagePath: imageSearchPath,
          loggedIn: req.session.loggedIn,
          products: data,
          resultAvailable: true,
          script: '/js/cartscript.js',
        });
      }
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = search;
