const nodemailer = require('nodemailer');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendForgetPassEmail = async (req, res) => {
    const { email } = req.body;
    const result = await user.findOne({ email: email });
    if (result) {
        const token = jwt.sign({ email: email }, process.env.SECRET_MESSAGE, { expiresIn: '1h' });

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
            subject: "Instagram forget password",
            html: `<h1>Hello,${result.fullname}</h1><br><h4>Forget password link <a href='http://localhost:5500/client/#!/forget-pass?token=${token}'>Click here</a></h4><h5>Your email verification link expires after 1 hour</h5>`
        }

        tranport.sendMail(mail_config, (error, response) => {
            if (error)
                res.json({ success: 0, error: "Something went wrong!" });
            if (response) {
                res.json({ success: 1, message: "Forget Password link has been successfully send on your mail id!" })
            }
        });
    } else {
        res.json({ success: 0, error: "Opps,User is not found!" })
    }
}

const forgetPass = async (req, res) => {
    const { token, password } = req.body;
    const userData = jwt.verify(token, process.env.SECRET_MESSAGE)
    const result = await user.findOne({ email: userData.email });
    if (result) {
        const hashPass = await bcrypt.hash(password, 10);
        const updatePass = await user.findOneAndUpdate({ email: userData.email }, { password: hashPass }, { new: true });
        if (updatePass) {
            res.json({ success: 1, message: "successfully updated your password!" });
        }
    } else {
        res.json({ success: 0, error: "Opps,User is not found!" });
    }
}

module.exports = { sendForgetPassEmail, forgetPass }