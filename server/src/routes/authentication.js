const express = require('express');
const auth = require('../controller/authController');
const signUpController = require('../controller/signUpController');
const signInController = require('../controller/signInController');
const { signInValidation, signUpValidation } = require('../validation/loginRegistartionValidation');
const sendEmail = require('../controller/sendEmail');
const emailVerfication = require('../controller/emailVerification');
const { forgetPassSendEmail, forgetPass } = require('../controller/forgetPass');
// const mongoose = require('mongoose')

//assign router
const router = express.Router();

//for authentication like user will go direct home page if once he/she has login into website
router.get('/auth', auth);

// check login data wheather it's data are in database or not
router.post('/login', signInValidation, signInController);

// send the mail to user mail id
router.post('/email', sendEmail);

// email verification
router.get('/email_verification', emailVerfication);

// forget pass send mail
router.get('/forgetpassmail', forgetPassSendEmail);

// forget password
router.post('/forgetpass', forgetPass);

// create registration api
router.post('/register', signUpValidation, signUpController);

module.exports = router;