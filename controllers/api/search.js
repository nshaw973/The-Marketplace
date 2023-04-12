const search = require('express').Router();
const pollDatabase = require('../../utils/polling.js');

//get route to search query, update HTML, and redirect to new URL
//When client sends url ./search with query parameters ?term=* &category=*
//client side js creates the complete url and fetches. Server decodes query and returns data from database
//then server updates the search html to reflect the search results
search.get('/', async (req, res) => {
    try {
        if(req.query.term){
            const data = await pollDatabase(req.query);
            if(data.length === 0){
                res.render('search',{
                    "products": data,
                    "resultAvailiable": false,
                    "script": "/js/cartscript.js"
                });
            } else {
                for(let i = 0; i < data.length ; i++){
                    data[i].discountPercentage = Math.floor(data[i].discountPercentage);
                    data[i].listPrice = Math.floor(data[i].price/(1-(data[i].discountPercentage/100)));
                }
                res.render('search',{
                    imagePath: req.session.imagePath,
                    loggedIn: req.session.loggedIn,
                    "products": data,
                    "resultAvailable": true,
                    "script": "/js/cartscript.js",
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