const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const verifyEmail = require('../models/verifyEmail');

const sendEmail = (req, res) => {
    const { email } = req.body;

    const tranport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        }
    });

    const mail_config = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "Instagram email verification",
        html: `<h1>Hello, instagram user</h1><br><h5>For verify your email Id <a href='localhost:2700/email_verification?email=${email}'>Click here</a></h5>`
    }

    tranport.sendMail(mail_config, async (error, response) => {
        if (error)
            res.json({ success: 0, message: "Something went wrong!", error: error });
        else {
            const result = new verifyEmail({
                email: email
            });
            await result.save();
            res.json({ success: 1, message: "Verification mail has been successfully send!", response: response })
        }
    });
}

module.exports = sendEmail