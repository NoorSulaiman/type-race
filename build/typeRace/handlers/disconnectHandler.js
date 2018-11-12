'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disconnectHandler = disconnectHandler;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function disconnectHandler(socket, players, guests) {
    var allPlayers = [].concat(_toConsumableArray(players), _toConsumableArray(guests));
    allPlayers.map(function (player, indx) {
        if (player.socket === socket && player.user.email !== 'guest') {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players[indx - 1].socket.emit('player-disconnected', 'Oponent disconnected!');
                    players.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    players[indx + 1].socket.emit('player-disconnected', 'Oponent disconnected!');
                    players.splice(indx, 2);
                }
            }
        } else if (player.socket === socket && player.user.email === 'guest') {
            if (guests.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    guests[indx - 1].socket.emit('player-disconnected', 'Oponent disconnected!');
                    guests.splice(indx - 1, 2);
                } else if (indx % 2 === 0) {
                    guests[indx + 1].socket.emit('player-disconnected', 'Oponent disconnected!');
                    guests.splice(indx, 2);
                }
            }
        } else {
            return;
        }
    });
}
//# sourceMappingURL=disconnectHandler.js.map