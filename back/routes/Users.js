const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl')
const { validateToken } = require('../middleware/authentication')

router.post('/signup', userCtrl.userSignUp);
router.post('/login', userCtrl.userLogIn);
router.get('/profile', validateToken, userCtrl.getUser);

router.put('/profile', validateToken, userCtrl.modifyUser);

module.exports = router;