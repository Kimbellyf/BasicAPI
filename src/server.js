const express = require ('express');
const mongoose = require ('mongoose');
const http=require('http');

const app = express();
const porta = 5000;
//Iniciando o DB 
mongoose.connect('mongodb://localhost:27017/nodeapi',{useNewUrlParser:true});

const User = require ('/home/kimbelly/BasicAPI/src/api/user/user.model.js')

//primeira rota
app.get('/',(req,res) =>{
    
    User.create({
        name:'kimbelly',
        email:'kim_gg@g',
        cpf:'111',
        password:'1111'

    })
    const getw = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
        return users
    }
    res.json(users)

});

app.get('/users',(req,res,next) =>{
    res.send({nome:'kim',cargo:'estudante'}) //converte p json
})
app.listen(porta, () =>{
    console.log(`Servidor executando na porta ${porta}.`)
})

