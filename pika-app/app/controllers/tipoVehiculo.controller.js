const TipoVehiculo = require('../models/tipoVehiculo.model.js');

// Create and Save a new Vehiculo
exports.create = (req, res) => {

    if(!req.body.nombreTipo){
        return res.status(400).send({
            message: "El nombre del tipo de vehiculo no puede estar vacío"
        });
    }

    //Crear un tipoVehiculo
    const tipoVehiculo = new TipoVehiculo({
        nombreTipo: req.body.nombreTipo
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

// Find a single vehiculo with a vehiculoId
exports.findOne = (req, res) => {

    //Encuentra el vehiculo por el id
    TipoVehiculo.findById(req.params.tipoVehiculoId).then(tipoVehiculo => {
        if(!tipoVehiculo) {
            //Si no te llega devuelve un 404 de vehiculo no encontrado
            return res.status(404).send({
                message: "Tipo de Vehículo con id " + req.params.tipoVehiculoId + " no encontrado."
            })
        }
        res.send(tipoVehiculo);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            res.status(404).send({
                message: "Tipo de Vehículo con id " + req.params.vehiculoId + " no encontrado."
            })
        }
        //Si no le llega el id
        return res.status(500).send({
            message: "Error recibiendo el tipo del vehículo con la id " + req.params.vehiculoId
        })
    })

};