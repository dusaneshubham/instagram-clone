const jwt = require('jsonwebtoken');
const user = require('../models/user');


const getCurrentUser = async(req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log("not authorize", authorization);
        return res.status(401).json({ message: "Access is denied!" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET_MESSAGE, function(err, payload) {
        if (err) {
            console.log("token not match" + err);
            return res.status(401).json({ message: "Access is denied!" });
        }

        const { _id } = payload;

        user.findById(_id)
            .then(userData => {
                req.user = userData;
                next();
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            })

    });
}

module.exports = getCurrentUser;