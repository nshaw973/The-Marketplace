const router = require('express').Router();
const {User,Product,Cart} = require('../models');
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')('sk_test_51MtMgCFsxalzdvcdc5tDP213h3qLVySCf3NesuAkpDIg81LwfRrIIRlcbIZhQCEqXn5GayrtWOSv4rPpOKcQ75pu00dDxC09LW');
//Express


router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll();
        console.log(productData);
        const products = productData.map((products)=>{
           return products.get({plain:true})
        });
        // const script = {
        //     "indexScript": "./js/index.js",
        // };
    
        res.render('homepage',{
           products
        });
    } catch(err) {
        res.status(500);
    }
});
router.post('/',async(req,res)=>{
    
    try {
        
        const items =  await Product.findAll({where:{id:req.body.id}});
        const product = items.map((item)=>{
            return item.get({plain:true});
        })
        console.log(product);
        const [{product_name,price,thumbnail,stock}] = product;
       console.log(product_name);
        await Cart.create({product_name: product_name,price:price,thumbnail:thumbnail,stock:stock});

        
       
       

    } catch (error) {
        console.log(error);
    }
})
router.get('/login', async (req, res) => {
    try {
        res.render('login',{
            "loginScript": "/js/login.js",
        });
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
        let totalPrice = 0;
        const cartItems = carts.map((cart)=>{
            totalPrice = totalPrice + parseInt(cart.price);
            return cart.get({plain:true})
         });
         console.log(cartItems);
        //res.render('carts',{cartItems});
        res.render('carts', {
            cartItems: cartItems,
            totalPrice: totalPrice
        })
    } catch(err) {
        res.status(500)
    }
});
router.delete('/carts',async(req,res)=>{
    try {
       await Cart.destroy({truncate:true, cascade:false, });
      
    } catch (error) {
        console.error(error);
    }
    
})
router.delete('/carts/:id',async(req,res) => {
    // console.log("Inside delete route");
    let myid = req.params.id;
    // console.log(id);
    
    const remove = await Cart.destroy({where:{id:myid}});

    
})

router.post('/purchase',async (req,res)=>{
    
    let total = 0;
    req.body.items.forEach(async function(item){
        const cartTotal = await Cart.findAll({where:{id:item.id}});
        const serialize = cartTotal.map((item)=> item.get({plain:true}));
        const [{price}] = serialize;
        total += price *item.quantity;
    })
    stripe.charges.create({
        amount:total,
        source: req.body.stripeTokenId,
        currency: 'usd'
    }).then(function(){
        console.log("charges Succesfully")
    }).catch(function(){
        console.log('charges fail');
    })
})

router.post('/create-checkout-session', async (req, res) => {

    const items = await Cart.findAll();
    console.log(items);
    const serialize = items.map((item)=> item.get({plain:true}));
   const line_items = serialize.map((item)=>{
    return {
        
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product_name,
                images: [item.thumbnail],
                metadata:{
                    id: item.id,
                }
              },
              unit_amount: item.price*100,
            },
            quantity: 1,
          
    }
   })
   
   
    const session = await stripe.checkout.sessions.create({
        line_items,
      
      mode: 'payment',
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/carts',
    });
  
    res.redirect(303, session.url);
  });
  
  
router.get('/success', async (req, res) => {
    try {
        res.render('success');
    } catch(err) {
        res.status(500)
    }
});


/* Test Route for account dashboard */
 router.get('/account', async (req, res) => {
    try {
        res.render('account');
    } catch(err) {
        res.status(500);
    }
 })

//  router.get('*', (req, res) => {
//     try {
//         res.render('homepage');
//     } catch(err) {
//         res.status(500);
//     };
// });

module.exports = router