# lpPayments
A single page application for sending validated payments to a payment proccessing server.

## Usage

Install all dependencies

```
yarn install
```

Run in locally - with webpack-dev-server

```
yarn start
```

Run tests / test

```
yarn test
```

Fix eslint issues

```
yarn lint-fix
```

## Main functionallity: 
The application allow users to insert their billing address and credit card info and purchase successfully.
 Purchasing stage is allow only after passing LIVE validations which are being processed in the client side while typing (a better UX approach).  
 validation such as required fields and:
  - Legitimate country code which coming from an external api server.
  - Credit card number must be a number of 16 digits.
  - CVV is a number of 3 digits.
  - Credit card expiration date must be a future date. 
 
 Only after inserting valid details, the submission will be available.
 After submission, a request is being send to a delayed mock server using webpack-api-mocker and being transferred to a success page.
 (there also an error page which will be returned (ready for future use) when the server is returning errors)
 
 **MST branch is in ongoing development and refactoring. 
 
## Technical stack
- React
- Mobx
- React-mobx  
- axios
- React-router
- webpack
- webpack-api-mocker
- babel
- eslint
- prettier
- Jest
- Sass

## MST branch - Technical stack
same as above but using also MST (mobx-state-tree, and no jest)
