const mongoose = require('mongoose')

const postSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    imgsrc: {type: String},
    votes: {type: Number, default: 0},
    date: {type: Date, default: () => {return Date.now()}}
})


const Post = mongoose.model('Post', postSchema)

module.exports = Post