/**
 * Created by andrew on 2/1/17.
 */
var app, client,
    http = require('http'),
    express = require('express'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser');


app = express();
app.set('port', 3200);

require('./dependencies');

app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

http.createServer(app).listen(3200, function () {
    var routes = require('./routes/index').createInstance();
    console.log('...............................................................');
    console.log('Express server listening on port '+ 3200);
    console.log('...............................................................');

    routes.assignRoutes(app);
})
process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
process.on('finish', function() {
    console.log('request end');
});