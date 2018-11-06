export function reConnectHandler(email, players, socket) {
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
            player.socket.emit('waiting', "Waiting for another player to join!")
        }
    })

}