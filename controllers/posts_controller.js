const express = require('express');
const posts = express.Router()

const Post = require("../models/post.js");


//Read
posts.get('/', (req, res) => {
    Post.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    })
})

//Create
posts.post('/', (req, res) => {
    Post.create(req.body, (err, data) => {
        Post.find({}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        })
    })
})

//Update
posts.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, data) => {
            if (err) {
                res.send(err)
            } else {
                Post.find({}, (err, data) => {
                    res.json(data)
                })
            }
        }
    )
})

//Delete
posts.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, data)=>{
        Post.find({}, (err, data)=>{
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        })
    })
})


module.exports = posts;
