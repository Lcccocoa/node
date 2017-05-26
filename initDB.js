// 数据库
var models = require('./models');
models.sequelize.sync().then(function() {
    var username = 'Lccios@163.com';
    var password = '5201314';
    models.User.create({
        username: username,
        password: password
    }).then(function() {
        console.log('创建User:\nusername:' + username + '\n password:' + password);
    });
});