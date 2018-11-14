export const GET_COUNTRIES =
    'http://api.geonames.org/countryInfoJSON?username=dperic';
export const EXPIRATION_MOUNTS = [
    '11 - November',
    '12 - December',
    '01 - January',
    '02 - February',
    '03 - March',
    '04 - April',
    '05 - May',
    '06 - June',
    '07 - July',
    '08 - August',
    '09 - September',
    '10 - October'
];

export const EXPIRATION_YEARS = [
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026'
];

export const ERROR_MESSAGES = {
    selectedCountry: 'Must be valid country code',
    cvv: 'Must be 3 digit number',
    number: 'Must be 16 digit number',
    expirationDate: 'Must be future date',
    street: 'Address is required'
};
