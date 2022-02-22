const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        length: 10,
    },
    DOB: Date,
    bio: 'string',
    profile_pic: {
        type: String,
        required: true,
        default: "https://www.scimed.co.uk/wp-content/uploads/2019/05/profile.jpg"
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    follower: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: 'User'
        }
    ],
    account_type: {
        type: String,
        enum: ['public', 'private'],
        default: "public"
    },
    saved_post: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    }]
})

const userData = mongoose.model("UserData", userDataSchema)

module.exports = userData