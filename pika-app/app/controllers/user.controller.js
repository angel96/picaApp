const User = require('../models/user.model.js');
const UserAccount = require('../models/userAccount.model.js');

// Crear un usuario
exports.create = (req, res) => {

    var type = "";

    if(req.body.creditCard){
        type = "UsuarioVehiculo";
    } else if (req.body.localNumber){
        type = "UsuarioLocal";
    }

    //Crear una cuenta de usuario
    const userAccount = new UserAccount({
        username: req.body.username,
        password: req.body.password
    });

    //Crear un usuario
    userAccount.save().then(data => {

        var mongoose = require('mongoose');
        var UsuarioLocal = mongoose.model('UsuarioLocal');
        var UsuarioVehiculo = mongoose.model('UsuarioVehiculo');
        
        var usuarioToSave = null;

        if(type == "UsuarioLocal"){
            usuarioToSave = new UsuarioLocal({
                userAccount: data,
                name: req.body.name,
                surnames: req.body.surnames,
                location: req.body.location,
                localNumber:req.body.localNumber
            });
        } else if(type=="UsuarioVehiculo") {
            usuarioToSave = new UsuarioVehiculo({
                userAccount: data,
                name: req.body.name,
                surnames: req.body.surnames,
                location: req.body.location,
                creditCard:req.body.creditCard
            });
        }
        
        if(usuarioToSave != null){
            usuarioToSave.save().then(data => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Algún error ha ocurrido creando el usuario."
                });
            });
        }
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando el usuario."
        });
    });
};

exports.findOne = (req, res) => {
    var userId = req.params.userId;

    User.findById(userId).then(data => {
        var account = UserAccount.findById(data.userAccount);
        res.send({
            "username": account.username,
            "password": account.password,
            "name": data.name,
            "surnames": data.surnames,
            "location": data.location,
        });
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            res.status(404).send({
                message: "Usuario con id " + userId + " no encontrado."
            })
        }
        //Si no le llega el id
        return res.status(500).send({
            message: "Error recibiendo el usuario con la id " + userId
        })
    });
};

exports.update = (req, res) => {

    var userId = req.params.userId;
    
    var json = {};

    User.findByIdAndUpdate(userId, {
        name: req.body.name,
        surnames: req.body.surnames,
        location: req.body.location
    }, { new: true }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Local no encontrado con el id " + userId
            });
        } else {

            UserAccount.findByIdAndUpdate(data.userAccount, {
                
                username: req.body.username,
                password: req.body.password

            }, { new: true }).then(accountMod=> {
                
                json = {
                    "username": accountMod.username, "password": accountMod.password, 
                    "name": data.name, "surnames": data.surnames, 
                    "location": data.location
                };     
                res.send(json);
            });
            
            
        }
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con el id " + userId
            });
        }
        return res.status(500).send({
            message: "Usuario no encontrado con el id " + userId
        });
    });
};