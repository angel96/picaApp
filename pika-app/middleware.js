module.exports = function middleware(req, res, next) {
    
    const jwt = require('jsonwebtoken');
    const token = req.headers['access-token'];

    if (token) {

      jwt.verify(token, req.app.get('keygen'), (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Invalid Token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token not given' 
      });
    }
};