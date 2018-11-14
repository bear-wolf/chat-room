var AuthController, _public, self;

self = {
}

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    createModel: function () {
        return global.models.auth.createInstance()
    },
    getModel: function () {

    },
    //Registry user
    actionCheckIn: function () {
        var _this = this,
            authModel = this.createModel(),
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
            authModel = this.createModel(),
            bodyRequest = this.request.body;

        authModel
            .setReplyHandler(function (data) {
                _this.responce.end(JSON.stringify(data));
            })
            .actionSignIn(bodyRequest);
        return
    },
    //Sign out
    actionSignOut: function () {
        var _this = this,
            authModel = this.createModel(),
            token = this.request.headers.authorization;

        authModel
            .setReplyHandler(function (data) {
                _this.responce.end(JSON.stringify(data));
            })
            .actionSignOut(token);
        return
    },
}

AuthController = {
    _message: null,

    setMessage: function (message) {
        this._message = message;

        return this;
    },
    getMessage: function () {
        return this._message;
    },
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
        var token = req.headers.authorization;

        if (!token) {
            this.setMessage({
                status: false,
                message: 'Not authoried user'
            });
            return false;
        }

        global.redis.getData(token, function (error, data) {
            return next(error, data);
        })

        return false;
    },
}


module.exports = AuthController;