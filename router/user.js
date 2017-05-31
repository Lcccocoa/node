var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

router.get('/login', function(req, res, next) {
    // res.render('user/login', { message: '登录出错' });
    res.render('user/login', { message: req.flash('error') });
}).post('/login', userController.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

module.exports = router;