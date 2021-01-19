//Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');


// Config
dotenv.config()
const app = express()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileupload({
  useTempFiles : true,
}))

// Controllers
const postsController = require('./controllers/posts_controller.js')
app.use('/posts', postsController)


//Database Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
// DB connection test
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Listening
app.listen(PORT, ()=>{
    console.log('listening on port: ', PORT)
})