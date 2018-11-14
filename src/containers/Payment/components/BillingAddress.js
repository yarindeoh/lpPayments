import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Input from 'common/Input';
import {
    countryCodeValidator,
    streetValidator
} from 'src/containers/Payment/helpers/validators';

@inject('store')
@observer
class BillingAddress extends Component {
    static propTypes = {};

    render() {
        const { billingAddress, getCountriesCode } = this.props.store;
        const { street, countries, selectedCountry } = billingAddress;
        const { onInputChange } = this.props;
        return (
            <div className="billingAddress">
                <label>Billing Address</label>
                <Input
                    className="street"
                    label="Street Address"
                    type="text"
                    name="street"
                    isRequired
                    value={street}
                    isValid={street.isValid}
                    touched={street.touched}
                    errorMessage={street.errorMessage}
                    onChange={onInputChange.bind(
                        this,
                        'billingAddress',
                        streetValidator
                    )}
                />
                <Input
                    className="country"
                    label="Country"
                    type="select"
                    name="selectedCountry"
                    selectOptions={countries}
                    isRequired
                    isValid={selectedCountry.isValid}
                    touched={selectedCountry.touched}
                    errorMessage={selectedCountry.errorMessage}
                    value={selectedCountry}
                    onChange={onInputChange.bind(
                        this,
                        'billingAddress',
                        countryCodeValidator.bind(this, getCountriesCode)
                    )}
                />
            </div>
        );
    }
}

export default BillingAddress;
