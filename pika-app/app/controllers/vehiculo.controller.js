const Vehiculo = require('../models/vehiculo.model.js');

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