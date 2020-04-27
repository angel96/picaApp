const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Tipos = Object.freeze({
    Coche: 'COCHE',
    Bicicleta: 'BICICLETA',
    Patinete: 'PATINETE',
  });

//Crea el esquema de la clase
const VehiculoSchema = mongoose.Schema({
    propietario: String,
    tipo: { 
        type: String,
        enum: Object.values(Tipos),
     },
    cargaMaxima: String,
    matricula: { 
        type: String, index: true, unique: true, required: true
    }
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true
});

VehiculoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Vehiculo', VehiculoSchema);