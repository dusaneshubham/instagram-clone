const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    location: String,
    post: {
        type: Array,
        required: true,
        default: []
    },
    postDescription: String,
    likes: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: 'User'
        }
    ],
    comments: [
        {
            commentBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
            commentBody: { type: String },
            commentTime: { type: String }
        }
    ]
});

const post = mongoose.model("Post", postSchema);

module.exports = post;