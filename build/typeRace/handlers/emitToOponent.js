"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emitToOponent = emitToOponent;
function emitToOponent(socket, players, emit, value) {
    players.map(function (player, indx) {
        if (player.socket === socket) {
            if (players.length % 2 === 0) {
                if ((indx + 1) % 2 === 0) {
                    players[indx - 1].socket.emit(emit, value);
                } else if (indx % 2 === 0) {
                    players[indx + 1].socket.emit(emit, value);
                }
            }
        } else {
            return;
        }
    });
}
//# sourceMappingURL=emitToOponent.js.map