//criando 
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const usuarioSchema = new Schema({
    nome:{
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
    senha:{
        type: String,
        required: true,
        select: false
    }
    
})
module.exports = mongoose.model('user', UserSchema);