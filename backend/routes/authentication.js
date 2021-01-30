const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User model
const User = require("../models/user");

const { sendJSONresponse } = require("../controllers/responses");

const { ensureAuthenticated } = require("../config/auth");


router.post("/login", function (req, res, next) {

  passport.authenticate('local', function (err, user, info) {

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        user._doc['status'] = true
        delete user._doc['hash']
        delete user._doc['salt']

        return res.status(200).send(user);
      });
    } else {
      // If user is not found
      res.status(404).json(info);
    }
  })(req, res, next);
})


router.get("/activate-account/:id", (req, res) => {
  var userId = req.params.id;
  if (!userId || userId == "") {
    res.send("We are not able to verify your account this time, please try again later.")
    return
  }
  User.findByIdAndUpdate(userId, {
    $set: {
      isVerified: true
    }
  }).then((user) => {
    if (user) {
      res.send("You account have been activated successfully. Please click on this <a href='https://menalisting.com'>link</a> to login.")
    }
  }).catch((err) => {
    res.send("We are not able to verify your account this time, please try again later.")
  })
})


router.post("/change-password", ensureAuthenticated, (req, res) => {
  let id = req.session.passport.user;
  let password = req.body['password']
  User.findByIdAndUpdate(id, {
    $set: {
      isFirstVisit: false
    }
  }).then(user => {
    res.status(201).json({ status: true, data: user, message: 'Password Changed Successfully!' });
  }).catch((error) => {
    if (error) {
      res.status(400).send({ status: false, message: "Failed to update password due to error: " + error })
    }
  })
})


router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send({
    status: true
  })
});

module.exports = router;