import express from 'express'
import User from '../models/User.js';
import Joi from 'joi';  // validation
import transporter from '../helpers/index.js';
import verifyToken from '../middleware/verifyToken.js';
import 'dotenv/config'
import { addPost, getAllPost } from '../services/post.js';

const router = express.Router();


const postSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
})

router.post('/', async (req, res) => {
    try {
        await postSchema.validateAsync(req.body)
        const post = await addPost(req.body)
        return res.status(200).send({
            status_code: 200,
            message: "success", post
        })

    } catch (err) {
        return res.status(400).send({ status_code: 400, message: err.message })

    }
})

router.get('/', async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const allPosts = await getAllPost(Number(skip || 0), Number(limit || 5));
        console.log("all posts->", allPosts)
        return res.status(200).send({
            status_code: 200,
            message: "success", allPosts
        })
    } catch (err) {
        return res.status(400).send({ status_code: 400, message: err.message })

    }
})

export default router;