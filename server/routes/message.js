var RouteMessage = {
    assignRoutes: function (app) {
        var _this = this,
            messageController = global.getControllers().MessageController;

        // GET method routes
        app.get('/message', function (req, res) {
            messageController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        // verify
        app.get('/message/:id', function (req, res) {
            messageController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/message/', function (req, res) {
            messageController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/message/:id', function (req, res) {
            messageController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/message/:id', function (req, res) {
            messageController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteMessage;