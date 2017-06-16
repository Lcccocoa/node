var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

var article = require('./article');

var models = require('../models');

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

// 用户首页
router.get('/', function(req, res) {
    var pageSize = 5;
    var pageIndex = 0;
    models.Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex
    }).then(function(data) {
        res.render('admin/index', {
            articles: data.rows,
            page: {
                index: pageIndex,
                count: Math.ceil(data.count / pageSize),
                total: data.count
            },
            layout: null
        });
    });
    // res.render('admin/index', { layout: null });
});

// 文章
router.use('/article', isAuthenticated, article);

module.exports = router;