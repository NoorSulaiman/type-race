import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import socket from 'socket.io';
import auth from './routes/auth';
import users from './routes/users';


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
    socket.on('join', email => {
        players.push({ socket, email })
        players.slice(0, - 1).map((player, indx) => {
            if (player.email === email) {
                players.pop()
                player.socket = socket;
                if (!((indx === (players.length - 1)) && (players.length % 2 !== 0))) {
                    if ((indx + 1) % 2 === 0) {
                        player.socket.on('typing', text => {
                            players[indx - 1].socket.emit('other-typing', text)
                        })
                    }
                    else if (indx % 2 === 0) {
                        player.socket.on('typing', text => {
                            players[indx + 1].socket.emit('other-typing', text)
                        })
                    }

                }
            }
        })
        console.log(players.length + ' after map')

        if (players.length && players.length % 2 === 0) {
            const newPlayers = players.slice(-2);
            newPlayers[0].socket.on('typing', text => {
                newPlayers[1].socket.emit('other-typing', text)
            })
            newPlayers[1].socket.on('typing', text => {
                newPlayers[0].socket.emit('other-typing', text)
            })
        }
    })


})

