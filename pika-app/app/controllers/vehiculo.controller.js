const Vehiculo = require('../models/vehiculo.model.js');

const TipoVehiculo = require('../models/tipoVehiculo.model.js');

// Create and Save a new Vehiculo
exports.create = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.matricula){
        return res.status(400).send({
            message: "La matrícula del vehículo no puede estar vacío"
        });
    }

    //Crear un vehiculo
    const vehiculo = new Vehiculo({
        propietario: req.body.propietario || "Sin propietario",
        tipo: req.body.tipo || "NO TIPO",
        cargaMaxima: req.body.cargaMaxima || "Sin carga máxima",
        matricula: req.body.matricula
    });

    //Guardar en base de datos el vehiculo
    vehiculo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando el vehiculo."
        });
    });

};

// Retrieve and return all vehiculos from the database.
exports.findAll = (req, res) => {

    //Listar todos los vehiculos
    Vehiculo.find().then(vehiculos => {
        res.send(vehiculos);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Un error ha ocurrido al recibir la lista."
        })
    })

};

// Find a single vehiculo with a vehiculoId
exports.findOne = (req, res) => {

    //Encuentra el vehiculo por el id
    Vehiculo.findById(req.params.vehiculoId).then(vehiculo => {
        if(!vehiculo) {
            //Si no te llega devuelve un 404 de vehiculo no encontrado
            return res.status(404).send({
                message: "Vehículo con id " + req.params.vehiculoId + " no encontrado."
            })
        }
        res.send(vehiculo);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            res.status(404).send({
                message: "Vehículo con id " + req.params.vehiculoId + " no encontrado."
            })
        }
        //Si no le llega el id
        return res.status(500).send({
            message: "Error recibiendo el vehículo con la id " + req.params.vehiculoId
        })
    })

};

// Update a vehiculo identified by the vehiculoId in the request
exports.update = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.matricula){
        return res.status(400).send({
            message: "la matrícula del vehiculo no puede estar vacío"
        });
    }

    //Actualiza el vehiculo
    Vehiculo.findByIdAndUpdate(req.params.vehiculoId, {
        propietario: req.body.propietario || "Sin propietario",
        tipo: req.body.tipo || "NO TIPO",
        cargaMaxima: req.body.cargaMaxima || "Sin carga máxima",
        matricula: req.body.matricula
    }, {new: true}).then(vehiculo => {
        if(!vehiculo) {
            return res.status(404).send({
                message: "vehículo no encontrado con el id " + req.params.vehiculoId
            });
        }
        res.send(vehiculo);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehículo no encontrado con el id " + req.params.vehiculoId
            });                
        }
        return res.status(500).send({
            message: "vehículo no encontrado con el id " + req.params.vehiculoId
        });
    });
};

// Delete a vehiculo with the specified vehiculoId in the request
exports.delete = (req, res) => {
    
    Vehiculo.findByIdAndRemove(req.params.vehiculoId).then(vehiculo => {
        if(!vehiculo) {
            return res.status(404).send({
                message: "vehículo no encontrado con el id " + req.params.vehiculoId
            });
        }
        res.send({message: "Vehículo borrado correctamente!"});
    }).catch(error => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "vehículo no encontrado con el id " + req.params.vehiculoId
            });                
        }
        return res.status(500).send({
            message: "vehículo no encontrado con el id " + req.params.vehiculoId
        });
    });

};

exports.findOneWithNameTipo = (req, res) => {

    //Encuentra el vehiculo por el id
    Vehiculo.findById(req.params.vehiculoId).then(vehiculo => {
        if(!vehiculo) {
            //Si no te llega devuelve un 404 de vehiculo no encontrado
            return res.status(404).send({
                message: "Vehículo con id " + req.params.vehiculoId + " no encontrado."
            })
        }
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            res.status(404).send({
                message: "Vehículo con id " + req.params.vehiculoId + " no encontrado."
            })
        }
        //Si no le llega el id
        return res.status(500).send({
            message: "Error recibiendo el vehículo con la id " + req.params.vehiculoId
        })
    })

    var tipVeh = vehiculo.tipo;
    console.log("id tipo " + tipVeh);

    //Aqui uso el findOne para pillar el nombre del tipo

    TipoVehiculo.findById(tipVeh).then(tipoVehiculo => {
        if(!tipoVehiculo) {
            //Si no te llega devuelve un 404 de vehiculo no encontrado
            return res.status(404).send({
                message: "Tipo de Vehículo con id " + req.params.tipoVehiculoId + " no encontrado."
            })
        }
        //Aqui se obtiene el nombre que queremos
        var nombre = tipoVehiculo.nombreTipo;
        //
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

    console.log("este " + nombre);

    var JSONModificado = {
        "_id":vehiculo.id,
        "propietario":vehiculo.propietario,
        "tipo":nombre,
        "cargaMaxima":"22KW","matricula":vehiculo.cargaMaxima,
        "createdAt":vehiculo.createdAt,
        "updatedAt":vehiculo.updatedAt,
        "__v":0
    }

    console.log("nuevo json " + JSONModificado);

    var nuevoVehiculo = JSON.parse(JSONModificado);

    console.log("nuevo json " + JSON.stringify(nuevoVehiculo));

    res.send(vehiculo);

};
