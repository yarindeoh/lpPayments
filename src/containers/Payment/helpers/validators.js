import { isUndefined, isEmptyString, isNumber } from 'utils/helpers';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

export function streetValidator(street) {
    return !isEmptyString(street) && isUndefined(street);
}

/**
 * Check if the selected country is valid
 * or added in a malicious way
 * @param codes
 * @param selectedCountry
 * @returns {boolean}
 */
export function countryCodeValidator(codes, selectedCountry) {
    const codeName = selectedCountry.split('-')[1].trim();
    return isUndefined(codeName) && Object.values(codes).includes(codeName);
}

//todo:: add number validation
export function cvvValidator(cvv) {
    return isUndefined(cvv) && isNumber(cvv) && cvv.length === 3;
}

/**
 * If its the current year, cant chose fast months
 * @param month
 * @param year
 * @returns {boolean}
 */
export function expirationValidator({ year, month }) {
    let formattedYear = Number(year);
    let formattedMonth = Number(month.split('-')[0].trim());
    let yearValidation = expirationYearValidator(formattedYear);
    let monthValidation = formattedMonth >= 1 && formattedMonth <= 12;

    if (CURRENT_YEAR === formattedYear) {
        return CURRENT_MONTH <= formattedMonth;
    }
    return yearValidation && monthValidation;
}

/**
 * Year range from current year until year+8
 * @param year
 * @returns {boolean}
 */
export function expirationYearValidator(year) {
    let maxRangeYear = CURRENT_YEAR + 8;
    return CURRENT_YEAR <= year && year <= maxRangeYear;
}

export function creditCardValidator(cardNumber) {
    return (
        isUndefined(cardNumber) &&
        isNumber(cardNumber) &&
        cardNumber.length === 16
    );
}
