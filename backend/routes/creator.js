const express = require("express");
const router = express.Router();

const Organisation = require("../models/organisation");
const User = require("../models/user");

const { ensureAuthenticated } = require("../config/auth");


router.get("/organisation-variables/:id", ensureAuthenticated, (req, res) => {

    let id = req.params.id

    Organisation.findOne({ _id: id }, { form4: 1 }).exec(function (err, data) {
        console.log(data)
        res.status(200).json({ status: true, data });
    });
})

module.exports = router;