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

        app.post('/room/invited/', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGetInvited();
        });
        //UPDATE // verify
        app.post('/room/:id', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/room/:id', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });

        app.get('/room/invite-users', function (req, res) {
            roomController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGetInviteUsers();
        });
    }
}

module.exports = RouteRoom;