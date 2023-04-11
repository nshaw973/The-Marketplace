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
        const productData = await Product.findAll();
        console.log(productData);
        const products = productData.map((products)=>{
           return products.get({plain:true})
        });
        console.log(products);
        res.render('homepage',{
            products
        });
    } catch(err) {
        res.status(500)
    }
});
router.post('/:id',async(req,res)=>{
    
    try {
        
        const items =  await Product.findAll({where:{id:req.params.id}});
        const product = items.map((item)=>{
            return item.get({plain:true});
        })
        // const cart = await Cart.create(product);
        const {product_name,price,thumbnail,stock} = product[0];
        const cart = await Cart.create({product_name: product_name,price:price,thumbnail:thumbnail,stock:stock});
        console.log(cart);
    
    res.render("carts");
    } catch (error) {
        console.log(error);
    }
})
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

router.get('/carts', async (req, res) => {
    try {
        const carts = await Cart.findAll();
        const cartItems = carts.map((cart)=>{
            return cart.get({plain:true})
         });
        res.render('carts',{cartItems});
    } catch(err) {
        res.status(500)
    }
});


router.post('/create-checkout-session/:id', async (req, res) => {

    const items = await Product.findAll({where:{id:req.params.id}});
   const line_items = items.map((item)=>{
    return {
        
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product_name,
                description: item.description,
                metadata:{
                    id: item.id,
                }
              },
              unit_amount: item.price,
            },
            quantity: item.stock,
          
    }
   })
   

    const session = await stripe.checkout.sessions.create({
      line_items,
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

module.exports = router