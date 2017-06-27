var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

var article = require('./article');

var models = require('../models');

var async = require('async');

// 登录
router.get('/login', function(req, res, next) {
    res.render('admin/login', {
        message: req.flash('error'),
        layout: null
    });
}).post('/login', userController.passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    // failureFlash: true,
    failureFlash: '用户或密码无效'
}));

var isAuthenticated = function(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.redirect('/admin/login');
};

// 用户首页
router.get('/', isAuthenticated, function(req, res) {

    res.render('admin/index', { layout: 'admin', nav_title: '后台' });
});

// 文章
router.use('/article', isAuthenticated, article);

module.exports = router;