import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const StartPage = (props) => {

    const redirect = () => {
        props.history.push('/gamepage')
    };
    const goToHomePage = () => {
        props.history.push('/')
    }

    return (<div>

        <div>
            <Button onClick={goToHomePage} size="big">Go back to home page</Button>
        </div>
        <br />
        <Button onClick={redirect} size="massive">Play now</Button>
        <Button onClick={redirect} disabled size="massive">Create Game</Button>
        <Button disabled size="massive">Join a Game</Button>
        {!props.isAuthenticated && <p style={{ color: 'orange' }}>You need to sign in to create games</p>
        }
    </div >
    )
};

StartPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
};

export default connect(mapStateToProps)(StartPage);;