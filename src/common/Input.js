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
        <div className={className + ' inline-flex'}>
            {isRequired && <span className="required">*</span>}
            {type === 'text' && (
                <input
                    onChange={onChange}
                    required={isRequired}
                    placeholder={label}
                    name={name}
                    type={type}
                />
            )}
            {type === 'select' && (
                <select
                    onChange={onChange}
                    name={name}
                    className={!isRequired ? 'require-align' : ''}
                >
                    {selectOptions &&
                        selectOptions.map((item, index) => (
                            <option key={'option' + index}>{item}</option>
                        ))}
                </select>
            )}
            {errorMessage && !isValid && touched ? (
                <label className="error-message">{errorMessage}</label>
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
