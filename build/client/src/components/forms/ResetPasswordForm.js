import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPassordForm extends React.Component {
    state = {
        data: {
            password: '',
            confirmPassword: '',
            token: this.props.token
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors, loading: false })
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!data.password) { errors.password = 'Password should not be empty' }
        if (data.confirmPassword !== data.password) { errors.confirmPassword = 'Password must match' }
        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your new password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Form.Field error={!!errors.confirmPassword}>
                    <label htmlFor="confirmPassword">Confirm your password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Type it again, please"
                        value={data.confirmPassword}
                        onChange={this.onChange}
                    />
                    {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                </Form.Field>
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

ResetPassordForm.propTypes = {
    token: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
}

export default ResetPassordForm;