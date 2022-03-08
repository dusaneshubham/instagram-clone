const nodemailer = require('nodemailer');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

const sendEmail = async(req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        const result = await user.findOne({ email: email });
        if (result) {
            res.json({ success: 0, error: "User already exist" });
        } else {
            const token = await jwt.sign({
                username: username,
                fullname: fullname,
                email: email,
                password: password
            }, process.env.SECRET_MESSAGE, { expiresIn: '1h' });

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
                subject: "Instagram Email verification",
                html: `<h1>Hello,${fullname}</h1><h4>For verify your email Id <a href='http://localhost:5500/client/#!/emailverification?token=${token}'>Click here</a></h4><h5>Your email verification link expires after 1 hour</h5>`
            };

            tranport.sendMail(mail_config, async(error, response) => {
                if (error)
                    res.json({ success: 0, error: error });
                if (response) {
                    res.json({ success: 1, message: "Verification mail has been send to your email!" });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendEmail;