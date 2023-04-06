const path = require('path');

//Express packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([[1,{priceInCents:10000,name:"learn react"}],[2,{priceInCents:20000, name:" Learn CSS"}]]);
// cores for payment processing
const cors = require('cors');



const app = express();
//Port for heroku, and localhost
PORT = process.env.PORT || 3001;

//Add helpers in brackets, or anything else, must be required first.
const hbs = exphbs.create({});
//Cookies, and session data
const sess = {
    secret: 'Group 3',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));
app.use(
  cors({
    origin: 'http://localhost:5500'
  })
)


// stripeeee




//Using Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes found in controllers
app.use(routes);
// image
app.use(express.static("images"));
//listens
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
});
  
