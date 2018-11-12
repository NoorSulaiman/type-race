"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typeRace = typeRace;

var _reConnectHandler = require("./handlers/reConnectHandler");

var _roundHandler = require("./handlers/roundHandler");

var _waitingPlayerHandler = require("./handlers/waitingPlayerHandler");

function typeRace(user, players, guests, socket) {
    if (user.email !== 'guest') {
        players.push({ socket: socket, user: user, rounds: [] });
        (0, _reConnectHandler.reConnectHandler)(user, players, socket);
        (0, _waitingPlayerHandler.waitingPlayerHandler)(players, socket);
        if (players.length && players.length % 2 === 0) {
            (0, _roundHandler.roundHandler)(players);
        }
    } else {
        guests.push({ socket: socket, user: user, rounds: [] });
        (0, _waitingPlayerHandler.waitingPlayerHandler)(guests, socket);
        if (guests.length && guests.length % 2 === 0) {
            (0, _roundHandler.roundHandler)(guests);
        }
    }
}
//# sourceMappingURL=typeRace.js.map