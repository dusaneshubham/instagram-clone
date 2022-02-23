const express = require('express')
const app = express()
const authenticationRoute = require('./routes/authentication')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')


dotenv.config()

require('./config/dbConn')

//assign port number
const PORT = process.env.PORT

//create api
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/', authenticationRoute)
app.use('/post', postRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log("Server is ready to run...")
})