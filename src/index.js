import React from 'react';
import ReactDOM from 'react-dom';
import 'resources/scss/style.scss';
import PaymentModel from './models/PaymentModel';
import Payment from './containers/Payment/Payment';
import { addMiddleware } from 'mobx-state-tree';

const app = document.getElementById('root');
const payment = PaymentModel.create();

/**
 * form validation middleware that follows every input change
 * and updating form valid property accordingly
 */
addMiddleware(payment, (call, next) => {
    if (call.name === 'updateProperty') {
        next(call);
        payment.checkValidity();
    }
    next(call);
});

ReactDOM.render(<Payment payment={payment} />, app);
