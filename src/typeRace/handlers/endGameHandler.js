export function endGameHandler(socket, players) {
    players.map((player, indx) => {
        if (player.socket === socket) {
            players.splice(indx, 1)
        }
        else { return }
    })
}