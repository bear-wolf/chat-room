var RouteRoom = {
    assignRoutes: function (app) {
        var _this = this,
            roomController = global.getControllers().RoomController;

        // verify
        // GET method routes
        app.get('/room', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });
        // verify
        app.get('/room/:id', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/room/', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/room/:id', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page
        app.delete('/room/:id', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteRoom;