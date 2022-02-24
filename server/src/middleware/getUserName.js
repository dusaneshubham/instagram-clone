const jwt = require('jsonwebtoken')
const user = require('../models/user')

const getUserName = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken
        const verifyToken = await jwt.verify(token, process.env.SECRET_MESSAGE)
        const verifyUser = await user.findOne({ _id: verifyToken._id })
        if (verifyUser) {
            req.body.user = verifyUser
            next()
        } else {
            res.json({ success: 0, error: "Access is denied!" })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = getUserName