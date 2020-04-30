module.exports = (app) => {
    const tipoVehiculos = require('../controllers/tipoVehiculo.controller.js');

    // Create a new vehiculo
    app.post('/tipoVehiculo', tipoVehiculos.create);

    // Retrieve a single vehiculo with vehiculoId
    app.get('/tipoVehiculo/:tipoVehiculoId', tipoVehiculos.findOne);
}