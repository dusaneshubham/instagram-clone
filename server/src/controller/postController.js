const post = require('../models/post');
const path = require('path');

const postController = async (req, res) => {
    try {
        console.log(req.files)
        // const data = req.body;
        // let files = req.files;
        // const length = files.length;
        // if (length) {
        //     let postImages = [];
        //     for (i = 0; i < length; i++) {
        //         let imagePath = path.join(`http://localhost:${process.env.PORT}/images`, req.files[i].filename);
        //         postImages.push(imagePath);
        //     }

        //     const result = new post({
        //         postBy: req.user._id,
        //         location: data.location,
        //         postDescription: data.description,
        //         post: postImages
        //     });

        //     await result.save();

        //     res.json({ success: 1, message: "Post has been posted!" });
        // } else {
        //     res.json({ success: 0, error: "Something went wrong!" });
        // }
    } catch (err) {
        console.log(err);
    }
}

module.exports = postController;