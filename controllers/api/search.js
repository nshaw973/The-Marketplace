const search = require('express').Router();
const pollDatabase = require('../../utils/polling.js');

//get route to search query, update HTML, and redirect to new URL
//When client sends url ./search with query parameters ?term=* &category=*
//client side js creates the complete url and fetches. Server decodes query and returns data from database
//then server updates the search html to reflect the search results
search.get('/', async (req, res) => {
    try {
        if(req.query.term){
            const data = await pollDatabase(req.query.term);
            if(data.products.length === 0){
                res.render('search',{
                    "searchScript": "/js/search.js",
                    "searchResults": data.products,
                    "resultAvailiable": false
                });
            } else {
                res.render('search',{
                    "searchScript": "/js/search.js",
                    "searchResults": data.products,
                    "resultAvailable": true
                });
            };
        } else{
            res.render('homepage');
        };
    } catch(err) {
        res.status(500)
    }
});



module.exports = search;