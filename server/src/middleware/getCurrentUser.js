const jwt = require('jsonwebtoken');
const user = require('../models/user');


const getCurrentUser = async (req, res, next) => {
    console.log(req.body);
    const { token } = req.body;
    if (!token) {
        return res.json({ success: 0, error: "Access is denied!" });
    }

    jwt.verify(token, process.env.SECRET_MESSAGE, (err, payload) => {
        if (err) {
            console.log("token not match" + err);
            return res.json({ success: 0, error: "Access is denied!" });
        }

        const { _id } = payload;

        user.findById(_id)
            .then(userData => {
                req.user = userData;
                console.log(userData);
                next();
            })
            .catch(err => {
                return res.json({ success: 0, error: err });
            })

    });
}

module.exports = getCurrentUser;