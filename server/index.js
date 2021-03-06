/**
 * Created by andrew on 2/1/17.
 */
var app, client, server,
    http = require('http'),
    express = require('express'),
    webSocket = require('./web-socket.js'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser');

process.env.PORT = process.env.PORT || 3211;

app = express();
app.set('port', process.env.PORT);

require('./dependencies');

app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
})); // support json encoded bodies
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

server = http.createServer(app).listen(app.get('port'), function () {
    var routes = require('./routes/index').createInstance();
    console.log('...............................................................');
    console.log('Express server listening on port '+ app.get('port'));
    console.log('...............................................................');

    routes.assignRoutes(app);
})

webSocket.run(server);
//require('./web-socket-client.js');

process.on('exit', function (code) {
    console.log('About to exit with code:'+code);

});
process.on('uncaughtException', function (e) {
    console.log('uncaughtException: ', e);
})
// process.on('finish', function() {
//     console.log('finish');
// });

// process.on('SIGTERM', function () {
//
// })
// process.on('SIGKILL', function () {
//
// })