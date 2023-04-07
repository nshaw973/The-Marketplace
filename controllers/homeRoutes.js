const router = require('express').Router();
const {User,Product,Cart} = require('../models');

// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')('sk_test_51MtMgCFsxalzdvcdc5tDP213h3qLVySCf3NesuAkpDIg81LwfRrIIRlcbIZhQCEqXn5GayrtWOSv4rPpOKcQ75pu00dDxC09LW');
//Express

// for testing purpose
const user = [

]
router.get('/', async (req, res) => {
    try {
        const script = {
            "script": "./js/index.js",
        };
        const productData = await Product.findAll();
        console.log(productData);
        const products = productData.map((products)=>{
           return products.get({plain:true})
        });
        console.log(products);
        res.render('homepage',{
            ...products,...script
        });
    } catch(err) {
        res.status(500)
    }
});
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(500)
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch(err) {
        res.status(500)
    }
});
router.post('/signup', async (req, res) => {
    const signup = await User.create(req.body);
    console.log(signup);
    try {
        const password = (req.body.password);
        user.push({
            id:Date.now().toString(),
            name: req.body.name,
            password: password
        })
        res.redirect('/login')
    } catch(err) {
        res.status(500)
        res.redirect('/signup');
    }
    console.log(user);
});
router.get('/carts', async (req, res) => {
    try {
        res.render('carts');
    } catch(err) {
        res.status(500)
    }
});

//route for search. When client sends url ./search with query parameters ?term=* &category=* &brand &id=*
//client side js creates the complete url and fetches. Server decodes query and returns data from database
//then server updates the search html to reflect the search results
router.get('/search', async (req, res) => {
    try {
        // const queryParameters = req.query;
        // const data = pollDatabase(queryParameters);
        const data = await pollDummyDatabase(req.query.term);
        
        // res.send(data)
        res.render('search',{
            "script": "./js/search.js",
            "searchResults": JSON.stringify(data)
        });
    } catch(err) {
        res.status(500)
    }
});


router.post('/create-checkout-session/:id', async (req, res) => {

//     const items = await Product.findAll({where:{id:req.params.id}});
//    const line_item = items.mao((item)=>{
//     return {
        
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: item.product_name,
//                 Images: [item.img],
//                 description: item.description,
//                 metadata:{
//                     id: item.id,
//                 }
//               },
//               unit_amount: item.price*100,
//             },
//             quantity: item.stock,
          
//     }
//    })
//     console.log(items);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/',
    });
  
    res.redirect(303, session.url);
  });
  router.get('/success', async (req, res) => {
    try {
        res.render('sucess');
    } catch(err) {
        res.status(500)
    }
});
// product page

/* Test Route for account dashboard */
 router.get('/account', async (req, res) => {
    try {
        res.render('account');
    } catch(err) {
        res.status(500);
    }
 })


 async function pollDummyDatabase(query){
    console.log(`polling data using query: ${query}`);
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
    const data = await response.json()
    return data;
}
module.exports = router