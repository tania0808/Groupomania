const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/authentication');
const likeCtrl = require('../controllers/likeCtrl')

router.post("/", validateToken, likeCtrl.likePost);

module.exports = router;