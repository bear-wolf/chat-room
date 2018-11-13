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

        // verify
        app.get('/profile/:id', function (req, res) {
            profileController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/profile/', function (req, res) {
            profileController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/profile/:id', function (req, res) {
            profileController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/profile/:id', function (req, res) {
            profileController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteUser;