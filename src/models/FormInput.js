import { types } from 'mobx-state-tree';

const FormInput = types
    .model('FormInput', {
        value: types.optional(types.string, ''),
        isValid: false,
        touched: false,
        errorMessage: types.string
    })
    .actions(self => ({
        updateProperty(value, validFunc) {
            self.value = value;
            self.touched = true;
            self.isValid = validFunc(value);
        },
        getValidity() {
            return self.isValid;
        }
    }));

export default FormInput;
