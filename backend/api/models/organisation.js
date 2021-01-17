var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

let organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  domain: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  hash: String,
  salt: String

});


organisationSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

organisationSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

organisationSchema.methods.generateJwt = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");
};

mongoose.model('Organisation', organisationSchema);
