const { Posts, Likes, Users } = require('../models')
const multer = require('../middleware/multer');
const fs = require('fs');
require('dotenv').config();

console.log(process.env)

/**
 * Get a list of all posts and list of liked posts from database
 * @returns {Object} listOfPosts, likedPosts, user id
 */
exports.getAllPosts = async (req, res) => {
    const posts = await Posts.findAll({ include: [Likes, {model: Users, attributes: ['userName', 'userImageUrl', 'userPosition']}] });

    if(posts === undefined) {
        res.status(400).json({ listOfPosts: null, likedPosts: null, id: req.auth.id });
        return;
    }

    const likedPosts = await Likes.findAll({ where: { UserId: req.auth.id } });
    res.status(200).json({ listOfPosts: posts, likedPosts: likedPosts, id: req.auth.id });
};
/**
 * Get information of specific post
 * @returns {Object} post data
 */
exports.getOnePost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    const result =  {
        ...post,
        isOwnPost: req.auth.id === post.UserId || req.auth.isAdmin
    };

    res.status(200).json(result);
}


/**
 * Create post
 * @returns {Array} All posst after creating one post
 */
exports.createPost = async (req, res) => {
    const post = {
        postText: req.body.postText,
        UserId: req.auth.id
    };

    if(req.file) {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
    }

    await Posts.create(post);

    const posts = await Posts.findAll({ include: [Likes, { model: Users, attributes: ['userName', 'userImageUrl'] }] });
    res.status(201).json(posts);
};

/**
 * Delete a specific post
 * @returns {Array} List of all posts after deleting a pecific post
 */
exports.deletePost =  async(req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    if(!post){
        res.status(404).json('Post was not found!');
        return;
    }
    
    if(req.auth.id === post.UserId || req.auth.isAdmin){
        if(post.imageUrl !== null) {
            const filename = post.imageUrl.split('/images/post/')[1];
            fs.unlink(`images/post/${filename}`, () => {
            });
        }
    } else {
        res.status(401).json('Unauthorised request !!!');
        return;
    }

    await Posts.destroy({ where: { id: id }});

    const posts =  await Posts.findAll({ include: [Likes, { model: Users, attributes: ['userName', 'userImageUrl'] } ]});
    res.status(200).json({ message:'Post is deleted !', posts: posts });
};

/**
 * Update a post
 * @returns updated post and url of the image
 */
exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id: id } });

    if(!post) {
        res.status(404).json('The post is not found !!!')
        return;
    } 
    
    else if(req.auth.id !== post.UserId) {
        res.status(401).json('Unauthorized request !');
    }

    multer.savePostImage(req, res, async () => {
        const { postText } = req.body;
        const post = await Posts.findOne({ where: { id: id }});
        
        if(!req.file){
            if(postText) post.postText = postText;
            await post.save();
            res.status(200).json({ post: post }); 
            return;
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;

        if(post.imageUrl !== null) {
            const filename = post.imageUrl.split('/images/post/')[1];
            fs.unlink(`images/post/${filename}`, (err) => {
                if(postText) post.postText = postText;
                if(imageUrl) post.imageUrl = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
                post.save();
                res.status(200).json({ post: post, image: imageUrl }); 
            });
            return;
        }

        if(postText) post.postText = postText;
        if(imageUrl) post.imageUrl = imageUrl;
        post.save();
        res.status(200).json({ post: post, image: imageUrl }); 
    });    
};
