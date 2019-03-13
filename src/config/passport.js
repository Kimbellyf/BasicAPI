//responsável pela leitura do jwt e verificar se ele é valido ou n, expirado ou n, vai fazer automaticamente


const {authSecret} = require('/env')                                                         //vai precisar ler o token e ver se ele foi assinado de forma correta
const passport = require ('passport')
const passportJwt = require('passport-jwt')
const {Strategy , ExtractJwt } = passportJwt                                                   ////metodo p extrair o token da requisicao //o json além de vir o próprio body vai vir td o cabeçalho:, eu poderia tbm pegar manualmente na parte do 'authorization'

//                                                                                               //estrategia p tirar/extrair o 
module.exports = app =>{
    const params = {
        secretOrkey: authSecret,                                                                  //segredo p decodificar o token
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()                                  // Bearer= portador, por essa f vai pegar o token pelo cabeçalho da req e fai colocar a chave ai
    }
    const strategy = new Strategy(params, (payload, done) => {                                    // o payload era do signin, nos codif o payload pelo authsecret 
        app.db('usuarios')                                                                           //obtendo o usuario pelo id, pegando só 1
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))                             //se o user tiver setado eu vou pegar o payload, se n tiver, vai p o false
            .catch(err => done(err, false))                                                      //param caso dê erro
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })                     //authenticate p filtrar nas rotas as requicoes q precisam q o user esteja c token/usermlogado // session false p n ter nenhum tipo de controle sobre sessao da autentif
    }

}