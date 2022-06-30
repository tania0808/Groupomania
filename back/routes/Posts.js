const express = require('express');
const multer = require('../middleware/multer');
const router = express.Router();
const { validateToken } = require('../middleware/authentication')
const postCtrl = require('../controllers/postCtrl');

router.get('/', validateToken, postCtrl.getAllPosts);
router.post('/', validateToken, multer, postCtrl.createPost);
router.delete('/:id', validateToken, postCtrl.deletePost);
router.put('/:id', validateToken, postCtrl.updatePost);

module.exports = router;