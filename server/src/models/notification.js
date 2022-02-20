const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    username: {
        required: true,
        type: 'string',
    },
    from:{
        required: true,
        type: 'string',
    },
    type:{
        type:'string'
    },
    message:'string',
    status:'string'
})

const notification = mongoose.model("Notification",notificationSchema)

module.exports = notification