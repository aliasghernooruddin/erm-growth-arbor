const express = require("express");
const router = express.Router();
const mailService = require("../services/mailService")


const Organisation = require("../models/organisation");
const User = require('../models/user');

router.post("/create-organisation", (req, res) => {

    let organisation = new Organisation(req.body);

    organisation.save(function (err, data) {
        if (data) {

            let _id = organisation._id;
            req.body['_id'] = _id
            req.body['organisationId'] = _id;
            req.body['isHead'] = true

            let user = new User(req.body);

            user.setPassword(req.body.password);

            user.save(function (err, data) {
                if (data) {

                    // send mail function starts
                    mailService.sendEmail(data.email, "Account created successfully", {
                        template: mailService.templates.NEW_USER,
                        link: "http://localhost:3000/api/v1/auth/activate-account/" + data._id,
                        password: req.body.password
                    }, (err, info) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                    })
                    // send mail function ends

                    res.status(200).json({ status: true, message: "Organisation created Successfully!" });
                }
                else {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate Organisation
                        return res.status(422).json({ status: false, type: "user_exists", message: 'User already exist!' });
                    }
                    return res.status(422).json({ status: false, type: err.name, message: err.message || 'Failed. Try again' });
                }
            });
        } else {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate Organisation
                return res.status(422).json({ status: false, type: "organisation_exists", message: 'Organisation already exist!' });
            }
            return res.status(422).json({ status: false, type: err.name, message: err.message || 'Failed. Try again' });
        }
    })

})


router.get("/get-organisations", (req, res) => {

    Organisation.find({}, { hash: 0, salt: 0 }).exec(function (err, user) {
        res.status(200).json({ status: true, data: user });
    });
})

module.exports = router;