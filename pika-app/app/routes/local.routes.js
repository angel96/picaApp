module.exports = (app, middleware) => {
    const local = require('../controllers/local.controller.js');

    // Create a new local
    app.post('/local',middleware, local.create);

    // Retrieve all local
    app.get('/local',middleware, local.findAll);

    // Retrieve a single local with localId
    app.get('/local/:localId',middleware,local.findOne);

    // Update a local with localId
    app.put('/local/:localId',middleware,local.update);

    // Delete a local with localId
    app.delete('/local/:localId',middleware,local.delete);
}