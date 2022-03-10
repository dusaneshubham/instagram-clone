const jwt = require('jsonwebtoken');

const emailVerfication = async (req, res) => {
    try {
        const { token } = req.body;
        const result = await jwt.verify(token, process.env.SECRET_MESSAGE);
        if (result) {
            res.json({ success: 1, user: result })
        } else {
            res.json({ success: 0, error: "Invalid token OR expired" });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: 0, error: "Invalid token OR expired" });
    }
}

module.exports = emailVerfication;