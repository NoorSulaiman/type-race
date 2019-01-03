import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import socket from 'socket.io';
import auth from './routes/auth';
import users from './routes/users';
import { typeRace } from './typeRace/typeRace';
import { disconnectHandler } from './typeRace/handlers/disconnectHandler';
import { endGameHandler } from './typeRace/handlers/endGameHandler';


dotenv.config()
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

let io = socket(app.listen(process.env.PORT || 3000, () => console.log("Listening to port 3000")))


let players = [];
let guests = [];

io.on('connection', function (socket) {
    socket.on('join', user => typeRace(user, players, guests, socket))
    socket.on('disconnect', () => {
        disconnectHandler(socket, players, guests)
    })
    socket.on('deletePlayers', () => {
        endGameHandler(socket, players, guests)
    })
    socket.on('endGameByPlayer', () => {
        disconnectHandler(socket, players, guests)
    })

})

