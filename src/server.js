const express = require ('express');
const mongoose = require ('mongoose');
const http=require('http');

const app = express();
const porta = 5000;
//Iniciando o DB 
mongoose.connect('mongodb://localhost:27017/nodeapi',{useNewUrlParser:true});

const User = require ('.user.model')

//primeira rota
app.get('/',(req,res) =>{
    res.send('hello rockeseat')
    User.create({

    })

});

app.get('/users',(req,res,next) =>{
    res.send({nome:'kim',cargo:'estudante'}) //converte p json
})
app.listen(porta, () =>{
    console.log(`Servidor executando na porta ${porta}.`)
})

