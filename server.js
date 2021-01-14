//Dependencies
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


// Config
const app = express()
dotenv.config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
app.use(express.json())
app.use(express.static('public'))

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
