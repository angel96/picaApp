const Vehiculo = require('../models/vehiculo.model.js');

// Create and Save a new Vehiculo
exports.create = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.matricula){
        return res.status(400).send({
            message: "El nombre del vehiculo no puede estar vacío"
        });
    }

    //Crear un vehiculo
    const vehiculo = new Vehiculo({
        propietario: req.body.propietario || "Sin propietario",
        tipo: req.body.tipo || "Sin tipo",
        cargaMaxima: req.body.cargaMaxima || "Sin carga máxima",
        matricula: req.body.matricula
    });

    //Guardar en base de datos el vehiculo
    vehiculo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando la nota."
        });
    });

};

// Retrieve and return all vehiculos from the database.
exports.findAll = (req, res) => {

};

// Find a single vehiculo with a vehiculoId
exports.findOne = (req, res) => {

};

// Update a vehiculo identified by the vehiculoId in the request
exports.update = (req, res) => {

};

// Delete a vehiculo with the specified vehiculoId in the request
exports.delete = (req, res) => {

};