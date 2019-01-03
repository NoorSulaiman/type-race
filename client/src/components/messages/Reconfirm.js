import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon, Button } from "semantic-ui-react";
import { reconfirm } from '../../actions/users';


class Reconfirm extends React.Component {
    state = {
        loading: false,
        success: false,
        err: true
    };

    reSend = () => {
        this.props.reconfirm(this.props.email)
            .catch(() => this.setState({ loading: false, success: false, err: false }));
        this.setState({ loading: false, success: true })

    }

    render() {
        const { loading, success, err } = this.state;

        return (

            <div>
                <Button onClick={() => {
                    this.setState({ loading: true })
                    this.reSend()
                }}> Resend Confirmation </Button>
                {loading &&
                    !success && (
                        <Message icon>
                            <Icon name="circle notched" loading />
                            <Message.Header>Sending your email</Message.Header>
                        </Message>
                    )}

                {!loading &&
                    success && (
                        <Message success icon>
                            <Icon name="checkmark" />
                            <Message.Content>
                                <Message.Header>
                                    Your Email Has been sent
                  </Message.Header>
                            </Message.Content>
                        </Message>
                    )}

                {!loading &&
                    !success &&
                    !err && (
                        <Message negative icon>
                            <Icon name="warning sign" />
                            <Message.Content>
                                <Message.Header>Ooops. Somthing went wrong, please try again later.</Message.Header>
                            </Message.Content>
                        </Message>
                    )}
            </div>
        );
    }
}

Reconfirm.propTypes = {
    reconfirm: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {
        email: state.user.email

    }
}

export default connect(mapStateToProps, { reconfirm })(Reconfirm);