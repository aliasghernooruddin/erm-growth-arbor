const express = require("express");
const router = express.Router();

const Organisation = require("../models/organisation");
const User = require("../models/user");
const Risk = require('../models/risk')

const { ensureAuthenticated } = require("../config/auth");


router.get("/organisation-variables/:id", ensureAuthenticated, (req, res) => {

    let id = req.params.id

    Organisation.findOne({ _id: id }, { form4: 1 }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.get("/organisation-employees/:id", ensureAuthenticated, (req, res) => {

    let id = req.params.id

    User.find({ organisationId: id, isHead: false }, { department: 1, name: 1 }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.post("/create-risk", ensureAuthenticated, (req, res) => {

    let risk = new Risk(req.body);
    risk['level'] = 'Risk Owner'

    risk.save(function (err, data) {
        if (data) {
            res.status(200).json({ status: true, message: "Risk created Successfully!" });
        }
        else {
            console.log(err.message)
            return res.status(422).json({ status: false, type: err.name, message: err.message + ' Failed. Try again' });
        }
    });
})


router.get("/get-risks/:id", ensureAuthenticated, (req, res) => {

    let id = req.params.id

    Risk.find({ organisationId: id }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})



module.exports = router;