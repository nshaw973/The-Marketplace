const path = require('path');

//Express packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Express
app = express();
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

//Using Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes found in controllers
app.use(routes);

//listens
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port${PORT}`));
});
  
