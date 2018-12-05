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

var Date = {
    getNow : function () {
        return global.moment().format(Common['FORMAT_DATE']);
    },
}

var Common = {
    FORMAT_DATE: 'YYYY-MM-DD HH:mm:ss',
    FORMAT_DATE_END_RU: 'DD.MM.YYYY HH:mm',
    FORMAT_DATE_END_EN: 'MM/DD/YYYY hh:mm A',

    date: Date,

    getCurrentFormatDate : function () {
        return this['FORMAT_DATE_END_EN'];
    },


    isFunction: function (handler) {
        return (typeof handler == 'function') ? true : false;
    }
}
 
module.exports = Common; 