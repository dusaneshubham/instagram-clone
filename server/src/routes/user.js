const express = require('express');
const user = require('../models/user');
const post = require('../models/post');
const getCurrentUser = require('../middleware/getCurrentUser');

// initialized route
const route = express.Router();

route.get('/current-user', getCurrentUser, async(req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });
        console.log("curUser" + currentUser);
        return res.status(200).json(currentUser);
    } catch (err) {
        console.log(err);
    }
});

// get particular user data
route.get('/profile/:username', async(req, res) => {
    let userData = await user.findOne({ username: req.params.username });
    let userPost = await post.find({ postBy: userData._id });
    console.log(userData, userPost);
    res.status(200).json({ userData, userPost });
});

// Get All User ......
route.get('/all-user', async(req, res) => {
    try {
        const userdata = await user.find();
        res.status(200).json(userdata);
    } catch (err) {
        res.status(500).json('Something went wrong,Please try later!');
    }
});

// Update User Data like Profile Picture, Bio, City etc etc ......
route.put('/update/:id', getCurrentUser, async(req, res) => {
    const { id } = req.params;
    if (String(req.user._id) === id) {
        try {
            const user = await User.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).json("Account has been updated!");
        } catch (err) {
            res.status(500).json('Something went wrong,Please try later!');
        }
    } else {
        return res.status(403).json("You can only update your account!");
    }
});

// Follow A User .....
route.put('/follow/:id', getCurrentUser, async(req, res) => {
    const { id } = req.params;
    if (String(req.user._id) !== id) {
        try {
            const user_to_follow = await user.findById(id);
            const currentUser = req.user;
            if (user_to_follow.account_type === "public") //public
            {
                if (!user_to_follow.follower.includes(req.user._id)) {
                    await user_to_follow.updateOne({ $push: { follower: req.user.id } });
                    await currentUser.updateOne({ $push: { following: id } });
                    res.status(200).json("User has been followed");

                } else {

                    res.status(200).json("You already follow this user!");
                }
            } else { //private



            }
        } catch (err) {
            res.status(500).json('Something went wrong,Please try later!');
        }
    } else {
        return res.status(403).json("You can't follow yourself!");
    }

});

// Unfollow A User .....
route.put('/unfollow/:id', getCurrentUser, async(req, res) => {
    const { id } = req.params;
    if (String(req.user._id) !== id) {
        try {
            const user_to_follow = await user.findById(id);
            const currentUser = req.user;

            if (user_to_follow.follower.includes(req.user._id)) {
                await user_to_follow.updateOne({ $pull: { follower: req.user.id } });
                await currentUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User has been unfollowed");

            } else {

                res.status(200).json("You don't follow this user!");
            }


        } catch (err) {
            res.status(500).json('Something went wrong,Please try later!');
        }
    } else {
        return res.status(403).json("You can't follow yourself!");
    }
})

module.exports = route;