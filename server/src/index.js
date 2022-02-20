const express = require('express')
const app = express()
const Route = require('./routes/authentication')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

require('./config/dbConn')
// assign Hostname and Database name
// const host = process.env.HOSTNAME
// const dbName = process.env.DBNAME
// const userName = process.env.DBUSER
// const userPass = process.env.DBPASS

// // Connection with Database
// const url = `mongodb+srv://${userName}:${userPass}@cluster0.8yo1s.mongodb.net/${dbName}?retryWrites=true&w=majority`
// mongoose.connect(url).then(() => {
//     console.log("Successfully connect with mongodb...")
// }).catch((err) => { console.log(err) });

//assign port number
const PORT = process.env.PORT

//create api
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/', Route)

app.listen(PORT, () => {
    console.log("Server is ready to run...")
})