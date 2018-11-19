import { types } from 'mobx-state-tree';
import axios from 'axios';

import BillingAddress from './BillingAddress';
import CreditCardInfo from './CreditCardInfo';
import PaymentForm from './PaymentForm';
import { GET_COUNTRIES } from '../containers/Payment/PaymentConstants';

const PaymentModel = types
    .model({
        billingAddress: types.optional(BillingAddress, {}),
        creditCardInfo: types.optional(CreditCardInfo, {}),
        form: types.optional(PaymentForm, {})
    })
    .actions(self => ({
        getCountries() {
            axios
                .get(GET_COUNTRIES)
                .then(response => {
                    self.billingAddress.countriesCode.setCountries(
                        response.data.geonames
                    );
                })
                .catch(e => console.log(e));
        },
        checkValidity() {
            const { creditCardInfo, billingAddress } = self;
            let isFormValid;
            let validation = [];

            for (let item in creditCardInfo) {
                if (creditCardInfo.hasOwnProperty(item)) {
                    validation.push(creditCardInfo[item].getValidity());
                }
            }
            validation.push(billingAddress.street.getValidity());
            validation.push(billingAddress.selectedCountry.getValidity());
            isFormValid = !validation.includes(false);
            self.form.updateFormValidity(isFormValid);
        }
    }))
    .views(self => ({
        get getServerData() {
            const { billingAddress, creditCardInfo } = self;
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
        }
    }));

export default PaymentModel;
