import { types } from 'mobx-state-tree';
import BillingAddress from './BillingAddress';
import CreditCardInfo from './CreditCardInfo';
import PaymentForm from './PaymentForm';
import { autorun } from 'mobx/lib/mobx';

const PaymentModel = types.model('PaymentModel', {
    billingAddress: types.optional(BillingAddress, {}),
    creditCardInfo: types.optional(CreditCardInfo, {}),
    form: types.optional(PaymentForm, {})
});

const payment = PaymentModel.create();

//TODO:: connect autorun to every state change
autorun(() => {
    const { creditCardInfo, billingAddress } = payment;
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
    payment.form.updateFormValidity(isFormValid);
});

export default PaymentModel;
