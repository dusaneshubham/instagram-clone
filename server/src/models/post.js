const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    location: {
        type: String,
        default: null
    },
    post: [{
        type: String,
        required: true
    }],
    postDescription: {
        type: String,
        default: null
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
        commentBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        commentBody: { type: String },
        commentTime: { type: String }
    }]
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

module.exports = post;