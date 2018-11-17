import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Input from 'common/components/Input';
import {
    countryCodeValidator,
    streetValidator
} from 'src/containers/Payment/helpers/validators';

@observer
class BillingAddress extends Component {
    static propTypes = {
        onInputChange: PropTypes.func
    };

    getCountries = name => {
        const codeArray = [];
        const { countriesCode } = this.props.billingAddress;
        const countriesObj = countriesCode.getCountriesCode();
        for (let key in countriesObj) {
            if (countriesObj.hasOwnProperty(key)) {
                codeArray.push(countriesObj[key][name]);
            }
        }
        return codeArray;
    };

    render() {
        const { street, selectedCountry } = this.props.billingAddress;
        const countries = this.getCountries('displayName');
        const codes = this.getCountries('countryCode');
        const { onInputChange } = this.props;
        return (
            <div className="addressCont">
                <label>Billing Address</label>
                <div className="billingAddress row">
                    <Input
                        className="street col-25"
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
                        className="country col-50"
                        label="Country"
                        type="select"
                        name="selectedCountry"
                        selectOptions={countries}
                        selectFirst
                        isRequired
                        isValid={selectedCountry.isValid}
                        touched={selectedCountry.touched}
                        errorMessage={selectedCountry.errorMessage}
                        value={selectedCountry}
                        onChange={onInputChange.bind(
                            this,
                            'billingAddress',
                            countryCodeValidator.bind(this, codes)
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default BillingAddress;
