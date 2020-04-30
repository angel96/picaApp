const mongoose = require('mongoose');

//Crea el esquema de la clase
const TipoVehiculoSchema = mongoose.Schema({
    tipo: {
        type: String,
        enum : ['COCHE','PATINETE', 'BICICLETA', 'NO TIPO'],
        default: 'COCHE'
    }
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true
});

module.exports = mongoose.model('TipoVehiculo', TipoVehiculoSchema);