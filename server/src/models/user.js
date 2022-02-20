const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userid: {
        required: true,
        unique: true,
        type: 'string',
    },
    username: {
        required: true,
        type: 'string',
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: 'string'
    },
    token: {
        required: true,
        type: 'string',
    }
})

const user = mongoose.model("User", userSchema)

module.exports = user