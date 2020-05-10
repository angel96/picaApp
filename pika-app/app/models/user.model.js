//https://verticalaxisbd.com/blog/inheritance-mongodb-mongoose/

const mongoose = require('mongoose');
var UserAccount = require('../models/userAccount.model.js');
var util = require('util');
var Schema = mongoose.Schema;
mongoose.model('UserAccount');
require('./userAccount.model');

function BaseSchema(add){
    var UserSchema = mongoose.Schema({
        userAccount: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserAccount'
         },
        name: String,
        surnames: String,
        location: String
        }, {
            timestamps: true,
            autoCreate: true,
            strict: false
        });

    if(add){
        UserSchema.add(add);
    }

    return UserSchema;
}

util.inherits(BaseSchema, Schema);

var UserSchema = new BaseSchema();

UserSchema.virtual('type').get(function () { return this.__t; });

var User = mongoose.model('User', UserSchema);
module.exports = User;

var usuarioVehiculo = new BaseSchema({creditCard:{type:String}});
module.exports = User.discriminator('UsuarioVehiculo', usuarioVehiculo);


var usuarioLocal = new BaseSchema({localNumber:{type:String}});
module.exports = User.discriminator('UsuarioLocal', usuarioLocal);