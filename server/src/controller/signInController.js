const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const user = require('../models/user');

dotenv.config();

const signInController = async(req, res) => {
    try {
        var { email, password } = req.body;

        // we find email id wheather it's available or not
        var result = await user.findOne({ email });

        if (result) {
            // now, we compare password with hash password
            var check_pass = await bcrypt.compare(password, result.password);
            if (check_pass) {

                // we are genrating a token
                const token = jwt.sign({ _id: result._id }, process.env.SECRET_MESSAGE);
                result.status = "online";
                result.token = token;
                await result.save();

                res.cookie("jwtToken", token, {
                    expires: new Date(Date.now() + 172800000),
                    httpOnly: true
                });

                res.json({ success: 1 });
            } else {
                res.json({ success: 0, error: "Password is wrong" });
            }
        } else {
            res.json({ success: 0, error: "Username is invalid" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = signInController;