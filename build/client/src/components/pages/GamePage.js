import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Message, Divider, Loader, Button, Confirm } from 'semantic-ui-react';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { addPoints } from '../../actions/game';
import TypingForm from '../forms/TypingForm';
import OponentForm from '../forms/OponentForm';
import '../../styles/GamePage.css';


class GamePage extends Component {

    state = {
        socket: socketIOClient('http://localhost:8080/'),
        textStream: '',
        playerJoined: false,
        playerDisconnected: false,
        message: '',
        opName: '',
        word: '',
        rounds: [false, false, false],
        typeDisabled: false,
        lose: false,
        win: false,
        gameEnd: false,
        open: false,
        info: '',
        guest: ''
    }

    componentDidMount() {
        const { email, username } = this.props;
        const { socket } = this.state;
        const id = Math.floor(1000 + Math.random() * 9000);
        if (email) {
            socket.emit('join', { email, username });
            socket.on('waiting-reconnect', msg => this.setState({ message: msg, playerJoined: false, rounds: [false, false, false] }))
        } else {
            this.setState({ guest: `Guest ${id}` })
            socket.emit('join', { email: 'guest', username: `Guest ${id}` });
        }
        socket.on('other-typing', text => this.setState({ textStream: text }));
        socket.on('waiting', msg => this.setState({ message: msg }));
        socket.on('player-disconnected', msg => this.setState({
            message: msg,
            playerJoined: false,
            playerDisconnected: true
        }));
        socket.on('game-start', (name) => {
            this.setState({ playerJoined: true, message: '', opName: name, info: 'Who ever type the word correctly first wins!' })
            setTimeout(() => socket.emit('start-rounds'), 3000)
        });
        socket.on('round-1', (word) => {
            this.setState({ word, rounds: [true, false, false], message: '', info: '' })
        });
        socket.on('round-2', (word) => {
            setTimeout(() => this.setState({
                word,
                rounds: [false, true, false],
                message: '',
                lose: false,
                win: false,
                typeDisabled: false

            }), 2000)
        })
        socket.on('round-3', (word) => {
            setTimeout(() => this.setState({
                word,
                rounds: [false, false, true],
                message: '',
                lose: false,
                win: false,
                typeDisabled: false

            }), 2000)
        })
        socket.on('youLose', () => this.setState({ message: 'You lost this round!', lose: true, typeDisabled: true }))
        socket.on('youWin', () => this.setState({ message: 'You win the round!', win: true, typeDisabled: true }))
        socket.on('game-end', (rounds) => {
            if (rounds < 2) {
                if (email) {
                    this.props.addPoints({ email: this.props.email, points: -10 })
                    this.setState({ typeDisabled: true, gameEnd: true, message: 'win the game', lose: true, rounds: [false, false, false], disabled: true })
                } else {
                    this.setState({ typeDisabled: true, gameEnd: true, message: 'win the game', lose: true, rounds: [false, false, false], disabled: true })
                }
            } else if (email) {
                this.props.addPoints({ email: this.props.email, points: 30 })
                this.setState({ typeDisabled: true, gameEnd: true, message: 'win the game', win: true, rounds: [false, false, false], disabled: true })
            } else { this.setState({ typeDisabled: true, gameEnd: true, message: 'win the game', win: true, rounds: [false, false, false], disabled: true }) }

            socket.emit('deletePlayers')
            setTimeout(() => this.props.history.push('./StartPage'), 4000)
        })

    }

    submit = () => {
        const { rounds, socket } = this.state;
        const { email } = this.props;
        if (rounds[0]) {
            socket.emit('round-1-end', email)
        } else if (rounds[1]) {
            socket.emit('round-2-end', email)
        } else if (rounds[2]) {
            socket.emit('round-3-end', email)
        }
    }
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    endMatch = () => {
        const { socket, gameEnd } = this.state;
        if (!gameEnd) {
            this.setState({ gameEnd: true })
            this.props.history.push('./StartPage')
            socket.emit('endGameByPlayer')
        }
    }
    sendTextStream = (data) => this.state.socket.emit('typing', data)

    render() {
        const { username, email } = this.props;
        const {
            textStream,
            playerJoined,
            message,
            playerDisconnected,
            opName,
            word,
            rounds,
            typeDisabled,
            win,
            lose,
            gameEnd,
            open,
            guest,
            info
        } = this.state;
        return (
            <Grid centered columns={2} stackable>
                <Grid.Row>
                    <Grid.Column floated='right'>
                        <Button floated='right' onClick={this.open}>End Match</Button>
                        <Confirm id='confirm' open={open} onCancel={this.close} onConfirm={this.endMatch} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column>
                                {info && <h1>{info}</h1>}
                                {rounds[0] && <h1>Round 1</h1>}
                                {rounds[1] && <h1>Round 2</h1>}
                                {rounds[2] && <h1>Round 3</h1>}
                                {gameEnd && win && username && < h1 style={{ color: 'green' }}>{`${username} ${message}`}</h1>}
                                {gameEnd && win && guest && < h1 style={{ color: 'green' }}>{`${guest} ${message}`}</h1>}
                                {gameEnd && lose && <h1 style={{ color: 'green' }}>{`${opName} ${message}`}</h1>}
                                <Divider />
                                {playerJoined && rounds[0] && <h1> {word}</h1>}
                                {playerJoined && rounds[1] && <h1> {word}</h1>}
                                {playerJoined && rounds[2] && <h1> {word}</h1>}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Row >
                <Grid.Row>
                    <Grid.Column>
                        {!playerJoined && !playerDisconnected && < Loader active>{message}</Loader>}
                        {playerJoined && <OponentForm textStream={textStream} />}
                        {playerJoined && <h1>{opName}</h1>}
                        {gameEnd && win && email && < h2 style={{ color: 'red' }}>-10 Points</h2>}
                        {gameEnd && lose && email && < h2 style={{ color: 'green' }}>+30 Points</h2>}
                    </Grid.Column>
                    <Grid.Column>
                        {message && win && !gameEnd && < Message positive>{message}</Message>}
                        {message && lose && !gameEnd && < Message negative>{message}</Message>}
                        {message && playerDisconnected && <Message positive>{message}</Message>}
                        <TypingForm
                            sendTextStream={this.sendTextStream}
                            word={word}
                            disabled={typeDisabled}
                            submit={this.submit}
                            key={rounds}
                        />
                        {username && <h1>{username}</h1>}
                        {guest && <h1>{guest}</h1>}
                        {gameEnd && win && email && < h2 style={{ color: 'green' }}>+30 Points</h2>}
                        {gameEnd && lose && email && < h2 style={{ color: 'red' }}>-10 Points</h2>}

                    </Grid.Column>
                </Grid.Row >
            </Grid >
        );
    }
}

GamePage.propTypes = {
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    addPoints: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        username: state.user.username,
        email: state.user.email

    }
};

export default connect(mapStateToProps, { addPoints })(GamePage);;