require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()


//setting up app middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/read/:collection')



module.exports = app


