const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
    token: {
        type:String,
        default:""
    }
});

const user = mongoose.model("User", userSchema);

module.exports = user;