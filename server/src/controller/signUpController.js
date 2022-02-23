const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../models/user')

const signUpController = async (req, res) => {
    try {
        const data = req.body

        // for check user is exist or not
        const check = await user.findOne({ username: data.username })
        if (check) {
            return res.json({ success: 0, error: "User is an already exist" })
        } else {
            const hash_password = await bcrypt.hash(data.password, 10)
            let result = new user({
                username: data.username,
                fullname: data.fullname,
                email: data.email,
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