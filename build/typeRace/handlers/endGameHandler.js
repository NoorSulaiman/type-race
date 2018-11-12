"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.endGameHandler = endGameHandler;
function endGameHandler(socket, players) {
    players.map(function (player, indx) {
        if (player.socket === socket) {
            players.splice(indx, 1);
        } else {
            return;
        }
    });
}
//# sourceMappingURL=endGameHandler.js.map