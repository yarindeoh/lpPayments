import React from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import liveperson from 'resources/images/liveperson.png';
import { GET_COUNTRIES } from './PaymentConstants';
import BillingAddress from './components/BillingAddress';
import CreditCardInfo from './components/CreditCardInfo/CreditCardInfo';

@inject('store', 'routing')
@observer
class Payment extends React.Component {
    onInputChange = (base, validFunc, event) => {
        const { store } = this.props;
        const { name, value } = event.target;
        store.updateProperty(base, name, value);
        store.updateValidationProperty(
            base,
            name,
            validFunc && validFunc(value)
        );
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

    async componentDidMount() {
        try {
            const { data } = await axios(GET_COUNTRIES);
            const { geonames } = data;
            this.props.store.setCountriesList(geonames);
        } catch (e) {
            console.error(e);
        }
    }
    render() {
        const { form } = this.props.store;
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
                        <BillingAddress onInputChange={this.onInputChange} />
                        <CreditCardInfo onInputChange={this.onInputChange} />
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
