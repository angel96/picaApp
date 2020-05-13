module.exports = (app, middleware) => {
    const local = require('../controllers/valoracion.controller.js');

    // Create a new local
    app.post('/valoracion',middleware, local.create);

    // Retrieve all local
    app.get('/valoraciones',middleware, local.findAll);
}