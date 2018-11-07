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
import { emitToOponent } from './typeRace/handlers/emitToOponent';
import { disconnectHandler } from './typeRace/handlers/disconnectHandler';


dotenv.config()
const app = express();
app.use(bodyParser.json())
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URL);

app.use("/api/auth", auth);
app.use("/api/users", users);

app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

let io = socket(app.listen(8080, () => console.log('running on local host 8080')))


let players = [];

io.on('connection', function (socket) {
    socket.on('join', user => typeRace(user, players, socket))
    socket.on('disconnect', () => {
        emitToOponent(socket, players, 'waiting-reconnect', 'Waiting for player to reconnect')
        setTimeout(() => disconnectHandler(socket, players), 10000)
    })

})

