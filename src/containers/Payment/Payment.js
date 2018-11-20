import React from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import liveperson from 'resources/images/liveperson.png';
import BillingAddress from './components/BillingAddress';
import CreditCardInfo from './components/CreditCardInfo/CreditCardInfo';

@inject('store')
@observer
class Payment extends React.Component {
    onInputChange = (base, validFunc, event) => {
        const { name, value } = event.target;
        this.updateStoreProperty(base, name, value, validFunc);
    };

    updateStoreProperty = (base, name, value, validFunc) => {
        const { payment } = this.props.store;
        if (typeof base !== 'string') {
            let primaryBase = base[0];
            let secondaryBase = base[1];
            payment[primaryBase][secondaryBase].updateProperty(
                name,
                value,
                validFunc
            );
        } else {
            payment[base][name].updateProperty(value, validFunc);
        }
    };

    async onSubmitForm(e) {
        e.preventDefault();
        const serverParams = this.prepareServerParams();
        try {
            this.props.store.payment.form.updateLoadingState(true);
            await axios.post('/api/payment', serverParams);
            this.props.store.routing.push('/success');
        } catch (e) {
            this.props.store.routing.push('/error');
        }
        this.props.store.payment.form.updateLoadingState(false);
    }

    prepareServerParams = () => {
        return this.props.store.payment.getServerData;
    };

    render() {
        const {
            billingAddress,
            creditCardInfo,
            form
        } = this.props.store.payment;
        return (
            <div className="payment-container">
                <img src={liveperson} />
                {form.isLoading ? (
                    <div className="payment-spinner">
                        <MDSpinner
                            className="spinner"
                            size={100}
                            singleColor={'#fdd835'}
                            borderSize={5}
                        />
                    </div>
                ) : (
                    <form onSubmit={this.onSubmitForm.bind(this)}>
                        <div className="payment-title">Secure Payment Page</div>
                        <BillingAddress
                            billingAddress={billingAddress}
                            onInputChange={this.onInputChange}
                        />
                        <CreditCardInfo
                            creditCardInfo={creditCardInfo}
                            onInputChange={this.onInputChange}
                        />
                        <button type="submit" disabled={!form.isFormValid}>
                            Proceed to checkout
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default Payment;
