import React, { Component } from 'react';
import Payment from './containers/Payment/Payment';
import { Route, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ErrorPage from './containers/ErrorPage';
import SuccessPage from './containers/SuccessPage';

@inject('store', 'routing')
@withRouter
@observer
class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Payment} />
                <Route exact path="/error" component={ErrorPage} />
                <Route exact path="/success" component={SuccessPage} />
            </div>
        );
    }
}

export default App;
