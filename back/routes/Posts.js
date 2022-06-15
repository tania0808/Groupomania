const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const { Posts } = require('../models')


router.get('/', async (req, res) => {
    const posts = await Posts.findAll()
    res.json(posts)
})


router.post('/', multer,  async (req, res) => {
    const post = {
        title: req.body.title,
        postText: req.body.postText,
        userName: req.body.userName,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(req.file);
    await Posts.create(post);
    console.log(post);
    //res.json(post)
    res.json(req.file)
})




module.exports = router;