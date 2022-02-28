const express = require('express');
const auth = require('../controller/authController');
const signUpController = require('../controller/signUpController');
const signInController = require('../controller/signInController');
const { signInValidation, signUpValidation } = require('../validation/loginRegistartionValidation');
const emailVerfication = require('../controller/emailVerification');
const sendEmail = require('../controller/sendEmail');
const { sendForgetPassEmail,forgetPass } = require('../controller/forgetPass');

//assign router
const router = express.Router();

//for authentication like user will go direct home page if once he/she has login into website
router.post('/auth', auth);

// send email verify mail
router.post('/sendmail', sendEmail)

// email verification
router.post('/emailverification', emailVerfication)

// create registration api
router.post('/register', signUpValidation, signUpController);

// send mail for forget pass
router.post('/send-forget-pass-email', sendForgetPassEmail);

// forget pass
router.post('/forget-pass', forgetPass);

// check login data wheather it's data are in database or not
router.post('/login', signInValidation, signInController);

module.exports = router;