const express = require('express');
const router = express.Router();
const { Likes } = require('../models')
const { validateToken } = require('../middleware/authentication')


router.post("/", validateToken, async (req, res) => {
    const {id } = req.body;
    const userId = req.auth.id
    console.log(id);
    console.log(userId);

    const likes = { PostId: id, UserId: userId}

    const found = await Likes.findOne({ 
        where: { UserId: userId, PostId:id }})

    if(!found) {
        await Likes.create(likes);
        res.json({liked: true})
    } else {
        await Likes.destroy({
            where: { UserId: userId, PostId:id }
        })
        res.json({liked: false})
    }
    
})





module.exports = router;