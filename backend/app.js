const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");

const app = express();

// Load config depending on env
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: "./config/config-local.env",
  });
} else {
  dotenv.config({
    path: "./config/config.env",
  });
}

// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB
connectDB();


// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Cookie Parser
app.use(cookieParser());

// Express session
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: false,
			maxAge: 10000000,
			// allow the cookie to be sent via HTTP ("true" means "HTTPS only)
			secure: false,
			// sameSite: 'none'
		},
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// enable cors
app.use(
	cors({
		credentials: true,
		origin: (process.env.NODE_ENV=='development')?"http://localhost:8080":"https://google.com",
	})
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const routesApi = require('./routes/index')
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


const PORT = process.env.PORT || 80;


app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);