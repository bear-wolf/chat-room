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

        // GET method routes
        app.get('/users', global.passport.authenticate('local'), function (req, res) {
            controller
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionPage();

            res.end('');
        });
    }
}

module.exports = RouteUser;