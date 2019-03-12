//2 middlewares, 1 vai interpretar o body parser, usando o json no body
//o cors é p permitir q outra aplicação acesse o backend
const bodyParser = require ('body-parser')
const cors = require('cors')

module.exports = app =>{
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())                                                                          // body parser q vem da req 


}