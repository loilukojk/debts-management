const express = require('express');
// const server = require('http').createServer(app);
const { handleError } = require('./helpers/error');
const passport = require("passport");
// const path = require("path");
const app = express();

// INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

app.use((err, req, res, next) => {
  handleError(err, res);
});
// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));
//form-urlencoded

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

require('./routes/index')(app);

app.listen(8080, () => {
  console.log('Server listening on localhost: 8080');
});