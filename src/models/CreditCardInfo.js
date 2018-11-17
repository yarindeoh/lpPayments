import { types } from 'mobx-state-tree';
import FormInput from './FormInput';
import ExpirationDate from './ExpirationDate';
import { ERROR_MESSAGES } from '../containers/Payment/PaymentConstants';

const CreditCardInfo = types.model('CreditCardInfo', {
    cvv: types.optional(FormInput, { errorMessage: ERROR_MESSAGES.cvv }),
    number: types.optional(FormInput, { errorMessage: ERROR_MESSAGES.number }),
    expirationDate: types.optional(ExpirationDate, {
        errorMessage: ERROR_MESSAGES.expirationDate
    })
});

export default CreditCardInfo;
