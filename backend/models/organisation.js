var mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
  name: {
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
  form1: {
    employees: String,
    country: String,
    currency: String,
    turnover: String
  },
  form2: {
    high_users: String,
    medium_users: String,
    low_users: String
  },
  form3: {
    salary_high_users: String,
    salary_medium_users: String,
    salary_low_users: String,
    workdays: String
  },
  form4: {
    categories: Array,
    sub_categories: Array,
    descriptions: Array,
    likelihoods: Array,
    impacts: Array,
    frequencies: Array,
    ratings: Array,
    statuses: Array
  },
  departments: Array
});


const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;