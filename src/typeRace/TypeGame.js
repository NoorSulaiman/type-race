class TypeGame {

    constructor(p1, p2) {
        this._sendTextStream(p1, p2)

    }

    _sendTextStream(playerOne, playerTwo) {
        playerOne.conn.on('typing', text => {
            console.log('from player one event')
            playerTwo.conn.emit('other-typing', text)
        })
        playerTwo.conn.on('typing', text => {
            console.log('from player two event')
            playerOne.conn.emit('other-typing', text)

        })
    }
}
export default TypeGame;