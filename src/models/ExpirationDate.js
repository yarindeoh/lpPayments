import { types } from 'mobx-state-tree';
import {
    EXPIRATION_YEARS,
    EXPIRATION_MOUNTS
} from '../containers/Payment/PaymentConstants';

const ExpirationDate = types
    .model('ExpirationDate', {
        year: EXPIRATION_YEARS[0],
        month: EXPIRATION_MOUNTS[0],
        isValid: true,
        touched: false,
        errorMessage: types.string
    })
    .actions(self => ({
        updateProperty(name, value, validFunc) {
            self[name] = value;
            self.touched = true;
            self.isValid = validFunc(value);
        },
        getValidity() {
            return self.isValid;
        }
    }));

export default ExpirationDate;
