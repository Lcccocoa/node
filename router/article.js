var express = require('express');
var router = express.Router();
var models = require('../models');
var marked = require('marked');

function dateFormmat(date) {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

// 文章
router.get('/', function(req, res) {
    console.log(req.query);
    var pageSize = 5;
    var pageIndex = 0;

    if (req.query.index) {
        pageIndex = req.query.index;
    }

    models.Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex
    }).then(function(data) {
        res.render('user/articleList', {
            articles: data.rows,
            page: {
                index: pageIndex,
                count: Math.ceil(data.count / pageSize),
                total: data.count
            }
        });
    });
});
// 文章详情
router.get('/detail/:id', function(req, res) {
    models.Article.findById(req.params.id).then(function(data) {
        res.render('user/articleDetail', {
            article: {
                title: data.title,
                tag: data.tag,
                updatedAt: dateFormmat(data.updatedAt),
                content: marked(data.content)
            }
        });
    });
});
// 文章添加
router.get('/add', function(req, res) {
    res.render('user/articleAdd');
}).post('/add', function(req, res) {
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
// 文章修改
router.get('/update/:id', function(req, res) {
    res.render('user/articleAdd', { id: req.params.id });
}).post('/update/:id', function(req, res) {
    models.Article.findById(req.params.id).then(function(article) {
        article.update(req.body).then(function(data) {
            if (data) {
                res.redirect('/user/article');
            } else {
                res.redirect('/user/article/update/' + req.params.id);
            }
        });
    });

});

module.exports = router;