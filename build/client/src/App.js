import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from './components/navigation/TopNavigation';
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import StartPage from './components/pages/StartPage';
import GamePage from './components/pages/GamePage';


const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    <h1>Type Race</h1>
    {isAuthenticated && <TopNavigation />}
    <Route location={location} path="/" exact component={HomePage} />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />

    <GuestRoute
      location={location}
      path="/forget_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <Route
      location={location}
      path="/startpage"
      exact
      component={StartPage}
    />
    <Route
      location={location}
      path="/gamepage"
      exact
      component={GamePage}
    />

  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}
export default connect(mapStateToProps)(App);
