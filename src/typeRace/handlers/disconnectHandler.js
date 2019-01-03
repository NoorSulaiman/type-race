export function disconnectHandler(socket, players, guests) {
    players.map((player, indx) => {
        if (player.socket === socket) {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players[indx - 1].socket.emit(
                        'player-disconnected',
                        'Oponent disconnected!'
                    );
                    players.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    players[indx + 1].socket.emit(
                        'player-disconnected',
                        'Oponent disconnected!'
                    );
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
                    guests[indx - 1].socket.emit(
                        'player-disconnected',
                        'Oponent disconnected!'
                    );
                    guests.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    guests[indx + 1].socket.emit(
                        'player-disconnected',
                        'Oponent disconnected!'
                    );
                    guests.splice(indx, 2);
                }
            } else {
                guests.splice(indx, 1);
            }
        }
    });
}
