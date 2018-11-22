var RouteUser = {
    assignRoutes: function (app) {
        var _this = this,
            authController = global.getControllers().AuthController;

        app.post('/is-auth', function (req, res) {
            authController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionCheckToken();
        });

        // GET method routes
        app.post('/sign-in', function (req, res) {
            authController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSignIn();
        });
        app.get('/sign-out', function (req, res) {
            authController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSignOut();
        });
        app.post('/check-in', function (req, res) {
            authController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionCheckIn();
        });

    }
}

module.exports = RouteUser;