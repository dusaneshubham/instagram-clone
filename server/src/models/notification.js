const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    from: {
        required: true,
        type: String,
    },
    type: String,
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Unread'
    }
})

const notification = mongoose.model("Notification", notificationSchema)

module.exports = notification