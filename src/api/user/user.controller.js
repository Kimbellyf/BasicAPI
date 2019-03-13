const User = require('./user.model');
const_ = require('lodash');
const express = require ('express')
const routes = express.Router();


// admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.service.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        //.post(admin(app.api.user.save))
        //.get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        //.put(admin(app.api.user.save))
        //.get(admin(app.api.user.getById))
        //.delete(admin(app.api.user.remove))

}
