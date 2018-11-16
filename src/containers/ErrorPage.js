import React from 'react';
import error from 'resources/images/error.png';

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="indication-page">
                <h1>SORRY!</h1>
                <img src={error} />
                <h3>There was a problem with your order.</h3>
                <h3>Please contact support.</h3>
            </div>
        );
    }
}

export default ErrorPage;
