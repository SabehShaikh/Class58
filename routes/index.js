import express from 'express'
import user from "../controller/user.js"
import post from '../controller/post.js'
import product from './product.js'
import upload from './upload.js'

const router = express.Router();

router.use('/user', user)
router.use('/post', post)
router.use('/product', product)
router.use('/upload', upload)

export default router;