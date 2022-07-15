const multer = require('multer');

const MIME_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}

const storagePost = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/post');
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
    filename: function (req, file, cb) {
        const extension = MIME_TYPES[file.mimetype];
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            return cb(new Error('Only png, jpg and jpeg images are allowed'));
        }
        cb(null, Date.now() + '.' + extension);
    }
})
const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/profile');
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
    filename: function (req, file, cb) {
        const extension = MIME_TYPES[file.mimetype];
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            return cb(new Error('Only png, jpg and jpeg images are allowed'));
        }
        cb(null, Date.now() + '.' + extension);
    }
})

module.exports.savePostImage = multer({
    storage: storagePost
}).single('imageUrl');

module.exports.saveProfileImage = multer({
    storage: storageProfile
}).single('userImageUrl');