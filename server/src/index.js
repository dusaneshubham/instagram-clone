const express = require('express');
const app = express();
const authenticationRoute = require('./routes/authentication');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const cors = require('cors');

dotenv.config();

app.use(cors());

require('./config/dbConn');

//assign port number
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', authenticationRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log("Server is ready to run...")
});