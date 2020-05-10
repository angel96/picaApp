module.exports = (app,middleware) => {
    const tipoVehiculos = require('../controllers/tipoVehiculo.controller.js');

    // Create a new vehiculo
    app.post('/tipoVehiculo',middleware, tipoVehiculos.create);

    // Retrieve a single vehiculo with vehiculoId
    app.get('/tipoVehiculo/:tipoVehiculoId',middleware, tipoVehiculos.findOne);

    // Retrieve all vehiculos
    app.get('/tipoVehiculo',middleware, tipoVehiculos.findAll);

    // Update a vehiculo with vehiculoId
    app.put('/tipoVehiculo/:tipoVehiculoId',middleware, tipoVehiculos.update);

    // Delete a vehiculo with vehiculoId
    app.delete('/tipoVehiculo/:tipoVehiculoId',middleware, tipoVehiculos.delete);
}