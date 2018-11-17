import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import liveperson from 'resources/images/liveperson.png';
import { GET_COUNTRIES } from './PaymentConstants';
import BillingAddress from './components/BillingAddress';
import CreditCardInfo from './components/CreditCardInfo/CreditCardInfo';

@observer
class Payment extends React.Component {
    onInputChange = (base, validFunc, event) => {
        const { name, value } = event.target;
        this.updateStoreProperty(base, name, value, validFunc);
    };

    updateStoreProperty = (base, name, value, validFunc) => {
        const { payment } = this.props;
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
            this.props.store.form.isLoading = true;
            await axios.post('/api/payment', serverParams);
            this.props.routing.push('/success');
        } catch (e) {
            this.props.routing.push('/error');
        }
        this.props.store.form.isLoading = false;
    }

    prepareServerParams = () => {
        const { billingAddress, creditCardInfo } = this.props.store;
        return {
            address: billingAddress.street.value,
            country: billingAddress.selectedCountry.value,
            cvv: creditCardInfo.cvv.value,
            cardNumber: creditCardInfo.number.value,
            expirationDate: {
                year: creditCardInfo.expirationDate.year,
                month: creditCardInfo.expirationDate.month
            }
        };
    };

    //TODO:: remove fetch request to MST model
    async componentDidMount() {
        try {
            const { data } = await axios(GET_COUNTRIES);
            const { geonames } = data;
            this.props.payment.billingAddress.countriesCode.setCountries(
                geonames
            );
        } catch (e) {
            console.error(e);
        }
    }
    render() {
        // const { form } = this.props.store;
        const { billingAddress, creditCardInfo } = this.props.payment;
        return (
            <div className="payment-container">
                <img src={liveperson} />
                {/*TODO:: support form check validation and spinner*/}
                {/*{form.isLoading ? (*/}
                {/*<div className="payment-spinner">*/}
                {/*<MDSpinner*/}
                {/*className="spinner"*/}
                {/*size={100}*/}
                {/*singleColor={'#fdd835'}*/}
                {/*borderSize={5}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*) : (*/}
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
                    <button type="submit">Proceed to checkout</button>
                </form>
                {/*)}*/}
            </div>
        );
    }
}

export default Payment;
