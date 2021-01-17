const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
const expressLayouts = require("express-ejs-layouts");
const cron = require("node-cron");
const scheduledEmailJob = require("./services/emailSchedulerJob.js");

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

// Express body parser
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use( express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  }));

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
		origin: (process.env.NODE_ENV=='development')?"http://localhost:3006":"https://menalisting.com",
	})
);

//app.use(cors());

app.use(express.static(path.join(__dirname, "static/")));
//app.use('/', express.static(path.join(__dirname, "static/")));
//app.use(express.static(path.join(__dirname, "public/landing")));
//app.use(express.static(path.join(__dirname, "public/portal")));
//app.use(express.static(path.join(__dirname, "public/static")));
app.use(
	express.static(
		path.join(__dirname, "node_modules/bootstrap/dist/css/bootstrap.min.css")
	)
);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

//app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/landing", "index.html"));
// });

app.get("/portal/*", (req, res) => {
	res.sendFile(path.join(__dirname, "static/") + "portal/index.html");
});

app.get("/admin/*", (req, res) => {
	res.sendFile(path.join(__dirname, "static/") + "admin/index.html");
});

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index.js"));
app.use("/account", require("./routes/users.js"));
app.use("/promotion", require("./routes/promotion.js"));
app.use("/notification", require("./routes/notification.js"));
app.use("/property", require("./routes/property.js"));
app.use("/templates", require("./routes/templates.js"));
app.use("/fileUpload", require("./routes/fileUpload.js"));
app.use("/defaults", require("./routes/defaults.js"));
app.use("/leads", require("./routes/leads.js"));
app.use("/contacts", require("./routes/contacts.js"));
app.use("/visitors", require("./routes/visitors.js"));
app.use("/packages", require("./routes/packages.js"));
app.use("/billing-addresses", require("./routes/billingAddress.js"));
app.use("/subscription", require("./routes/subscription.js"));
app.use("/coupons", require("./routes/coupons.js"));
app.use("/payment-cards", require("./routes/cards.js"));
app.use("/domains", require("./routes/domain.js"));
app.use("/stripe", require("./routes/stripe.js"));
const PORT = process.env.PORT || 80;

cron.schedule("0 1 * * *", scheduledEmailJob);

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);