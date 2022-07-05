const { Posts, Likes, Users } = require('../models')
const fs = require('fs');
const multer = require('../middleware/multer');
require('dotenv').config();


exports.getAllPosts = async (req, res) => {

    const posts = await Posts.findAll({include: [Likes, {model: Users, attributes: ['userName']}]}); // TODO: paginate results

    if(posts === undefined) {
        res.json({listOfPosts: null, likedPosts: null }) // TODO: always return an object with same properties as the object below
        return
    }
    const likedPosts = await Likes.findAll({where: { UserId: req.auth.id }});
    res.json({listOfPosts: posts, likedPosts: likedPosts, id: req.auth.id })

};

exports.getOnePost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    const result =  {
        ...post,
        isOwnPost: req.auth.id === post.UserId || req.auth.isAdmin
    }
    res.json(result);
}

exports.createPost = async (req, res) => {
    const post = {
        postText: req.body.postText,
        UserId: req.auth.id
    }

    if(req.file) {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    await Posts.create(post);
    const posts = await Posts.findAll({include: [Likes, {model: Users, attributes: ['userName']}]});
    res.json(posts)
};

exports.deletePost =  async(req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    if(!post){
        res.status(404).json('Post was not found!')
        return
    }
    
    if(req.auth.id === post.UserId || req.auth.isAdmin){
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
    const posts =  await Posts.findAll({include: [Likes, {model: Users, attributes: ['userName']}]});
    res.json({message:'Post deleted !', posts: posts});
};

exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id: id}});
    if(!post) {
        res.status(404).json('The post is not found !!!')
        return;
    } else if(req.auth.id !== post.UserId) {
        res.json('Unauthorized request !');
    }

    multer(req, res, async err => {
        const { postText } = req.body;
        const post = await Posts.findOne({ where: { id: id}});
        
        if(!req.file){
            if(postText) post.postText = postText;
            await post.save();
            res.json('Post modified !!!');
            return
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        if(post.imageUrl !== null) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if(postText) post.postText = postText;
                if(imageUrl) post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                post.save();
                res.json({post: post, image: imageUrl}); 
            });
            return;
        }

        if(postText) post.postText = postText;
        if(imageUrl) post.imageUrl = imageUrl;
        post.save();
        
        res.json({post: post, image: imageUrl}); 
    });    
};
