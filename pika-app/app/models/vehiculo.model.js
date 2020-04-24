const mongoose = require('mongoose');

//Crea el esquema de la clase
const VehiculoSchema = mongoose.Schema({
    propietario: String,
    tipo: String,
    cargaMaxima: String,
    matricula: String
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);