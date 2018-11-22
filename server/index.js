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
app.set('port', 3002);

require('./dependencies');

// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false
// }))

const user = {
    username: 'test-user',
    password: 'test-password',
    id: 1
}


// global.client.set('myKey', JSON.stringify({user: '\'test-user\'', password: 'test-password'}));
//
app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(global.passport.initialize())
app.use(global.passport.session())


global.passport.serializeUser(function(user, done) {
    console.log('Serialize user called.');
    done(null, user.name);
});

global.passport.deserializeUser(function(id, done) {
    console.log('Deserialize user called.');
    return done(null, {name: 'Oliver'});
});

global.passport.use(new LocalStrategy(
    function(username, password, done) { debugger;
        console.log('local strategy called with: %s', username);
        return done(null, {name: username});
    }));
// global.passport.use(new LocalStrategy(
//     function(username, password, done) {
//         debugger;
//         User.findUser(username, function (err, user) {
//             if (err) {
//                 return done(err)
//             }
//             if (!user) {
//                 return done(null, false)
//             }
//             if (password !== user.password ) {
//                 return done(null, false)
//             }
//             return done(null, user)
//         })
//     }
// ))

global.passport.use(new LocalStrategy(
    { usernameField: 'user.email',
        passwordField: 'user.password',
        passReqToCallback: true
    },
    function(username,password,done){ debugger;
        console.log("am here"+username+" "+password);

    }
))

global.passport.serializeUser(function(user, done) { debugger;
    done(null, user.id);
});

global.passport.deserializeUser(function(id, done) { debugger;
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


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