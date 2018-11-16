const delay = require('webpack-api-mocker/utils/delay');

const proxy = {
    'POST /api/payment': {
        result: '200'
    }
};

module.exports = delay(proxy, 3000);
