import React from "react";
import PropTypes from "prop-types";
import { Button, Message, List, Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { getAllUsersPoints } from "../../actions/game";

class DashboardPage extends React.Component {
  state = {
    users: [],
  }

  componentWillMount() {
    getAllUsersPoints()
      .then(users => this.setState({ users }))
      .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
  }
  redirect = () => {
    this.props.history.push('/startpage')
  }
  compare = (a, b) => {
    let comparison = 0;

    if (a.points < b.points) {
      comparison = 1;
    } else if (b.points < a.points) {
      comparison = -1;
    }

    return comparison;
  }
  render() {
    const { users, errors } = this.state;
    const { isConfirmed } = this.props;
    const sortedUsers = users.sort(this.compare)
    const leaderBoardList = sortedUsers.map(user => (<List.Item>
      <List.Content>
        <List.Header>{user.username}</List.Header>
        <caption>{user.points}</caption>
      </List.Content>
    </List.Item>
    ))
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        <br />
        <h2>LeaderBoard</h2>
        {errors && <Message>Server is not responding, please refresh your page!</Message>}
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column style={{ overflow: 'auto', height: '120px' }}>
              <List celled>
                {leaderBoardList}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.redirect} size="massive">Start playing</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div >
    )
  }
};

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps, { getAllUsersPoints })(DashboardPage);
