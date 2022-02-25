const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const post = require('../models/post');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const postController = async(req, res) => {
    try {
<<<<<<< HEAD
        const data = req.body
        let files = req.files.photo
        const length = files.length
=======
        const data = req.body;
        let files = req.files.photo;
        const length = files.length;
>>>>>>> 317c28b0dd57ba2e02c9ba0dd553b622b1221c98
        if (length) {
            let postImages = [];
            for (i = 0; i < length; i++) {
                await cloudinary.uploader.upload(files[i].tempFilePath, (err, result) => {
                    if (result) {
<<<<<<< HEAD
                        postImages.push(result.secure_url)
=======
                        postImages.push(result.secure_url);
>>>>>>> 317c28b0dd57ba2e02c9ba0dd553b622b1221c98
                    }
                    if (err) {
                        console.log(err);
                        res.json({ success: 0, error: err });
                    }
                })
            }

            const result = new post({
<<<<<<< HEAD
                postBy: data.user._id,
=======
                postBy: req.user._id,
>>>>>>> 317c28b0dd57ba2e02c9ba0dd553b622b1221c98
                location: data.location,
                postDescription: data.description,
                post: postImages
            });

            await result.save();
            res.json({ success: 1 });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = postController;