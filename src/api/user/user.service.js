//refazer
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //                                                                       //vai pegar a senha e vai retornar  o hash q foi gerado a partir da senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)                                //serve p ficar mudando o hash msm q tenha a msm senha,o segredo é q vem da msm origem //(10) numero de repet para gerar o salt
        return bcrypt.hashSync(password, salt)                             //senha criptografada e usada p colocar no banco
    }

    const save = async (req, res) => {
        const user = { ...req.body }                                    //body interceptado pelo body-parser, tou espalhando o atrib e colocando em outro obj
        if(req.params.id) user.id = req.params.id

        //if(!req.originalUrl.startsWith('/users')) user.admin = false
        //if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.cpf, 'CPF não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()                   // 1 usuario , o first
            if(!user.id) {                                              //se o usuario estiver setado
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)                          //erro q o cliente n informou todas as infos
        }
        
        user.password = encryptPassword(user.password)                //criptogrando a senha do usuario
        delete user.confirmPassword                                   //n vou usar então apago

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })                               //filtro p inserir
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())                     //204 q deu td certo mas q n retorna nd
                .catch(err => res.status(500).send(err))              // 500 = erro do lado do servidor
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email','cpf', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}