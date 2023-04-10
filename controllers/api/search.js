const search = require('express').Router();

//get route to search query, update HTML, and redirect to new URL
//When client sends url ./search with query parameters ?term=* &category=*
//client side js creates the complete url and fetches. Server decodes query and returns data from database
//then server updates the search html to reflect the search results
search.get('/', async (req, res) => {
    try {
        if(req.query.term !==""){
            console.log("1")
            const data = await pollDummyDatabase(req.query.term);
            console.log("1.5")
            res.render('search',{
                "searchScript": "/js/search.js",
                "searchResults": data.products
            });
        } else if(req.query.term ===""){
            console.log("2")
            const data = await pollDummyDatabase('all');
            res.render('search',{
                "searchScript": "/js/search.js",
                "searchResults": data.products
            });
        } else{
            res.render('homepage');
        };

    } catch(err) {
        res.status(500)
    }
});

async function pollDummyDatabase(query){
    if (query === 'all'){
        console.log(`polling data using query: ${query} products`);
        const response = await fetch(`https://dummyjson.com/products`)
        const data = await response.json()
        return data;
    } else if(query === 'all'){
        console.log(`polling data using query: ${query}`);
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
        const data = await response.json()
        return data;
    }
}

module.exports = search;