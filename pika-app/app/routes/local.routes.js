module.exports = (app) => {
    const local = require('../controllers/local.controller.js');

    // Create a new local
    app.post('/local', local.create);

    // Retrieve all local
    app.get('/local', local.findAll);

    // Retrieve a single local with localId
    app.get('/local/:localId', local.findOne);

    // Update a local with localId
    app.put('/local/:localId', local.update);

    // Delete a local with localId
    app.delete('/local/:localId', local.delete);
}