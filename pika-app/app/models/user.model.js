const mongoose = require('mongoose');
var UserAccount = require('../models/userAccount.model.js');
mongoose.model('UserAccount');
require('./userAccount.model');
//Crea el esquema de la clase
const userSchema = mongoose.Schema({
    userAccount: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount'
     },
    name: String,
    surnames: String,
    location: String
//Añade automaticamente createdAt u UpdatedAt
}, {
    timestamps: true,
    autoCreate: true
});

module.exports = mongoose.model('User', userSchema);