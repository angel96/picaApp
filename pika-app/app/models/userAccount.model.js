const mongoose = require('mongoose');

//Crea el esquema de la clase
const userAccountSchema = mongoose.Schema({
    username: String,
    password: String
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true,
    autoCreate: true
});

module.exports = mongoose.model('UserAccount', userAccountSchema);