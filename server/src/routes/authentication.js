const express = require('express');
const auth = require('../controller/authController');
const signUpController = require('../controller/signUpController');
const signInController = require('../controller/signInController');
const { signInValidation, signUpValidation } = require('../validation/loginRegistartionValidation');
const emailVerfication = require('../controller/emailVerification');
const sendEmail = require('../controller/sendEmail');

//assign router
const router = express.Router();

//for authentication like user will go direct home page if once he/she has login into website
router.post('/auth', auth);

// send email verify mail
router.post('/sendmail', sendEmail)

// email verification
router.post('/emailverification', emailVerfication)

// check login data wheather it's data are in database or not
router.post('/login', signInValidation, signInController);

// create registration api
router.post('/register', signUpValidation, signUpController);

module.exports = router;