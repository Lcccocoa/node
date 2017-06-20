var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

var article = require('./article');

var models = require('../models');

var async = require('async');

// 登录
router.get('/login', function(req, res, next) {
    // res.render('user/login', { message: '登录出错' });
    res.render('admin/login', {
        message: req.flash('error'),
        layout: null
    });
}).post('/login', userController.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

var isAuthenticated = function(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.redirect('/admin/login');
};

// 用户首页
router.get('/', isAuthenticated, function(req, res) {

    res.render('admin/index', { layout: 'admin', nav_title: '后台' });
    async.waterfall([function(data, next) {
        var pageSize = 5;
        var pageIndex = 0;
        models.Article.findAndCountAll({
            limit: pageSize,
            offset: pageSize * pageIndex
        }).then(function(data) {
            return {
                articles: data.rows,
                page: {
                    index: pageIndex,
                    count: Math.ceil(data.count / pageSize),
                    total: data.count
                }
            };
        });
    }, function(data, next) {
        console.log('2');
    }, function(data, next) {
        console.log('3');
    }], function() {
        console.log('done');
    });

    // async.
    // res.render('admin/index', { layout: null });
});

// 文章
router.use('/article', isAuthenticated, article);

module.exports = router;