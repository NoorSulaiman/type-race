export function roundHandler(players) {
    const newPlayers = players.slice(-2);
    newPlayers[0].socket.on('typing', text => {
        newPlayers[1].socket.emit('other-typing', text)
    })
    newPlayers[1].socket.on('typing', text => {
        newPlayers[0].socket.emit('other-typing', text)
    })

}