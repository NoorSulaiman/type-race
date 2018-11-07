export function disconnectHandler(socket, players) {
    players.map((player, indx) => {
        if (player.socket === socket) {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players[indx - 1].socket.emit('player-disconnected', 'Oponent disconnected! You win!')
                }
                else if (indx % 2 === 0) {
                    players[indx + 1].socket.emit('player-disconnected', 'Oponent disconnected! You win!')
                }
            }
            players.splice(indx, 1)
        }
        else { return }
    })
}