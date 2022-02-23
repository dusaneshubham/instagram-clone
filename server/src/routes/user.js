const express = require('express')
const user = require('../models/user');

// initialized route
const route = express.Router()

// get particular user data
route.get("/:id", async(req, res) => {
    let userData = await user.findOne({ _id: req.params.id });
    res.json(userData);
});

module.exports = route