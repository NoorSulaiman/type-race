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
            player.socket.emit('random-words', words)
        })

    }
}