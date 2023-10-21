import express from 'express'
import multer from 'multer';
import fs from 'fs-extra'
import cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name: 'dy9nh3rnt',
    api_key: '873826781663124',
    api_secret: 'z4kN3EKfC26Vxooap0ZMkumUFRo'
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {

    fs.readdirSync("images/").forEach(file => {
        console.log(file);
        cloudinary.v2.uploader.upload(`images/${file}`,
            {}, (error, result) => {
                fs.remove(`images/${file}`, err => {
                    if (err) return console.error(err)
                    console.log('success!')
                })
                if (error) {
                    return res.status(400).send({ error })
                }
                res.status(200).send({ url: result.url })
            });
    });
})


export default router;