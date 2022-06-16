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
    await Posts.create(post);
    res.json(post)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})






module.exports = router;