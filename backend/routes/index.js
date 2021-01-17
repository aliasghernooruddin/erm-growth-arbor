const router = require('express').Router;

const ctrlAuth = require('../controllers/authentication');
const ctrlAdmin = require('../controllers/admin');
const ctrlOrganisation = require('../controllers/organisation');

// user module
router.post('/register-user', ctrlAuth.register);
router.post('/auth/login', ctrlAuth.login);

//admin module
router.post('/admin/create-organisation', ctrlAdmin.create)
router.get('/admin/get-organisations', ctrlAdmin.get)

// organisation model
router.post('/add-organisation', ctrlOrganisation.add);
router.get('/get-organisation', ctrlOrganisation.get);

module.exports = router;
