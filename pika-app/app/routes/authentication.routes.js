//https://medium.com/@asfo/autenticando-un-api-rest-con-nodejs-y-jwt-json-web-tokens-5f3674aba50e

const UserAccount = require('../models/userAccount.model.js');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    // Create a new local
    app.post('/authenticate', (req, res) => {

        var user = req.body.username;
        var pass = req.body.password;

        UserAccount.find({username: user, password:pass}).then(data => {
            
               const payload = {check:  true};
              
               const token = jwt.sign(payload, app.get('keygen'), {
                expiresIn: 1000000000
               });
               
               res.json({
                    mensaje: 'Login successfull',
                    token: token
               });
                
        }).catch(err=> {
            res.sendStatus(403);
        });
    
    });
};



