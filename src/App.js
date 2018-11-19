import React, { Component } from 'react';
import { withRouter, Route } from 'react-router';
import { inject, observer } from 'mobx-react';

import Payment from './containers/Payment/Payment';
import SuccessPage from './containers/SuccessPage';
import ErrorPage from './containers/ErrorPage';

@inject('store')
@withRouter
@observer
class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Route exact path="/" component={Payment} />
                    <Route exact path="/error" component={ErrorPage} />
                    <Route exact path="/success" component={SuccessPage} />
                </div>
            </div>
        );
    }
}

export default App;
