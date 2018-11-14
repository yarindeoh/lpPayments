import React from 'react';
import Input from 'common/Input';
import { observer } from 'mobx-react';

import {
    EXPIRATION_MOUNTS,
    EXPIRATION_YEARS
} from 'src/containers/Payment/PaymentConstants';
import { expirationValidator } from 'src/containers/Payment/helpers/validators';

@observer
class ExpirationDate extends React.Component {
    render() {
        const { expirationDate, onInputChange } = this.props;
        return (
            <div>
                <Input
                    className="expirationMonth"
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
                />
                <Input
                    className="expirationYear"
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
            </div>
        );
    }
}

export default ExpirationDate;
