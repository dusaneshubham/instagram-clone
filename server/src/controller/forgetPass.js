const nodemailer = require('nodemailer');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const forgetPassSendEmail = async (req, res) => {
    const { email } = req.body;
    const result = await user.findOne({ email: email });
    if (result) {
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
            html: `<h1>Hello,Instagram user</h1><br><h5>Forget password link <a href='localhost:2700/email_verification?email=${email}'>Click here</a></h5>`
        }

        tranport.sendMail(mail_config, async (error, response) => {
            if (error)
                res.json({ success: 0, message: "Something went wrong!", error: error });
            else {
                res.json({ success: 1, message: "Forget Password mail has been successfully send on your mail id!", response: response })
            }
        });
    } else {
        res.json({ success: 0, error: "Opps,User is not found!" })
    }
}

const forgetPass = async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const { password } = req.body;
    const result = await user.findOne({ email: email });
    if (result) {
        const hashPass = await bcrypt.hash(password, 10);
        const updatePass = await user.findOneAndUpdate({ email: email }, { password: hashPass }, { new: true });
        console.log(updatePass);
        if (updatePass) {
            res.json({ success: 1, message: "successfully update your password!" });
        }
    } else {
        res.json({ success: 0, error: "Opps,User is not found!" });
    }

}

module.exports = { forgetPassSendEmail, forgetPass }