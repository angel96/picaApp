module.exports = (app) => {
    const vehiculos = require('../controllers/vehiculo.controller.js');

    // Create a new vehiculo
    app.post('/vehiculos', vehiculos.create);

    // Retrieve all vehiculos
    app.get('/vehiculos', vehiculos.findAll);

    // Retrieve a single vehiculo with vehiculoId
    app.get('/vehiculos/:vehiculoId', vehiculos.findOne);

    // Update a vehiculo with vehiculoId
    app.put('/vehiculos/:vehiculoId', vehiculos.update);

    // Delete a vehiculo with vehiculoId
    app.delete('/vehiculos/:vehiculoId', vehiculos.delete);
}