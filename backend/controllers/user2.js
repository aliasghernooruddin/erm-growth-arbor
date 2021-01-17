const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mailService = require("../services/mail_service/mailService")
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

const {
    ObjectId
} = require("mongoose");

// Load User model
const User = require("../models/User");
const Defaults = require("../models/Defaults");
const {
    addLogInDb
} = require('../config/logging');

const {
    ensureIndexes
} = require("../models/User");
const Packages = require("../models/Packages");
const Templates = require("../models/Templates");
const PropertyDetails = require("../models/PropertyDetails");
const Logs = require("../models/Logs");

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

function createUserDefaultDocument(userId) {
    Templates.findOne().then((template) => {
        if (template) {
            const defaults = new Defaults({
                userId: userId,
                theme: template._id
            })
            defaults.save()
        }
    })

}

// Register
router.post("/register", (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({
            msg: "Please enter all fields",
        });
    }

    if (password != password2) {
        errors.push({
            msg: "Passwords do not match",
        });
    }

    if (password.length < 6) {
        errors.push({
            msg: "Password must be at least 6 characters",
        });
    }

    if (errors.length > 0) {
        res.status(500).send({
            errors: errors
        })
    } else {
        User.findOne({
            email: email,
        }).then(async (user) => {
            if (user) {
                errors.push({
                    msg: "Email already exists",
                });
                res.status(400).send({
                    errors: errors
                })
            } else {
                let package = await Packages.findOne({
                    key: 'trial'
                })
                const newUser = new User({
                    name: {
                        first_name,
                        last_name
                    },
                    email,
                    password,
                    packageExpiry: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
                    currentPackage: package._id,
                    couponsUsed: [],
                    role: "BROKER"
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                mailService.sendEmail(newUser.email, "Account created successfully", {
                                    template: mailService.templates.NEW_USER,
                                    link: "https://menalisting.com/account/activate-account/" + user._id
                                }, (err, info) => {
                                    if (err) {
                                        console.log(err)
                                        return
                                    }
                                    console.log(info.envelope);
                                    console.log(info.messageId);
                                })
                                createUserDefaultDocument(user._id)
                                addLogInDb({ objectType: "USER", activityType: "CREATE", application: "Users", message: `${newUser.email} has been registered`, user: user._id })
                                res.json({
                                    success: true,
                                    msg: "Successful created new User.",
                                });
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
});

// Register
router.post("/createAdminUser", (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        role
    } = req.body;
    let errors = [];

    if (!first_name || !last_name || !email || !password || !role) {
        errors.push({
            msg: "Please enter all fields",
        });
    }

    if (password.length < 6) {
        errors.push({
            msg: "Password must be at least 6 characters",
        });
    }

    if (errors.length > 0) {
        res.status(500).send({
            errors: errors
        })
    } else {
        User.findOne({
            email: email,
        }).then(async (user) => {
            if (user) {
                errors.push({
                    msg: "Email already exists",
                });
                res.status(400).send({
                    errors: errors
                })
            } else {
                let package = await Packages.findOne({
                    key: 'trial'
                })
                const newUser = new User({
                    name: {
                        first_name,
                        last_name
                    },
                    email,
                    password,
                    packageExpiry: new Date(Date.now() + (100 * 24 * 60 * 60 * 1000)),
                    currentPackage: package._id,
                    couponsUsed: [],
                    isActive: true,
                    role: role
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                addLogInDb({ objectType: "USER", activityType: "CREATE", application: "Users", message: `Admin ${newUser.email} has been created`, user: user._id })
                                res.json({
                                    success: true,
                                    msg: "Successful created new User.",
                                });
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
});


router.get("/activate-account/:id", (req, res) => {
    var userId = req.params.id;
    if (!userId || userId == "") {
        res.send("We are not able to verify your account this time, please try again later.")
        return
    }
    User.findByIdAndUpdate(userId, {
        $set: {
            isActive: true
        }
    }).then((user) => {
        if (user) {
            res.send("You account have been activated successfully. Please click on this <a href='https://menalisting.com'>link</a> to login.")
        }
    }).catch((err) => {
        res.send("We are not able to verify your account this time, please try again later.")
    })
})

// Register Agent
router.post("/register-agent/:propertyId", ensureAuthenticated, (req, res) => {
    var propertyId = req.params.propertyId;



    if (req.user.role !== "BROKER") {
        res.status(401).send({
            message: "Not allowed to create listing agent"
        });
        return
    }

    if (req.body.isExisting) {
        PropertyDetails.findByIdAndUpdate(propertyId, {
            $set: {
                agentIds: [...req.body.existing_agents, req.body.email]
            }
        }).then(property => {
            if (property) {
                console.log(property)
                res.json({
                    status: 0,
                    message: "Agent added to property",
                });
                addLogInDb({ objectType: "USER", activityType: "CREATE", application: "Users", message: `${req.body.email} agent has been added in property ${property.propertyName}`, user: req.user._id })

            } else {
                res.json({
                    status: 1,
                    message: "Failed to add to property",
                });
                return;
            }
        })
    } else {
        User.findOne({
            email: req.user.email
        }).populate("currentPackage").then((userObj) => {
            if (!userObj) {
                res.status(400).send({
                    status: 1,
                    message: "Invalid user found"
                })
                return
            }
            if (userObj.currentPackage.features.agents < (userObj.currentUsage.listingAgents + 1)) {
                res.status(400).send({
                    status: 1,
                    message: "Agent limit reached, please upgrade"
                });
                return;
            }
            const {
                first_name,
                last_name,
                email,
                existing_agents
            } = req.body;
            const password = generatePassword()

            let errors = [];

            if (!first_name || !last_name || !email) {
                errors.push({
                    msg: "Please enter all fields",
                });
            }

            if (errors.length > 0) {
                res.status(400).send({
                    status: 1,
                    message: errors
                })
            } else {
                User.findOne({
                    email: email,
                }).then((user) => {
                    if (user) {
                        res.json({
                            status: 1,
                            message: "Email exists",
                        });
                    } else {
                        const newUser = new User({
                            name: {
                                first_name,
                                last_name
                            },
                            email,
                            password,
                            role: "AGENT",
                            brokerId: req.user.id,
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then((user) => {
                                        createUserDefaultDocument(user._id)
                                        User.findOneAndUpdate({
                                            email: req.user.email
                                        }, {
                                            $set: {
                                                currentUsage: {
                                                    listingAgents: userObj.currentUsage.listingAgents + 1
                                                }
                                            }
                                        })

                                        mailService.sendEmail(newUser.email, "Agent Account created successfully", {
                                            template: mailService.templates.NEW_AGENT,
                                            password: password
                                        }, (err, info) => {
                                            if (err) {
                                                console.log(err)
                                                return
                                            }
                                            console.log(info.envelope);
                                            console.log(info.messageId);
                                        })

                                        PropertyDetails.findByIdAndUpdate(propertyId, {
                                            $set: {
                                                agentIds: [...existing_agents, user._id]
                                            }
                                        }).then(property => {
                                            if (property) {
                                                addLogInDb({ objectType: "USER", activityType: "CREATE", application: "Users", message: `${req.body.email} agent has been added in property ${property.propertyName}`, user: req.user._id })

                                                res.json({
                                                    status: 0,
                                                    message: "New Agent created",
                                                });
                                            } else {
                                                res.json({
                                                    status: 0,
                                                    message: "Agent created but failed to add to property",
                                                });
                                            }

                                        })


                                    })
                                    .catch((err) => console.log(err));
                            });
                        });
                    }
                });
            }
        });
    }


});

// Register Agent
router.get("/listing-agents", ensureAuthenticated, (req, res) => {

    if (req.user.role === "AGENT") {
        res.status(403).send({
            status: 1,
            message: "Not allowed to fetch listing agent"
        });
        return
    }

    User.find({
        brokerId: req.user._id
    }).then((userObjs) => {

        res.status(200).send({
            status: 0,
            data: userObjs.map(user => {
                return {
                    id: user._id,
                    email: user.email
                }
            })
        })

    })
});

// Get admin users
router.get("/getAllUsers", (req, res) => {

    // if (req.user.role != "ADMIN") {
    //     res.status(401).send({
    //         status: 1,
    //         message: "Not allowed to fetch all users"
    //     });
    //     return
    // }

    let skip = !!req.query.skip ? parseInt(req.query.skip) : 0
    User.find({
    }).skip(skip).limit(10000).populate("currentPackage")
        .then((userObjs) => {
            res.status(200).send({
                status: 0,
                data: userObjs
            })

        })
});

// Get logs
router.get("/getAllLogs", (req, res) => {

    // if (req.user.role != "ADMIN") {
    //     res.status(401).send({
    //         status: 1,
    //         message: "Not allowed to fetch all logs"
    //     });
    //     return
    // }

    let skip = !!req.query.skip ? parseInt(req.query.skip) : 0

    Logs.find({
    }).skip(skip).limit(100000).populate("user")
        .then((userObjs) => {
            res.status(200).send({
                status: 0,
                data: userObjs
            })

        })
});

// User Get Page
router.get("/:id?", ensureAuthenticated, (req, res) => {
    let data;
    var id = req.params.id;

    User.findOne({
        _id: id,
    }).populate('theme').populate('agentIds').then((user) => {
        if (user) {
            data = user;
        }
        res.status(200).send(data);
    })
});



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Login
router.post("/login", function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                success: false,
                status: 401
            });
        }
        if (!user.isActive) {
            return res.status(401).send({
                success: false,
                status: 401
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            addLogInDb({ objectType: "SESSION", activityType: "CREATE", application: "Session", message: `${user.email} has been logged in`, user: user._id })

            return res.status(200).send({
                message: 'success'
            });
        });
    })(req, res, next);
});

router.patch("/profile", ensureAuthenticated, function (req, res, next) {

    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: {
            timezone: req.body.timezone,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            company: req.body.company,
            country: req.body.country,
            address: req.body.address,
            city: req.body.city
        }
    }).then(user => {
        addLogInDb({ objectType: "USER", activityType: "UPDATE", application: "Users", message: `${user.email} profile has been updated`, user: req.user._id })
        res.send({
            message: "User update successfully"
        })
    }).catch((error) => {
        if (error) {
            console.error(error);
            res.status(400).send({
                message: "Failed to update user due to error: " + error
            })
        }
    })
});

router.patch("/user/:id", ensureAuthenticated, function (req, res, next) {
    var id = req.params.id;
    if (!id) {
        res.status(500).send({
            message: "Failed to update property because id not found",
        });
        return;
    }
    User.findOneAndUpdate({
        _id: id
    }, {
        $set: req.body
    }).then(user => {
        addLogInDb({ objectType: "USER", activityType: "UPDATE", application: "Users", message: `${user.email} profile has been updated by Admin`, user: req.user._id })
        res.send({
            message: "User update successfully"
        })
    }).catch((error) => {
        if (error) {
            console.error(error);
            res.status(400).send({
                message: "Failed to update user due to error: " + error
            })
        }
    })
});



router.patch("/toggleUserActive", ensureAuthenticated, function (req, res, next) {

    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: {
            isActive: req.body.isActive,
            inActiveType: req.body.inActiveType
        }
    }).then(user => {
        let type = req.body.isActive ? "activated" : "deactivated"
        addLogInDb({ objectType: "USER", activityType: "UPDATE", application: "Users", message: `${user.email} has been ${type}`, user: req.user._id })
        res.send({
            message: "User update successfully"
        })
    }).catch((error) => {
        if (error) {
            console.error(error);
            res.status(400).send({
                message: "Failed to update user due to error: " + error
            })
        }
    })
});


router.post("/change-password", ensureAuthenticated, (req, res) => {
    const {
        oldPassword,
        newPassword
    } = req.body;
    let errors = [];

    if (!oldPassword || !newPassword) {
        errors.push({
            msg: "Please enter all fields",
        });
    }

    if (newPassword.length < 6) {
        errors.push({
            msg: "Password must be at least 6 characters",
        });
    }

    if (errors.length > 0) {
        res.status(400).send({
            errors: errors
        })
    } else {
        bcrypt.compare(oldPassword, req.user.password, function (err, result) {
            if (result) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        User.findByIdAndUpdate(req.user._id, {
                            $set: {
                                password: hash
                            }
                        }).then((resp) => {
                            if (resp) {
                                addLogInDb({ objectType: "USER", activityType: "UPDATE", application: "Users", message: `${user.email} password has been changed`, user: req.user._id })

                                res.status(200).send({
                                    message: "Changed Password Successfully"
                                })
                            }
                        }).catch((error) => {
                            if (error) {
                                console.error(error);
                                errors.push({
                                    msg: "Unable to update your password",
                                });
                                res.status(400).send({
                                    errors
                                })
                            }
                        })
                    });
                });
            } else {
                errors.push({
                    msg: "Failed to change password: Old Password does not match",
                });
                res.status(400).send({
                    errors
                })
            }
        });

    }
});

router.post("/reset-password", (req, res) => {
    const {
        email
    } = req.body;

    if (!email) {
        res.status(400).send({
            errors: "Please send email in body"
        })
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                res.status(400).send({
                    errors: "Email doesnot exist"
                })
            } else {
                const password = generatePassword()
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        User.findByIdAndUpdate(user._id, {
                            $set: {
                                password: hash
                            }
                        }).then((resp) => {
                            if (resp) {
                                mailService.sendEmail(email, "Your password has been reset", {
                                    template: mailService.templates.RESET_PASSWORD,
                                    password: password
                                }, (err, info) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: "Failed to send email with new password:" + err
                                        })
                                        console.log(err)
                                        return
                                    }
                                    addLogInDb({ objectType: "USER", activityType: "UPDATE", application: "Users", message: `${user.email} profile has been reset`, user: req.user._id })

                                    console.log(info.envelope);
                                    console.log(info.messageId);
                                    res.status(200).send({
                                        message: "Email sent"
                                    })
                                    return
                                })
                            }
                        }).catch((error) => {
                            if (error) {
                                console.error(error);
                                res.status(500).send({
                                    message: "Failed to reset password :" + error
                                })
                            }
                        })
                    });
                });
            }
        })
    }
});

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// Logout
router.get("/logout", (req, res) => {
    addLogInDb({ objectType: "SESSION", activityType: "DELETE", application: "Session", message: `${user.email} has been logged out`, user: req.user._id })

    req.logout();
    res.status(200).send({
        success: true
    })
});

module.exports = router;