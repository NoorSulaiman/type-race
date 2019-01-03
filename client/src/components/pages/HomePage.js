import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/auth';
import { signup } from '../../actions/users';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';
import '../pages/styles/homepage.css';

class HomePage extends React.Component {
    state = {
        login: false,
        signup: false
    };

    loginSwitch = () =>
        this.state.login
            ? this.setState({ login: false })
            : this.setState({ login: true, signup: false });
    signupSwitch = () =>
        this.state.signup
            ? this.setState({ signup: false })
            : this.setState({ signup: true, login: false });
    submitLogin = data =>
        this.props
            .login(data)
            .then(() => this.props.history.push('/dashboard'));
    submitSignup = data =>
        this.props
            .signup(data)
            .then(() => this.props.history.push('/dashboard'));
    redirect = () => {
        this.props.history.push('/gamepage');
    };

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    this.props.history.push('/dashboard')
                ) : (
                    <Grid columns={3}>
                        <div id="logoContainer">
                            <h1 id="gameTitle">Type Race</h1>
                        </div>
                        <Grid.Row>
                            <Grid.Column>
                                <div className="mainButton">
                                    <Image
                                        onClick={this.loginSwitch}
                                        src={require('../../assets/images/login.png')}
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="mainButton">
                                    <Image
                                        onClick={this.signupSwitch}
                                        src={require('../../assets/images/signup.png')}
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="mainButton">
                                    <Image
                                        onClick={this.redirect}
                                        src={require('../../assets/images/guest.png')}
                                    />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.login && (
                                    <LoginForm submit={this.submitLogin} />
                                )}
                            </Grid.Column>
                            <Grid.Column>
                                {this.state.signup && (
                                    <SignupForm submit={this.submitSignup} />
                                )}
                            </Grid.Column>
                        </Grid.Row>
                        {!this.state.signup && !this.state.login && (
                            <Grid.Row>
                                <div id="infoContainer">
                                    <h2>Game Instructions:</h2>
                                    <ol>
                                        <li>
                                            A random word will popup and you
                                            have to type it faster than your
                                            opponent.
                                        </li>
                                        <li>
                                            You have to hit Enter to be able to
                                            submit the word.
                                        </li>
                                        <li>
                                            Winner will have best of 3 rounds.
                                        </li>
                                    </ol>
                                </div>
                            </Grid.Row>
                        )}
                    </Grid>
                )}
            </div>
        );
    }
}

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default connect(
    mapStateToProps,
    { logout, login, signup }
)(HomePage);
