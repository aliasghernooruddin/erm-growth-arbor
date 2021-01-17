var mongoose = require('mongoose');
var Organisation = mongoose.model('Organisation');

module.exports.add = function (req, res) {

    var organisation = new Organisation(req.body);

    organisation.save(function (err, data) {
        if (data) {
            res.status(200).json({ success: true, message: "Organisation created Successfully!" });
        }
        else {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).json({ succes: false, type: "organisation_exists", message: 'Organisation already exist!' });
            }
            res.status(422).json({ success: false, type: err.name, message: 'Failed. Try again' });
        }
    });

};


module.exports.get = function (req, res) {
    Organisation.find().exec(function (err, data) {
        res.status(200).json({ status: true, data });
    });
}

