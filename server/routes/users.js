var RouteUser = {
    assignRoutes: function (app) {
        var _this = this,
            auth = global.getControllers().AuthController,
            controller = global.getControllers().UserController;

        // GET method routes auth.isGuard
        app.get('/users', function (req, res) {
            controller
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGetUsers();
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