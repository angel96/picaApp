//https://medium.com/@asfo/autenticando-un-api-rest-con-nodejs-y-jwt-json-web-tokens-5f3674aba50e

module.exports = (app) => {
    const authentication = require('../controllers/authentication.controller.js');
    // Create a new local
    app.post('/authenticate', authentication.authenticate);
};



