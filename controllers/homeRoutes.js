const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')('sk_test_51MtMgCFsxalzdvcdc5tDP213h3qLVySCf3NesuAkpDIg81LwfRrIIRlcbIZhQCEqXn5GayrtWOSv4rPpOKcQ75pu00dDxC09LW');
//Express
const storeItems = new Map([[1,{priceInCents:10000,name:"learn react"}],[2,{priceInCents:20000, name:" Learn CSS"}]]);
// for testing purpose
const user = [

]
router.get('/', async (req, res) => {
    try {
        res.render('homepage');
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


// for checkout route


// router.post("/create-checkout-session", async(req,res)=>{
//     try {
//         const session= await stripe.checkout.sessions.create({
//             payment_method_types:['card'],
//             mode: 'payment',
//             line_items:req.body.items.map(item=>{
//                 const storeItem = storeItems.get(item.id);
//                 return{
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name: storeItem.name,
//                         },
//                         unit_amount:storeItem.priceInCents
//                     },
//                     quantity:item.quantity
//                 }
//             }),
//             success_url:`${process.env.SERVER_URL}/success.html`,
//             cancel_utl:`${process.env.SERVER_URL}/cancel.html`
//         })
//         res.redirect(session.url);
//         res.json({url:session.url});
//     } catch (err) {
//         console.log(err);
//     }
// })
router.post('/create-checkout-session', async (req, res) => {
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

module.exports = router