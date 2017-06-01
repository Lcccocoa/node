var express = require('express');
var router = express.Router();
var models = require('../models');

// 文章
router.get('/article', function(req, res) {
    console.log(req.query);
    var pageSize = 5;
    var pageIndex = 0;

    if (req.query.pageIndex) {
        pageIndex = req.query.pageindex;
    }

    models.Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex
    }).then(function(data) {
        res.render('user/articleList', {
            articles: data.rows,
            count: data.count,
            pageindex: pageIndex
        });
    });
});
// 文章详情
router.get('/article/detail/:id', function(req, res) {
    models.Article.findById(req.params.id).then(function(data) {
        res.render('user/articleDetail', {
            article: data
        });
    });
});
// 文章添加
router.get('/article/add', function(req, res) {
    res.render('user/articleAdd');
}).post('/article/add', function(req, res) {
    models.Article.create({
        title: req.body.title,
        tag: req.body.tag,
        content: req.body.content
    }).then(function(data) {
        if (data) {
            res.redirect('/user/article');
        } else {
            res.redirect('/user/article/add');
        }
    });
});

module.exports = router;