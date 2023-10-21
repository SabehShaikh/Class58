import express from 'express'
import User from '../models/User.js';
import bcrypt from "bcrypt" // password 
import jwt from "jsonwebtoken"
import Joi from 'joi';  // validation
import transporter from '../helpers/index.js';
import verifyToken from '../middleware/verifyToken.js';
import 'dotenv/config'
import { getAllUsers } from '../services/user.js';

const router = express.Router();



const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().optional().min(10),
    password: Joi.string().required().min(6)
})


router.delete('/:id', async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: "User deleted" })
})


router.get('/', verifyToken, async (req, res) => {
    const users = await getAllUsers();
    res.status(200).send({ users: users })
})



router.post('/', async (req, res) => {
    try {
        await userSchema.validateAsync(req.body)
        const password = await bcrypt.hash(req.body.password, 10)
        const user = new User({ ...req.body, password: password });
        const newUser = await user.save();
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, "SMIT")

        return res.status(200).send({ status_code: 200, message: "success", user: newUser, token })
    }
    catch (err) {
        return res.status(400).send({ status_code: 400, message: err.message })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).then(res => res.toObject());
        if (!user) {
            return res.status(401).send({ status: 401, message: "User not Found!" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(403).send({ status: 403, message: "Incorrect password!" })
        }
        delete user.password;
        const token = jwt.sign({ _id: user._id, }, process.env.JWT_SECRET)
        return res.status(200).send({ status_code: 200, message: "success", user, token })
    }
    catch (err) {
        return res.status(400).send({ status_code: 400, message: err.message })
    }
})

export default router;