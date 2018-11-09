import randomWords from 'random-words';

export function reConnectHandler(user, players, socket) {
    const words = randomWords(3)
    players.slice(0, - 1).map((player, indx) => {
        if (player.user.email === user.email) {
            players.pop()
            player.socket = socket;
            if (!((indx === (players.length - 1)) && (players.length % 2 !== 0))) {
                if ((indx + 1) % 2 === 0) {
                    player.socket.on('typing', text => {
                        players[indx - 1].socket.emit('other-typing', text)
                    })
                    player.socket.emit('game-start', players[indx - 1].user.username)
                    players[indx - 1].socket.emit('game-start', player.user.username)
                    player.socket.emit('random-words', words)
                    players[indx - 1].socket.emit('random-words', words)
                }
                else if (indx % 2 === 0) {
                    player.socket.on('typing', text => {
                        players[indx + 1].socket.emit('other-typing', text)
                    })
                    player.socket.emit('game-start', players[indx + 1].user.username)
                    players[indx + 1].socket.emit('game-start', player.user.username)
                    player.socket.emit('random-words', words)
                    players[indx + 1].socket.emit('random-words', words)
                }

            }
            player.socket.emit('waiting', "Waiting for another player to join!")
        }
    })

}