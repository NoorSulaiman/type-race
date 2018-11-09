import randomWords from 'random-words';

export function roundHandler(players) {
    const newPlayers = players.slice(-2);
    const words = randomWords(3);

    if (newPlayers[0].socket._eventsCount < 3) {
        console.log('from roundHandler');

        //text stream
        newPlayers[0].socket.on('typing', text => {
            newPlayers[1].socket.emit('other-typing', text)
        })
        newPlayers[1].socket.on('typing', text => {
            newPlayers[0].socket.emit('other-typing', text)
        })
        //game start
        newPlayers[0].socket.emit('game-start', newPlayers[1].user.username)
        newPlayers[1].socket.emit('game-start', newPlayers[0].user.username)
        newPlayers.map(player => {
            player.socket.on('start-rounds', () => {
                console.log(player.rounds.length)
                if (player.rounds.length === 0) {
                    player.socket.emit('round-1', words[0])
                } else if (player.rounds.length === 1) {
                    player.socket.emit('round-2', words[1])
                } else if (player.rounds.length === 2) {
                    player.socket.emit('round-3', words[2])
                }
                else {
                    const rounds = player.rounds.reduce((a, b) => a + b, 0)
                    player.socket.emit('game-end', rounds)
                }
            })
            player.socket.on('round-1-end', (email) => {
                if (newPlayers[0].user.email === email) {
                    newPlayers[0].rounds.push(1)
                    newPlayers[1].rounds.push(0)
                    newPlayers[0].socket.emit('youWin')
                    newPlayers[1].socket.emit('youLoose')
                } else {
                    newPlayers[1].rounds.push(1)
                    newPlayers[0].rounds.push(0)
                    newPlayers[1].socket.emit('youWin')
                    newPlayers[0].socket.emit('youLoose')
                }
                newPlayers.map(player => {
                    player.socket.emit('round-2', words[1])
                })
            })
        })

    }
}