import React from 'react';
import { Message } from 'semantic-ui-react';
import Reconfirm from './Reconfirm';

const ConfirmEmailMessage = () => (
    <div>
        <Message info>
            <Message.Header>Please, verify your email!</Message.Header>
        </Message>
        <Reconfirm />
    </div>
);

export default ConfirmEmailMessage;
