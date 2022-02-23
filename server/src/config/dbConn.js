const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Connection with Database
const url = process.env.MONGOOSE_URL
mongoose.connect(url).then(() => {
    console.log("Successfully connect with mongodb...")
}).catch((err) => { console.log(err) });