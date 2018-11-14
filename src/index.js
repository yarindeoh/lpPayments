import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import PaymentStore from './containers/Payment/PaymentStore';
import App from './App';
import 'resources/scss/style.scss';

const app = document.getElementById('root');
const browserHistory = createBrowserHistory();
const routeStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routeStore);

ReactDOM.render(
    <Router history={history}>
        <Provider store={PaymentStore} routing={routeStore}>
            <App />
        </Provider>
    </Router>,
    app
);
