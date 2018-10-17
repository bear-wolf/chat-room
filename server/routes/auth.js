var RouteUser = {
    assignRoutes: function (app) {
        var _this = this;

        // GET method routes
        app.get('/sign-in', function (req, res) {
            res.end('');
        });
        app.get('/sign-out', function (req, res) {
            res.end('');
        });
    }
}

module.exports = RouteUser;