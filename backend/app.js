var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var passport = require('passport');

require('./api/config/db');

require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use(passport.initialize());

app.use('/api/v1', routesApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404')
  var err = new Error('API Not Found');
  err.status = 404;
  next(err);
});


// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ "message": err.name + ": " + err.message });
  }
  else {
    res.status(401).json({ 'message': err.name + ": " + err.message });
  }
});


module.exports = app;