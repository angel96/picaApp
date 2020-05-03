module.exports = (app) => {
    const tipoVehiculos = require('../controllers/tipoVehiculo.controller.js');

    // Create a new vehiculo
    app.post('/tipoVehiculo', tipoVehiculos.create);

    // Retrieve a single vehiculo with vehiculoId
    app.get('/tipoVehiculo/:tipoVehiculoId', tipoVehiculos.findOne);

    // Retrieve all vehiculos
    app.get('/tipoVehiculo', tipoVehiculos.findAll);

    // Update a vehiculo with vehiculoId
    app.put('/tipoVehiculo/:tipoVehiculoId', tipoVehiculos.update);

    // Delete a vehiculo with vehiculoId
    app.delete('/tipoVehiculo/:tipoVehiculoId', tipoVehiculos.delete);
}