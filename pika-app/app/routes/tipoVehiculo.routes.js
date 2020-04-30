module.exports = (app) => {
    const tipoVehiculos = require('../controllers/tipoVehiculo.controller.js');

    // Create a new vehiculo
    app.post('/tipoVehiculo', tipoVehiculos.create);
}