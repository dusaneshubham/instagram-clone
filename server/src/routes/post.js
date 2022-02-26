const express = require('express');
const getCurrentUser = require('../middleware/getCurrentUser');
const postController = require('../controller/postController');
const post = require('../models/post');

// initialized route
const route = express.Router();

// create a post
route.post("/create-post", getCurrentUser, postController);

// delete a post
route.delete('/delete/:id', getCurrentUser, async(req, res) => {
    try {
        const postPresent = await post.find({ _id: req.params.id });
        if (postPresent) {
            await post.deleteOne({ _id: req.params.id })
                .then(() => {
                    return res.status(200).json({ message: "Post Deleted!" });
                })
                .catch(err => {
                    return res.status(500).json({ message: "Unable to delete the post due to some error" });
                });
        }
    } catch (error) {
        console.log(error);
    }
});

// get current user's post
route.get("/current-user-all-posts", getCurrentUser, async(req, res) => {
    try {
        let currentUserPosts = await post.find({ userid: req.user._id }).populate('postBy', 'username');
        return res.status(200).json(currentUserPosts);
    } catch (err) {
        return res.status(500).json({ message: error });
    }
});

// get all post of particular user
route.get('/user-all-posts/:id', getCurrentUser, async(req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: "Access Denied!" });
    } else {
        try {
            const posts = await post.find({ postBy: req.params.id }).populate('comments.commentBy', 'username');
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
});

// get single post of any user including current user also
route.get('/user-single-post/:post_id', getCurrentUser, async(req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: "Access Denied!" });
    } else {
        try {
            const particularPost = await post.find({ _id: req.params.post_id }).populate('postBy', 'username');
            console.log(particularPost)
            return res.status(200).json(particularPost);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
});

// like the post
route.put('/like/:id', getCurrentUser, async(req, res) => {
    try {
        const currentPost = await post.findById(req.params.id);
        if (!currentPost.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } })
            return res.status(200).json("Post liked !")
        } else {
            return res.status(401).json("You already liked !")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Something wrong !")
    }
})

// unlike the post
route.put('/dislike/:id', getCurrentUser, async(req, res) => {
    try {
        const particularPost = await post.findById(req.params.id);
        if (particularPost.likes.includes(String(req.user._id))) {
            await post.updateOne({ $pull: { likes: String(req.user._id) } })
            return res.status(200).json("Post disliked !")
        } else {
            return res.status(401).json("You already disliked !")
        }
    } catch (error) {
        return res.status(500).json("Something wrong !")
    }
});

// comment a post
route.put('/comment/:id', getCurrentUser, async(req, res) => {
    const postId = req.params.id;
    try {
        const obj = {
            commentBy: req.user._id,
            commentBody: req.body.comment,
            commentTime: Date.now()
        }
        await post.findByIdAndUpdate(postId, { $push: { comments: obj } })
            .then(() => {
                return res.status(200).json("Comment added to this post !");
            })
            .catch(err => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }
});

// update our own post description 
route.put('/update-post-description/:id', getCurrentUser, async(req, res) => {
    try {
        let postId = req.params.id;
        let particularPost = await post.findOne({ _id: postId });

        // checking that post is created by logged in user or not
        if (String(particularPost.postBy) == String(req.user._id)) {
            await post.findByIdAndUpdate(postId, { $set: { postDescription: req.body.description } })
                .then(() => {
                    return res.status(200).json("Description updated !");
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            return res.json("This post is not created by you. So you can't edit it.");
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = route;