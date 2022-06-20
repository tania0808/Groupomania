const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const { Posts } = require('../models')
const { validateToken } = require('../middleware/authentication')

router.get('/', validateToken, async (req, res) => {
    const posts = await Posts.findAll()
    res.json(posts)
})


router.post('/', validateToken,  multer,  async (req, res) => {
    const post = {
        title: req.body.title,
        postText: req.body.postText,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    await Posts.create(post);
    res.json(post)
})

router.get('/:id', validateToken,  async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    const result =  {
        ...post,
        isOwnPost: req.auth.userId === post.userId
    }
    res.json(result);
})

// router.put('/:id', async (req, res) => {
//     const id = req.params.id;
//     const post = await Posts.update()
// })






module.exports = router;