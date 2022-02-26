const express = require('express');
const user = require('../models/user');
const getCurrentUser = require('../middleware/getCurrentUser');

// initialized route
const route = express.Router();

route.get('/current-user', getCurrentUser, async(req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });
        return res.status(200).json(currentUser);
    } catch (err) {
        console.log(err);
    }
});

// get particular user data
route.get('/:id', async(req, res) => {
    let userData = await user.findOne({ _id: req.params.id });
    res.status(200).json(userData);
});

module.exports = route;