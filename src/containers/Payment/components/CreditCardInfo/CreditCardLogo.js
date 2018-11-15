import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import lock from 'resources/images/lock.png';
import mastercard from 'resources/images/mastercard.png';
import visa from 'resources/images/visa.png';
import amex from 'resources/images/amex.png';

import cardTypeHelper from 'src/containers/Payment/helpers/cardTypeHelper';

@observer
class CreditCardLogo extends Component {
    static propTypes = {};
    render() {
        const { cardNumber } = this.props;
        const path = cardTypeHelper(cardNumber);
        switch (path) {
            case 'visa':
                return <img className="logoImage" src={visa} />;
            case 'amex':
                return <img className="logoImage" src={amex} />;
            case 'mastercard':
                return <img className="" src={mastercard} />;
        }
        return <img className="logoImage" src={lock} />;
    }
}

export default CreditCardLogo;
