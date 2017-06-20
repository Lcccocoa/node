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
    var pageSize = 10;
    var pageIndex = 0;

    if (req.query.index) {
        pageIndex = req.query.index;
    }

    models.Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex
    }).then(function(data) {
        res.render('admin/articleList', {
            articles: data.rows,
            page: {
                index: pageIndex,
                count: Math.ceil(data.count / pageSize),
                total: data.count
            },
            layout: 'admin',
            nav_title: '文章管理'
        });
    });
});
// 文章详情
router.get('/view/:id', function(req, res) {
    models.Article.findById(req.params.id).then(function(data) {
        res.render('admin/articleDetail', {
            article: {
                title: data.title,
                tag: data.tag,
                updatedAt: dateFormmat(data.updatedAt),
                content: data.content //marked(data.content)
            },
            layout: 'admin',
            nav_title: '文章浏览'
        });
    });
});
// 文章添加
router.get('/add', function(req, res) {
    res.render('admin/articleAdd', {
        layout: 'admin',
        nav_title: '添加文章'
    });
}).post('/add', function(req, res) {
    models.Article.create(req.body).then(function(data) {
        if (data) {
            res.redirect('/user/article');
        } else {
            res.redirect('/user/article/add');
        }
    });
});
// 文章修改
router.get('/update/:id', function(req, res) {
    res.render('admin/articleAdd', {
        id: req.params.id,
        layout: 'admin',
        nav_title: '修改文章'
    });
}).post('/update/:id', function(req, res) {
    models.Article.findById(req.params.id).then(function(article) {
        article.update(req.body).then(function(data) {
            if (data) {
                res.redirect('/admin/article');
            } else {
                res.redirect('/admin/article/update/' + req.params.id);
            }
        });
    });

});

module.exports = router;