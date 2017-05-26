var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('user/login');
}).post('/login', function(req, res, next) {
    res.redirect(303, 'user/login');
});

module.exports = router;