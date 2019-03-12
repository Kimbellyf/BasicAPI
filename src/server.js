const porta = 3003

const express = require ('express')
const app = express()
app.get('/users',(req,res,next) =>{
    res.send({nome:'kim',cargo:'estudante'}) //converte p json
})
app.listen(porta, () =>{
    console.log('Servidor executando na porta ${porta}.')
})

