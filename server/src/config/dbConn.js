const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// assign Hostname and Database name
const dbName = process.env.DBNAME
const userName = process.env.DBUSER
const userPass = process.env.DBPASS

// Connection with Database
const url = `mongodb+srv://${userName}:${userPass}@cluster0.8yo1s.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(url).then(() => {
    console.log("Successfully connect with mongodb...")
}).catch((err) => { console.log(err) });