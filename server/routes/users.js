var RouteUser = {
    assignRoutes: function (app) {
        var _this = this,
            auth = global.getControllers().AuthController,
            controller = global.getControllers().UserController;

        // GET method routes
        app.get('/users', auth.isGuard, function (req, res) {
            controller
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionPage();
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