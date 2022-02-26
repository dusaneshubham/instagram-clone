const mongoose = require('mongoose');
const verifyEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

const verifyEmail = mongoose.model("VerifyEmail", verifyEmailSchema);

module.exports = verifyEmail;