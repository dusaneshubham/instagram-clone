const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    location: String,
<<<<<<< HEAD
    post: [
        {
            type: String,
            required: true
        }
    ],
=======
    post: [{
        type: String,
        required: true
    }],
>>>>>>> 317c28b0dd57ba2e02c9ba0dd553b622b1221c98
    postDescription: String,
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    comments: [{
        commentBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        commentBody: { type: String },
        commentTime: { type: String }
    }]
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

module.exports = post;