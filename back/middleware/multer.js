const multer = require('multer');

const MIME_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
    filename: function (req, file, cb) {
        const extension = MIME_TYPES[file.mimetype];
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, Date.now() + '.' + extension);
    }
})

module.exports = multer({
    storage: storage
}).single('imageUrl');