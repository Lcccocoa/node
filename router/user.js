var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

var article = require('./article');

// 登录
router.get('/login', function(req, res, next) {
    // res.render('user/login', { message: '登录出错' });
    res.render('user/login', { message: req.flash('error') });
}).post('/login', userController.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

var isAuthenticated = function(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.redirect('/user/login');
};

// 文章
router.use(article);

module.exports = router;