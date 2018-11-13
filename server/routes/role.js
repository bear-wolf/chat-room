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

        // verify
        app.get('/role/:id', function (req, res) {
            roleController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/role/', function (req, res) {
            roleController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/role/:id', function (req, res) {
            roleController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/role/:id', function (req, res) {
            roleController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteRole;