// libraries
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middlewares/
const errorHandling = require('./middlewares/errorHandling');
const auth = require('./middlewares/auth');

// router
const router = require('./router/indexRouter');

// app creation
const app = express();

// using libraries
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth);
app.use(morgan('tiny'));

// setting ejs to be view engine
app.set('view engine', 'ejs');

// using router
app.use('/', router);

// allow public directory
app.use(express.static('public'))

// using error handling middlware
app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler);

module.exports = app;