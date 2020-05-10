module.exports = (app,middleware) => {
    const vehiculos = require('../controllers/vehiculo.controller.js');

    // Create a new vehiculo
    app.post('/vehiculos', middleware,vehiculos.create);

    // Retrieve all vehiculos
    app.get('/vehiculos',middleware, vehiculos.findAll);

    // Retrieve a single vehiculo with vehiculoId
    app.get('/vehiculos/:vehiculoId',middleware, vehiculos.findOne);

    // Update a vehiculo with vehiculoId
    app.put('/vehiculos/:vehiculoId',middleware, vehiculos.update);

    // Delete a vehiculo with vehiculoId
    app.delete('/vehiculos/:vehiculoId',middleware, vehiculos.delete);
}