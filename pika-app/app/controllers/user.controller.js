const User = require('../models/user.model.js');
const UserAccount = require('../models/userAccount.model.js');
var mongoose = require('mongoose');
var UsuarioLocal = mongoose.model('UsuarioLocal');
var UsuarioVehiculo = mongoose.model('UsuarioVehiculo');

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
                res.send(data);
            }).catch(err => {
                console.log("1");
                res.status(500).send({
                    message: err.message || "Algún error ha ocurrido creando el usuario. 1"
                });
            });
        }
       
    }).catch(err => {
        console.log("2");
        res.status(500).send({
            message: err.message || "Algún error ha ocurrido creando el usuario. 2"
        });
    });
};

exports.findOneLocal = (req, res) => {
    var userId = req.params.userId;
    
    UsuarioLocal.findById(userId).then(data => {
        console.log(data);
        var account = UserAccount.findById(data.userAccount);
        console.log(account);
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

exports.findOneVehicle = (req, res) => {
    var userId = req.params.userId;
    
    UsuarioVehiculo.findById(userId).then(data => {
        console.log(data);
        var account = UserAccount.findById(data.userAccount);
        console.log(account);
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

exports.updateLocal = (req, res) => {

    var userId = req.params.userId;
    
    var json = {};

        UsuarioLocal.findByIdAndUpdate(userId, {
            name: req.body.name,
            surnames: req.body.surnames,
            location: req.body.location
        }, { new: true }).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Local no encontrado con el id " + userId
                });
            } else {
    
                var acc = UserAccount.findOne(data.userAccount);
    
                if(acc.username != req.body.username && acc.password != req.body.password){
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

exports.updateVehiculo = (req, res) => {
    var userId = req.params.userId;
    
    var json = {};

    UsuarioVehiculo.findByIdAndUpdate(userId, {
        name: req.body.name,
        surnames: req.body.surnames,
        location: req.body.location
    }, { new: true }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Local no encontrado con el id " + userId
            });
        } else {

            var acc = UserAccount.findOne(data.userAccount);

            if(acc.username != req.body.username && acc.password != req.body.password){
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