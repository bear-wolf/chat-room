var RouteParticipant = {
    assignRoutes: function (app) {
        var _this = this,
            participantController = global.getControllers().ParticipantController;

        // GET method routes
        app.get('/participant', function (req, res) {
            participantController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        // verify
        app.get('/participant/:id', function (req, res) {
            participantController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionGet();
        });

        //INSERT // verify
        //users/123/accounts
        app.post('/participant/', function (req, res) {
            participantController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //UPDATE // verify
        app.post('/participant/:id', function (req, res) {
            participantController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionSave();
        });
        //DELETE // curl -X "DELETE" http://www.url.com/page // verify
        app.delete('/participant/:id', function (req, res) {
            participantController
                .createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionRemove();
        });
    }
}

module.exports = RouteParticipant;