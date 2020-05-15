module.exports = (app, middleware) => {
    const user = require('../controllers/user.controller.js');
    
    // Create a new user
    app.post('/user', user.create);

    // Retrieve a single user with userId
    app.get('/user/local/:userId',middleware, user.findOneLocal);

    // Retrieve a single user with vehicle
    app.get('/user/vehiculo/:userId',middleware, user.findOneVehicle);

    // Update a user with userId
    app.put('/user/local/:userId',middleware,user.updateLocal);

    // Update a user with userId
    app.put('/user/vehiculo/:userId',middleware,user.updateVehiculo);
}