import React from 'react';
import { observer } from 'mobx-react';

export default observer(
    class PaymentView extends React.Component {
        render() {
            const { billingAddress, creditCardInfo } = this.props.store;
            return (
                <div>
                    <h1>Payment</h1>
                    <input
                        className="firstInput"
                        onChange={e => {
                            console.log(e);
                        }}
                    />
                    <div>{billingAddress.street}</div>
                    <div>{creditCardInfo.number}</div>
                </div>
            );
        }
    }
);
