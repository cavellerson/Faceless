//Dependencies
const express = require('express');
const posts = express.Router()
const cloudinary = require('cloudinary').v2;

//Post Collection
const Post = require("../models/post.js");


//Read All
posts.get('/', (req, res) => {
    Post.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    })
})

//Read One
posts.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

// Create
posts.post('/', (req, res) => {
    if (!req.files) {
        console.log(req.body)
        Post.create(req.body, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        })
    } else {
        console.log(req.files, "req")
        const img = req.files.imgsrc.tempFilePath
        cloudinary.uploader.upload(img, (err, data) => {
            if (err) {
                console.log(err, "THIS")
            } else {
                console.log(data)
                req.body.imgsrc = data.url
                Post.create(req.body, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(data)
                    }
                })
            }
        })
    }
})

//Update
posts.put('/:id', (req, res) => {
    console.log(req.body)
    Post.findByIdAndUpdate(
        req.params.id,
        {
            votes: req.body.votes,
            $addToSet : { comments: req.body.comments }
        },
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
