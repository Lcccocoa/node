var express = require('express');
var router = express.Router();
var axios = require('axios');
var userController = require('../controller/userController');

router.get('/login', function(req, res, next) {
    res.render('user/login');
}).post('/login', function(req, res, next) {
    console.log('登录');
    userController.passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'user/login',
        });
});

module.exports = router;