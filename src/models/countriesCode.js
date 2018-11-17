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
        },
        getCountriesCode2() {
            const codeArray = [];
            for (let item in self.items) {
                codeArray.push(item.displayName);
            }
            return codeArray;
        }
    }))
    .views(self => ({
        getCountriesCode() {
            return self.items.filter(item => item.displayName);
        }
    }));
export default CountriesCode;
