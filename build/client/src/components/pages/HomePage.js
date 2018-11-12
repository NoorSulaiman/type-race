import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import { logout, login } from '../../actions/auth';
import { signup } from '../../actions/users';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

class HomePage extends React.Component {
  state = {
    login: false,
    signup: false
  }

  loginSwitch = () => this.state.login ? this.setState({ login: false }) : this.setState({ login: true, signup: false })
  signupSwitch = () => this.state.signup ? this.setState({ signup: false }) : this.setState({ signup: true, login: false })
  submitLogin = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));
  submitSignup = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));
  redirect = () => {
    this.props.history.push('/startpage')
  }

  render() {

    return (
      <div>
        {this.props.isAuthenticated ? (
          this.props.history.push("/dashboard")
        ) : (
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Button size="massive" onClick={this.loginSwitch}>Login</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button size="massive" onClick={this.signupSwitch}>Signup</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={this.redirect} size="massive">Guest</Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {this.state.login && <LoginForm submit={this.submitLogin} />}
                </Grid.Column>
                <Grid.Column>
                  {this.state.signup && <SignupForm submit={this.submitSignup} />}
                </Grid.Column>
              </Grid.Row>
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

export default connect(mapStateToProps, { logout, login, signup })(HomePage);
