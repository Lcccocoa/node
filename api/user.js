var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/user/login', function(req, res, next) {
    res.json({ msg: 'get....' });
}).post('/user/login', function(req, res, next) {
    models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(data) {
        if (data) {
            if (data.username === req.body.username &&
                data.password === req.body.password) {
                req.session.user = JSON.stringify(data);
                res.json(JSON.stringify({
                    code: 0,
                    msg: '校验成功',
                    data: [data]
                }));
            } else {
                res.json(JSON.stringify({
                    code: 1,
                    msg: '用户名或密码错误',
                    data: null
                }));
            }
        } else {
            res.json(JSON.stringify({
                code: 1,
                msg: '用户不存在',
                data: null
            }));
        }
    });
});

module.exports = router;