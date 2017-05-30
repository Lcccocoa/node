//
var models = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null,user.username);
});

passport.deserializeUser(function(username,done){
    done(null,{username:username});
});

//
passport.use('local', new LocalStrategy(function (username, password, done) {
    models.User.findOne({
        where: {
            username: username
        }
    }).then(function (data) {
        console.log('是否有数据:'+data);
        if (data.username !== username){
            return done(null, false, {message: 'incorrect username'});
        }
        if (data.password !== password){
            return done(null, false, {message: 'incorrect password'});
        }
        console.log(data);
        return done(null, data);
    });
}));

module.exports = {
    passport: passport
};