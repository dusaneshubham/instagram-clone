const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    fullname: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "offline"
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
        enum: ['male', 'female']
    },
    follower: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    account_type: {
        type: String,
        enum: ['public', 'private'],
        default: "public"
    },
    saved_post: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    }]
});

const user = mongoose.model("User", userSchema);

module.exports = user;