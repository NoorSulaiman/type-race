import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class TypingForm extends React.Component {
    state = {
        data: {
            type: ""
        },
        errors: {}
    };

    onChange = e => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
        this.props.sendTextStream(e.target.value)

    }
    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
        }
    };


    validate = data => {
        const errors = {};
        const { word } = this.props;
        if (data.type !== word) {
            errors.type = "Nope!"
        }

        return errors;
    };

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.type}>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        placeholder="Type here!"
                        value={data.type}
                        onChange={this.onChange}
                        disabled={this.props.disabled}
                        autoFocus
                    />
                    {errors.type && <InlineError text={errors.type} />}
                </Form.Field>
            </Form>
        );
    }
};
TypingForm.propTypes = {
    submit: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired,
    sendTextStream: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default TypingForm;