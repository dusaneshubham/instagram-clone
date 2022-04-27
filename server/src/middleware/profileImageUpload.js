const multer = require('multer');

const profileImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/profile_images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const uploadProfile = multer({ storage: profileImageStorage });

module.exports = uploadProfile;