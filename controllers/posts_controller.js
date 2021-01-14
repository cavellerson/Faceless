const express = require('express');
const posts = express.Router()

const Post = require("../models/post.js");

posts.get('/', (req, res) => {
    res.send("hello world")
})


module.exports = posts;
