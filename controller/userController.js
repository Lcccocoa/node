//
var models = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    models.User.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        if (data == null) return done({ message: '用户不存在' });
        done(null, data);
    });
});

//
passport.use(new LocalStrategy(function(username, password, done) {
    models.User.findOne({
        where: {
            username: username
        }
    }).then(function(data) {
        if (data == null) {
            console.log('用户不存在');
            return done(null, false, { message: '用户不存在' });
        }
        if (data.password !== password) {
            console.log('密码错误');
            return done(null, false, { message: '密码错误' });
        }
        console.log(data);
        return done(null, data);
    });
}));

module.exports = {
    passport: passport
};