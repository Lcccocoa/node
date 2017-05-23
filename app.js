var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

var credentials = require('./credentials');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// 端口
app.set('port', process.env.PORT || 3000);
// 静态文件目录
app.use(express.static(__dirname + '/public'));
// body 解析
app.use(bodyParser.urlencoded({ extended: false }));
// cookie
app.use(cookieParser(credentials.cookieSecret));
// session
app.use(session());

// 设置模板引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

app.get('/', function(req, res) {
    var now = new Date();
    console.log(req.signedCookies.name);
    res.cookie('name', 'aaaaa', { signed: true });
    res.render('home', {
        year: now.getFullYear(),
        month: now.getMonth()
    });
}).post('/', function(req, res) {
    req.session.flash = {
        message: '出错了'
    };
    res.redirect(303, '/');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.post('/process', function(req, res) {
    if (req.xhr || req.accepts('json,html') === 'json') {
        res.send({ success: true });
    } else {
        res.redirect(303, '/about');
    }
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(req, res) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function name(params) {
    console.log('start on http://localhost:' + app.get('port'));
});