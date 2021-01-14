const mongoose = require('mongoose')

const postSchema = new mongoose.Schema ({
    username: {type: String},
    title: {type: String},
    body: {type: String},
    imgsrc: {type: String},
    votes: {type: Number, default: 0},
    date: {type: Date}
})


const Post = mongoose.model('Post', postSchema)

module.exports = Post