import { observable } from 'mobx';

export class PaymentStore {
    @observable billingAddress = {
        street: 'yesod hamaala',
        country: ['Tel Aviv', 'Raanana']
    };
    @observable creditCardInfo = {
        number: '12345',
        cvv: '222',
        expiration: [2019, 2, 6]
    };
}

export default new PaymentStore();
