export function disconnectHandler(socket, players, guests) {
    const allPlayers = [...players, ...guests]
    allPlayers.map((player, indx) => {
        if ((player.socket === socket) && (player.user.email !== 'guest')) {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players[indx - 1].socket.emit('player-disconnected', 'Oponent disconnected!')
                    players.splice(indx - 1, 2)
                }
                else if (indx % 2 === 0) {
                    players[indx + 1].socket.emit('player-disconnected', 'Oponent disconnected!')
                    players.splice(indx, 2)
                }
            }
        } else if ((player.socket === socket) && (player.user.email === 'guest')) {
            if (guests.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    guests[indx - 1].socket.emit('player-disconnected', 'Oponent disconnected!')
                    guests.splice(indx - 1, 2)
                }
                else if (indx % 2 === 0) {
                    guests[indx + 1].socket.emit('player-disconnected', 'Oponent disconnected!')
                    guests.splice(indx, 2)
                }
            }
        }

        else { return }
    })
}