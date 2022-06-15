const multer = require('multer');

const MIME_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/png': 'jpg',
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        const extension = MIME_TYPES[file.mimetype];
        cb(null, Date.now() + '.' + extension);
    }
})

module.exports = multer({storage: storage}).single('imageUrl');