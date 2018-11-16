import React from 'react';
import success from 'resources/images/success.png';

class SuccessPage extends React.Component {
    render() {
        return (
            <div className="indication-page">
                <h1>THANK YOU!</h1>
                <img src={success} />
                <h3>We've received your order and your payment,</h3>
                <h3>check your email for confirmation.</h3>
            </div>
        );
    }
}

export default SuccessPage;
