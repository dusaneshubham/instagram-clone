const verifyEmail = require("../models/verifyEmail");

const emailVerfication = async (req, res) => {
    const email = req.query.email;
    const result = await verifyEmail.findOne({ email: email });
    if (result) {
        result.status = true;
        await result.save();
        res.json({ success: 1, email: email, message: "Successfully verify your email!" });
    } else {
        res.json({ success: 0, error: "Your mail is not found on database!" })
    }
}

module.exports = emailVerfication;