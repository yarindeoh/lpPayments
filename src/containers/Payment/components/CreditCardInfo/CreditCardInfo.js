import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import ExpirationDate from './ExpirationDate';
import { cvvValidator, creditCardValidator } from 'src/containers/Payment/helpers/validators';
import Input from 'common/Input';
import CreditCardLogo from './CreditCardLogo';

@inject('store')
@observer
class CreditCardInfo extends Component {
    static propTypes = {};

    render() {
        const { creditCardInfo } = this.props.store;
        const { number, cvv, expirationDate } = creditCardInfo;
        const { onInputChange } = this.props;
        return (
            <div>
                <div className="creditCardInfo">
                    <label>Credit Card Details</label>
                    <Input
                        className="creditCardNumber"
                        label="Credit Card Number"
                        type="text"
                        name="number"
                        isRequired
                        value={number}
                        isValid={number.isValid}
                        touched={number.touched}
                        errorMessage={number.errorMessage}
                        onChange={onInputChange.bind(
                            this,
                            'creditCardInfo',
                            creditCardValidator
                        )}
                    />
                    <CreditCardLogo cardNumber={number.value} />
                </div>
                <div className="creditCardDetails">
                    <Input
                        className="cvv"
                        label="CVV"
                        type="text"
                        name="cvv"
                        isValid={cvv.isValid}
                        touched={cvv.touched}
                        errorMessage={cvv.errorMessage}
                        isRequired
                        value={cvv}
                        onChange={onInputChange.bind(
                            this,
                            'creditCardInfo',
                            cvvValidator
                        )}
                    />
                    <ExpirationDate
                        expirationDate={expirationDate}
                        onInputChange={onInputChange}
                    />
                </div>
            </div>
        );
    }
}

export default CreditCardInfo;
