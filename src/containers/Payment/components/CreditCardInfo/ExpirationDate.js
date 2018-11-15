import React from 'react';
import Input from 'common/Input';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import {
    EXPIRATION_MOUNTS,
    EXPIRATION_YEARS
} from 'src/containers/Payment/PaymentConstants';
import { expirationValidator } from 'src/containers/Payment/helpers/validators';

@observer
class ExpirationDate extends React.Component {
    static propTypes = {
        onInputChange: PropTypes.func,
        expirationDate: PropTypes.object
    };

    render() {
        const { expirationDate, onInputChange } = this.props;
        return [
            <Input
                key="expirationMonth"
                className="expirationMonth col-25"
                label="Month"
                type="select"
                name="month"
                selectOptions={EXPIRATION_MOUNTS}
                value={expirationDate}
                isValid={expirationDate.isValid}
                touched={expirationDate.touched}
                errorMessage={expirationDate.errorMessage}
                onChange={onInputChange.bind(
                    this,
                    ['creditCardInfo', 'expirationDate'],
                    expirationValidator.bind(this, expirationDate)
                )}
            />,
            <Input
                key="expirationYear"
                className="expirationYear col-25"
                label="Year"
                type="select"
                name="year"
                selectOptions={EXPIRATION_YEARS}
                value={expirationDate}
                isValid={expirationDate.isValid}
                touched={expirationDate.touched}
                onChange={onInputChange.bind(
                    this,
                    ['creditCardInfo', 'expirationDate'],
                    expirationValidator.bind(this, expirationDate)
                )}
            />
        ];
    }
}

export default ExpirationDate;
