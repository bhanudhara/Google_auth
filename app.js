const express = require('express');
const session = require('express-session');
const {passport}= require('./config/passport');
const config = require('./config/config');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

// Use Express session middleware
app.use(session({ secret: config.session.secret, resave: true, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use the routes
app.use('/', routes);
const PORT = 8080;
sequelize
  .sync({alter:true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
