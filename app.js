var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var credentials = require('./credentials');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var flash = require('connect-flash');
// var hbs = require('hbs');
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    extname: 'html',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

// 用户控制器
var userController = require('./controller/userController');
// 路由
var userRouter = require('./router/user');
// api
var api = require('./api/api');

// 端口
app.set('port', process.env.PORT || 3000);

// app.configure(function() {
// 静态文件目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/uikit/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/vue/dist'));
app.use(express.static(__dirname + '/node_modules/zui/dist'));
app.use(express.static(__dirname + '/node_modules/sweetalert/dist'));
app.use(express.static(__dirname + '/node_modules/axios/dist'));
// cookie
app.use(cookieParser());
// body 解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// session
app.use(session({
    store: new RedisStore({
        host: '127.0.0.1',
        port: 6379,
        db: '0'
    }),
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

// 设置模板引擎
app.engine('.html', handlebars.engine);
app.set('view engine', '.html');
// hbs.registerHelper('section', function(name, options) {
//     if (!this._sections) this._sections = {};
//     this._sections[name] = options.fn(this);
//     return null;
// });
// hbs.registerPartials(__dirname + '/views/partials');

// app.set('view engine', 'html');
// app.engine('html', hbs.__express);

// 配置passport
app.use(userController.passport.initialize());
// 设置flash
app.use(flash());
app.use(userController.passport.session());
// });


// api
app.use('/api', api);
// 用户路由
app.use('/user', userRouter);

app.get('/', function(req, res) {
    res.render('home');
});

app.use(function(req, res) {
    res.status(404);
    res.render('404', { layout: null });
});

app.use(function(req, res) {
    res.status(500);
    res.render('500', { layout: null });
});

// app.listen(app.get('port'), '192.168.58.100', function(params) {
//     console.log('start on http://localhost:' + app.get('port'));
// });
app.listen(app.get('port'), function(params) {
    console.log('start on http://localhost:' + app.get('port'));
});