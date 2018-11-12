"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.waitingPlayerHandler = waitingPlayerHandler;
function waitingPlayerHandler(players, socket) {
    if (players.length % 2 !== 0) {
        socket.emit('waiting', "Waiting for another player to join!");
    }
}
//# sourceMappingURL=waitingPlayerHandler.js.map