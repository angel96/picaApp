const TipoVehiculo = require('../models/tipoVehiculo.model.js');

// Create and Save a new Vehiculo
exports.create = (res) => {

    //Crear un vehiculo
    const tipoVehiculo = new TipoVehiculo({
        tipo: ['COCHE','PATINETE', 'BICICLETA', 'NO TIPO']
    });

    //Guardar en base de datos el vehiculo
    tipoVehiculo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando el tipo del vehiculo."
        });
    });

};