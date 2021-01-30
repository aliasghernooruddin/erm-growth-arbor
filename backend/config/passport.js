const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/user");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {

                // Match user
                User.findOne({
                    email: email,
                }).then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: "User not found",
                            status: false
                        });
                    }

                    if (!user._doc.isHead && !user._doc.isUser) {
                        return done(null, false, {
                            message: "User not found",
                            status: false
                        })
                    }

                    // Match password
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Password is wrong',
                            status: false
                        });
                    }

                    if (!user._doc.isVerified) {
                        return done(null, false, {
                            message: 'Account not verified',
                            status: false
                        });
                    }

                    // If credentials are correct, return the user object
                    return done(null, user);
                }).catch(err => {
                    return done(null, false, {
                        message: err,
                        status: false
                    })
                })
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};