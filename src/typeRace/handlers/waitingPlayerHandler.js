export function waitingPlayerHandler(players, socket) {
    if (players.length % 2 !== 0) {
        socket.emit('waiting', 'Waiting for another player to join!');
    }
}
