const delay = require('webpack-api-mocker/utils/delay');
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
    'GET /api/test': {
        result: '200'
    }
};

module.exports = noProxy ? {} : delay(proxy, 3000);
