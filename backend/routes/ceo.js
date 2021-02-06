const express = require("express");
const router = express.Router();

const Risk = require('../models/risk')

const { ensureAuthenticated } = require("../config/auth");


router.get("/get-risks/:id", ensureAuthenticated, (req, res) => {

    let id = req.params.id

    Risk.find({ organisationId: id }).exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
})


router.post("/update-risk", ensureAuthenticated, (req, res) => {

    let data = req.body
    
    if (data['type'] == 'approve') {

        Risk.findByIdAndUpdate(data['_id'], {
            $set: {
                isApproved: true,
                level: null
            }
        }).then((usr) => {
            if (usr) {
                res.status(200).json({ status: true, message: 'Approved by CEO' });
            }
        }).catch((err) => {
            res.status(400).json({ status: false, message: err.message });
        })
    }
    else {
        Risk.findByIdAndUpdate(data['_id'], {
            $set: {
                level: 'Risk Owner',
                comments: data['comments']
            }
        }).then((usr) => {
            if (usr) {
                res.status(200).json({ status: true, message: 'Comments Added' });
            }
        }).catch((err) => {
            res.status(400).json({ status: false, message: err.message });
        })
    }
})

module.exports = router;