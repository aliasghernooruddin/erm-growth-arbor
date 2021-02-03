const express = require("express");
const router = express.Router();
const mailService = require("../services/mailService")

const Organisation = require("../models/organisation");
const User = require("../models/user");

const { ensureAuthenticated } = require("../config/auth");


router.post("/update-organisation", ensureAuthenticated, (req, res) => {
    let data = req.body

    Organisation.findOneAndUpdate({
        _id: data['id']
    }, {
        $set: {
            [data['form']]: req.body
        }
    }).then(user => {
        res.status(201).json({ status: true, data: user, message: 'Successfully Updated!' });
    }).catch((error) => {
        if (error) {
            res.status(400).send({ status: false, message: "Failed to update user due to error: " + error })
        }
    })
})


router.get("/get-organisation", ensureAuthenticated, (req, res) => {
    let id = req.session.passport.user;
    Organisation.findOne({ _id: id, }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.post("/add-department", ensureAuthenticated, (req, res) => {

    Organisation.findOneAndUpdate({
        _id: req.session.passport.user
    }, {
        $push: {
            departments: req.body.department
        }
    }).then(user => {
        res.status(201).json({ status: true, data: user, message: 'Successfully Added!' });
    }).catch((error) => {
        if (error) {
            res.status(400).send({ status: false, message: "Failed to update user due to error: " + error })
        }
    })
})


router.get("/get-departments-dropdown", ensureAuthenticated, (req, res) => {
    let id = req.session.passport.user;
    Organisation.findOne({ _id: id }, { departments: 1 }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.post("/add-employee", ensureAuthenticated, (req, res) => {

    let user = new User(req.body);

    let password = req.body.password ? req.body.password : '12345678'

    user.setPassword(password);

    user.save(function (err, data) {
        if (data) {

            if (data._doc['isUser']) {
                // send mail function starts
                mailService.sendEmail(data.email, "Account created successfully", {
                    template: mailService.templates.NEW_USER,
                    link: "http://localhost:3000/api/v1/auth/activate-account/" + data._id,
                    password
                }, (err, info) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                })

            }
            res.status(200).json({ status: true, message: "Account created Successfully!" });
        }
        else {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate Organisation
                return res.status(422).json({ status: false, type: "user_exists", message: 'User already exist!' });
            }
            return res.status(422).json({ status: false, type: err.name, message: 'Failed. Try again' });
        }
    });
})


router.get("/get-employees", ensureAuthenticated, (req, res) => {
    let id = req.session.passport.user
    User.find({ organisationId: id }, { hash: 0, salt: 0 }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.get("/get-employee", ensureAuthenticated, (req, res) => {
    let _id = req.session.passport.user
    User.findOne({ _id }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


module.exports = router;