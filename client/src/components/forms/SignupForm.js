import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';
import './styles/loginSignup.css';

class SignupForm extends React.Component {
    state = {
        data: {
            username: '',
            email: '',
            password: ''
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
            this.props.submit(this.state.data).catch(err =>
                this.setState({
                    errors: err.response.data.errors,
                    loading: false
                })
            );
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = 'Invalid email';
        if (!data.password) errors.password = "Can't be blank";

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div className="signupFormContainer">
                <Form
                    className="signupForm"
                    onSubmit={this.onSubmit}
                    loading={loading}
                >
                    <Form.Field error={!!errors.username}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Pick a cool name!"
                            value={data.username}
                            onChange={this.onChange}
                        />
                        {errors.username && (
                            <InlineError text={errors.username} />
                        )}
                    </Form.Field>
                    <Form.Field error={!!errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@email.com"
                            value={data.email}
                            onChange={this.onChange}
                        />
                        {errors.email && <InlineError text={errors.email} />}
                    </Form.Field>

                    <Form.Field error={!!errors.password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Make it secure!"
                            value={data.password}
                            onChange={this.onChange}
                        />
                        {errors.password && (
                            <InlineError text={errors.password} />
                        )}
                    </Form.Field>

                    <Button primary>Sign Up</Button>
                </Form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;
