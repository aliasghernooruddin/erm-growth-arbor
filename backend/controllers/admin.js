var mongoose = require('mongoose');
var Organisation = mongoose.model('Organisation');


module.exports.create = function (req, res) {

  let organisation = new Organisation(req.body);

  organisation.setPassword(req.body.password);

  organisation.save(function (err, data) {
    if (data) {
      res.status(200).json({ status: true, message: "Organisation created Successfully!" });
    }
    else {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate Organisation
        return res.status(422).json({ status: false, type: "organisation_exists", message: 'Organisation already exist!' });
      }
      return res.status(422).json({ status: false, type: err.name, message: 'Failed. Try again' });
    }
  });
};

module.exports.get = function (req, res) {
  Organisation.find({}, { hash: 0, salt: 0 }).exec(function (err, user) {
    res.status(200).json({ status: true, data: user });
  });
}