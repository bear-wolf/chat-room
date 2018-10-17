/**
 * Created by andrew on 2/1/17.
 */
var app, client,
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');

app = express();
app.set('port', 3001);

require('./dependencies');

// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });


http.createServer(app).listen(app.get('port'), function () {
    var routes = require('./routes/index').createInstance();

    console.log('Express server listening on port '+ app.get('port'));

    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }))
    // app.use(bodyParser.json()) // parse application/json
    //console.log('modules', dependencies);

    routes.assignRoutes(app);
})
process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
process.on('finish', function() {
    console.log('request end');
});