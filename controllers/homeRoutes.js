const router = require('express').Router();
const { User, Product, Cart, Profileimage } = require('../models');
const withAuth = require('../utils/auth');
const fs = require('fs');
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')(
  'sk_test_51MtMgCFsxalzdvcdc5tDP213h3qLVySCf3NesuAkpDIg81LwfRrIIRlcbIZhQCEqXn5GayrtWOSv4rPpOKcQ75pu00dDxC09LW'
);
//Express

// for testing purpose
const user = [];
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    console.log(productData);
    const products = productData.map((products) => {
      return products.get({ plain: true });
    });
    const script = {
      indexScript: './js/index.js',
    };
    console.log(products);
    res.render('homepage', {
      ...products,
      ...script,
    });
  } catch (err) {
    res.status(500);
  }
});
router.get('/login', async (req, res) => {
  try {
    res.render('login', {
      loginScript: '/js/login.js',
    });
  } catch (err) {
    res.status(500);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500);
  }
});

router.get('/carts', async (req, res) => {
  try {
    res.render('carts');
  } catch (err) {
    res.status(500);
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
