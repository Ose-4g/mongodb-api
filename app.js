require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require("./error/errorHandler");
const AppError = require("./error/appError");

const {
    getAllCollections,
    find
} = require('./controllers/crud/read')

const {
    insertOne
} = require('./controllers/crud/write')

const app = express()


//setting up app middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//base routes

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to the test zuri-core api. It is just for use during development as we await from team newton"
    })
})




//routes to read from db

//get a list of all collections
app.get('/collections',getAllCollections)

//get all documents in a collection
app.get('/:collection/find',find)





//routes to write to db

//create a new document in a collection
app.post('/:collection/insert-one',insertOne)



//for invalid route
app.use((req,res,next)=>{
    return next(new AppError("Specified route does no exist on this server",404))
})

//error handler
app.use(errorHandler)


module.exports = app


