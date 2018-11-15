var RouteRole = {
    assignRoutes: function (app) {
        var _this = this,
            translateController = global.getControllers().TranslateController;

        // GET method routes
        app.get('/translate', function (req, res) {
            translateController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        // verify
        app.get('/translate/:id', function (req, res) {
            translateController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/translate/', function (req, res) {
            translateController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/translate/:id', function (req, res) {
            translateController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/translate/:id', function (req, res) {
            translateController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteRole;