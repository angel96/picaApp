const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Crea el esquema de la clase
const TipoVehiculoSchema = mongoose.Schema({
    nombreTipo: { 
        type: String,
        index: true,
        unique: true, 
        required: true,
        uppercase: true
    }
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true
});

TipoVehiculoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TipoVehiculo', TipoVehiculoSchema);