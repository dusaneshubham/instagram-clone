const jwt = require('jsonwebtoken')

const auth =  async (req, res) => {
    try {
        if (typeof (req.cookies.jwtToken) !== "undefined") {
            const cookie = req.cookies.jwtToken
            const verifyToken = jwt.verify(cookie, process.env.SECRET_MESSAGE)
            const verifyUser = await user.findOne({ _id: verifyToken._id, token: cookie })
            if (!verifyUser)
                res.json({ succes: 0, error: 'Access is denied!' })
            else
                res.send({ succes: 1 })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = auth