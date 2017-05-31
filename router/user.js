var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

// 登录
router.get('/login', function(req, res, next) {
    // res.render('user/login', { message: '登录出错' });
    res.render('user/login', { message: req.flash('error') });
}).post('/login', userController.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

// 文章
router.get('/article', function(req, res) {
    if (req.user) {
        res.render('article');
    }
    res.redirect(303, '/user/login');
});

module.exports = router;