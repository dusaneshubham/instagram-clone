const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: {
        required: true,
        type: 'string',
        unique: true
    },
    postBy: 'string',
    title:'string',
    likes: {
        type: 'Number',
        default: 0
    },
    comments:[
        {
            from:'string',
            message:'string'
        }
    ],
    post:'image/.jpeg',
    postDescription:'string'
})

const post = mongoose.model("Post", postSchema)

module.exports = post