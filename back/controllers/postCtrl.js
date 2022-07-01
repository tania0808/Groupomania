const { Posts, Likes } = require('../models')
const fs = require('fs');
const multer = require('../middleware/multer');


exports.getAllPosts = async (req, res) => {
    const posts = await Posts.findAll({include: [Likes]});
    
    if(posts === undefined) {
        res.send('No posts !!!')
    } else {
        const likedPosts = await Likes.findAll({where: { UserId: req.auth.id}})
        res.json({listOfPosts: posts, likedPosts: likedPosts, currentUser: req.auth.userId, userName: req.auth.userName })
    }

};

exports.getOnePost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    const result =  {
        ...post,
        isOwnPost: req.auth.userId === post.userId
    }
    res.json(result);
}

exports.createPost = async (req, res) => {
    
    const post = {
        postText: req.body.postText,
        userId: req.auth.userId,
        userName: req.auth.userName
    }
    if(!req.file) {
        await Posts.create(post);
        const posts = await Posts.findAll({include: [Likes]});
        res.json(posts);
    } else {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        await Posts.create(post);
        const posts = await Posts.findAll({include: [Likes]});
        res.json(posts)
    }
};

exports.deletePost =  async(req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    if(!post){
        res.status(404).json('Post was not found!')
        return
    }
    
    if(req.auth.userId === post.userId){
        if(post.imageUrl !== null) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            });
        }
    } else {
        res.json('Unauthorised request !!!');
        return;
    }
    await Posts.destroy({ where: { id: id }});
    const posts =  await Posts.findAll({include: [Likes]});
    res.json({message:'Post deleted !', posts: posts});
    console.log(post);
};

exports.updatePost = async (req, res) => {
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
            if(postText) post.postText = postText;
            await post.save()
            .then(() => res.json('hiii'))
            .catch((err) => console.log(err))
        } else {
            const post = await Posts.findOne({ where: { id: id}});

            if(post.imageUrl == null) {
                if(postText) post.postText = postText;
                post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                post.save();
                res.json({post: post, image: post.imageUrl})  

            } else {
                const filename = post.imageUrl.split('/images/')[1];
                const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                
                if(postText) post.postText = postText;
                if(imageUrl) post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                fs.unlink(`images/${filename}`, (err) => {
                    post.save() 
                    res.json({post: post, image: imageUrl})  
                });

            }

        }
    });    
};