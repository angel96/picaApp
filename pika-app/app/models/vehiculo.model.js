const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var TipoVehiculo = require('../models/tipoVehiculo.model.js');
mongoose.model('TipoVehiculo');

require('./tipoVehiculo.model');
require('../routes/tipoVehiculo.routes');

//Crea el esquema de la clase
const VehiculoSchema = mongoose.Schema({
    propietario: { 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User.__t'
    },
    tipo: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoVehiculo'
     },
    cargaMaxima: String,
    matricula: { 
        type: String, index: true, unique: true, required: true
    }
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true,
    autoCreate: true
});

VehiculoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Vehiculo', VehiculoSchema);