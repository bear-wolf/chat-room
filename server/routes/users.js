var RouteUser = {
    assignRoutes: function (app) {
        var _this = this,
            auth = global.getControllers().AuthController,
            controller = global.getControllers().UserController;

        // global.passport.authenticationMiddleware = function authenticationMiddleware () { debugger;
        //     return function (req, res, next) {
        //         if (req.isAuthenticated()) {
        //             return next()
        //         }
        //         res.redirect('/')
        //     }
        // };
        //global.passport.authenticate('local'),

        // GET method routes
        app.get('/users', function (req, res) {
            controller
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionPage();

            res.end('');
        });

        app.post('/users', function (req, res) {
            controller
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .save();
        });
    }
}

module.exports = RouteUser;