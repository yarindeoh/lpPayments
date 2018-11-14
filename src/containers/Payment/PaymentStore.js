import { observable, action, computed, autorun } from 'mobx';
import {
    EXPIRATION_MOUNTS,
    EXPIRATION_YEARS,
    ERROR_MESSAGES
} from './PaymentConstants';

class PaymentStore {
    @observable billingAddress = {
        countries: [],
        countriesCode: [],
        street: {
            value: '',
            isValid: false,
            touched: false,
            errorMessage: ERROR_MESSAGES.selectedCountry
        },
        selectedCountry: {
            value: '',
            isValid: false,
            touched: false,
            errorMessage: ERROR_MESSAGES.selectedCountry
        }
    };
    @observable creditCardInfo = {
        number: {
            value: '',
            isValid: false,
            touched: false,
            errorMessage: ERROR_MESSAGES.number
        },
        cvv: {
            value: '',
            isValid: false,
            touched: false,
            errorMessage: ERROR_MESSAGES.cvv
        },
        expirationDate: {
            month: EXPIRATION_MOUNTS[0],
            year: EXPIRATION_YEARS[0],
            isValid: true,
            touched: false,
            errorMessage: ERROR_MESSAGES.expirationDate
        }
    };
    @observable form = {
        isFormValid: false,
        touched: false,
        isLoading: false
    };

    /**
     * Updating property in the store
     * and managing inner store obj
     * @param base : part of the store
     * @param name : property name
     * @param value : property value
     */
    @action
    updateProperty = (base, name, value) => {
        if (typeof base !== 'string') {
            let primaryBase = base[0];
            let secondaryBase = base[1];
            this[primaryBase][secondaryBase][name] = value;
            this[primaryBase][secondaryBase].touched = true;
        } else {
            this[base][name].value = value;
            this[base][name].touched = true;
        }
        this.form.touched = true;
    };

    /**
     * update property validation dynamically
     * @param base
     * @param name
     * @param isValid
     */
    @action
    updateValidationProperty = (base, name, isValid) => {
        if (typeof base !== 'string') {
            let primaryBase = base[0];
            let secondaryBase = base[1];
            this[primaryBase][secondaryBase].isValid = !!isValid;
        } else {
            this[base][name].isValid = !!isValid;
        }
    };

    @action
    setCountriesList = data => {
        this.billingAddress.countries =
            data &&
            data.map(item => {
                return item.countryName + ' - ' + item.countryCode;
            });
        this.billingAddress.countriesCode =
            data &&
            data.map(item => {
                return item.countryCode;
            });
    };

    @computed
    get getCountriesCode() {
        return this.billingAddress.countriesCode;
    }

    @computed
    get getExpirationDate() {
        return this.creditCardInfo.expirationDate;
    }
}

const store = new PaymentStore();

/**
 * Update form validation property according
 * to live form validations
 */
autorun(() => {
    const { creditCardInfo, billingAddress } = store;
    let isFormValid;
    let validation = [];

    for (let item in creditCardInfo) {
        validation.push(creditCardInfo[item].isValid);
    }
    validation.push(billingAddress.street.isValid);
    validation.push(billingAddress.selectedCountry.isValid);
    isFormValid = !validation.includes(false);
    store.form.isFormValid = isFormValid;
});

export default store;
