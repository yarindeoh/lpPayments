export function isNumber(input) {
    return !isNaN(parseInt(input));
}

export function isUndefined(input) {
    return typeof input !== 'undefined';
}

export function isEmptyString(input) {
    return input.toString().length === 0;
}