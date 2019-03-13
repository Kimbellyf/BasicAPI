const User = require('./user.model');
const_ = require('lodash');
const express = require ('express')
const routes = express.Router();


// admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.user.service.save)
    //app.post('/signin', app.auth.signin)
    //app.post('/validateToken', app.api.auth.validateToken)

    app.route('/user')
        .all(app.config.passport.authenticate())
        .post((app.api.user.save))             //.post(admin(app.api.user.save))
        .get((app.api.user.get))              //.get(admin(app.api.user.get))

    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .put((app.api.user.save))      //.put(admin(app.api.user.save))
        .get((app.api.user.getById))    //.get(admin(app.api.user.getById))
        
        //.delete(admin(app.api.user.remove))

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get((app.api.user.get))              //.get(admin(app.api.user.get))

}
