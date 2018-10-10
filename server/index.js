/**
 * Created by andrew on 2/1/17.
 */
var app,
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');

app = express();
app.set('port', 3001);


http.createServer(app).listen(app.get('port'), function () {
    var routes = require('./routes/index').createInstance();

    console.log('Express server listening on port '+ app.get('port'));

    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }))
    // app.use(bodyParser.json()) // parse application/json

    routes.assignRoutes(app);
})
process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
process.on('finish', function() {
    console.log('request end');
});