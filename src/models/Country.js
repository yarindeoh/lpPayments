import { types } from 'mobx-state-tree';

const Country = types
    .model('Country', {
        countryName: types.optional(types.string, ''),
        countryCode: types.optional(types.string, ''),
        displayName: types.optional(types.string, '')
    })
    .actions(self => ({
        setCountry(item) {
            self.countryCode = item.countryCode;
            self.countryName = item.countryName;
            self.displayName = item.displayName;
        }
    }));

export default Country;
