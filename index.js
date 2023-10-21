import express from 'express'
// const express = require("express")
import cors from 'cors'
import router from './routes/index.js';
import mongoose from './db/index.js';
import chalk from 'chalk';
import 'dotenv/config'
import { createServer } from 'http';
import { Server } from 'socket.io';


// console.log("process.env.PORT-->", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 3000;



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log(chalk.bgGreen("db connected!"));
})

app.use(express.json());
app.use(cors());

app.use('/api', router)

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: '*' });


io.on("connection", (socket) => {
    console.log("Made socket connection", socket.id)
    socket.on("add-todo", (data) => {
        console.log(data)
        io.emit('send-todo', data)
    })
});


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})