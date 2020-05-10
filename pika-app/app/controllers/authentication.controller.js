const UserAccount = require('../models/userAccount.model.js');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res) => {

        var user = req.body.username;
        var pass = req.body.password;

        UserAccount.find({username: user, password:pass}).then(data => {
            
               const payload = {username: user, check:  true};
              
               const token = jwt.sign(payload, req.app.get('keygen'), {
                expiresIn: 1000000000
               });
               
               res.json({
                    mensaje: 'Login successfull',
                    token: token
               });
                
        }).catch(err=> {
            res.sendStatus(403);
        });
    
};