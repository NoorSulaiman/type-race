export function waitingPlayerHandler(players, socket) {
    if (players.length % 2 !== 0) {
        console.log('inside waiting')
        socket.emit('waiting', "Waiting for another player to join!")
    }
}