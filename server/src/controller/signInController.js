const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const user = require('../models/user');

dotenv.config();

const signInController = async (req, res) => {
    try {
        var { username, password } = req.body;

        // we find email id wheather it's available or not
        var result = await user.findOne({ username });

        if (result) {
            // now, we compare password with hash password
            var check_pass = await bcrypt.compare(password, result.password);
            if (check_pass) {

                // we are genrating a token
                const token = jwt.sign({ _id: result._id }, process.env.SECRET_MESSAGE);
                result.status = "online";
                await result.save();

                const { _id, username } = result;

                return res.status(200).json({ success: 1, token: token, user: { _id, username } });
            } else {
                return res.json({ success: 0, error: "Invalid password!" });
            }
        } else {
            return res.json({ success: 0, error: "Username not found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = signInController;