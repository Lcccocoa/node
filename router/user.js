var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/login', function(req, res, next) {
    res.render('user/login');
}).post('/login', function(req, res, next) {
    axios.post('/api/user/login', {
        username: req.body.username,
        password: req.body.password
    }, {
        proxy: {
            port: 3000
        }
    }).then(function(response) {
        if (response.code === 0) {
            res.redirect('/');
        } else {
            res.redirect(303, 'user/login');
        }
    }).catch(function(error) {
        res.redirect(303, 'user/login');
    });
});

module.exports = router;