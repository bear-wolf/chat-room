var RouteRole = {
    assignRoutes: function (app) {
        var _this = this,
            roleController = global.getControllers().RoleController;

        // GET method routes
        app.get('/role', function (req, res) {
            roleController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });
    }
}

module.exports = RouteRole;