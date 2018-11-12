'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reConnectHandler = reConnectHandler;

var _randomWords = require('random-words');

var _randomWords2 = _interopRequireDefault(_randomWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reConnectHandler(user, players, socket) {
    var words = (0, _randomWords2.default)(3);
    players.slice(0, -1).map(function (player, indx) {
        if (player.user.email === user.email) {
            players.pop();
            player.socket = socket;
            if (!(indx === players.length - 1 && players.length % 2 !== 0)) {
                if ((indx + 1) % 2 === 0) {
                    player.socket.on('typing', function (text) {
                        players[indx - 1].socket.emit('other-typing', text);
                    });
                    player.socket.emit('game-start', players[indx - 1].user.username);
                    players[indx - 1].socket.emit('game-start', player.user.username);
                    player.socket.on('start-rounds', function () {
                        if (player.rounds.length === 0) {
                            player.socket.emit('round-1', words[0]);
                            players[indx - 1].socket.emit('round-1', words[0]);
                        } else if (player.rounds.length === 1) {
                            player.socket.emit('round-2', words[1]);
                            players[indx - 1].socket.emit('round-2', words[1]);
                        } else if (player.rounds.length === 2) {
                            player.socket.emit('round-3', words[2]);
                            players[indx - 1].socket.emit('round-3', words[2]);
                        } else {
                            var rounds = player.rounds.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            player.socket.emit('game-end', rounds);
                        }
                    });
                    player.socket.on('round-1-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx - 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx - 1].socket.emit('youLose');
                        } else {
                            players[indx - 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx - 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx - 1]].map(function (player) {
                            player.socket.emit('round-2', words[1]);
                        });
                    });
                    player.socket.on('round-2-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx - 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx - 1].socket.emit('youLose');
                        } else {
                            players[indx - 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx - 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx - 1]].map(function (player) {
                            player.socket.emit('round-3', words[2]);
                        });
                    });
                    player.socket.on('round-3-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx - 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx - 1].socket.emit('youLose');
                        } else {
                            players[indx - 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx - 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx - 1]].map(function (player) {
                            var rounds = player.rounds.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            player.socket.emit('game-end', rounds);
                        });
                    });
                } else if (indx % 2 === 0) {
                    player.socket.on('typing', function (text) {
                        players[indx + 1].socket.emit('other-typing', text);
                    });
                    player.socket.emit('game-start', players[indx + 1].user.username);
                    players[indx + 1].socket.emit('game-start', player.user.username);
                    player.socket.on('start-rounds', function () {
                        if (player.rounds.length === 0) {
                            player.socket.emit('round-1', words[0]);
                            players[indx + 1].socket.emit('round-1', words[0]);
                        } else if (player.rounds.length === 1) {
                            player.socket.emit('round-2', words[1]);
                            players[indx + 1].socket.emit('round-2', words[1]);
                        } else if (player.rounds.length === 2) {
                            player.socket.emit('round-3', words[2]);
                            players[indx + 1].socket.emit('round-3', words[2]);
                        } else {
                            var rounds = player.rounds.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            player.socket.emit('game-end', rounds);
                        }
                    });
                    player.socket.on('round-1-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx + 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx + 1].socket.emit('youLose');
                        } else {
                            players[indx + 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx + 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx + 1]].map(function (player) {
                            player.socket.emit('round-2', words[1]);
                        });
                    });
                    player.socket.on('round-2-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx + 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx + 1].socket.emit('youLose');
                        } else {
                            players[indx + 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx + 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx + 1]].map(function (player) {
                            player.socket.emit('round-3', words[2]);
                        });
                    });
                    player.socket.on('round-3-end', function (email) {
                        if (player.user.email === email) {
                            player.rounds.push(1);
                            players[indx + 1].rounds.push(0);
                            player.socket.emit('youWin');
                            players[indx + 1].socket.emit('youLose');
                        } else {
                            players[indx + 1].rounds.push(1);
                            player.rounds.push(0);
                            players[indx + 1].socket.emit('youWin');
                            player.socket.emit('youLose');
                        }
                        [player, players[indx + 1]].map(function (player) {
                            var rounds = player.rounds.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            player.socket.emit('game-end', rounds);
                        });
                    });
                }
            }
        }
    });
}
//# sourceMappingURL=reConnectHandler.js.map