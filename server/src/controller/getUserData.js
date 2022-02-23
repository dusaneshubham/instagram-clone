const dotenv = require('dotenv')
const user = require('../models/user')

dotenv.config()

const getUserData = async(req, res, id) => {
    let userData = await user.findOne({ _id: id });
    res.json(userData);
}

module.exports = getUserData;