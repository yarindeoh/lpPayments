import React from 'react';
import ReactDOM from 'react-dom';
import { addMiddleware } from 'mobx-state-tree';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { types } from 'mobx-state-tree';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';

import 'resources/scss/style.scss';
import PaymentModel from './models/PaymentModel';
import App from './App';

const app = document.getElementById('root');
const routerModel = RouterModel.create();
const paymentModel = PaymentModel.create();

const Model = types.model({
    payment: PaymentModel,
    routing: RouterModel
});

export const store = Model.create({
    routing: routerModel,
    payment: paymentModel
});

const history = syncHistoryWithStore(createBrowserHistory(), routerModel);

/**
 * form validation middleware that follows every input change
 * and updating form valid property accordingly
 */
addMiddleware(store.payment, (call, next) => {
    if (call.name === 'updateProperty') {
        next(call);
        store.payment.checkValidity();
    }
    next(call);
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    app
);
