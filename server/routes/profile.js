var RouteUser = {
    assignRoutes: function (app) {
        var _this = this,
            profileController = global.getControllers().ProfileController;

        // GET method routes
        app.get('/profile', function (req, res) {
            profileController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });
    }
}

module.exports = RouteUser;