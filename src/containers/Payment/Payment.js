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
        this.props.store.form.isLoading = true;
        try {
            await axios.get('/api/test');
            this.props.routing.push('/success');
        } catch (e) {
            this.props.routing.push('/error');
        }
        this.props.store.form.isLoading = false;
    }

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
                        <button
                            className="btn"
                            type="submit"
                            disabled={!form.isFormValid}
                        >
                            Proceed to checkout
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default Payment;
