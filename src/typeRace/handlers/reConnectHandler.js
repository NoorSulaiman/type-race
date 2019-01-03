import randomWords from 'random-words';

export function reConnectHandler(user, players, socket) {
    const words = randomWords(3);
    players.slice(0, -1).map((player, indx) => {
        if (player.user.email === user.email) {
            players.pop();
            player.socket = socket;
            if (!(indx === players.length - 1 && players.length % 2 !== 0)) {
                if ((indx + 1) % 2 === 0) {
                    player.socket.on('typing', text => {
                        players[indx - 1].socket.emit('other-typing', text);
                    });
                    player.socket.emit(
                        'game-start',
                        players[indx - 1].user.username
                    );
                    players[indx - 1].socket.emit(
                        'game-start',
                        player.user.username
                    );
                    player.socket.on('start-rounds', () => {
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
                            const rounds = player.rounds.reduce(
                                (a, b) => a + b,
                                0
                            );
                            player.socket.emit('game-end', rounds);
                        }
                    });
                    player.socket.once('round-1-end', email => {
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
                        [player, players[indx - 1]].map(player => {
                            player.socket.emit('round-2', words[1]);
                        });
                    });
                    player.socket.once('round-2-end', email => {
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
                        [player, players[indx - 1]].map(player => {
                            player.socket.emit('round-3', words[2]);
                        });
                    });
                    player.socket.once('round-3-end', email => {
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
                        [player, players[indx - 1]].map(player => {
                            const rounds = player.rounds.reduce(
                                (a, b) => a + b,
                                0
                            );
                            player.socket.emit('game-end', rounds);
                        });
                    });
                } else if (indx % 2 === 0) {
                    player.socket.on('typing', text => {
                        players[indx + 1].socket.emit('other-typing', text);
                    });
                    player.socket.emit(
                        'game-start',
                        players[indx + 1].user.username
                    );
                    players[indx + 1].socket.emit(
                        'game-start',
                        player.user.username
                    );
                    player.socket.on('start-rounds', () => {
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
                            const rounds = player.rounds.reduce(
                                (a, b) => a + b,
                                0
                            );
                            player.socket.emit('game-end', rounds);
                        }
                    });
                    player.socket.on('round-1-end', email => {
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
                        [player, players[indx + 1]].map(player => {
                            player.socket.emit('round-2', words[1]);
                        });
                    });
                    player.socket.on('round-2-end', email => {
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
                        [player, players[indx + 1]].map(player => {
                            player.socket.emit('round-3', words[2]);
                        });
                    });
                    player.socket.on('round-3-end', email => {
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
                        [player, players[indx + 1]].map(player => {
                            const rounds = player.rounds.reduce(
                                (a, b) => a + b,
                                0
                            );
                            player.socket.emit('game-end', rounds);
                        });
                    });
                }
            }
        }
    });
}
