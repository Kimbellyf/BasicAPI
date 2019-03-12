//parte especifica de login
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    //                                                                                //entrar 
    const signin = async (req, res) => {
        if (!req.body.name || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        //                                                                            //função aq para pegar a data q o token foi gerado pq o token vai ter uma validade
        //                                                                            //Math.floor p arredondar 
        const now = Math.floor(Date.now() / 1000)

        //                                                                             //oq vai ser mandado de volta em json
        const payload = {
            id: user.id,
            name: user.name,
            admin: user.admin,
            iat: now,                                                                 //iat(instead at) emitido em
            exp: now + (60 * 60 * 24 * 3)                                             //data de expericao do token
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)                                    //gerando o token pelo import jwt e authSecret apartir de um segredo que só o servidor sabe
        })
    }

    const validateToken = async (req, res) => {
        //                                                                              //vem com o body , caso o body n venha fica nulo
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)                  //decodificando o token
                if(new Date(token.exp * 1000) > new Date()) {                        //mult por 1000 pq ta em milliseg se for >data atual = token valido
                    return res.send(true)                                           // aq se eu quisesse, poderia enviar um token novo
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}