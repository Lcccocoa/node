var express = require('express');
var router = express.Router();

var user = require('./user');
var article = require('./article');

router.use('/user', user);
router.use('/article', article);

module.exports = router;