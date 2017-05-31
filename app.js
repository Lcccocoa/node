var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var credentials = require('./credentials');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
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

// 用户控制器
var userController = require('./controller/userController');
// 路由
var userRouter = require('./router/user');
// api
var userApi = require('./api/user');

// 端口
app.set('port', process.env.PORT || 3000);
// 静态文件目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/uikit/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/vue/dist'));
// body 解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cookie
app.use(cookieParser(credentials.cookieSecret));
// session
app.use(session({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
// 设置模板引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// 设置flash
app.use(flash());
// 配置passport
app.use(userController.passport.initialize());
app.use(userController.passport.session());

// api
app.use('/api', userApi);
// 用户路由
app.use('/user', userRouter);

app.get('/', function(req, res) {
    res.render('home');
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(req, res) {
    res.status(500);
    res.render('500');
});

// app.listen(app.get('port'), '192.168.58.100', function(params) {
//     console.log('start on http://localhost:' + app.get('port'));
// });
app.listen(app.get('port'), function(params) {
    console.log('start on http://localhost:' + app.get('port'));
});