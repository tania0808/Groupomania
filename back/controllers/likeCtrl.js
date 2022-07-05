const { Likes } = require('../models');

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
        res.json({ liked: true });
        return;
    } 
    await Likes.destroy({ where: likes });
    res.json({ liked: false });
};