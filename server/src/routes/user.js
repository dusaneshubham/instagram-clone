const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const post = require('../models/post');
const getCurrentUser = require('../middleware/getCurrentUser');
// const uploadProfile = require('../middleware/profileImageUpload');
const upload = require('../middleware/postImageUpload');

// initialized route
const route = express.Router();

route.post('/current-user', getCurrentUser, async (req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });
        return res.status(200).json(currentUser);
    } catch (err) {
        console.log(err);
    }
});

// get particular user data
route.get('/profile/:username', async (req, res) => {
    let userData = await user.findOne({ username: req.params.username });
    let userPost = await post.find({ postBy: userData._id });
    // console.log(userData, userPost);
    res.status(200).json({ userData, userPost });
});

// Get All User ......
route.get('/all-user', async (req, res) => {
    try {
        const userdata = await user.find();
        res.status(200).json(userdata);
    } catch (err) {
        res.status(500).json('Something went wrong,Please try later!');
    }
});

// Update User Data like Profile Picture, Bio, City etc ......
// route.post('/update', uploadProfile.single('profile_pic'), async (req, res) => {
//     try {
//         // req.body.imagepath = "http://localhost:2700/profileimages/" + req.file.filename;
//         const result = await jwt.verify(req.body.token, process.env.SECRET_MESSAGE);
//         if (result) {
//             User = await user.findOneAndUpdate({ _id: result._id }, {fullname:req.body.fullname}, { new: true });
//             if (User) {
//                 res.json({ success: 1, message: "User details has been updated!" });
//             } else {
//                 res.json({ success: 0, error: "User is not found!" });
//             }
//             res.json({ success: 1, message: "User details has been updated!" });
//         } else {
//             res.json({ success: 0, error: "Invalid token id!" });
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// });

// Follow A User .....
route.put('/follow/:id', getCurrentUser, async (req, res) => {
    const { id } = req.params;
    if (String(req.user._id) !== id) {
        try {
            const user_to_follow = await user.findById(id);
            const currentUser = req.user;
            if (user_to_follow.account_type === "public") {
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
route.put('/unfollow/:id', getCurrentUser, async (req, res) => {
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