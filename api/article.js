var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/get/:id', function(req, res) {
    console.log(req.params);
    models.Article.findById(req.params.id).then(function(data) {
        var code = 0;
        if (data) code = 0;
        else code = 1;
        res.json({
            code: code,
            msg: '',
            data: data
        });
    });
});

// 更新
router.post('/update', function(req, res) {
    console.log(req.body);
    models.Article.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(data) {
        if (data) {
            data.title = req.body.title;
            data.tag = req.body.tag;
            data.content = req.body.content;
            data.save().then(function(result) {
                console.log(result);
                var code = 0;
                if (result) code = 0;
                else code = 1;
                res.json({
                    code: code,
                    msg: '',
                    data: null
                });
            });
        } else {
            res.json({
                code: 1,
                msg: '',
                data: null
            });
        }
    });


});

// 删除
router.delete('/delete', function(req, res) {
    models.Article.findById(req.body.id).then(function(data) {
        if (data) {
            code = 0;
            data.destroy().then(function(result) {
                if (result) {
                    res.json({
                        code: 0,
                        msg: '',
                        data: null
                    });
                } else {
                    res.json({
                        code: 1,
                        msg: '',
                        data: null
                    });
                }
            });
        } else {
            res.json({
                code: 1,
                msg: '',
                data: null
            });
        }

    });
});

module.exports = router;