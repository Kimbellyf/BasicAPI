//criando 
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    cpf:{
        type: String,
        unique: true,
        required: true

    },
    password:{
        type: String,
        required: true,
        select: false
    }
    
})
module.exports = mongoose.model('user', UserSchema);