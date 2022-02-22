const express = require('express')
const app = express()
const Route = require('./routes/authentication')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

require('./config/dbConn')

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