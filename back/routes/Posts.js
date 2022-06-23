const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const { Posts, Likes } = require('../models')
const { validateToken } = require('../middleware/authentication')
const fs = require('fs');

router.get('/', validateToken, async (req, res) => {
    const posts = await Posts.findAll({include: [Likes]});

    const likedPosts = await Likes.findAll({where: { UserId: req.auth.id}})
    res.json({listOfPosts: posts, likedPosts: likedPosts})
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

router.delete('/:id', validateToken, async(req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    
    if(!post){
        res.status(404).json('Post was not found!')
    } else {
        const filename = post.imageUrl.split('/images/')[1];
        
        if(req.auth.userId === post.userId){
            fs.unlink(`images/${filename}`, () => {
                Posts.destroy({ where: { id: id }});
                res.json('Post deleted !');
            });
        } else {
            res.json('Unauthorised request !!!')
        }
    }
    console.log(post);
})

router.put('/:id', validateToken, multer,  async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id: id}});
    console.log(post);
    const { title, postText} = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    console.log(imageUrl);

    if(!post) {
        res.status(404).json('The post is not found !!!')
    } else {
        if(req.auth.userId !== post.userId) {
            res.json('Unauthorized request !')
        } else {
            if(!req.file) {
                if(title) post.title = title;
                if(postText) post.postText = postText;
                const updatePost = await post.save()
                .then(() => res.json(post))
                .catch((err) => console.log(err))
            } 
            if(req.file) {
                
                const filename = post.imageUrl.split('/images/')[1];
                
                fs.unlink(`images/${filename}`, (err) => {
                    if(title) post.title = title;
                    if(postText) post.postText = postText;
                    if(imageUrl) post.imageUrl = imageUrl;
                    if(err) res.status(404).json('Error !');
                    const updatePost = post.save() 
                    .then(() => res.json(post))
                    .catch((err) => console.log(err))
                });
        
            }
        }

    }

    

    
})






module.exports = router;