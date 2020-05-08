const Local = require('../models/local.model.js');

// Create and Save a new local
exports.create = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.direccion){
        return res.status(400).send({
            message: "La dirección del local no puede ser nula"
        });
    }
    if(req.body.disponible != true){
        if(req.body.disponible != false){
            return res.status(400).send({
                message: "la disponibilidad debe ser true o false"
            });
        }
    }

    //Crear un local
    const local = new Local({
        propietario: req.body.propietario || "Sin propietario",
        direccion: req.body.direccion,
        numMaxVehiculo: req.body.numMaxVehiculo || "No hay datos",
        disponible: req.body.disponible
    });

    //Guardar en base de datos el local
    local.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando el local."
        });
    });

};

// Retrieve and return all locales from the database.
exports.findAll = (req, res) => {

    //Listar todos los locales
    Local.find().then(locales => {
        res.send(locales);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Un error ha ocurrido al recibir la lista."
        })
    })

};

// Find a single local with a localId
exports.findOne = (req, res) => {

    //Encuentra el local por el id
    Local.findById(req.params.localId).then(local => {
        if(!local) {
            //Si no te llega devuelve un 404 de local no encontrado
            return res.status(404).send({
                message: "Local con id " + req.params.localId + " no encontrado."
            })
        }
        res.send(local);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            res.status(404).send({
                message: "Local con id " + req.params.localId + " no encontrado."
            })
        }
        //Si no le llega el id
        return res.status(500).send({
            message: "Error recibiendo el local con la id " + req.params.localId
        })
    })

};

// Update a local identified by the localId in the request
exports.update = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.direccion){
        return res.status(400).send({
            message: "La dirección del local no puede ser nula"
        });
    }
    if(req.body.disponible != true){
        if(req.body.disponible != false){
            return res.status(400).send({
                message: "la disponibilidad debe ser true o false"
            });
        }
    }

    //Actualiza el local
    Local.findByIdAndUpdate(req.params.localId, {
        propietario: req.body.propietario || "Sin propietario",
        direccion: req.body.direccion,
        numMaxVehiculo: req.body.numMaxVehiculo || "No hay datos",
        disponible: req.body.disponible
    }, {new: true}).then(local => {
        if(!local) {
            return res.status(404).send({
                message: "Local no encontrado con el id " + req.params.localId
            });
        }
        res.send(local);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Local no encontrado con el id " + req.params.localId
            });                
        }
        return res.status(500).send({
            message: "Local no encontrado con el id " + req.params.localId
        });
    });
};

// Delete a local with the specified localId in the request
exports.delete = (req, res) => {
    
    Local.findByIdAndRemove(req.params.localId).then(local => {
        if(!local) {
            return res.status(404).send({
                message: "local no encontrado con el id " + req.params.localId
            });
        }
        res.send({message: "Local borrado correctamente!"});
    }).catch(error => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "local no encontrado con el id " + req.params.localId
            });                
        }
        return res.status(500).send({
            message: "local no encontrado con el id " + req.params.localId
        });
    });

};