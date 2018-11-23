/**
 * Created by andrew on 2/1/17.
 */
var RouteUser = require('./users');
var RouteAuth = require('./auth');
var RouteRoom = require('./room');
var RouteRole = require('./role');
var RouteProfile = require('./profile');
var RouteParticipant = require('./participant');
var RouteMessage = require('./message');
var RouteTranslate = require('./translate');

var _public = {
    constructor: function () {

        return this;
    },
    assignRoutes: function (app) {
        var _this = this,
            auth = global.getControllers().AuthController;

        app.use(function (req, res, next) {
            if (req.method == 'OPTIONS') {
                console.log('enable CORS');

                res.header("Access-Control-Allow-Origin", "localhost:4200");
                //res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
                res.header("Access-Control-Allow-Methods", "GET, DELETE, PUT, POST");

                res.statusCode = 200;
                res.end('');
            } else next();
        });

        RouteUser.assignRoutes(app);
        RouteAuth.assignRoutes(app);
        RouteProfile.assignRoutes(app);
        RouteRoom.assignRoutes(app);
        RouteRole.assignRoutes(app);
        RouteParticipant.assignRoutes(app);
        RouteMessage.assignRoutes(app);
        RouteTranslate.assignRoutes(app);

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