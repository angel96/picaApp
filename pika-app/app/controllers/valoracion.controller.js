const Valoracion = require('../models/valoracion.model.js');

// Create and Save a new local
exports.create = (req, res) => {

    //Comprobar respuesta valida
    if(!req.body.valoracion || !req.body.local || !req.body.usuario){
        return res.status(400).send({
            message: "Ha habido un error procesando los valores"
        });
    }

    //Crear un local
    const valoracion = new Valoracion({
        valoracion: req.body.valoracion,
        local: req.body.local,
        usuario: req.body.usuario
    });

    //Guardar en base de datos el local
    valoracion.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando la valoracion."
        });
    });

};

// Retrieve and return all locales from the database.
exports.findAll = (req, res) => {

    //Listar todos los locales
    Valoracion.find().then(valoraciones => {
        res.send(valoraciones);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Un error ha ocurrido al recibir la lista."
        })
    })

};