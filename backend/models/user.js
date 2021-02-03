const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: { type: String, required: true },
  organisationId: { type: String, required: true },
  phone: { type: String, required: true },
  designation: String,
  isUser: { type: Boolean, default: false },
  isHead: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isFirstVisit: { type: Boolean, default: true },
  department: String,
  views: String,
  creation_date: {
    type: Date,
    default: Date.now
  },
  hash: { type: String },
  salt: { type: String },
},
  { strict: true }
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};


const User = mongoose.model("User", userSchema);

module.exports = User;