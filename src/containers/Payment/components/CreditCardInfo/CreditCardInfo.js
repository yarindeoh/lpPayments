import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ExpirationDate from './ExpirationDate';
import {
    cvvValidator,
    creditCardValidator
} from 'src/containers/Payment/helpers/validators';
import Input from 'common/components/Input';
import CreditCardLogo from './CreditCardLogo';
import supportedCards from 'resources/images/creditcards-sprite.png';

@observer
class CreditCardInfo extends Component {
    static propTypes = {
        onInputChange: PropTypes.func
    };

    render() {
        const { number, cvv, expirationDate } = this.props.creditCardInfo;
        const { onInputChange } = this.props;
        return (
            <div className="creditCardInfo">
                <label>Credit Card Details</label>
                <img className="supported-logos" src={supportedCards} />
                <div className="row">
                    <Input
                        className="creditCardNumber col-75"
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
                    <div className="card-logo col-1">
                        <CreditCardLogo cardNumber={number.value} />
                    </div>
                </div>
                <div className="credit-card-details row">
                    <ExpirationDate
                        expirationDate={expirationDate}
                        onInputChange={onInputChange}
                    />
                    <Input
                        className="cvv col-25"
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
                </div>
            </div>
        );
    }
}

export default CreditCardInfo;
