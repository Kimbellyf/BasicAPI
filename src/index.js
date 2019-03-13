const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

//require('./config/mongodb')

app.db = db
app.mongoose = mongoose

//arq add aq automaticamente carregados
consign()
    .include('./config/passport.js')                    //a partir disso vou ter o metodo authenticate disponivel e usar nas rotas
    .then('/config/middlewares.js')
    .then('/api/validation.js')
    .then('./api')
    .then('./schedule')
    //.then('./config/routes.js')
    .into(app)

//app.listen(3000, () => {
//    console.log('inicio do back...')
//})