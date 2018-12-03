/**
 * Created by andrew on 2/1/17.
 */
var app, client,
    http = require('http'),
    express = require('express'),
    webSocket = require('./web-socket.js'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser');


app = express();
app.set('port', 3201);

require('./dependencies');

app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

global.server = http.createServer(app).listen(app.get('port'), function () {
    var routes = require('./routes/index').createInstance();
    console.log('...............................................................');
    console.log('Express server listening on port '+ app.get('port'));
    console.log('...............................................................');

    routes.assignRoutes(app);
})

webSocket.init(global.server);

process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
process.on('finish', function() {
    console.log('request end');
});