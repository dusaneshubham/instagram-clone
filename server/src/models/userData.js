const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    userid: {
        required: true,
        unique: true,
        type: 'string',
    },
    DOB: Date,
    bio: 'string',
    profile_pic: {
        type: 'image/.jpeg',
        default: ""
    },
    follower:'Number',
    following:'Number',
    cityAccountType:'string',
    requestVerification:'string',
    post:[]
})

const userData = mongoose.model("UserData", userDataSchema)

module.exports = userData