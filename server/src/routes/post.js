const express = require('express')
const getUserName = require('../middleware/getUserName')
const postController = require('../controller/postController')

// initialized route
const route = express.Router()

route.post("/", getUserName, postController)

module.exports = route