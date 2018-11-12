import React from 'react';
import ReactDOM from 'react-dom';

import PaymentStore from './Payment/PaymentStore';
import PaymentView from './Payment/PaymentView';

const app = document.getElementById('root');

ReactDOM.render(<PaymentView store={PaymentStore} />, app);
