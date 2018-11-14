import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    label,
    className,
    isRequired,
    onChange,
    type,
    selectOptions,
    name,
    value,
    isValid,
    touched,
    errorMessage
}) => {
    return (
        <div className={className}>
            {isRequired && <span className="required">*</span>}
            {type === 'text' && (
                <input
                    // className={!isValid && touched ? 'error' : 'valid'}
                    onChange={onChange}
                    required={isRequired}
                    placeholder={label}
                    name={name}
                    type={type}
                />
            )}
            {type === 'select' && (
                <select onChange={onChange} name={name}>
                    {selectOptions &&
                        selectOptions.map((item, index) => (
                            <option key={'option' + index}>{item}</option>
                        ))}
                </select>
            )}
            {errorMessage && !isValid && touched ? (
                <label className="errorMessage">{errorMessage}</label>
            ) : (
                ''
            )}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    selectOptions: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.object,
    touched: PropTypes.bool
};

export default Input;
