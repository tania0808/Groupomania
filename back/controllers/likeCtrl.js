const { Likes } = require('../models');

exports.likePost = async (req, res) => {
    const { id } = req.body;
    const userId = req.auth.id;

    const likes = { PostId: id, UserId: userId}

    const found = await Likes.findOne({ 
        where: { UserId: userId, PostId:id }})

    if(!found) {
        await Likes.create(likes);
        res.json({liked: true})
    } else {
        await Likes.destroy({
            where: { UserId: userId, PostId:id } // TODO: refactor this
        })
        res.json({liked: false})
    }  
};