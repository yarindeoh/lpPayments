import { types } from 'mobx-state-tree';
import FormInput from './FormInput';
import CountriesCode from './CountriesCode';
import { ERROR_MESSAGES } from '../containers/Payment/PaymentConstants';

const BillingAddress = types.model('BillingAddress', {
    countriesCode: types.optional(CountriesCode, {}),
    street: types.optional(FormInput, {
        errorMessage: ERROR_MESSAGES.street
    }),
    selectedCountry: types.optional(FormInput, {
        errorMessage: ERROR_MESSAGES.selectedCountry
    })
});

export default BillingAddress;
