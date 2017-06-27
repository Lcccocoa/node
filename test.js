/**
 * Created by lcccocoa on 2017/6/27.
 */

var async = require('async');

async.parallel([
    function(callback) {
        console.log('1');
        callback(null,'1');
    },
    function(callback) {
        console.log('2');
        callback(null,'2');
    },
    function(callback) {
        console.log('3');
        callback(null,'3');
    }
],
function(err, result) {
    console.log(result);
});