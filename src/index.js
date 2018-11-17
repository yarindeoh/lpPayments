import React from 'react';
import ReactDOM from 'react-dom';
import 'resources/scss/style.scss';
import PaymentModel from './models/PaymentModel';
import Payment from './containers/Payment/Payment';

const app = document.getElementById('root');
const payment = PaymentModel.create();

ReactDOM.render(<Payment payment={payment} />, app);
