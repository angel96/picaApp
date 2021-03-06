const mongoose = require('mongoose');

//Crea el esquema de la clase
const LocalSchema = mongoose.Schema({
    propietario: { 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User.__t'
    },
    direccion: String,
    numMaxVehiculo: Number,
    disponible: Boolean
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true,
    autoCreate: true
});

module.exports = mongoose.model('Local', LocalSchema);