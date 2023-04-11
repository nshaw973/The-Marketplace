const router = require('express').Router();
const { User, Product, Cart, Profileimage } = require('../models');
const withAuth = require('../utils/auth');
const fs = require('fs');
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')(
  'sk_test_51MtMgCFsxalzdvcdc5tDP213h3qLVySCf3NesuAkpDIg81LwfRrIIRlcbIZhQCEqXn5GayrtWOSv4rPpOKcQ75pu00dDxC09LW'
);
//Express

router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll();
        const products = productData.map((products)=>{
           return products.get({plain:true})
        });
        const script = {
            "script": "./js/index.js",
        };
        console.log(products);
        res.render('homepage',{
            ...products, ...script
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
       console.log(product);
        // const cart = await Cart.create(product);
        const {product_name,price,thumbnail,stock} = product[0];
        const cart = await Cart.create({product_name: product_name,price:price,thumbnail:thumbnail,stock:stock});
        console.log(cart);
    

    } catch (error) {
        console.log(error);
    }
})
router.get('/login', async (req, res) => {
    try {
        res.render('login',{
            "script": "/js/login.js",
        });
    } catch(err) {
        res.status(500)
    }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500);
  }
});

router.get('/carts', withAuth, async (req, res) => {
    try {
        const carts = await Cart.findAll();
        let totalPrice = 0;
        const cartItems = carts.map((cart)=>{
            totalPrice = totalPrice + parseInt(cart.price);
            return cart.get({plain:true})
         });
        //res.render('carts',{cartItems});
        res.render('carts', {
            cartItems: cartItems,
            totalPrice: totalPrice,
            "script": "/js/cartDisplay.js"
        });
    } catch(err) {
        res.status(500)
    }
});
router.delete('/carts/:id',async(req,res) => {
    // console.log("Inside delete route");
    let myid = req.params.id;
    // console.log(id);
    const remove = await Cart.destroy({where:{id:myid}});
    
})


router.post('/create-checkout-session/', async (req, res) => {

    const items = await Cart.findAll();
    console.log(items);
   const line_items = items.map((item)=>{
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

  res.redirect(303, session.url);
});
router.get('/success', async (req, res) => {
  try {
    res.render('sucess');
  } catch (err) {
    res.status(500);
  }
});
// product page

/* Test Route for account dashboard */
router.get('/account', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Profileimage }],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    const imagePath = `${user.profile_image.filename}.${user.profile_image.mimetype.split('/')[1]}`;
    console.log(imagePath)

    res.render('account', {
      ...user,
      imagePath,
      has_pic: req.session.has_pic,
      loggedIn: req.session.loggedIn,
      user_id: req.session.userId,
    });
  } catch (err) {
    res.status(500);
  }
});

//  router.get('*', (req, res) => {
//     try {
//         res.render('homepage');
//     } catch(err) {
//         res.status(500);
//     };
// });

module.exports = router;
