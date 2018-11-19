import { types } from 'mobx-state-tree';

const PaymentForm = types
    .model('PaymentForm', {
        isFormValid: false,
        touched: false,
        isLoading: false
    })
    .actions(self => ({
        updateFormValidity(isValid) {
            self.isFormValid = isValid;
        },
        updateLoadingState(isLoading) {
            self.isLoading = isLoading;
        }
    }));

export default PaymentForm;
