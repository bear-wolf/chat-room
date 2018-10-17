/**
 * Created by andrew on 2/1/17.
 */
var RouteUser = require('./users');
var RouteAuth = require('./auth');

var _public = {
    constructor: function () {

        return this;
    },
    assignRoutes: function (app) {
        var _this = this,
            auth = global.getControllers().AuthController;

        global.client.on("error", function (err) {
            console.log("Error " + err);
        });

        app.use(function (req, res, next) {
            //addHeader(res);

            if (req.method == 'OPTIONS') {
                //res.setHeader('Access-Control-Allow-Headers', ''); // Request methods you wish to allow
                res.statusCode = 200;
                res.end('');
            } else next();
        });

        RouteUser.assignRoutes(app);
        RouteAuth.assignRoutes(app);

        // GET method routes
        app.get('/', function (req, res) {
            global.getControllers().MainController.createInstance()
                .setRequest(req)
                .setResponce(res)
                .actionPage();
        });

        app.use(function (req, res) {
            res.statusCode = 404;
            res.end('Page no found');
        });

        app.use(function(err, req, res, next) {
            if (err) {
                res.statusCode = 500;
                console.error(err.stack);
                res.send('Something broke!');
            }
        });
    }
}
    
var Routes = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return new Obj().constructor();
    },
}

module.exports = Routes;