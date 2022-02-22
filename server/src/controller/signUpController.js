const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../models/user')

const signUpController = async (req, res) => {
    try {
        const { email, username, userid, password } = req.body

        // for check user is exist or not
        const check = await user.findOne({ userid: userid })
        if (check) {
            return res.json({ success: 0, error: "User is an already exist" })
        } else {
            const hash_password = await bcrypt.hash(password, 10)
            const result = new user({
                userid,
                username,
                email,
                password: hash_password,
            })
            await result.save()
            res.json({ success: 1 })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = signUpController