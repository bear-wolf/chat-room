var AuthController, _public, self;

self = {
}

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    //Registry user
    actionCheckIn: function () {
        var _this = this,
            authModel = global.models.auth.createInstance(),
            bodyRequest = this.request.body;

        authModel
            .setReplyHandler(function (data) {
                _this.responce.end(JSON.stringify(data));
            })
            .actionCheckIn(bodyRequest);
    },
    //Sign in
    actionSignIn: function () {
        var _this = this,
            authModel = global.models.auth.createInstance(),
            bodyRequest = this.request.body;

        authModel
            .setReplyHandler(function (data) {
                _this.responce.end(JSON.stringify(data));
            })
            .actionSignIn(bodyRequest);
        return
    },
}

AuthController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
            for(var key in _public){
                self[key] = _public[key];
            }
        }

        Obj.prototype = Object.create(global.getControllers().BaseController.getInstance());

        return new Obj().constructor();
    },
    isGuard: function (req, res, next) {
        //global.client.set('myKey', JSON.stringify({user: 'user', password: '1'}));
        if (!req.headers.authorization) return;

        global.client.get(req.headers.authorization, function (err, repl) {
            global.client.quit();
            if (err) {
                return false;
            } else if (repl) {
                return next(JSON.parse(repl));
            }
        });
    },
    //log out
    actionSignOut: function () {
        return;
    },
}


module.exports = AuthController;