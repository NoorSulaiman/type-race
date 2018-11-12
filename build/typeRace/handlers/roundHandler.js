'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.roundHandler = roundHandler;

var _randomWords = require('random-words');

var _randomWords2 = _interopRequireDefault(_randomWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function roundHandler(players) {
    var newPlayers = players.slice(-2);
    var words = (0, _randomWords2.default)(3);

    if (newPlayers[0].socket._eventsCount < 5) {
        console.log('from roundHandler');

        //text stream
        newPlayers[0].socket.on('typing', function (text) {
            newPlayers[1].socket.emit('other-typing', text);
        });
        newPlayers[1].socket.on('typing', function (text) {
            newPlayers[0].socket.emit('other-typing', text);
        });
        //game start
        newPlayers[0].socket.emit('game-start', newPlayers[1].user.username);
        newPlayers[1].socket.emit('game-start', newPlayers[0].user.username);
        newPlayers.map(function (player) {
            player.socket.on('start-rounds', function () {
                if (player.rounds.length === 0) {
                    player.socket.emit('round-1', words[0]);
                } else if (player.rounds.length === 1) {
                    player.socket.emit('round-2', words[1]);
                } else if (player.rounds.length === 2) {
                    player.socket.emit('round-3', words[2]);
                } else {
                    var rounds = player.rounds.reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    player.socket.emit('game-end', rounds);
                }
            });
            player.socket.on('round-1-end', function (email) {
                if (newPlayers[0].user.email === email) {
                    newPlayers[0].rounds.push(1);
                    newPlayers[1].rounds.push(0);
                    newPlayers[0].socket.emit('youWin');
                    newPlayers[1].socket.emit('youLose');
                } else {
                    newPlayers[1].rounds.push(1);
                    newPlayers[0].rounds.push(0);
                    newPlayers[1].socket.emit('youWin');
                    newPlayers[0].socket.emit('youLose');
                }
                newPlayers.map(function (player) {
                    player.socket.emit('round-2', words[1]);
                });
            });
            player.socket.on('round-2-end', function (email) {
                if (newPlayers[0].user.email === email) {
                    newPlayers[0].rounds.push(1);
                    newPlayers[1].rounds.push(0);
                    newPlayers[0].socket.emit('youWin');
                    newPlayers[1].socket.emit('youLose');
                } else {
                    newPlayers[1].rounds.push(1);
                    newPlayers[0].rounds.push(0);
                    newPlayers[1].socket.emit('youWin');
                    newPlayers[0].socket.emit('youLose');
                }
                newPlayers.map(function (player) {
                    player.socket.emit('round-3', words[2]);
                });
            });
            player.socket.on('round-3-end', function (email) {
                if (newPlayers[0].user.email === email) {
                    newPlayers[0].rounds.push(1);
                    newPlayers[1].rounds.push(0);
                    newPlayers[0].socket.emit('youWin');
                    newPlayers[1].socket.emit('youLose');
                } else {
                    newPlayers[1].rounds.push(1);
                    newPlayers[0].rounds.push(0);
                    newPlayers[1].socket.emit('youWin');
                    newPlayers[0].socket.emit('youLose');
                }
                newPlayers.map(function (player) {
                    var rounds = player.rounds.reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    player.socket.emit('game-end', rounds);
                });
            });
        });
    }
}
//# sourceMappingURL=roundHandler.js.map