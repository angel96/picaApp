const mongoose = require('mongoose');

const valoracionSchema = mongoose.Schema({
    valoracion: Number,
    local: { 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Local'
    },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User'
    }
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true,
    autoCreate: true
});

module.exports = mongoose.model('Valoracion', valoracionSchema);