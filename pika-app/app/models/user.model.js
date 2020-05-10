//https://verticalaxisbd.com/blog/inheritance-mongodb-mongoose/

const mongoose = require('mongoose');
var UserAccount = require('../models/userAccount.model.js');
var util = require('util');
var Schema = mongoose.Schema;
mongoose.model('UserAccount');
require('./userAccount.model');

function BaseSchema(){
    Schema.apply(this,{
        timestamps: true,
        autoCreate: true
    });

    this.add({
        userAccount: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserAccount'
         },
        name: String,
        surnames: String,
        location: String
    });
}

util.inherits(BaseSchema, Schema);

var UserSchema = new BaseSchema();

UserSchema.virtual('type').get(function () { return this.__t; });

var User = mongoose.model('User', UserSchema);

var usuarioVehiculo = new BaseSchema({creditCard:{type:String}});
User.discriminator('UsuarioVehiculo', usuarioVehiculo);

var usuarioLocal = new BaseSchema({numeroLocal:{type:String}});
User.discriminator('UsuarioLocal', usuarioLocal);