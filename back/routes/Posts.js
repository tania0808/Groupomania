const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const { Posts, Likes, Users } = require('../models')
const { validateToken } = require('../middleware/authentication')
const fs = require('fs');


router.get('/', validateToken, async (req, res) => {
    const posts = await Posts.findAll({include: [Likes]});
    
    if(posts === undefined) {
        res.send('No posts !!!')
    } else {
        const likedPosts = await Likes.findAll({where: { UserId: req.auth.id}})
        res.json({listOfPosts: posts, likedPosts: likedPosts, currentUser: req.auth.userId })
    }

})


router.post('/', validateToken, multer,  async (req, res) => {
    
    const post = {
        title: req.body.title,
        postText: req.body.postText,
        userId: req.auth.userId,
        userName: req.auth.userName
    }
    if(!req.file) {
        await Posts.create(post);
    } else {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        await Posts.create(post);
    }
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


router.put('/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id: id}});
    if(!post) {
        res.status(404).json('The post is not found !!!')
        return;
    } else if(req.auth.userId !== post.userId) {
        res.json('Unauthorized request !');
    }
    multer(req, res, async err => {
        const { title, postText, imageUrl} = req.body;
        if(!req.file){
            const post = await Posts.findOne({ where: { id: id}});
            if(title) post.title = title;
            if(postText) post.postText = postText;
            await post.save()
            .then(() => res.json('hiii'))
            .catch((err) => console.log(err))
        } else {
            const filename = post.imageUrl.split('/images/')[1];
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            
            if(title) post.title = title;
            if(postText) post.postText = postText;
            if(imageUrl) post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            fs.unlink(`images/${filename}`, (err) => {
                post.save() 
                res.json({post: post, image: imageUrl})  
            });
        }
    });


        // else {
        //     if(!req.file) {
        //         if(title) post.title = title;
        //         if(postText) post.postText = postText;
        //         const updatePost = await post.save()
        //         .then(() => res.json(post))
        //         .catch((err) => console.log(err))
        //     } 
        //     if(req.file) {
                
        //         const filename = post.imageUrl.split('/images/')[1];
                
        //         fs.unlink(`images/${filename}`, (err) => {
        //             if(title) post.title = title;
        //             if(postText) post.postText = postText;
        //             if(imageUrl) post.imageUrl = imageUrl;
        //             if(err) res.status(404).json('Error !');
        //             const updatePost = post.save() 
        //             .then(() => res.json(post))
        //             .catch((err) => console.log(err))
        //         });
        
        //     }
        // }

    

    

    
})






module.exports = router;