import { types } from 'mobx-state-tree';
import Country from './Country';

const CountriesCode = types
    .model('CountriesCode', {
        items: types.array(Country),
        isFetched: false
    })
    .actions(self => ({
        setCountries(values) {
            values.map(item => {
                this.add(item);
            });
            self.isFetched = true;
        },
        add(item) {
            self.items.push({
                ...item,
                countryName: item.countryName,
                countryCode: item.countryCode,
                displayName: item.countryName + ' - ' + item.countryCode
            });
        }
    }))
    .views(self => ({
        getCountriesCode() {
            return self.items.map(item => item.countryCode);
        },
        getCountryDisplayName() {
            return self.items.map(item => item.displayName);
        }
    }));
export default CountriesCode;
