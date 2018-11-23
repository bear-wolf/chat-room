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
