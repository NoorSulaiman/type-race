export function endGameHandler(socket, players, guests) {
    players.map((player, indx) => {
        if (player.socket === socket) {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    players.splice(indx, 2);
                }
            } else {
                players.splice(indx, 1);
            }
        }
    });

    guests.map((player, indx) => {
        if (player.socket === socket) {
            if (guests.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    guests.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    guests.splice(indx, 2);
                }
            } else {
                guests.splice(indx, 1);
            }
        }
    });
}
