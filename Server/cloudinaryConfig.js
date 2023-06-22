const dotenv = require("dotenv")
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// const storage = new CloudinaryStorage ({
//     cloudinary,
//     params: {
//     folder: 'Products',
//     allowedFormats: ['jpeg', 'png', 'jpg']
//     }
// });

module.exports = {
    cloudinary,
    // storage
}