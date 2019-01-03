import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const OponentForm = (props) => (
    <Form>
        <Form.Field>
            <input
                type="text"
                value={props.textStream}
                disabled
            />
        </Form.Field>
    </Form>
)

OponentForm.propTypes = {
    textStream: PropTypes.string.isRequired
}

export default OponentForm;