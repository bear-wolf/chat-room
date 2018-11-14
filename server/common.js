// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
//
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });

var Common = {
    isFunction: function (handler) {
        return (typeof handler == 'function') ? true : false;
    }
}
 
module.exports = Common; 