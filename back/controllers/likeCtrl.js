const { Likes } = require('../models');

/**
 * Like a user's post
 * @returns {Object} liked: true or false
 */
exports.likePost = async (req, res) => {
    const { id } = req.body;
    const userId = req.auth.id;

    const likes = { 
        PostId: id, 
        UserId: userId
    };

    const found = await Likes.findOne({ where: likes });

    if(!found) {
        await Likes.create(likes);
        res.status(200).json({ liked: true });
        return;
    } 
    await Likes.destroy({ where: likes });
    res.status(200).json({ liked: false });
};