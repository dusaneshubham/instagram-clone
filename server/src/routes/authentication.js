const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const user = require('../models/user')
const mongoose = require('mongoose')

dotenv.config()

//assign router
const router = express.Router()

//for authentication like user will go direct home page if once he/she has login into website
router.get('/auth', async (req, res) => {
    try {
        if (typeof (req.cookies.jwtToken) !== "undefined") {
            const cookie = req.cookies.jwtToken
            const verifyToken = jwt.verify(cookie, process.env.SECRET_MESSAGE)
            const verifyUser = await user.findOne({ _id: verifyToken._id, token: cookie })
            if (!verifyUser)
                res.send(false)
            else
                res.send(true)
        }
    } catch (err) {
        console.log(err)
    }
})

// check login data wheather it's data are in database or not
router.get('/login', async (req, res) => {
    try {
        var { email, password } = req.body

        // we find email id wheather it's available or not
        var result = await user.findOne({ email })

        if (result) {
            // now, we compare password with hash password
            var check_pass = await bcrypt.compare(password, result.password)
            if (check_pass) {

                // we are genrating a token
                const token = jwt.sign({ _id: result._id }, process.env.SECRET_MESSAGE);
                result.token = token;
                await result.save();

                res.cookie("jwtToken", token, {
                    expires: new Date(Date.now() + 172800000),
                    httpOnly: true
                })

                res.json({ success: 1 })
            }
            else {
                res.json({ success: 0, error: "Password is wrong" })
            }
        } else {
            res.json({ success: 0, error: "Username is invalid" })
        }
    } catch (err) {
        console.log(err)
    }
})

// create registration api
router.post('/register', async (req, res) => {
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
                token: " "
            })
            await result.save()
            res.json({ success: 1 })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router