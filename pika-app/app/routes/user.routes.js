module.exports = (app, middleware) => {
    const user = require('../controllers/user.controller.js');
    
    // Create a new user
    app.post('/user', user.create);

    // Retrieve a single user with userId
    app.get('/user/:userId',middleware, user.findOne);

    // Update a user with userId
    app.put('/user/:userId',middleware,user.update);
}