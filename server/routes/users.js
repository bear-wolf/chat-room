var RouteUser = {
    assignRoutes: function (app) {
        var _this = this;

        // GET method routes
        app.get('/users', function (req, res) {
            res.end('');
        });
    }
}

module.exports = RouteUser;