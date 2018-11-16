import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, simulate } from 'enzyme';
import { RouterStore } from 'mobx-react-router';
import PaymentStore from 'containers/Payment/PaymentStore.js';
import Payment from 'containers/Payment/Payment';

configure({ adapter: new Adapter() });
const routeStore = new RouterStore();

describe('LP payments Tests', function() {
    it('Check Payment component rendering', () => {
        const store = PaymentStore;
        const wrapper = shallow(<Payment store={store} routing={routeStore} />);
        expect(wrapper.find('payment-container')).toBeTruthy();
    });

    it('Adding properties to the store', () => {
        const store = PaymentStore;
        store.updateProperty('billingAddress', 'street', 'zarhin');
        store.updateProperty('billingAddress', 'selectedCountry', 'israel');
        expect(store.billingAddress.street.value).toEqual('zarhin');
        expect(store.billingAddress.selectedCountry.value).toEqual('israel');
    });

    it('Changing validity of props in store', () => {
        const store = PaymentStore;
        store.updateValidationProperty('creditCardInfo', 'cvv', false);
        store.updateValidationProperty('creditCardInfo', 'number', true);
        store.updateValidationProperty(
            'creditCardInfo',
            'expirationDate',
            true
        );
        expect(store.creditCardInfo.cvv.isValid).toEqual(false);
        expect(store.creditCardInfo.number.isValid).toEqual(true);
        expect(store.creditCardInfo.expirationDate.isValid).toEqual(true);
    });

    it('Adding countries to store', () => {
        const store = PaymentStore;
        const countries = [
            { countryName: 'israel', countryCode: 'IS' },
            { countryName: 'israel2', countryCode: 'IS2' }
        ];
        store.setCountriesList(countries);
        expect(store.billingAddress.countries).toHaveLength(2);
    });

    it('Adding country codes to store', () => {
        const store = PaymentStore;
        const countries = [
            { countryName: 'israel', countryCode: 'IS' },
            { countryName: 'israel2', countryCode: 'IS2' }
        ];
        store.setCountriesList(countries);
        expect(store.billingAddress.countriesCode).toHaveLength(2);
    });
});
